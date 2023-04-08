import React from 'react'
import { Button } from 'react-bootstrap'

import RewardSelectorButton from '../rewards/RewardSelectorButton'
import { EMPTY } from '../rewards/RewardsData'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function PopupCard(props) {
	// PROPS:
	// popup: popup of this row -> Popup
	// handleVanilla: function to make popup vanilla -> function
	// handleReplace: function to replace -> function
	// id: row number -> number

	let popupCheck = (<div className='popupCardCheck'>{props.world}</div>)
	let popupReward = (<div className='popupCardReward flex-grow-1'>All Popups</div>)
	let popupRewardSelector = (
		<RewardSelectorButton
			onReplace={(replacementReward) => props.handleReplace(replacementReward)}
		/>
	)
	let emptyPopupRewardSelector = (
		<RewardSelectorButton
			onReplace={(replacementReward) => props.handleReplaceAllEmpty(replacementReward)}
			textOverride='Replace All Empty'
			variantOverride='dark'
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
			<RewardSelectorButton
				originalReward={props.popup.vanillaReward}
				onReplace={(replacementReward) => props.handleReplace(replacementReward)}
			/>
		)
		emptyPopupRewardSelector = (
			<Button
				variant='dark'
				id={props.id}
				className='popupCardEMPTY'
				onClick={() => props.handleReplace(EMPTY)}
			>
				Empty
			</Button>
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
		<div className='popupCard'>
			<div style={{ position: 'relative' }}>
				{overlayPopover}
			</div>
			{popupCheck}
			{popupReward}
			<div className='flex-grow-1'/>
			{popupRewardSelector}
			<Button
				variant='secondary'
				id={props.id}
				className='popupCardVanilla'
				onClick={() => props.handleVanilla()}
			>
				Vanilla
			</Button>
			{emptyPopupRewardSelector}
		</div>
	)
}

export default PopupCard