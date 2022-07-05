import { Reward } from '../rewards/RewardsData'

export class Equipment {
	constructor(name, vanilla, equipmentType, strength, magic, ap, defense, fire, blizzard, thunder, dark, physical, light, universal, address) {
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
				this.vanillaPhysical, this.vanillaLight, this.vanillaUniversal, this.baseAddress)
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
					'blizzard', 'thunder', 'dark', 'physical', 'light', 'universal']) + ','
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
	}
}

export const equipmentsData = [{
	equipmentType: 'Keyblade',
	equipments: [
		new Equipment('Kingdom Key', new Reward('Damage Control', 0x21E, 'Ability'), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1D6),
		new Equipment('Oathkeeper', new Reward('Form Boost', 0x18E, 'Ability'), 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1E6),
		new Equipment('Oblivion', new Reward('Drive Boost', 0x18D, 'Ability'), 0, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1F6),
		new Equipment('Star Seeker', new Reward('Air Combo Plus', 0x0A3, 'Ability'), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF466),
		new Equipment('Hidden Dragon', new Reward('MP Rage', 0x19C, 'Ability'), 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF476),
		new Equipment('Hero\'s Crest', new Reward('Air Combo Boost', 0x187, 'Ability'), 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4A6),
		new Equipment('Monochrome', new Reward('Item Boost', 0x19B, 'Ability'), 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4B6),
		new Equipment('Follow the Wind', new Reward('Draw', 0x195, 'Ability'), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4C6),
		new Equipment('Circle of Life', new Reward('MP Haste', 0x19D, 'Ability'), 0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4D6),
		new Equipment('Photon Debugger', new Reward('Thunder Boost', 0x19A, 'Ability'), 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4E6),
		new Equipment('Gull Wing', new Reward('Experience Boost', 0x191, 'Ability'), 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF4F6),
		new Equipment('Rumbling Rose', new Reward('Finishing Plus', 0x189, 'Ability'), 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF506),
		new Equipment('Guardian Soul', new Reward('Reaction Boost', 0x188, 'Ability'), 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF516),
		new Equipment('Wishing Lamp', new Reward('Jackpot', 0x196, 'Ability'), 0, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF526),
		new Equipment('Decisive Pumpkin', new Reward('Combo Boost', 0x186, 'Ability'), 0, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF536),
		new Equipment('Sweet Memories', new Reward('Drive Converter', 0x21C, 'Ability'), 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF556),
		new Equipment('Mysterious Abyss', new Reward('Blizzard Boost', 0x199, 'Ability'), 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF566),
		new Equipment('Sleeping Lion', new Reward('Combo Plus', 0x0A2, 'Ability'), 0, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF546),
		new Equipment('Bond of Flame', new Reward('Fire Boost', 0x198, 'Ability'), 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF586),
		new Equipment('Fatal Crest', new Reward('Berserk Charge', 0x18B, 'Ability'), 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF576),
		new Equipment('Two Become One', new Reward('Light & Darkness', 0x21D, 'Ability'), 0, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF5F6),
		new Equipment('Fenrir', new Reward('Negative Combo', 0x18A, 'Ability'), 0, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF596),
		new Equipment('Ultima Weapon', new Reward('MP Hastega', 0x1A6, 'Ability'), 0, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF5A6),
		new Equipment('Winner\'s Proof', new Reward('No Experience', 0x194, 'Ability'), 0, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF606),
		new Equipment('Kingdom Key D', new Reward('Defender', 0x19E, 'Ability'), 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF3F6),
		new Equipment('Alpha Weapon', new Reward('MP Hastera', 0x1A5, 'Ability'), 0, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF206),
		new Equipment('Omega Weapon', new Reward('Air Combo Boost', 0x187, 'Ability'), 0, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF216),
		new Equipment('Pureblood', new Reward('Damage Drive', 0x18C, 'Ability'), 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF226),
		// new Equipment('Struggle Sword', new Reward('MP Hastera', 0x1A5, 'Ability'), 0, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF206),
		// new Equipment('Struggle Hammer', new Reward('Air Combo Boost', 0x187, 'Ability'), 0, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF216),
		// new Equipment('Struggle Wand', new Reward('Damage Drive', 0x18C, 'Ability'), 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF226)
	]
}, {
	equipmentType: 'Donald Staff',
	equipments: [
		new Equipment('Mage\'s Staff', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF236),
		new Equipment('Hammer Staff', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF246),
		new Equipment('Victory Bell', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF256),
		new Equipment('Comet Staff', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF276),
		new Equipment('Lord\'s Broom', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF286),
		new Equipment('Wisdom Wand', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF296),
		new Equipment('Meteor Staff', new Reward('Thunder Boost', 0x19A, 'Ability'), 1, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF266),
		new Equipment('Rising Dragon', new Reward('Fire Boost', 0x198, 'Ability'), 1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF2A6),
		new Equipment('Shaman\'s Relic', new Reward('Blizzard Boost', 0x199, 'Ability'), 1, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF2C6),
		new Equipment('Shaman\'s Relic+', new Reward('Defender', 0x19E, 'Ability'), 1, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF706),
		new Equipment('Nobody Lance', new Reward('Item Boost', 0x19B, 'Ability'), 1, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF2B6),
		new Equipment('Centurion', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 13, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF616),
		new Equipment('Centurion+', new Reward('Damage Control', 0x21E, 'Ability'), 1, 13, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF626),
		new Equipment('Save the Queen', new Reward('Hyper Healing', 0x1A3, 'Ability'), 1, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF486),
		new Equipment('Save the Queen+', new Reward('MP Rage', 0x19C, 'Ability'), 1, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF5D6),
		new Equipment('Plain Mushroom', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF636),
		new Equipment('Plain Mushroom+', new Reward('EMPTY', 0x000, 'EMPTY'), 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF646),
		new Equipment('Precious Mushroom', new Reward('MP Haste', 0x19D, 'Ability'), 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF656),
		new Equipment('Precious Mushroom+', new Reward('MP Hastera', 0x1A5, 'Ability'), 1, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF666),
		new Equipment('Premium Mushroom', new Reward('MP Hastega', 0x1A6, 'Ability'), 1, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF676)
	]
}, {
	equipmentType: 'Goofy Shield',
	equipments: [
		new Equipment('Knight\'s Shield', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF2E6),
		new Equipment('Adamant Shield', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF2F6),
		new Equipment('Chain Gear', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF306),
		new Equipment('Falling Star', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF326),
		new Equipment('Dream Cloud', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF336),
		new Equipment('Knight Defender', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF346),
		new Equipment('Ogre Shield', new Reward('Defender', 0x19E, 'Ability'), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF316),
		new Equipment('Genji Shield', new Reward('Hyper Healing', 0x1A3, 'Ability'), 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF356),
		new Equipment('Akashic Record', new Reward('MP Haste', 0x19D, 'Ability'), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF366),
		new Equipment('Akashic Record+', new Reward('MP Hastera', 0x1A5, 'Ability'), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF716),
		new Equipment('Nobody Guard', new Reward('MP Rage', 0x19C, 'Ability'), 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF376),
		new Equipment('Frozen Pride', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF686),
		new Equipment('Frozen Pride+', new Reward('MP Hastega', 0x1A6, 'Ability'), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF696),
		new Equipment('Save the King', new Reward('Item Boost', 0x19B, 'Ability'), 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF496),
		new Equipment('Save the King+', new Reward('Damage Control', 0x21E, 'Ability'), 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF5E6),
		new Equipment('Joyous Mushroom', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6A6),
		new Equipment('Joyous Mushroom+', new Reward('EMPTY', 0x000, 'EMPTY'), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6B6),
		new Equipment('Majestic Mushroom', new Reward('Protect', 0x254, 'Ability'), 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6C6),
		new Equipment('Majestic Mushroom+', new Reward('Protectra', 0x255, 'Ability'), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6D6),
		new Equipment('Ultimate Mushroom', new Reward('Protectga', 0x256, 'Ability'), 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6E6)
	]
}, {
	equipmentType: 'Ally Weapon',
	equipments: [
		new Equipment('Sword of Ancestor', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF3C6),
		new Equipment('Beast\'s Claw', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF406),
		new Equipment('Battlefields of War', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF3B6),
		new Equipment('Skill and Crossbones', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF436),
		new Equipment('Scimitar', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF3A6),
		new Equipment('Bone Fist', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF416),
		new Equipment('Proud Fang', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF426),
		new Equipment('Identity Disk', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF3E6),
		new Equipment('Way to the Dawn', new Reward('EMPTY', 0x000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF446)
	]
}, {
	equipmentType: 'Armor',
	equipments: [
		new Equipment('Elven Bandana', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0x1CDEDB6),
		new Equipment('Divine Bandana', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0x1CDEDC6),
		new Equipment('Champion Belt', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 0, 20, 20, 20, 0, 0, 0, 0, 0x1CDEF96),
		new Equipment('Protect Belt', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0x1CDEDF6),
		new Equipment('Gaia Belt', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 20, 20, 0, 0, 0, 0x1CDEE06),
		new Equipment('Power Band', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0x1CDEDD6),
		new Equipment('Buster Band', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0x1CDEDE6),
		new Equipment('Cosmic Belt', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0x1CDEE16),
		new Equipment('Fire Bangle', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 20, 0, 0, 0, 0, 0, 0, 0x1CDEE56),
		new Equipment('Fira Bangle', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 20, 0, 0, 0, 0, 0, 0, 0x1CDEE66),
		new Equipment('Firaga Bangle', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 20, 0, 0, 0, 0, 0, 0, 0x1CDEE76),
		new Equipment('Firagun Bangle', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 25, 0, 0, 0, 0, 0, 0, 0x1CDEE86),
		new Equipment('Blizzard Armlet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 0, 20, 0, 0, 0, 0, 0, 0x1CDEE96),
		new Equipment('Blizzara Armlet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 0, 20, 0, 0, 0, 0, 0, 0x1CDEEA6),
		new Equipment('Blizzaga Armlet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 20, 0, 0, 0, 0, 0, 0x1CDEEB6),
		new Equipment('Blizzagun Armlet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 25, 0, 0, 0, 0, 0, 0x1CDEEC6),
		new Equipment('Thunder Trinket', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 0, 0, 20, 0, 0, 0, 0, 0x1CDEED6),
		new Equipment('Thundara Trinket', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 0, 0, 20, 0, 0, 0, 0, 0x1CDEEE6),
		new Equipment('Thundaga Trinket', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 20, 0, 0, 0, 0, 0x1CDEEF6),
		new Equipment('Thundagun Trinket', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 25, 0, 0, 0, 0, 0x1CDEF06),
		new Equipment('Shock Charm', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 40, 0, 0, 0, 0, 0x1CDEE26),
		new Equipment('Shock Charm+', new Reward('Thunder Boost', 0x19A, 'Ability'), 5, 0, 0, 0, 3, 0, 0, 40, 0, 0, 0, 0, 0x1CDEE36),
		new Equipment('Shadow Anklet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 0, 0, 0, 20, 0, 0, 0, 0x1CDEF16),
		new Equipment('Dark Anklet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 0, 0, 0, 20, 0, 0, 0, 0x1CDEF26),
		new Equipment('Midnight Anklet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 0, 20, 0, 0, 0, 0x1CDEF36),
		new Equipment('Chaos Anklet', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 0, 0, 0, 25, 0, 0, 0, 0x1CDEF46),
		new Equipment('Abas Chain', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 1, 20, 20, 20, 0, 0, 0, 0, 0x1CDEF56),
		new Equipment('Aegis Chain', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 2, 20, 20, 20, 0, 0, 0, 0, 0x1CDEF66),
		new Equipment('Acrisius', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 20, 20, 20, 0, 0, 0, 0, 0x1CDEF76),
		new Equipment('Acrisius+', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 25, 25, 25, 0, 0, 0, 0, 0x1CDEFB6),
		new Equipment('Cosmic Chain', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 3, 30, 30, 30, 0, 0, 0, 0, 0x1CDEFC6),
		new Equipment('Petit Ribbon', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 4, 10, 10, 10, 10, 0, 0, 10, 0x1CDEFA6),
		new Equipment('Ribbon', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 4, 15, 15, 15, 15, 0, 0, 15, 0x1CDEF86),
		new Equipment('Grand Ribbon', new Reward('EMPTY', 0x000, 'EMPTY'), 4, 0, 0, 0, 4, 25, 25, 25, 25, 0, 0, 25, 0x1CDEE46)
	]
}, {
	equipmentType: 'Accessory',
	equipments: [
		new Equipment('Ability Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDEFD6),
		new Equipment('Engineer\'s Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDEFE6),
		new Equipment('Technician\'s Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDEFF6),
		new Equipment('Skill Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0E6),
		new Equipment('Skillful Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0F6),
		new Equipment('Expert\'s Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF006),
		new Equipment('Master\'s Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0B6),
		new Equipment('Cosmic Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF146),
		new Equipment('Executive\'s Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF6F6),
		new Equipment('Sardonyx Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF016),
		new Equipment('Tourmaline Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF026),
		new Equipment('Aquamarine Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF036),
		new Equipment('Garnet Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF046),
		new Equipment('Diamond Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF056),
		new Equipment('Silver Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF066),
		new Equipment('Gold Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF076),
		new Equipment('Platinum Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF086),
		new Equipment('Mythril Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF096),
		new Equipment('Orichalcum Ring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0A6),
		new Equipment('Soldier Earring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF106),
		new Equipment('Fencer Earring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 2, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF116),
		new Equipment('Mage Earring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF126),
		new Equipment('Slayer Earring', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF136),
		new Equipment('Medal', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF156),
		new Equipment('Moon Amulet', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0C6),
		new Equipment('Star Charm', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF0D6),
		new Equipment('Cosmic Arts', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF166),
		new Equipment('Shadow Archive', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF176),
		new Equipment('Shadow Archive+', new Reward('MP Rage', 0x19C, 'Ability'), 5, 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF186),
		new Equipment('Full Bloom', new Reward('EMPTY', 0x000, 'EMPTY'), 5, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1A6),
		new Equipment('Full Bloom+', new Reward('MP Haste', 0x19D, 'Ability'), 5, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1C6),
		new Equipment('Draw Ring', new Reward('Draw', 0x195, 'Ability'), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF1B6),
		new Equipment('Lucky Ring', new Reward('Lucky Lucky', 0x197, 'Ability'), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x1CDF196)
	]
}]