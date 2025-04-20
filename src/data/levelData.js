import { Reward } from "./rewardsData"

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
		this.replace = (prevLevel, newLevelData) => {
			let ret = this.copy()

			function updateIfNotEqual(original, newValue) {
				if (isNaN(newValue)) return original
				if (original + newValue >= 255) return 255
				return original + newValue
			}

			// ret.replacementEXP = newLevelData.currentEXPMultiplierValue === 0 ? newLevelData.currentEXP : Math.max(1, Math.floor((2 * this.vanillaEXP) / newLevelData.currentEXPMultiplierValue))
			ret.replacementSwordReward = { ...newLevelData.sword }
			ret.replacementShieldReward = { ...newLevelData.shield }
			ret.replacementStaffReward = { ...newLevelData.staff }

			if (!isNaN(newLevelData.replacementEXP)) ret.replacementEXP = newLevelData.replacementEXP

			ret.standardAP = updateIfNotEqual(prevLevel.standardAP, newLevelData.standardAP)
			ret.defense = updateIfNotEqual(prevLevel.defense, newLevelData.defense)
			ret.magic = updateIfNotEqual(prevLevel.magic, newLevelData.magic)
			ret.strength = updateIfNotEqual(prevLevel.strength, newLevelData.strength)

			ret.toBeReplaced = false

			return ret
		}
		this.saveToJSON = () => {
			return (this.isEXPReplaced() || this.isStatsReplaced() || this.isSwordReplaced() || this.isShieldReplaced() || this.isStaffReplaced())
				? JSON.stringify(this, ["level", "replacementEXP", "standardAP", "defense", "magic", "strength",
					"replacementSwordReward", "replacementShieldReward", "replacementStaffReward", "reward", "index", "iconType"]) + ","
				: ""
		}
		this.loadFromJSON = (levelJSON, loadVersion) => {
			let ret = this.copy()

			ret.replacementEXP = loadVersion === undefined
				? ret.vanillaEXP
				: levelJSON.replacementEXP

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
		this.saveToPnach = (isCommented, gameEXPValue) => {
			let ret = ""
			let expAddress = this.baseAddress
			let statAddress = this.baseAddress + 4
			let swordAddress = this.baseAddress + 8
			let shieldAddress = this.baseAddress + 10
			let staffAddress = this.baseAddress + 12

			if (this.level === 99) {
				if (isCommented) ret += "// Cannot Level to 100 so experience is not changed\n"
			}
			else
				if (this.isEXPReplaced()) {
					ret += "patch=1,EE,2" + expAddress.toString(16).toUpperCase().padStart(7, "0") + ",extended," + gameEXPValue.toString(16).toUpperCase().padStart(8, "0")
					if (isCommented) ret += " // Next level at " + gameEXPValue + " experience"
					ret += "\n"
				}

			if (this.isStatsReplaced()) {
				ret += "patch=1,EE,2" + statAddress.toString(16).toUpperCase().padStart(7, "0") + ",extended,"
				ret += ((this.standardAP << 24) + (this.defense << 16) + (this.magic << 8) + this.strength).toString(16).toUpperCase().padStart(8, "0")
				if (isCommented) ret += " // AP:" + this.standardAP + " Magic:" + this.magic + " Defense:" + this.defense + " Strength:" + this.strength
				ret += "\n"
			}

			if (this.level === 1) {
				if (isCommented) ret += "// No Level 1 Dream Weapon Rewards\n"
			}
			else {
				if (this.isSwordReplaced()) {
					ret += "patch=1,EE,1" + swordAddress.toString(16).toUpperCase().padStart(7, "0") + ",extended,0000"
					ret += this.replacementSwordReward.index.toString(16).toUpperCase().padStart(4, "0")
					if (isCommented) ret += " // Sword Reward: " + this.replacementSwordReward.reward
					ret += "\n"
				}
				if (this.isShieldReplaced()) {
					ret += "patch=1,EE,1" + shieldAddress.toString(16).toUpperCase().padStart(7, "0") + ",extended,0000"
					ret += this.replacementShieldReward.index.toString(16).toUpperCase().padStart(4, "0")
					if (isCommented) ret += " // Shield Reward: " + this.replacementShieldReward.reward
					ret += "\n"
				}
				if (this.isStaffReplaced()) {
					ret += "patch=1,EE,1" + staffAddress.toString(16).toUpperCase().padStart(7, "0") + ",extended,0000"
					ret += this.replacementStaffReward.index.toString(16).toUpperCase().padStart(4, "0")
					if (isCommented) ret += " // Staff Reward: " + this.replacementStaffReward.reward
					ret += "\n"
				}
			}
			if (ret === "") return ret
			return isCommented
				? "// Level: " + this.level + "\n" + ret
				: ret
		}
		this.saveToLua = (isCommented, gameEXPValue) => {
			let ret = ""
			let base = this.baseAddress
			let expAddress = "0x" + base.toString(16).toUpperCase()
			let statAddress = "0x" + (base + 4).toString(16).toUpperCase()
			let swordAddress = "0x" + (base + 8).toString(16).toUpperCase()
			let shieldAddress = "0x" + (base + 10).toString(16).toUpperCase()
			let staffAddress = "0x" + (base + 12).toString(16).toUpperCase()

			if (this.level === 99) {
				if (isCommented) ret += "\t-- Cannot Level to 100 so experience is not changed\n"
			}
			else
				if (this.isEXPReplaced()) {
					let exp = "0x" + gameEXPValue.toString(16).toUpperCase().padStart(8, "0")
					ret += "\tWriteInt(BAR(Btl0, 0x5, " + expAddress + "), " + exp + ", OnPC)"
					if (isCommented) ret += " -- Next level at " + gameEXPValue + " experience"
					ret += "\n"
				}

			if (this.isStatsReplaced()) {
				let stats = "0x" + ((this.standardAP << 24) + (this.defense << 16) + (this.magic << 8) + this.strength).toString(16).toUpperCase().padStart(8, "0")
				ret += "\tWriteInt(BAR(Btl0, 0x5, " + statAddress + "), " + stats+ ", OnPC)"
				if (isCommented) ret += " -- AP:" + this.standardAP + " Magic:" + this.magic + " Defense:" + this.defense + " Strength:" + this.strength
				ret += "\n"
			}

			if (this.level === 1) {
				if (isCommented) ret += "\t-- No Level 1 Dream Weapon Rewards\n"
			}
			else {
				if (this.isSwordReplaced()) {
					let sword = "0x" + this.replacementSwordReward.index.toString(16).toUpperCase().padStart(4, "0")
					ret += "\tWriteShort(BAR(Btl0, 0x5, " + swordAddress + "), " + sword + ", OnPC)"
					if (isCommented) ret += " -- Sword Reward: " + this.replacementSwordReward.reward
					ret += "\n"
				}
				if (this.isShieldReplaced()) {
					let shield = "0x" + this.replacementShieldReward.index.toString(16).toUpperCase().padStart(4, "0")
					ret += "\tWriteShort(BAR(Btl0, 0x5, " + shieldAddress + "), " + shield + ", OnPC)"
					if (isCommented) ret += " -- Shield Reward: " + this.replacementShieldReward.reward
					ret += "\n"
				}
				if (this.isStaffReplaced()) {
					let staff = "0x" + this.replacementStaffReward.index.toString(16).toUpperCase().padStart(4, "0")
					ret += "\tWriteShort(BAR(Btl0, 0x5, " + staffAddress + "), " + staff + ", OnPC)"
					if (isCommented) ret += " -- Staff Reward: " + this.replacementStaffReward.reward
					ret += "\n"
				}
			}
			if (ret === "") return ret
			return isCommented
				? "\t-- Level: " + this.level + "\n" + ret
				: ret
		}
		this.saveToYml = (isCommented, gameEXPValue) => {
			let ret = ""
			ret += "  " + this.level + ":"
			ret += "\n    Character: Sora"
			ret += "\n    Level: " + this.level
			ret += "\n    Strength: " + this.strength
			ret += "\n    Magic: " + this.magic
			ret += "\n    Defense: " + this.defense
			ret += "\n    Ap: " + this.standardAP
			ret += "\n    Exp: " + gameEXPValue
			ret += "\n    SwordAbility: " + this.replacementSwordReward.index
			if (isCommented) ret += " # " + this.replacementSwordReward.reward
			ret += "\n    ShieldAbility: " + this.replacementShieldReward.index
			if (isCommented) ret += " # " + this.replacementShieldReward.reward
			ret += "\n    StaffAbility: " + this.replacementStaffReward.index
			if (isCommented) ret += " # " + this.replacementStaffReward.reward
			ret += "\n    Padding: 0" // wtf is this?: 
			ret += "\n"
			return ret
		}
	}

	static saveToPnach(levelData, isCommented) {
		return ["\n//SORA LEVELS\n"].concat(levelData.map(level => { return level.saveToPnach(isCommented, this.getEXPTotal(levelData, level.level)) }))
	}
	static saveToLua(levelData, isCommented) {
		return ["\nfunction LevelRewards()\n"].concat(levelData.map(level => { return level.saveToLua(isCommented, this.getEXPTotal(levelData, level.level)) }), ["end\n"])
	}
	static saveToYml(levelData, isCommented) {
		return levelData.reduce((prev, level) => { return prev + level.saveToYml(isCommented, this.getEXPTotal(levelData, level.level)) }, "")
	}
	static saveToJSON(levelData) {
		return ["\"levelsData\":[", levelData.map(level => { return level.saveToJSON() }).join("").slice(0, -1), "],"]
	}
	static loadFromJSON(levelLoadData, loadVersion) {
		return levelsData.map(level => {
			let foundLevel = levelLoadData.find(loadLevel => loadLevel.level === level.level)
			if (foundLevel !== undefined)
				return level.loadFromJSON(foundLevel, loadVersion)
			return level
		})
	}
	static getEXPTotal(levelData, level) {
		if (level === 99) return 0
		return levelData.slice(1, level + 1).reduce((acc, cur) => acc + cur.replacementEXP, 0)
	}
}

