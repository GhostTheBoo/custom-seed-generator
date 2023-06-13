import React, { useState, useRef, useEffect } from 'react'
import { Button, Pagination } from 'react-bootstrap'

import { AnimatePresence, motion } from 'framer-motion'

import { Reward } from '../rewards/RewardsData'

import LevelCard from './LevelCard'
import { Level } from './LevelData'
import LevelCardContent from './LevelCardContent'
import LevelFormContent from './LevelFormContent'
import AllLevelFormContent from './AllLevelFormContent'

import './styles/LevelStyles.css'
import './styles/LevelCardStyles.css'
import './styles/LevelCardContentStyles.css'
import './styles/LevelCardFormStyles.css'

function LevelPage(props) {
	const [currentLevel, setCurrentLevel] = useState(-1)
	const [levelCardListPosition, setLevelCardListPosition] = useState(1)
	const [currentLevelRange, setCurrentLevelRange] = useState(1)
	const [currentDisplayedForm, setCurrentDisplayedForm] = useState(2)

	const levelCardListRef = useRef(null)
	const levelCardRefs = useRef([])
	let level0 = new Level(0, 0, 0x0, 0, 0, 0, 0, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'))

	useEffect(() => {
		if (currentLevel === -1)
			levelCardListRef.current.scrollTop = levelCardRefs.current[levelCardListPosition].offsetTop - 100
	}, [currentLevel, levelCardListPosition])

	function handleCurrentLevelChange(newLevel) {
		if (newLevel > -1 && newLevel < levelContentList.length)
			setLevelCardListPosition(0)
		handleDisplayedFormChange(newLevel)
	}

	function handleDisplayedFormChange(newLevel) {
		if (newLevel === -1) setCurrentDisplayedForm(2)
		else if (newLevel === props.levelData.length + 1) setCurrentDisplayedForm(1)
		else setCurrentDisplayedForm(0)
		setCurrentLevel(newLevel)
	}

	function handleFormClose(newLevelTop) {
		handleDisplayedFormChange(-1)
		setLevelCardListPosition(newLevelTop)
	}

	function updateLevel(newLevel) {
		let newLevelList = props.levelData.map(level => {
			if (newLevel.baseAddress === level.baseAddress)
				return newLevel
			return level
		})
		handleCurrentLevelChange(-1)
		handleFormClose(newLevel.level)
		props.setAllLevels(newLevelList)
	}

	function replaceAllLevels(appliedLevels, fieldData, enabledData) {
		let prevLevel = level0
		let newLevelList = props.levelData.map(level => {
			let newLevel = level
			if (appliedLevels.includes(newLevel.level)) {
				let newFieldData = {
					sword: enabledData.sword ? { ...fieldData.sword } : { ...newLevel.replacementSwordReward },
					shield: enabledData.shield ? { ...fieldData.shield } : { ...newLevel.replacementShieldReward },
					staff: enabledData.staff ? { ...fieldData.staff } : { ...newLevel.replacementStaffReward },
					standardAP: enabledData.standardAP ? fieldData.standardAP : newLevel.standardAP - prevLevel.standardAP,
					defense: enabledData.defense ? fieldData.defense : newLevel.defense - prevLevel.defense,
					magic: enabledData.magic ? fieldData.magic : newLevel.magic - prevLevel.magic,
					strength: enabledData.strength ? fieldData.strength : newLevel.strength - prevLevel.strength,
					replacementEXP: enabledData.replacementEXP ? fieldData.replacementEXP : newLevel.replacementEXP
				}
				newLevel = level.replace(prevLevel, newFieldData)
			}
			prevLevel = newLevel
			return newLevel
		})
		handleCurrentLevelChange(-1)
		handleFormClose(100)
		props.setAllLevels(newLevelList)
	}

	function vanillaAllLevels(appliedLevels, enabledData) {
		let newLevelList = props.levelData.map(level => {
			let newLevel = level
			if (appliedLevels.includes(newLevel.level)) {
				newLevel = level.vanilla()

				if (!enabledData.sword) newLevel.replacementSwordReward = { ...level.replacementSwordReward }
				if (!enabledData.shield) newLevel.replacementShieldReward = { ...level.replacementShieldReward }
				if (!enabledData.staff) newLevel.replacementStaffReward = { ...level.replacementStaffReward }

				if (!enabledData.standardAP) newLevel.standardAP = level.standardAP
				if (!enabledData.defense) newLevel.defense = level.defense
				if (!enabledData.magic) newLevel.magic = level.magic
				if (!enabledData.strength) newLevel.strength = level.strength

				if (!enabledData.replacementEXP) newLevel.replacementEXP = level.replacementEXP
			}
			return newLevel
		})
		handleCurrentLevelChange(-1)
		handleFormClose(100)
		props.setAllLevels(newLevelList)
	}

	let levelContentList = []
	let levelForm = [<></>, <></>]
	for (let i = currentLevelRange - 1; i < props.levelData.length && i < currentLevelRange + 9; i++) {
		let isEditingAnotherLevel = currentLevel !== -1
		let isEditingThisLevel = currentLevel === i + 1
		let prevLevel = props.levelData[i - 1] !== undefined
			? props.levelData[i - 1]
			: level0.copy()

		levelContentList.push(
			<LevelCard
				key={i}
				id={i + 1}
				level={props.levelData[i]}
				isEditingThisLevel={isEditingThisLevel}
				isEditingAnotherLevel={isEditingAnotherLevel}
				setCurrentLevel={handleCurrentLevelChange}
				updateRef={(element, index) => { levelCardRefs.current[index] = element }}
				closeLevelCard={handleFormClose}
			>
				<LevelCardContent
					level={props.levelData[i]}
					prevLevel={prevLevel}
				/>
			</LevelCard>
		)

		if (isEditingThisLevel)
			levelForm[0] = <LevelCard
				key={i}
				id={i + 1}
				level={props.levelData[i]}
				isEditingThisLevel={isEditingThisLevel}
				isEditingAnotherLevel={isEditingAnotherLevel}
				setCurrentLevel={handleCurrentLevelChange}
				updateRef={(element, index) => { levelCardRefs.current[index] = element }}
				closeLevelCard={handleFormClose}
			>
				<LevelFormContent
					level={props.levelData[currentLevel - 1]}
					prevLevel={prevLevel}
					handleVanilla={(replacedLevel) => { updateLevel(replacedLevel.vanilla()) }}
					handleReplace={(replacedLevel, currentFieldData) => { updateLevel(replacedLevel.replace(prevLevel, currentFieldData)) }}
				/>
			</LevelCard>
	}

	levelForm[1] = <LevelCard
		key={99}
		id={100}
		isAll={true}
		isEditingThisLevel={true}
		setCurrentLevel={handleCurrentLevelChange}
		updateRef={(element, index) => { levelCardRefs.current[index] = element }}
		closeLevelCard={handleFormClose}
	>
		<AllLevelFormContent
			levelData={props.levelData}
			handleVanilla={vanillaAllLevels}
			handleReplace={replaceAllLevels}
		/>
	</LevelCard>


	let pageNumbers = []
	for (let i = 1; i <= 91; i += 10) {
		function changePage() {
			setLevelCardListPosition(i)
			setCurrentLevelRange(i)
		}
		pageNumbers.push(
			<Pagination.Item
				key={i}
				active={i === currentLevelRange}
				onClick={() => changePage()}
			>
				{i}+
			</Pagination.Item>
		)
	}

	return (
		<div className='pageContent levelPageContent'>
			<AnimatePresence>
				{
					currentLevel === -1
						? <>
							<div
								className={`levelCardList flex-grow-1 ${currentDisplayedForm !== 2 ? 'editing' : ''}`}
								ref={levelCardListRef}
							>
								<motion.div
									initial={{ opacity: .25, x: 500 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, y: 500 }}
									transition={{ type: 'spring', duration: .5 }}
									key='levelPageHeader'
									className='pageHeader'
								>
									<Pagination>{pageNumbers}</Pagination>
									<Button onClick={() => handleDisplayedFormChange(100)}>
										ALL LEVELS
									</Button>
								</motion.div>
								{levelContentList}
							</div>
						</>
						: levelForm[currentDisplayedForm]
				}
			</AnimatePresence>
		</div>
	)
}

export default LevelPage