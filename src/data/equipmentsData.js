import { Reward } from './rewardsData'

export class Equipment {
	constructor(name, vanilla, equipmentType, strength, magic, ap, defense, fire, blizzard, thunder, dark, physical, light, universal, address, zipID) {
		this.name = name
		this.vanillaAbility = { ...vanilla }
		this.replacementAbility = { ...vanilla }
		this.equipmentType = equipmentType
		this.strength = strength
		this.vanillaStrength = strength
		this.magic = magic
		this.vanillaMagic = magic
		this.ap = ap
		this.vanillaAP = ap
		this.defense = defense
		this.vanillaDefense = defense
		this.fire = fire
		this.vanillaFire = fire
		this.blizzard = blizzard
		this.vanillaBlizzard = blizzard
		this.thunder = thunder
		this.vanillaThunder = thunder
		this.dark = dark
		this.vanillaDark = dark
		this.physical = physical
		this.vanillaPhysical = physical
		this.light = light
		this.vanillaLight = light
		this.universal = universal
		this.vanillaUniversal = universal
		this.zipID = zipID
		this.baseAddress = address

		this.defaultFieldData = () => {
			return {
				ability: { ...this.replacementAbility },
				currentAP: this.ap,
				currentStrength: this.strength,
				currentMagic: this.magic,
				currentDefense: this.defense,
				currentFire: this.fire,
				currentBlizzard: this.blizzard,
				currentThunder: this.thunder,
				currentDark: this.dark,
				currentPhysical: this.physical,
				currentLight: this.light,
				currentUniversal: this.universal
			}
		}
		this.isAbilityReplaced = () => {
			return this.vanillaAbility.index !== this.replacementAbility.index
		}
		this.isStatsReplaced = () => {
			return this.strength !== this.vanillaStrength || this.magic !== this.vanillaMagic || this.defense !== this.vanillaDefense || this.ap !== this.vanillaAP
		}
		this.isElementalResistanceChanged = () => {
			return this.fire !== this.vanillaFire || this.blizzard !== this.vanillaBlizzard ||
				this.thunder !== this.vanillaThunder || this.physical !== this.vanillaPhysical
		}
		this.isOtherResistanceChanged = () => {
			return this.dark !== this.vanillaDark || this.light !== this.vanillaLight || this.universal !== this.vanillaUniversal
		}
		this.isReplaced = () => {
			return this.isAbilityReplaced() || this.isStatsReplaced() || this.isElementalResistanceChanged() || this.isOtherResistanceChanged()
		}
		this.shouldShowStat = (statName) => {
			if (statName === 'AP')
				return this.isAccessory()
			else if (statName === 'Strength' || statName === 'Magic')
				return this.isWeapon() || this.isAllyWeapon() || this.isAccessory()
			else if (statName === 'Defense' || statName === 'Fire' || statName === 'Blizzard' || statName === 'Thunder' || statName === 'Dark')
				return this.isArmor()
			else
				return false
		}
		this.isWeapon = () => {
			return this.equipmentType === 0 || this.equipmentType === 1 || this.equipmentType === 2
		}
		this.isAllyWeapon = () => {
			return this.equipmentType === 3
		}
		this.isArmor = () => {
			return this.equipmentType === 4
		}
		this.isAccessory = () => {
			return this.equipmentType === 5
		}
		this.isValidEquipment = () => {
			let lineCount = 0;

			if (this.strength !== this.vanillaStrength || this.isWeapon() || this.isAllyWeapon() || this.isAccessory()) lineCount++
			if (this.magic !== this.vanillaMagic || this.isWeapon() || this.isAllyWeapon() || this.isAccessory()) lineCount++
			if (this.defense !== this.vanillaDefense || this.isArmor()) lineCount++
			if (this.ap !== this.vanillaAP || this.isAccessory()) lineCount++
			if (this.fire !== this.vanillaFire || this.isArmor()) lineCount++
			if (this.blizzard !== this.vanillaBlizzard || this.isArmor()) lineCount++
			if (this.thunder !== this.vanillaThunder || this.isArmor()) lineCount++
			if (this.dark !== this.vanillaDark || this.isArmor()) lineCount++

			return lineCount <= 5
		}
		this.copy = () => {
			let ret = this.vanilla()

			ret.replacementAbility = this.replacementAbility
			ret.equipmentType = this.equipmentType
			ret.strength = this.strength
			ret.magic = this.magic
			ret.ap = this.ap
			ret.defense = this.defense
			ret.fire = this.fire
			ret.blizzard = this.blizzard
			ret.thunder = this.thunder
			ret.dark = this.dark
			ret.physical = this.physical
			ret.light = this.light
			ret.universal = this.universal

			return ret
		}
		this.vanilla = () => {
			return new Equipment(
				this.name,
				new Reward(this.vanillaAbility.reward, this.vanillaAbility.index, this.vanillaAbility.iconType),
				this.equipmentType,
				this.vanillaStrength, this.vanillaMagic, this.vanillaAP, this.vanillaDefense,
				this.vanillaFire, this.vanillaBlizzard, this.vanillaThunder, this.vanillaDark,
				this.vanillaPhysical, this.vanillaLight, this.vanillaUniversal,
				this.baseAddress,
				this.zipID
			)
		}
		this.replace = (newEquipmentData) => {
			let ret = this.copy()

			ret.replacementAbility = { ...newEquipmentData.ability }
			ret.strength = newEquipmentData.currentStrength
			ret.magic = newEquipmentData.currentMagic
			ret.ap = newEquipmentData.currentAP
			ret.defense = newEquipmentData.currentDefense
			ret.fire = newEquipmentData.currentFire
			ret.blizzard = newEquipmentData.currentBlizzard
			ret.thunder = newEquipmentData.currentThunder
			ret.physical = newEquipmentData.currentPhysical
			ret.dark = newEquipmentData.currentDark
			ret.light = newEquipmentData.currentLight
			ret.universal = newEquipmentData.currentUniversal
			return ret
		}
		this.saveToJSON = () => {
			return (this.isReplaced())
				? JSON.stringify(this, ['name', 'replacementAbility', 'reward', 'index', 'iconType', 'ap', 'defense', 'magic', 'strength', 'fire',
					'blizzard', 'thunder', 'dark', 'physical', 'light', 'universal', 'zipID']) + ','
				: ''
		}
		this.loadFromJSON = (equipmentJSON) => {
			//remove all resistance checks
			let ret = this.copy()

			ret.replacementAbility = { ...equipmentJSON.replacementAbility }
			ret.strength = equipmentJSON.strength
			ret.magic = equipmentJSON.magic
			ret.ap = equipmentJSON.ap
			ret.defense = equipmentJSON.defense


			if (equipmentJSON.hasOwnProperty('fire'))
				ret.fire = equipmentJSON.fire
			else if (equipmentJSON.hasOwnProperty('fireResistance'))
				ret.fire = equipmentJSON.fireResistance

			if (equipmentJSON.hasOwnProperty('blizzard'))
				ret.blizzard = equipmentJSON.blizzard
			else if (equipmentJSON.hasOwnProperty('blizzardResistance'))
				ret.blizzard = equipmentJSON.blizzardResistance

			if (equipmentJSON.hasOwnProperty('thunder'))
				ret.thunder = equipmentJSON.thunder
			else if (equipmentJSON.hasOwnProperty('thunderResistance'))
				ret.thunder = equipmentJSON.thunderResistance

			if (equipmentJSON.hasOwnProperty('dark'))
				ret.dark = equipmentJSON.dark
			else if (equipmentJSON.hasOwnProperty('darkResistance'))
				ret.dark = equipmentJSON.darkResistance

			if (equipmentJSON.hasOwnProperty('physical'))
				ret.physical = equipmentJSON.physical
			else if (equipmentJSON.hasOwnProperty('physicalResistance'))
				ret.physical = equipmentJSON.physicalResistance

			if (equipmentJSON.hasOwnProperty('light'))
				ret.light = equipmentJSON.light
			else if (equipmentJSON.hasOwnProperty('lightResistance'))
				ret.light = equipmentJSON.lightResistance

			if (equipmentJSON.hasOwnProperty('universal'))
				ret.universal = equipmentJSON.universal
			else if (equipmentJSON.hasOwnProperty('universalResistance'))
				ret.universal = equipmentJSON.universalResistance

			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ''
			let abilityAddress = this.baseAddress
			let statAddress = this.baseAddress + 2
			let elementalAddress = this.baseAddress + 6
			let otherAddress = this.baseAddress + 10

			if (this.isAbilityReplaced()) {
				ret += 'patch=1,EE,1' + abilityAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
				ret += this.replacementAbility.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // Ability: ' + this.replacementAbility.reward
				ret += '\n'
			}
			if (this.isStatsReplaced()) {
				ret += 'patch=1,EE,2' + statAddress.toString(16).toUpperCase().padStart(7, 0) + ',extended,'
				ret += ((this.ap << 24) + (this.defense << 16) + (this.magic << 8) + this.strength).toString(16).toUpperCase().padStart(8, '0')
				if (isCommented) ret += ' // AP:' + this.ap + ' Defense:' + this.defense + ' Magic:' + this.magic + ' Strength:' + this.strength
				ret += '\n'
			}
			if (this.isElementalResistanceChanged()) {
				ret += 'patch=1,EE,2' + elementalAddress.toString(16).toUpperCase().padStart(7, 0) + ',extended,'
				let s = (100 - this.thunder << 24) + (100 - this.blizzard << 16) + (100 - this.fire << 8) + (100 - this.physical)
				ret += s.toString(16).toUpperCase().padStart(8, '0')
				if (isCommented)
					ret += ' // Thunder:' + this.thunder + '% Blizzard:' + this.blizzard + '% Fire:' + this.fire + '% Physical:' + this.physical + '%'
				ret += '\n'
			}
			if (this.isOtherResistanceChanged()) {
				ret += 'patch=1,EE,2' + otherAddress.toString(16).toUpperCase().padStart(7, 0) + ',extended,00'
				ret += ((100 - this.universal << 16) + (100 - this.light << 8) + (100 - this.dark)).toString(16).toUpperCase().padStart(6, '0')
				if (isCommented) ret += ' // Universal:' + this.universal + '% Light:' + this.light + '% Dark:' + this.dark + '%'
				ret += '\n'
			}
			if (ret === '') return ret
			return isCommented
				? '// ' + this.name + '\n' + ret
				: ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ''
			let base = this.baseAddress

			let abilityAddress = "0x" + base.toString(16).toUpperCase()
			let statAddress = "0x" + (base + 2).toString(16).toUpperCase()
			let elementalAddress = "0x" + (base + 6).toString(16).toUpperCase()
			let otherAddress = "0x" + (base + 10).toString(16).toUpperCase()

			if (this.isAbilityReplaced()) {
				let rewardString = "0x" + this.replacementAbility.index.toString(16).toUpperCase().padStart(4, '0')
				ret += "\tWriteShort(BAR(Sys3, 0x6, " + abilityAddress +"), " + rewardString + ", OnPC)"
				if (isCommented) ret += " -- Ability: " + this.replacementAbility.reward
				ret += "\n"
			}
			if (this.isStatsReplaced()) {
				let stats = "0x" + ((this.ap << 24) + (this.defense << 16) + (this.magic << 8) + this.strength).toString(16).toUpperCase().padStart(8, '0')
				ret += "\tWriteInt(BAR(Sys3, 0x6, " + statAddress + "), " + stats + ", OnPC)"
				if (isCommented) ret += " -- AP:" + this.ap + " Defense:" + this.defense + " Magic:" + this.magic + " Strength:" + this.strength
				ret += "\n"
			}
			if (this.isElementalResistanceChanged()) {
				let elementalResistances = "0x" + ((100 - this.thunder << 24) + (100 - this.blizzard << 16) + (100 - this.fire << 8) + (100 - this.physical)).toString(16).toUpperCase().padStart(8, '0')
				ret += "\tWriteInt(BAR(Sys3, 0x6, " + elementalAddress + "), " + elementalResistances + ", OnPC)"
				if (isCommented)
					ret += " -- Thunder:" + this.thunder + "% Blizzard:" + this.blizzard + "% Fire:" + this.fire + "% Physical:" + this.physical + "%"
				ret += "\n"
			}
			if (this.isOtherResistanceChanged()) {
				let otherResistances = "0x" + ((100 - this.universal << 16) + (100 - this.light << 8) + (100 - this.dark)).toString(16).toUpperCase().padStart(8, '0')
				ret += "\tWriteInt(BAR(Sys3, 0x6, " + otherAddress + "), " + otherResistances + ", OnPC)"
				if (isCommented) ret += " -- Universal:" + this.universal + "% Light:" + this.light + "% Dark:" + this.dark + "%"
				ret += "\n"
			}
			if (ret === "") return ret
			return isCommented
				? "\t-- " + this.name + "\n" + ret
				: ret
		}
		this.saveToYml = (isCommented) => {
			let ret = ''
			if (this.isReplaced()) {
				ret += isCommented ? '# ' + this.name + '\n' : ''
				ret += '- Id: ' + this.zipID
				ret += '\n  Ability: ' + this.replacementAbility.index + (isCommented ? ' # ' + this.replacementAbility.reward : '')
				ret += '\n  AbilityPoints: ' + this.ap
				ret += '\n  Attack: ' + this.strength
				ret += '\n  Magic: ' + this.magic
				ret += '\n  Defense: ' + this.defense
				ret += '\n  FireResistance: ' + (100 - this.fire)
				ret += '\n  IceResistance: ' + (100 - this.blizzard)
				ret += '\n  LightningResistance: ' + (100 - this.thunder)
				ret += '\n  DarkResistance: ' + (100 - this.dark)
				ret += '\n  Unknown08: ' + (100 - this.physical) + (isCommented ? ' # Physical' : '')
				ret += '\n  Unknown0d: ' + (100 - this.light) + (isCommented ? ' # Light' : '')
				ret += '\n  GeneralResistance: ' + (100 - this.universal) + (isCommented ? ' # Universal' : '')
				ret += '\n  Unknown: 0'
				ret += '\n'
			}
			return ret
		}
	}

