import React from 'react'

import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

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

	function newRewardIcon(key, fileName, stat) {
		return (
			<div key={key} className='bonusReward'>
				<Icon
					fileName={fileName}
					type={'form'}
				>
					{`: ${stat}`}
				</Icon>
			</div>
		)
	}
	function newReplacementRewardIcon(key, replacementReward) {
		return (
			<div key={'bonusReward' + key} className='bonusReward'>
				<Icon
					fileName={replacementReward.iconType}
					type={'row'}
				>
					{replacementReward.reward + '!'}
				</Icon>
			</div>
		)
	}

	let rewardList = []
	let smallRewardList = []

	function addStatRow(key, text, stat, fileName) {
		if (stat !== 0) {
			rewardList.push(<div key={key} className='bonusReward'>{text}</div>)
			smallRewardList.push(newRewardIcon(key, fileName, stat))
		}
	}

	//#region Reward List Init
	addStatRow('bonusHP', `Max HP Increased by ${props.bonusReward.hpIncrease}!`, props.bonusReward.hpIncrease, 'uphp')
	addStatRow('bonusMP', `Max MP Increased by ${props.bonusReward.mpIncrease}!`, props.bonusReward.mpIncrease, 'upmp')
	if (props.bonusReward.replacementRewardA.index !== 0x000) {
		rewardList.push(newReplacementRewardIcon('A', props.bonusReward.replacementRewardA))
		smallRewardList.push(newReplacementRewardIcon('A', props.bonusReward.replacementRewardA))
	}
	if (props.bonusReward.replacementRewardB.index !== 0x000) {
		rewardList.push(newReplacementRewardIcon('B', props.bonusReward.replacementRewardB))
		smallRewardList.push(newReplacementRewardIcon('B', props.bonusReward.replacementRewardB))
	}
	addStatRow('bonusArmor', `Gained ${props.bonusReward.armorSlotIncrease} Armor Slot(s)!`, props.bonusReward.armorSlotIncrease, 'uparmor')
	addStatRow('bonusAccessory', `Gained ${props.bonusReward.accessorySlotIncrease} Accessory Slot(s)!`, props.bonusReward.accessorySlotIncrease, 'upaccessory')
	addStatRow('bonusItem', `Gained ${props.bonusReward.itemSlotIncrease} Item Slot(s)!`, props.bonusReward.itemSlotIncrease, 'upitem')
	addStatRow('bonusDrive', `Drive Gauge Increased by ${props.bonusReward.driveGaugeIncrease}!`, props.bonusReward.driveGaugeIncrease, 'updrive')
	if (rewardList.length === 0) {
		rewardList.push(newReplacementRewardIcon('A', props.bonusReward.replacementRewardA))
		smallRewardList.push(newReplacementRewardIcon('A', props.bonusReward.replacementRewardA))
	}
	//#endregion

	let character = 'other'
	if (props.bonusReward.replacementCharacter === 1)
		character = 'sora'
	else if (props.bonusReward.replacementCharacter === 2)
		character = 'donald'
	else if (props.bonusReward.replacementCharacter === 3)
		character = 'goofy'
	let bonusLogo = './images/icons/' + character + 'B.png'


	let overlayPopover = <EditStatusPopover
		text={props.bonusReward.getTotalLineCount() > 2 ? 'WARNING!' : 'NEW!'}
		message={props.bonusReward.getTotalLineCount() > 2 ? 'Bonus Levels can only give 2 Rewards' : ''}
		type='bonus'
	/>

	return (
		<div className={`bonusLevel ${character}`}>
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
				<div className='bonusRewardList'>{rewardList}</div>
				<div className='smallBonusRewardList'>{smallRewardList}</div>
			</div>
			<img className='bonusLogo' src={bonusLogo} alt='Bonus Logo' />
		</div>
	)
}

export default BonusCard