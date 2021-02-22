import { Reward } from './rewardsData'

export class Critical {
	constructor(vanilla, address) {
		this.vanillaReward = { ...vanilla }
		this.replacementReward = { ...vanilla }
		this.vanillaAddress = address
		this.toBeReplaced = false

		this.isReplaced = () => {
			return this.replacementReward.index !== this.vanillaReward.index
		}
		this.copy = () => {
			let ret = new Critical(new Reward(this.vanillaReward.reward, this.vanillaReward.index, this.vanillaReward.iconType), this.vanillaAddress)
			ret.replacementReward = { ...this.replacementReward }
			ret.toBeReplaced = this.toBeReplaced
			return ret
		}
		this.vanilla = () => {
			return new Critical(new Reward(this.vanillaReward.reward, this.vanillaReward.index, this.vanillaReward.iconType), this.vanillaAddress)
		}
		this.replace = (newCriticalData) => {
			let ret = this.copy()
			ret.replacementReward = { ...newCriticalData.reward }
			ret.toBeReplaced = false
			return ret
		}
		this.markForReplacement = (toBeReplaced) => {
			let ret = this.copy()
			ret.toBeReplaced = toBeReplaced
			return ret
		}
		this.saveToJSON = () => {
			return this.isReplaced() ? JSON.stringify(this, ['replacementReward', 'vanillaAddress']) : ''
		}
		this.loadFromJSON = (criticalJSON) => {
			let ret = this.copy()
			ret.replacementReward = { ...criticalJSON.replacementReward }
			ret.toBeReplaced = false
			return ret
		}
		this.saveToPnach = () => {
			let ret = 'patch=1,EE,' + this.vanillaAddress.toString(16).toUpperCase().padStart(8, '0') + ',extended,0000' + this.replacementReward.index.padStart(4, '0')
			ret += ' // ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward + '\n'
			return ret
		}
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