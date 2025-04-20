import { Reward } from './rewardsData'

export class BonusReward {
	constructor(address, character, rewardA, rewardB, hp, mp, armor, accessory, item, drive) {
		this.baseAddress = address
		this.vanillaCharacter = character
		this.vanillaCharacterString = this.getCharacter(this.vanillaCharacter)
		this.replacementCharacter = character
		this.replacementCharacterString = this.getCharacter(this.replacementCharacter)
		this.vanillaRewardA = { ...rewardA }
		this.replacementRewardA = { ...rewardA }
		this.vanillaRewardB = { ...rewardB }
		this.replacementRewardB = { ...rewardB }
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
			return this.replacementRewardA.index !== this.vanillaRewardA.index || this.replacementRewardB.index !== this.vanillaRewardB.index
		}
		this.isReplaced = () => {
			return this.isCharacterReplaced() || this.isStatsReplaced() || this.isSlotsReplaced() || this.isRewardsReplaced()
		}
		this.getTotalLineCount = () => {
			let ret = 0
			ret += this.hpIncrease > 0 ? 1 : 0
			ret += this.mpIncrease > 0 ? 1 : 0
			ret += this.armorSlotIncrease > 0 ? 1 : 0
			ret += this.accessorySlotIncrease > 0 ? 1 : 0
			ret += this.itemSlotIncrease > 0 ? 1 : 0
			ret += this.driveGaugeIncrease > 0 ? 1 : 0
			ret += this.replacementRewardA.index !== 0 ? 1 : 0
			ret += this.replacementRewardB.index !== 0 ? 1 : 0
			return ret
		}
		this.copy = () => {
			let ret = this.vanilla()

			ret.replacementCharacter = this.replacementCharacter
			ret.replacementRewardA = { ...this.replacementRewardA }
			ret.replacementRewardB = { ...this.replacementRewardB }
			ret.hpIncrease = this.hpIncrease
			ret.mpIncrease = this.mpIncrease
			ret.armorSlotIncrease = this.armorSlotIncrease
			ret.accessorySlotIncrease = this.accessorySlotIncrease
			ret.itemSlotIncrease = this.itemSlotIncrease
			ret.driveGaugeIncrease = this.driveGaugeIncrease
			ret.replacementCharacterString = ret.getCharacter(ret.replacementCharacter)
			// ret.statChangeCount = ret.getStatCount()
			// ret.slotChangeCount = ret.getSlotCount()
			// ret.rewardChangeCount = ret.getRewardCount()
			ret.toBeReplaced = this.toBeReplaced

			return ret
		}
		this.vanilla = () => {
			return new BonusReward(this.baseAddress, this.vanillaCharacter, new Reward(this.vanillaRewardA.reward, this.vanillaRewardA.index, this.vanillaRewardA.iconType),
				new Reward(this.vanillaRewardB.reward, this.vanillaRewardB.index, this.vanillaRewardB.iconType), this.vanillaHpIncrease, this.vanillaMpIncrease,
				this.vanillaArmorSlotIncrease, this.vanillaAccessorySlotIncrease, this.vanillaItemSlotIncrease, this.vanillaDriveGaugeIncrease)
		}
		this.replace = (newBonusData) => {
			let ret = this.copy()

			ret.replacementCharacter = newBonusData.currentCharacter === 0
				? ret.vanillaCharacter
				: newBonusData.currentCharacter
			ret.replacementRewardA = { ...newBonusData.rewardA }
			ret.replacementRewardB = { ...newBonusData.rewardB }
			ret.hpIncrease = newBonusData.currentBonusHP
			ret.mpIncrease = newBonusData.currentBonusMP
			ret.armorSlotIncrease = newBonusData.currentArmor
			ret.accessorySlotIncrease = newBonusData.currentAccessory
			ret.itemSlotIncrease = newBonusData.currentItem
			ret.driveGaugeIncrease = newBonusData.currentDrive
			ret.replacementCharacterString = ret.getCharacter(ret.replacementCharacter)
			// ret.statChangeCount = ret.getStatCount()
			// ret.slotChangeCount = ret.getSlotCount()
			// ret.rewardChangeCount = ret.getRewardCount()
			ret.toBeReplaced = false
			return ret
		}
		this.saveToJSON = () => {
			return JSON.stringify(this, ['characterAddress', 'replacementCharacter', 'replacementRewardA', 'replacementRewardB', 'reward', 'index', 'iconType',
				'hpIncrease', 'mpIncrease', 'armorSlotIncrease', 'accessorySlotIncrease', 'itemSlotIncrease', 'driveGaugeIncrease'])
		}
		this.loadFromJSON = (bonusRewardJSON) => {
			let ret = this.copy()

			//remove replacementReward1 and replacementReward2
			ret.replacementCharacter = bonusRewardJSON.replacementCharacter
			if (bonusRewardJSON.hasOwnProperty('replacementRewardA'))
				ret.replacementRewardA = { ...bonusRewardJSON.replacementRewardA }
			else if (bonusRewardJSON.hasOwnProperty('replacementReward1'))
				ret.replacementRewardA = { ...bonusRewardJSON.replacementReward1 }
			if (bonusRewardJSON.hasOwnProperty('replacementRewardB'))
				ret.replacementRewardB = { ...bonusRewardJSON.replacementRewardB }
			else if (bonusRewardJSON.hasOwnProperty('replacementReward2'))
				ret.replacementRewardB = { ...bonusRewardJSON.replacementReward2 }
			ret.hpIncrease = bonusRewardJSON.hpIncrease
			ret.mpIncrease = bonusRewardJSON.mpIncrease
			ret.armorSlotIncrease = bonusRewardJSON.armorSlotIncrease
			ret.accessorySlotIncrease = bonusRewardJSON.accessorySlotIncrease
			ret.itemSlotIncrease = bonusRewardJSON.itemSlotIncrease
			ret.driveGaugeIncrease = bonusRewardJSON.driveGaugeIncrease

			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ''
			let characterAddress = this.baseAddress
			let statAddress = this.baseAddress + 1
			let slotAddress = this.baseAddress + 3
			let rewardAddress = this.slotAddress + 7
			if (this.isCharacterReplaced()) {
				ret += 'patch=1,EE,0' + characterAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,' + this.replacementCharacter.toString(16).toUpperCase().padStart(8, '0')
				if (isCommented) ret += ' // Bonus reward is now given to ' + this.getCharacter(this.replacementCharacter)
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
				ret += ((this.replacementRewardB.index << 16) + this.replacementRewardA.index).toString(16).toUpperCase().padStart(8, '0')
				if (isCommented) ret += ' // Replacement Reward #2:' + this.replacementRewardB.reward + ', Replacement Reward #1:' + this.replacementRewardA.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ''
			let base = this.baseAddress
			let characterAddress = "0x" + base.toString(16).toUpperCase()
			let statAddress = "0x" + (base + 1).toString(16).toUpperCase()
			let slotAddress = "0x" + (base + 3).toString(16).toUpperCase()
			let rewardAddress = "0x" + (base + 7).toString(16).toUpperCase()

			if (this.isCharacterReplaced()) {
				ret += "\tWriteByte(BAR(Btl0, 0x6, " + characterAddress + "), 0x" + this.replacementCharacter.toString(16).toUpperCase().padStart(2, "0") + ", OnPC)"
				if (isCommented) ret += ' -- Bonus reward is now given to ' + this.getCharacter(this.replacementCharacter)
				ret += '\n'
			}
			if (this.isStatsReplaced()) {
				let stats = "0x" + ((this.mpIncrease << 8) + (this.hpIncrease)).toString(16).toUpperCase().padStart(4, '0')
				ret += "\tWriteShort(BAR(Btl0, 0x6, " + statAddress + "), " + stats + ", OnPC)"
				if (isCommented) ret += ' -- MP:' + this.mpIncrease + ' HP:' + this.hpIncrease
				ret += '\n'
			}
			if (this.isSlotsReplaced()) {
				let slots = ((this.armorSlotIncrease << 24) + (this.accessorySlotIncrease << 16) + (this.itemSlotIncrease << 8) + this.driveGaugeIncrease).toString(16).toUpperCase().padStart(8, "0")
				ret += "\tWriteInt(BAR(Btl0, 0x6, " + slotAddress + "), " + slots + ", OnPC)"
				if (isCommented) {
					ret += ' -- Armor Slot:+' + this.armorSlotIncrease + ' Accessory Slot:+' + this.accessorySlotIncrease
					ret += ' Item Slot:+' + this.itemSlotIncrease + ' Drive Gauge:+' + this.driveGaugeIncrease
				}
				ret += '\n'
			}
			if (this.isRewardsReplaced()) {
				let rewards = ((this.replacementRewardB.index << 16) + this.replacementRewardA.index).toString(16).toUpperCase().padStart(8, '0') + ')'
				ret += "\tWriteInt(BAR(Btl0, 0x6, " + rewardAddress + "), " + rewards + ", OnPC)"
				if (isCommented) ret += ' -- Replacement Reward #2:' + this.replacementRewardB.reward + ', Replacement Reward #1:' + this.replacementRewardA.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToYml = (isCommented, zipID) => {
			let ret = ''
			if (this.isReplaced()) {
				ret += '  ' + this.replacementCharacterString + ':'
				ret += '\n    RewardId: ' + zipID
				ret += '\n    CharacterId: ' + this.replacementCharacter
				ret += '\n    BonusItem1: ' + this.replacementRewardA.index
				if (isCommented) ret += ' # ' + this.replacementRewardA.reward
				ret += '\n    BonusItem2: ' + this.replacementRewardB.index
				if (isCommented) ret += ' # ' + this.replacementRewardB.reward
				ret += '\n    HpIncrease: ' + this.hpIncrease
				ret += '\n    MpIncrease: ' + this.mpIncrease
				ret += '\n    ArmorSlotUpgrade: ' + this.armorSlotIncrease
				ret += '\n    AccessorySlotUpgrade: ' + this.accessorySlotIncrease
				ret += '\n    ItemSlotUpgrade: ' + this.itemSlotIncrease
				ret += '\n    DriveGaugeUpgrade: ' + this.driveGaugeIncrease
				ret += '\n    Padding: 0\n    ' // wtf is this?
				ret += '\n'
			}
			return ret
		}
	}

	getCharacter(characterID) {
		let characters = [
			'Sora',
			'Donald',
			'Goofy',
			'Mickey',
			'Auron',
			'Ping/Mulan',
			'Aladdin',
			'Jack Sparrow',
			'Beast',
			'Jack Skellington',
			'Simba',
			'Tron',
			'Riku',
			'Roxas'
		]
		return characters[characterID - 1]
	}
}

export class BonusFight {
	constructor(fight, zipID, fightName, slots) {
		this.fight = fight
		this.fightName = fightName
		this.slots = slots.map(slot => { return { ...slot } })
		this.zipID = zipID

		this.isReplaced = () => {
			let ret = false
			this.slots.forEach(slot => { ret = (ret || slot.isStatsReplaced() || slot.isSlotsReplaced() || slot.isRewardsReplaced() || slot.isCharacterReplaced()) })
			return ret
		}
		this.update = (newBonusReward, slotID) => {
			let newSlots = this.slots.map((slot, slotIndex) => { return slotID === slotIndex ? newBonusReward.copy() : slot })
			return new BonusFight(this.fight, this.zipID, this.fightName, newSlots)
		}
		this.saveToJSON = () => {
			if (this.isReplaced()) {
				let ret = '{"fight":"' + this.fight + '","zipID": ' + this.zipID + ',"slots":['
				this.slots.forEach(slot => { ret += slot.saveToJSON() + ',' })
				return ret.slice(0, -1) + ']},'
			}
			else
				return ''
		}
		this.loadFromJSON = (bonusFightJSON) => {
			let newSlots = this.slots.map((slot, slotID) => { return slot.loadFromJSON(bonusFightJSON.slots[slotID]) })
			return new BonusFight(bonusFightJSON.fight, this.zipID, bonusFightJSON.fight, newSlots)
		}
		this.saveToPnach = (isCommented) => {
			if (this.isReplaced()) {
				let ret = isCommented ? '\n//' + this.fight + '\n' : '\n'
				this.slots.forEach((slot, slotID) => {
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
				this.slots.forEach((slot, slotID) => {
					if (isCommented) ret += '\t-- Bonus Slot #' + (slotID + 1) + '\n'
					ret += slot.saveToLua(isCommented)
				})
				return ret
			}
			return ''
		}
		this.saveToYml = (isCommented) => {
			if (this.isReplaced()) {
				let ret = ''
				if (isCommented) ret += '#' + this.fight + '\n'
				ret += this.zipID + ':\n'
				this.slots.forEach(slot => {
					ret += slot.saveToYml(isCommented, this.zipID)
				})
				return ret
			}
			return ''
		}
	}


	static saveToPnach(bonusData, isCommented) {
		return ['\n//Bonus Rewards\n'].concat(bonusData.map(worldList => {
			let ret = isCommented ? '// ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.bonusFights.forEach(bonusFight => { ret += bonusFight.saveToPnach(isCommented) })
			return ret
		}))
	}
	static saveToLua(bonusData, isCommented) {
		return ['\nfunction BonusRewards()\n'].concat(bonusData.map(worldList => {
			let ret = isCommented ? '\t-- ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.bonusFights.forEach(bonusFight => { ret += bonusFight.saveToLua(isCommented) })
			return ret
		}), ['end\n'])
	}
	static saveToYml(bonusData, isCommented) {
		return bonusData.reduce((prev, worldList) => {
			worldList.bonusFights.forEach(bonusFight => { prev += bonusFight.saveToYml(isCommented) })
			return prev
		}, '')
	}
	static saveToJSON(bonusData) {
		let bonusSaveData = bonusData.map(world => {
			let ret = ''
			world.bonusFights.forEach(bonusFight => { ret += bonusFight.saveToJSON() })
			if (ret !== '')
				return '{"world":"' + world.world + '","bonusFights":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		return ['"bonusData":[', bonusSaveData.filter(s => s !== '').join(), '],']
	}
	static loadFromJSON(bonusLoadData) {
		// This needs to be cleaned up, my brain hurts looking at it
		let globalIndex = 0
		return bonusData.map(world => {
			if (globalIndex < bonusLoadData.length) {
				if (bonusLoadData[globalIndex].world === world.world) {
					let bonusIndex = 0
					let newBonuses = world.bonusFights.map(bonusFight => {
						if (bonusIndex < bonusLoadData[globalIndex].bonusFights.length) {
							if (bonusLoadData[globalIndex].bonusFights[bonusIndex].hasOwnProperty('zipID')) {
								if (bonusLoadData[globalIndex].bonusFights[bonusIndex].zipID === bonusFight.zipID) {
									let ret = bonusFight.loadFromJSON(bonusLoadData[globalIndex].bonusFights[bonusIndex])
									bonusIndex++
									return ret
								}
							} else if (bonusLoadData[globalIndex].bonusFights[bonusIndex].fight === bonusFight.fight) {
								let ret = bonusFight.loadFromJSON(bonusLoadData[globalIndex].bonusFights[bonusIndex])
								bonusIndex++
								return ret
							}
						}
						return bonusFight
					})
					globalIndex++
					return {
						...world,
						bonusFights: newBonuses
					}
				}
			}
			return world
		})
	}
}

export const bonusData = [
	{
		world: "Agrabah",
		bonusFights: [
			new BonusFight("Escort Abu", 42, "Escort Abu",
				[
					new BonusReward(0x669, 1, new Reward("Summon Boost", 0x18F, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x679, 2, new Reward("Donald Blizzard", 0x0A6, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x689, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x699, 7, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 15, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Treasure Room Heartless", 46, "Treasure Room Heartless",
				[
					new BonusReward(0x709, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x719, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x729, 3, new Reward("Auto Healing", 0x1A4, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x739, 7, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 15, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Volcanic Lord & Blizzard Lord", 37, "Elemental Lords",
				[
					new BonusReward(0x599, 1, new Reward("Finishing Leap", 0x10B, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x5A9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x5B9, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 1, 0, 0, 0),
					new BonusReward(0x5C9, 7, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 15, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Genie Jafar", 15, "Genie Jafar",
				[
					new BonusReward(0x229, 1, new Reward("Fire", 0x015, "spell"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Lexaeus (Absent Silhouette)", 65, "Lexaeus (AS)",
				[
					new BonusReward(0x9D9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 1, 0, 0),
					new BonusReward(0x9E9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 3, 0, 0, 0, 0, 0),
					new BonusReward(0x9F9, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 1, 0)
				]
			)
		]
	},
	{
		world: "Beast's Castle",
		bonusFights: [
			new BonusFight("Thresholder", 2, "Thresholder",
				[
					new BonusReward(0x009, 1, new Reward("Upper Slash", 0x089, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x019, 2, new Reward("Donald Fire", 0x0A5, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x029, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("The Beast", 12, "The Beast",
				[
					new BonusReward(0x1F9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 1, 0, 0, 0),
					new BonusReward(0x209, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x219, 3, new Reward("Defender", 0x19E, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Dark Thorn", 3, "Dark Thorn",
				[
					new BonusReward(0x039, 1, new Reward("Retaliating Slash", 0x111, "ability"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x049, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x059, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 1, 0),
					new BonusReward(0x069, 9, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 35, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Xaldin", 4, "Xaldin",
				[
					new BonusReward(0x079, 1, new Reward("Reflect", 0x058, "spell"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x089, 2, new Reward("Auto Healing", 0x1A4, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x099, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x0A9, 9, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 25, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Cavern of Remembrance",
		bonusFights: [
			new BonusFight("Transport to Remembrance Nobodies III", 72, "Transport to Remembrance",
				[
					new BonusReward(0xAF9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 1, 0),
					new BonusReward(0xB09, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 3, 0, 0, 0, 0, 0),
					new BonusReward(0xB19, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Disney Castle",
		bonusFights: [
			new BonusFight("Escort Queen Minnie", 38, "Queen Minne Escort",
				[
					new BonusReward(0x5D9, 1, new Reward("Auto Summon", 0x185, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 1, 0, 0)
				]
			),
			new BonusFight("Marluxia (Absent Silhouette)", 67, "Marluxia (AS)",
				[
					new BonusReward(0xA39, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 1),
					new BonusReward(0xA49, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 3, 0, 0, 0, 0, 0),
					new BonusReward(0xA59, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Lingering Will", 70, "Lingering Will",
				[
					new BonusReward(0xAA9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 1),
					new BonusReward(0xAB9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 3, 0, 0, 0, 0, 0),
					new BonusReward(0xAC9, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Halloween Town",
		bonusFights: [
			new BonusFight("Prison Keeper", 18, "Prison Keeper",
				[
					new BonusReward(0x299, 1, new Reward("Flash Step", 0x22F, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x2A9, 2, new Reward("Hyper Healing", 0x1A3, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x2B9, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x2C9, 10, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 15, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Oogie Boogie", 19, "Oogie Boogie",
				[
					new BonusReward(0x2D9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 1, 0),
					new BonusReward(0x2E9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x2F9, 3, new Reward("Once More", 0x1A0, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x309, 10, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 15, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Lock/Shock/Barrel", 40, "Lock, Shock, and Barrel",
				[
					new BonusReward(0x629, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 1, 0),
					new BonusReward(0x639, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x649, 3, new Reward("Auto Change", 0x1A2, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x659, 10, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("The Experiment", 20, "The Experiment",
				[
					new BonusReward(0x319, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x329, 2, new Reward("Jackpot", 0x196, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x339, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x349, 10, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 10, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Vexen (Absent Silhouette)", 64, "Vexen (AS)",
				[
					new BonusReward(0x9A9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 1, 0, 0, 0),
					new BonusReward(0x9B9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 3, 0, 0, 0, 0, 0),
					new BonusReward(0x9C9, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Hollow Bastion",
		bonusFights: [
			new BonusFight("Bailey Nobodies", 47, "The Bailey",
				[
					new BonusReward(0x749, 1, new Reward("Fire", 0x015, "spell"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Demyx (Hollow Bastion)", 28, "Demyx",
				[
					new BonusReward(0x459, 1, new Reward("Blizzard", 0x016, "spell"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 1, 0, 0, 0),
					new BonusReward(0x469, 2, new Reward("Blizzard Boost", 0x199, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x479, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("1,000 Heartless", 60, "1,000 Heartless",
				[
					new BonusReward(0x919, 1, new Reward("Guard Break", 0x109, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Sephiroth", 35, "Sephiroth",
				[
					new BonusReward(0x589, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 1)
				]
			)
		]
	},
	{
		world: "Land of Dragons",
		bonusFights: [
			new BonusFight("Village Cave Heartless", 43, "Village Cave",
				[
					new BonusReward(0x6A9, 1, new Reward("Slide Dash", 0x108, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x6B9, 6, new Reward("Hyper Healing", 0x1A3, "ability"), new Reward("EMPTY", 0x000, "empty"), 15, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Shan-Yu", 9, "Shan-Yu",
				[
					new BonusReward(0x179, 1, new Reward("Aerial Sweep", 0x10D, "ability"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x189, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x199, 3, new Reward("Goofy Turbo", 0x1A9, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x1A9, 6, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 20, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Storm Rider", 10, "Storm Rider",
				[
					new BonusReward(0x1B9, 1, new Reward("Thunder", 0x017, "spell"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x1C9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x1D9, 3, new Reward("Tornado Fusion (Whirli-Goof)", 0x0C9, "limit"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x1E9, 6, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 25, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Olympus Coliseum",
		bonusFights: [
			new BonusFight("Cerberus", 5, "Cerberus",
				[
					new BonusReward(0x0B9, 1, new Reward("Counterguard", 0x10C, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x0C9, 5, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 40, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Phil's Training(Story)", 57, "Phil's Training",
				[
					new BonusReward(0x899, 1, new Reward("Aerial Dive", 0x230, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Demyx (Olympus Coliseum)", 58, "Demyx",
				[
					new BonusReward(0x8A9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x8B9, 2, new Reward("MP Rage", 0x19C, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x8C9, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Pete (Olympus Coliseum)", 6, "Pete",
				[
					new BonusReward(0x0D9, 1, new Reward("Trinity Limit", 0x0C6, "limit"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x0E9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x0F9, 3, new Reward("Hyper Healing", 0x1A3, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("The Hydra", 7, "The Hydra",
				[
					new BonusReward(0x109, 1, new Reward("Thunder", 0x017, "spell"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x119, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 1, 0, 0, 0),
					new BonusReward(0x129, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Hades", 8, "Hades",
				[
					new BonusReward(0x139, 1, new Reward("Magnet Burst", 0x231, "ability"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x149, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 1, 0, 0),
					new BonusReward(0x159, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x169, 5, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 15, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Zexion (Absent Silhouette)", 66, "Zexion (AS)",
				[
					new BonusReward(0xA09, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 1, 0),
					new BonusReward(0xA19, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 3, 0, 0, 0, 0, 0),
					new BonusReward(0xA29, 3, new Reward("Damage Control", 0x21E, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Port Royal",
		bonusFights: [
			new BonusFight("The Interceptor Pirates", 62, "The Interceptor Pirates",
				[
					new BonusReward(0x969, 1, new Reward("Aerial Spiral", 0x10E, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x979, 2, new Reward("Draw", 0x195, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x989, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("The Interceptor Barrels", 39, "The Interceptor Barrels",
				[
					new BonusReward(0x5E9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 1, 0),
					new BonusReward(0x5F9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x609, 3, new Reward("Second Chance", 0x19F, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x619, 8, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 10, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Captain Barbossa", 21, "Captain Barbossa",
				[
					new BonusReward(0x359, 1, new Reward("Aerial Finish", 0x110, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 1),
					new BonusReward(0x369, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x379, 3, new Reward("Teamwork (Knocksmash)", 0x0CA, "limit"), new Reward("Auto Limit", 0x1A1, "ability"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x389, 8, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 15, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Grim Reaper I", 59, "Grim Reaper I",
				[
					new BonusReward(0x8D9, 1, new Reward("Horizontal Slash", 0x10F, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x8E9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x8F9, 3, new Reward("Draw", 0x195, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x909, 8, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 10, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Grim Reaper II", 22, "Grim Reaper II",
				[
					new BonusReward(0x399, 1, new Reward("Magnet", 0x057, "spell"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x3A9, 2, new Reward("Flare Force (Duck Flare)", 0x0C8, "limit"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x3B9, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x3C9, 8, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 15, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Pride Lands",
		bonusFights: [
			new BonusFight("Hyenas I", 49, "Protect Timon & Pumbaa",
				[
					new BonusReward(0x759, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x769, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x779, 3, new Reward("Lucky Lucky", 0x197, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Scar", 29, "Scar",
				[
					new BonusReward(0x489, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 10, 0, 0, 0, 0),
					new BonusReward(0x499, 2, new Reward("Fire Boost", 0x198, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x4A9, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x4B9, 11, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 30, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Hyenas II", 50, "Hyenas",
				[
					new BonusReward(0x789, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 1, 0, 0),
					new BonusReward(0x799, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x7A9, 3, new Reward("MP Rage", 0x19C, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x5B9, 11, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Groundshaker", 30, "Groundshaker",
				[
					new BonusReward(0x4C9, 1, new Reward("Thunder", 0x017, "spell"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x4D9, 11, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Simulated Twilight Town",
		bonusFights: [
			new BonusFight("Station of Serenity Nobodies", 54, "Station of Serenity",
				[
					new BonusReward(0x859, 14, new Reward("Aerial Recovery", 0x09E, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Twilight Thorn", 33, "Twilight Thorn",
				[
					new BonusReward(0x569, 14, new Reward("Guard", 0x052, "ability"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Axel I", 73, "Axel I",
				[
					new BonusReward(0xB29, 14, new Reward("Scan", 0x08A, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Axel II", 34, "Axel II",
				[
					new BonusReward(0x579, 14, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Space Paranoids",
		bonusFights: [
			new BonusFight("Dataspace Computers", 45, "Dataspace Computers",
				[
					new BonusReward(0x6C9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x6D9, 2, new Reward("Thunder Boost", 0x19A, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x6E9, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x6F9, 12, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 10, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Hostile Program", 31, "Hostile Program",
				[
					new BonusReward(0x4E9, 1, new Reward("Vicinity Break", 0x232, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 1),
					new BonusReward(0x4F9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x509, 3, new Reward("Jackpot", 0x196, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x519, 12, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 15, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Solar Sailor Heartless", 61, "Solar Sailor",
				[
					new BonusReward(0x929, 1, new Reward("Explosion", 0x10A, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x939, 2, new Reward("MP Hastera", 0x1A5, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x949, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x959, 12, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("MCP", 32, "MCP",
				[
					new BonusReward(0x529, 1, new Reward("Reflect", 0x058, "spell"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x539, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x549, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 1, 0, 0),
					new BonusReward(0x559, 12, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Larxene (Absent Silhouette)", 68, "Larxene (AS)",
				[
					new BonusReward(0xA69, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 10, 0, 0, 0, 0),
					new BonusReward(0xA79, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 1, 0),
					new BonusReward(0xA89, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Timeless River",
		bonusFights: [
			new BonusFight("Pete (Steamboat Fight)", 16, "Pete (Steamboat Fight)",
				[
					new BonusReward(0x239, 1, new Reward("Dodge Slash", 0x107, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x249, 2, new Reward("Fantasia (Comet)", 0x0C7, "limit"), new Reward("Auto Limit", 0x1A1, "ability"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x259, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Pete (Timeless River)", 17, "Pete",
				[
					new BonusReward(0x269, 1, new Reward("Reflect", 0x058, "spell"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x279, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x289, 3, new Reward("Goofy Tornado", 0x1A9, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "Twilight Town",
		bonusFights: [
			new BonusFight("The Old Mansion Nobodies", 56, "The Old Mansion",
				[
					new BonusReward(0x869, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x879, 2, new Reward("Lucky Lucky", 0x197, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0),
					new BonusReward(0x889, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Betwixt & Between Nobodies", 63, "Betwixt & Between",
				[
					new BonusReward(0x999, 1, new Reward("Slapshot", 0x106, "ability"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 0)
				]
			)
		]
	},
	{
		world: "The World That Never Was",
		bonusFights: [
			new BonusFight("Roxas", 69, "Roxas",
				[
					new BonusReward(0xA99, 1, new Reward("Combo Master", 0x21B, "ability"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Xigbar", 23, "Xigbar",
				[
					new BonusReward(0x3D9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 10, 0, 0, 0, 0),
					new BonusReward(0x3E9, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 1, 0),
					new BonusReward(0x3F9, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Luxord", 24, "Luxord",
				[
					new BonusReward(0x409, 1, new Reward("Magnet", 0x057, "spell"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0)
				]
			),
			new BonusFight("Saix", 25, "Saix",
				[
					new BonusReward(0x419, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 0, 0, 0, 0, 0),
					new BonusReward(0x429, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 4, 0, 0, 0, 0, 0),
					new BonusReward(0x439, 3, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 1, 0)
				]
			),
			new BonusFight("Xemnas", 26, "Xemnas",
				[
					new BonusReward(0x449, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 5, 10, 0, 0, 0, 0)
				]
			),
			new BonusFight("Final Xemnas", 71, "Final Xemnas",
				[
					new BonusReward(0xAD9, 1, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 0, 0, 0, 0, 0, 1),
					new BonusReward(0xAE9, 13, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), 25, 0, 0, 0, 0, 0)
				]
			)
		]
	}
]