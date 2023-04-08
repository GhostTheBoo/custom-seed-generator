import { Reward } from '../rewards/RewardsData'

export class Level {
	constructor(level, exp, address, ap, defense, magic, strength, sword, shield, staff) {
		this.level = level
		this.vanillaEXP = exp
		this.replacementEXP = exp
		this.baseAddress = address
		// this.statAddress = this.expAddress + 4
		// this.swordAddress = this.statAddress - 0xFFFFFFC
		// this.shieldAddress = this.swordAddress + 2
		// this.staffAddress = this.shieldAddress + 2
		this.vanillaAP = ap
		this.standardAP = ap
		this.vanillaDefense = defense
		this.defense = defense
		this.vanillaMagic = magic
		this.magic = magic
		this.vanillaStrength = strength
		this.strength = strength
		this.vanillaSwordReward = { ...sword }
		this.replacementSwordReward = { ...sword }
		this.vanillaShieldReward = { ...shield }
		this.replacementShieldReward = { ...shield }
		this.vanillaStaffReward = { ...staff }
		this.replacementStaffReward = { ...staff }
		this.toBeReplaced = false

		this.criticalAP = () => {
			return Math.floor((this.standardAP - 2) * 1.5)
		}
		this.isReplaced = () => {
			return this.isEXPReplaced() || this.isStatsReplaced() || this.isSwordReplaced() || this.isShieldReplaced() || this.isStaffReplaced()
		}
		this.isEXPReplaced = () => {
			return this.replacementEXP !== this.vanillaEXP
		}
		this.isStatsReplaced = () => {
			return this.standardAP !== this.vanillaAP || this.defense !== this.vanillaDefense || this.magic !== this.vanillaMagic || this.strength !== this.vanillaStrength
		}
		this.isSwordReplaced = () => {
			return this.replacementSwordReward.index !== this.vanillaSwordReward.index
		}
		this.isShieldReplaced = () => {
			return this.replacementShieldReward.index !== this.vanillaShieldReward.index
		}
		this.isStaffReplaced = () => {
			return this.replacementStaffReward.index !== this.vanillaStaffReward.index
		}
		this.copy = () => {
			let ret = this.vanilla()

			ret.replacementEXP = this.replacementEXP
			ret.standardAP = this.standardAP
			ret.defense = this.defense
			ret.magic = this.magic
			ret.strength = this.strength
			ret.replacementSwordReward = { ...this.replacementSwordReward }
			ret.replacementShieldReward = { ...this.replacementShieldReward }
			ret.replacementStaffReward = { ...this.replacementStaffReward }
			ret.toBeReplaced = this.toBeReplaced

			return ret
		}
		this.vanilla = () => {
			return new Level(this.level, this.vanillaEXP, this.baseAddress, this.vanillaAP, this.vanillaDefense, this.vanillaMagic, this.vanillaStrength,
				new Reward(this.vanillaSwordReward.reward, this.vanillaSwordReward.index, this.vanillaSwordReward.iconType),
				new Reward(this.vanillaShieldReward.reward, this.vanillaShieldReward.index, this.vanillaShieldReward.iconType),
				new Reward(this.vanillaStaffReward.reward, this.vanillaStaffReward.index, this.vanillaStaffReward.iconType))
		}
		this.replace = (newLevelData) => {
			let ret = this.copy()

			// ret.replacementEXP = newLevelData.currentEXPMultiplierValue === 0 ? newLevelData.currentEXP : Math.max(1, Math.floor((2 * this.vanillaEXP) / newLevelData.currentEXPMultiplierValue))
			ret.replacementEXP = newLevelData.currentEXP
			ret.standardAP = newLevelData.currentAP
			ret.defense = newLevelData.currentDefense
			ret.magic = newLevelData.currentMagic
			ret.strength = newLevelData.currentStrength
			ret.replacementSwordReward = { ...newLevelData.sword }
			ret.replacementShieldReward = { ...newLevelData.shield }
			ret.replacementStaffReward = { ...newLevelData.staff }
			ret.toBeReplaced = false

			return ret
		}
		this.saveToJSON = () => {
			return (this.isEXPReplaced() || this.isStatsReplaced() || this.isSwordReplaced() || this.isShieldReplaced() || this.isStaffReplaced())
				? JSON.stringify(this, ['level', 'replacementEXP', 'standardAP', 'defense', 'magic', 'strength',
					'replacementSwordReward', 'replacementShieldReward', 'replacementStaffReward', 'reward', 'index', 'iconType']) + ','
				: ''
		}
		this.loadFromJSON = (levelJSON) => {
			let ret = this.copy()

			ret.replacementEXP = levelJSON.replacementEXP
			ret.standardAP = levelJSON.standardAP
			ret.defense = levelJSON.defense
			ret.magic = levelJSON.magic
			ret.strength = levelJSON.strength
			ret.replacementSwordReward = { ...levelJSON.replacementSwordReward }
			ret.replacementShieldReward = { ...levelJSON.replacementShieldReward }
			ret.replacementStaffReward = { ...levelJSON.replacementStaffReward }
			ret.toBeReplaced = false

			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ''
			let expAddress = this.baseAddress
			let statAddress = this.baseAddress + 4
			let swordAddress = this.baseAddress + 8
			let shieldAddress = this.baseAddress + 10
			let staffAddress = this.baseAddress + 12

			if (this.level === 99) {
				if (isCommented) ret += '// Cannot Level to 100 so experience is not changed\n'
			}
			else
				if (this.isEXPReplaced()) {
					ret += 'patch=1,EE,2' + expAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,' + this.replacementEXP.toString(16).toUpperCase().padStart(8, '0')
					if (isCommented) ret += ' // Next level at ' + this.replacementEXP + ' experience'
					ret += '\n'
				}

			if (this.isStatsReplaced()) {
				ret += 'patch=1,EE,2' + statAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,'
				ret += ((this.standardAP << 24) + (this.defense << 16) + (this.magic << 8) + this.strength).toString(16).toUpperCase().padStart(8, '0')
				if (isCommented) ret += ' // AP:' + this.standardAP + ' Magic:' + this.magic + ' Defense:' + this.defense + ' Strength:' + this.strength
				ret += '\n'
			}

			if (this.level === 1) {
				if (isCommented) ret += '// No Level 1 Dream Weapon Rewards\n'
			}
			else {
				if (this.isSwordReplaced()) {
					ret += 'patch=1,EE,1' + swordAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
					ret += this.replacementSwordReward.index.toString(16).toUpperCase().padStart(4, '0')
					if (isCommented) ret += ' // Sword Reward: ' + this.replacementSwordReward.reward
					ret += '\n'
				}
				if (this.isShieldReplaced()) {
					ret += 'patch=1,EE,1' + shieldAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
					ret += this.replacementShieldReward.index.toString(16).toUpperCase().padStart(4, '0')
					if (isCommented) ret += ' // Shield Reward: ' + this.replacementShieldReward.reward
					ret += '\n'
				}
				if (this.isStaffReplaced()) {
					ret += 'patch=1,EE,1' + staffAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
					ret += this.replacementStaffReward.index.toString(16).toUpperCase().padStart(4, '0')
					if (isCommented) ret += ' // Staff Reward: ' + this.replacementStaffReward.reward
					ret += '\n'
				}
			}
			if (ret === '') return ret
			return isCommented
				? '// Level: ' + this.level + '\n' + ret
				: ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ''
			let baseAddress = this.baseAddress - 0x1CE5D80
			let expAddress = baseAddress
			let statAddress = baseAddress + 4
			let swordAddress = baseAddress + 8
			let shieldAddress = baseAddress + 10
			let staffAddress = baseAddress + 12

			if (this.level === 99) {
				if (isCommented) ret += '\t-- Cannot Level to 100 so experience is not changed\n'
			}
			else
				if (this.isEXPReplaced()) {
					ret += '\tWriteInt(Btl0+0x' + expAddress.toString(16).toUpperCase() + ',0x' + this.replacementEXP.toString(16).toUpperCase().padStart(8, '0') + ')'
					if (isCommented) ret += ' -- Next level at ' + this.replacementEXP + ' experience'
					ret += '\n'
				}

			if (this.isStatsReplaced()) {
				ret += '\tWriteInt(Btl0+0x' + statAddress.toString(16).toUpperCase() + ',0x'
				ret += ((this.standardAP << 24) + (this.defense << 16) + (this.magic << 8) + this.strength).toString(16).toUpperCase().padStart(8, '0') + ')'
				if (isCommented) ret += ' -- AP:' + this.standardAP + ' Magic:' + this.magic + ' Defense:' + this.defense + ' Strength:' + this.strength
				ret += '\n'
			}

			if (this.level === 1) {
				if (isCommented) ret += '\t-- No Level 1 Dream Weapon Rewards\n'
			}
			else {
				if (this.isSwordReplaced()) {
					ret += '\tWriteShort(Btl0+0x' + swordAddress.toString(16).toUpperCase() + ',0x' + this.replacementSwordReward.index.toString(16).toUpperCase().padStart(4, '0') + ')'
					if (isCommented) ret += ' -- Sword Reward: ' + this.replacementSwordReward.reward
					ret += '\n'
				}
				if (this.isShieldReplaced()) {
					ret += '\tWriteShort(Btl0+0x' + shieldAddress.toString(16).toUpperCase() + ',0x' + this.replacementShieldReward.index.toString(16).toUpperCase().padStart(4, '0') + ')'
					if (isCommented) ret += ' -- Shield Reward: ' + this.replacementShieldReward.reward
					ret += '\n'
				}
				if (this.isStaffReplaced()) {
					ret += '\tWriteShort(Btl0+0x' + staffAddress.toString(16).toUpperCase() + ',0x' + this.replacementStaffReward.index.toString(16).toUpperCase().padStart(4, '0') + ')'
					if (isCommented) ret += ' -- Staff Reward: ' + this.replacementStaffReward.reward
					ret += '\n'
				}
			}
			if (ret === '') return ret
			return isCommented
				? '\t-- Level: ' + this.level + '\n' + ret
				: ret
		}
		this.saveToYml = (isCommented) => {
			let ret = ''
			if (this.isReplaced()) {
				ret += '  ' + this.level + ':\n    '
				ret += 'Ap: ' + this.standardAP + '\n    '
				ret += 'Character: Sora\n    '
				ret += 'Defense: ' + this.defense + '\n    '
				ret += 'Exp: ' + this.replacementEXP + '\n    '
				ret += 'Level: ' + this.level + '\n    '
				ret += 'Magic: ' + this.magic + '\n    '
				ret += 'Padding: 0\n    ' // wtf is this?: 
				ret += 'ShieldAbility: ' + this.replacementShieldReward.index + '\n    '
				ret += 'StaffAbility: ' + this.replacementStaffReward.index + '\n    '
				ret += 'Strength: ' + this.strength + '\n    '
				ret += 'SwordAbility: ' + this.replacementSwordReward.index
				ret += '\n'
			}
			return ret
		}
		this.changeFromPreviousLevel = (prevLevel) => {
			if (this.level === 1)
				return {
					strengthDif: this.strength,
					magicDif: this.magic,
					defenseDif: this.defense,
					standardAPDif: this.standardAP,
					criticalAPDif: this.criticalAP(),
					expDif: this.replacementEXP
				}
			return {
				strengthDif: this.strength - prevLevel.strength,
				magicDif: this.magic - prevLevel.magic,
				defenseDif: this.defense - prevLevel.defense,
				standardAPDif: this.standardAP - prevLevel.standardAP,
				criticalAPDif: this.criticalAP() - prevLevel.criticalAP(),
				expDif: this.replacementEXP - prevLevel.replacementEXP
			}
		}
	}

