import { React, useState, useEffect, useRef } from 'react'
import { Row, Container, Col } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import EquipmentCard from './EquipmentCard'
import AllEquipmentCard from './AllEquipmentCard'
import EquipmentForm from './EquipmentForm'
import AllEquipmentForm from './AllEquipmentForm'

function EquipmentPage(props) {

	const [currentEquipmentType, setCurrentEquipmentType] = useState(0)
	const [currentEquipment, setCurrentEquipment] = useState(-1)
	const [currentDisplayedForm, setCurrentDisplayedForm] = useState(2)
	const [currentEquipmentFieldData, setCurrentEquipmentFieldData] = useState({
		ability: { ...props.equipmentData[currentEquipmentType].equipments[0].replacementAbility },
		currentAP: props.equipmentData[currentEquipmentType].equipments[0].ap,
		currentStrength: props.equipmentData[currentEquipmentType].equipments[0].strength,
		currentMagic: props.equipmentData[currentEquipmentType].equipments[0].magic,
		currentDefense: props.equipmentData[currentEquipmentType].equipments[0].defense,
		currentFire: props.equipmentData[currentEquipmentType].equipments[0].fire,
		currentBlizzard: props.equipmentData[currentEquipmentType].equipments[0].blizzard,
		currentThunder: props.equipmentData[currentEquipmentType].equipments[0].thunder,
		currentPhysical: props.equipmentData[currentEquipmentType].equipments[0].physical,
		currentDark: props.equipmentData[currentEquipmentType].equipments[0].dark,
		currentLight: props.equipmentData[currentEquipmentType].equipments[0].light,
		currentUniversal: props.equipmentData[currentEquipmentType].equipments[0].universal
	})
	const [currentAllEquipmentFieldData, setCurrentAllEquipmentFieldData] = useState({
		modifyAbility: false,
		modifyStats: false,
		modifyResistances: false
	})
	const equipmentCardGrid = useRef(null)
	useEffect(() => {
		equipmentCardGrid.current.scrollTo({ top: 0, behavior: 'smooth' })
	}, [currentEquipmentType])

	function handleCurrentEquipmentTypeChange(newEquipmentType) {
		setCurrentEquipmentType(newEquipmentType)
		setCurrentDisplayedForm(2)
		handleCurrentEquipmentChange(-1)
		resetEquipmentFieldData()
	}
	function handleCurrentEquipmentChange(newEquipment) {
		setCurrentEquipment(newEquipment)
		handleDisplayedFormChange(newEquipment)
		resetEquipmentFieldData()
		if (newEquipment !== -1 && newEquipment !== currentEquipmentList.length) {
			let newEquipmentData = props.equipmentData[currentEquipmentType].equipments[newEquipment]
			setCurrentEquipmentFieldData({
				ability: { ...newEquipmentData.replacementAbility },
				currentAP: newEquipmentData.ap,
				currentStrength: newEquipmentData.strength,
				currentMagic: newEquipmentData.magic,
				currentDefense: newEquipmentData.defense,
				currentFire: newEquipmentData.fire,
				currentBlizzard: newEquipmentData.blizzard,
				currentThunder: newEquipmentData.thunder,
				currentPhysical: newEquipmentData.physical,
				currentDark: newEquipmentData.dark,
				currentLight: newEquipmentData.light,
				currentUniversal: newEquipmentData.universal
			})
		}
	}
	function handleDisplayedFormChange(newEquipment) {
		if (newEquipment === -1) setCurrentDisplayedForm(2)
		else if (newEquipment === currentEquipmentList.length) setCurrentDisplayedForm(1)
		else setCurrentDisplayedForm(0)
	}
	function resetEquipmentFieldData() {
		let baseEquipmentData = props.equipmentData[currentEquipmentType].equipments[0]
		setCurrentEquipmentFieldData({
			ability: { ...baseEquipmentData.replacementAbility },
			currentAP: baseEquipmentData.ap,
			currentStrength: baseEquipmentData.strength,
			currentMagic: baseEquipmentData.magic,
			currentDefense: baseEquipmentData.defense,
			currentFire: baseEquipmentData.fire,
			currentBlizzard: baseEquipmentData.blizzard,
			currentThunder: baseEquipmentData.thunder,
			currentPhysical: baseEquipmentData.physical,
			currentDark: baseEquipmentData.dark,
			currentLight: baseEquipmentData.light,
			currentUniversal: baseEquipmentData.universal
		})
		setCurrentAllEquipmentFieldData({
			modifyAbility: false,
			modifyStats: false,
			modifyResistances: false
		})
	}

	let columnNum = 4
	let currentEquipmentList = props.equipmentData[currentEquipmentType].equipments

	const equipmentFolderNames = [
		'key',
		'dst',
		'gsh',
		'alw',
		'arm',
		'acc'
	]

	function updateEquipment(newEquipment) {
		let newEquipmentList = currentEquipmentList.map(equipment => {
			if (newEquipment.baseAddress === equipment.baseAddress)
				return newEquipment
			return equipment
		})
		updateAllEquipment(newEquipmentList)
	}
	function updateAllEquipment(newEquipmentList) {
		let newEquipmentData = props.equipmentData.map((equipmentType, equipmentTypeIndex) => {
			if (currentEquipmentType === equipmentTypeIndex)
				return {
					equipmentType: equipmentType.equipmentType,
					equipments: newEquipmentList
				}
			return equipmentType
		})
		props.setAllEquipments(newEquipmentData)
		handleCurrentEquipmentChange(-1)
	}
	function replaceAllEquipment() {
		let newEquipmentList = props.equipmentData[currentEquipmentType].equipments.map((equipment) => {
			let newEquipmentData = {
				ability: { ...equipment.replacementAbility },
				currentAP: equipment.ap,
				currentStrength: equipment.strength,
				currentMagic: equipment.magic,
				currentDefense: equipment.defense,
				currentFire: equipment.fire,
				currentBlizzard: equipment.blizzard,
				currentThunder: equipment.thunder,
				currentPhysical: equipment.physical,
				currentDark: equipment.dark,
				currentLight: equipment.light,
				currentUniversal: equipment.universal
			}
			if (currentAllEquipmentFieldData.modifyAbility)
				newEquipmentData.ability = { ...currentEquipmentFieldData.ability }
			if (currentAllEquipmentFieldData.modifyStats) {
				newEquipmentData.currentAP = currentEquipmentFieldData.currentAP
				newEquipmentData.currentStrength = currentEquipmentFieldData.currentStrength
				newEquipmentData.currentMagic = currentEquipmentFieldData.currentMagic
				newEquipmentData.currentDefense = currentEquipmentFieldData.currentDefense
			}
			if (currentAllEquipmentFieldData.modifyResistances) {
				newEquipmentData.currentFire = currentEquipmentFieldData.currentFire
				newEquipmentData.currentBlizzard = currentEquipmentFieldData.currentBlizzard
				newEquipmentData.currentThunder = currentEquipmentFieldData.currentThunder
				newEquipmentData.currentDark = currentEquipmentFieldData.currentDark
				newEquipmentData.currentPhysical = currentEquipmentFieldData.currentPhysical
				newEquipmentData.currentLight = currentEquipmentFieldData.currentLight
				newEquipmentData.currentUniversal = currentEquipmentFieldData.currentUniversal
			}
			return equipment.replace(newEquipmentData)
		})
		updateAllEquipment(newEquipmentList)
	}
	function vanillaAllEquipment() {
		let newEquipmentList = props.equipmentData[currentEquipmentType].equipments.map((equipment) => {
			let newEquipmentData = {
				ability: { ...equipment.replacementAbility },
				currentAP: equipment.ap,
				currentStrength: equipment.strength,
				currentMagic: equipment.magic,
				currentDefense: equipment.defense,
				currentFire: equipment.fire,
				currentBlizzard: equipment.blizzard,
				currentThunder: equipment.thunder,
				currentPhysical: equipment.physical,
				currentDark: equipment.dark,
				currentLight: equipment.light,
				currentUniversal: equipment.universal
			}
			if (currentAllEquipmentFieldData.modifyAbility)
				newEquipmentData.ability = { ...equipment.vanillaAbility }
			if (currentAllEquipmentFieldData.modifyStats) {
				newEquipmentData.currentAP = equipment.vanillaAP
				newEquipmentData.currentStrength = equipment.vanillaStrength
				newEquipmentData.currentMagic = equipment.vanillaMagic
				newEquipmentData.currentDefense = equipment.vanillaDefense
			}
			if (currentAllEquipmentFieldData.modifyResistances) {
				newEquipmentData.currentFire = equipment.vanillaFire
				newEquipmentData.currentBlizzard = equipment.vanillaBlizzard
				newEquipmentData.currentThunder = equipment.vanillaThunder
				newEquipmentData.currentDark = equipment.vanillaPhysical
				newEquipmentData.currentPhysical = equipment.vanillaDark
				newEquipmentData.currentLight = equipment.vanillaLight
				newEquipmentData.currentUniversal = equipment.vanillaUniversal
			}
			return equipment.replace(newEquipmentData)
		})
		updateAllEquipment(newEquipmentList)
	}

	let baseEquipmentList = currentEquipmentList.map((equipment, equipmentIndex) => {
		return (
			<Col
				key={'equipment' + currentEquipmentType + '_' + equipmentIndex}
				xs
			>
				<EquipmentCard
					key={equipmentIndex}
					id={equipmentIndex}
					equipment={equipment}
					isEditing={equipmentIndex === currentEquipment}
					currentFolderName={equipmentFolderNames[currentEquipmentType]}
					setCurrentEquipment={handleCurrentEquipmentChange}
				/>
			</Col>
		)
	})
	baseEquipmentList.push(
		<Col
			key={'equipment' + currentEquipmentType + '_' + baseEquipmentList.length}
			xs
		>
			<AllEquipmentCard
				key={baseEquipmentList.length}
				id={baseEquipmentList.length}
				isEditing={baseEquipmentList.length === currentEquipment}
				currentFolderName={equipmentFolderNames[currentEquipmentType]}
				setCurrentEquipment={handleCurrentEquipmentChange}
			/>
		</Col>
	)

	let equipmentRowList = []

	for (let i = baseEquipmentList.length; baseEquipmentList.length % columnNum !== 0; i++)
		baseEquipmentList.push(<Col key={currentEquipmentType + '_empty_' + i} xs />)
	let j = 0
	for (let i = 0; i < baseEquipmentList.length; i += columnNum, j++) {
		equipmentRowList.push(
			<Row
				id={'equipmentRow' + j}
				key={'equipmentRow' + currentEquipmentType + '_' + i}
			>
				{baseEquipmentList.slice(i, i + columnNum)}
			</Row>
		)
	}

	let displayedEquipmentForm = [
		<EquipmentForm
			equipment={props.equipmentData[currentEquipmentType].equipments[currentEquipment]}
			currentFolderName={equipmentFolderNames[currentEquipmentType]}
			currentEquipmentFieldData={currentEquipmentFieldData}
			setCurrentEquipmentFieldData={(fieldName, newValue) => setCurrentEquipmentFieldData({ ...currentEquipmentFieldData, [fieldName]: newValue })}
			closeFormCard={handleCurrentEquipmentChange}
			handleVanilla={(replacedEquipment) => { updateEquipment(replacedEquipment.vanilla()) }}
			handleReplace={(replacedEquipment, currentEquipmentFieldData) => { updateEquipment(replacedEquipment.replace(currentEquipmentFieldData)) }}
		/>,
		<AllEquipmentForm
			currentFolderName={equipmentFolderNames[currentEquipmentType]}
			currentEquipmentFieldData={currentEquipmentFieldData}
			currentAllEquipmentFieldData={currentAllEquipmentFieldData}
			setCurrentEquipmentFieldData={(fieldName, newValue) => setCurrentEquipmentFieldData({ ...currentEquipmentFieldData, [fieldName]: newValue })}
			setCurrentAllEquipmentFieldData={(fieldName, newValue) => setCurrentAllEquipmentFieldData({ ...currentAllEquipmentFieldData, [fieldName]: newValue })}
			closeFormCard={handleCurrentEquipmentChange}
			handleVanilla={vanillaAllEquipment}
			handleReplace={replaceAllEquipment}
		/>,
		<></>
	]

	return (
		<Container fluid>
			<Row>
				<GenericSelect
					class={'equipment'}
					selector={'World'}
					itemList={props.equipmentData.map(equipmentType => { return equipmentType.equipmentType })}
					name={'currentEquipmentType'}
					currentItem={currentEquipmentType}
					onChange={(e) => handleCurrentEquipmentTypeChange(parseInt(e.target.value))}
				/>
			</Row>
			<Row>
				<Col>
					<Container
						fluid
						className='cardGrid'
						ref={equipmentCardGrid}
						style={{
							overflowY: 'auto',
							height: '800px'
						}}
					>
						{equipmentRowList}
					</Container>
				</Col>
				<Col xs={5}>
					{displayedEquipmentForm[currentDisplayedForm]}
				</Col>
			</Row>
		</Container>
	)
}

export default EquipmentPage