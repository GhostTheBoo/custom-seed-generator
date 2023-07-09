import React from 'react'
import { Button } from 'react-bootstrap'
import Icon from '../Components/Icon'

function AllEquipmentCard(props) {
	// PROPS:
	// currentWorldFolderName: current world for use in image lookup -> string
	// handleReplace: handle reward replacement -> function

	let fileNameList = [
		'keyblade',
		'donald',
		'goofy',
		'ally',
		'armor',
		'accessory'
	]

	function getfullEquipmentTypeText(equipmentType) {
		if (equipmentType === 'acc') return 'Accessories'
		if (equipmentType === 'alw') return 'Ally Weapons'
		if (equipmentType === 'arm') return 'Armor'
		if (equipmentType === 'dst') return 'Donald Staves'
		if (equipmentType === 'gsh') return 'Goofy Shields'
		if (equipmentType === 'key') return 'Keyblades'
	}

	function handleEditOnClick() {
		props.setCurrentEquipment(props.id)
		props.setIsEditing(true)
	}

	function handleMouseEnter() {
		if (props.isFormOpen && !props.isEditing) props.setCurrentEquipment(props.id)
	}

	let currentState = ''
	if (props.isSelected)
		currentState = props.isEditing ? ' selected' : ' hovered'

	return (
		<div
			className={`equipmentCard all${currentState}`}
			onMouseEnter={handleMouseEnter}
		>
			<Icon
				fileName={fileNameList[props.currentEquipmentType]}
				type={'form'}
				className={'equipmentTypeIcon'}
			>
				{`All ${getfullEquipmentTypeText(props.currentFolderName)}`}
			</Icon>
			<div />
			<Button variant='outline-info' onClick={handleEditOnClick} disabled={currentState === ' selected'}>
				{currentState !== ' selected' ? 'EDIT' : 'EDITING...'}
			</Button>
		</div>
	)
}

export default AllEquipmentCard