	static saveToPnach(levelData, isCommented) {
		return ['\n//SORA LEVELS\n'].concat(levelData.map(level => { return level.saveToPnach(isCommented) }))
	}
	static saveToLua(levelData, isCommented) {
		return ['\nfunction LevelRewards()\n'].concat(levelData.map(level => { return level.saveToLua(isCommented) }), ['end\n'])
	}
	static saveToYml(levelData, isCommented) {
		return levelData.reduce((prev, level) => { return prev + level.saveToYml(isCommented) }, '')
	}
	static saveToJSON(levelData) {
		return ['"levelsData":[', levelData.map(level => { return level.saveToJSON() }).join('').slice(0, -1), '],']
	}
	static loadFromJSON(levelLoadData) {
		let globalIndex = 0
		return levelsData.map(level => {
			if (globalIndex < levelLoadData.length) {
				if (levelLoadData[globalIndex].level === level.level) {
					let ret = level.loadFromJSON(levelLoadData[globalIndex])
					globalIndex++
					return ret
				}
			}
			return level
		})
	}
}

export const levelsData = [
	new Level(1, 40, 0x1D0B6A8, 2, 2, 6, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(2, 100, 0x1D0B6B8, 2, 3, 6, 2, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(3, 184, 0x1D0B6C8, 4, 3, 6, 4, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(4, 296, 0x1D0B6D8, 4, 4, 6, 4, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(5, 440, 0x1D0B6E8, 6, 5, 6, 4, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(6, 620, 0x1D0B6F8, 6, 6, 6, 6, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(7, 840, 0x1D0B708, 6, 7, 6, 6, new Reward('Combo Boost', 0x186, 'Ability'), new Reward('Item Boost', 0x19B, 'Ability'), new Reward('Experience Boost', 0x191, 'Ability')),
	new Level(8, 1128, 0x1D0B718, 8, 7, 8, 6, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(9, 1492, 0x1D0B728, 8, 8, 8, 6, new Reward('Experience Boost', 0x191, 'Ability'), new Reward('Combo Boost', 0x186, 'Ability'), new Reward('Item Boost', 0x19B, 'Ability')),
	new Level(10, 1940, 0x1D0B738, 8, 8, 8, 8, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(11, 2480, 0x1D0B748, 10, 9, 8, 8, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(12, 3120, 0x1D0B758, 10, 9, 10, 8, new Reward('Magic Lock-On', 0x193, 'Ability'), new Reward('Magic Lock-On', 0x193, 'Ability'), new Reward('Magic Lock-On', 0x193, 'Ability')),
	new Level(13, 3902, 0x1D0B768, 12, 10, 10, 8, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(14, 4838, 0x1D0B778, 12, 10, 10, 10, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(15, 5940, 0x1D0B788, 12, 11, 10, 10, new Reward('Reaction Boost', 0x188, 'Ability'), new Reward('Damage Drive', 0x18C, 'Ability'), new Reward('Fire Boost', 0x198, 'Ability')),
	new Level(16, 7260, 0x1D0B798, 14, 11, 12, 10, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(17, 8814, 0x1D0B7A8, 14, 12, 12, 10, new Reward('Item Boost', 0x19B, 'Ability'), new Reward('Experience Boost', 0x191, 'Ability'), new Reward('Combo Boost', 0x186, 'Ability')),
	new Level(18, 10618, 0x1D0B7B8, 14, 12, 14, 12, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(19, 12688, 0x1D0B7C8, 16, 13, 14, 12, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(20, 15088, 0x1D0B7D8, 16, 13, 16, 12, new Reward('Leaf Bracer', 0x192, 'Ability'), new Reward('Leaf Bracer', 0x192, 'Ability'), new Reward('Leaf Bracer', 0x192, 'Ability')),
	new Level(21, 17838, 0x1D0B7E8, 18, 14, 16, 12, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(22, 20949, 0x1D0B7F8, 18, 14, 16, 14, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(23, 24433, 0x1D0B808, 18, 15, 16, 14, new Reward('Fire Boost', 0x198, 'Ability'), new Reward('Reaction Boost', 0x188, 'Ability'), new Reward('Damage Drive', 0x18C, 'Ability')),
	new Level(24, 28302, 0x1D0B818, 20, 15, 18, 14, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(25, 32622, 0x1D0B828, 20, 16, 18, 14, new Reward('Drive Boost', 0x18D, 'Ability'), new Reward('Once More', 0x1A0, 'Ability'), new Reward('Draw', 0x195, 'Ability')),
	new Level(26, 37407, 0x1D0B838, 20, 16, 18, 16, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(27, 42671, 0x1D0B848, 20, 17, 18, 16, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(28, 48485, 0x1D0B858, 20, 17, 20, 16, new Reward('Draw', 0x195, 'Ability'), new Reward('Drive Boost', 0x18D, 'Ability'), new Reward('Once More', 0x1A0, 'Ability')),
	new Level(29, 54865, 0x1D0B868, 22, 18, 20, 16, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(30, 61886, 0x1D0B878, 22, 18, 20, 18, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(31, 69566, 0x1D0B888, 22, 19, 20, 18, new Reward('Combination Boost', 0x190, 'Ability'), new Reward('Defender', 0x19E, 'Ability'), new Reward('Blizzard Boost', 0x199, 'Ability')),
	new Level(32, 77984, 0x1D0B898, 22, 19, 22, 18, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(33, 87160, 0x1D0B8A8, 22, 20, 22, 18, new Reward('Damage Drive', 0x18C, 'Ability'), new Reward('Fire Boost', 0x198, 'Ability'), new Reward('Reaction Boost', 0x188, 'Ability')),
	new Level(34, 97177, 0x1D0B8B8, 22, 20, 22, 20, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(35, 108057, 0x1D0B8C8, 24, 21, 22, 20, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(36, 119887, 0x1D0B8D8, 24, 21, 24, 20, new Reward('Air Combo Boost', 0x187, 'Ability'), new Reward('Jackpot', 0x196, 'Ability'), new Reward('Negative Combo', 0x18A, 'Ability')),
	new Level(37, 132691, 0x1D0B8E8, 26, 22, 24, 20, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(38, 146560, 0x1D0B8F8, 26, 22, 24, 22, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(39, 161520, 0x1D0B908, 26, 23, 24, 22, new Reward('Blizzard Boost', 0x199, 'Ability'), new Reward('Combination Boost', 0x190, 'Ability'), new Reward('Defender', 0x19E, 'Ability')),
	new Level(40, 177666, 0x1D0B918, 28, 23, 26, 22, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(41, 195026, 0x1D0B928, 28, 24, 26, 22, new Reward('Drive Converter', 0x21C, 'Ability'), new Reward('Damage Control', 0x21E, 'Ability'), new Reward('Thunder Boost', 0x19A, 'Ability')),
	new Level(42, 213699, 0x1D0B938, 28, 24, 26, 24, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(43, 233715, 0x1D0B948, 28, 25, 26, 24, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(44, 255177, 0x1D0B958, 28, 25, 28, 24, new Reward('Negative Combo', 0x18A, 'Ability'), new Reward('Air Combo Boost', 0x187, 'Ability'), new Reward('Jackpot', 0x196, 'Ability')),
	new Level(45, 278117, 0x1D0B968, 30, 26, 28, 24, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(46, 302642, 0x1D0B978, 30, 26, 28, 26, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(47, 328786, 0x1D0B988, 30, 27, 28, 26, new Reward('Once More', 0x1A0, 'Ability'), new Reward('Draw', 0x195, 'Ability'), new Reward('Drive Boost', 0x18D, 'Ability')),
	new Level(48, 356660, 0x1D0B998, 30, 27, 30, 26, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(49, 386660, 0x1D0B9A8, 30, 28, 30, 26, new Reward('Finishing Plus', 0x189, 'Ability'), new Reward('Second Chance', 0x19F, 'Ability'), new Reward('Berserk Charge', 0x18B, 'Ability')),
	new Level(50, 417978, 0x1D0B9B8, 30, 28, 30, 28, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(51, 450378, 0x1D0B9C8, 32, 29, 30, 28, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(52, 483578, 0x1D0B9D8, 32, 29, 32, 28, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(53, 517578, 0x1D0B9E8, 32, 30, 32, 28, new Reward('Thunder Boost', 0x19A, 'Ability'), new Reward('Drive Converter', 0x21C, 'Ability'), new Reward('Damage Control', 0x21E, 'Ability')),
	new Level(54, 552378, 0x1D0B9F8, 32, 30, 32, 30, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(55, 587978, 0x1D0BA08, 34, 31, 32, 30, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(56, 624378, 0x1D0BA18, 34, 31, 34, 30, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(57, 661578, 0x1D0BA28, 36, 32, 34, 30, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(58, 699578, 0x1D0BA38, 36, 32, 34, 32, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(59, 738378, 0x1D0BA48, 36, 33, 34, 32, new Reward('Defender', 0x19E, 'Ability'), new Reward('Blizzard Boost', 0x199, 'Ability'), new Reward('Combination Boost', 0x190, 'Ability')),
	new Level(60, 777978, 0x1D0BA58, 36, 33, 36, 32, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(61, 818378, 0x1D0BA68, 38, 34, 36, 32, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(62, 859578, 0x1D0BA78, 38, 34, 36, 34, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(63, 901578, 0x1D0BA88, 40, 35, 36, 34, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(64, 944378, 0x1D0BA98, 40, 35, 38, 34, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(65, 987987, 0x1D0BAA8, 40, 36, 38, 34, new Reward('Berserk Charge', 0x18B, 'Ability'), new Reward('Finishing Plus', 0x189, 'Ability'), new Reward('Second Chance', 0x19F, 'Ability')),
	new Level(66, 1032378, 0x1D0BAB8, 40, 36, 38, 36, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(67, 1077578, 0x1D0BAC8, 42, 37, 38, 36, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(68, 1123578, 0x1D0BAD8, 42, 37, 40, 36, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(69, 1170378, 0x1D0BAE8, 44, 38, 40, 36, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(70, 1217978, 0x1D0BAF8, 44, 38, 40, 38, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(71, 1266378, 0x1D0BB08, 46, 39, 40, 38, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(72, 1315578, 0x1D0BB18, 46, 39, 42, 38, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(73, 1365578, 0x1D0BB28, 46, 40, 42, 38, new Reward('Jackpot', 0x196, 'Ability'), new Reward('Negative Combo', 0x18A, 'Ability'), new Reward('Air Combo Boost', 0x187, 'Ability')),
	new Level(74, 1416378, 0x1D0BB38, 46, 40, 42, 40, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(75, 1467978, 0x1D0BB48, 48, 41, 42, 40, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(76, 1520378, 0x1D0BB58, 48, 41, 44, 40, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(77, 1573578, 0x1D0BB68, 50, 42, 44, 40, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(78, 1627578, 0x1D0BB78, 50, 42, 44, 42, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(79, 1682378, 0x1D0BB88, 52, 43, 44, 42, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(80, 1737978, 0x1D0BB98, 52, 43, 46, 42, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(81, 1794378, 0x1D0BBA8, 54, 44, 46, 42, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(82, 1851578, 0x1D0BBB8, 54, 44, 46, 44, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(83, 1909578, 0x1D0BBC8, 56, 45, 46, 44, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(84, 1968378, 0x1D0BBD8, 56, 45, 48, 44, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(85, 2027978, 0x1D0BBE8, 56, 46, 48, 44, new Reward('Second Chance', 0x19F, 'Ability'), new Reward('Berserk Charge', 0x18B, 'Ability'), new Reward('Finishing Plus', 0x189, 'Ability')),
	new Level(86, 2088378, 0x1D0BBF8, 56, 46, 48, 46, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(87, 2149578, 0x1D0BC08, 58, 47, 48, 46, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(88, 2211578, 0x1D0BC18, 58, 47, 50, 46, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(89, 2274378, 0x1D0BC28, 60, 48, 50, 46, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(90, 2337978, 0x1D0BC38, 60, 48, 50, 48, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(91, 2402378, 0x1D0BC48, 62, 49, 50, 48, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(92, 2467578, 0x1D0BC58, 62, 49, 52, 48, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(93, 2553578, 0x1D0BC68, 64, 50, 52, 48, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(94, 2600378, 0x1D0BC78, 64, 50, 52, 50, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(95, 2667978, 0x1D0BC88, 66, 51, 52, 50, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(96, 2736378, 0x1D0BC98, 66, 51, 54, 50, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(97, 2805578, 0x1D0BCA8, 68, 52, 54, 50, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(98, 2875578, 0x1D0BCB8, 68, 52, 54, 52, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY')),
	new Level(99, 0, 0x1D0BCC8, 68, 53, 54, 52, new Reward('Damage Control', 0x21E, 'Ability'), new Reward('Thunder Boost', 0x19A, 'Ability'), new Reward('Drive Converter', 0x21C4, 'Ability'))
]