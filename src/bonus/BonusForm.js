import React from 'react'
import { Button, CloseButton } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import RewardSelectorButton from '../rewards/RewardSelectorButton'
import Icon from '../Components/Icon'
import './BonusFormStyles.css'

function BonusForm(props) {
	// PROPS:
	// bonusReward: current reward being editted -> bonusReward
	// setCurrentBonusFightSlot: set current bonus reward -> function

	function setCurrentRewardA(newValue) { props.setCurrentBonusFieldData('rewardA', newValue) }
	function setCurrentRewardB(newValue) { props.setCurrentBonusFieldData('rewardB', newValue) }
	function setCurrentCharacter(newValue) { props.setCurrentBonusFieldData('currentCharacter', newValue) }
	function setCurrentHP(newValue) { props.setCurrentBonusFieldData('currentBonusHP', newValue) }
	function setCurrentMP(newValue) { props.setCurrentBonusFieldData('currentBonusMP', newValue) }
	function setCurrentArmorSlot(newValue) { props.setCurrentBonusFieldData('currentArmor', newValue) }
	function setCurrentAccessorySlot(newValue) { props.setCurrentBonusFieldData('currentAccessory', newValue) }
	function setCurrentItemSlot(newValue) { props.setCurrentBonusFieldData('currentItem', newValue) }
	function setCurrentDriveGauge(newValue) { props.setCurrentBonusFieldData('currentDrive', newValue) }

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

	return (
		<div className='bonusFormCard'>
			<h1>SLOT {props.currentSlotNumber + 1}:</h1>
			<CloseButton className='close' onClick={() => props.closeFormCard(-1)} />
			<hr />
			<div className='grid-col-2'>
				<label>Reward A:</label>
				<label>Reward B:</label>
				<div>
					<Icon
						fileName={props.currentBonusFieldData.rewardA.iconType}
						type={'row'}
					>
						{props.currentBonusFieldData.rewardA.reward}
					</Icon>
				</div>
				<div>
					<Icon
						fileName={props.currentBonusFieldData.rewardB.iconType}
						type={'row'}
					>
						{props.currentBonusFieldData.rewardB.reward}
					</Icon>
				</div>
				<RewardSelectorButton
					onReplace={(replacementReward) => setCurrentRewardA(replacementReward)}
				/>
				<RewardSelectorButton
					onReplace={(replacementReward) => setCurrentRewardB(replacementReward)}
				/>
			</div>
			<hr />
			<div className='bonusCharacterSelectorGroup'>
				<label>Character:</label>
				<GenericSelect
					class={'bonusCharacter'}
					selector={'Character'}
					itemList={characterList}
					name={'currentCharacterSelector'}
					currentItem={props.currentBonusFieldData.currentCharacter}
					onChange={(e) => setCurrentCharacter(parseInt(e.target.value))}
				/>
			</div>
			<hr />
			<div className='grid-col-4'>
				<div>
					<Icon
						fileName={'uphp'}
						type={'bonusForm'}
					>
						:
					</Icon>
				</div>
				<input
					name={'HP'}
					className='three-digit-input'
					type='number'
					value={props.currentBonusFieldData.currentBonusHP}
					onChange={(e) => setCurrentHP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
					min='0'
					max='255'
				/>
				<div>
					<Icon
						fileName={'upmp'}
						type={'bonusForm'}
					>
						:
					</Icon>
				</div>
				<input
					name={'MP'}
					className='three-digit-input'
					type='number'
					value={props.currentBonusFieldData.currentBonusMP}
					onChange={(e) => setCurrentMP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
					min='0'
					max='255'
				/>
			</div>
			<hr />
			<div className='grid-col-4'>
				<div>
					<Icon
						fileName={'uparmor'}
						type={'bonusForm'}
					>
						:
					</Icon>
				</div>
				<input
					name={'ArmorSlot'}
					className='three-digit-input'
					size='lg'
					type='number'
					value={props.currentBonusFieldData.currentArmor}
					onChange={(e) => setCurrentArmorSlot(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
					min='0'
					max='255'
				/>
				<div>
					<Icon
						fileName={'upaccessory'}
						type={'bonusForm'}
					>
						:
					</Icon>
				</div>
				<input
					name={'AccessorySlot'}
					className='three-digit-input'
					size='lg'
					type='number'
					value={props.currentBonusFieldData.currentAccessory}
					onChange={(e) => setCurrentAccessorySlot(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
					min='0'
					max='255'
				/>
				<div>
					<Icon
						fileName={'upitem'}
						type={'bonusForm'}
					>
						:
					</Icon>
				</div>
				<input
					name={'itemSlot'}
					className='three-digit-input'
					size='lg'
					type='number'
					value={props.currentBonusFieldData.currentItem}
					onChange={(e) => setCurrentItemSlot(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
					min='0'
					max='255'
				/>
				<div>
					<Icon
						fileName={'updrive'}
						type={'bonusForm'}
					>
						:
					</Icon>
				</div>
				<input
					name={'DriveGauge'}
					className='three-digit-input'
					size='lg'
					type='number'
					value={props.currentBonusFieldData.currentDrive}
					onChange={(e) => setCurrentDriveGauge(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
					min='0'
					max='255'
				/>
			</div>
			<hr />
			<div className='bonusReplaceButtonGroup'>
				<Button
					variant='secondary'
					onClick={() => props.setCurrentBonusFightSlot(props.bonusReward.vanilla())}
				>
					VANILLA
				</Button>
				<Button
					onClick={() => props.setCurrentBonusFightSlot(props.bonusReward.replace(props.currentBonusFieldData))}
				>
					CONFIRM
				</Button>
			</div>
		</div>
	)
}

export default BonusForm