export const levelsData = [
	new Level(1, 0, 0x044, 2, 2, 6, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(2, 40, 0x054, 2, 3, 6, 2, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(3, 60, 0x064, 4, 3, 6, 4, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(4, 84, 0x074, 4, 4, 6, 4, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(5, 112, 0x084, 6, 5, 6, 4, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(6, 144, 0x094, 6, 6, 6, 6, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(7, 180, 0x0A4, 6, 7, 6, 6, new Reward("Combo Boost", 0x186, "ability"), new Reward("Item Boost", 0x19B, "ability"), new Reward("Experience Boost", 0x191, "ability")),
	new Level(8, 220, 0x0B4, 8, 7, 8, 6, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(9, 288, 0x0C4, 8, 8, 8, 6, new Reward("Experience Boost", 0x191, "ability"), new Reward("Combo Boost", 0x186, "ability"), new Reward("Item Boost", 0x19B, "ability")),
	new Level(10, 364, 0x0D4, 8, 8, 8, 8, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(11, 448, 0x0E4, 10, 9, 8, 8, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(12, 540, 0x0F4, 10, 9, 10, 8, new Reward("Magic Lock-On", 0x193, "ability"), new Reward("Magic Lock-On", 0x193, "ability"), new Reward("Magic Lock-On", 0x193, "ability")),
	new Level(13, 640, 0x104, 12, 10, 10, 8, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(14, 782, 0x114, 12, 10, 10, 10, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(15, 936, 0x124, 12, 11, 10, 10, new Reward("Reaction Boost", 0x188, "ability"), new Reward("Damage Drive", 0x18C, "ability"), new Reward("Fire Boost", 0x198, "ability")),
	new Level(16, 1102, 0x134, 14, 11, 12, 10, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(17, 1320, 0x144, 14, 12, 12, 10, new Reward("Item Boost", 0x19B, "ability"), new Reward("Experience Boost", 0x191, "ability"), new Reward("Combo Boost", 0x186, "ability")),
	new Level(18, 1554, 0x154, 14, 12, 14, 12, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(19, 1804, 0x164, 16, 13, 14, 12, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(20, 2070, 0x174, 16, 13, 16, 12, new Reward("Leaf Bracer", 0x192, "ability"), new Reward("Leaf Bracer", 0x192, "ability"), new Reward("Leaf Bracer", 0x192, "ability")),
	new Level(21, 2400, 0x184, 18, 14, 16, 12, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(22, 2750, 0x194, 18, 14, 16, 14, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(23, 3111, 0x1A4, 18, 15, 16, 14, new Reward("Fire Boost", 0x198, "ability"), new Reward("Reaction Boost", 0x188, "ability"), new Reward("Damage Drive", 0x18C, "ability")),
	new Level(24, 3484, 0x1B4, 20, 15, 18, 14, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(25, 3869, 0x1C4, 20, 16, 18, 14, new Reward("Drive Boost", 0x18D, "ability"), new Reward("Once More", 0x1A0, "ability"), new Reward("Draw", 0x195, "ability")),
	new Level(26, 4320, 0x1D4, 20, 16, 18, 16, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(27, 4785, 0x1E4, 20, 17, 18, 16, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(28, 5264, 0x1F4, 20, 17, 20, 16, new Reward("Draw", 0x195, "ability"), new Reward("Drive Boost", 0x18D, "ability"), new Reward("Once More", 0x1A0, "ability")),
	new Level(29, 5814, 0x204, 22, 18, 20, 16, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(30, 6380, 0x214, 22, 18, 20, 18, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(31, 7021, 0x224, 22, 19, 20, 18, new Reward("Combination Boost", 0x190, "ability"), new Reward("Defender", 0x19E, "ability"), new Reward("Blizzard Boost", 0x199, "ability")),
	new Level(32, 7680, 0x234, 22, 19, 22, 18, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(33, 8418, 0x244, 22, 20, 22, 18, new Reward("Damage Drive", 0x18C, "ability"), new Reward("Fire Boost", 0x198, "ability"), new Reward("Reaction Boost", 0x188, "ability")),
	new Level(34, 9176, 0x254, 22, 20, 22, 20, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(35, 10017, 0x264, 24, 21, 22, 20, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(36, 10880, 0x274, 24, 21, 24, 20, new Reward("Air Combo Boost", 0x187, "ability"), new Reward("Jackpot", 0x196, "ability"), new Reward("Negative Combo", 0x18A, "ability")),
	new Level(37, 11830, 0x284, 26, 22, 24, 20, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(38, 12804, 0x294, 26, 22, 24, 22, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(39, 13869, 0x2A4, 26, 23, 24, 22, new Reward("Blizzard Boost", 0x199, "ability"), new Reward("Combination Boost", 0x190, "ability"), new Reward("Defender", 0x19E, "ability")),
	new Level(40, 14960, 0x2B4, 28, 23, 26, 22, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(41, 16146, 0x2C4, 28, 24, 26, 22, new Reward("Drive Converter", 0x21C, "ability"), new Reward("Damage Control", 0x21E, "ability"), new Reward("Thunder Boost", 0x19A, "ability")),
	new Level(42, 17360, 0x2D4, 28, 24, 26, 24, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(43, 18673, 0x2E4, 28, 25, 26, 24, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(44, 20016, 0x2F4, 28, 25, 28, 24, new Reward("Negative Combo", 0x18A, "ability"), new Reward("Air Combo Boost", 0x187, "ability"), new Reward("Jackpot", 0x196, "ability")),
	new Level(45, 21462, 0x304, 30, 26, 28, 24, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(46, 22940, 0x314, 30, 26, 28, 26, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(47, 24525, 0x324, 30, 27, 28, 26, new Reward("Once More", 0x1A0, "ability"), new Reward("Draw", 0x195, "ability"), new Reward("Drive Boost", 0x18D, "ability")),
	new Level(48, 26144, 0x334, 30, 27, 30, 26, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(49, 27874, 0x344, 30, 28, 30, 26, new Reward("Finishing Plus", 0x189, "ability"), new Reward("Second Chance", 0x19F, "ability"), new Reward("Berserk Charge", 0x18B, "ability")),
	new Level(50, 30000, 0x354, 30, 28, 30, 28, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(51, 31318, 0x364, 32, 29, 30, 28, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(52, 32400, 0x374, 32, 29, 32, 28, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(53, 33200, 0x384, 32, 30, 32, 28, new Reward("Thunder Boost", 0x19A, "ability"), new Reward("Drive Converter", 0x21C, "ability"), new Reward("Damage Control", 0x21E, "ability")),
	new Level(54, 34000, 0x394, 32, 30, 32, 30, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(55, 34800, 0x3A4, 34, 31, 32, 30, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(56, 35600, 0x3B4, 34, 31, 34, 30, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(57, 36400, 0x3C4, 36, 32, 34, 30, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(58, 37200, 0x3D4, 36, 32, 34, 32, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(59, 38000, 0x3E4, 36, 33, 34, 32, new Reward("Defender", 0x19E, "ability"), new Reward("Blizzard Boost", 0x199, "ability"), new Reward("Combination Boost", 0x190, "ability")),
	new Level(60, 38800, 0x3F4, 36, 33, 36, 32, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(61, 39600, 0x404, 38, 34, 36, 32, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(62, 40400, 0x414, 38, 34, 36, 34, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(63, 41200, 0x424, 40, 35, 36, 34, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(64, 42000, 0x434, 40, 35, 38, 34, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(65, 42800, 0x444, 40, 36, 38, 34, new Reward("Berserk Charge", 0x18B, "ability"), new Reward("Finishing Plus", 0x189, "ability"), new Reward("Second Chance", 0x19F, "ability")),
	new Level(66, 43609, 0x454, 40, 36, 38, 36, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(67, 44391, 0x464, 42, 37, 38, 36, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(68, 45200, 0x474, 42, 37, 40, 36, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(69, 46000, 0x484, 44, 38, 40, 36, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(70, 46800, 0x494, 44, 38, 40, 38, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(71, 47600, 0x4A4, 46, 39, 40, 38, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(72, 48400, 0x4B4, 46, 39, 42, 38, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(73, 49200, 0x4C4, 46, 40, 42, 38, new Reward("Jackpot", 0x196, "ability"), new Reward("Negative Combo", 0x18A, "ability"), new Reward("Air Combo Boost", 0x187, "ability")),
	new Level(74, 50000, 0x4D4, 46, 40, 42, 40, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(75, 50800, 0x4E4, 48, 41, 42, 40, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(76, 51600, 0x4F4, 48, 41, 44, 40, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(77, 52400, 0x504, 50, 42, 44, 40, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(78, 53200, 0x514, 50, 42, 44, 42, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(79, 54000, 0x524, 52, 43, 44, 42, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(80, 54800, 0x534, 52, 43, 46, 42, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(81, 55600, 0x544, 54, 44, 46, 42, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(82, 56400, 0x554, 54, 44, 46, 44, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(83, 57200, 0x564, 56, 45, 46, 44, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(84, 58000, 0x574, 56, 45, 48, 44, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(85, 58800, 0x584, 56, 46, 48, 44, new Reward("Second Chance", 0x19F, "ability"), new Reward("Berserk Charge", 0x18B, "ability"), new Reward("Finishing Plus", 0x189, "ability")),
	new Level(86, 59600, 0x594, 56, 46, 48, 46, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(87, 60400, 0x5A4, 58, 47, 48, 46, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(88, 61200, 0x5B4, 58, 47, 50, 46, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(89, 62000, 0x5C4, 60, 48, 50, 46, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(90, 62800, 0x5D4, 60, 48, 50, 48, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(91, 63600, 0x5E4, 62, 49, 50, 48, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(92, 64400, 0x5F4, 62, 49, 52, 48, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(93, 65200, 0x604, 64, 50, 52, 48, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(94, 66000, 0x614, 64, 50, 52, 50, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(95, 66800, 0x624, 66, 51, 52, 50, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(96, 67600, 0x634, 66, 51, 54, 50, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(97, 68400, 0x644, 68, 52, 54, 50, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(98, 69200, 0x654, 68, 52, 54, 52, new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty"), new Reward("EMPTY", 0x000, "empty")),
	new Level(99, 70000, 0x664, 68, 53, 54, 52, new Reward("Damage Control", 0x21E, "ability"), new Reward("Thunder Boost", 0x19A, "ability"), new Reward("Drive Converter", 0x21C4, "ability"))
]