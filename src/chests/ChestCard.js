import { React } from 'react'
import { Container, Button } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
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
		<RewardSelector
			onReplace={(replacementReward) => props.handleReplace(replacementReward)}
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
			<RewardSelector
				originalReward={props.chest.vanillaReward}
				onReplace={(replacementReward) => props.handleReplace(replacementReward)}
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

	return (
		<Container fluid className='chestCard'>
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
			{chestRewardSelector}
			<Button
				variant='secondary'
				block
				id={props.id}
				className='chestCardVanilla'
				onClick={() => props.handleVanilla()}
			>
				Vanilla
			</Button>
		</Container>
	)
}

export default ChestCard