import { Reward } from './rewardsData'

export class BonusReward {
	constructor(character, address, reward1, reward2, hp, mp, armor, accessory, item, drive) {
		this.character = character
		this.characterAddress = address
		this.statAddress = this.characterAddress + 0x10000001
		this.slotAddress = this.statAddress + 0x10000002
		this.rewardAddress = this.slotAddress + 4
		this.vanillaReward1 = reward1
		this.replacementReward1 = reward1
		this.vanillaReward2 = reward2
		this.replacementReward2 = reward2
		this.vanillaHpIncrease = hp
		this.hpIncrease = hp
		this.vanillaMpIncrease = mp
		this.mpIncrease = mp
		this.vanillaArmorSlotIncrease = armor
		this.armorSlotIncrease = armor
		this.vanillaAccessorySlotIncrease = accessory
		this.accessorySlotIncrease = accessory
		this.vanillaItemSlotIncrease = item
		this.itemSlotIncrease = item
		this.vanillaDriveGaugeIncrease = drive
		this.driveGaugeIncrease = drive
		this.statChangeCount = this.getStatCount()
		this.slotChangeCount = this.getSlotCount()
		this.rewardChangeCount = this.getRewardCount()
		this.toBeReplaced = false
		this.isStatsReplaced = false
		this.isSlotsReplaced = false
		this.isRewardsReplaced = false
	}

	getStatCount() {
		let ret = 0
		ret += this.hpIncrease > 0 ? 1 : 0
		ret += this.mpIncrease > 0 ? 1 : 0
		return ret
	}

	getSlotCount() {
		let ret = 0
		ret += this.armorSlotIncrease > 0 ? 1 : 0
		ret += this.accessorySlotIncrease > 0 ? 1 : 0
		ret += this.itemSlotIncrease > 0 ? 1 : 0
		ret += this.driveGaugeIncrease > 0 ? 1 : 0
		return ret
	}

	getRewardCount() {
		let ret = 0
		ret += this.replacementReward1.index !== 0 ? 1 : 0
		ret += this.replacementReward2.index !== 0 ? 1 : 0
		return ret
	}
}

export class BonusFight {
	constructor(name, slot1, slot2, slot3, slot4) {
		this.fight = name
		this.slot1 = slot1
		this.slot2 = slot2
		this.slot3 = slot3
		this.slot4 = slot4
	}
}

export const bonusData = [
	{
		world: 'Agrabah',
		bonusFights: [
			new BonusFight('Escort Abu',
				new BonusReward('Sora', 0x01D10DB1, new Reward('Summon Boost', 0x018F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Sora', 0x01D10DB1, new Reward('Summon Boost', 0x018F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Sora', 0x01D10DB1, new Reward('Summon Boost', 0x018F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Sora', 0x01D10DB1, new Reward('Summon Boost', 0x018F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0))
		]
	}
]