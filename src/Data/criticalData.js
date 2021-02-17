import { Reward } from './rewardsData'

export class Critical {
	constructor(vanilla, address) {
		this.vanillaReward = { ...vanilla }
		this.replacementReward = { ...vanilla }
		this.vanillaAddress = address
		this.toBeReplaced = false
	}

	isReplaced() {
		return this.replacementReward.index !== this.vanillaReward.index
	}

	vanilla() {
		this.replacementReward.reward = this.vanillaReward.reward
		this.replacementReward.index = this.vanillaReward.index
		this.replacementReward.iconType = this.vanillaReward.iconType
		this.toBeReplaced = false
	}

	replace(newCriticalData) {
		this.replacementReward.reward = newCriticalData.reward.reward
		this.replacementReward.index = newCriticalData.reward.index
		this.replacementReward.iconType = newCriticalData.reward.iconType
		this.toBeReplaced = false
	}

	markForReplacement(toBeReplaced) {
		this.toBeReplaced = toBeReplaced
	}

	toPnach() {
		let ret = 'patch=1,EE,' + this.vanillaAddress.toString(16).toUpperCase().padStart(8, '0') + ',extended,0000' + this.replacementReward.index.padStart(4, '0')
		ret += ' // ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward + '\n'
		return ret
	}
}

export const criticalData = [
	new Critical(new Reward('Reaction Boost', 0x0188, 'Ability'), 0x11D18DDE),
	new Critical(new Reward('Finishing Plus', 0x0189, 'Ability'), 0x11D18DDC),
	new Critical(new Reward('Draw', 0x0195, 'Ability'), 0x11D18DE8),
	new Critical(new Reward('Lucky Lucky (1)', 0x0197, 'Ability'), 0x11D18DE4),
	new Critical(new Reward('Lucky Lucky (2)', 0x0197, 'Ability'), 0x11D18DE6),
	new Critical(new Reward('MP Hastera', 0x01A5, 'Ability'), 0x11D18DE0),
	new Critical(new Reward('No Experience', 0x0194, 'Ability'), 0x11D18DE2)
]