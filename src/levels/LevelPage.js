import { React, useState, useRef, useEffect } from 'react'
import { Row, Container, Col, Pagination } from 'react-bootstrap'

import LevelCard from './LevelCard'
import AllLevelCard from './AllLevelCard'
import LevelForm from './LevelForm'
import AllLevelForm from './AllLevelForm'

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
			currentCriticalAP: Math.floor(((newLevelFieldData.currentAP - 2) * 1.5) + 50)
		})
	}
	function handleDisplayedFormChange(newLevel) {
		if (newLevel === -1) setCurrentDisplayedForm(2)
		else if (newLevel === levelDataList.length) setCurrentDisplayedForm(1)
		else setCurrentDisplayedForm(0)
	}

	// function getLevelDifference(currentLevel) {
	// 	let currentLevelData = props.levelData[currentLevel - 1]
	// 	if (currentLevel !== 1)
	// 		return currentLevelData.changeFromPreviousLevel(props.levelData[currentLevel - 2])
	// 	else
	// 		return {
	// 			strengthDif: currentLevelData.strength,
	// 			magicDif: currentLevelData.magic,
	// 			defenseDif: currentLevelData.defense,
	// 			standardAPDif: currentLevelData.standardAP,
	// 			criticalAPDif: currentLevelData.criticalAP(),
	// 			expDif: currentLevelData.replacementEXP
	// 		}
	// }
	// function resetEquipmentFieldData() {
	// 	let baseEquipmentData = props.equipmentData[currentEquipmentType].equipments[0]
	// 	setCurrentEquipmentFieldData({
	// 		ability: { ...baseEquipmentData.replacementAbility },
	// 		currentAP: baseEquipmentData.ap,
	// 		currentStrength: baseEquipmentData.strength,
	// 		currentMagic: baseEquipmentData.magic,
	// 		currentDefense: baseEquipmentData.defense,
	// 		currentFire: baseEquipmentData.fire,
	// 		currentBlizzard: baseEquipmentData.blizzard,
	// 		currentThunder: baseEquipmentData.thunder,
	// 		currentPhysical: baseEquipmentData.physical,
	// 		currentDark: baseEquipmentData.dark,
	// 		currentLight: baseEquipmentData.light,
	// 		currentUniversal: baseEquipmentData.universal
	// 	})
	// 	setCurrentAllEquipmentFieldData({
	// 		modifyAbility: false,
	// 		modifyStats: false,
	// 		modifyResistances: false
	// 	})
	// }


	// function replaceAllEquipment() {
	// 	let newEquipmentList = props.equipmentData[currentEquipmentType].equipments.map((equipment) => {
	// 		let newEquipmentData = {
	// 			ability: { ...equipment.replacementAbility },
	// 			currentAP: equipment.ap,
	// 			currentStrength: equipment.strength,
	// 			currentMagic: equipment.magic,
	// 			currentDefense: equipment.defense,
	// 			currentFire: equipment.fire,
	// 			currentBlizzard: equipment.blizzard,
	// 			currentThunder: equipment.thunder,
	// 			currentPhysical: equipment.physical,
	// 			currentDark: equipment.dark,
	// 			currentLight: equipment.light,
	// 			currentUniversal: equipment.universal
	// 		}
	// 		if (currentAllEquipmentFieldData.modifyAbility)
	// 			newEquipmentData.ability = { ...currentEquipmentFieldData.ability }
	// 		if (currentAllEquipmentFieldData.modifyStats) {
	// 			newEquipmentData.currentAP = currentEquipmentFieldData.currentAP
	// 			newEquipmentData.currentStrength = currentEquipmentFieldData.currentStrength
	// 			newEquipmentData.currentMagic = currentEquipmentFieldData.currentMagic
	// 			newEquipmentData.currentDefense = currentEquipmentFieldData.currentDefense
	// 		}
	// 		if (currentAllEquipmentFieldData.modifyResistances) {
	// 			newEquipmentData.currentFire = currentEquipmentFieldData.currentFire
	// 			newEquipmentData.currentBlizzard = currentEquipmentFieldData.currentBlizzard
	// 			newEquipmentData.currentThunder = currentEquipmentFieldData.currentThunder
	// 			newEquipmentData.currentDark = currentEquipmentFieldData.currentDark
	// 			newEquipmentData.currentPhysical = currentEquipmentFieldData.currentPhysical
	// 			newEquipmentData.currentLight = currentEquipmentFieldData.currentLight
	// 			newEquipmentData.currentUniversal = currentEquipmentFieldData.currentUniversal
	// 		}
	// 		console.log(newEquipmentData)
	// 		return equipment.replace(newEquipmentData)
	// 	})
	// 	updateAllEquipment(newEquipmentList)
	// }
	// function vanillaAllEquipment() {
	// 	let newEquipmentList = props.equipmentData[currentEquipmentType].equipments.map((equipment) => {
	// 		// let newEquipmentData = {
	// 		// 	ability: { ...equipment.vanillaAbility },
	// 		// 	currentAP: equipment.vanillaAP,
	// 		// 	currentStrength: equipment.vanillaStrength,
	// 		// 	currentMagic: equipment.vanillaMagic,
	// 		// 	currentDefense: equipment.vanillaDefense,
	// 		// 	currentFire: equipment.vanillaFire,
	// 		// 	currentBlizzard: equipment.vanillaBlizzard,
	// 		// 	currentThunder: equipment.vanillaThunder,
	// 		// 	currentPhysical: equipment.vanillaPhysical,
	// 		// 	currentDark: equipment.vanillaDark,
	// 		// 	currentLight: equipment.vanillaLight,
	// 		// 	currentUniversal: equipment.vanillaUniversal
	// 		// }
	// 		let newEquipmentData = {
	// 			ability: { ...equipment.replacementAbility },
	// 			currentAP: equipment.ap,
	// 			currentStrength: equipment.strength,
	// 			currentMagic: equipment.magic,
	// 			currentDefense: equipment.defense,
	// 			currentFire: equipment.fire,
	// 			currentBlizzard: equipment.blizzard,
	// 			currentThunder: equipment.thunder,
	// 			currentPhysical: equipment.physical,
	// 			currentDark: equipment.dark,
	// 			currentLight: equipment.light,
	// 			currentUniversal: equipment.universal
	// 		}
	// 		if (currentAllEquipmentFieldData.modifyAbility)
	// 			newEquipmentData.ability = { ...equipment.vanillaAbility }
	// 		if (currentAllEquipmentFieldData.modifyStats) {
	// 			newEquipmentData.currentAP = equipment.vanillaAP
	// 			newEquipmentData.currentStrength = equipment.vanillaStrength
	// 			newEquipmentData.currentMagic = equipment.vanillaMagic
	// 			newEquipmentData.currentDefense = equipment.vanillaDefense
	// 		}
	// 		if (currentAllEquipmentFieldData.modifyResistances) {
	// 			newEquipmentData.currentFire = equipment.vanillaFire
	// 			newEquipmentData.currentBlizzard = equipment.vanillaBlizzard
	// 			newEquipmentData.currentThunder = equipment.vanillaThunder
	// 			newEquipmentData.currentDark = equipment.vanillaPhysical
	// 			newEquipmentData.currentPhysical = equipment.vanillaDark
	// 			newEquipmentData.currentLight = equipment.vanillaLight
	// 			newEquipmentData.currentUniversal = equipment.vanillaUniversal
	// 		}
	// 		return equipment.replace(newEquipmentData)
	// 	})
	// 	updateAllEquipment(newEquipmentList)
	// }

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


			if (currentAllLevelFieldData.modifyStrength) {
				if (isCorrectLevel)
					newLevelData.currentStrength = Math.max(0, previousLevel.strength + currentLevelDifFieldData.strengthDif)
				else
					newLevelData.currentStrength = Math.max(0, previousLevel.strength)
			}
			if (currentAllLevelFieldData.modifyMagic) {
				if (isCorrectLevel)
					newLevelData.currentMagic = Math.max(0, previousLevel.Magic + currentLevelDifFieldData.magicDif)
				else
					newLevelData.currentMagic = Math.max(0, previousLevel.Magic)
			}
			if (currentAllLevelFieldData.modifyDefense) {
				if (isCorrectLevel)
					newLevelData.currentDefense = Math.max(0, previousLevel.Defense + currentLevelDifFieldData.defenseDif)
				else
					newLevelData.currentDefense = Math.max(0, previousLevel.Defense)
			}
			if (currentAllLevelFieldData.modifyAP) {
				if (isCorrectLevel)
					newLevelData.currentAP = Math.max(0, previousLevel.standardAP + currentLevelDifFieldData.APDif)
				else
					newLevelData.currentAP = Math.max(0, previousLevel.standardAP)
			}

			if (currentAllLevelFieldData.modifyEXP) {
				if (isCorrectLevel)
					newLevelData.currentEXP = Math.max(0, previousLevel.replacementEXP + currentLevelDifFieldData.expDif)
				else
					newLevelData.currentEXP = Math.max(0, previousLevel.replacementEXP)
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
	let levelDataList = [
		<LevelCard
			key={prevLevel.level}
			id={prevLevel.level}
			level={prevLevel}
			prevLevelExp={0}
			levelChangeData={prevLevel.changeFromPreviousLevel(prevLevel)}
			isEditing={currentLevel === prevLevel.level}
			setCurrentLevel={handleCurrentLevelChange}
		/>
	]
	for (let i = 1; i < props.levelData.length; i++) {
		let ret = (
			<LevelCard
				key={props.levelData[i].level}
				id={props.levelData[i].level}
				level={props.levelData[i]}
				prevLevelExp={prevLevel.replacementEXP}
				levelChangeData={props.levelData[i].changeFromPreviousLevel(prevLevel)}
				isEditing={currentLevel === props.levelData[i].level}
				setCurrentLevel={handleCurrentLevelChange}
			/>
		)
		prevLevel = props.levelData[i]
		levelDataList.push(ret)
	}
	levelDataList.push(
		<AllLevelCard
			key={100}
			id={100}
			isEditing={currentLevel === 100}
			setCurrentLevel={handleCurrentLevelChange}
		/>
	)

	let levelRowList = []
	for (let i = 0; i < levelDataList.length; i += 10) {
		let tempArr = []
		for (let j = 0; j < 10; j++)
			tempArr.push(
				<Row
					key={'levelRow_' + (i + j)}
					id={'levelRow_' + (i + j)}
				>
					<Col>
						{levelDataList[i + j]}
					</Col>
				</Row>
			)
		levelRowList.push(tempArr)
	}

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
				{i} - {i !== 91 ? i + 9 : 'All'}
			</Pagination.Item>
		)
	}

	return (
		<Container fluid>
			<Row>
				<Col xs={currentDisplayedForm !== 2 ? 8 : 12}>
					<Row>
						<Container
							fluid
							className='cardGrid'
							ref={levelCardList}
							style={{
								marginTop: '10px',
								overflowY: 'auto',
								height: '825px'
							}}
						>
							{levelRowList[(currentLevelRange - 1) / 10]}
						</Container>
					</Row>
					<Row>
						<Pagination style={{ margin: 'auto' }}>{pageNumbers}</Pagination>
					</Row>
				</Col>
				<Col xs={currentDisplayedForm !== 2 ? 4 : 0}>
					{displayedLevelForm[currentDisplayedForm]}
				</Col>
			</Row>
		</Container>
	)
}

export default LevelPage