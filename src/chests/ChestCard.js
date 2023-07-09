import React from 'react'

import RewardSelectorButton from '../rewards/RewardSelectorButton'
import { EMPTY } from '../rewards/RewardsData'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function ChestCard(props) {
	// PROPS:
	// currentWorldFolderName: current world for use in image lookup -> string
	// chest: chest being modified -> chest object
	// handleVanilla: handle reward vanilla -> function
	// handleReplace: handle reward replacement -> function
	// id: id of chest card -> number

	let chestRoom = <div className='chestCardRoom'>All Chests</div>
	let key = 'all'
	let chestReward = <></>
	let chestRewardSelector = (
		<RewardSelectorButton
			useIcon={true}
			iconPath={'./images/extra/edit.svg'}
			onReplace={(replacementReward) => props.handleReplace(replacementReward)}
		/>
	)
	let emptyChestRewardSelector = (
		<RewardSelectorButton
			useIcon={true}
			iconPath={'./images/extra/fill.svg'}
			onReplace={(replacementReward) => props.handleReplaceAllEmpty(replacementReward)}
			textOverride='Replace All Empty'
			variantOverride='dark'
		/>
	)

	let overlayPopover = <></>

	if (props.chest !== undefined) {
		chestRoom = <div className='chestCardRoom'>{props.chest.room !== props.prevChestRoom ? props.chest.room : ''}</div>
		key = props.chest.address
		chestReward = (
			<>
				<Icon
					fileName={props.chest.replacementReward.iconType}
					type={'row'}
					className='chestCardIcon'
				>
					{props.chest.replacementReward.reward}
				</Icon>
			</>
		)
		chestRewardSelector = (
			<RewardSelectorButton
				useIcon={true}
				iconPath={'./images/extra/edit.svg'}
				originalReward={props.chest.vanillaReward}
				onReplace={(replacementReward) => props.handleReplace(replacementReward)}
			/>
		)
		emptyChestRewardSelector = (
			<img
				className='chestCardEditIcon empty btn btn-dark'
				src='./images/extra/trash.svg'
				alt='edit'
				width='100%'
				height='auto'
				onClick={() => props.handleReplace(EMPTY)}
			/>
		)
		overlayPopover = props.chest.isReplaced()
			? <EditStatusPopover
				text='NEW!'
				message={''}
				type='chest'
			/>
			: <></>
	}

	function handleMouseEnter() {
		props.setCurrentChest(props.id)
	}

	return (
		<div
			key={`chestCard${key}`}
			className={`chestCard${props.isHovered ? ' hovered' : ''}`}
			onMouseEnter={handleMouseEnter}
		>
			{overlayPopover}
			{chestRoom}
			{chestReward}
			<div />
			<div className='chestCardIconGroup'>
				{chestRewardSelector}
				<img
					className='chestCardEditIcon vanilla btn btn-secondary'
					src='./images/extra/undo.svg'
					alt='edit'
					width='100%'
					height='auto'
					onClick={() => props.handleVanilla()}
				/>
				{emptyChestRewardSelector}
			</div>
		</div>
	)
}

export default ChestCard