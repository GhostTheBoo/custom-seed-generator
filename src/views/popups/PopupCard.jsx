import React from 'react'

import EditStatusPopover from '../generic/EditStatusPopover'

import RewardSelectorButton from '../rewards/RewardSelectorButton'
import { EMPTY } from '../../data/rewardsData'

import Icon from '../generic/Icon'

function PopupCard(props) {
	// PROPS:
	// popup: popup of this row -> Popup
	// handleVanilla: function to make popup vanilla -> function
	// handleReplace: function to replace -> function
	// id: row number -> number

	let popupName = <div className='popupCardName'>All Popups</div>
	let key = 'all'
	let popupReward = <></>
	let popupRewardSelector = (
		<RewardSelectorButton
			useIcon={true}
			iconPath={'./images/extra/edit.svg'}
			onReplace={(replacementReward) => props.handleReplace(replacementReward)}
		/>
	)
	let emptyPopupRewardSelector = (
		<RewardSelectorButton
			useIcon={true}
			iconPath={'./images/extra/fill.svg'}
			onReplace={(replacementReward) => props.handleReplaceAllEmpty(replacementReward)}
			textOverride='Replace All Empty'
			variantOverride='dark'
		/>
	)

	let overlayPopover = <></>

	if (props.popup !== undefined) {
		popupName = <div className='popupCardName'>{props.popup.popup}</div>
		key = props.popup.vanillaAddress
		popupReward = (
			<>
				<Icon
					fileName={props.popup.replacementReward.iconType}
					type={'row'}
					className='popupCardIcon'
				>
					{props.popup.replacementReward.reward}
				</Icon>
			</>
		)
		popupRewardSelector = (
			<RewardSelectorButton
				useIcon={true}
				iconPath='./images/extra/edit.svg'
				originalReward={props.popup.vanillaReward}
				onReplace={(replacementReward) => props.handleReplace(replacementReward)}
			/>
		)
		emptyPopupRewardSelector = (
			<img
				className='popupCardEditIcon empty btn btn-dark'
				src='./images/extra/trash.svg'
				alt='edit'
				width='100%'
				height='auto'
				onClick={() => props.handleReplace(EMPTY)}
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
		<div
			key={`popupCard${key}`}
			className={`popupCard${props.isHovered ? ' hovered' : ''}`}
			onMouseEnter={() => props.setCurrentPopup(props.id)}
		>
			{overlayPopover}
			{popupName}
			{popupReward}
			<div />
			<div className='popupCardIconGroup'>
				{popupRewardSelector}
				<img
					className='popupCardEditIcon vanilla btn btn-secondary'
					src='./images/extra/undo.svg'
					alt='edit'
					width='100%'
					height='auto'
					onClick={() => props.handleVanilla()}
				/>
				{emptyPopupRewardSelector}
			</div>
		</div>
	)
}

export default PopupCard