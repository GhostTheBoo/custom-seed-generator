import React from 'react'
import { Container, Row, Button, Card } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover'

function PopupCard(props) {
	// PROPS:
	// popup: popup of this row -> Popup
	// handleVanilla: function to make popup vanilla -> function
	// handleReplace: function to replace -> function
	// id: row number -> number

	let overlayPopover = <EditStatusPopover
		text={props.popup.isAbility() ? 'WARNING!' : 'NEW!'}
		message={props.popup.isAbility() ? 'Popups cannot contain Abilities' : ''}
		type='popup'
	/>

	return (
		<Card
			border='dark'
			bg='dark'
			className='popupCard'
			style={{ margin: '10px', textAlign: 'center' }}
		>
			<Card.Header className='cardHeader'>
				{props.popup.popup}

				{props.popup.isReplaced() ? overlayPopover : <></>}
			</Card.Header>
			<Card.Body>
				<Card.Title className='cardTitle'>
					<Icon
						fileName={props.popup.replacementReward.iconType}
						type={'card'}
					>
						{props.popup.replacementReward.reward}
					</Icon>
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