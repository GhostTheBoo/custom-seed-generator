import React from 'react'
import Form from 'react-bootstrap/Form'

import rewardsData from './Data/rewardsData'
import levelsData from './Data/levelsData'

import RewardSelect from './Components/RewardSelect'
import EXPSelect from './Components/EXPSelect'
import LevelTable from './Components/LevelTable.js'
import Buttons from './Components/Buttons'

class LevelPage extends React.Component {
	constructor() {
		super()

		this.state = {
			currentWorld: 0,
			currentCharacter: 0,
			currentSwordRewardType: 0,
			currentSwordReward: 0,
			currentShieldRewardType: 0,
			currentShieldReward: 0,
			currentStaffRewardType: 0,
			currentStaffReward: 0,
			currentAP: 0,
			currentDefense: 0,
			currentMagic: 0,
			currentStrength: 0,
			currentEXP: 0,
			currentEXPMultiplierValue: 0,
			allLevels: levelsData.slice(),
			pnachCodes: []
		}

		this.handleReplace = this.handleReplace.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.onRowCheck = this.onRowCheck.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	crit(ap) {
		return Math.floor(((ap - 2) * 1.5) + 50);
	}

	handleInputChange(event) {
		const { name, value } = event.target
		console.log(value)
		this.setState({
			[name]: value,
		})
	}

	onRowCheck(event) {
		let toBeReplacedLevels = this.state.allLevels.map((l, index) => {
			if (index === parseInt(event.target.value))
				l.toBeReplaced = !l.toBeReplaced
			return l
		})
		this.setState({
			allLevels: toBeReplacedLevels
		})
	}

	handleChange(event) {
		const { name, value } = event.target
		if (name === 'currentSwordRewardType')
			this.setState({
				currentSwordReward: 0,
				currentSwordRewardType: value
			})
		else if (name === 'currentShieldRewardType')
			this.setState({
				currentShieldReward: 0,
				currentShieldRewardType: value
			})
		else if (name === 'currentStaffRewardType')
			this.setState({
				currentStaffReward: 0,
				currentStaffRewardType: value
			})
		else
			this.setState({
				[name]: value,
			})
	}

	handleReplace(event) {
		let replacedLevels = this.state.allLevels.map(l => {
			if (event.target.name === 'replaceButton') {
				if (l.toBeReplaced) {
					l.toBeReplaced = false

					l.swordReplacementReward = rewardsData[this.state.currentSwordRewardType].rewards[this.state.currentSwordReward].reward
					l.swordReplacementIndex = rewardsData[this.state.currentSwordRewardType].rewards[this.state.currentSwordReward].index
					if (l.swordReplacementReward !== l.vanillaSwordReward)
						l.isSwordReplaced = true

					l.shieldReplacementReward = rewardsData[this.state.currentShieldRewardType].rewards[this.state.currentShieldReward].reward
					l.shieldReplacementIndex = rewardsData[this.state.currentShieldRewardType].rewards[this.state.currentShieldReward].index
					if (l.shieldReplacementReward !== l.vanillaShieldReward)
						l.isShieldReplaced = true

					l.staffReplacementReward = rewardsData[this.state.currentStaffRewardType].rewards[this.state.currentStaffReward].reward
					l.staffReplacementIndex = rewardsData[this.state.currentStaffRewardType].rewards[this.state.currentStaffReward].index
					if (l.staffReplacementReward !== l.vanillaStaffReward)
						l.isStaffReplaced = true

					l.standardAP = this.state.currentAP
					l.criticalAP = this.crit(this.state.currentAP)
					l.defense = this.state.currentDefense
					l.magic = this.state.currentMagic
					l.strength = this.state.strength

					if (l.standardAP !== l.vanillaAP || l.defense !== l.vanillaDefense || l.magic !== l.vanillaMagic || l.strength !== l.vanillaStrength)
						l.isStatsReplaced = true

					if (this.state.currentEXPMultiplierValue === 0)
						l.replacedEXP = this.state.currentEXP
					else
						l.replacedEXP = Math.floor(l.vanillaEXP / this.state.currentEXPMultiplierValue)

					if (l.replacedEXP !== l.vanillaEXP)
						l.isEXPReplaced = true
				}
			} else {
				if (l.toBeReplaced) {
					l.toBeReplaced = false

					l.swordReplacementReward = l.vanillaSwordReward
					l.swordReplacementIndex = ''
					l.isSwordReplaced = false

					l.shieldReplacementReward = l.vanillaShieldReward
					l.shieldReplacementIndex = ''
					l.isShieldReplaced = false

					l.staffReplacementReward = l.vanillaStaffReward
					l.staffReplacementIndex = ''
					l.isStaffReplaced = false

					l.standardAP = l.vanillaAP
					l.criticalAP = this.crit(l.vanillaAP)
					l.defense = l.vanillaDefense
					l.magic = l.vanillaMagic
					l.strength = l.vanillaStrength
					l.isStatsReplaced = false

					l.replacedEXP = l.vanillaEXP
					l.isEXPReplaced = false
				}
			}
			return l
		})
		this.setState({
			allLevels: replacedLevels
		})
	}

	handleSave() {
		let pnachCodes = this.state.allLevels.map(l => {
			let ret = '// Level: ' + l.level + '\n'

			if (l.level === 99)
				ret += '// Cannot Level to 100 so experience is not changed\n'
			else {
				if (l.isEXPReplaced) {
					ret += 'patch=1,EE,' + l.expAddress + ',extended,' + l.replacedEXP.toString(16).toUpperCase().padStart(8, '0')
					ret += ' // Level ' + l.level + ' at ' + l.replacedEXP + ' experience\n'
				}
			}

			if (l.statChange) {
				ret += 'patch=1,EE,' + l.statAddress + ',extended,'
				ret += l.standardAP.toString(16).toUpperCase().padStart(2, '0') + l.defense.toString(16).toUpperCase().padStart(2, '0')
				ret += l.magic.toString(16).toUpperCase().padStart(2, '0') + l.strength.toString(16).toUpperCase().padStart(2, '0')
				ret += ' // AP:' + l.standardAP.toString() + ' Magic:' + l.magic.toString() + ' Defense:' + l.defense.toString() + ' Strength:' + l.strength.toString() + '\n'
			}

			if (l.level === 1)
				ret += '// No Level 1 Dream Weapon Rewards\n'
			else {
				if (l.isSwordReplaced)
					ret += 'patch=1,EE,' + l.swordAddress + ',extended,0000' + l.swordReplacementIndex + ' // Sword Reward: ' + l.swordReplacementReward + '\n'
				if (l.isShieldReplaced)
					ret += 'patch=1,EE,' + l.shieldAddress + ',extended,0000' + l.shieldReplacementIndex + ' // Shield Reward: ' + l.shieldReplacementReward + '\n'
				if (l.isStaffReplaced)
					ret += 'patch=1,EE,' + l.staffAddress + ',extended,0000' + l.staffReplacementIndex + ' // Staff Reward: ' + l.staffReplacementReward + '\n'
			}
			return ret
		})

		console.log(pnachCodes)
	}

	render() {
		return (
			<div>
				<Form>
					<RewardSelect
						currentRewardType={this.state.currentSwordRewardType}
						rewardList={rewardsData[this.state.currentSwordRewardType].rewards}
						currentReward={this.state.currentSwordReward}
						typeName={'currentSwordRewardType'}
						name={'currentSwordReward'}
						onChange={this.handleChange}
					/>
					<RewardSelect
						currentRewardType={this.state.currentShieldRewardType}
						rewardList={rewardsData[this.state.currentShieldRewardType].rewards}
						currentReward={this.state.currentShieldReward}
						typeName={'currentShieldRewardType'}
						name={'currentShieldReward'}
						onChange={this.handleChange}
					/>
					<RewardSelect
						currentRewardType={this.state.currentStaffRewardType}
						rewardList={rewardsData[this.state.currentStaffRewardType].rewards}
						currentReward={this.state.currentStaffReward}
						typeName={'currentStaffRewardType'}
						name={'currentStaffReward'}
						onChange={this.handleChange}
					/>
					<EXPSelect
						currentEXP={this.state.currentEXP}
						currentEXPMultiplier={this.state.currentEXPMultiplierValue}
						onChange={this.handleChange}
					/>
					<Form.Group controlId='currentAP'>
						<Form.Label>AP: </Form.Label>
						<Form.Control
							name='currentAP'
							type='number'
							value={this.state.currentAP}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='currentDefense'>
						<Form.Label>Defense: </Form.Label>
						<Form.Control
							name='currentDefense'
							type='number'
							value={this.state.currentDefense}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='currentStrength'>
						<Form.Label>Strength: </Form.Label>
						<Form.Control
							name='currentStrength'
							type='number'
							value={this.state.currentStrength}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='currentMagic'>
						<Form.Label>Magic: </Form.Label>
						<Form.Control
							name='currentMagic'
							type='number'
							value={this.state.currentMagic}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
				</Form>
				<LevelTable
					allLevels={this.state.allLevels}
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

export default LevelPage