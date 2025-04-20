import React, { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import './styles/FormStyles.css'

import FormForm from './FormForm'
import AllFormForm from './AllFormForm'
import FormCard from './FormCard'
import GSelect from '../generic/GSelect'


function FormPage(props) {
	const [currentDriveForm, setCurrentDriveForm] = useState(0)
	const [currentDriveFormLevel, setCurrentDriveFormLevel] = useState(-1)
	const [currentDisplayedForm, setCurrentDisplayedForm] = useState(2)

	function handleDriveFormChange(newDriveForm) {
		setCurrentDisplayedForm(2)
		setCurrentDriveForm(newDriveForm)
		setCurrentDriveFormLevel(-1)
	}
	function handleDriveFormLevelChange(newDriveFormLevel) {
		if (newDriveFormLevel === 6)
			setCurrentDisplayedForm(1)
		else if (newDriveFormLevel === -1)
			setCurrentDisplayedForm(2)
		else
			setCurrentDisplayedForm(0)
		setCurrentDriveFormLevel(newDriveFormLevel)
	}
	function updateAllDriveForms(newDriveLevel) {
		props.setAllForms(props.formData.map((driveForm, driveFormIndex) => {
			if (driveFormIndex === currentDriveForm) {
				let newDriveLevels = driveForm.driveLevels.map((driveLevel, driveLevelIndex) => {
					return driveLevelIndex === currentDriveFormLevel
						? newDriveLevel
						: driveLevel
				})
				return ({
					...driveForm,
					driveLevels: newDriveLevels
				})
			}
			return driveForm
		}))
		handleDriveFormLevelChange(-1)
	}

	function replaceAllLevels(fieldData, enabledData) {
		let newLevelList = props.formData.map((driveForm, driveFormIndex) => {
			if (driveFormIndex === currentDriveForm) {
				let newDriveLevels = driveForm.driveLevels.map(driveFormLevel => {
					let newFieldData = {
						replacementReward: enabledData.modifyReward ? { ...fieldData.replacementReward } : { ...driveFormLevel.replacementReward },
						currentEXP: enabledData.customEXP ? fieldData.currentEXP : driveFormLevel.replacementEXP,
						currentEXPMultiplierValue: enabledData.EXPMultiplier ? fieldData.currentEXPMultiplierValue : 1
					}
					return driveFormLevel.replace(newFieldData)
				})
				return ({
					...driveForm,
					driveLevels: newDriveLevels
				})
			}
			return driveForm
		})
		props.setAllForms(newLevelList)
		handleDriveFormLevelChange(-1)
	}

	function vanillaAllLevels(enabledData) {
		let newLevelList = props.formData.map((driveForm, driveFormIndex) => {
			if (driveFormIndex === currentDriveForm) {
				let newDriveLevels = driveForm.driveLevels.map(driveFormLevel => {
					let newFieldData = {
						replacementReward: enabledData.modifyReward ? { ...driveFormLevel.vanillaReward } : { ...driveFormLevel.replacementReward },
						currentEXP: enabledData.customEXP || enabledData.EXPMultiplier ? driveFormLevel.vanillaEXP : driveFormLevel.replacementEXP,
						currentEXPMultiplierValue: 1
					}
					return driveFormLevel.replace(newFieldData)
				})
				return ({
					...driveForm,
					driveLevels: newDriveLevels
				})
			}
			return driveForm
		})
		props.setAllForms(newLevelList)
		handleDriveFormLevelChange(-1)
	}

	let levelDataList = props.formData[currentDriveForm].driveLevels.map((level, index) => {
		return (
			<li key={`formCard${level.level}`}>
				<FormCard
					level={level}
					isEditing={currentDriveFormLevel === index}
					handleDriveFormLevelChange={() => handleDriveFormLevelChange(index)}
				/>
			</li>
		)
	})

	levelDataList.push(
		<li key='allLevels'>
			<button
				className={`editAllFormLevelButton ${props.formData[currentDriveForm].driveForm.toLowerCase()}`}
				disabled={currentDriveFormLevel === 6}
				onClick={() => handleDriveFormLevelChange(6)}
			>
				{(currentDriveFormLevel === 6 ? 'EDITING... ' : 'EDIT ')} <br />
				ALL {props.formData[currentDriveForm].driveForm.toUpperCase()} LEVELS
			</button>
		</li>
	)

	// console.log(props.formData[currentDriveForm].driveLevels[currentDriveFormLevel].level)
	return (
		<div className='fullPageContent formPageContent'>
			<motion.div
				initial={{ opacity: .25, x: 100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ type: 'spring', duration: .5 }}
				className='pageHeader'
			>
				<div className='pageHeaderSelectorLabel'>
					Form Selector:
				</div>
				<div>
					<GSelect
						class={'form'}
						selector={'Form'}
						itemList={props.formData.map(form => { return form.driveForm })}
						name={'currentForm'}
						currentItem={currentDriveForm}
						onChange={(e) => handleDriveFormChange(parseInt(e.target.value))}
					/>
				</div>
				<div className='flex-grow-1' />
				<div>
					{props.children}
				</div>
			</motion.div>
			<AnimatePresence mode='popLayout'>
				<motion.ul
					initial={{ opacity: .25, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, y: 100 }}
					transition={{ type: 'spring', duration: .5 }}
					key={`${props.formData[currentDriveForm].driveForm}LevelList`}
					className='formLevelList'
				>
					{levelDataList}
				</motion.ul>
			</AnimatePresence>
			<AnimatePresence mode='popLayout'>
				{
					currentDisplayedForm === 0
					&& <motion.div
						initial={{ opacity: .25, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, y: 100 }}
						transition={{ type: 'spring', duration: .5 }}
						key={props.formData[currentDriveForm].driveLevels[currentDriveFormLevel].level}
						className='formFormCard'
					>
						<FormForm
							key={props.formData[currentDriveForm].driveLevels[currentDriveFormLevel].level}
							currentLevel={props.formData[currentDriveForm].driveLevels[currentDriveFormLevel]}
							currentDriveForm={props.formData[currentDriveForm].driveForm}
							closeFormCard={() => handleDriveFormLevelChange(-1)}
							setCurrentLevel={updateAllDriveForms}
						/>
					</motion.div>
				}
				{
					currentDisplayedForm === 1
					&& <motion.div
						initial={{ opacity: .25, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, y: 100 }}
						transition={{ type: 'spring', duration: .5 }}
						key={`${props.formData[currentDriveForm].driveForm}form`}
						className='formFormCard'
					>
						<AllFormForm
							key={props.formData[currentDriveForm].driveForm}
							currentDriveLevels={props.formData[currentDriveForm].driveLevels}
							closeFormCard={() => handleDriveFormLevelChange(-1)}
							handleVanilla={vanillaAllLevels}
							handleReplace={replaceAllLevels}
						/>
					</motion.div>
				}
			</AnimatePresence>
		</div>
	)
}

export default FormPage