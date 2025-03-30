import { Reward } from './rewardsData'

export class FormLevel {
	constructor(level, vanilla, baseAddress, exp) {
		this.level = level
		this.vanillaReward = { ...vanilla }
		this.replacementReward = { ...vanilla }
		this.baseAddress = baseAddress
		this.vanillaEXP = exp
		this.replacementEXP = exp
		this.toBeReplaced = false

		this.isEXPReplaced = () => {
			return this.replacementEXP !== this.vanillaEXP
		}
		this.isRewardReplaced = () => {
			return this.replacementReward.index !== this.vanillaReward.index
		}
		this.copy = () => {
			let ret = this.vanilla()

			ret.replacementReward = { ...this.replacementReward }
			ret.replacementEXP = this.replacementEXP
			ret.toBeReplaced = this.toBeReplaced

			return ret
		}
		this.vanilla = () => {
			return new FormLevel(this.level, new Reward(this.vanillaReward.reward, this.vanillaReward.index, this.vanillaReward.iconType), this.baseAddress, this.vanillaEXP)
		}
		this.replace = (newFormData) => {
			let ret = this.copy()

			ret.replacementReward = { ...newFormData.replacementReward }
			ret.replacementEXP = newFormData.currentEXPMultiplierValue === 1 ? newFormData.currentEXP : Math.max(1, Math.floor((2 * this.vanillaEXP) / (newFormData.currentEXPMultiplierValue + 1)))
			ret.toBeReplaced = false

			return ret
		}
		this.markForReplacement = (toBeReplaced) => {
			let ret = this.copy()
			ret.toBeReplaced = toBeReplaced
			return ret
		}
		this.saveToJSON = () => {
			return (this.isEXPReplaced() || this.isRewardReplaced()) ? JSON.stringify(this, ['level', 'replacementReward', 'reward', 'index', 'iconType', 'replacementEXP']) + ',' : ''
		}
		this.loadFromJSON = (driveLevelJSON) => {
			let ret = this.copy()

			ret.replacementEXP = driveLevelJSON.replacementEXP
			ret.replacementReward = { ...driveLevelJSON.replacementReward }
			ret.toBeReplaced = false

			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ''
			if (this.isRewardReplaced()) {
				ret += 'patch=1,EE,1' + (this.baseAddress + 0x6).toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
				ret += this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // ' + this.level + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			if (this.isEXPReplaced()) {
				ret += 'patch=1,EE,1' + this.baseAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,' + this.replacementEXP.toString(16).toUpperCase().padStart(8, 0)
				if (isCommented) ret += ' // ' + this.replacementEXP + ' experience is now required to reach ' + this.level
				ret += '\n'
			}
			return ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ''
			let EXPAddress = "0x" + this.baseAddress.toString(16).toUpperCase()
			let rewardAddress = "0x" + (this.baseAddress + 6).toString(16).toUpperCase()
			if (this.isEXPReplaced()) {
				let exp = "0x" + this.replacementEXP.toString(16).toUpperCase().padStart(4, '0')
				ret += "\tWriteShort(BAR(Btl0, 0x10, " + EXPAddress + ", " + exp + ", OnPC)"
				if (isCommented) ret += ' -- ' + this.replacementEXP + ' experience is now required to reach ' + this.level
				ret += '\n'
			}
			if (this.isRewardReplaced()) {
				let reward = "0x" + this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0')
				ret += "\tWriteShort(BAR(Btl0, 0x10, " + rewardAddress + ", " + reward + ", OnPC)"
				if (isCommented) ret += ' -- ' + this.level + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToYml = (isCommented, formId) => {
			let ret = ''
			ret += '- FormId: ' + formId
			ret += '\n  FormLevel: ' + this.level.slice(-1)
			ret += '\n  Ability: ' + this.replacementReward.index
			ret += ((isCommented && this.vanillaReward.index !== this.replacementReward.index) ? ' # ' + this.level + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward : '')
			ret += '\n  Experience: ' + this.replacementEXP
			ret += ((isCommented && this.vanillaEXP !== this.replacementEXP) ? ' # ' + this.replacementEXP + ' experience is now required to reach ' + this.level : '')
			ret += '\n  GrowthAbilityLevel: 0\n'
			return ret
		}
	}

	static saveToPnach(formData, isCommented) {
		return ['\n//FORMS & SUMMONS\n'].concat(formData.map(driveForm => {
			let ret = isCommented ? '// ' + driveForm.driveForm.toUpperCase() + '\n' : ''
			if (driveForm.driveLevels.some(driveFormLevel => driveFormLevel.isRewardReplaced()))
				if (driveForm.driveForm !== 'Summon')
					ret += driveForm.removeGrowthJankPnachCodes.join('')
			driveForm.driveLevels.forEach(driveLevel => { ret += driveLevel.saveToPnach(isCommented) })
			return ret
		}))
	}
	static saveToLua(formData, isCommented) {
		return ['\nfunction DriveForms()\n'].concat(formData.map(driveForm => {
			let ret = isCommented ? '\t-- ' + driveForm.driveForm.toUpperCase() + '\n' : ''
			if (driveForm.driveLevels.some(driveFormLevel => driveFormLevel.isRewardReplaced()))
				if (driveForm.driveForm !== 'Summon')
					ret += driveForm.removeGrowthJankLuaCodes.join('')
			driveForm.driveLevels.forEach(driveFormLevel => { ret += driveFormLevel.saveToLua(isCommented) })
			return ret
		}), ['end\n'])
	}
	static saveToYml(formData, isCommented) {
		return formData.reduce((prev, driveForm, formId) => {
			prev += driveForm.driveForm + ':\n'
			let newDriveLevels = [
				driveForm.driveLevels[0].copy()
			]
			newDriveLevels[0].level = newDriveLevels[0].level.slice() + '1'
			for (let i = 0; i < 6; i++) {
				newDriveLevels.push(driveForm.driveLevels[i].copy())
				if (i !== 6) newDriveLevels[i].replacementEXP = driveForm.driveLevels[i].replacementEXP
			}
			newDriveLevels.forEach(level => { prev += level.saveToYml(isCommented, formId) })
			return prev
		}, '')
	}
	static saveToJSON(formData) {
		let formSaveData = formData.map(driveForm => {
			let ret = ''
			driveForm.driveLevels.forEach(driveLevel => { ret += driveLevel.saveToJSON() })
			if (ret !== '')
				return '{"driveForm":"' + driveForm.driveForm + '","driveLevels":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		return ['"formsData":[', formSaveData.filter(s => s !== '').join(), '],']
	}
	static loadFromJSON(formLoadData) {
		return formsData.map(driveForm => {
			let foundDriveForm = formLoadData.find(loadDriveForm => loadDriveForm.driveForm === driveForm.driveForm)
			if (foundDriveForm !== undefined) {
				let newDriveLevels = driveForm.driveLevels.map(driveLevel => {
					let foundDriveLevel = foundDriveForm.driveLevels.find(loadDriveLevel => loadDriveLevel.level === driveLevel.level)
					if (foundDriveLevel !== undefined)
						return driveLevel.loadFromJSON(foundDriveLevel)
					return driveLevel
				})
				return {
					...driveForm,
					driveLevels: newDriveLevels
				}
			}
			return driveForm
		})
	}
}

export const formsData = [
	{
		driveForm: 'Valor',
		removeGrowthJankPnachCodes: [
			'//Remove High Jump LV1\n',
			'patch=1,EE,E0030102,extended,0032EE26\n',
			'patch=1,EE,1036E5A2,extended,00000000\n',
			'patch=1,EE,1032EE2C,extended,0000805E\n',
			'patch=1,EE,1032EE42,extended,00000000\n',
			'//Remove High Jump LV2 1\n',
			'patch=1,EE,E0010102,extended,0032EE26\n',
			'patch=1,EE,1036E5A4,extended,0000005F\n',
			'//Remove High Jump LV2 2\n',
			'patch=1,EE,E0030103,extended,0032EE26\n',
			'patch=1,EE,1036E5A4,extended,00000000\n',
			'patch=1,EE,1032EE2C,extended,0000805F\n',
			'patch=1,EE,1032EE42,extended,00000000\n',
			'//Remove High Jump LV3 1\n',
			'patch=1,EE,E0010104,extended,0032EE26\n',
			'patch=1,EE,1036E5A6,extended,00000060\n',
			'//Remove High Jump LV3 2\n',
			'patch=1,EE,E0030105,extended,0032EE26\n',
			'patch=1,EE,1036E5A6,extended,00000000\n',
			'patch=1,EE,1032EE2C,extended,00008060\n',
			'patch=1,EE,1032EE42,extended,00000000\n',
			'//Remove High Jump MAX 1\n',
			'patch=1,EE,E0010106,extended,0032EE26\n',
			'patch=1,EE,1036E5A8,extended,00000061\n',
			'//Remove High Jump MAX 2\n',
			'patch=1,EE,E0020107,extended,0032EE26\n',
			'patch=1,EE,1032EE2C,extended,00008061\n',
			'patch=1,EE,1032EE42,extended,00000000\n'
		],
		removeGrowthJankLuaCodes: [
			'\tWriteByte(BAR(Btl0, 0x10, 0x041), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x049), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x051), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x059), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x061), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x069), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x071), 0x00, OnPC)\n',
			'\tValorLv = ReadByte(Save+0x32F6)\n',
			'\tif ValorLv == 1 or ValorLv == 2 then WriteShort(Save+0x32FC,0x805E, OnPC)\n',
			'\telseif ValorLv == 3 or ValorLv == 4 then WriteShort(Save+0x32FC,0x805F, OnPC)\n',
			'\telseif ValorLv == 5 or ValorLv == 6 then WriteShort(Save+0x32FC,0x8060, OnPC)\n',
			'\telseif ValorLv == 7 then WriteShort(Save+0x32FC,0x8061, OnPC) end\n'
		],
		driveLevels: [
			new FormLevel("Valor LV2", new Reward("Auto Valor", 0x181, "Ability"), 0x0044, 80),
			new FormLevel("Valor LV3", new Reward("High Jump LV 1", 0x05E, "HighJump"), 0x004C, 160),
			new FormLevel("Valor LV4", new Reward("Combo Plus", 0x0A2, "Ability"), 0x0054, 280),
			new FormLevel("Valor LV5", new Reward("High Jump LV 2", 0x05F, "HighJump"), 0x005C, 448),
			new FormLevel("Valor LV6", new Reward("Combo Plus", 0x0A2, "Ability"), 0x0064, 560),
			new FormLevel("Valor LV7", new Reward("High Jump LV 3", 0x060, "HighJump"), 0x006C, 672)
		]
	},
	{
		driveForm: 'Wisdom',
		removeGrowthJankPnachCodes: [
			'//Remove Quick Run LV1\n',
			'patch=1,EE,E0030102,extended,0032EE5E\n',
			'patch=1,EE,1036E5AC,extended,00000000\n',
			'patch=1,EE,1032EE64,extended,00008062\n',
			'patch=1,EE,1032EE74,extended,00000000\n',
			'//Remove Quick Run LV2 1\n',
			'patch=1,EE,E0010102,extended,0032EE5E\n',
			'patch=1,EE,1036E5AE,extended,00000063\n',
			'//Remove Quick Run LV2\n',
			'patch=1,EE,E0030103,extended,0032EE5E\n',
			'patch=1,EE,1036E5AE,extended,00000000\n',
			'patch=1,EE,1032EE64,extended,00008063\n',
			'patch=1,EE,1032EE74,extended,00000000\n',
			'//Remove Quick Run LV3 1\n',
			'patch=1,EE,E0010104,extended,0032EE5E\n',
			'patch=1,EE,1036E5B0,extended,00000064\n',
			'//Remove Quick Run LV3 2\n',
			'patch=1,EE,E0030105,extended,0032EE5E\n',
			'patch=1,EE,1036E5B0,extended,00000000\n',
			'patch=1,EE,1032EE64,extended,00008064\n',
			'patch=1,EE,1032EE74,extended,00000000\n',
			'//Remove Quick Run MAX 1\n',
			'patch=1,EE,E0010106,extended,0032EE5E\n',
			'patch=1,EE,1036E5B2,extended,00000065\n',
			'//Remove Quick Run MAX 2\n',
			'patch=1,EE,E0020107,extended,0032EE5E\n',
			'patch=1,EE,1032EE64,extended,00008065\n',
			'patch=1,EE,1032EE74,extended,00000000\n'
		],
		removeGrowthJankLuaCodes: [
			'\tWriteByte(BAR(Btl0, 0x10, 0x079), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x081), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x089), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x091), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x099), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x0A1), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x0A9), 0x00, OnPC)\n',
			'\tWisdmLv = ReadByte(Save+0x332E)\n',
			'\tif WisdmLv == 1 or WisdmLv == 2 then WriteShort(Save+0x3334,0x8062, OnPC)\n',
			'\telseif WisdmLv == 3 or WisdmLv == 4 then WriteShort(Save+0x3334,0x8063, OnPC)\n',
			'\telseif WisdmLv == 5 or WisdmLv == 6 then WriteShort(Save+0x3334,0x8064, OnPC)\n',
			'\telseif WisdmLv == 7 then WriteShort(Save+0x3334,0x8065, OnPC) end\n'
		],
		driveLevels: [
			new FormLevel("Wisdom LV2", new Reward("Auto Wisdom", 0x182, "Ability"), 0x007C, 20),
			new FormLevel("Wisdom LV3", new Reward("Quick Run LV 1", 0x062, "QuickRun"), 0x0084, 60),
			new FormLevel("Wisdom LV4", new Reward("MP Rage", 0x19C, "Ability"), 0x008C, 72),
			new FormLevel("Wisdom LV5", new Reward("Quick Run LV 2", 0x063, "QuickRun"), 0x0094, 90),
			new FormLevel("Wisdom LV6", new Reward("MP Haste", 0x19D, "Ability"), 0x009C, 108),
			new FormLevel("Wisdom LV7", new Reward("Quick Run LV 3", 0x064, "QuickRun"), 0x00A4, 150)
		]
	},
	{
		driveForm: 'Limit',
		removeGrowthJankPnachCodes: [
			'//Remove Dodge Roll LV1\n',
			'patch=1,EE,E0030102,extended,0032EE96\n',
			'patch=1,EE,1036E5B6,extended,00000000\n',
			'patch=1,EE,1032EE9C,extended,00008234\n',
			'patch=1,EE,1032EEC2,extended,00000000\n',
			'//Remove Dodge Roll LV2 1\n',
			'patch=1,EE,E0010102,extended,0032EE96\n',
			'patch=1,EE,1036E5B8,extended,00000235\n',
			'//Remove Dodge Roll LV2 2\n',
			'patch=1,EE,E0030103,extended,0032EE96\n',
			'patch=1,EE,1036E5B8,extended,00000000\n',
			'patch=1,EE,1032EE9C,extended,00008235\n',
			'patch=1,EE,1032EEC2,extended,00000000\n',
			'//Remove Dodge Roll LV3 1\n',
			'patch=1,EE,E0010104,extended,0032EE96\n',
			'patch=1,EE,1036E5BA,extended,00000236\n',
			'//Remove Dodge Roll LV3 2\n',
			'patch=1,EE,E0030105,extended,0032EE96\n',
			'patch=1,EE,1036E5BA,extended,00000000\n',
			'patch=1,EE,1032EE9C,extended,00008236\n',
			'patch=1,EE,1032EEC2,extended,00000000\n',
			'//Remove Dodge Roll MAX 1\n',
			'patch=1,EE,E0010106,extended,0032EE96\n',
			'patch=1,EE,1036E5BC,extended,00000237\n',
			'//Remove Dodge Roll MAX 2\n',
			'patch=1,EE,E0020107,extended,0032EE96\n',
			'patch=1,EE,1032EE9C,extended,00008237\n',
			'patch=1,EE,1032EEC2,extended,00000000\n'
		],
		removeGrowthJankLuaCodes: [
			'\tWriteByte(BAR(Btl0, 0x10, 0x0B1), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x0B9), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x0C1), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x0C9), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x0D1), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x0D9), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x0E1), 0x00, OnPC)\n',
			'\tLimitLv = ReadByte(Save+0x3366)\n',
			'\tif LimitLv == 1 or LimitLv == 2 then WriteShort(Save+0x336C,0x8234, OnPC)\n',
			'\telseif LimitLv == 3 or LimitLv == 4 then WriteShort(Save+0x336C,0x8235, OnPC)\n',
			'\telseif LimitLv == 5 or LimitLv == 6 then WriteShort(Save+0x336C,0x8236, OnPC)\n',
			'\telseif LimitLv == 7 then WriteShort(Save+0x336C,0x8237, OnPC) end\n'
		],
		driveLevels: [
			new FormLevel("Limit LV2", new Reward("Auto Limit", 0x238, "Ability"), 0x00B4, 3),
			new FormLevel("Limit LV3", new Reward("Dodge Roll LV 1", 0x234, "DodgeRoll"), 0x00BC, 6),
			new FormLevel("Limit LV4", new Reward("Draw", 0x195, "Ability"), 0x00C4, 12),
			new FormLevel("Limit LV5", new Reward("Dodge Roll LV 2", 0x235, "DodgeRoll"), 0x00CC, 19),
			new FormLevel("Limit LV6", new Reward("Lucky Lucky", 0x197, "Ability"), 0x00D4, 23),
			new FormLevel("Limit LV7", new Reward("Dodge Roll LV 3", 0x236, "DodgeRoll"), 0x00DC, 36)
		]
	},
	{
		driveForm: 'Master',
		removeGrowthJankPnachCodes: [
			'//Remove Aerial Dodge LV1\n',
			'patch=1,EE,E0030102,extended,0032EECE\n',
			'patch=1,EE,1036E5C0,extended,00000000\n',
			'patch=1,EE,1032EED4,extended,00008066\n',
			'patch=1,EE,1032EEEA,extended,00000000\n',
			'//Remove Aerial Dodge LV2 1\n',
			'patch=1,EE,E0010102,extended,0032EECE\n',
			'patch=1,EE,1036E5C2,extended,00000067\n',
			'//Remove Aerial Dodge LV2 2\n',
			'patch=1,EE,E0030103,extended,0032EECE\n',
			'patch=1,EE,1036E5C2,extended,00000000\n',
			'patch=1,EE,1032EED4,extended,00008067\n',
			'patch=1,EE,1032EEEA,extended,00000000\n',
			'//Remove Aerial Dodge LV3 1\n',
			'patch=1,EE,E0010104,extended,0032EECE\n',
			'patch=1,EE,1036E5C4,extended,00000068\n',
			'//Remove Aerial Dodge LV3 2\n',
			'patch=1,EE,E0030105,extended,0032EECE\n',
			'patch=1,EE,1036E5C4,extended,00000000\n',
			'patch=1,EE,1032EED4,extended,00008068\n',
			'patch=1,EE,1032EEEA,extended,00000000\n',
			'//Remove Aerial Dodge MAX 1\n',
			'patch=1,EE,E0010106,extended,0032EECE\n',
			'patch=1,EE,1036E5C6,extended,00000069\n',
			'//Remove Aerial Dodge MAX 2\n',
			'patch=1,EE,E0020107,extended,0032EECE\n',
			'patch=1,EE,1032EED4,extended,00008069\n',
			'patch=1,EE,1032EEEA,extended,00000000\n'
		],
		removeGrowthJankLuaCodes: [
			'\tWriteByte(BAR(Btl0, 0x10, 0x0E9), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x0F1), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x0F9), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x101), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x109), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x111), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x119), 0x00, OnPC)\n',
			'\tMastrLv = ReadByte(Save+0x339E)\n',
			'\tif MastrLv == 1 or MastrLv == 2 then WriteShort(Save+0x33A4,0x8066, OnPC)\n',
			'\telseif MastrLv == 3 or MastrLv == 4 then WriteShort(Save+0x33A4,0x8067, OnPC)\n',
			'\telseif MastrLv == 5 or MastrLv == 6 then WriteShort(Save+0x33A4,0x8068, OnPC)\n',
			'\telseif MastrLv == 7 then WriteShort(Save+0x33A4,0x8069, OnPC) end\n'
		],
		driveLevels: [
			new FormLevel("Master LV2", new Reward("Auto Master", 0x183, "Ability"), 0x00EC, 60),
			new FormLevel("Master LV3", new Reward("Aerial Dodge LV 1", 0x066, "AerialDodge"), 0x00F4, 180),
			new FormLevel("Master LV4", new Reward("Air Combo Plus", 0x0A3, "Ability"), 0x00FC, 216),
			new FormLevel("Master LV5", new Reward("Aerial Dodge LV 2", 0x067, "AerialDodge"), 0x0104, 270),
			new FormLevel("Master LV6", new Reward("Air Combo Plus", 0x0A3, "Ability"), 0x010C, 324),
			new FormLevel("Master LV7", new Reward("Aerial Dodge LV 3", 0x068, "AerialDodge"), 0x0114, 450)
		]
	},
	{
		driveForm: 'Final',
		removeGrowthJankPnachCodes: [
			'//Remove Glide LV1\n',
			'patch=1,EE,E0030102,extended,0032EF06\n',
			'patch=1,EE,1036E5CA,extended,00000000\n',
			'patch=1,EE,1032EF0C,extended,0000806A\n',
			'patch=1,EE,1032EF1E,extended,00000000\n',
			'//Remove Glide LV2 1\n',
			'patch=1,EE,E0010102,extended,0032EF06\n',
			'patch=1,EE,1036E5CC,extended,0000006B\n',
			'//Remove Glide LV2 2\n',
			'patch=1,EE,E0030103,extended,0032EF06\n',
			'patch=1,EE,1036E5CC,extended,00000000\n',
			'patch=1,EE,1032EF0C,extended,0000806B\n',
			'patch=1,EE,1032EF1E,extended,00000000\n',
			'//Remove Glide LV3 1\n',
			'patch=1,EE,E0010104,extended,0032EF06\n',
			'patch=1,EE,1036E5CE,extended,0000006C\n',
			'//Remove Glide LV3 2\n',
			'patch=1,EE,E0030105,extended,0032EF06\n',
			'patch=1,EE,1036E5CE,extended,00000000\n',
			'patch=1,EE,1032EF0C,extended,0000806C\n',
			'patch=1,EE,1032EF1E,extended,00000000\n',
			'//Remove Glide LV2 1\n',
			'patch=1,EE,E0010106,extended,0032EF06\n',
			'patch=1,EE,1036E5D0,extended,0000006D\n',
			'//Remove Glide MAX 2\n',
			'patch=1,EE,E0020107,extended,0032EF06\n',
			'patch=1,EE,1032EF0C,extended,0000806D\n',
			'patch=1,EE,1032EF1E,extended,00000000\n'
		],
		removeGrowthJankLuaCodes: [
			'\tWriteByte(BAR(Btl0, 0x10, 0x121), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x129), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x131), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x139), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x141), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x149), 0x00, OnPC)\n',
			'\tWriteByte(BAR(Btl0, 0x10, 0x151), 0x00, OnPC)\n',
			'\tFinalLv = ReadByte(Save+0x33D6)\n',
			'\tif FinalLv == 1 or FinalLv == 2 then WriteShort(Save+0x33DC,0x806A, OnPC)\n',
			'\telseif FinalLv == 3 or FinalLv == 4 then WriteShort(Save+0x33DC,0x806B, OnPC)\n',
			'\telseif FinalLv == 5 or FinalLv == 6 then WriteShort(Save+0x33DC,0x806C, OnPC)\n',
			'\telseif FinalLv == 7 then WriteShort(Save+0x33DC,0x806D, OnPC) end\n\n'
		],
		driveLevels: [
			new FormLevel("Final LV2", new Reward("Auto Final", 0x184, "Ability"), 0x0124, 12),
			new FormLevel("Final LV3", new Reward("Glide LV 1", 0x06A, "Glide"), 0x012C, 24),
			new FormLevel("Final LV4", new Reward("Form Boost", 0x18E, "Ability"), 0x0134, 48),
			new FormLevel("Final LV5", new Reward("Glide LV 2", 0x06B, "Glide"), 0x013C, 76),
			new FormLevel("Final LV6", new Reward("Form Boost", 0x18E, "Ability"), 0x0144, 133),
			new FormLevel("Final LV7", new Reward("Glide LV 3", 0x06C, "Glide"), 0x014C, 157)
		]
	},
	{
		driveForm: 'Summon',
		removeGrowthJankPnachCodes: [],
		removeGrowthJankLuaCodes: [],
		driveLevels: [
			new FormLevel("Summon LV2", new Reward("EMPTY", 0x000, "EMPTY"), 0x000C, 6),
			new FormLevel("Summon LV3", new Reward("EMPTY", 0x000, "EMPTY"), 0x0014, 16),
			new FormLevel("Summon LV4", new Reward("EMPTY", 0x000, "EMPTY"), 0x001C, 25),
			new FormLevel("Summon LV5", new Reward("EMPTY", 0x000, "EMPTY"), 0x0024, 42),
			new FormLevel("Summon LV6", new Reward("EMPTY", 0x000, "EMPTY"), 0x002C, 63),
			new FormLevel("Summon LV7", new Reward("EMPTY", 0x000, "EMPTY"), 0x0034, 98)
		]
	}
]