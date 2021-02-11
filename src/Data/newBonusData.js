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
				new BonusReward('Donald', 0x01D10DC1, new Reward('Donald Blizzard', 0x00A6), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10DD1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Treasure Room Heartless',
				new BonusReward('Sora', 0x01D10E51, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10E61, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10E71, new Reward('Auto Healing', 0x01A4), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Volcanic Lord & Blizzard Lord',
				new BonusReward('Sora', 0x01D10CE1, new Reward('Finishing Leap', 0x010B), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10CF1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10D01, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 1, 0, 0, 0),
				null),
			new BonusFight('Genie Jafar',
				new BonusReward('Sora', 0x01D10971, new Reward('Fire', 0x0015), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Lexaeus (Absent Silhouette)',
				new BonusReward('Sora', 0x01D11121, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 0, 0),
				new BonusReward('Donald', 0x01D11131, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D11141, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 1, 0),
				null)
		]
	}, {
		world: 'Atlantica',
		bonusFights: []
	}, {
		world: 'Beast\'s Castle',
		worldBonuses: [
			new BonusFight('Thresholder',
				new BonusReward('Sora', 0x01D10751, new Reward('Upper Slash', 0x0089), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10761, new Reward('Donald Fire', 0x00A5), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10771, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('The Beast',
				new BonusReward('Sora', 0x01D10941, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 1, 0, 0, 0),
				new BonusReward('Donald', 0x01D10951, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10961, new Reward('Defender', 0x019E), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Dark Thorn',
				new BonusReward('Sora', 0x01D10781, new Reward('Retaliating Slash', 0x0111), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10791, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D107A1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 1, 0),
				null),
			new BonusFight('Xaldin',
				new BonusReward('Sora', 0x01D107C1, new Reward('Reflect', 0x0058), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D107D1, new Reward('Auto Healing', 0x01A4), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D107E1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Cavern of Remembrance',
		bonusFights: [
			new BonusFight('Transport to Remembrance Nobodies III',
				new BonusReward('Sora', 0x01D11241, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 1, 0),
				new BonusReward('Donald', 0x01D11251, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D11261, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Disney Castle',
		bonusFights: [
			new BonusFight('Escort Queen Minnie',
				new BonusReward('Sora', 0x01D10D21, new Reward('Auto Summon', 0x0185), new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 0, 0),
				null,
				null,
				null),
			new BonusFight('Marluxia (Absent Silhouette)',
				new BonusReward('Sora', 0x01D11181, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 1),
				new BonusReward('Donald', 0x01D11191, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D111A1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Lingering Will',
				new BonusReward('Sora', 0x01D111F1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 1),
				new BonusReward('Donald', 0x01D11201, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D11211, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Halloween Town',
		bonusFights: [
			new BonusFight('Prison Keeper',
				new BonusReward('Sora', 0x01D109E1, new Reward('Flash Step', 0x022F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D109F1, new Reward('Hyper Healing', 0x01A3), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10A01, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Oogie Boogie',
				new BonusReward('Sora', 0x01D10A21, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 1, 0),
				new BonusReward('Donald', 0x01D10A31, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10A41, new Reward('Once More', 0x01A0), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Lock/Shock/Barrel',
				new BonusReward('Sora', 0x01D10D71, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 1, 0),
				new BonusReward('Donald', 0x01D10D81, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10D91, new Reward('Auto Change', 0x01A2), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('The Experiment',
				new BonusReward('Sora', 0x01D10A61, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10A71, new Reward('Jackpot', 0x0196), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10A81, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Vexen (Absent Silhouette)',
				new BonusReward('Sora', 0x01D110F1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 1, 0, 0, 0),
				new BonusReward('Donald', 0x01D11101, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D11111, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Hollow Bastion',
		bonusFights: [
			new BonusFight('Bailey Nobodies',
				new BonusReward('Sora', 0x01D10E91, new Reward('Fire', 0x0015), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Demyx (Hollow Bastion)',
				new BonusReward('Sora', 0x01D10BA1, new Reward('Blizzard', 0x0016), new Reward('EMPTY', 0x0000), 0, 0, 1, 0, 0, 0),
				new BonusReward('Donald', 0x01D10BB1, new Reward('Blizzard Boost', 0x0199), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10BC1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('1,000 Heartless',
				new BonusReward('Sora', 0x01D11061, new Reward('Guard Break', 0x0109), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Sephiroth',
				new BonusReward('Sora', 0x01D10CD1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 1),
				null,
				null,
				null)
		]
	}, {
		world: 'Land of Dragons',
		bonusFights: [
			new BonusFight('Village Cave Heartless',
				new BonusReward('Sora', 0x01D10DF1, new Reward('Slide Dash', 0x0108), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Shan-Yu',
				new BonusReward('Sora', 0x01D108C1, new Reward('Aerial Sweep', 0x010D), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D108D1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D108E1, new Reward('Goofy Turbo', 0x01A9), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Storm Rider',
				new BonusReward('Sora', 0x01D10901, new Reward('Thunder', 0x0017), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10911, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10921, new Reward('Tornado Fusion (Whirli-Goof)', 0x00C9), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Olympus Coliseum',
		bonusFights: [
			new BonusFight('Cerberus',
				new BonusReward('Sora', 0x01D10801, new Reward('Counterguard', 0x010C), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Phil\'s Training(Story)',
				new BonusReward('Sora', 0x01D10FE1, new Reward('Aerial Dive', 0x0230), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Demyx (Olympus Coliseum)',
				new BonusReward('Sora', 0x01D10FF1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D11001, new Reward('MP Rage', 0x019C), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D11011, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Pete (Olympus Coliseum)',
				new BonusReward('Sora', 0x01D10821, new Reward('Trinity Limit', 0x00C6), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10831, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10841, new Reward('Hyper Healing', 0x01A3), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('The Hydra',
				new BonusReward('Sora', 0x01D10851, new Reward('Thunder', 0x0017), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10861, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 1, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10871, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Hades',
				new BonusReward('Sora', 0x01D10881, new Reward('Magnet Burst', 0x0231), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10891, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 0, 0),
				new BonusReward('Goofy', 0x01D108A1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Zexion (Absent Silhouette)',
				new BonusReward('Sora', 0x01D11151, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 1, 0),
				new BonusReward('Donald', 0x01D11161, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D11171, new Reward('Damage Control', 0x021E), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
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
				new BonusReward('Sora', 0x01D110B1, new Reward('Aerial Spiral', 0x010E), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D110C1, new Reward('Draw', 0x0195), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D110D1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('The Interceptor Barrels',
				new BonusReward('Sora', 0x01D10D31, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 1, 0),
				new BonusReward('Donald', 0x01D10D41, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10D51, new Reward('Second Chance', 0x019F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Captain Barbossa',
				new BonusReward('Sora', 0x01D10AA1, new Reward('Aerial Finish', 0x0110), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 1),
				new BonusReward('Donald', 0x01D10AB1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10AC1, new Reward('Teamwork (Knocksmash)', 0x00CA), new Reward('Auto Limit', 0x01A1), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Grim Reaper I',
				new BonusReward('Sora', 0x01D11021, new Reward('Horizontal Slash', 0x010F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D11031, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D11041, new Reward('Draw', 0x0195), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Grim Reaper II',
				new BonusReward('Sora', 0x01D10AE1, new Reward('Magnet', 0x0057), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10AF1, new Reward('Flare Force (Duck Flare)', 0x00C8), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10B01, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Pride Lands',
		bonusFights: [
			new BonusFight('Hyenas I',
				new BonusReward('Sora', 0x01D10EA1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10EB1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10EC1, new Reward('Lucky Lucky', 0x0197), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Scar',
				new BonusReward('Sora', 0x01D10BD1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 10, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10BE1, new Reward('Fire Boost', 0x0198), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10BF1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Hyenas II',
				new BonusReward('Sora', 0x01D10ED1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 0, 0),
				new BonusReward('Donald', 0x01D10EE1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10EF1, new Reward('MP Rage', 0x019C), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Groundshaker',
				new BonusReward('Sora', 0x01D10C11, new Reward('Thunder', 0x0017), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null)
		]
	}, {
		world: 'Simulated Twilight Town',
		bonusFights: [
			new BonusFight('Station of Serenity Nobodies',
				new BonusReward('Roxas', 0x01D10FA1, new Reward('Aerial Recovery', 0x009E), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Twilight Thorn',
				new BonusReward('Roxas', 0x01D10CB1, new Reward('Guard', 0x0052), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Axel I',
				new BonusReward('Roxas', 0x01D11271, new Reward('Scan', 0x008A), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Axel II',
				new BonusReward('Roxas', 0x01D10CC1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null)
		]
	}, {
		world: 'Space Paranoids',
		bonusFights: [
			new BonusFight('Dataspace Computers',
				new BonusReward('Sora', 0x01D10E11, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10E21, new Reward('Thunder Boost', 0x019A), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10E31, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Hostile Program',
				new BonusReward('Sora', 0x01D10C31, new Reward('Vicinity Break', 0x0232), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 1),
				new BonusReward('Donald', 0x01D10C41, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10C51, new Reward('Jackpot', 0x0196), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Solar Sailor Heartless',
				new BonusReward('Sora', 0x01D11071, new Reward('Explosion', 0x010A), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D11081, new Reward('MP Hastera', 0x01A5), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D11091, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('MCP',
				new BonusReward('Sora', 0x01D10C71, new Reward('Reflect', 0x0058), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10C81, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10C91, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 0, 0),
				null),
			new BonusFight('Larxene (Absent Silhouette)',
				new BonusReward('Sora', 0x01D111B1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 10, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D111C1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 1, 0),
				new BonusReward('Goofy', 0x01D111D1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Timeless River',
		bonusFights: [
			new BonusFight('Pete (Steamboat Fight)',
				new BonusReward('Sora', 0x01D10981, new Reward('Dodge Slash', 0x0107), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10991, new Reward('Fantasia (Comet)', 0x00C7), new Reward('Auto Limit', 0x01A1), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D109A1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Pete (Timeless River)',
				new BonusReward('Sora', 0x01D109B1, new Reward('Reflect', 0x0058), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D109C1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D109D1, new Reward('Goofy Tornado', 0x01A9), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Twilight Town',
		bonusFights: [
			new BonusFight('The Old Mansion Nobodies',
				new BonusReward('Sora', 0x01D10FB1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10FC1, new Reward('Lucky Lucky', 0x0197), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10FD1, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Betwixt & Between Nobodies',
				new BonusReward('Sora', 0x01D110E1, new Reward('Slapshot', 0x0106), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null)
		]
	}, {
		world: 'The World That Never Was',
		bonusFights: [
			new BonusFight('Roxas',
				new BonusReward('Sora', 0x01D111E1, new Reward('Combo Master', 0x021B), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Xigbar',
				new BonusReward('Sora', 0x01D10B21, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 10, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10B31, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 1, 0),
				new BonusReward('Goofy', 0x01D10B41, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Luxord',
				new BonusReward('Sora', 0x01D10B51, new Reward('Magnet', 0x0057), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Saix',
				new BonusReward('Sora', 0x01D10B61, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				new BonusReward('Donald', 0x01D10B71, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0),
				new BonusReward('Goofy', 0x01D10B81, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 1, 0),
				null),
			new BonusFight('Xemnas',
				new BonusReward('Sora', 0x01D10B91, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 10, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Final Xemnas',
				new BonusReward('Sora', 0x01D11221, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 1),
				null,
				null,
				null)
		]
	}
]