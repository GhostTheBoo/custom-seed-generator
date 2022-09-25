import React from 'react'
import { Container, Button } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function PopupCard(props) {
	// PROPS:
	// popup: popup of this row -> Popup
	// handleVanilla: function to make popup vanilla -> function
	// handleReplace: function to replace -> function
	// id: row number -> number

	let popupCheck = (<></>)
	let popupReward = (<div className='popupCardReward flex-grow-1'>All Popups</div>)
	let popupRewardSelector = (
		<RewardSelector
			onReplace={(replacementReward) => props.handleReplace(replacementReward)}
		/>
	)

	let overlayPopover = <></>

	if (props.popup !== undefined) {
		popupCheck = (<div className='popupCardCheck flex-grow-1'>{props.popup.popup}</div>)
		popupReward = (
			<div className='popupCardReward flex-grow-1'>
				<Icon
					fileName={props.popup.replacementReward.iconType}
					type={'card'}
				>
					{props.popup.replacementReward.reward}
				</Icon>
			</div>
		)
		popupRewardSelector = (
			<RewardSelector
				originalReward={props.popup.vanillaReward}
				onReplace={(replacementReward) => props.handleReplace(replacementReward)}
			/>
		)
		overlayPopover = props.popup.isReplaced()
			? <EditStatusPopover
				text={props.popup.isAbility() ? 'WARNING!' : 'NEW!'}
				message={props.popup.isAbility() ? 'Popups cannot contain Abilities' : ''}
				type='popup'
			/>
			: <></>
	}

	return (
		<Container fluid className='popupCard'>
			<div style={{ position: 'relative' }}>
				{overlayPopover}
			</div>
			{popupCheck}
			{popupReward}
			<div className='flex-grow-1'/>
			{popupRewardSelector}
			<Button
				variant='secondary'
				block
				id={props.id}
				className='popupCardVanilla'
				onClick={() => props.handleVanilla()}
			>
				Vanilla
			</Button>
		</Container>
	)
}

export default PopupCard