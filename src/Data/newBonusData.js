import { Reward } from './rewardsData'

export class BonusReward {
	constructor(address, character, reward1, reward2, hp, mp, armor, accessory, item, drive) {
		this.characterAddress = address
		this.statAddress = this.characterAddress + 0x10000001
		this.slotAddress = this.statAddress + 0x10000002
		this.rewardAddress = this.slotAddress + 4
		this.vanillaCharacter = character
		this.replacementCharacter = character
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
	}

	isStatsReplaced() {
		return this.hpIncrease !== this.vanillaHpIncrease || this.mpIncrease !== this.vanillaMpIncrease
	}

	isSlotsReplaced() {
		return this.armorSlotIncrease !== this.vanillaArmorSlotIncrease || this.accessorySlotIncrease !== this.vanillaAccessorySlotIncrease ||
			this.itemSlotIncrease !== this.vanillaItemSlotIncrease || this.driveGaugeIncrease !== this.vanillaDriveGaugeIncrease
	}

	isRewardsReplaced() {
		return this.replacementReward1.index !== this.vanillaReward1.index || this.replacementReward2.index !== this.vanillaReward2.index
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

	vanilla() {
		this.replacementCharacter = this.vanillaCharacter
		this.replacementReward1.reward = this.vanillaReward1.reward
		this.replacementReward1.index = this.vanillaReward1.index
		this.replacementReward1.iconType = this.vanillaReward1.iconType
		this.replacementReward2.reward = this.vanillaReward2.reward
		this.replacementReward2.index = this.vanillaReward2.index
		this.replacementReward2.iconType = this.vanillaReward2.iconType
		this.hpIncrease = this.vanillaHpIncrease
		this.mpIncrease = this.vanillaMpIncrease
		this.armorSlotIncrease = this.vanillaArmorSlotIncrease
		this.accessorySlotIncrease = this.vanillaAccessorySlotIncrease
		this.itemSlotIncrease = this.vanillaItemSlotIncrease
		this.driveGaugeIncrease = this.vanillaDriveGaugeIncrease
		this.statChangeCount = this.getStatCount()
		this.slotChangeCount = this.getSlotCount()
		this.rewardChangeCount = this.getRewardCount()
		this.toBeReplaced = false
	}

	replace(newBonusData) {
		this.replacementCharacter = newBonusData.character
		this.replacementReward1.reward = newBonusData.reward1.reward
		this.replacementReward1.index = newBonusData.reward1.index
		this.replacementReward1.iconType = newBonusData.reward1.iconType
		this.replacementReward2.reward = newBonusData.reward2.reward
		this.replacementReward2.index = newBonusData.reward2.index
		this.replacementReward2.iconType = newBonusData.reward2.iconType
		this.hpIncrease = newBonusData.hp
		this.mpIncrease = newBonusData.mp
		this.armorSlotIncrease = newBonusData.armor
		this.accessorySlotIncrease = newBonusData.accessory
		this.itemSlotIncrease = newBonusData.item
		this.driveGaugeIncrease = newBonusData.drive
		this.statChangeCount = this.getStatCount()
		this.slotChangeCount = this.getSlotCount()
		this.rewardChangeCount = this.getRewardCount()
		this.toBeReplaced = false
	}

	markForReplacement(toBeReplaced) {
		this.toBeReplaced = toBeReplaced
	}

	toPnach() {
		let ret = '//'






		let ret = 'patch=1,EE,' + this.vanillaAddress + ',extended,0000' + this.replacementReward.index.padStart(4, '0')
		return ret + ' // ' + this.popup + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward + '\n'
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
				new BonusReward(0x01D10DB1, 'Sora', new Reward('Summon Boost', 0x018F, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10DC1, 'Donald', new Reward('Donald Blizzard', 0x00A6, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10DD1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10DE1, 'Aladdin', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Treasure Room Heartless',
				new BonusReward(0x01D10E51, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10E61, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10E71, 'Goofy', new Reward('Auto Healing', 0x01A4, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10E81, 'Aladdin', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Volcanic Lord & Blizzard Lord',
				new BonusReward(0x01D10CE1, 'Sora', new Reward('Finishing Leap', 0x010B, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10CF1, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10D01, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 1, 0, 0, 0),
				new BonusReward(0x01D10D11, 'Aladdin', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Genie Jafar',
				new BonusReward(0x01D10971, 'Sora', new Reward('Fire', 0x0015, 'Spell'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Lexaeus (Absent Silhouette)',
				new BonusReward(0x01D11121, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 0, 0),
				new BonusReward(0x01D11131, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11141, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				null)
		]
	}, {
		world: 'Atlantica',
		bonusFights: []
	}, {
		world: 'Beast\'s Castle',
		bonusFights: [
			new BonusFight('Thresholder',
				new BonusReward(0x01D10751, 'Sora', new Reward('Upper Slash', 0x0089, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10761, 'Donald', new Reward('Donald Fire', 0x00A5, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10771, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('The Beast',
				new BonusReward(0x01D10941, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 1, 0, 0, 0),
				new BonusReward(0x01D10951, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10961, 'Goofy', new Reward('Defender', 0x019E, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Dark Thorn',
				new BonusReward(0x01D10781, 'Sora', new Reward('Retaliating Slash', 0x0111, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10791, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D107A1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x01D107B1, 'Beast', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 35, 0, 0, 0, 0, 0)),
			new BonusFight('Xaldin',
				new BonusReward(0x01D107C1, 'Sora', new Reward('Reflect', 0x0058, 'Spel'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D107D1, 'Donald', new Reward('Auto Healing', 0x01A4, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D107E1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D107F1, 'Beast', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 25, 0, 0, 0, 0, 0))
		]
	}, {
		world: 'Cavern of Remembrance',
		bonusFights: [
			new BonusFight('Transport to Remembrance Nobodies III',
				new BonusReward(0x01D11241, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x01D11251, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11261, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Disney Castle',
		bonusFights: [
			new BonusFight('Escort Queen Minnie',
				new BonusReward(0x01D10D21, 'Sora', new Reward('Auto Summon', 0x0185, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 0, 0),
				null,
				null,
				null),
			new BonusFight('Marluxia (Absent Silhouette)',
				new BonusReward(0x01D11181, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				new BonusReward(0x01D11191, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x01D111A1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Lingering Will',
				new BonusReward(0x01D111F1, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				new BonusReward(0x01D11201, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11211, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Halloween Town',
		bonusFights: [
			new BonusFight('Prison Keeper',
				new BonusReward(0x01D109E1, 'Sora', new Reward('Flash Step', 0x022F, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D109F1, 'Donald', new Reward('Hyper Healing', 0x01A3, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10A01, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10A11, 'Jack Skellington', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Oogie Boogie',
				new BonusReward(0x01D10A21, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x01D10A31, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10A41, 'Goofy', new Reward('Once More', 0x01A0, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10A51, 'Jack Skellington', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Lock/Shock/Barrel',
				new BonusReward(0x01D10D71, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x01D10D81, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10D91, 'Goofy', new Reward('Auto Change', 0x01A2, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10DA1, 'Jack Skellington', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0)),
			new BonusFight('The Experiment',
				new BonusReward(0x01D10A61, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10A71, 'Donald', new Reward('Jackpot', 0x0196, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10A81, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10A91, 'Jack Skellington', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 10, 0, 0, 0, 0, 0)),
			new BonusFight('Vexen (Absent Silhouette)',
				new BonusReward(0x01D110F1, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 1, 0, 0, 0),
				new BonusReward(0x01D11101, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11111, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Hollow Bastion',
		bonusFights: [
			new BonusFight('Bailey Nobodies',
				new BonusReward(0x01D10E91, 'Sora', new Reward('Fire', 0x0015, 'Spell'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Demyx (Hollow Bastion)',
				new BonusReward(0x01D10BA1, 'Sora', new Reward('Blizzard', 0x0016, 'Spell'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 1, 0, 0, 0),
				new BonusReward(0x01D10BB1, 'Donald', new Reward('Blizzard Boost', 0x0199, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10BC1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('1,000 Heartless',
				new BonusReward(0x01D11061, 'Sora', new Reward('Guard Break', 0x0109, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Sephiroth',
				new BonusReward(0x01D10CD1, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				null,
				null,
				null)
		]
	}, {
		world: 'Land of Dragons',
		bonusFights: [
			new BonusFight('Village Cave Heartless',
				new BonusReward(0x01D10DF1, 'Sora', new Reward('Slide Dash', 0x0108, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10E01, 'Ping/Mulan', new Reward('Hyper Healing', 0x01A3, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 15, 0, 0, 0, 0, 0),
				null,
				null),
			new BonusFight('Shan-Yu',
				new BonusReward(0x01D108C1, 'Sora', new Reward('Aerial Sweep', 0x010D, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D108D1, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D108E1, 'Goofy', new Reward('Goofy Turbo', 0x01A9, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D108F1, 'Ping/Mulan', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 20, 0, 0, 0, 0, 0)),
			new BonusFight('Storm Rider',
				new BonusReward(0x01D10901, 'Sora', new Reward('Thunder', 0x0017, 'Spell'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10911, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10921, 'Goofy', new Reward('Tornado Fusion (Whirli-Goof)', 0x00C9, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10931, 'Ping/Mulan', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 25, 0, 0, 0, 0, 0))
		]
	}, {
		world: 'Olympus Coliseum',
		bonusFights: [
			new BonusFight('Cerberus',
				new BonusReward(0x01D10801, 'Sora', new Reward('Counterguard', 0x010C, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10811, 'Auron', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 40, 0, 0, 0, 0, 0),
				null,
				null),
			new BonusFight('Phil\'s Training(Story)',
				new BonusReward(0x01D10FE1, 'Sora', new Reward('Aerial Dive', 0x0230, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Demyx (Olympus Coliseum)',
				new BonusReward(0x01D10FF1, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11001, 'Donald', new Reward('MP Rage', 0x019C, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11011, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Pete (Olympus Coliseum)',
				new BonusReward(0x01D10821, 'Sora', new Reward('Trinity Limit', 0x00C6, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10831, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10841, 'Goofy', new Reward('Hyper Healing', 0x01A3, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('The Hydra',
				new BonusReward(0x01D10851, 'Sora', new Reward('Thunder', 0x0017, 'Spell'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10861, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 1, 0, 0, 0),
				new BonusReward(0x01D10871, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Hades',
				new BonusReward(0x01D10881, 'Sora', new Reward('Magnet Burst', 0x0231, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10891, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 0, 0),
				new BonusReward(0x01D108A1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D108B1, 'Auron', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Zexion (Absent Silhouette)',
				new BonusReward(0x01D11151, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x01D11161, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11171, 'Goofy', new Reward('Damage Control', 0x021E, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Olympus Cups',
		bonusFights: []
	}, {
		world: '100 Acre Wood',
		bonusFights: []
	}, {
		world: 'Port Royal',
		bonusFights: [
			new BonusFight('The Interceptor Pirates',
				new BonusReward(0x01D110B1, 'Sora', new Reward('Aerial Spiral', 0x010E, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D110C1, 'Donald', new Reward('Draw', 0x0195, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D110D1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('The Interceptor Barrels',
				new BonusReward(0x01D10D31, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x01D10D41, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10D51, 'Goofy', new Reward('Second Chance', 0x019F, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10D61, 'Jack Sparrow', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 10, 0, 0, 0, 0, 0)),
			new BonusFight('Captain Barbossa',
				new BonusReward(0x01D10AA1, 'Sora', new Reward('Aerial Finish', 0x0110, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				new BonusReward(0x01D10AB1, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10AC1, 'Goofy', new Reward('Teamwork (Knocksmash)', 0x00CA, 'Ability'), new Reward('Auto Limit', 0x01A1, 'Ability'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10AD1, 'Jack Sparrow', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Grim Reaper I',
				new BonusReward(0x01D11021, 'Sora', new Reward('Horizontal Slash', 0x010F, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11031, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11041, 'Goofy', new Reward('Draw', 0x0195, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11051, 'Jack Sparrow', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 10, 0, 0, 0, 0, 0)),
			new BonusFight('Grim Reaper II',
				new BonusReward(0x01D10AE1, 'Sora', new Reward('Magnet', 0x0057, 'Spell'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10AF1, 'Donald', new Reward('Flare Force (Duck Flare)', 0x00C8, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10B01, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10B11, 'Jack Sparrow', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 15, 0, 0, 0, 0, 0))
		]
	}, {
		world: 'Pride Lands',
		bonusFights: [
			new BonusFight('Hyenas I',
				new BonusReward(0x01D10EA1, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10EB1, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10EC1, 'Goofy', new Reward('Lucky Lucky', 0x0197, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Scar',
				new BonusReward(0x01D10BD1, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 10, 0, 0, 0, 0),
				new BonusReward(0x01D10BE1, 'Donald', new Reward('Fire Boost', 0x0198, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10BF1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10C01, 'Simba', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 30, 0, 0, 0, 0, 0)),
			new BonusFight('Hyenas II',
				new BonusReward(0x01D10ED1, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 0, 0),
				new BonusReward(0x01D10EE1, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10EF1, 'Goofy', new Reward('MP Rage', 0x019C, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10D01, 'Simba', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0)),
			new BonusFight('Groundshaker',
				new BonusReward(0x01D10C11, 'Sora', new Reward('Thunder', 0x0017, 'Spell'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10C21, 'Simba', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null,
				null)
		]
	}, {
		world: 'Simulated Twilight Town',
		bonusFights: [
			new BonusFight('Station of Serenity Nobodies',
				new BonusReward(0x01D10FA1, 'Roxas', new Reward('Aerial Recovery', 0x009E, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Twilight Thorn',
				new BonusReward(0x01D10CB1, 'Roxas', new Reward('Guard', 0x0052, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Axel I',
				new BonusReward(0x01D11271, 'Roxas', new Reward('Scan', 0x008A, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Axel II',
				new BonusReward(0x01D10CC1, 'Roxas', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null)
		]
	}, {
		world: 'Space Paranoids',
		bonusFights: [
			new BonusFight('Dataspace Computers',
				new BonusReward(0x01D10E11, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10E21, 'Donald', new Reward('Thunder Boost', 0x019A, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10E31, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10E41, 'Tron', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 10, 0, 0, 0, 0, 0)),
			new BonusFight('Hostile Program',
				new BonusReward(0x01D10C31, 'Sora', new Reward('Vicinity Break', 0x0232, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				new BonusReward(0x01D10C41, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10C51, 'Goofy', new Reward('Jackpot', 0x0196, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10C61, 'Tron', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Solar Sailor Heartless',
				new BonusReward(0x01D11071, 'Sora', new Reward('Explosion', 0x010A, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11081, 'Donald', new Reward('MP Hastera', 0x01A5, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D11091, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D110A1, 'Tron', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0)),
			new BonusFight('MCP',
				new BonusReward(0x01D10C71, 'Sora', new Reward('Reflect', 0x0058, 'Spell'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10C81, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10C91, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 0, 0),
				new BonusReward(0x01D10CA1, 'Tron', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0)),
			new BonusFight('Larxene (Absent Silhouette)',
				new BonusReward(0x01D111B1, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 10, 0, 0, 0, 0),
				new BonusReward(0x01D111C1, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x01D111D1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Timeless River',
		bonusFights: [
			new BonusFight('Pete (Steamboat Fight)',
				new BonusReward(0x01D10981, 'Sora', new Reward('Dodge Slash', 0x0107, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10991, 'Donald', new Reward('Fantasia (Comet)', 0x00C7, 'Ability'), new Reward('Auto Limit', 0x01A1, 'Ability'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D109A1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Pete (Timeless River)',
				new BonusReward(0x01D109B1, 'Sora', new Reward('Reflect', 0x0058, 'Spell'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D109C1, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D109D1, 'Goofy', new Reward('Goofy Tornado', 0x01A9, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Twilight Town',
		bonusFights: [
			new BonusFight('The Old Mansion Nobodies',
				new BonusReward(0x01D10FB1, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10FC1, 'Donald', new Reward('Lucky Lucky', 0x0197, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10FD1, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Betwixt & Between Nobodies',
				new BonusReward(0x01D110E1, 'Sora', new Reward('Slapshot', 0x0106, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null)
		]
	}, {
		world: 'The World That Never Was',
		bonusFights: [
			new BonusFight('Roxas',
				new BonusReward(0x01D111E1, 'Sora', new Reward('Combo Master', 0x021B, 'Ability'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Xigbar',
				new BonusReward(0x01D10B21, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 10, 0, 0, 0, 0),
				new BonusReward(0x01D10B31, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x01D10B41, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Luxord',
				new BonusReward(0x01D10B51, 'Sora', new Reward('Magnet', 0x0057, 'Spell'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Saix',
				new BonusReward(0x01D10B61, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10B71, 'Donald', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x01D10B81, 'Goofy', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				null),
			new BonusFight('Xemnas',
				new BonusReward(0x01D10B91, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 10, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Final Xemnas',
				new BonusReward(0x01D11221, 'Sora', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				new BonusReward(0x01D11231, 'Riku', new Reward('EMPTY', 0x0000, 'EMPTY'), new Reward('EMPTY', 0x0000, 'EMPTY'), 25, 0, 0, 0, 0, 0),
				null,
				null)
		]
	}
]