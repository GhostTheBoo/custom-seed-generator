import { React, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import FormForm from './newFormForm'
import FormCard from './newFormCard'

function FormPage(props) {
	// PROPS:
	// formData: array of drive form's levels -> {driveForm, removeGrowthJankPnachCodes[] , removeGrowthJankLuaCodes[] , driveLevels[]}[]
	// setAllForms: parent state function to set all forms -> function

	const [currentDriveForm, setCurrentDriveForm] = useState(0)
	const [currentDriveFormLevel, setCurrentDriveFormLevel] = useState(-1)
	const [currentFormFieldData, setCurrentFormFieldData] = useState({
		replacementReward: { ...props.formData[0].driveLevels[0].replacementReward },
		replacementEXP: props.formData[0].driveLevels[0].replacementEXP
	})

	function updateFormLevel(newFormLevel) {
		let newFormLevels = props.formData[currentDriveForm].driveLevels.map(driveLevel => {
			if (newFormLevel.rewardAddress === driveLevel.rewardAddress)
				return newFormLevel
			return driveLevel
		})
		updateAllForms(newFormLevels)
	}
	function updateAllForms(newFormLevels) {
		let newFormData = props.formData.map((driveform, driveFormIndex) => {
			if (currentDriveForm === driveFormIndex)
				return {
					...driveform,
					driveLevels: newFormLevels
				}
			return driveform
		})
		props.setAllChests(newFormData)
	}
	
	let driveFormLevelList = props.formData[currentDriveForm].driveLevels.map((driveFormLevel, levelIndex) => {
		return (
			<Col
				key={driveFormLevel.level}
				xs
			>
				<FormCard
					key={levelIndex}
					id={levelIndex}
					level={driveFormLevel}
					handleVanilla={(replacedDriveFormLevel) => { updateFormLevel(replacedDriveFormLevel.vanilla()) }}
					handleReplace={(replacedDriveFormLevel, newFormData) => { updateFormLevel(replacedDriveFormLevel.replace(newFormData)) }}
				/>
			</Col>
		)
	})

	return (
		<Container fluid>
			<Row>
				<GenericSelect
					class={'form'}
					selector={'Drive Form'}
					itemList={props.formData.map(driveForm => { return driveForm.driveForm })}
					name={'currentDriveForm'}
					currentItem={currentDriveForm}
					onChange={(e) => setCurrentDriveForm(parseInt(e.target.value))}
				/>
			</Row>
			<Row>
				<Col xs={4}>
					{driveFormLevelList}
				</Col>
				<Col xs={6}>
					{
						currentDriveFormLevel !== -1
							? <FormForm
								currentFormFieldData={currentFormFieldData}
								setCurrentFormFieldData={(fieldName, newValue) => setCurrentFormFieldData({ ...currentFormFieldData, [fieldName]: newValue })}
								formLevel={props.formData[currentDriveForm].driveLevels[currentDriveFormLevel]}
								updateFormLevel={updateFormLevel}
							/>
							: <></>
					}
				</Col>
			</Row>
		</Container>
	)
}

export default FormPage