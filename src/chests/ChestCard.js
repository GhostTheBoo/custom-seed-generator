import { React } from 'react'
import { Container, Row, Button, Card } from 'react-bootstrap'
import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover'

function ChestCard(props) {
	// PROPS:
	// currentWorldFolderName: current world for use in image lookup -> string
	// chest: chest being modified -> chest object
	// handleVanilla: handle reward vanilla -> function
	// handleReplace: handle reward replacement -> function
	// id: id of chest card -> number

	let chestImage = require(`../assets/chestImages/${props.currentFolderName}/${props.chest.vanillaAddress.toString(16).toUpperCase()}.png`)

	let overlayPopover = <EditStatusPopover
		text='NEW!'
		message={''}
		type='chest'
	/>

	return (
		<Card
			border='dark'
			bg='dark'
			className='chestCard'
			style={{ margin: '10px', textAlign: 'center' }}
		>
			<div style={{ position: 'relative' }}>
				<Card.Img
					variant='top'
					src={chestImage.default}
					height='300px'
					width='300px'
				/>
				{props.chest.isReplaced() ? overlayPopover : <></>}
			</div>
			<Card.Header className='cardHeader'>
				{props.chest.room}
			</Card.Header>
			<Card.Body>
				<Card.Title className='cardTitle'>
					<Icon
						fileName={props.chest.replacementReward.iconType}
						type={'card'}
					>
						{props.chest.replacementReward.reward}
					</Icon>
				</Card.Title>
			</Card.Body>
			<Card.Footer>
				<Container fluid>
					<Row>
						<RewardSelector
							originalReward={props.chest.vanillaReward}
							onReplace={(replacementReward) => props.handleReplace(props.chest, replacementReward)}
						/>
						<Button
							variant='secondary'
							block
							id={props.id}
							onClick={() => props.handleVanilla(props.chest)}
						>
							Vanilla
						</Button>
					</Row>
				</Container>
			</Card.Footer>
		</Card>
	)
}

export default ChestCard