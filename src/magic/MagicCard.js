import { React } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import EditStatusPopover from '../Components/EditStatusPopover'

function MagicCard(props) {
	let magicImage = require(`../assets/${props.magic.pathName}.png`)

	let magicCostList = props.magic.abilities.map(ability => {
		return (
			<li key={ability.ability}>
				<Row>
					<Col xs={8}>{ability.ability}:</Col>
					<Col xs={4}>{ability.replacementCost}</Col>
				</Row>
			</li>
		)
	})

	let overlayPopover = <EditStatusPopover
		text={'NEW!'}
		message={''}
		type='magic'
	/>

	return (
		<Card
			border='dark'
			bg='dark'
			className='magicCard'
			style={{ margin: '10px', textAlign: 'center' }}
		>
			<div style={{ position: 'relative' }}>
				<Card.Img
					variant='top'
					src={magicImage}
					height='200px'
					width='200px'
				/>
				{props.magic.abilities.some(ability => ability.isReplaced()) ? overlayPopover : <></>}
			</div>
			<Card.Header className='cardHeader'>
				{props.magic.magicType}
			</Card.Header>
			<Card.Body>
				<Card.Text as='div'>
					<ul style={{ listStyle: "none", margin: 0, padding: 0, textAlign: "left" }}>{magicCostList}</ul>
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Container fluid>
					<Row>
						<Button
							variant='primary'
							block
							id={props.id}
							disabled={props.isEditing}
							onClick={() => props.setCurrentMagic(props.id)}
						>
							{props.isEditing ? 'EDITING...' : 'EDIT'}
						</Button>
					</Row>
				</Container>
			</Card.Footer>
		</Card>
	)
}

export default MagicCard