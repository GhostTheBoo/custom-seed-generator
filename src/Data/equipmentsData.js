import { Reward } from './rewardsData'

export class Equipment {
	constructor(name, vanilla, strength, magic, ap, defense, fire, blizzard, thunder, dark, physical, light, universal, abilityAddress) {
		this.name = name
		this.vanillaAbility = { ...vanilla }
		this.replacementAbility = { ...vanilla }
		this.strength = strength
		this.vanillaStrength = strength
		this.magic = magic
		this.vanillaMagic = magic
		this.ap = ap
		this.vanillaAP = ap
		this.defense = defense
		this.vanillaDefense = defense
		this.fireResistance = fire
		this.vanillaFireResistance = fire
		this.blizzardResistance = blizzard
		this.vanillaBlizzardResistance = blizzard
		this.thunderResistance = thunder
		this.vanillaThunderResistance = thunder
		this.darkResistance = dark
		this.vanillaDarkResistance = dark
		this.physicalResistance = physical
		this.vanillaPhysicalResistance = physical
		this.lightResistance = light
		this.vanillaLightResistance = light
		this.universalResistance = universal
		this.vanillaUniversalResistance = universal
		this.abilityAddress = abilityAddress
		this.statAddress = this.abilityAddress + 0x10000002
		this.elementalResistanceAddress = this.statAddress + 4
		this.otherResistanceAddress = this.elementalResistanceAddress + 4
		this.toBeReplaced = false
		this.additionalLineCount = 0

		this.isAbilityReplaced = () => {
			return this.vanillaAbility.index !== this.replacementAbility.index
		}
		this.isStatsReplaced = () => {
			return this.strength !== this.vanillaStrength || this.magic !== this.vanillaMagic || this.defense !== this.vanillaDefense || this.ap !== this.vanillaAP
		}
		this.isElementalResistanceChanged = () => {
			return this.fireResistance !== this.vanillaFireResistance || this.blizzardResistance !== this.vanillaBlizzardResistance ||
				this.thunderResistance !== this.vanillaThunderResistance || this.physicalResistance !== this.vanillaPhysicalResistance
		}
		this.isOtherResistanceChanged = () => {
			return this.darkResistance !== this.vanillaDarkResistance || this.lightResistance !== this.vanillaLightResistance || this.universalResistance !== this.vanillaUniversalResistance
		}
		this.copy = () => {
			let ret = new Equipment(this.name, new Reward(this.vanillaAbility.reward, this.vanillaAbility.index, this.vanillaAbility.iconType), this.strength, this.magic, this.ap, this.defense,
				this.fireResistance, this.blizzardResistance, this.thunderResistance, this.darkResistance, this.physicalResistance, this.lightResistance, this.universalResistance,
				this.abilityAddress)

			ret.replacementAbility = this.replacementAbility
			ret.strength = this.strength
			ret.magic = this.magic
			ret.ap = this.ap
			ret.defense = this.defense
			ret.fireResistance = this.fireResistance
			ret.blizzardResistance = this.blizzardResistance
			ret.thunderResistance = this.thunderResistance
			ret.darkResistance = this.darkResistance
			ret.physicalResistance = this.physicalResistance
			ret.lightResistance = this.lightResistance
			ret.universalResistance = this.universalResistance
			ret.toBeReplaced = this.toBeReplaced
			ret.additionalLineCount = this.additionalLineCount

			return ret
		}
		this.vanilla = () => {
			return new Equipment(this.name, new Reward(this.vanillaAbility.reward, this.vanillaAbility.index, this.vanillaAbility.iconType), this.strength, this.magic, this.ap, this.defense,
				this.fireResistance, this.blizzardResistance, this.thunderResistance, this.darkResistance, this.physicalResistance, this.lightResistance, this.universalResistance,
				this.abilityAddress)
		}
		this.replace = (newEquipmentData) => {
			let ret = this.copy()
			let newLineCount = 0

			if (newEquipmentData.currentStrength !== ret.vanillaStrength || newEquipmentData.currentMagic !== ret.vanillaMagic ||
				newEquipmentData.currentDefense !== ret.vanillaDefense || newEquipmentData.currentAP !== ret.vanillaAP) {
				if (newEquipmentData.currentEquipmentType !== 5) {
					if (newEquipmentData.currentAP !== 0)
						newLineCount++
				}
				if (newEquipmentData.currentEquipmentType !== 4) {
					if (newEquipmentData.currentDefense !== 0)
						newLineCount++
				} else {
					if (newEquipmentData.currentStrength !== 0)
						newLineCount++
					if (newEquipmentData.currentMagic !== 0)
						newLineCount++
				}
			}

			if (newEquipmentData.currentEquipmentType !== 4) {
				if (newEquipmentData.currentFire !== 0)
					newLineCount++
				if (newEquipmentData.currentBlizzard !== 0)
					newLineCount++
				if (newEquipmentData.currentThunder !== 0)
					newLineCount++
				if (newEquipmentData.currentDark !== 0)
					newLineCount++
			}

			ret.replacementAbility = { ...newEquipmentData.ability }
			ret.strength = newEquipmentData.currentStrength
			ret.magic = newEquipmentData.currentMagic
			ret.ap = newEquipmentData.currentAP
			ret.defense = newEquipmentData.currentDefense
			ret.fireResistance = newEquipmentData.currentFire
			ret.blizzardResistance = newEquipmentData.currentBlizzard
			ret.thunderResistance = newEquipmentData.currentThunder
			ret.physicalResistance = newEquipmentData.currentPhysical
			ret.darkResistance = newEquipmentData.currentDark
			ret.lightResistance = newEquipmentData.currentLight
			ret.universalResistance = newEquipmentData.currentUniversal
			ret.additionalLineCount = newLineCount
			ret.toBeReplaced = false
			return ret
		}
		this.markForReplacement = (toBeReplaced) => {
			let ret = this.copy()
			ret.toBeReplaced = toBeReplaced
			return ret
		}
		this.saveToJSON = () => {
			return (this.isAbilityReplaced() || this.isStatsReplaced() || this.isElementalResistanceChanged() || this.isOtherResistanceChanged())
				? JSON.stringify(this, ['name', 'replacementAbility', 'reward', 'index', 'iconType', 'ap', 'defense', 'magic', 'strength', 'fireResistance', 'additionalLineCount',
					'blizzardResistance', 'thunderResistance', 'darkResistance', 'physicalResistance', 'lightResistance', 'universalResistance']) + ','
				: ''
		}
		this.loadFromJSON = (equipmentJSON) => {
			let ret = this.copy()

			ret.replacementAbility = { ...equipmentJSON.replacementAbility }
			ret.strength = equipmentJSON.strength
			ret.magic = equipmentJSON.magic
			ret.ap = equipmentJSON.ap
			ret.defense = equipmentJSON.defense
			ret.fireResistance = equipmentJSON.fireResistance
			ret.blizzardResistance = equipmentJSON.blizzardResistance
			ret.thunderResistance = equipmentJSON.thunderResistance
			ret.physicalResistance = equipmentJSON.physicalResistance
			ret.darkResistance = equipmentJSON.darkResistance
			ret.lightResistance = equipmentJSON.lightResistance
			ret.universalResistance = equipmentJSON.universalResistance
			ret.additionalLineCount = equipmentJSON.additionalLineCount
			ret.toBeReplaced = false

			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ''

			if (this.isAbilityReplaced()) {
				ret += 'patch=1,EE,' + this.abilityAddress.toString(16).toUpperCase().padStart(8, '0') + ',extended,0000'
				ret += this.replacementAbility.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented)
					ret += ' // Ability: ' + this.replacementAbility.reward
				ret += '\n'
			}
			if (this.isStatsReplaced()) {
				ret += 'patch=1,EE,' + this.statAddress.toString(16).toUpperCase().padStart(8, 0) + ',extended,'
				ret += this.ap.toString(16).toUpperCase().padStart(2, '0') + this.defense.toString(16).toUpperCase().padStart(2, '0')
				ret += this.magic.toString(16).toUpperCase().padStart(2, '0') + this.strength.toString(16).toUpperCase().padStart(2, '0')
				if (isCommented)
					ret += ' // AP:' + this.ap + ' Defense:' + this.defense + ' Magic:' + this.magic + ' Strength:' + this.strength
				ret += '\n'
			}
			if (this.isElementalResistanceChanged()) {
				ret += 'patch=1,EE,' + this.elementalResistanceAddress.toString(16).toUpperCase().padStart(8, 0) + ',extended,'
				ret += (100 - this.thunderResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - this.blizzardResistance).toString(16).toUpperCase().padStart(2, '0')
				ret += (100 - this.fireResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - this.physicalResistance).toString(16).toUpperCase().padStart(2, '0')
				if (isCommented)
					ret += ' // Thunder:' + this.thunderResistance + '% Blizzard:' + this.blizzardResistance + '% Fire:' + this.fireResistance + '% Physical:' + this.physicalResistance + '%'
				ret += '\n'
			}
			if (this.isOtherResistanceChanged()) {
				ret += 'patch=1,EE,' + this.otherResistanceAddress.toString(16).toUpperCase().padStart(8, 0) + ',extended,00'
				ret += (100 - this.universalResistance).toString(16).toUpperCase().padStart(2, '0')
				ret += (100 - this.lightResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - this.darkResistance).toString(16).toUpperCase().padStart(2, '0')
				if (isCommented)
					ret += ' // Universal:' + this.universalResistance + '% Light:' + this.lightResistance + '% Dark:' + this.darkResistance + '%'
				ret += '\n'
			}
			if (ret === '') return ret
			return isCommented
				? '// ' + this.name + '\n' + ret
				: ret
		}
	}
}

