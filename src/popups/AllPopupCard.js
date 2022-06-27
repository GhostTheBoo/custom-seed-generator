import React from 'react'
import { Container, Row, Button, Card } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'

function PopupCard(props) {
	// PROPS:
	// popup: popup of this row -> Popup
	// handleVanilla: function to make popup vanilla -> function
	// handleReplace: function to replace -> function
	// id: row number -> number

	// let worldImage = require(`../assets/chestImages/${props.currentFolderName}/${props.currentFolderName}.png`)

	return (
		<Card
			border='dark'
			bg='dark'
			className='popupCard'
			style={{ margin: '10px', textAlign: 'center' }}
		>
			{/* <Card.Img
				variant='top'
				src={worldImage.default}
				height='300px'
				width='100px'
			/> */}
			<Card.Body>
				<Card.Title className='cardTitle'>
					{'All Popups'}
				</Card.Title>
			</Card.Body>
			<Card.Footer>
				<Container fluid>
					<Row>
						<Button
							variant='secondary'
							block
							id={props.id}
							onClick={() => props.handleVanilla()}
						>
							Vanilla
						</Button>
						<RewardSelector
							onReplace={(replacementReward) => props.handleReplace(replacementReward)}
						/>
					</Row>
				</Container>
			</Card.Footer>
		</Card>
	)
}

export default PopupCard