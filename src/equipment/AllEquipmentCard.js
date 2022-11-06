import { React } from 'react'
import { Button } from 'react-bootstrap'

function AllEquipmentCard(props) {
	// PROPS:
	// currentWorldFolderName: current world for use in image lookup -> string
	// handleReplace: handle reward replacement -> function

	let equipmentImage = './images/equipmentImages/' + props.currentFolderName + '/' + props.currentFolderName + '.png'

	function getfullEquipmentTypeText(equipmentType) {
		if (equipmentType === 'acc') return 'Accessories'
		if (equipmentType === 'alw') return 'Ally Weapons'
		if (equipmentType === 'arm') return 'Armor'
		if (equipmentType === 'dst') return 'Donald Staves'
		if (equipmentType === 'gsh') return 'Goofy Shields'
		if (equipmentType === 'key') return 'Keyblades'
	}

	return (
		<div className='equipmentCard'>
			<div className={'equipmentColumn equipmentImageColumn' + (!props.isWide ? ' equipmentSquishColumn' : '')}>
				<img
					className={'equipmentImage' + (!props.isWide ? ' equipmentSquishImage' : '')}
					src={equipmentImage}
					alt={'All Equipment Icon'}
				/>
				<div className={'equipmentName' + (!props.isWide ? ' equipmentSquishName' : '')}>All {getfullEquipmentTypeText(props.currentFolderName)}</div>
				<div className='equipmentEditButton'>
					<Button
						variant='primary'
						block
						id={props.id}
						disabled={props.isEditing}
						onClick={() => props.setCurrentEquipment(props.id)}
					>
						{props.isEditing ? 'EDITING...' : 'EDIT'}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default AllEquipmentCard