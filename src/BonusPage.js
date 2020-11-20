import React from 'react'
import Form from 'react-bootstrap/Form'

import { worldsData, charactersData } from './Data/typesData'
import rewardsData from './Data/rewardsData'
import bonusData from './Data/bonusData'

import GenericSelect from './Components/GenericSelect'
import RewardSelect from './Components/RewardSelect'
import BonusTable from './Components/BonusTable'
import Buttons from './Components/Buttons'

class BonusPage extends React.Component {
	constructor() {
		super()

		this.state = {
			currentWorld: 0,
			currentCharacter: 0,
			currentRewardType1: 0,
			currentReward1: 0,
			currentRewardType2: 0,
			currentReward2: 0,
			currentHP: 0,
			currentMP: 0,
			currentArmor: 0,
			currentAccessory: 0,
			currentItem: 0,
			currentDrive: 0,
			allBonuses: bonusData.slice(),
			currentCharacterWorldBonus: bonusData[0].characterBonuses[0].worldBonuses.slice(),
			pnachCodes: []
		}

		this.handleWorldChange = this.handleWorldChange.bind(this)
		this.handleCharacterChange = this.handleCharacterChange.bind(this)
		this.handleReplace = this.handleReplace.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.onRowCheck = this.onRowCheck.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleWorldChange(event) {
		let nextWorld = event.target.value
		let newAllCharacterBonuses = this.state.allBonuses[this.state.currentCharacter].characterBonuses.map((worldBonusList, index) => {
			if (index === this.state.currentWorld) {
				let newWorldBonusList = {
					world: worldsData[index],
					worldBonuses: worldBonusList.worldBonuses.map(bonus => {
						bonus.toBeReplaced = false
						return bonus
					})
				}
				return newWorldBonusList
			}
			return worldBonusList
		})
		let newAllBonuses = this.state.allBonuses.map(c => {
			if (c.character === charactersData[this.state.currentCharacter])
				return {
					character: c.character,
					characterBonuses: newAllCharacterBonuses
				}
			return c
		})
		this.setState({
			currentWorld: nextWorld,
			allBonuses: newAllBonuses,
			currentCharacterWorldBonus: newAllBonuses[this.state.currentCharacter].characterBonuses[nextWorld].worldBonuses.slice()
		})
	}

	handleCharacterChange(event) {
		let nextCharacter = event.target.value

		let newAllCharacterBonuses = this.state.allBonuses[this.state.currentCharacter].characterBonuses.map((worldBonusList, index) => {
			if (index === this.state.currentWorld) {
				let newWorldBonusList = {
					world: worldsData[index],
					worldBonuses: worldBonusList.worldBonuses.map(bonus => {
						bonus.toBeReplaced = false
						return bonus
					})
				}
				return newWorldBonusList
			}
			return worldBonusList
		})

		let newAllBonuses = this.state.allBonuses.map(c => {
			if (c.character === charactersData[this.state.currentCharacter])
				return {
					character: c.character,
					characterBonuses: newAllCharacterBonuses
				}
			return c
		})

		this.setState({
			currentCharacter: nextCharacter,
			allBonuses: newAllBonuses,
			currentCharacterWorldBonus: newAllBonuses[nextCharacter].characterBonuses[this.state.currentWorld].worldBonuses.slice()
		})
	}

	handleInputChange(event) {
		const { name, value } = event.target
		this.setState({
			[name]: parseInt(value)
		})
	}

	onRowCheck(event) {
		let toBeReplacedBonuses = this.state.currentCharacterWorldBonus.map((bonus, index) => {
			if (index === parseInt(event.target.value))
				bonus.toBeReplaced = !bonus.toBeReplaced
			return bonus
		})
		this.setState({
			currentEquipments: toBeReplacedBonuses
		})
	}

	handleChange(event) {
		const { name, value } = event.target
		if (name === 'currentRewardType1')
			this.setState({
				currentReward1: 0,
				currentRewardType1: value
			})
		else if (name === 'currentRewardType2')
			this.setState({
				currentReward2: 0,
				currentRewardType2: value
			})
		else
			this.setState({
				[name]: value,
			})
	}

	handleReplace(event) {
		let replacedBonuses = this.state.currentCharacterWorldBonus.map(bonus => {
			if (event.target.name === 'replaceButton') {
				if (bonus.toBeReplaced) {
					bonus.toBeReplaced = false

					bonus.replacementReward1 = rewardsData[this.state.currentRewardType1].rewards[this.state.currentReward1].reward
					bonus.replacementRewardIndex1 = rewardsData[this.state.currentRewardType1].rewards[this.state.currentReward1].index

					bonus.replacementReward2 = rewardsData[this.state.currentRewardType2].rewards[this.state.currentReward2].reward
					bonus.replacementRewardIndex2 = rewardsData[this.state.currentRewardType2].rewards[this.state.currentReward2].index

					if (bonus.replacementReward1 !== bonus.vanillaReward1 || bonus.replacementReward2 !== bonus.vanillaReward2)
						bonus.isRewardsReplaced = true

					bonus.hpIncrease = this.state.currentHP
					bonus.mpIncrease = this.state.currentMP

					if (bonus.hpIncrease !== bonus.vanillaHpIncrease || bonus.mpIncrease !== bonus.vanillaMpIncrease)
						bonus.isStatsReplaced = true

					bonus.armorSlotIncrease = this.state.currentArmor
					bonus.accessorySlotIncrease = this.state.currentAccessory
					bonus.itemSlotIncrease = this.state.currentItem
					bonus.driveGaugeIncrease = this.state.currentDrive

					if (bonus.armorSlotIncrease !== bonus.vanillaArmorSlotIncrease || bonus.accessorySlotIncrease !== bonus.vanillaAccessorySlotIncrease ||
						bonus.itemSlotIncrease !== bonus.vanillaItemSlotIncrease || bonus.driveGaugeIncrease !== bonus.vanillaDriveGaugeIncrease)
						bonus.isSlotsReplaced = true
				}
			} else {
				if (bonus.toBeReplaced) {
					bonus.toBeReplaced = false

					bonus.replacementReward1 = bonus.vanillaReward1
					bonus.replacementRewardIndex1 = ''
					bonus.replacementReward2 = bonus.vanillaReward2
					bonus.replacementRewardIndex2 = ''
					bonus.hpIncrease = bonus.vanillaHpIncrease
					bonus.mpIncrease = bonus.vanillaMpIncrease
					bonus.armorSlotIncrease = bonus.vanillaArmorSlotIncrease
					bonus.accessorySlotIncrease = bonus.vanillaAccessorySlotIncrease
					bonus.itemSlotIncrease = bonus.vanillaItemSlotIncrease
					bonus.driveGaugeIncrease = bonus.vanillaDriveGaugeIncrease

					bonus.isRewardsReplaced = false
					bonus.isStatsReplaced = false
					bonus.isSlotsReplaced = false
				}
			}
			//reward count
			bonus.rewardChangeCount = 0
			if (bonus.replacementReward1 !== '' && bonus.replacementReward1 !== 'Empty')
				bonus.rewardChangeCount++
			if (bonus.replacementReward2 !== '' && bonus.replacementReward2 !== 'Empty')
				bonus.rewardChangeCount++
			//stat count
			bonus.statChangeCount = 0
			if (bonus.hpIncrease !== 0)
				bonus.statChangeCount++
			if (bonus.mpIncrease !== 0)
				bonus.statChangeCount++
			//slot count
			bonus.slotChangeCount = 0
			if (bonus.armorSlotIncrease !== 0)
				bonus.slotChangeCount++
			if (bonus.accessorySlotIncrease !== 0)
				bonus.slotChangeCount++
			if (bonus.itemSlotIncrease !== 0)
				bonus.slotChangeCount++
			if (bonus.driveGaugeIncrease !== 0)
				bonus.slotChangeCount++
			return bonus
		})
		this.setState({
			currentCharacterWorldBonuses: replacedBonuses
		})
	}

	handleSave() {
		let pnachCodes = this.state.allBonuses.map(character => {
			let ret = '// ' + character.character + '\n'
			character.characterBonuses.forEach(world => {
				ret += '// ' + world.world + '\n'
				world.worldBonuses.forEach(bonus => {
					if (bonus.isRewardsReplaced || bonus.isStatsReplaced || bonus.isSlotsReplaced)
						ret += '// ' + bonus.fight + '\n'

					if (bonus.isStatsReplaced) {
						ret += 'patch=1,EE,' + bonus.statAddress + ',extended,0000';
						ret += bonus.mpIncrease.toString(16).toUpperCase().padStart(2, '0') + bonus.hpIncrease.toString(16).toUpperCase().padStart(2, '0');
						ret += ' // MP:' + bonus.mpIncrease + ' HP:' + bonus.hpIncrease + '\n';
					}

					if (bonus.isSlotsReplaced) {
						ret += 'patch=1,EE,' + bonus.slotAddress + ',extended,';
						ret += bonus.armorSlotIncrease.toString(16).toUpperCase().padStart(2, '0') + bonus.accessorySlotIncrease.toString(16).toUpperCase().padStart(2, '0');
						ret += bonus.itemSlotIncrease.toString(16).toUpperCase().padStart(2, '0') + bonus.driveGaugeIncrease.toString(16).toUpperCase().padStart(2, '0');
						ret += ' // Armor Slot:+' + bonus.armorSlotIncrease + ' Accessory Slot:+' + bonus.accessorySlotIncrease;
						ret += ' Item Slot:+' + bonus.itemSlotIncrease + ' Drive Gauge:+' + bonus.driveGaugeIncrease + '\n';
					}

					if (bonus.isRewardsReplaced) {
						ret += 'patch=1,EE,' + bonus.rewardAddress + ',extended,' + bonus.replacementRewardIndex2.padStart(4, '0') + bonus.replacementRewardIndex1.padStart(4, '0');
						ret += ' // Replacement Reward #2:' + bonus.replacementReward2 + ' Replacement Reward #1:' + bonus.replacementReward1 + '\n';
					}
				})
			})
			return ret
		})

		console.log(pnachCodes)
	}

	render() {
		return (
			<div>
				<Form>
					<GenericSelect
						key={'worldSelector'}
						selector={'world'}
						itemList={worldsData}
						name={'currentWorld'}
						currentItem={this.state.currentWorld}
						onChange={this.handleWorldChange}
					/>
					<GenericSelect
						key={'characterSelector'}
						selector={'character'}
						itemList={charactersData}
						name={'currentCharacter'}
						currentItem={this.state.currentCharacter}
						onChange={this.handleCharacterChange}
					/>
					<RewardSelect
						currentRewardType={this.state.currentRewardType1}
						rewardList={rewardsData[this.state.currentRewardType1].rewards}
						currentReward={this.state.currentReward1}
						typeName={'currentRewardType1'}
						name={'currentReward1'}
						onChange={this.handleChange}
					/>
					<RewardSelect
						currentRewardType={this.state.currentRewardType2}
						rewardList={rewardsData[this.state.currentRewardType2].rewards}
						currentReward={this.state.currentReward2}
						typeName={'currentRewardType2'}
						name={'currentReward2'}
						onChange={this.handleChange}
					/>
					<Form.Group controlId='currentHP'>
						<Form.Label>HP Increase: </Form.Label>
						<Form.Control
							name='currentHP'
							type='number'
							value={this.state.currentHP}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='currentMP'>
						<Form.Label>MP Increase: </Form.Label>
						<Form.Control
							name='currentMP'
							type='number'
							value={this.state.currentMP}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='currentArmor'>
						<Form.Label>Armor Slot Increase: </Form.Label>
						<Form.Control
							name='currentArmor'
							type='number'
							value={this.state.currentArmor}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='currentAccessory'>
						<Form.Label>Accessory Slot Increase: </Form.Label>
						<Form.Control
							name='currentAccessory'
							type='number'
							value={this.state.currentAccessory}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='currentItem'>
						<Form.Label>Item Slot Increase: </Form.Label>
						<Form.Control
							name='currentItem'
							type='number'
							value={this.state.currentItem}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='currentDrive'>
						<Form.Label>Drive Gauge Increase: </Form.Label>
						<Form.Control
							name='currentDrive'
							type='number'
							value={this.state.currentDrive}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
				</Form>
				<BonusTable
					currentWorld={worldsData[this.state.currentWorld]}
					currentCharacter={charactersData[this.state.currentCharacter]}
					bonuses={this.state.currentCharacterWorldBonus}
					onRowCheck={this.onRowCheck}
				/>
				<Buttons
					onClick={this.handleReplace}
					onSaveClick={this.handleSave}
				/>
			</div >
		)
	}
}

export default BonusPage