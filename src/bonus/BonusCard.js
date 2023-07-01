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

	function newRewardIcon(key, fileName, text) {
		return (
			<div key={key} className='bonusReward'>
				<Icon
					fileName={fileName}
					type={'form'}
				>
					{text}
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
	let hpUpText = `Max HP Increased by ${props.bonusReward.hpIncrease}!`
	let smallHpUpText = `: ${props.bonusReward.hpIncrease}`
	let mpUpText = `Max MP Increased by ${props.bonusReward.mpIncrease}!`
	let smallMpUpText = `: ${props.bonusReward.mpIncrease}`
	let armorUpText = `Gained ${props.bonusReward.armorSlotIncrease} Armor Slot(s)!`
	let smallArmorUpText = `: ${props.bonusReward.armorSlotIncrease}`
	let accessoryText = `Gained ${props.bonusReward.accessorySlotIncrease} Accessory Slot(s)!`
	let smallAccessoryText = `: ${props.bonusReward.accessorySlotIncrease}`
	let itemText = `Gained ${props.bonusReward.itemSlotIncrease} Item Slot(s)!`
	let smallItemText = `: ${props.bonusReward.itemSlotIncrease}`
	let driveUpText = `Drive Gauge Increased by ${props.bonusReward.driveGaugeIncrease}!`
	let smallDriveUpText = `: ${props.bonusReward.driveGaugeIncrease}`

	//#region Regular Reward List Init
	if (props.bonusReward.hpIncrease !== 0)
		rewardList.push(<div key='bonusHP' className='bonusReward'>{hpUpText}</div>)
	if (props.bonusReward.mpIncrease !== 0)
		rewardList.push(<div key='bonusMP' className='bonusReward'>{mpUpText}</div>)
	if (props.bonusReward.replacementRewardA.index !== 0x000)
		rewardList.push(newReplacementRewardIcon('A', props.bonusReward.replacementRewardA))
	if (props.bonusReward.replacementRewardB.index !== 0x000)
		rewardList.push(newReplacementRewardIcon('B', props.bonusReward.replacementRewardB))
	if (props.bonusReward.armorSlotIncrease !== 0)
		rewardList.push(<div key='bonusArmor' className='bonusReward'>{armorUpText}</div>)
	if (props.bonusReward.accessorySlotIncrease !== 0)
		rewardList.push(<div key='bonusAccessory' className='bonusReward'>{accessoryText}</div>)
	if (props.bonusReward.itemSlotIncrease !== 0)
		rewardList.push(<div key='bonusItem' className='bonusReward'>{itemText}</div>)
	if (props.bonusReward.driveGaugeIncrease !== 0)
		rewardList.push(<div key='bonusDrive' className='bonusReward'>{driveUpText}</div>)
	if (rewardList.length === 0)
		rewardList.push(newReplacementRewardIcon('A', props.bonusReward.replacementRewardA))
	//#endregion

	//#region Small Reward List Init
	if (props.bonusReward.hpIncrease !== 0)
		smallRewardList.push(newRewardIcon('bonusHP', 'uphp', smallHpUpText))
	if (props.bonusReward.mpIncrease !== 0)
		smallRewardList.push(newRewardIcon('bonusMP', 'upmp', smallMpUpText))
	if (props.bonusReward.replacementRewardA.index !== 0x000)
		smallRewardList.push(newReplacementRewardIcon('A', props.bonusReward.replacementRewardA))
	if (props.bonusReward.replacementRewardB.index !== 0x000)
		smallRewardList.push(newReplacementRewardIcon('B', props.bonusReward.replacementRewardB))
	if (props.bonusReward.armorSlotIncrease !== 0)
		smallRewardList.push(newRewardIcon('bonusArmor', 'uparmor', smallArmorUpText))
	if (props.bonusReward.accessorySlotIncrease !== 0)
		smallRewardList.push(newRewardIcon('bonusAccessory', 'upaccessory', smallAccessoryText))
	if (props.bonusReward.itemSlotIncrease !== 0)
		smallRewardList.push(newRewardIcon('bonusItem', 'upitem', smallItemText))
	if (props.bonusReward.driveGaugeIncrease !== 0)
		smallRewardList.push(newRewardIcon('bonusDrive', 'updrive', smallDriveUpText))
	if (smallRewardList.length === 0)
		smallRewardList.push(newReplacementRewardIcon('A', props.bonusReward.replacementRewardA))
	//#endregion

	let character
	if (props.bonusReward.replacementCharacter === 1)
		character = 'sora'
	else if (props.bonusReward.replacementCharacter === 2)
		character = 'donald'
	else if (props.bonusReward.replacementCharacter === 3)
		character = 'goofy'
	else
		character = 'other'
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