import { React } from 'react'

import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover'

function BonusCard(props) {
	// PROPS:
	// bonusReward: bonus reward for selected fight -> Bonus
	// isEditting
	// slotIndex
	//// currentBonusFightSlot: current reward being editted -> number
	// setCurrentBonusFightSlot: set reward to start editting -> function

	function updateCurrentBonusFightSlot() {
		props.setCurrentBonusFightSlot(props.slotIndex)
	}

	let rewardList = []

	if (props.bonusReward.hpIncrease !== 0)
		rewardList.push(<div key='bonusHP' className='bonusReward'>Maximum HP Increased by {props.bonusReward.hpIncrease}!</div>)
	if (props.bonusReward.mpIncrease !== 0)
		rewardList.push(<div key='bonusMP' className='bonusReward'>Maximum MP Increased by {props.bonusReward.mpIncrease}!</div>)
	if (props.bonusReward.replacementRewardA.index !== 0x000)
		rewardList.push(
			<div key='bonusRewardA' className='bonusReward'>
				<Icon
					fileName={props.bonusReward.replacementRewardA.iconType}
					type={'row'}
				>
					{props.bonusReward.replacementRewardA.reward + '!'}
				</Icon>
			</div>
		)
	if (props.bonusReward.replacementRewardB.index !== 0x000)
		rewardList.push(
			<div key='bonusRewardB' className='bonusReward'>
				<Icon
					fileName={props.bonusReward.replacementRewardB.iconType}
					type={'row'}
				>
					{props.bonusReward.replacementRewardB.reward + '!'}
				</Icon>
			</div>
		)
	if (props.bonusReward.armorSlotIncrease !== 0)
		rewardList.push(<div key='bonusArmor' className='bonusReward'>Gained {props.bonusReward.armorSlotIncrease} Armor Slot(s)!</div>)
	if (props.bonusReward.accessorySlotIncrease !== 0)
		rewardList.push(<div key='bonusAccessory' className='bonusReward'>Gained {props.bonusReward.accessorySlotIncrease} Accessory Slot(s)!</div>)
	if (props.bonusReward.itemSlotIncrease !== 0)
		rewardList.push(<div key='bonusItem' className='bonusReward'>Gained {props.bonusReward.itemSlotIncrease} Item Slot(s)!</div>)
	if (props.bonusReward.driveGaugeIncrease !== 0)
		rewardList.push(<div key='bonusDrive' className='bonusReward'>Drive Gauge Increased by {props.bonusReward.driveGaugeIncrease}!</div>)

	let character
	if (props.bonusReward.replacementCharacter === 1)
		character = 'sora'
	else if (props.bonusReward.replacementCharacter === 2)
		character = 'donald'
	else if (props.bonusReward.replacementCharacter === 3)
		character = 'goofy'
	else
		character = 'other'
	// let bonusLogo = require(`../assets/icons/${character}B.png`)
	let bonusLogo = './images/icons/' + character + 'B.png'


	let overlayPopover = <EditStatusPopover
		text={props.bonusReward.getTotalLineCount() > 2 ? 'WARNING!' : 'NEW!'}
		message={props.bonusReward.getTotalLineCount() > 2 ? 'Bonus Levels can only give 2 Rewards' : ''}
		type='bonus'
	/>

	return (
		<div className={`bonusLevel  ${character}`}>
			{props.bonusReward.isReplaced() ? overlayPopover : <></>}
			<div className='bonusHeader'>
				<div className='bonusButtonGroup'>
					<button
						className='bonusButton'
						disabled={props.isEditing}
						onClick={() => updateCurrentBonusFightSlot()}
					>
						{props.isEditing ? 'EDITING...' : 'EDIT BONUS!'}
					</button>
					<div className='bonusAfterButtonTriangle bonusAfterButton'></div>
					<div className='bonusAfterButtonTail bonusAfterButton'></div>
				</div>
				<div className='bonusHeaderSpace'></div>
				<div className='bonusCharacter'>{props.bonusReward.replacementCharacterString}</div>
			</div>
			<div className={rewardList.length <= 1 ? 'smallBonusRewardBox' : 'bigBonusRewardBox'}>
				{rewardList}
			</div>
			<img className='bonusLogo' src={bonusLogo} alt='Bonus Logo' />
		</div>
	)
}

export default BonusCard