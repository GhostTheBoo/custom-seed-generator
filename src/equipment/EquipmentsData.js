import { Reward } from '../rewards/RewardsData'

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
			return new Equipment(this.name, new Reward(this.vanillaAbility.reward, this.vanillaAbility.index, this.vanillaAbility.iconType), this.equipmentType, this.vanillaStrength, this.vanillaMagic,
				this.vanillaAP, this.vanillaDefense, this.vanillaFire, this.vanillaBlizzard, this.vanillaThunder, this.vanillaDark,
				this.vanillaPhysical, this.vanillaLight, this.vanillaUniversal, this.baseAddress, this.zipID)
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
			let newBase = this.baseAddress - 0x1CCB300
			let abilityAddress = newBase
			let statAddress = newBase + 2
			let elementalAddress = newBase + 6
			let otherAddress = newBase + 10

			if (this.isAbilityReplaced()) {
				ret += '\tWriteShort(Sys3+0x' + abilityAddress.toString(16).toUpperCase() + ',0x'
				ret += this.replacementAbility.index.toString(16).toUpperCase().padStart(4, '0') + ')'
				if (isCommented) ret += ' -- Ability: ' + this.replacementAbility.reward
				ret += '\n'
			}
			if (this.isStatsReplaced()) {
				ret += '\tWriteInt(Sys3+0x' + statAddress.toString(16).toUpperCase() + ',0x'
				ret += ((this.ap << 24) + (this.defense << 16) + (this.magic << 8) + this.strength).toString(16).toUpperCase().padStart(8, '0') + ')'
				if (isCommented) ret += ' -- AP:' + this.ap + ' Defense:' + this.defense + ' Magic:' + this.magic + ' Strength:' + this.strength
				ret += '\n'
			}
			if (this.isElementalResistanceChanged()) {
				let temp = (100 - this.thunder << 24) + (100 - this.blizzard << 16) + (100 - this.fire << 8) + (100 - this.physical)
				ret += '\tWriteInt(Sys3+0x' + elementalAddress.toString(16).toUpperCase() + ',0x'
				ret += temp.toString(16).toUpperCase().padStart(8, '0') + ')'
				if (isCommented)
					ret += ' -- Thunder:' + this.thunder + '% Blizzard:' + this.blizzard + '% Fire:' + this.fire + '% Physical:' + this.physical + '%'
				ret += '\n'
			}
			if (this.isOtherResistanceChanged()) {
				ret += '\tWriteInt(Sys3+0x' + otherAddress.toString(16).toUpperCase() + ',0x0'
				ret += ((100 - this.universal << 16) + (100 - this.light << 8) + (100 - this.dark)).toString(16).toUpperCase().padStart(8, '0') + ')'
				if (isCommented) ret += ' -- Universal:' + this.universal + '% Light:' + this.light + '% Dark:' + this.dark + '%'
				ret += '\n'
			}
			if (ret === '') return ret
			return isCommented
				? '\t-- ' + this.name + '\n' + ret
				: ret
		}
		this.saveToYml = (isCommented) => {
			let ret = ''
			if (this.isReplaced()) {
				ret += '- Ability: ' + this.replacementAbility.index + '\n  '
				ret += 'AbilityPoints: ' + this.ap + '\n  '
				ret += 'Attack: ' + this.strength + '\n  '
				ret += 'DarkResistance: ' + (100 - this.dark) + '\n  '
				ret += 'Defense: ' + this.defense + '\n  '
				ret += 'FireResistance: ' + (100 - this.fire) + '\n  '
				ret += 'GeneralResistance: ' + (100 - this.universal) + '\n  '
				ret += 'IceResistance: ' + (100 - this.blizzard) + '\n  '
				ret += 'Id: ' + this.zipID + '\n  '
				ret += 'LightningResistance: ' + (100 - this.thunder) + '\n  '
				ret += 'Magic: ' + this.magic + '\n  '
				ret += 'Unknown: 0\n  '
				ret += 'Unknown08: ' + (100 - this.physical) + '\n  '
				ret += 'Unknown0d: ' + (100 - this.light) + '\n'
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
			equipmentType.equipments.forEach(equipment => { prev += equipment.saveToYml(isCommented) })
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
		let globalIndex = 0
		return equipmentsData.map(equipmentType => {
			if (globalIndex < equipmentLoadData.length) {
				if (equipmentLoadData[globalIndex].equipmentType === equipmentType.equipmentType) {
					let equipmentIndex = 0
					let newEquipments = equipmentType.equipments.map(equipment => {
						if (equipmentIndex < equipmentLoadData[globalIndex].equipments.length) {
							if (equipmentLoadData[globalIndex].equipments[equipmentIndex].name === equipment.name) {
								let ret = equipment.loadFromJSON(equipmentLoadData[globalIndex].equipments[equipmentIndex])
								equipmentIndex++
								return ret
							}
						}
						return equipment
					})
					globalIndex++
					return {
						...equipmentType,
						equipments: newEquipments
					}
				}
			}
			return equipmentType
		})
	}
}

