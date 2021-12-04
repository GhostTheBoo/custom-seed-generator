import { React } from 'react'
import { Container, Row, Button, Card } from 'react-bootstrap'
import RewardSelector from '../rewards/RewardSelector'

function AllChestCard(props) {
	// PROPS:
	// currentWorldFolderName: current world for use in image lookup -> string
	// handleReplace: handle reward replacement -> function

	let chestImage = require(`../assets/chestImages/${props.currentWorldFolderName}/${props.currentWorldFolderName}.png`)

	return (
		<Card
			border='dark'
			bg='dark'
			className='chestCard'
		>
			<Card.Img
				variant='top'
				src={chestImage.default}
				height='300px'
				width='100px'
			/>
			<Card.Body>
				<Card.Title className='cardTitle'>
					{'All Chests'}
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

export default AllChestCard