import { React } from 'react'
import { Container, Row, Button, Card } from 'react-bootstrap'

function AllEquipmentCard(props) {
	// PROPS:
	// currentWorldFolderName: current world for use in image lookup -> string
	// handleReplace: handle reward replacement -> function

	let equipmentTypeImage = require(`../assets/equipmentImages/${props.currentFolderName}/${props.currentFolderName}.png`)

	function getfullEquipmentTypeText(equipmentType) {
		if (equipmentType === 'acc') return 'Accessories'
		if (equipmentType === 'alw') return 'Ally Weapons'
		if (equipmentType === 'arm') return 'Armor'
		if (equipmentType === 'dst') return 'Donald Staves'
		if (equipmentType === 'gsh') return 'Goofy Shields'
		if (equipmentType === 'key') return 'Keyblades'
	}

	return (
		<Card
			border='dark'
			bg='dark'
			className='equipmentCard'
			style={{ margin: '10px', textAlign: 'center' }}
		>
			<div style={{ position: 'relative' }}>
				<Card.Img
					variant='top'
					src={equipmentTypeImage.default}
					height='200px'
					width='200px'
				/>
			</div>
			<Card.Header className='cardHeader'>
				All {getfullEquipmentTypeText(props.currentFolderName)}
			</Card.Header>
			<Card.Footer>
				<Container fluid>
					<Row>
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
				</Container>
			</Card.Footer>
		</Card>
	)
}

export default AllEquipmentCard