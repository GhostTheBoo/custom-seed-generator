import { React } from 'react'
import { Container, Row, Button, Card } from 'react-bootstrap'
import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function ChestCard(props) {
	// PROPS:
	// currentWorldFolderName: current world for use in image lookup -> string
	// chest: chest being modified -> chest object
	// handleVanilla: handle reward vanilla -> function
	// handleReplace: handle reward replacement -> function
	// id: id of chest card -> number

	let chestImage = require(`../assets/chestImages/${props.currentWorldFolderName}/${props.chest.vanillaAddress.toString(16).toUpperCase()}.png`)

	let vanillaCardTitle = (
		<Icon
			key={props.chest.vanillaAddress + '_' + props.chest.vanillaReward}
			fileName={props.chest.vanillaReward.iconType}
			type={'card'}
		>
			{props.chest.vanillaReward.reward}
		</Icon>
	)

	let replacedCardTitle = (
		<>
			<s>
				<Icon
					key={props.chest.vanillaAddress + '_' + props.chest.vanillaReward}
					fileName={props.chest.vanillaReward.iconType}
					type={'card'}
				>
					{props.chest.vanillaReward.reward}
				</Icon>
			</s>
			<br />
			<Icon
				fileName={props.chest.replacementReward.iconType}
				type={'card'}
			>
				{props.chest.replacementReward.reward}
			</Icon>
		</>
	)

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
				width='300px'
			/>
			<Card.Header className='cardHeader'>
				{props.chest.room}
			</Card.Header>
			<Card.Body>
				<Card.Title className='cardTitle'>
					{props.chest.isReplaced() ? replacedCardTitle : vanillaCardTitle}
				</Card.Title>
			</Card.Body>
			<Card.Footer>
				<Container fluid>
					<Row>
						<Button
							variant='secondary'
							block
							id={props.id}
							onClick={() => props.handleVanilla(props.chest)}
						>
							Vanilla
						</Button>
						<RewardSelector
							originalReward={props.chest.vanillaReward}
							onReplace={(replacementReward) => props.handleReplace(props.chest, replacementReward)}
						/>
					</Row>
				</Container>
			</Card.Footer>
		</Card>
	)
}

export default ChestCard