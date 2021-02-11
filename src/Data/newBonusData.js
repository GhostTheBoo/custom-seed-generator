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
			// new BonusdfdfFight('Escort Abu',
			// 	new BonusReward('Sdora', 0x01D10DB1, new Reward('Summon Boost', 0x018F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
			// 	new BonusReward('Sdora', 0x01D10DB1, new Reward('Summon Boost', 0x018F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
			// 	new BonusReward('Sodra', 0x01D10DB1, new Reward('Summon Boost', 0x018F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
			// 	new BonusReward('Sodra', 0x01D10DB1, new Reward('Summon Boost', 0x018F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0))
			new BonusFight('Escort Abu',
				new BonusReward('Sora', 0x01D10DB1, new Reward('Summon Boost', 0x018F), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Treasure Room Heartless',
				new BonusReward('Sora', 0x01D10E51, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Volcanic Lord & Blizzard Lord',
				new BonusReward('Sora', 0x01D10CE1, new Reward('Finishing Leap', 0x010B), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Genie Jafar',
				new BonusReward('Sora', 0x01D10971, new Reward('Fire', 0x0015), new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Lexaeus (Absent Silhouette)',
				new BonusReward('Sora', 0x01D11121, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 0, 0),
				null,
				null,
				null),
			new BonusFight('Thresholder',
			new BonusReward('Sora',0x01D10751, new Reward('Upper Slash',0x0089), new Reward('EMPTY',0x0000),0,0,0,0,0,0),
				null,
				null,
				null),
			new BonusFight('The Beast',
			new BonusReward('Sora',0x01D10941, new Reward('EMPTY',0x0000), new Reward('EMPTY',0x0000),0,0,1,0,0,0),
				null,
				null,
				null),
			new BonusFight('Dark Thorn',
			new BonusReward('Sora',0x01D10781, new Reward('Retaliating Slash',0x0111), new Reward('EMPTY',0x0000),5,0,0,0,0,0),
				null,
				null,
				null),
			new BonusFight('Xaldin',
				null,
				null,
				null,
				null),
			new BonusFight('Transport to Remembrance Nobodies III',
				null,
				null,
				null,
				null),
			new BonusFight('Escort Queen Minnie',
				null,
				null,
				null,
				null),
			new BonusFight('Marluxia (Absent Silhouette)',
				null,
				null,
				null,
				null),
			new BonusFight('Lingering Will',
				null,
				null,
				null,
				null),
			new BonusFight('Prison Keeper',
				null,
				null,
				null,
				null),
			new BonusFight('Oogie Boogie',
				null,
				null,
				null,
				null),
			new BonusFight('Lock/Shock/Barrel',
				null,
				null,
				null,
				null),
			new BonusFight('The Experiment',
				null,
				null,
				null,
				null),
			new BonusFight('Vexen (Absent Silhouette)',
				null,
				null,
				null,
				null),
			new BonusFight('Bailey Nobodies',
				null,
				null,
				null,
				null),
			new BonusFight('Demyx (Hollow Bastion)',
				null,
				null,
				null,
				null),
			new BonusFight('1,000 Heartless',
				null,
				null,
				null,
				null),
			new BonusFight('Sephiroth',
				null,
				null,
				null,
				null),
			new BonusFight('Village Cave Heartless',
				null,
				null,
				null,
				null),
			new BonusFight('Shan-Yu',
				null,
				null,
				null,
				null),
			new BonusFight('Storm Rider',
				null,
				null,
				null,
				null),
			new BonusFight('Cerberus',
				null,
				null,
				null,
				null),
			new BonusFight('Phil\'s Training(Story)',
				null,
				null,
				null,
				null),
			new BonusFight('Demyx (Olympus Coliseum)',
				null,
				null,
				null,
				null),
			new BonusFight('Pete (Olympus Coliseum)',
				null,
				null,
				null,
				null),
			new BonusFight('The Hydra',
				null,
				null,
				null,
				null),
			new BonusFight('Hades',
				null,
				null,
				null,
				null),
			new BonusFight('Zexion (Absent Silhouette)',
				null,
				null,
				null,
				null),
			new BonusFight('The Interceptor Pirates',
				null,
				null,
				null,
				null),
			new BonusFight('The Interceptor Barrels',
				null,
				null,
				null,
				null),
			new BonusFight('Captain Barbossa',
				null,
				null,
				null,
				null),
			new BonusFight('Grim Reaper I',
				null,
				null,
				null,
				null),
			new BonusFight('Grim Reaper II',
				null,
				null,
				null,
				null),
			new BonusFight('Hyenas I',
				null,
				null,
				null,
				null),
			new BonusFight('Scar',
				null,
				null,
				null,
				null),
			new BonusFight('Hyenas II',
				null,
				null,
				null,
				null),
			new BonusFight('Groundshaker',
				null,
				null,
				null,
				null),
			new BonusFight('Station of Serenity Nobodies',
				null,
				null,
				null,
				null),
			new BonusFight('Twilight Thorn',
				null,
				null,
				null,
				null),
			new BonusFight('Axel I',
				null,
				null,
				null,
				null),
			new BonusFight('Axel II',
				null,
				null,
				null,
				null),
			new BonusFight('Dataspace Computers',
				null,
				null,
				null,
				null),
			new BonusFight('Hostile Program',
				null,
				null,
				null,
				null),
			new BonusFight('Solar Sailor Heartless',
				null,
				null,
				null,
				null),
			new BonusFight('MCP',
				null,
				null,
				null,
				null),
			new BonusFight('Larxene (Absent Silhouette)',
				null,
				null,
				null,
				null),
			new BonusFight('Pete (Steamboat Fight)',
				null,
				null,
				null,
				null),
			new BonusFight('Pete (Timeless River)',
				null,
				null,
				null,
				null),
			new BonusFight('The Old Mansion Nobodies',
				null,
				null,
				null,
				null),
			new BonusFight('Betwixt & Between Nobodies',
				null,
				null,
				null,
				null),
			new BonusFight('Roxas',
				null,
				null,
				null,
				null),
			new BonusFight('Xigbar',
				null,
				null,
				null,
				null),
			new BonusFight('Luxord',
				null,
				null,
				null,
				null),
			new BonusFight('Saix',
				null,
				null,
				null,
				null),
			new BonusFight('Xemnas',
				null,
				null,
				null,
				null),
			new BonusFight('Final Xemnas',
				null,
				null,
				null,
				null)
		]
	}
]