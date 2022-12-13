import { Reward } from '../rewards/RewardsData'

export class FormLevel {
	constructor(level, vanilla, rewardAddress, exp, expAddress, zipID) {
		this.level = level
		this.vanillaReward = { ...vanilla }
		this.replacementReward = { ...vanilla }
		this.rewardAddress = rewardAddress
		this.vanillaEXP = exp
		this.replacementEXP = exp
		this.EXPAddress = expAddress
		this.zipID = zipID
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
			return new FormLevel(this.level, new Reward(this.vanillaReward.reward, this.vanillaReward.index, this.vanillaReward.iconType), this.rewardAddress, this.vanillaEXP,
				this.EXPAddress)
		}
		this.replace = (newFormData) => {
			let ret = this.copy()

			ret.replacementReward = { ...newFormData.reward }
			ret.replacementEXP = newFormData.currentEXPMultiplierValue === 2 ? newFormData.currentEXP : Math.max(1, Math.floor((2 * this.vanillaEXP) / newFormData.currentEXPMultiplierValue))
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
				ret += 'patch=1,EE,1' + this.rewardAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
				ret += this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // ' + this.level + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			if (this.isEXPReplaced()) {
				ret += 'patch=1,EE,1' + this.EXPAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,' + this.replacementEXP.toString(16).toUpperCase().padStart(8, 0)
				if (isCommented) ret += ' // ' + this.replacementEXP + ' experience is now required to reach ' + this.level
				ret += '\n'
			}
			return ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ''
			let rewardAddress = this.rewardAddress - 0x1CE5D80
			let EXPAddress = this.EXPAddress - 0x1CE5D80
			if (this.isRewardReplaced()) {
				ret += '\tWriteShort(Btl0+0x' + rewardAddress.toString(16).toUpperCase() + ',0x'
				ret += this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0') + ')'
				if (isCommented) ret += ' -- ' + this.level + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			if (this.isEXPReplaced()) {
				ret += '\tWriteShort(Btl0+0x' + EXPAddress.toString(16).toUpperCase() + ',0x'
				ret += this.replacementEXP.toString(16).toUpperCase().padStart(4, '0') + ')'
				if (isCommented) ret += ' -- ' + this.replacementEXP + ' experience is now required to reach ' + this.level
				ret += '\n'
			}
			return ret
		}
		this.saveToYml = (isCommented, formId) => {
			// fix this form level bullshit
			let ret = ''
			// if (this.isRewardReplaced() || this.isEXPReplaced()) {
				ret += '- Ability: ' + this.replacementReward.index + '\n  '
				ret += 'Experience: ' + this.replacementEXP + '\n  '
				ret += 'FormId: ' + formId + '\n  '
				ret += 'FormLevel: ' + this.level.slice(-1) + '\n  '
				ret += 'GrowthAbilityLevel: 0\n'
			// }
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
			// if (driveForm.driveLevels.some((level => level.isRewardReplaced() || level.isEXPReplaced())))
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
		let globalIndex = 0
		return formsData.map(driveForm => {
			if (globalIndex < formLoadData.length) {
				if (formLoadData[globalIndex].driveForm === driveForm.driveForm) {
					let formIndex = 0
					let newForms = driveForm.driveLevels.map(driveLevel => {
						if (formIndex < formLoadData[globalIndex].driveLevels.length) {
							if (formLoadData[globalIndex].driveLevels[formIndex].level === driveLevel.level) {
								let ret = driveLevel.loadFromJSON(formLoadData[globalIndex].driveLevels[formIndex])
								formIndex++
								return ret
							}
						}
						return driveLevel
					})
					globalIndex++
					return {
						...driveForm,
						driveLevels: newForms
					}
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
			'\tWriteByte(Btl0+0x344A5,0x00)\n',
			'\tWriteByte(Btl0+0x344AD,0x00)\n',
			'\tWriteByte(Btl0+0x344B5,0x00)\n',
			'\tWriteByte(Btl0+0x344BD,0x00)\n',
			'\tWriteByte(Btl0+0x344C5,0x00)\n',
			'\tWriteByte(Btl0+0x344CD,0x00)\n',
			'\tWriteByte(Btl0+0x344D5,0x00)\n',
			'\tValorLv = ReadByte(Save+0x32F6)\n',
			'\tif ValorLv == 1 or ValorLv == 2 then WriteShort(Save+0x32FC,0x805E)\n',
			'\telseif ValorLv == 3 or ValorLv == 4 then WriteShort(Save+0x32FC,0x805F)\n',
			'\telseif ValorLv == 5 or ValorLv == 6 then WriteShort(Save+0x32FC,0x8060)\n',
			'\telseif ValorLv == 7 then WriteShort(Save+0x32FC,0x8061) end\n'
		],
		driveLevels: [
			new FormLevel('Valor LV2', new Reward('Auto Valor', 0x181, 'Ability'), 0x1D1A22E, 80, 0x1D1A228),
			new FormLevel('Valor LV3', new Reward('High Jump LV 1', 0x05E, 'HighJump'), 0x1D1A236, 160, 0x1D1A230),
			new FormLevel('Valor LV4', new Reward('Combo Plus', 0x0A2, 'Ability'), 0x1D1A23E, 280, 0x1D1A238),
			new FormLevel('Valor LV5', new Reward('High Jump LV 2', 0x05F, 'HighJump'), 0x1D1A246, 448, 0x1D1A240),
			new FormLevel('Valor LV6', new Reward('Combo Plus', 0x0A2, 'Ability'), 0x1D1A24E, 560, 0x1D1A248),
			new FormLevel('Valor LV7', new Reward('High Jump LV 3', 0x060, 'HighJump'), 0x1D1A256, 672, 0x1D1A250)
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
			'\tWriteByte(Btl0+0x344DD,0x00)\n',
			'\tWriteByte(Btl0+0x344E5,0x00)\n',
			'\tWriteByte(Btl0+0x344ED,0x00)\n',
			'\tWriteByte(Btl0+0x344F5,0x00)\n',
			'\tWriteByte(Btl0+0x344FD,0x00)\n',
			'\tWriteByte(Btl0+0x34505,0x00)\n',
			'\tWriteByte(Btl0+0x3450D,0x00)\n',
			'\tWisdmLv = ReadByte(Save+0x332E)\n',
			'\tif WisdmLv == 1 or WisdmLv == 2 then WriteShort(Save+0x3334,0x8062)\n',
			'\telseif WisdmLv == 3 or WisdmLv == 4 then WriteShort(Save+0x3334,0x8063)\n',
			'\telseif WisdmLv == 5 or WisdmLv == 6 then WriteShort(Save+0x3334,0x8064)\n',
			'\telseif WisdmLv == 7 then WriteShort(Save+0x3334,0x8065) end\n'
		],
		driveLevels: [
			new FormLevel('Wisdom LV2', new Reward('Auto Wisdom', 0x182, 'Ability'), 0x1D1A266, 20, 0x1D1A260),
			new FormLevel('Wisdom LV3', new Reward('Quick Run LV 1', 0x062, 'QuickRun'), 0x1D1A26E, 60, 0x1D1A268),
			new FormLevel('Wisdom LV4', new Reward('MP Rage', 0x19C, 'Ability'), 0x1D1A276, 72, 0x1D1A270),
			new FormLevel('Wisdom LV5', new Reward('Quick Run LV 2', 0x063, 'QuickRun'), 0x1D1A27E, 90, 0x1D1A278),
			new FormLevel('Wisdom LV6', new Reward('MP Haste', 0x19D, 'Ability'), 0x1D1A286, 108, 0x1D1A280),
			new FormLevel('Wisdom LV7', new Reward('Quick Run LV 3', 0x064, 'QuickRun'), 0x1D1A28E, 150, 0x1D1A288)
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
			'\tWriteByte(Btl0+0x34505,0x00)\n',
			'\tWriteByte(Btl0+0x3450D,0x00)\n',
			'\tWriteByte(Btl0+0x34515,0x00)\n',
			'\tWriteByte(Btl0+0x3451D,0x00)\n',
			'\tWriteByte(Btl0+0x34525,0x00)\n',
			'\tWriteByte(Btl0+0x3452D,0x00)\n',
			'\tWriteByte(Btl0+0x34535,0x00)\n',
			'\tLimitLv = ReadByte(Save+0x3366)\n',
			'\tif LimitLv == 1 or LimitLv == 2 then WriteShort(Save+0x336C,0x8234)\n',
			'\telseif LimitLv == 3 or LimitLv == 4 then WriteShort(Save+0x336C,0x8235)\n',
			'\telseif LimitLv == 5 or LimitLv == 6 then WriteShort(Save+0x336C,0x8236)\n',
			'\telseif LimitLv == 7 then WriteShort(Save+0x336C,0x8237) end\n'
		],
		driveLevels: [
			new FormLevel('Limit LV2', new Reward('Auto Limit', 0x238, 'Ability'), 0x1D1A29E, 3, 0x1D1A298),
			new FormLevel('Limit LV3', new Reward('Dodge Roll LV 1', 0x234, 'DodgeRoll'), 0x1D1A2A6, 6, 0x1D1A2A0),
			new FormLevel('Limit LV4', new Reward('Draw', 0x195, 'Ability'), 0x1D1A2AE, 12, 0x1D1A2A8),
			new FormLevel('Limit LV5', new Reward('Dodge Roll LV 2', 0x235, 'DodgeRoll'), 0x1D1A2B6, 19, 0x1D1A2B0),
			new FormLevel('Limit LV6', new Reward('Lucky Lucky', 0x197, 'Ability'), 0x1D1A2BE, 23, 0x1D1A2B8),
			new FormLevel('Limit LV7', new Reward('Dodge Roll LV 3', 0x236, 'DodgeRoll'), 0x1D1A2C6, 36, 0x1D1A2C0)
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
			'\tWriteByte(Btl0+0x3453D,0x00)\n',
			'\tWriteByte(Btl0+0x34545,0x00)\n',
			'\tWriteByte(Btl0+0x3454D,0x00)\n',
			'\tWriteByte(Btl0+0x34555,0x00)\n',
			'\tWriteByte(Btl0+0x3455D,0x00)\n',
			'\tWriteByte(Btl0+0x34565,0x00)\n',
			'\tWriteByte(Btl0+0x3456D,0x00)\n',
			'\tMastrLv = ReadByte(Save+0x339E)\n',
			'\tif MastrLv == 1 or MastrLv == 2 then WriteShort(Save+0x33A4,0x8066)\n',
			'\telseif MastrLv == 3 or MastrLv == 4 then WriteShort(Save+0x33A4,0x8067)\n',
			'\telseif MastrLv == 5 or MastrLv == 6 then WriteShort(Save+0x33A4,0x8068)\n',
			'\telseif MastrLv == 7 then WriteShort(Save+0x33A4,0x8069) end\n'
		],
		driveLevels: [
			new FormLevel('Master LV2', new Reward('Auto Master', 0x183, 'Ability'), 0x1D1A2D6, 60, 0x1D1A2D0),
			new FormLevel('Master LV3', new Reward('Aerial Dodge LV 1', 0x066, 'AerialDodge'), 0x1D1A2DE, 180, 0x1D1A2D8),
			new FormLevel('Master LV4', new Reward('Air Combo Plus', 0x0A3, 'Ability'), 0x1D1A2E6, 216, 0x1D1A2E0),
			new FormLevel('Master LV5', new Reward('Aerial Dodge LV 2', 0x067, 'AerialDodge'), 0x1D1A2EE, 270, 0x1D1A2E8),
			new FormLevel('Master LV6', new Reward('Air Combo Plus', 0x0A3, 'Ability'), 0x1D1A2F6, 324, 0x1D1A2F0),
			new FormLevel('Master LV7', new Reward('Aerial Dodge LV 3', 0x068, 'AerialDodge'), 0x1D1A2FE, 450, 0x1D1A2F8)
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
			'\tWriteByte(Btl0+0x34575,0x00)\n',
			'\tWriteByte(Btl0+0x3457D,0x00)\n',
			'\tWriteByte(Btl0+0x34585,0x00)\n',
			'\tWriteByte(Btl0+0x3458D,0x00)\n',
			'\tWriteByte(Btl0+0x34595,0x00)\n',
			'\tWriteByte(Btl0+0x3459D,0x00)\n',
			'\tWriteByte(Btl0+0x345A5,0x00)\n',
			'\tFinalLv = ReadByte(Save+0x33D6)\n',
			'\tif FinalLv == 1 or FinalLv == 2 then WriteShort(Save+0x33DC,0x806A)\n',
			'\telseif FinalLv == 3 or FinalLv == 4 then WriteShort(Save+0x33DC,0x806B)\n',
			'\telseif FinalLv == 5 or FinalLv == 6 then WriteShort(Save+0x33DC,0x806C)\n',
			'\telseif FinalLv == 7 then WriteShort(Save+0x33DC,0x806D) end\n\n'
		],
		driveLevels: [
			new FormLevel('Final LV2', new Reward('Auto Final', 0x184, 'Ability'), 0x1D1A30E, 12, 0x1D1A308),
			new FormLevel('Final LV3', new Reward('Glide LV 1', 0x06A, 'Glide'), 0x1D1A316, 24, 0x1D1A310),
			new FormLevel('Final LV4', new Reward('Form Boost', 0x18E, 'Ability'), 0x1D1A31E, 48, 0x1D1A318),
			new FormLevel('Final LV5', new Reward('Glide LV 2', 0x06B, 'Glide'), 0x1D1A326, 76, 0x1D1A320),
			new FormLevel('Final LV6', new Reward('Form Boost', 0x18E, 'Ability'), 0x1D1A32E, 133, 0x1D1A328),
			new FormLevel('Final LV7', new Reward('Glide LV 3', 0x06C, 'Glide'), 0x1D1A336, 157, 0x1D1A330)
		]
	},
	{
		driveForm: 'Summon',
		removeGrowthJankPnachCodes: [],
		removeGrowthJankLuaCodes: [],
		driveLevels: [
			new FormLevel('Summon LV2', new Reward('EMPTY', 0x000, 'EMPTY'), 0x1D1A1EE, 6, 0x1D1A1F0),
			new FormLevel('Summon LV3', new Reward('EMPTY', 0x000, 'EMPTY'), 0x1D1A1F6, 16, 0x1D1A1F8),
			new FormLevel('Summon LV4', new Reward('EMPTY', 0x000, 'EMPTY'), 0x1D1A1FE, 25, 0x1D1A200),
			new FormLevel('Summon LV5', new Reward('EMPTY', 0x000, 'EMPTY'), 0x1D1A206, 42, 0x1D1A208),
			new FormLevel('Summon LV6', new Reward('EMPTY', 0x000, 'EMPTY'), 0x1D1A20E, 63, 0x1D1A210),
			new FormLevel('Summon LV7', new Reward('EMPTY', 0x000, 'EMPTY'), 0x1D1A216, 98, 0x1D1A218)
		]
	}
]