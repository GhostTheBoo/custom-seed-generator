import { React, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

import FormList from './FormList'
import FormForm from './FormForm'
import AllFormForm from './AllFormForm'
import FormCard from './FormCard'

function FormPage(props) {

	const [currentDriveForm, setCurrentDriveForm] = useState(0)
	const [currentDriveFormLevel, setCurrentDriveFormLevel] = useState(-1)
	const [currentDisplayedForm, setCurrentDisplayedForm] = useState(2)
	const [currentFormFieldData, setCurrentFormFieldData] = useState({
		reward: { ...props.formData[currentDriveForm].driveLevels[0].replacementReward },
		currentEXP: props.formData[currentDriveForm].driveLevels[0].replacementEXP,
		currentEXPMultiplierValue: 2
	})
	const [currentAllFormFieldData, setCurrentAllFormFieldData] = useState({
		reward: { ...props.formData[currentDriveForm].driveLevels[1].replacementReward },
		modifyReward: false,
		EXPMultiplier: false,
		customEXP: false,
		currentEXP: 0,
		currentEXPMultiplierValue: 2
	})

	function handleDriveFormChange(newDriveForm) {
		updateCurrentFormFieldData(newDriveForm, 0)
		setCurrentDisplayedForm(2)
		setCurrentDriveForm(newDriveForm)
		setCurrentDriveFormLevel(-1)
	}
	function handleDriveFormLevelChange(newDriveFormLevel) {
		if (newDriveFormLevel === 6) {
			updateCurrentAllFormFieldData(currentDriveForm)
			setCurrentDisplayedForm(1)
		} else {
			updateCurrentFormFieldData(currentDriveForm, newDriveFormLevel)
			setCurrentDisplayedForm(newDriveFormLevel === -1 ? 2 : 0)
		}
		setCurrentDriveFormLevel(newDriveFormLevel)
	}
	function updateCurrentFormFieldData(currentDriveForm, currentDriveFormLevel) {
		let currentLevel = currentDriveFormLevel
		if (currentDriveFormLevel === -1) currentLevel = 0
		setCurrentFormFieldData({
			reward: { ...props.formData[currentDriveForm].driveLevels[currentLevel].replacementReward },
			currentEXP: props.formData[currentDriveForm].driveLevels[currentLevel].replacementEXP,
			currentEXPMultiplierValue: 2
		})
	}
	function updateCurrentAllFormFieldData(currentDriveForm) {
		setCurrentAllFormFieldData({
			reward: { ...props.formData[currentDriveForm].driveLevels[1].replacementReward },
			modifyReward: false,
			EXPMultiplier: false,
			customEXP: false,
			currentEXP: 0,
			currentEXPMultiplierValue: 2
		})
	}
	function updateCurrentDriveFormLevelData(newDriveLevel) {
		props.setAllForms(props.formData.map((driveForm, driveFormIndex) => {
			if (driveFormIndex === currentDriveForm) {
				let newDriveLevels = driveForm.driveLevels.map((driveLevel, driveLevelIndex) => {
					if (driveLevelIndex === currentDriveFormLevel)
						return newDriveLevel
					return driveLevel
				})
				return ({
					...driveForm,
					driveLevels: newDriveLevels
				})
			}
			return driveForm
		}))
		resetPage()
	}
	function updateAllDriveFormLevelData(replaceType) {
		props.setAllForms(props.formData.map((driveForm, driveFormIndex) => {
			if (driveFormIndex === currentDriveForm) {
				let newDriveLevels = driveForm.driveLevels.map(driveLevel => {
					let newDriveLevelData = {
						reward: { ...driveLevel.replacementReward },
						currentEXP: driveLevel.replacementEXP,
						currentEXPMultiplierValue: 2
					}
					if (currentAllFormFieldData.modifyReward) {
						newDriveLevelData.reward = { ...(replaceType === 'vanilla' ? driveLevel.vanillaReward : currentAllFormFieldData.reward) }
					}
					if (replaceType === 'vanilla' && (currentAllFormFieldData.customEXP || currentAllFormFieldData.EXPMultiplier)) {
						newDriveLevelData.currentEXP = driveLevel.vanillaEXP
					} else {
						if (currentAllFormFieldData.customEXP) {
							newDriveLevelData.currentEXP = currentAllFormFieldData.customEXP
						}
						if (currentAllFormFieldData.EXPMultiplier) {
							newDriveLevelData.currentEXP = driveLevel.vanillaEXP
							newDriveLevelData.EXPMultiplier = currentAllFormFieldData.EXPMultiplier
						}
					}

					return driveLevel.replace(newDriveLevelData)
				})
				return ({
					...driveForm,
					driveLevels: newDriveLevels
				})
			}
			return driveForm
		}))
		resetPage()
	}
	function handleAllEXPSwitch(expSwitchName) {
		let newEXPMultiplier = false
		let newCustomEXP = false
		if (expSwitchName === 'EXPMultiplier') {
			if (!currentAllFormFieldData.EXPMultiplier)
				newEXPMultiplier = true
		} else {
			if (!currentAllFormFieldData.customEXP)
				newCustomEXP = true
		}
		setCurrentAllFormFieldData({
			...currentAllFormFieldData,
			EXPMultiplier: newEXPMultiplier,
			customEXP: newCustomEXP
		})
	}
	function resetPage() {
		setCurrentDriveFormLevel(-1)
		setCurrentDisplayedForm(2)
		setCurrentFormFieldData({
			reward: { ...props.formData[currentDriveForm].driveLevels[0].replacementReward },
			currentEXP: props.formData[currentDriveForm].driveLevels[0].replacementEXP,
			currentEXPMultiplierValue: 2
		})
		setCurrentAllFormFieldData({
			reward: { ...props.formData[currentDriveForm].driveLevels[1].replacementReward },
			modifyReward: false,
			EXPMultiplier: false,
			customEXP: false,
			currentEXP: 0,
			currentEXPMultiplierValue: 2
		})
	}

	let altLevelDataList = props.formData[currentDriveForm].driveLevels.map((level, index) => {
		return (
			<FormCard
				key={level.level}
				level={level}
				isEditing={currentDriveFormLevel === index}
				handleDriveFormLevelChange={() => handleDriveFormLevelChange(index)}
			/>)
	})

	altLevelDataList.push(
		<Row key={'allLevels'}>
			<button
				className={`editAllFormLevelButton ${props.formData[currentDriveForm].driveForm.toLowerCase()}`}
				disabled={currentDriveFormLevel === 6}
				onClick={() => handleDriveFormLevelChange(6)}
				style={{ fontFamily: 'KHGummi', fontSize: '1.5rem' }}
			>
				{(currentDriveFormLevel === 6 ? 'EDITING... ' : 'EDIT ')} <br />
				ALL {props.formData[currentDriveForm].driveForm.toUpperCase()} LEVELS
			</button>
		</Row>
	)

	let DisplayedFormForm = [
		<FormForm
			currentDriveFormLevelData={props.formData[currentDriveForm].driveLevels[currentDriveFormLevel]}
			currentDriveForm={props.formData[currentDriveForm].driveForm}
			currentDriveFormLevel={currentDriveFormLevel}
			currentFormFieldData={currentFormFieldData}
			closeFormCard={() => handleDriveFormLevelChange(-1)}
			setCurrentFormFieldData={(fieldName, newValue) => setCurrentFormFieldData({ ...currentFormFieldData, [fieldName]: newValue })}
			setCurrentDriveFormLevel={updateCurrentDriveFormLevelData}
		/>,
		<AllFormForm
			currentDriveFormLevelData={props.formData[currentDriveForm].driveLevels[currentDriveFormLevel]}
			currentDriveForm={props.formData[currentDriveForm].driveForm}
			currentAllFormFieldData={currentAllFormFieldData}
			closeFormCard={() => handleDriveFormLevelChange(-1)}
			setCurrentAllFormFieldData={(fieldName, newValue) => setCurrentAllFormFieldData({ ...currentAllFormFieldData, [fieldName]: newValue })}
			handleAllEXPSwitch={handleAllEXPSwitch}
			setAllLevels={updateAllDriveFormLevelData}
		/>,
		<></>
	]

	return (
		<Container fluid style={{ marginTop: '1rem' }}>
			<Row>
				<Col xs={3}>
					<FormList
						currentForm={currentDriveForm}
						currentSelectItem={currentDriveForm}
						setCurrentSelectItem={(newDriveFormLevel) => { handleDriveFormChange(newDriveFormLevel) }}
					/>
				</Col>
				<Col xs={5}>
					{altLevelDataList}
				</Col>
				<Col xs={4}>
					{DisplayedFormForm[currentDisplayedForm]}
				</Col>
			</Row>
		</Container>
	)
}

export default FormPage