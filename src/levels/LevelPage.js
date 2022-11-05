import { React, useState, useRef, useEffect } from 'react'
import { Pagination } from 'react-bootstrap'

import LevelCard from './LevelCard'
import LevelForm from './LevelForm'
import AllLevelForm from './AllLevelForm'

import './LevelStyles.css'
import './LevelFormStyles.css'

function LevelPage(props) {
	const [currentLevel, setCurrentLevel] = useState(-1)
	const [currentLevelRange, setCurrentLevelRange] = useState(1)
	const [currentDisplayedForm, setCurrentDisplayedForm] = useState(2)
	const [currentLevelFieldData, setCurrentLevelFieldData] = useState({
		sword: { ...props.levelData[0].replacementSwordReward },
		shield: { ...props.levelData[0].replacementShieldReward },
		staff: { ...props.levelData[0].replacementStaffReward },
		currentAP: props.levelData[0].standardAP,
		currentCriticalAP: props.levelData[0].criticalAP(),
		currentDefense: props.levelData[0].defense,
		currentMagic: props.levelData[0].magic,
		currentStrength: props.levelData[0].strength,
		currentEXP: props.levelData[0].replacementEXP
	})
	const [currentLevelDifFieldData, setCurrentLevelDifFieldData] = useState({
		strengthDif: props.levelData[0].strength,
		magicDif: props.levelData[0].magic,
		defenseDif: props.levelData[0].defense,
		standardAPDif: props.levelData[0].standardAP,
		criticalAPDif: props.levelData[0].criticalAP(),
		expDif: props.levelData[0].replacementEXP
	})
	const levelCardList = useRef(null)
	useEffect(() => {
		levelCardList.current.scrollTo({ top: 0, behavior: 'smooth' })
		setCurrentLevel(-1)
		setCurrentDisplayedForm(2)
	}, [currentLevelRange])
	const [currentAllLevelFieldData, setCurrentAllLevelFieldData] = useState({
		modifySword: false,
		modifyShield: false,
		modifyStaff: false,
		modifyStrength: false,
		modifyMagic: false,
		modifyDefense: false,
		modifyAP: false,
		modifyEXP: false,
		levelSkip: 0,
		levelOffset: 0
	})

	function handleCurrentLevelChange(newLevel) {
		setCurrentLevel(newLevel)
		handleDisplayedFormChange(newLevel)
		if (newLevel > -1 && newLevel < levelDataList.length) {
			let newLevelData = props.levelData[newLevel - 1]
			if (newLevel === 1)
				setCurrentLevelDifFieldData({
					strengthDif: newLevelData.strength,
					magicDif: newLevelData.magic,
					defenseDif: newLevelData.defense,
					standardAPDif: newLevelData.standardAP,
					criticalAPDif: newLevelData.criticalAP(),
					expDif: newLevelData.replacementEXP
				})
			else
				setCurrentLevelDifFieldData(newLevelData.changeFromPreviousLevel(props.levelData[newLevel - 2]))
			setCurrentLevelFieldData({
				sword: { ...newLevelData.replacementSwordReward },
				shield: { ...newLevelData.replacementShieldReward },
				staff: { ...newLevelData.replacementStaffReward },
				currentAP: newLevelData.standardAP,
				currentCriticalAP: newLevelData.criticalAP(),
				currentDefense: newLevelData.defense,
				currentMagic: newLevelData.magic,
				currentStrength: newLevelData.strength,
				currentEXP: newLevelData.replacementEXP
			})
		} else {
			setCurrentLevelFieldData({
				sword: { ...props.levelData[0].replacementSwordReward },
				shield: { ...props.levelData[0].replacementShieldReward },
				staff: { ...props.levelData[0].replacementStaffReward },
				currentAP: 0,
				currentCriticalAP: 47,
				currentDefense: 0,
				currentMagic: 0,
				currentStrength: 0,
				currentEXP: 0
			})
			setCurrentLevelDifFieldData({
				strengthDif: 0,
				magicDif: 0,
				defenseDif: 0,
				standardAPDif: 0,
				criticalAPDif: 47,
				expDif: 0
			})
		}
	}
	function handleCurrentLevelFieldDataChange(newLevelFieldData) {
		let levelChangeDif
		if (currentLevel === 1)
			levelChangeDif = props.levelData[0].replace(newLevelFieldData).changeFromPreviousLevel(props.levelData[0])
		else
			levelChangeDif = props.levelData[currentLevel - 1].replace(newLevelFieldData).changeFromPreviousLevel(props.levelData[currentLevel - 2])
		setCurrentLevelDifFieldData(levelChangeDif)
		setCurrentLevelFieldData({
			...newLevelFieldData,
			currentCriticalAP: Math.floor((newLevelFieldData.currentAP - 2) * 1.5)
		})
	}
	function handleDisplayedFormChange(newLevel) {
		if (newLevel === -1) setCurrentDisplayedForm(2)
		else if (newLevel === levelDataList.length) setCurrentDisplayedForm(1)
		else setCurrentDisplayedForm(0)
	}

	function updateLevel(newLevel) {
		let newLevelList = props.levelData.map(level => {
			if (newLevel.baseAddress === level.baseAddress)
				return newLevel
			return level
		})
		handleCurrentLevelChange(-1)
		props.setAllLevels(newLevelList)
	}

	function replaceAllLevel() {
		let previousLevel = props.levelData[0]
		let levelShift = currentAllLevelFieldData.levelOffset % currentAllLevelFieldData.levelSkip
		let newLevelList = props.levelData.map(level => {
			let isCorrectLevel = level.level > currentAllLevelFieldData.levelOffset && (level.level % currentAllLevelFieldData.levelSkip) - levelShift === 0
			let newLevelData = {
				sword: { ...level.replacementSwordReward },
				shield: { ...level.replacementShieldReward },
				staff: { ...level.replacementStaffReward },
				currentAP: level.standardAP,
				currentCriticalAP: level.criticalAP(),
				currentDefense: level.defense,
				currentMagic: level.magic,
				currentStrength: level.strength,
				currentEXP: level.replacementEXP
			}

			if (currentAllLevelFieldData.modifySword && isCorrectLevel)
				newLevelData.sword = { ...currentLevelFieldData.sword }
			if (currentAllLevelFieldData.modifyShield && isCorrectLevel)
				newLevelData.shield = { ...currentLevelFieldData.shield }
			if (currentAllLevelFieldData.modifyStaff && isCorrectLevel)
				newLevelData.staff = { ...currentLevelFieldData.staff }

			let maximumChange = 0
			if (currentAllLevelFieldData.modifyStrength) {
				maximumChange = previousLevel.strength + (isCorrectLevel ? currentLevelDifFieldData.strengthDif : 0)
				newLevelData.currentStrength = Math.max(0, maximumChange)
			}
			if (currentAllLevelFieldData.modifyMagic) {
				maximumChange = previousLevel.magic + (isCorrectLevel ? currentLevelDifFieldData.magicDif : 0)
				newLevelData.currentMagic = Math.max(0, maximumChange)
			}
			if (currentAllLevelFieldData.modifyDefense) {
				maximumChange = previousLevel.defense + (isCorrectLevel ? currentLevelDifFieldData.defenseDif : 0)
				newLevelData.currentDefense = Math.max(0, maximumChange)
			}
			if (currentAllLevelFieldData.modifyAP) {
				maximumChange = previousLevel.standardAP + (isCorrectLevel ? currentLevelDifFieldData.APDif : 0)
				newLevelData.currentAP = Math.max(0, maximumChange)
			}

			if (currentAllLevelFieldData.modifyEXP) {
				maximumChange = previousLevel.replacementEXP + (isCorrectLevel ? currentLevelDifFieldData.expDif : 0)
				newLevelData.currentEXP = Math.max(0, maximumChange)
			}
			previousLevel = level.replace(newLevelData)
			return previousLevel
		})
		handleCurrentLevelChange(-1)
		props.setAllLevels(newLevelList)
	}
	function vanillaAllLevel() {
		let levelShift = currentAllLevelFieldData.levelOffset % currentAllLevelFieldData.levelSkip
		let newLevelList = props.levelData.map(level => {
			let isCorrectLevel = level.level > currentAllLevelFieldData.levelOffset && (level.level % currentAllLevelFieldData.levelSkip) - levelShift === 0
			let newLevelData = {
				sword: { ...level.replacementSwordReward },
				shield: { ...level.replacementShieldReward },
				staff: { ...level.replacementStaffReward },
				currentAP: level.standardAP,
				currentCriticalAP: level.criticalAP(),
				currentDefense: level.defense,
				currentMagic: level.magic,
				currentStrength: level.strength,
				currentEXP: level.replacementEXP
			}

			if (currentAllLevelFieldData.modifySword && isCorrectLevel)
				newLevelData.sword = { ...level.vanillaSwordReward }
			if (currentAllLevelFieldData.modifyShield && isCorrectLevel)
				newLevelData.shield = { ...level.vanillaShieldReward }
			if (currentAllLevelFieldData.modifyStaff && isCorrectLevel)
				newLevelData.staff = { ...level.vanillaStaffReward }


			if (currentAllLevelFieldData.modifyStrength) {
				if (isCorrectLevel)
					newLevelData.currentStrength = level.vanillaStrength
			}
			if (currentAllLevelFieldData.modifyMagic) {
				if (isCorrectLevel)
					newLevelData.currentMagic = level.vanillaMagic
			}
			if (currentAllLevelFieldData.modifyDefense) {
				if (isCorrectLevel)
					newLevelData.currentDefense = level.vanillaDefense
			}
			if (currentAllLevelFieldData.modifyAP) {
				if (isCorrectLevel)
					newLevelData.currentAP = level.vanillaAP
			}

			if (currentAllLevelFieldData.modifyEXP) {
				if (isCorrectLevel)
					newLevelData.currentEXP = level.vanillaEXP
			}
			return level.replace(newLevelData)
		})
		handleCurrentLevelChange(-1)
		props.setAllLevels(newLevelList)
	}

	let prevLevel = props.levelData[0]
	let levelDataList = []
	for (let i = 0; i < props.levelData.length; i++) {
		let ret = (
			<LevelCard
				key={props.levelData[i].level}
				id={props.levelData[i].level}
				level={props.levelData[i]}
				levelChangeData={props.levelData[i].changeFromPreviousLevel(prevLevel)}
				isEditing={currentLevel === props.levelData[i].level}
				isAllLevel={false}
				isSmall={currentDisplayedForm !== 2}
				setCurrentLevel={handleCurrentLevelChange}
			/>
		)
		prevLevel = props.levelData[i]
		levelDataList.push(ret)
	}
	levelDataList.push(
		<LevelCard
			key={100}
			id={100}
			level={prevLevel}
			levelChangeData={props.levelData[98].changeFromPreviousLevel(prevLevel)}
			isEditing={currentLevel === 100}
			isAllLevel={true}
			isSmall={currentDisplayedForm !== 2}
			setCurrentLevel={handleCurrentLevelChange}
		/>
	)

	let displayedLevelForm = [
		<LevelForm
			level={props.levelData[currentLevel - 1]}
			previousLevel={currentLevel !== -1 ? props.levelData[currentLevel - 2] : {}}
			currentLevelFieldData={currentLevelFieldData}
			currentLevelDifFieldData={currentLevelDifFieldData}
			setCurrentLevelFieldData={(fieldName, newValue) => handleCurrentLevelFieldDataChange({ ...currentLevelFieldData, [fieldName]: newValue })}
			closeFormCard={handleCurrentLevelChange}
			handleVanilla={(replacedLevel) => { updateLevel(replacedLevel.vanilla()) }}
			handleReplace={(replacedLevel, currentLevelFieldData) => { updateLevel(replacedLevel.replace(currentLevelFieldData)) }}
		/>,
		<AllLevelForm
			currentLevelFieldData={currentLevelFieldData}
			currentLevelDifFieldData={currentLevelDifFieldData}
			currentAllLevelFieldData={currentAllLevelFieldData}
			setCurrentLevelFieldData={(fieldName, newValue) => setCurrentLevelFieldData({ ...currentLevelFieldData, [fieldName]: newValue })}
			setCurrentLevelDifFieldData={(fieldName, newValue) => setCurrentLevelDifFieldData({ ...currentLevelDifFieldData, [fieldName]: newValue })}
			setCurrentAllLevelFieldData={(fieldName, newValue) => setCurrentAllLevelFieldData({ ...currentAllLevelFieldData, [fieldName]: newValue })}
			closeFormCard={handleCurrentLevelChange}
			handleVanilla={vanillaAllLevel}
			handleReplace={replaceAllLevel}
		/>,
		<></>
	]

	let pageNumbers = []
	for (let i = 1; i <= 99; i += 10) {
		pageNumbers.push(
			<Pagination.Item
				key={i}
				active={i === currentLevelRange}
				onClick={() => setCurrentLevelRange(i)}
			>
				{i}-{i !== 91 ? i + 9 : 'All'}
			</Pagination.Item>
		)
	}

	return (
		<div className='fullPageContent'>
			<div className='pageHeader'>
				<div className='levelRangeSelectorLabel pageHeaderSelectorLabel'>
					Level Range Selector:
				</div>
				<Pagination>
					{pageNumbers}
				</Pagination>
				<div className='flex-grow-1' />
				<div className='helpButton'>{props.children}</div>
			</div>
			<div className='levelPageContent'>
				<div className='levelCardList flex-grow-1' ref={levelCardList}>
					{levelDataList.slice(currentLevelRange - 1, currentLevelRange + 9)}
				</div>
				{displayedLevelForm[currentDisplayedForm]}
			</div>
		</div>
	)
}

export default LevelPage