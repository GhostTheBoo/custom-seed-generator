import { React, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import GenericListGroup from '../Components/GenericListGroup'
import Icon from '../Components/Icon'
import FormForm from './FormForm'
import AllFormForm from './AllFormForm'

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
			setCurrentDisplayedForm(0)
		}
		setCurrentDriveFormLevel(newDriveFormLevel)
	}
	function updateCurrentFormFieldData(currentDriveForm, currentDriveFormLevel) {
		setCurrentFormFieldData({
			reward: { ...props.formData[currentDriveForm].driveLevels[currentDriveFormLevel].replacementReward },
			currentEXP: props.formData[currentDriveForm].driveLevels[currentDriveFormLevel].replacementEXP,
			currentEXPMultiplierValue: 2
		})
	}
	function updateCurrentAllFormFieldData(currentDriveForm) {
		setCurrentAllFormFieldData({
			reward: { ...props.formData[currentDriveForm].driveLevels[1].replacementReward },
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
		setCurrentDriveFormLevel(-1)
		setCurrentDisplayedForm(2)
		setCurrentFormFieldData({
			reward: { ...newDriveLevel.replacementReward },
			currentEXP: newDriveLevel.replacementEXP,
			currentEXPMultiplierValue: 2
		})
	}
	function updateAllDriveFormLevelData(replaceType) {
		props.setAllForms(props.formData.map((driveForm, driveFormIndex) => {
			if (driveFormIndex === currentDriveForm) {
				let newDriveLevels = driveForm.driveLevels.map(driveLevel => {
					return replaceType === 'vanilla'
						? driveLevel.vanilla()
						: driveLevel.replace(currentAllFormFieldData)
				})
				return ({
					...driveForm,
					driveLevels: newDriveLevels
				})
			}
			return driveForm
		}))
		setCurrentDriveFormLevel(-1)
		setCurrentDisplayedForm(2)
		setCurrentFormFieldData({
			reward: { ...props.formData[currentDriveForm].driveLevels[2].replacementReward },
			currentEXP: 0,
			currentEXPMultiplierValue: 2
		})
	}

	let levelDataList = props.formData[currentDriveForm].driveLevels.map(level => {
		return (
			<Row>
				<Col xs={1}>
					{level.level.slice(-1)}:
				</Col>
				<Col xs={7}>
					{level.isRewardReplaced()
						? 'New Reward: '
						: <></>
					}
					<Icon
						fileName={level.replacementReward.iconType}
						type={'row'}
					>
						{level.replacementReward.reward}
					</Icon>
				</Col>
				<Col xs={4}>
					{level.isEXPReplaced()
						? 'New '
						: <></>
					}
					EXP: {level.replacementEXP}
				</Col>
			</Row>
		)
	})

	levelDataList.push(
		<Row style={{ justifyContent: 'center' }}>
			EDIT ALL {props.formData[currentDriveForm].driveForm.toUpperCase()} LEVELS
		</Row>
	)

	let DisplayedFormForm = [
		<FormForm
			currentDriveFormLevelData={props.formData[currentDriveForm].driveLevels[currentDriveFormLevel]}
			currentDriveForm={props.formData[currentDriveForm].driveForm}
			currentDriveFormLevel={currentDriveFormLevel}
			currentFormFieldData={currentFormFieldData}
			setCurrentFormFieldData={(fieldName, newValue) => setCurrentFormFieldData({ ...currentFormFieldData, [fieldName]: newValue })}
			setCurrentDriveFormLevel={updateCurrentDriveFormLevelData}
		/>,
		<AllFormForm
			currentDriveFormLevelData={props.formData[currentDriveForm].driveLevels[currentDriveFormLevel]}
			currentDriveForm={props.formData[currentDriveForm].driveForm}
			currentFormFieldData={currentAllFormFieldData}
			setCurrentFormFieldData={(fieldName, newValue) => setCurrentAllFormFieldData({ ...currentAllFormFieldData, [fieldName]: newValue })}
			setAllLevels={updateAllDriveFormLevelData}
		/>,
		<></>
	]


	return (
		<Container fluid>
			<Row>
				<GenericSelect
					class={'form'}
					selector={'Drive Form'}
					itemList={props.formData.map(form => { return form.driveForm })}
					name={'currentDriveForm'}
					currentItem={currentDriveForm}
					onChange={(e) => { handleDriveFormChange(parseInt(e.target.value)) }}
				/>
			</Row>
			<Row>
				<Col xs={5}>
					<GenericListGroup
						dataList={levelDataList}
						currentSelectItem={currentDriveFormLevel}
						setCurrentSelectItem={(newDriveFormLevel) => {
							handleDriveFormLevelChange(newDriveFormLevel)
						}}
					/>
				</Col>
				<Col xs={7}>
					{DisplayedFormForm[currentDisplayedForm]}
				</Col>
			</Row>
		</Container>
	)
}

export default FormPage