export const equipmentsData = [{
	equipmentType: 'Keyblade',
	equipments: [
		new Equipment('Kingdom Key', new Reward('Damage Control', 0x21E, 'Ability'), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1D6, 80),
		new Equipment('Oathkeeper', new Reward('Form Boost', 0x18E, 'Ability'), 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1E6, 81),
		new Equipment('Oblivion', new Reward('Drive Boost', 0x18D, 'Ability'), 0, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1F6, 82),
		new Equipment('Star Seeker', new Reward('Air Combo Plus', 0x0A3, 'Ability'), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF466, 123),
		new Equipment('Hidden Dragon', new Reward('MP Rage', 0x19C, 'Ability'), 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF476, 124),
		new Equipment('Hero\'s Crest', new Reward('Air Combo Boost', 0x187, 'Ability'), 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4A6, 127),
		new Equipment('Monochrome', new Reward('Item Boost', 0x19B, 'Ability'), 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4B6, 128),
		new Equipment('Follow the Wind', new Reward('Draw', 0x195, 'Ability'), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4C6, 129),
		new Equipment('Circle of Life', new Reward('MP Haste', 0x19D, 'Ability'), 0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4D6, 130),
		new Equipment('Photon Debugger', new Reward('Thunder Boost', 0x19A, 'Ability'), 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4E6, 131),
		new Equipment('Gull Wing', new Reward('Experience Boost', 0x191, 'Ability'), 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4F6, 132),
		new Equipment('Rumbling Rose', new Reward('Finishing Plus', 0x189, 'Ability'), 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF506, 133),
		new Equipment('Guardian Soul', new Reward('Reaction Boost', 0x188, 'Ability'), 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF516, 134),
		new Equipment('Wishing Lamp', new Reward('Jackpot', 0x196, 'Ability'), 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF526, 135),
		new Equipment('Decisive Pumpkin', new Reward('Combo Boost', 0x186, 'Ability'), 0, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF536, 136),
		new Equipment('Sweet Memories', new Reward('Drive Converter', 0x21C, 'Ability'), 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF556, 138),
		new Equipment('Mysterious Abyss', new Reward('Blizzard Boost', 0x199, 'Ability'), 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF566, 139),
		new Equipment('Sleeping Lion', new Reward('Combo Plus', 0x0A2, 'Ability'), 0, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF546, 137),
		new Equipment('Bond of Flame', new Reward('Fire Boost', 0x198, 'Ability'), 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF586, 141),
		new Equipment('Fatal Crest', new Reward('Berserk Charge', 0x18B, 'Ability'), 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF576, 140),
		new Equipment('Two Become One', new Reward('Light & Darkness', 0x21D, 'Ability'), 0, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF5F6, 148),
		new Equipment('Fenrir', new Reward('Negative Combo', 0x18A, 'Ability'), 0, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF596, 142),
		new Equipment('Ultima Weapon', new Reward('MP Hastega', 0x1A6, 'Ability'), 0, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF5A6, 143),
		new Equipment('Winner\'s Proof', new Reward('No Experience', 0x194, 'Ability'), 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF606, 149),
		new Equipment('Kingdom Key D', new Reward('Defender', 0x19E, 'Ability'), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF3F6, 116),
		new Equipment('Alpha Weapon', new Reward('MP Hastera', 0x1A5, 'Ability'), 0, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF206, 83),
		new Equipment('Omega Weapon', new Reward('Air Combo Boost', 0x187, 'Ability'), 0, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF216, 84),
		new Equipment('Pureblood', new Reward('Damage Drive', 0x18C, 'Ability'), 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF226, 85),
		// new Equipment('Struggle Sword', new Reward('MP Hastera', 0x1A5, 'Ability'), 0, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF206, 122),
		// new Equipment('Struggle Hammer', new Reward('Air Combo Boost', 0x187, 'Ability'), 0, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF216, 145),
		// new Equipment('Struggle Wand', new Reward('Damage Drive', 0x18C, 'Ability'), 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF226, 144),
	]
}, {
	equipmentType: 'Donald Staff',
	equipments: [
		new Equipment('Mage\'s Staff', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF236, 86),
		new Equipment('Hammer Staff', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF246, 87),
		new Equipment('Victory Bell', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF256, 88),
		new Equipment('Comet Staff', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF276, 90),
		new Equipment('Lord\'s Broom', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF286, 91),
		new Equipment('Wisdom Wand', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF296, 92),
		new Equipment('Meteor Staff', new Reward('Thunder Boost', 0x19A, 'Ability'), 1, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF266, 89),
		new Equipment('Rising Dragon', new Reward('Fire Boost', 0x198, 'Ability'), 1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF2A6, 93),
		new Equipment('Shaman\'s Relic', new Reward('Blizzard Boost', 0x199, 'Ability'), 1, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF2C6, 95),
		new Equipment('Shaman\'s Relic+', new Reward('Defender', 0x19E, 'Ability'), 1, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF706, 165),
		new Equipment('Nobody Lance', new Reward('Item Boost', 0x19B, 'Ability'), 1, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF2B6, 94),
		new Equipment('Centurion', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 13, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF616, 150),
		new Equipment('Centurion+', new Reward('Damage Control', 0x21E, 'Ability'), 1, 13, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF626, 151),
		new Equipment('Save the Queen', new Reward('Hyper Healing', 0x1A3, 'Ability'), 1, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF486, 125),
		new Equipment('Save the Queen+', new Reward('MP Rage', 0x19C, 'Ability'), 1, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF5D6, 146),
		new Equipment('Plain Mushroom', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF636, 152),
		new Equipment('Plain Mushroom+', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF646, 153),
		new Equipment('Precious Mushroom', new Reward('MP Haste', 0x19D, 'Ability'), 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF656, 154),
		new Equipment('Precious Mushroom+', new Reward('MP Hastera', 0x1A5, 'Ability'), 1, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF666, 155),
		new Equipment('Premium Mushroom', new Reward('MP Hastega', 0x1A6, 'Ability'), 1, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF676, 156),
	]
}, {
	equipmentType: 'Goofy Shield',
	equipments: [
		new Equipment('Knight\'s Shield', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF2E6, 99),
		new Equipment('Adamant Shield', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF2F6, 100),
		new Equipment('Chain Gear', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF306, 101),
		new Equipment('Falling Star', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF326, 103),
		new Equipment('Dream Cloud', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF336, 104),
		new Equipment('Knight Defender', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF346, 105),
		new Equipment('Ogre Shield', new Reward('Defender', 0x19E, 'Ability'), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF316, 102),
		new Equipment('Genji Shield', new Reward('Hyper Healing', 0x1A3, 'Ability'), 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF356, 106),
		new Equipment('Akashic Record', new Reward('MP Haste', 0x19D, 'Ability'), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF366, 107),
		new Equipment('Akashic Record+', new Reward('MP Hastera', 0x1A5, 'Ability'), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF716, 166),
		new Equipment('Nobody Guard', new Reward('MP Rage', 0x19C, 'Ability'), 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF376, 108),
		new Equipment('Frozen Pride', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF686, 157),
		new Equipment('Frozen Pride+', new Reward('MP Hastega', 0x1A6, 'Ability'), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF696, 158),
		new Equipment('Save the King', new Reward('Item Boost', 0x19B, 'Ability'), 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF496, 126),
		new Equipment('Save the King+', new Reward('Damage Control', 0x21E, 'Ability'), 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF5E6, 147),
		new Equipment('Joyous Mushroom', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6A6, 159),
		new Equipment('Joyous Mushroom+', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6B6, 160),
		new Equipment('Majestic Mushroom', new Reward('Protect', 0x254, 'Ability'), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6C6, 161),
		new Equipment('Majestic Mushroom+', new Reward('Protectra', 0x255, 'Ability'), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6D6, 162),
		new Equipment('Ultimate Mushroom', new Reward('Protectga', 0x256, 'Ability'), 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6E6, 163),
	]
}, {
	equipmentType: 'Ally Weapon',
	equipments: [
		new Equipment('Sword of Ancestor', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF3C6, 113),
		new Equipment('Beast\'s Claw', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF406, 114),
		new Equipment('Battlefields of War', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF3B6, 112),
		new Equipment('Skill and Crossbones', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF436, 120),
		new Equipment('Scimitar', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF3A6, 111),
		new Equipment('Bone Fist', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF416, 118),
		new Equipment('Proud Fang', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF426, 119),
		new Equipment('Identity Disk', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF3E6, 115),
		new Equipment('Way to the Dawn', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF446, 121),
	]
}, {
	equipmentType: 'Armor',
	equipments: [
		new Equipment('Elven Bandana', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0x1CDEDB6, 0),
		new Equipment('Divine Bandana', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0x1CDEDC6, 1),
		new Equipment('Champion Belt', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 20, 20, 20, 0, 0, 0, 0, 0x1CDEF96, 36),
		new Equipment('Protect Belt', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0x1CDEDF6, 4),
		new Equipment('Gaia Belt', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 20, 20, 0, 0, 0, 0x1CDEE06, 5),
		new Equipment('Power Band', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0x1CDEDD6, 2),
		new Equipment('Buster Band', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0x1CDEDE6, 3),
		new Equipment('Cosmic Belt', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0x1CDEE16, 6),
		new Equipment('Fire Bangle', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 20, 0, 0, 0, 0, 0, 0, 0x1CDEE56, 12),
		new Equipment('Fira Bangle', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 20, 0, 0, 0, 0, 0, 0, 0x1CDEE66, 13),
		new Equipment('Firaga Bangle', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 20, 0, 0, 0, 0, 0, 0, 0x1CDEE76, 14),
		new Equipment('Firagun Bangle', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 25, 0, 0, 0, 0, 0, 0, 0x1CDEE86, 15),
		new Equipment('Blizzard Armlet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 0, 20, 0, 0, 0, 0, 0, 0x1CDEE96, 17),
		new Equipment('Blizzara Armlet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 0, 20, 0, 0, 0, 0, 0, 0x1CDEEA6, 18),
		new Equipment('Blizzaga Armlet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 20, 0, 0, 0, 0, 0, 0x1CDEEB6, 19),
		new Equipment('Blizzagun Armlet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 25, 0, 0, 0, 0, 0, 0x1CDEEC6, 20),
		new Equipment('Thunder Trinket', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 0, 0, 20, 0, 0, 0, 0, 0x1CDEED6, 22),
		new Equipment('Thundara Trinket', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 0, 0, 20, 0, 0, 0, 0, 0x1CDEEE6, 23),
		new Equipment('Thundaga Trinket', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 20, 0, 0, 0, 0, 0x1CDEEF6, 24),
		new Equipment('Thundagun Trinket', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 25, 0, 0, 0, 0, 0x1CDEF06, 25),
		new Equipment('Shock Charm', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 40, 0, 0, 0, 0, 0x1CDEE26, 7),
		new Equipment('Shock Charm+', new Reward('Thunder Boost', 0x19A, 'Ability'), 4, 0, 0, 0, 3, 0, 0, 40, 0, 0, 0, 0, 0x1CDEE36, 8),
		new Equipment('Shadow Anklet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 0, 0, 0, 20, 0, 0, 0, 0x1CDEF16, 27),
		new Equipment('Dark Anklet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 0, 0, 0, 20, 0, 0, 0, 0x1CDEF26, 28),
		new Equipment('Midnight Anklet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 0, 20, 0, 0, 0, 0x1CDEF36, 29),
		new Equipment('Chaos Anklet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 0, 25, 0, 0, 0, 0x1CDEF46, 30),
		new Equipment('Abas Chain', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 20, 20, 20, 0, 0, 0, 0, 0x1CDEF56, 32),
		new Equipment('Aegis Chain', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 20, 20, 20, 0, 0, 0, 0, 0x1CDEF66, 33),
		new Equipment('Acrisius', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 20, 20, 20, 0, 0, 0, 0, 0x1CDEF76, 34),
		new Equipment('Acrisius+', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 25, 25, 25, 0, 0, 0, 0, 0x1CDEFB6, 38),
		new Equipment('Cosmic Chain', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 30, 30, 30, 0, 0, 0, 0, 0x1CDEFC6, 39),
		new Equipment('Petit Ribbon', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 4, 10, 10, 10, 10, 0, 0, 10, 0x1CDEFA6, 37),
		new Equipment('Ribbon', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 4, 15, 15, 15, 15, 0, 0, 15, 0x1CDEF86, 35),
		new Equipment('Grand Ribbon', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 4, 25, 25, 25, 25, 0, 0, 25, 0x1CDEE46, 9),
	]
}, {
	equipmentType: 'Accessory',
	equipments: [
		new Equipment('Ability Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDEFD6, 48),
		new Equipment('Engineer\'s Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDEFE6, 49),
		new Equipment('Technician\'s Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDEFF6, 50),
		new Equipment('Skill Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0E6, 65),
		new Equipment('Skillful Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0F6, 66),
		new Equipment('Expert\'s Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF006, 51),
		new Equipment('Master\'s Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0B6, 62),
		new Equipment('Cosmic Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF146, 71),
		new Equipment('Executive\'s Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6F6, 164),
		new Equipment('Sardonyx Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF016, 52),
		new Equipment('Tourmaline Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF026, 53),
		new Equipment('Aquamarine Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF036, 54),
		new Equipment('Garnet Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF046, 55),
		new Equipment('Diamond Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF056, 56),
		new Equipment('Silver Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF066, 57),
		new Equipment('Gold Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF076, 58),
		new Equipment('Platinum Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF086, 59),
		new Equipment('Mythril Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF096, 60),
		new Equipment('Orichalcum Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0A6, 61),
		new Equipment('Soldier Earring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF106, 67),
		new Equipment('Fencer Earring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 2, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF116, 68),
		new Equipment('Mage Earring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF126, 69),
		new Equipment('Slayer Earring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF136, 70),
		new Equipment('Medal', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF156, 72),
		new Equipment('Moon Amulet', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0C6, 63),
		new Equipment('Star Charm', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0D6, 64),
		new Equipment('Cosmic Arts', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF166, 73),
		new Equipment('Shadow Archive', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF176, 74),
		new Equipment('Shadow Archive+', new Reward('MP Rage', 0x19C, 'Ability'), 5, 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF186, 75),
		new Equipment('Full Bloom', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1A6, 77),
		new Equipment('Full Bloom+', new Reward('MP Haste', 0x19D, 'Ability'), 5, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1C6, 79),
		new Equipment('Draw Ring', new Reward('Draw', 0x195, 'Ability'), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1B6, 78),
		new Equipment('Lucky Ring', new Reward('Lucky Lucky', 0x197, 'Ability'), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF196, 76),
	],
}]