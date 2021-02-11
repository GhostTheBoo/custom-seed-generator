import { Reward } from './rewardsData'

export class Critical {
	constructor(vanilla, address) {
		this.vanillaReward = vanilla
		this.replacementReward = vanilla
		this.vanillaAddress = address
		this.toBeReplaced = false
		this.isReplaced = false
	}
}

export const criticalData = [
	new Critical(new Reward('Reaction Boost', 0x0188), 0x11D18DDE),
	new Critical(new Reward('Finishing Plus', 0x0189), 0x11D18DDC),
	new Critical(new Reward('Draw', 0x0195), 0x11D18DE8),
	new Critical(new Reward('Lucky Lucky (1)', 0x0197), 0x11D18DE4),
	new Critical(new Reward('Lucky Lucky (2)', 0x0197), 0x11D18DE6),
	new Critical(new Reward('MP Hastera', 0x01A5), 0x11D18DE0),
	new Critical(new Reward('No Experience', 0x0194), 0x11D18DE2)
]