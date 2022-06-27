import { React, useState, useEffect, useRef } from 'react'
import { Row, Container, Col } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
// import AllChestCard from './newAllEquipmentCard'
import EquipmentCard from './EquipmentCard'
import EquipmentForm from './Archive - newEquipmentForm'

function EquipmentPage(props) {

	const [currentEquipmentType, setCurrentEquipmentType] = useState(0)
	const [currentEquipment, setCurrentEquipment] = useState(-1)
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
	const equipmentCardGrid = useRef(null)
	useEffect(() => {
		equipmentCardGrid.current.scrollTo({ top: 0, behavior: 'smooth' })
	}, [currentEquipmentType])

	function handleCurrentEquipmentTypeChange(newEquipmentType) {
		setCurrentEquipmentType(newEquipmentType)
		handleCurrentEquipmentChange(-1)
		setCurrentEquipmentFieldData({
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
	}
	function handleCurrentEquipmentChange(newEquipment) {
		setCurrentEquipment(newEquipment)
		if (newEquipment !== -1) {
			setCurrentEquipmentFieldData({
				ability: { ...props.equipmentData[currentEquipmentType].equipments[newEquipment].replacementAbility },
				currentAP: props.equipmentData[currentEquipmentType].equipments[newEquipment].ap,
				currentStrength: props.equipmentData[currentEquipmentType].equipments[newEquipment].strength,
				currentMagic: props.equipmentData[currentEquipmentType].equipments[newEquipment].magic,
				currentDefense: props.equipmentData[currentEquipmentType].equipments[newEquipment].defense,
				currentFire: props.equipmentData[currentEquipmentType].equipments[newEquipment].fire,
				currentBlizzard: props.equipmentData[currentEquipmentType].equipments[newEquipment].blizzard,
				currentThunder: props.equipmentData[currentEquipmentType].equipments[newEquipment].thunder,
				currentPhysical: props.equipmentData[currentEquipmentType].equipments[newEquipment].physical,
				currentDark: props.equipmentData[currentEquipmentType].equipments[newEquipment].dark,
				currentLight: props.equipmentData[currentEquipmentType].equipments[newEquipment].light,
				currentUniversal: props.equipmentData[currentEquipmentType].equipments[newEquipment].universal
			})
		}
	}
	function scrollToForm(newEquipment) {
		if (newEquipment % columnNum === 0) {
			let topRow = document.getElementById('equipmentRow' + newEquipment / columnNum);
			// setTimeout(() => topRow.scrollIntoView(), 0)
			topRow.scrollIntoView({ behavior: "smooth" })
		} else if (newEquipment !== -1) {
			let row = Math.floor(newEquipment / columnNum) + 1
			console.log('Equipment Index: ' + newEquipment)
			console.log('Scrolling to: equipmentRow' + row)
			let topRow = document.getElementById('equipmentRow' + row);
			if (topRow === null) topRow = document.getElementById('equipmentRow' + (row - 1))
			topRow.scrollIntoView({ behavior: "smooth" })
		}
	}
	function closeEquipmentForm() {
		scrollToForm(currentEquipment - currentEquipment % columnNum)
		handleCurrentEquipmentChange(-1)
	}

	let columnNum = 7
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
	function getEquipmentRowList() {
		let equipmentRowList = []
		// create row list for no selected equipment
		if (currentEquipment === -1) {
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
		} else {
			let i = 0
			let preEquipmentList = baseEquipmentList.slice(0, currentEquipment)
			for (; preEquipmentList.length % columnNum !== 0; i++)
				preEquipmentList.push(<Col key={'equipmentRow' + currentEquipmentType + '_empty_' + i} xs />)

			let postEquipmentList = baseEquipmentList.slice(currentEquipment + 1)
			for (; postEquipmentList.length % columnNum !== 0; i++)
				postEquipmentList.push(<Col key={'equipmentRow' + currentEquipmentType + '_empty_' + i} xs />)

			let j = 0
			for (let i = 0; i < preEquipmentList.length; i += columnNum, j++) {
				equipmentRowList.push(
					<Row
						id={'equipmentRow' + j}
						key={'equipmentRow' + currentEquipmentType + '_' + j}
					>
						{preEquipmentList.slice(i, i + columnNum)}
					</Row>
				)
			}
			equipmentRowList.push(
				<Row id={'equipmentRow' + j} key={'equipmentRowForm'}>
					<Col>
						<EquipmentForm
							equipment={props.equipmentData[currentEquipmentType].equipments[currentEquipment]}
							currentFolderName={equipmentFolderNames[currentEquipmentType]}
							currentEquipmentFieldData={currentEquipmentFieldData}
							setCurrentEquipmentFieldData={(fieldName, newValue) => setCurrentEquipmentFieldData({ ...currentEquipmentFieldData, [fieldName]: newValue })}
							closeFormCard={closeEquipmentForm}
							handleVanilla={(replacedEquipment) => { updateEquipment(replacedEquipment.vanilla()) }}
							handleReplace={(replacedEquipment, currentEquipmentFieldData) => { updateEquipment(replacedEquipment.replace(currentEquipmentFieldData)) }}
						/>
					</Col>
				</Row>
			)
			j++
			for (let i = 0; i < postEquipmentList.length; i += columnNum, j++) {
				equipmentRowList.push(
					<Row
						id={'equipmentRow' + j}
						key={currentEquipmentType + '_' + i}
					>
						{postEquipmentList.slice(i, i + columnNum)}
					</Row>
				)
			}
		}
		scrollToForm(currentEquipment)
		return equipmentRowList
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
					currentFolderName={equipmentFolderNames[currentEquipmentType]}
					currentEquipmentType={currentEquipmentType}
					setCurrentEquipment={handleCurrentEquipmentChange}
				/>
			</Col>
		)
	})

	// equipmentList.push(
	// 	<Col
	// 		key={currentEquipmentType + '_' + currentEquipmentList.length}
	// 		xs
	// 	>
	// 		<AllEquipmentCard
	// 			key={currentEquipmentList.length}
	// 			id={currentEquipmentList.length}
	// 			currentFolderName={equipmentFolderNames[currentEquipmentType]}
	// 		/>
	// 	</Col>
	// )


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
			<Container
				fluid
				className='cardGrid'
				ref={equipmentCardGrid}
				style={{
					overflowY: 'auto',
					height: '800px'
				}}
			>
				{getEquipmentRowList()}
			</Container>
		</Container>
	)
}

export default EquipmentPage