import React from 'react'
import { Container, Row, Button, Card } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function PopupCard(props) {
	// PROPS:
	// popup: popup of this row -> Popup
	// handleVanilla: function to make popup vanilla -> function
	// handleReplace: function to replace -> function
	// id: row number -> number

	let vanillaCardTitle = (
		<Icon
			key={props.popup.vanillaAddress + '_' + props.popup.vanillaReward}
			fileName={props.popup.vanillaReward.iconType}
			type={'card'}
		>
			{props.popup.vanillaReward.reward}
		</Icon>
	)

	let replacedCardTitle = (
		<>
			<s>
				<Icon
					key={props.popup.vanillaAddress + '_' + props.popup.vanillaReward}
					fileName={props.popup.vanillaReward.iconType}
					type={'card'}
				>
					{props.popup.vanillaReward.reward}
				</Icon>
			</s>
			<br />
			<Icon
				fileName={props.popup.replacementReward.iconType}
				type={'card'}
			>
				{props.popup.replacementReward.reward}
			</Icon>
		</>
	)

	return (
		<Card
			border='dark'
			bg='dark'
			className='popupCard'
		>
			<Card.Header className='cardHeader'>
				{props.popup.popup}
			</Card.Header>
			<Card.Body>
				<Card.Title className='cardTitle'>
					{props.popup.isReplaced() ? replacedCardTitle : vanillaCardTitle}
				</Card.Title>
			</Card.Body>
			<Card.Footer>
				<Container fluid>
					<Row>
						<Button
							variant='secondary'
							block
							id={props.id}
							onClick={() => props.handleVanilla(props.popup)}
						>
							Vanilla
						</Button>
						<RewardSelector
							originalReward={props.popup.vanillaReward}
							onReplace={(replacementReward) => props.handleReplace(props.popup, replacementReward)}
						/>
					</Row>
				</Container>
			</Card.Footer>
		</Card>
	)
}

export default PopupCard