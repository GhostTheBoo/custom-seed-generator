import { Reward } from './rewardsData'
import { charactersData } from './typesData'

export class BonusReward {
	constructor(address, character, reward1, reward2, hp, mp, armor, accessory, item, drive) {
		this.baseAddress = address
		// this.statAddress = this.characterAddress + 0x10000001
		// this.slotAddress = this.statAddress + 0x10000002
		// this.rewardAddress = this.slotAddress + 4
		this.vanillaCharacter = character
		this.replacementCharacter = character
		this.vanillaReward1 = { ...reward1 }
		this.replacementReward1 = { ...reward1 }
		this.vanillaReward2 = { ...reward2 }
		this.replacementReward2 = { ...reward2 }
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

		this.isCharacterReplaced = () => {
			return this.replacementCharacter !== this.vanillaCharacter
		}
		this.isStatsReplaced = () => {
			return this.hpIncrease !== this.vanillaHpIncrease || this.mpIncrease !== this.vanillaMpIncrease
		}
		this.isSlotsReplaced = () => {
			return this.armorSlotIncrease !== this.vanillaArmorSlotIncrease || this.accessorySlotIncrease !== this.vanillaAccessorySlotIncrease ||
				this.itemSlotIncrease !== this.vanillaItemSlotIncrease || this.driveGaugeIncrease !== this.vanillaDriveGaugeIncrease
		}
		this.isRewardsReplaced = () => {
			return this.replacementReward1.index !== this.vanillaReward1.index || this.replacementReward2.index !== this.vanillaReward2.index
		}
		this.copy = () => {
			// let ret = new BonusReward(this.baseAddress, this.vanillaCharacter, new Reward(this.vanillaReward1.reward, this.vanillaReward1.index, this.vanillaReward1.iconType),
			// new Reward(this.vanillaReward2.reward, this.vanillaReward2.index, this.vanillaReward2.iconType), this.vanillaHpIncrease, this.vanillaMpIncrease,
			// this.vanillaArmorSlotIncrease, this.vanillaAccessorySlotIncrease, this.vanillaItemSlotIncrease, this.vanillaDriveGaugeIncrease)

			let ret = this.vanilla()

			ret.replacementCharacter = this.replacementCharacter
			ret.replacementReward1 = { ...this.replacementReward1 }
			ret.replacementReward2 = { ...this.replacementReward2 }
			ret.hpIncrease = this.hpIncrease
			ret.mpIncrease = this.mpIncrease
			ret.armorSlotIncrease = this.armorSlotIncrease
			ret.accessorySlotIncrease = this.accessorySlotIncrease
			ret.itemSlotIncrease = this.itemSlotIncrease
			ret.driveGaugeIncrease = this.driveGaugeIncrease
			ret.statChangeCount = ret.getStatCount()
			ret.slotChangeCount = ret.getSlotCount()
			ret.rewardChangeCount = ret.getRewardCount()
			ret.toBeReplaced = this.toBeReplaced

			return ret
		}
		this.vanilla = () => {
			return new BonusReward(this.baseAddress, this.vanillaCharacter, new Reward(this.vanillaReward1.reward, this.vanillaReward1.index, this.vanillaReward1.iconType),
				new Reward(this.vanillaReward2.reward, this.vanillaReward2.index, this.vanillaReward2.iconType), this.vanillaHpIncrease, this.vanillaMpIncrease,
				this.vanillaArmorSlotIncrease, this.vanillaAccessorySlotIncrease, this.vanillaItemSlotIncrease, this.vanillaDriveGaugeIncrease)
		}
		this.replace = (newBonusData) => {
			let ret = this.copy()

			ret.replacementCharacter = newBonusData.currentCharacter === 0
				? ret.vanillaCharacter
				: newBonusData.currentCharacter
			ret.replacementReward1 = { ...newBonusData.rewardA }
			ret.replacementReward2 = { ...newBonusData.rewardB }
			ret.hpIncrease = newBonusData.currentBonusHP
			ret.mpIncrease = newBonusData.currentBonusMP
			ret.armorSlotIncrease = newBonusData.currentArmor
			ret.accessorySlotIncrease = newBonusData.currentAccessory
			ret.itemSlotIncrease = newBonusData.currentItem
			ret.driveGaugeIncrease = newBonusData.currentDrive
			ret.statChangeCount = ret.getStatCount()
			ret.slotChangeCount = ret.getSlotCount()
			ret.rewardChangeCount = ret.getRewardCount()
			ret.toBeReplaced = false

			return ret
		}
		this.markForReplacement = (toBeReplaced) => {
			let ret = this.copy()
			ret.toBeReplaced = toBeReplaced
			return ret
		}
		this.saveToJSON = () => {
			return JSON.stringify(this, ['characterAddress', 'replacementCharacter', 'replacementReward1', 'replacementReward2', 'reward', 'index', 'iconType',
				'hpIncrease', 'mpIncrease', 'armorSlotIncrease', 'accessorySlotIncrease', 'itemSlotIncrease', 'driveGaugeIncrease'])
		}
		this.loadFromJSON = (bonusRewardJSON) => {
			let ret = this.copy()

			ret.replacementCharacter = bonusRewardJSON.replacementCharacter
			ret.replacementReward1 = { ...bonusRewardJSON.replacementReward1 }
			ret.replacementReward2 = { ...bonusRewardJSON.replacementReward2 }
			ret.hpIncrease = bonusRewardJSON.hpIncrease
			ret.mpIncrease = bonusRewardJSON.mpIncrease
			ret.armorSlotIncrease = bonusRewardJSON.armorSlotIncrease
			ret.accessorySlotIncrease = bonusRewardJSON.accessorySlotIncrease
			ret.itemSlotIncrease = bonusRewardJSON.itemSlotIncrease
			ret.driveGaugeIncrease = bonusRewardJSON.driveGaugeIncrease
			ret.statChangeCount = ret.getStatCount()
			ret.slotChangeCount = ret.getSlotCount()
			ret.rewardChangeCount = ret.getRewardCount()
			ret.toBeReplaced = false

			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ''
			let characterAddress = this.baseAddress
			let statAddress = this.baseAddress + 1
			let slotAddress = this.baseAddress + 3
			let rewardAddress = this.baseAddress + 7
			if (this.isCharacterReplaced()) {
				ret += 'patch=1,EE,0' + characterAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,' + this.replacementCharacter.toString(16).toUpperCase().padStart(8, '0')
				if (isCommented) ret += ' // Bonus reward is now given to ' + charactersData[this.replacementCharacter]
				ret += '\n'
			}
			if (this.isStatsReplaced()) {
				ret += 'patch=1,EE,1' + statAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
				ret += ((this.mpIncrease << 8) + (this.hpIncrease)).toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // MP:' + this.mpIncrease + ' HP:' + this.hpIncrease
				ret += '\n'
			}
			if (this.isSlotsReplaced()) {
				let increases = (this.armorSlotIncrease << 24) + (this.accessorySlotIncrease << 16) + (this.itemSlotIncrease << 8) + this.driveGaugeIncrease
				ret += 'patch=1,EE,2' + slotAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,' + increases.toString(16).toUpperCase().padStart(8, '0')
				if (isCommented) {
					ret += ' // Armor Slot:+' + this.armorSlotIncrease + ' Accessory Slot:+' + this.accessorySlotIncrease
					ret += ' Item Slot:+' + this.itemSlotIncrease + ' Drive Gauge:+' + this.driveGaugeIncrease
				}
				ret += '\n'
			}
			if (this.isRewardsReplaced()) {
				ret += 'patch=1,EE,2' + rewardAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,'
				ret += ((this.replacementReward2.index << 16) + this.replacementReward1.index).toString(16).toUpperCase().padStart(8, '0')
				if (isCommented) ret += ' // Replacement Reward #2:' + this.replacementReward2.reward + ', Replacement Reward #1:' + this.replacementReward1.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ''
			let newBase = this.baseAddress - 0x1CE5D80
			let characterAddress = newBase
			let statAddress = newBase + 1
			let slotAddress = newBase + 3
			let rewardAddress = newBase + 7
			if (this.isCharacterReplaced()) {
				ret += '\tWriteByte(Btl0+0x' + characterAddress.toString(16).toUpperCase() + ',0x0' + this.replacementCharacter.toString(16).toUpperCase() + ')'
				if (isCommented) ret += ' -- Bonus reward is now given to ' + charactersData[this.replacementCharacter]
				ret += '\n'
			}
			if (this.isStatsReplaced()) {
				ret += '\tWriteShort(Btl0+0x' + statAddress.toString(16).toUpperCase() + ',0x'
				ret += ((this.mpIncrease << 8) + (this.hpIncrease)).toString(16).toUpperCase().padStart(4, '0') + ')'
				if (isCommented) ret += ' -- MP:' + this.mpIncrease + ' HP:' + this.hpIncrease
				ret += '\n'
			}
			if (this.isSlotsReplaced()) {
				let temp = ((this.armorSlotIncrease << 24) + (this.accessorySlotIncrease << 16) + (this.itemSlotIncrease << 8) + this.driveGaugeIncrease).toString(16).toUpperCase()
				ret += '\tWriteInt(Btl0+0x' + slotAddress.toString(16).toUpperCase() + ',0x' + temp.padStart(8, '0') + ')'
				if (isCommented) {
					ret += ' -- Armor Slot:+' + this.armorSlotIncrease + ' Accessory Slot:+' + this.accessorySlotIncrease
					ret += ' Item Slot:+' + this.itemSlotIncrease + ' Drive Gauge:+' + this.driveGaugeIncrease
				}
				ret += '\n'
			}
			if (this.isRewardsReplaced()) {
				ret += '\tWriteInt(Btl0+0x' + rewardAddress.toString(16).toUpperCase() + ',0x'
				ret += ((this.replacementReward2.index << 16) + this.replacementReward1.index).toString(16).toUpperCase().padStart(8, '0') + ')'
				if (isCommented) ret += ' -- Replacement Reward #2:' + this.replacementReward2.reward + ', Replacement Reward #1:' + this.replacementReward1.reward
				ret += '\n'
			}
			return ret
		}
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
		this.slots = [{ ...slot1 }, { ...slot2 }, { ...slot3 }, { ...slot4 }]

		this.isReplaced = () => {
			let ret = false
			this.slots.filter(slot => Object.keys(slot).length !== 0).forEach(slot => {
				ret = (ret || slot.isStatsReplaced() || slot.isSlotsReplaced() || slot.isRewardsReplaced() || slot.isCharacterReplaced())
			})
			return ret
		}
		this.vanilla = () => {
			let newSlots = this.slots.filter(slot => Object.keys(slot).length !== 0).map(slot => {
				return slot.toBeReplaced ? slot.vanilla() : slot.markForReplacement(false)
			})
			return new BonusFight(this.fight, newSlots[0], newSlots[1], newSlots[2], newSlots[3])
		}
		this.replace = (newBonusData) => {
			let newSlots = this.slots.filter(slot => Object.keys(slot).length !== 0).map(slot => {
				return slot.toBeReplaced ? slot.replace(newBonusData) : slot.markForReplacement(false)
			})
			return new BonusFight(this.fight, newSlots[0], newSlots[1], newSlots[2], newSlots[3])
		}
		this.markForReplacement = (toBeReplaced, index) => {
			let newSlots = this.slots.filter(slot => Object.keys(slot).length !== 0).map((slot, slotID) => {
				return (index === -1 || index === slotID) ? slot.markForReplacement(toBeReplaced) : slot
			})
			return new BonusFight(this.fight, newSlots[0], newSlots[1], newSlots[2], newSlots[3])
		}
		this.saveToJSON = () => {
			if (this.isReplaced()) {
				let slotCount = 0
				let ret = '{"fight":"' + this.fight + '","slots":['
				this.slots.filter(slot => Object.keys(slot).length !== 0).forEach(slot => {
					ret += slot.saveToJSON() + ','
					slotCount++
				})
				while (slotCount !== 4) {
					ret += '{},'
					slotCount++
				}
				return ret.slice(0, -1) + ']},'
			}
			else
				return ''
		}
		this.loadFromJSON = (bonusFightJSON) => {
			let newSlots = this.slots.filter(slot => Object.keys(slot).length !== 0).map((slot, slotID) => {
				return slot.loadFromJSON(bonusFightJSON.slots[slotID])
			})
			return new BonusFight(bonusFightJSON.fight, newSlots[0], newSlots[1], newSlots[2], newSlots[3])
		}
		this.saveToPnach = (isCommented) => {
			if (this.isReplaced()) {
				let ret = isCommented ? '\n//' + this.fight + '\n' : '\n'
				this.slots.filter(slot => Object.keys(slot).length !== 0).forEach((slot, slotID) => {
					if (isCommented) ret += '// Bonus Slot #' + (slotID + 1) + '\n'
					ret += slot.saveToPnach(isCommented)
				})
				return ret
			}
			return ''
		}
		this.saveToLua = (isCommented) => {
			if (this.isReplaced()) {
				let ret = isCommented ? '\t--' + this.fight + '\n' : '\n'
				this.slots.filter(slot => Object.keys(slot).length !== 0).forEach((slot, slotID) => {
					if (isCommented) ret += '\t-- Bonus Slot #' + (slotID + 1) + '\n'
					ret += slot.saveToLua(isCommented)
				})
				return ret
			}
			return ''
		}
	}
}

export const bonusData = [
	{
		world: 'Agrabah',
		bonusFights: [
			new BonusFight('Escort Abu',
				new BonusReward(0x1D10DB1, 1, new Reward('Summon Boost', 0x18F, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10DC1, 2, new Reward('Donald Blizzard', 0x0A6, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10DD1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10DE1, 7, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Treasure Room Heartless',
				new BonusReward(0x1D10E51, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10E61, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10E71, 3, new Reward('Auto Healing', 0x1A4, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10E81, 7, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Volcanic Lord & Blizzard Lord',
				new BonusReward(0x1D10CE1, 1, new Reward('Finishing Leap', 0x10B, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10CF1, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10D01, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 1, 0, 0, 0),
				new BonusReward(0x1D10D11, 7, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Genie Jafar',
				new BonusReward(0x1D10971, 1, new Reward('Fire', 0x015, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Lexaeus (Absent Silhouette)',
				new BonusReward(0x1D11121, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 1, 0, 0),
				new BonusReward(0x1D11131, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11141, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				null)
		]
	}, {
		world: 'Atlantica',
		bonusFights: []
	}, {
		world: 'Beast\'s Castle',
		bonusFights: [
			new BonusFight('Thresholder',
				new BonusReward(0x1D10751, 1, new Reward('Upper Slash', 0x089, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10761, 2, new Reward('Donald Fire', 0x0A5, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10771, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('The Beast',
				new BonusReward(0x1D10941, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 1, 0, 0, 0),
				new BonusReward(0x1D10951, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10961, 3, new Reward('Defender', 0x19E, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Dark Thorn',
				new BonusReward(0x1D10781, 1, new Reward('Retaliating Slash', 0x111, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10791, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D107A1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x1D107B1, 9, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 35, 0, 0, 0, 0, 0)),
			new BonusFight('Xaldin',
				new BonusReward(0x1D107C1, 1, new Reward('Reflect', 0x058, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D107D1, 2, new Reward('Auto Healing', 0x1A4, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D107E1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D107F1, 9, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 25, 0, 0, 0, 0, 0))
		]
	}, {
		world: 'Cavern of Remembrance',
		bonusFights: [
			new BonusFight('Transport to Remembrance Nobodies III',
				new BonusReward(0x1D11241, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x1D11251, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11261, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Disney Castle',
		bonusFights: [
			new BonusFight('Escort Queen Minnie',
				new BonusReward(0x1D10D21, 1, new Reward('Auto Summon', 0x185, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 1, 0, 0),
				null,
				null,
				null),
			new BonusFight('Marluxia (Absent Silhouette)',
				new BonusReward(0x1D11181, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				new BonusReward(0x1D11191, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x1D111A1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Lingering Will',
				new BonusReward(0x1D111F1, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				new BonusReward(0x1D11201, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11211, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Halloween Town',
		bonusFights: [
			new BonusFight('Prison Keeper',
				new BonusReward(0x1D109E1, 1, new Reward('Flash Step', 0x22F, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D109F1, 2, new Reward('Hyper Healing', 0x1A3, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10A01, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10A11, 10, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Oogie Boogie',
				new BonusReward(0x1D10A21, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x1D10A31, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10A41, 3, new Reward('Once More', 0x1A0, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10A51, 10, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Lock/Shock/Barrel',
				new BonusReward(0x1D10D71, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x1D10D81, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10D91, 3, new Reward('Auto Change', 0x1A2, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10DA1, 10, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0)),
			new BonusFight('The Experiment',
				new BonusReward(0x1D10A61, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10A71, 2, new Reward('Jackpot', 0x196, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10A81, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10A91, 10, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 10, 0, 0, 0, 0, 0)),
			new BonusFight('Vexen (Absent Silhouette)',
				new BonusReward(0x1D110F1, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 1, 0, 0, 0),
				new BonusReward(0x1D11101, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11111, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Hollow Bastion',
		bonusFights: [
			new BonusFight('Bailey Nobodies',
				new BonusReward(0x1D10E91, 1, new Reward('Fire', 0x015, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Demyx (Hollow Bastion)',
				new BonusReward(0x1D10BA1, 1, new Reward('Blizzard', 0x016, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 1, 0, 0, 0),
				new BonusReward(0x1D10BB1, 2, new Reward('Blizzard Boost', 0x199, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10BC1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('1,000 Heartless',
				new BonusReward(0x1D11061, 1, new Reward('Guard Break', 0x109, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Sephiroth',
				new BonusReward(0x1D10CD1, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				null,
				null,
				null)
		]
	}, {
		world: 'Land of Dragons',
		bonusFights: [
			new BonusFight('Village Cave Heartless',
				new BonusReward(0x1D10DF1, 1, new Reward('Slide Dash', 0x108, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10E01, 6, new Reward('Hyper Healing', 0x1A3, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 15, 0, 0, 0, 0, 0),
				null,
				null),
			new BonusFight('Shan-Yu',
				new BonusReward(0x1D108C1, 1, new Reward('Aerial Sweep', 0x10D, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D108D1, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D108E1, 3, new Reward('Goofy Turbo', 0x1A9, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D108F1, 6, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 20, 0, 0, 0, 0, 0)),
			new BonusFight('Storm Rider',
				new BonusReward(0x1D10901, 1, new Reward('Thunder', 0x017, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10911, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10921, 3, new Reward('Tornado Fusion (Whirli-Goof)', 0x0C9, 'Limit'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10931, 6, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 25, 0, 0, 0, 0, 0))
		]
	}, {
		world: 'Olympus Coliseum',
		bonusFights: [
			new BonusFight('Cerberus',
				new BonusReward(0x1D10801, 1, new Reward('Counterguard', 0x10C, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10811, 5, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 40, 0, 0, 0, 0, 0),
				null,
				null),
			new BonusFight('Phil\'s Training(Story)',
				new BonusReward(0x1D10FE1, 1, new Reward('Aerial Dive', 0x230, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Demyx (Olympus Coliseum)',
				new BonusReward(0x1D10FF1, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11001, 2, new Reward('MP Rage', 0x19C, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11011, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Pete (Olympus Coliseum)',
				new BonusReward(0x1D10821, 1, new Reward('Trinity Limit', 0x0C6, 'Limit'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10831, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10841, 3, new Reward('Hyper Healing', 0x1A3, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('The Hydra',
				new BonusReward(0x1D10851, 1, new Reward('Thunder', 0x017, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10861, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 1, 0, 0, 0),
				new BonusReward(0x1D10871, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Hades',
				new BonusReward(0x1D10881, 1, new Reward('Magnet Burst', 0x231, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10891, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 1, 0, 0),
				new BonusReward(0x1D108A1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D108B1, 5, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Zexion (Absent Silhouette)',
				new BonusReward(0x1D11151, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x1D11161, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 3, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11171, 3, new Reward('Damage Control', 0x21E, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
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
				new BonusReward(0x1D110B1, 1, new Reward('Aerial Spiral', 0x10E, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D110C1, 2, new Reward('Draw', 0x195, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D110D1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('The Interceptor Barrels',
				new BonusReward(0x1D10D31, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x1D10D41, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10D51, 3, new Reward('Second Chance', 0x19F, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10D61, 8, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 10, 0, 0, 0, 0, 0)),
			new BonusFight('Captain Barbossa',
				new BonusReward(0x1D10AA1, 1, new Reward('Aerial Finish', 0x110, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				new BonusReward(0x1D10AB1, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10AC1, 3, new Reward('Teamwork (Knocksmash)', 0x0CA, 'Limit'), new Reward('Auto Limit', 0x1A1, 'Ability'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10AD1, 8, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Grim Reaper I',
				new BonusReward(0x1D11021, 1, new Reward('Horizontal Slash', 0x10F, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11031, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11041, 3, new Reward('Draw', 0x195, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11051, 8, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 10, 0, 0, 0, 0, 0)),
			new BonusFight('Grim Reaper II',
				new BonusReward(0x1D10AE1, 1, new Reward('Magnet', 0x057, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10AF1, 2, new Reward('Flare Force (Duck Flare)', 0x0C8, 'Limit'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10B01, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10B11, 8, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 15, 0, 0, 0, 0, 0))
		]
	}, {
		world: 'Pride Lands',
		bonusFights: [
			new BonusFight('Hyenas I',
				new BonusReward(0x1D10EA1, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10EB1, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10EC1, 3, new Reward('Lucky Lucky', 0x197, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Scar',
				new BonusReward(0x1D10BD1, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 10, 0, 0, 0, 0),
				new BonusReward(0x1D10BE1, 2, new Reward('Fire Boost', 0x198, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10BF1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10C01, 11, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 30, 0, 0, 0, 0, 0)),
			new BonusFight('Hyenas II',
				new BonusReward(0x1D10ED1, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 1, 0, 0),
				new BonusReward(0x1D10EE1, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10EF1, 3, new Reward('MP Rage', 0x19C, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10D01, 11, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0)),
			new BonusFight('Groundshaker',
				new BonusReward(0x1D10C11, 1, new Reward('Thunder', 0x017, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10C21, 11, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null,
				null)
		]
	}, {
		world: 'Simulated Twilight Town',
		bonusFights: [
			new BonusFight('Station of Serenity Nobodies',
				new BonusReward(0x1D10FA1, 1, new Reward('Aerial Recovery', 0x09E, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Twilight Thorn',
				new BonusReward(0x1D10CB1, 1, new Reward('Guard', 0x052, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Axel I',
				new BonusReward(0x1D11271, 1, new Reward('Scan', 0x08A, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Axel II',
				new BonusReward(0x1D10CC1, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null)
		]
	}, {
		world: 'Space Paranoids',
		bonusFights: [
			new BonusFight('Dataspace Computers',
				new BonusReward(0x1D10E11, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10E21, 2, new Reward('Thunder Boost', 0x19A, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10E31, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10E41, 12, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 10, 0, 0, 0, 0, 0)),
			new BonusFight('Hostile Program',
				new BonusReward(0x1D10C31, 1, new Reward('Vicinity Break', 0x232, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				new BonusReward(0x1D10C41, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10C51, 3, new Reward('Jackpot', 0x196, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10C61, 12, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 15, 0, 0, 0, 0, 0)),
			new BonusFight('Solar Sailor Heartless',
				new BonusReward(0x1D11071, 1, new Reward('Explosion', 0x10A, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11081, 2, new Reward('MP Hastera', 0x1A5, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D11091, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D110A1, 12, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0)),
			new BonusFight('MCP',
				new BonusReward(0x1D10C71, 1, new Reward('Reflect', 0x058, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10C81, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10C91, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 1, 0, 0),
				new BonusReward(0x1D10CA1, 12, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0)),
			new BonusFight('Larxene (Absent Silhouette)',
				new BonusReward(0x1D111B1, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 10, 0, 0, 0, 0),
				new BonusReward(0x1D111C1, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x1D111D1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Timeless River',
		bonusFights: [
			new BonusFight('Pete (Steamboat Fight)',
				new BonusReward(0x1D10981, 1, new Reward('Dodge Slash', 0x107, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10991, 2, new Reward('Fantasia (Comet)', 0x0C7, 'Limit'), new Reward('Auto Limit', 0x1A1, 'Ability'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D109A1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Pete (Timeless River)',
				new BonusReward(0x1D109B1, 1, new Reward('Reflect', 0x058, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D109C1, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D109D1, 3, new Reward('Goofy Tornado', 0x1A9, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null)
		]
	}, {
		world: 'Twilight Town',
		bonusFights: [
			new BonusFight('The Old Mansion Nobodies',
				new BonusReward(0x1D10FB1, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10FC1, 2, new Reward('Lucky Lucky', 0x197, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10FD1, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Betwixt & Between Nobodies',
				new BonusReward(0x1D110E1, 1, new Reward('Slapshot', 0x106, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 0),
				null,
				null,
				null)
		]
	}, {
		world: 'The World That Never Was',
		bonusFights: [
			new BonusFight('Roxas',
				new BonusReward(0x1D111E1, 1, new Reward('Combo Master', 0x21B, 'Ability'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Xigbar',
				new BonusReward(0x1D10B21, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 10, 0, 0, 0, 0),
				new BonusReward(0x1D10B31, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				new BonusReward(0x1D10B41, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null),
			new BonusFight('Luxord',
				new BonusReward(0x1D10B51, 1, new Reward('Magnet', 0x057, 'Spell'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Saix',
				new BonusReward(0x1D10B61, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10B71, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 0),
				new BonusReward(0x1D10B81, 3, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 1, 0),
				null),
			new BonusFight('Xemnas',
				new BonusReward(0x1D10B91, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 5, 10, 0, 0, 0, 0),
				null,
				null,
				null),
			new BonusFight('Final Xemnas',
				new BonusReward(0x1D11221, 1, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 0, 0, 0, 0, 0, 1),
				new BonusReward(0x1D11231, 13, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), 25, 0, 0, 0, 0, 0),
				null,
				null)
		]
	}
]