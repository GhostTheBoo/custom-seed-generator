import React, { useState } from 'react'
import { Button, CloseButton } from 'react-bootstrap'

import { motion } from 'framer-motion'

import GSelect from '../generic/GSelect'

import RewardSelectorButton from '../rewards/RewardSelectorButton'
import Icon from '../generic/Icon'
import './styles/BonusFormStyles.css'

function BonusForm(props) {
	// PROPS:
	// bonusReward: current reward being editted -> bonusReward
	// setCurrentBonusFightSlot: set current bonus reward -> function
	const [currentFieldData, setCurrentFieldData] = useState({
		rewardA: { ...props.bonusReward.replacementRewardA },
		rewardB: { ...props.bonusReward.replacementRewardB },
		currentCharacter: props.bonusReward.replacementCharacter,
		currentBonusHP: props.bonusReward.hpIncrease,
		currentBonusMP: props.bonusReward.mpIncrease,
		currentArmor: props.bonusReward.armorSlotIncrease,
		currentAccessory: props.bonusReward.accessorySlotIncrease,
		currentItem: props.bonusReward.itemSlotIncrease,
		currentDrive: props.bonusReward.driveGaugeIncrease
	})

	let characterList = [
		'Vanilla',
		'Sora',
		'Donald',
		'Goofy',
		'Mickey',
		'Auron',
		'Ping/Mulan',
		'Aladdin',
		'Jack Sparrow',
		'Beast',
		'Jack Skellington',
		'Simba',
		'Tron',
		'Riku',
		'Roxas'
	]

	function createBonusRewardFormRow(rewardLabel, replacementReward) {
		function setCurrentReward(newValue) { setCurrentFieldData({ ...currentFieldData, ['reward' + rewardLabel]: newValue }) }
		return (
			<>
				<label className='bonusFormRewardLabel'>{rewardLabel}:</label>
				<div className='bonusFormReward'><Icon fileName={replacementReward.iconType} type={'card'}>{replacementReward.reward}</Icon></div>
				<RewardSelectorButton onReplace={(replacementReward) => setCurrentReward(replacementReward)} />
			</>
		)
	}

	function createBonusStatFormRow(statName, fileName, statLabel) {
		let statValue = currentFieldData[statName]
		function setCurrentStat(newValue, statName) { setCurrentFieldData({ ...currentFieldData, [statName]: newValue }) }
		return (
			<>
				<div><Icon fileName={fileName} type={'bonusForm'}></Icon></div>
				<input
					name={'bonus' + statLabel}
					className='bonusInputField three-digit-input'
					type='number'
					value={isNaN(statValue) ? '' : statValue}
					onChange={(e) => setCurrentStat(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))), statName)}
					min={0}
					max={255}
				/>
			</>
		)
	}

	return (
		<motion.div
			initial={{ opacity: .25, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, y: 100 }}
			transition={{ type: 'spring', duration: .5 }}
			key={props.bonusReward.address}
			className='bonusFormCard'
		>
			<h1>SLOT {props.currentSlotNumber + 1}:</h1>
			<CloseButton className='close' onClick={() => props.closeFormCard(-1)} />
			<div className='bonusCardContent'>
				<div className='bonusCharacterSelectorGroup'>
					<label>Character:</label>
					<GSelect
						class={'bonusCharacter'}
						selector={'Character'}
						itemList={characterList}
						name={'currentCharacterSelector'}
						currentItem={currentFieldData.currentCharacter}
						onChange={(e) => setCurrentFieldData({ ...currentFieldData, currentCharacter: e.target.value })}
					/>
				</div>
				<hr />
				<div className='bonusFormRewards'>
					{createBonusRewardFormRow('A', currentFieldData.rewardA)}
					{createBonusRewardFormRow('B', currentFieldData.rewardB)}
				</div>
				<hr />
				<div className='bonusFormStats'>
					{createBonusStatFormRow('currentBonusHP', 'uphp', 'HP Increase')}
					{createBonusStatFormRow('currentBonusMP', 'upmp', 'MP Increase')}
					{createBonusStatFormRow('currentArmor', 'uparmor', 'Armor Slot Increase')}
					{createBonusStatFormRow('currentAccessory', 'upaccessory', 'Accessory Slot Increase')}
					{createBonusStatFormRow('currentItem', 'upitem', 'Item Slot Increase')}
					{createBonusStatFormRow('currentDrive', 'updrive', 'Drive Gauge Increase')}
				</div>
				<hr />
				<div className='bonusReplaceButtonGroup'>
					<Button
						variant='secondary'
						onClick={() => props.setCurrentBonusFightSlot(props.bonusReward.vanilla())}
					>
						VANILLA
					</Button>
					<Button onClick={() => props.setCurrentBonusFightSlot(props.bonusReward.replace(currentFieldData))}>
						CONFIRM
					</Button>
				</div>
			</div>
		</motion.div>

	)
}

export default BonusForm