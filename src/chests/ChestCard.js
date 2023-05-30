import React from 'react'

import { Button } from 'react-bootstrap'
import { motion } from 'framer-motion'

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

	let chestImage = './images/chestImages/' + props.currentFolderName + '/' + props.currentFolderName + '.png'
	let chestAltText = props.currentFolderName + 'All Chests'
	let chestRoom = (<></>)
	let chestReward = (<div className='chestCardReward flexGrow1'>All Chests</div>)
	let chestRewardSelector = (
		<RewardSelectorButton
			onReplace={(replacementReward) => props.handleReplace(replacementReward)}
		/>
	)
	let emptyChestRewardSelector = (
		<RewardSelectorButton
			onReplace={(replacementReward) => props.handleReplaceAllEmpty(replacementReward)}
			textOverride='Replace All Empty'
			variantOverride='dark'
		/>
	)

	let overlayPopover = <></>

	if (props.chest !== undefined) {
		chestImage = './images/chestImages/' + props.currentFolderName + '/' + props.chest.vanillaAddress.toString(16).toUpperCase() + '.png'
		chestAltText = props.chest.room + ' ' + props.chest.replacementReward.reward
		chestRoom = (<div className='chestCardRoom flexGrow1'>{props.chest.room}</div>)
		chestReward = (
			<div className='chestCardReward'>
				<Icon
					fileName={props.chest.replacementReward.iconType}
					type={'card'}
				>
					{props.chest.replacementReward.reward}
				</Icon>
			</div>
		)
		chestRewardSelector = (
			<RewardSelectorButton
				originalReward={props.chest.vanillaReward}
				onReplace={(replacementReward) => props.handleReplace(replacementReward)}
			/>
		)
		emptyChestRewardSelector = (
			<Button
				variant='dark'
				id={props.id}
				className='chestCardEMPTY'
				onClick={() => props.handleReplace(EMPTY)}
			>
				Empty
			</Button>
		)
		overlayPopover = props.chest.isReplaced()
			? <EditStatusPopover
				text='NEW!'
				message={''}
				type='chest'
			/>
			: <></>
	}

	return (
		<motion.div
			initial={{ opacity: .25, x: 500 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, y: 500 }}
			transition={{ type: 'spring', duration: .65 }}
			key={`levelCard${chestImage}`}
			className='chestCard'
		>
			<div style={{ position: 'relative' }}>
				{overlayPopover}
				<img
					className='chestCardImage'
					src={chestImage}
					alt={chestAltText}
					width='100%'
					height='auto'
				/>
			</div>
			{chestRoom}
			{chestReward}
			<div className='flex-grow-1' />
			{chestRewardSelector}
			<Button
				variant='secondary'
				id={props.id}
				className='chestCardVanilla'
				onClick={() => props.handleVanilla()}
			>
				Vanilla
			</Button>
			{emptyChestRewardSelector}
		</motion.div>
	)
}

export default ChestCard