export const equipmentsData = [{
	equipmentType: 'Keyblade',
	equipments: [
		new Equipment('Kingdom Key', new Reward('Damage Control', 0x021E, 'Ability'), 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1D6),
		new Equipment('Oathkeeper', new Reward('Form Boost', 0x018E, 'Ability'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1E6),
		new Equipment('Oblivion', new Reward('Drive Boost', 0x018D, 'Ability'), 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1F6),
		new Equipment('Star Seeker', new Reward('Air Combo Plus', 0x00A3, 'Ability'), 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF466),
		new Equipment('Hidden Dragon', new Reward('MP Rage', 0x019C, 'Ability'), 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF476),
		new Equipment('Hero\'s Crest', new Reward('Air Combo Boost', 0x0187, 'Ability'), 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4A6),
		new Equipment('Monochrome', new Reward('Item Boost', 0x019B, 'Ability'), 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4B6),
		new Equipment('Follow the Wind', new Reward('Draw', 0x0195, 'Ability'), 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4C6),
		new Equipment('Circle of Life', new Reward('MP Haste', 0x019D, 'Ability'), 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4D6),
		new Equipment('Photon Debugger', new Reward('Thunder Boost', 0x019A, 'Ability'), 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4E6),
		new Equipment('Gull Wing', new Reward('Experience Boost', 0x0191, 'Ability'), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4F6),
		new Equipment('Rumbling Rose', new Reward('Finishing Plus', 0x0189, 'Ability'), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF506),
		new Equipment('Guardian Soul', new Reward('Reaction Boost', 0x0188, 'Ability'), 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF516),
		new Equipment('Wishing Lamp', new Reward('Jackpot', 0x0196, 'Ability'), 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF526),
		new Equipment('Decisive Pumpkin', new Reward('Combo Boost', 0x0186, 'Ability'), 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF536),
		new Equipment('Sweet Memories', new Reward('Drive Converter', 0x021C, 'Ability'), 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF556),
		new Equipment('Mysterious Abyss', new Reward('Blizzard Boost', 0x0199, 'Ability'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF566),
		new Equipment('Sleeping Lion', new Reward('Combo Plus', 0x00A2, 'Ability'), 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF546),
		new Equipment('Bond of Flame', new Reward('Fire Boost', 0x0198, 'Ability'), 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF586),
		new Equipment('Fatal Crest', new Reward('Berserk Charge', 0x018B, 'Ability'), 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF576),
		new Equipment('Two Become One', new Reward('Light & Darkness', 0x021D, 'Ability'), 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF5F6),
		new Equipment('Fenrir', new Reward('Negative Combo', 0x018A, 'Ability'), 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF596),
		new Equipment('Ultima Weapon', new Reward('MP Hastega', 0x01A6, 'Ability'), 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF5A6),
		new Equipment('Winner\'s Proof', new Reward('No Experience', 0x0194, 'Ability'), 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF606),
		new Equipment('FAKE', new Reward('Defender', 0x019E, 'Ability'), 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF3F6),
		new Equipment('Detection Saber', new Reward('Scan', 0x008A, 'Ability'), 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF206),
		new Equipment('Edge of Ultima', new Reward('MP Hastera', 0x01A5, 'Ability'), 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF216)
	]
}, {
	equipmentType: 'Donald Staff',
	equipments: [
		new Equipment('Mage\'s Staff', new Reward('EMPTY', 0x0000, 'EMPTY'), 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF236),
		new Equipment('Hammer Staff', new Reward('EMPTY', 0x0000, 'EMPTY'), 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF246),
		new Equipment('Victory Bell', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF256),
		new Equipment('Comet Staff', new Reward('EMPTY', 0x0000, 'EMPTY'), 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF276),
		new Equipment('Lord\'s Broom', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF286),
		new Equipment('Wisdom Wand', new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF296),
		new Equipment('Meteor Staff', new Reward('Thunder Boost', 0x019A, 'Ability'), 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF266),
		new Equipment('Rising Dragon', new Reward('Fire Boost', 0x0198, 'Ability'), 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF2A6),
		new Equipment('Shaman\'s Relic', new Reward('Blizzard Boost', 0x0199, 'Ability'), 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF2C6),
		new Equipment('Shaman\'s Relic+', new Reward('Defender', 0x019E, 'Ability'), 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF706),
		new Equipment('Nobody Lance', new Reward('Item Boost', 0x019B, 'Ability'), 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF2B6),
		new Equipment('Centurion', new Reward('EMPTY', 0x0000, 'EMPTY'), 13, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF616),
		new Equipment('Centurion+', new Reward('Damage Control', 0x021E, 'Ability'), 13, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF626),
		new Equipment('Save the Queen', new Reward('Hyper Healing', 0x01A3, 'Ability'), 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF486),
		new Equipment('Save the Queen+', new Reward('MP Rage', 0x019C, 'Ability'), 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF5D6),
		new Equipment('Plain Mushroom', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF636),
		new Equipment('Plain Mushroom+', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF646),
		new Equipment('Precious Mushroom', new Reward('MP Haste', 0x019D, 'Ability'), 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF656),
		new Equipment('Precious Mushroom+', new Reward('MP Hastera', 0x01A5, 'Ability'), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF666),
		new Equipment('Premium Mushroom', new Reward('MP Hastega', 0x01A6, 'Ability'), 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF676)
	]
}, {
	equipmentType: 'Goofy Shield',
	equipments: [
		new Equipment('Knight\'s Shield', new Reward('EMPTY', 0x0000, 'EMPTY'), 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF2E6),
		new Equipment('Adamant Shield', new Reward('EMPTY', 0x0000, 'EMPTY'), 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF2F6),
		new Equipment('Chain Gear', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF306),
		new Equipment('Falling Star', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF326),
		new Equipment('Dream Cloud', new Reward('EMPTY', 0x0000, 'EMPTY'), 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF336),
		new Equipment('Knight Defender', new Reward('EMPTY', 0x0000, 'EMPTY'), 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF346),
		new Equipment('Ogre Shield', new Reward('Defender', 0x019E, 'Ability'), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF316),
		new Equipment('Genji Shield', new Reward('Hyper Healing', 0x01A3, 'Ability'), 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF356),
		new Equipment('Akashic Record', new Reward('MP Haste', 0x019D, 'Ability'), 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF366),
		new Equipment('Akashic Record+', new Reward('MP Hastera', 0x01A5, 'Ability'), 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF716),
		new Equipment('Nobody Guard', new Reward('MP Rage', 0x019C, 'Ability'), 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF376),
		new Equipment('Frozen Pride', new Reward('EMPTY', 0x0000, 'EMPTY'), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF686),
		new Equipment('Frozen Pride+', new Reward('MP Hastega', 0x01A6, 'Ability'), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF696),
		new Equipment('Save the King', new Reward('Item Boost', 0x019B, 'Ability'), 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF496),
		new Equipment('Save the King+', new Reward('Damage Control', 0x021E, 'Ability'), 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF5E6),
		new Equipment('Joyous Mushroom', new Reward('EMPTY', 0x0000, 'EMPTY'), 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6A6),
		new Equipment('Joyous Mushroom+', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6B6),
		new Equipment('Majestic Mushroom', new Reward('Protect', 0x0254, 'Ability'), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6C6),
		new Equipment('Majestic Mushroom+', new Reward('Protectra', 0x0255, 'Ability'), 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6D6),
		new Equipment('Ultimate Mushroom', new Reward('Protectga', 0x0256, 'Ability'), 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6E6)
	]
}, {
	equipmentType: 'Ally Weapon',
	equipments: [
		new Equipment('Sword of Ancestors (Ping/Mulan)', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF3C6),
		new Equipment('Beast\'s Claw (Beast)', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF406),
		new Equipment('Battlefields of War (Auron)', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF3B6),
		new Equipment('Skill and Crossbones (Jack Sparrow)', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF436),
		new Equipment('Scimitar (Aladdin)', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF3A6),
		new Equipment('Bone Fist (Jack)', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF416),
		new Equipment('Proud Fang (Simba)', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF426),
		new Equipment('Identity Disk (Tron)', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF3E6),
		new Equipment('Way to the Dawn (Riku)', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF446)
	]
}, {
	equipmentType: 'Armor',
	equipments: [
		new Equipment('Elven Bandana', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0x11CDEDB6),
		new Equipment('Divine Bandana', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0x11CDEDC6),
		new Equipment('Champion Belt', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 0, 20, 20, 20, 0, 0, 0, 0, 0x11CDEF96),
		new Equipment('Protect Belt', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0x11CDEDF6),
		new Equipment('Gaia Belt', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 0, 0, 20, 20, 0, 0, 0, 0x11CDEE06),
		new Equipment('Power Band', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0x11CDEDD6),
		new Equipment('Buster Band', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0x11CDEDE6),
		new Equipment('Cosmic Belt', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0x11CDEE16),
		new Equipment('Fire Bangle', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 20, 0, 0, 0, 0, 0, 0, 0x11CDEE56),
		new Equipment('Fira Bangle', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 2, 20, 0, 0, 0, 0, 0, 0, 0x11CDEE66),
		new Equipment('Firaga Bangle', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 20, 0, 0, 0, 0, 0, 0, 0x11CDEE76),
		new Equipment('Firagun Bangle', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 25, 0, 0, 0, 0, 0, 0, 0x11CDEE86),
		new Equipment('Blizzard Armlet', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 0, 20, 0, 0, 0, 0, 0, 0x11CDEE96),
		new Equipment('Blizzara Armlet', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 2, 0, 20, 0, 0, 0, 0, 0, 0x11CDEEA6),
		new Equipment('Blizzaga Armlet', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 0, 20, 0, 0, 0, 0, 0, 0x11CDEEB6),
		new Equipment('Blizzagun Armlet', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 0, 25, 0, 0, 0, 0, 0, 0x11CDEEC6),
		new Equipment('Thunder Trinket', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 0, 0, 20, 0, 0, 0, 0, 0x11CDEED6),
		new Equipment('Thundara Trinket', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 2, 0, 0, 20, 0, 0, 0, 0, 0x11CDEEE6),
		new Equipment('Thundaga Trinket', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 0, 0, 20, 0, 0, 0, 0, 0x11CDEEF6),
		new Equipment('Thundagun Trinket', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 0, 0, 25, 0, 0, 0, 0, 0x11CDEF06),
		new Equipment('Shock Charm', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 0, 0, 40, 0, 0, 0, 0, 0x11CDEE26),
		new Equipment('Shock Charm+', new Reward('Thunder Boost', 0x019A, 'Ability'), 0, 0, 0, 3, 0, 0, 40, 0, 0, 0, 0, 0x11CDEE36),
		new Equipment('Shadow Anklet', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 0, 0, 0, 20, 0, 0, 0, 0x11CDEF16),
		new Equipment('Dark Anklet', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 2, 0, 0, 0, 20, 0, 0, 0, 0x11CDEF26),
		new Equipment('Midnight Anklet', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 0, 0, 0, 20, 0, 0, 0, 0x11CDEF36),
		new Equipment('Chaos Anklet', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 0, 0, 0, 25, 0, 0, 0, 0x11CDEF46),
		new Equipment('Abas Chain', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 1, 20, 20, 20, 0, 0, 0, 0, 0x11CDEF56),
		new Equipment('Aegis Chain', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 2, 20, 20, 20, 0, 0, 0, 0, 0x11CDEF66),
		new Equipment('Acrisius', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 20, 20, 20, 0, 0, 0, 0, 0x11CDEF76),
		new Equipment('Acrisius+', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 25, 25, 25, 0, 0, 0, 0, 0x11CDEFB6),
		new Equipment('Cosmic Chain', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 3, 30, 30, 30, 0, 0, 0, 0, 0x11CDEFC6),
		new Equipment('Petit Ribbon', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 4, 10, 10, 10, 10, 0, 0, 10, 0x11CDEFA6),
		new Equipment('Ribbon', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 4, 15, 15, 15, 15, 0, 0, 15, 0x11CDEF86),
		new Equipment('Grand Ribbon', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 0, 4, 25, 25, 25, 25, 0, 0, 25, 0x11CDEE46)
	]
}, {
	equipmentType: 'Accessory',
	equipments: [
		new Equipment('Ability Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDEFD6),
		new Equipment('Engineer\'s Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDEFE6),
		new Equipment('Technician\'s Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDEFF6),
		new Equipment('Skill Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0E6),
		new Equipment('Skillful Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0F6),
		new Equipment('Expert\'s Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF006),
		new Equipment('Master\'s Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0B6),
		new Equipment('Cosmic Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF146),
		new Equipment('Executive\'s Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6F6),
		new Equipment('Sardonyx Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF016),
		new Equipment('Tourmaline Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF026),
		new Equipment('Aquamarine Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF036),
		new Equipment('Garnet Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF046),
		new Equipment('Diamond Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF056),
		new Equipment('Silver Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF066),
		new Equipment('Gold Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF076),
		new Equipment('Platinum Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF086),
		new Equipment('Mythril Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF096),
		new Equipment('Orichalcum Ring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0A6),
		new Equipment('Soldier Earring', new Reward('EMPTY', 0x0000, 'EMPTY'), 2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF106),
		new Equipment('Fencer Earring', new Reward('EMPTY', 0x0000, 'EMPTY'), 2, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF116),
		new Equipment('Mage Earring', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF126),
		new Equipment('Slayer Earring', new Reward('EMPTY', 0x0000, 'EMPTY'), 1, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF136),
		new Equipment('Medal', new Reward('EMPTY', 0x0000, 'EMPTY'), 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF156),
		new Equipment('Moon Amulet', new Reward('EMPTY', 0x0000, 'EMPTY'), 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0C6),
		new Equipment('Star Charm', new Reward('EMPTY', 0x0000, 'EMPTY'), 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0D6),
		new Equipment('Cosmic Arts', new Reward('EMPTY', 0x0000, 'EMPTY'), 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF166),
		new Equipment('Shadow Archive', new Reward('EMPTY', 0x0000, 'EMPTY'), 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF176),
		new Equipment('Shadow Archive+', new Reward('MP Rage', 0x019C, 'Ability'), 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF186),
		new Equipment('Full Bloom', new Reward('EMPTY', 0x0000, 'EMPTY'), 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1A6),
		new Equipment('Full Bloom+', new Reward('MP Haste', 0x019D, 'Ability'), 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1C6),
		new Equipment('Draw Ring', new Reward('Draw', 0x0195, 'Ability'), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1B6),
		new Equipment('Lucky Ring', new Reward('Lucky Lucky', 0x0197, 'Ability'), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF196)
	]
}]