	static saveToPnach(equipmentData, isCommented) {
		return ['\n//EQUIPMENT\n'].concat(equipmentData.map(equipmentType => {
			let ret = isCommented ? '// ' + equipmentType.equipmentType.toUpperCase() + '\n' : ''
			equipmentType.equipments.forEach(equipment => { ret += equipment.saveToPnach(isCommented) })
			return ret
		}))
	}
	static saveToLua(equipmentData, isCommented) {
		return ['\nfunction Equipment()\n'].concat(equipmentData.map(equipmentTypeList => {
			let ret = isCommented ? '\t-- ' + equipmentTypeList.equipmentType.toUpperCase() + '\n' : ''
			equipmentTypeList.equipments.forEach(equipment => { ret += equipment.saveToLua(isCommented) })
			return ret
		}), ['end\n'])
	}
	static saveToYml(equipmentData, isCommented) {
		return equipmentData.reduce((prev, equipmentType) => {
			if (equipmentType.equipments.find(equipment => equipment.isReplaced())) {
				prev += isCommented ? '# ' + equipmentType.equipmentType + '\n' : ''
				equipmentType.equipments.forEach(equipment => { prev += equipment.saveToYml(isCommented) })
			}
			return prev
		}, '')
	}
	static saveToJSON(equipmentData) {
		let equipmentSaveData = equipmentData.map(equipmentType => {
			let ret = ''
			equipmentType.equipments.forEach(equipment => { ret += equipment.saveToJSON() })
			if (ret !== '')
				return '{"equipmentType":"' + equipmentType.equipmentType + '","equipments":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		return ['"equipmentsData":[', equipmentSaveData.filter(s => s !== '').join(), '],']
	}
	static loadFromJSON(equipmentLoadData) {
		return equipmentsData.map(equipmentType => {
			let foundEquipmentType = equipmentLoadData.find(loadEquipmentType => loadEquipmentType.equipmentType === equipmentType.equipmentType)
			if (foundEquipmentType !== undefined) {
				let newEquipments = equipmentType.equipments.map(equipment => {
					let foundEquipment = foundEquipmentType.equipments.find(loadEquipment => loadEquipment.name === equipment.name)
					if (foundEquipment !== undefined)
						return equipment.loadFromJSON(foundEquipment)
					return equipment
				})
				return {
					...equipmentType,
					equipments: newEquipments
				}
			}
			return equipmentType
		})
	}
}

export const equipmentsData = [
	{
		equipmentType: "Keyblade",
		equipments: [
			new Equipment("Kingdom Key", new Reward("Damage Control", 0x21E, "Ability"), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x365A, 80),
			new Equipment("Oathkeeper", new Reward("Form Boost", 0x18E, "Ability"), 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x366A, 81),
			new Equipment("Oblivion", new Reward("Drive Boost", 0x18D, "Ability"), 0, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x367A, 82),
			new Equipment("Star Seeker", new Reward("Air Combo Plus", 0x0A3, "Ability"), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x38EA, 123),
			new Equipment("Hidden Dragon", new Reward("MP Rage", 0x19C, "Ability"), 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x38FA, 124),
			new Equipment("Hero's Crest", new Reward("Air Combo Boost", 0x187, "Ability"), 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x392A, 127),
			new Equipment("Monochrome", new Reward("Item Boost", 0x19B, "Ability"), 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x393A, 128),
			new Equipment("Follow the Wind", new Reward("Draw", 0x195, "Ability"), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x394A, 129),
			new Equipment("Circle of Life", new Reward("MP Haste", 0x19D, "Ability"), 0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x395A, 130),
			new Equipment("Photon Debugger", new Reward("Thunder Boost", 0x19A, "Ability"), 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x396A, 131),
			new Equipment("Gull Wing", new Reward("Experience Boost", 0x191, "Ability"), 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x397A, 132),
			new Equipment("Rumbling Rose", new Reward("Finishing Plus", 0x189, "Ability"), 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x398A, 133),
			new Equipment("Guardian Soul", new Reward("Reaction Boost", 0x188, "Ability"), 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x399A, 134),
			new Equipment("Wishing Lamp", new Reward("Jackpot", 0x196, "Ability"), 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x39AA, 135),
			new Equipment("Decisive Pumpkin", new Reward("Combo Boost", 0x186, "Ability"), 0, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x39BA, 136),
			new Equipment("Sweet Memories", new Reward("Drive Converter", 0x21C, "Ability"), 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x39DA, 138),
			new Equipment("Mysterious Abyss", new Reward("Blizzard Boost", 0x199, "Ability"), 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x39EA, 139),
			new Equipment("Sleeping Lion", new Reward("Combo Plus", 0x0A2, "Ability"), 0, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x39CA, 137),
			new Equipment("Bond of Flame", new Reward("Fire Boost", 0x198, "Ability"), 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3A0A, 141),
			new Equipment("Fatal Crest", new Reward("Berserk Charge", 0x18B, "Ability"), 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x39FA, 140),
			new Equipment("Two Become One", new Reward("Light & Darkness", 0x21D, "Ability"), 0, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3A7A, 148),
			new Equipment("Fenrir", new Reward("Negative Combo", 0x18A, "Ability"), 0, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3A1A, 142),
			new Equipment("Ultima Weapon", new Reward("MP Hastega", 0x1A6, "Ability"), 0, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3A2A, 143),
			new Equipment("Winner's Proof", new Reward("No Experience", 0x194, "Ability"), 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3A8A, 149),
			new Equipment("Kingdom Key D", new Reward("Defender", 0x19E, "Ability"), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x387A, 116),
			new Equipment("Alpha Weapon", new Reward("MP Hastera", 0x1A5, "Ability"), 0, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x368A, 83),
			new Equipment("Omega Weapon", new Reward("Air Combo Boost", 0x187, "Ability"), 0, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x369A, 84),
			new Equipment("Pureblood", new Reward("Damage Drive", 0x18C, "Ability"), 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x36AA, 85),
			new Equipment("Struggle Sword", new Reward("Draw", 0x195, "Ability"), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x389A, 122),
			new Equipment("Struggle Wand", new Reward("Draw", 0x195, "Ability"), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x38B2, 144),
			new Equipment("Struggle Hammer", new Reward("Draw", 0x195, "Ability"), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x38CA, 145)
		]
	},
	{
		equipmentType: "Donald Staff",
		equipments: [
			new Equipment("Mage's Staff", new Reward("EMPTY", 0x000, "EMPTY"), 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x36BA, 86),
			new Equipment("Hammer Staff", new Reward("EMPTY", 0x000, "EMPTY"), 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x36CA, 87),
			new Equipment("Victory Bell", new Reward("EMPTY", 0x000, "EMPTY"), 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x36DA, 88),
			new Equipment("Comet Staff", new Reward("EMPTY", 0x000, "EMPTY"), 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x36FA, 90),
			new Equipment("Lord's Broom", new Reward("EMPTY", 0x000, "EMPTY"), 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x370A, 91),
			new Equipment("Wisdom Wand", new Reward("EMPTY", 0x000, "EMPTY"), 1, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x371A, 92),
			new Equipment("Meteor Staff", new Reward("Thunder Boost", 0x19A, "Ability"), 1, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x36EA, 89),
			new Equipment("Rising Dragon", new Reward("Fire Boost", 0x198, "Ability"), 1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x372A, 93),
			new Equipment("Shaman's Relic", new Reward("Blizzard Boost", 0x199, "Ability"), 1, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x374A, 95),
			new Equipment("Shaman's Relic+", new Reward("Defender", 0x19E, "Ability"), 1, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3B8A, 165),
			new Equipment("Nobody Lance", new Reward("Item Boost", 0x19B, "Ability"), 1, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x373A, 94),
			new Equipment("Centurion", new Reward("EMPTY", 0x000, "EMPTY"), 1, 13, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3A9A, 150),
			new Equipment("Centurion+", new Reward("Damage Control", 0x21E, "Ability"), 1, 13, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3AAA, 151),
			new Equipment("Save the Queen", new Reward("Hyper Healing", 0x1A3, "Ability"), 1, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x390A, 125),
			new Equipment("Save the Queen+", new Reward("MP Rage", 0x19C, "Ability"), 1, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3A5A, 146),
			new Equipment("Plain Mushroom", new Reward("EMPTY", 0x000, "EMPTY"), 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3ABA, 152),
			new Equipment("Plain Mushroom+", new Reward("EMPTY", 0x000, "EMPTY"), 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3ACA, 153),
			new Equipment("Precious Mushroom", new Reward("MP Haste", 0x19D, "Ability"), 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3ADA, 154),
			new Equipment("Precious Mushroom+", new Reward("MP Hastera", 0x1A5, "Ability"), 1, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3AEA, 155),
			new Equipment("Premium Mushroom", new Reward("MP Hastega", 0x1A6, "Ability"), 1, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3AFA, 156)
		]
	},
	{
		equipmentType: "Goofy Shield",
		equipments: [
			new Equipment("Knight's Shield", new Reward("EMPTY", 0x000, "EMPTY"), 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x376A, 99),
			new Equipment("Adamant Shield", new Reward("EMPTY", 0x000, "EMPTY"), 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x377A, 100),
			new Equipment("Chain Gear", new Reward("EMPTY", 0x000, "EMPTY"), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x378A, 101),
			new Equipment("Falling Star", new Reward("EMPTY", 0x000, "EMPTY"), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x37AA, 103),
			new Equipment("Dream Cloud", new Reward("EMPTY", 0x000, "EMPTY"), 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x37BA, 104),
			new Equipment("Knight Defender", new Reward("EMPTY", 0x000, "EMPTY"), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x37CA, 105),
			new Equipment("Ogre Shield", new Reward("Defender", 0x19E, "Ability"), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x379A, 102),
			new Equipment("Genji Shield", new Reward("Hyper Healing", 0x1A3, "Ability"), 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x37DA, 106),
			new Equipment("Akashic Record", new Reward("MP Haste", 0x19D, "Ability"), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x37EA, 107),
			new Equipment("Akashic Record+", new Reward("MP Hastera", 0x1A5, "Ability"), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3B9A, 166),
			new Equipment("Nobody Guard", new Reward("MP Rage", 0x19C, "Ability"), 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x37FA, 108),
			new Equipment("Frozen Pride", new Reward("EMPTY", 0x000, "EMPTY"), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3B0A, 157),
			new Equipment("Frozen Pride+", new Reward("MP Hastega", 0x1A6, "Ability"), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3B1A, 158),
			new Equipment("Save the King", new Reward("Item Boost", 0x19B, "Ability"), 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x391A, 126),
			new Equipment("Save the King+", new Reward("Damage Control", 0x21E, "Ability"), 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3A6A, 147),
			new Equipment("Joyous Mushroom", new Reward("EMPTY", 0x000, "EMPTY"), 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3B2A, 159),
			new Equipment("Joyous Mushroom+", new Reward("EMPTY", 0x000, "EMPTY"), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3B3A, 160),
			new Equipment("Majestic Mushroom", new Reward("Protect", 0x254, "Ability"), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3B4A, 161),
			new Equipment("Majestic Mushroom+", new Reward("Protectra", 0x255, "Ability"), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3B5A, 162),
			new Equipment("Ultimate Mushroom", new Reward("Protectga", 0x256, "Ability"), 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x3B6A, 163)
		]
	},
	{
		equipmentType: "Ally Weapon",
		equipments: [
			new Equipment("Sword of Ancestor", new Reward("EMPTY", 0x000, "EMPTY"), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x384A, 113),
			new Equipment("Beast's Claw", new Reward("EMPTY", 0x000, "EMPTY"), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x388A, 114),
			new Equipment("Battlefields of War", new Reward("EMPTY", 0x000, "EMPTY"), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x383A, 112),
			new Equipment("Skill and Crossbones", new Reward("EMPTY", 0x000, "EMPTY"), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x38BA, 120),
			new Equipment("Scimitar", new Reward("EMPTY", 0x000, "EMPTY"), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x382A, 111),
			new Equipment("Bone Fist", new Reward("EMPTY", 0x000, "EMPTY"), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x389A, 118),
			new Equipment("Proud Fang", new Reward("EMPTY", 0x000, "EMPTY"), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x38AA, 119),
			new Equipment("Identity Disk", new Reward("EMPTY", 0x000, "EMPTY"), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x386A, 115),
			new Equipment("Way to the Dawn", new Reward("EMPTY", 0x000, "EMPTY"), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x38CA, 121)
		]
	},
	{
		equipmentType: "Armor",
		equipments: [
			new Equipment("Elven Bandana", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0x323A, 0),
			new Equipment("Divine Bandana", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0x324A, 1),
			new Equipment("Champion Belt", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 0, 20, 20, 20, 0, 0, 0, 0, 0x341A, 36),
			new Equipment("Protect Belt", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0x327A, 4),
			new Equipment("Gaia Belt", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 0, 0, 20, 20, 0, 0, 0, 0x328A, 5),
			new Equipment("Power Band", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0x325A, 2),
			new Equipment("Buster Band", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0x326A, 3),
			new Equipment("Cosmic Belt", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0x329A, 6),
			new Equipment("Fire Bangle", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 1, 20, 0, 0, 0, 0, 0, 0, 0x32DA, 12),
			new Equipment("Fira Bangle", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 2, 20, 0, 0, 0, 0, 0, 0, 0x32EA, 13),
			new Equipment("Firaga Bangle", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 20, 0, 0, 0, 0, 0, 0, 0x32FA, 14),
			new Equipment("Firagun Bangle", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 25, 0, 0, 0, 0, 0, 0, 0x330A, 15),
			new Equipment("Blizzard Armlet", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 1, 0, 20, 0, 0, 0, 0, 0, 0x331A, 17),
			new Equipment("Blizzara Armlet", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 2, 0, 20, 0, 0, 0, 0, 0, 0x332A, 18),
			new Equipment("Blizzaga Armlet", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 0, 20, 0, 0, 0, 0, 0, 0x333A, 19),
			new Equipment("Blizzagun Armlet", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 0, 25, 0, 0, 0, 0, 0, 0x334A, 20),
			new Equipment("Thunder Trinket", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 1, 0, 0, 20, 0, 0, 0, 0, 0x335A, 22),
			new Equipment("Thundara Trinket", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 2, 0, 0, 20, 0, 0, 0, 0, 0x336A, 23),
			new Equipment("Thundaga Trinket", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 0, 0, 20, 0, 0, 0, 0, 0x337A, 24),
			new Equipment("Thundagun Trinket", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 0, 0, 25, 0, 0, 0, 0, 0x338A, 25),
			new Equipment("Shock Charm", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 0, 0, 40, 0, 0, 0, 0, 0x32AA, 7),
			new Equipment("Shock Charm+", new Reward("Thunder Boost", 0x19A, "Ability"), 4, 0, 0, 0, 3, 0, 0, 40, 0, 0, 0, 0, 0x32BA, 8),
			new Equipment("Shadow Anklet", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 1, 0, 0, 0, 20, 0, 0, 0, 0x339A, 27),
			new Equipment("Dark Anklet", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 2, 0, 0, 0, 20, 0, 0, 0, 0x33AA, 28),
			new Equipment("Midnight Anklet", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 0, 0, 0, 20, 0, 0, 0, 0x33BA, 29),
			new Equipment("Chaos Anklet", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 0, 0, 0, 25, 0, 0, 0, 0x33CA, 30),
			new Equipment("Abas Chain", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 1, 20, 20, 20, 0, 0, 0, 0, 0x33DA, 32),
			new Equipment("Aegis Chain", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 2, 20, 20, 20, 0, 0, 0, 0, 0x33EA, 33),
			new Equipment("Acrisius", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 20, 20, 20, 0, 0, 0, 0, 0x33FA, 34),
			new Equipment("Acrisius+", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 25, 25, 25, 0, 0, 0, 0, 0x343A, 38),
			new Equipment("Cosmic Chain", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 3, 30, 30, 30, 0, 0, 0, 0, 0x344A, 39),
			new Equipment("Petit Ribbon", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 4, 10, 10, 10, 10, 0, 0, 10, 0x342A, 37),
			new Equipment("Ribbon", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 4, 15, 15, 15, 15, 0, 0, 15, 0x340A, 35),
			new Equipment("Grand Ribbon", new Reward("EMPTY", 0x000, "EMPTY"), 4, 0, 0, 0, 4, 25, 25, 25, 25, 0, 0, 25, 0x32CA, 9)
		]
	},
	{
		equipmentType: "Accessory",
		equipments: [
			new Equipment("Ability Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x345A, 48),
			new Equipment("Engineer's Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x346A, 49),
			new Equipment("Technician's Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x347A, 50),
			new Equipment("Skill Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x356A, 65),
			new Equipment("Skillful Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x357A, 66),
			new Equipment("Expert's Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0x348A, 51),
			new Equipment("Master's Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0x353A, 62),
			new Equipment("Cosmic Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0x35CA, 71),
			new Equipment("Executive's Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0x3B7A, 164),
			new Equipment("Sardonyx Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x349A, 52),
			new Equipment("Tourmaline Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x34AA, 53),
			new Equipment("Aquamarine Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x34BA, 54),
			new Equipment("Garnet Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x34CA, 55),
			new Equipment("Diamond Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x34DA, 56),
			new Equipment("Silver Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x34EA, 57),
			new Equipment("Gold Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x34FA, 58),
			new Equipment("Platinum Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x350A, 59),
			new Equipment("Mythril Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x351A, 60),
			new Equipment("Orichalcum Ring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x352A, 61),
			new Equipment("Soldier Earring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x358A, 67),
			new Equipment("Fencer Earring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 2, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x359A, 68),
			new Equipment("Mage Earring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x35AA, 69),
			new Equipment("Slayer Earring", new Reward("EMPTY", 0x000, "EMPTY"), 5, 1, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x35BA, 70),
			new Equipment("Medal", new Reward("EMPTY", 0x000, "EMPTY"), 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x35DA, 72),
			new Equipment("Moon Amulet", new Reward("EMPTY", 0x000, "EMPTY"), 5, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x354A, 63),
			new Equipment("Star Charm", new Reward("EMPTY", 0x000, "EMPTY"), 5, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x355A, 64),
			new Equipment("Cosmic Arts", new Reward("EMPTY", 0x000, "EMPTY"), 5, 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0x35EA, 73),
			new Equipment("Shadow Archive", new Reward("EMPTY", 0x000, "EMPTY"), 5, 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x35FA, 74),
			new Equipment("Shadow Archive+", new Reward("MP Rage", 0x19C, "Ability"), 5, 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x360A, 75),
			new Equipment("Full Bloom", new Reward("EMPTY", 0x000, "EMPTY"), 5, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x362A, 77),
			new Equipment("Full Bloom+", new Reward("MP Haste", 0x19D, "Ability"), 5, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x364A, 79),
			new Equipment("Draw Ring", new Reward("Draw", 0x195, "Ability"), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x363A, 78),
			new Equipment("Lucky Ring", new Reward("Lucky Lucky", 0x197, "Ability"), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x361A, 76)
		]
	}
]