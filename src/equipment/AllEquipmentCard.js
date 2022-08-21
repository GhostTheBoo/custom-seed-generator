import { React } from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'

function AllEquipmentCard(props) {
	// PROPS:
	// currentWorldFolderName: current world for use in image lookup -> string
	// handleReplace: handle reward replacement -> function

	let equipmentImage = require(`../assets/equipmentImages/${props.currentFolderName}/${props.currentFolderName}.png`)

	function getfullEquipmentTypeText(equipmentType) {
		if (equipmentType === 'acc') return 'Accessories'
		if (equipmentType === 'alw') return 'Ally Weapons'
		if (equipmentType === 'arm') return 'Armor'
		if (equipmentType === 'dst') return 'Donald Staves'
		if (equipmentType === 'gsh') return 'Goofy Shields'
		if (equipmentType === 'key') return 'Keyblades'
	}

	return (
		<Container fluid className='equipmentCard'>
			<Row>
				<Col xs='auto' className='equipmentColumn equipmentImageColumn'>
					<Row className='equipmentImage'>
						<img
							src={equipmentImage.default}
							alt={'All Equipment Icon'}
							height='250px'
							width='250px'
						/>
					</Row>
					<Row className='equipmentName'>All {getfullEquipmentTypeText(props.currentFolderName)}</Row>
					<Row className='equipmentEditButton'>
						<Button
							variant='primary'
							block
							id={props.id}
							disabled={props.isEditing}
							onClick={() => props.setCurrentEquipment(props.id)}
						>
							{props.isEditing ? 'EDITING...' : 'EDIT'}
						</Button>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}

export default AllEquipmentCard