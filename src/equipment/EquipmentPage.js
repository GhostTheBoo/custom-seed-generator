import { React, useState, useEffect, useRef } from 'react'
import { Container, Form } from 'react-bootstrap'

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
		modifyAP: false,
		modifyStrength: false,
		modifyMagic: false,
		modifyDefense: false,
		modifyFire: false,
		modifyBlizzard: false,
		modifyThunder: false,
		modifyDark: false,
		modifyPhysical: false,
		modifyLight: false,
		modifyUniversal: false
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
			modifyAP: false,
			modifyStrength: false,
			modifyMagic: false,
			modifyDefense: false,
			modifyFire: false,
			modifyBlizzard: false,
			modifyThunder: false,
			modifyDark: false,
			modifyPhysical: false,
			modifyLight: false,
			modifyUniversal: false
		})
	}
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
				ability: { ...(currentAllEquipmentFieldData.modifyAbility ? currentEquipmentFieldData.ability : equipment.replacementAbility) },
				currentAP: currentAllEquipmentFieldData.modifyAP ? currentEquipmentFieldData.currentAP : equipment.ap,
				currentStrength: currentAllEquipmentFieldData.modifyStrength ? currentEquipmentFieldData.currentStrength : equipment.strength,
				currentMagic: currentAllEquipmentFieldData.modifyMagic ? currentEquipmentFieldData.currentMagic : equipment.magic,
				currentDefense: currentAllEquipmentFieldData.modifyDefense ? currentEquipmentFieldData.currentDefense : equipment.defense,
				currentFire: currentAllEquipmentFieldData.modifyFire ? currentEquipmentFieldData.currentFire : equipment.fire,
				currentBlizzard: currentAllEquipmentFieldData.modifyBlizzard ? currentEquipmentFieldData.currentBlizzard : equipment.blizzard,
				currentThunder: currentAllEquipmentFieldData.modifyThunder ? currentEquipmentFieldData.currentThunder : equipment.thunder,
				currentPhysical: currentAllEquipmentFieldData.modifyPhysical ? currentEquipmentFieldData.currentPhysical : equipment.physical,
				currentDark: currentAllEquipmentFieldData.modifyDark ? currentEquipmentFieldData.currentDark : equipment.dark,
				currentLight: currentAllEquipmentFieldData.modifyLight ? currentEquipmentFieldData.currentLight : equipment.light,
				currentUniversal: currentAllEquipmentFieldData.modifyUniversal ? currentEquipmentFieldData.currentUniversal : equipment.universal
			}
			return equipment.replace(newEquipmentData)
		})
		updateAllEquipment(newEquipmentList)
	}
	function vanillaAllEquipment() {
		let newEquipmentList = props.equipmentData[currentEquipmentType].equipments.map((equipment) => {
			let newEquipmentData = {
				ability: { ...(currentAllEquipmentFieldData.modifyAbility ? equipment.vanillaAbility : equipment.replacementAbility) },
				currentAP: currentAllEquipmentFieldData.modifyAP ? equipment.vanillaAP : equipment.ap,
				currentStrength: currentAllEquipmentFieldData.modifyStrength ? equipment.vanillaStrength : equipment.strength,
				currentMagic: currentAllEquipmentFieldData.modifyMagic ? equipment.vanillaMagic : equipment.magic,
				currentDefense: currentAllEquipmentFieldData.modifyDefense ? equipment.vanillaDefense : equipment.defense,
				currentFire: currentAllEquipmentFieldData.modifyFire ? equipment.vanillaFire : equipment.fire,
				currentBlizzard: currentAllEquipmentFieldData.modifyBlizzard ? equipment.vanillaBlizzard : equipment.blizzard,
				currentThunder: currentAllEquipmentFieldData.modifyThunder ? equipment.vanillaThunder : equipment.thunder,
				currentPhysical: currentAllEquipmentFieldData.modifyPhysical ? equipment.vanillaPhysical : equipment.physical,
				currentDark: currentAllEquipmentFieldData.modifyDark ? equipment.vanillaDark : equipment.dark,
				currentLight: currentAllEquipmentFieldData.modifyLight ? equipment.vanillaLight : equipment.light,
				currentUniversal: currentAllEquipmentFieldData.modifyUniversal ? equipment.vanillaUniversal : equipment.universal
			}
			return equipment.replace(newEquipmentData)
		})
		updateAllEquipment(newEquipmentList)
	}

	let equipmentRowList = currentEquipmentList.map((equipment, equipmentIndex) => {
		return (
			<EquipmentCard
				key={'equipment' + currentEquipmentType + '_' + equipmentIndex}
				id={equipmentIndex}
				equipment={equipment}
				isEditing={equipmentIndex === currentEquipment}
				currentFolderName={equipmentFolderNames[currentEquipmentType]}
				setCurrentEquipment={handleCurrentEquipmentChange}
				isWide={currentDisplayedForm === 2}
			/>
		)
	})
	equipmentRowList.push(
		<AllEquipmentCard
			key={equipmentRowList.length}
			id={equipmentRowList.length}
			isEditing={equipmentRowList.length === currentEquipment}
			currentFolderName={equipmentFolderNames[currentEquipmentType]}
			setCurrentEquipment={handleCurrentEquipmentChange}
			isWide={currentDisplayedForm === 2}
		/>
	)

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
			<div className='pageHeader'>
				<div><Form.Label>Equipment Type Selector:</Form.Label></div>
				<div>
					<GenericSelect
						class={'equipment'}
						selector={'Equipment Type'}
						itemList={props.equipmentData.map(equipmentType => { return equipmentType.equipmentType })}
						name={'currentEquipmentType'}
						currentItem={currentEquipmentType}
						onChange={(e) => handleCurrentEquipmentTypeChange(parseInt(e.target.value))}
					/>
				</div>
				<div className='flex-grow-1' />
				<div>{props.children}</div>
			</div>
			<div className='equipmentPageContent'>
				<div className='equipmentCardList flex-grow-1' ref={equipmentCardGrid}>{equipmentRowList}</div>
				{displayedEquipmentForm[currentDisplayedForm]}
			</div>
		</Container>
	)
}

export default EquipmentPage