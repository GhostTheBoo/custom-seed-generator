import { Reward } from './rewardsData'

export class FormLevel {
	constructor(level, vanilla, rewardAddress, exp, expAddress) {
		this.level = level
		this.vanillaReward = { ...vanilla }
		this.replacementReward = { ...vanilla }
		this.vanillaAddress = rewardAddress
		this.vanillaEXP = exp
		this.replacementEXP = exp
		this.EXPAddress = expAddress
		this.toBeReplaced = false
	}

	isEXPReplaced() {
		return this.replacementEXP !== this.vanillaEXP
	}
	isRewardReplaced() {
		return this.replacementReward.index !== this.vanillaReward.index
	}

	vanilla() {
		return new FormLevel(this.level, new Reward(this.vanillaReward.reward, this.vanillaReward.index, this.vanillaReward.iconType), this.rewardAddress, this.vanillaEXP, this.EXPAddress)
	}

	replace(newFormData) {
		return {
			...this,
			vanillaReward: { ...this.vanillaReward },
			replacementReward: { ...newFormData.reward },
			replacementEXP: newFormData.currentEXPMultiplierValue === 0 ? newFormData.currentEXP : Math.max(1, Math.floor((2 * this.vanillaEXP) / newFormData.currentEXPMultiplierValue)),
			toBeReplaced: false
		}
	}

	markForReplacement(toBeReplaced) {
		return {
			...this,
			vanillaReward: { ...this.vanillaReward },
			replacementReward: { ...this.replacementReward },
			toBeReplaced: toBeReplaced
		}
	}

	toPnach() {
		let ret = ''
		if (this.isRewardReplaced()) {
			ret += 'patch=1,EE,' + this.vanillaAddress.toString(16).toUpperCase().padStart(8, '0') + ',extended,0000'
			ret += this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0')
			ret += ' // ' + this.level + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward + '\n'
		}
		if (this.isEXPReplaced()) {
			ret += 'patch=1,EE,' + this.EXPAddress.toString(16).toUpperCase().padStart(8, '0') + ',extended,' + this.replacementEXP.toString(16).toUpperCase().padStart(8, 0)
			ret += ' // ' + this.replacementEXP + ' experience is now required to reach ' + this.level + '\n'
		}
		return ret
	}
}

export const formsData = [
	{
		driveForm: 'Summon',
		removeGrowthJankCodes: [
		],
		driveLevels: [
			new FormLevel('Summon LV2', new Reward('EMPTY', 0x0000, 'EMPTY'), 0x11D1A1EE, 6, 0x11D1A1F0),
			new FormLevel('Summon LV3', new Reward('EMPTY', 0x0000, 'EMPTY'), 0x11D1A1F6, 16, 0x11D1A1F8),
			new FormLevel('Summon LV4', new Reward('EMPTY', 0x0000, 'EMPTY'), 0x11D1A1FE, 25, 0x11D1A200),
			new FormLevel('Summon LV5', new Reward('EMPTY', 0x0000, 'EMPTY'), 0x11D1A206, 42, 0x11D1A208),
			new FormLevel('Summon LV6', new Reward('EMPTY', 0x0000, 'EMPTY'), 0x11D1A20E, 63, 0x11D1A210),
			new FormLevel('Summon LV7', new Reward('EMPTY', 0x0000, 'EMPTY'), 0x11D1A216, 98, 0x11D1A218)
		]
	},
	{
		driveForm: 'Valor',
		removeGrowthJankCodes: [
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
		driveLevels: [
			new FormLevel('Valor LV2', new Reward('Auto Valor', 0x0181, 'Ability'), 0x11D1A22E, 80, 0x11D1A228),
			new FormLevel('Valor LV3', new Reward('High Jump LV 1', 0x005E, 'Ability'), 0x11D1A236, 160, 0x11D1A230),
			new FormLevel('Valor LV4', new Reward('Combo Plus', 0x00A2, 'Ability'), 0x11D1A23E, 280, 0x11D1A238),
			new FormLevel('Valor LV5', new Reward('High Jump LV 2', 0x005F, 'Ability'), 0x11D1A246, 448, 0x11D1A240),
			new FormLevel('Valor LV6', new Reward('Combo Plus', 0x00A2, 'Ability'), 0x11D1A24E, 560, 0x11D1A248),
			new FormLevel('Valor LV7', new Reward('High Jump LV 3', 0x0060, 'Ability'), 0x11D1A256, 672, 0x11D1A250)
		]
	},
	{
		driveForm: 'Wisdom',
		removeGrowthJankCodes: [
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
		driveLevels: [
			new FormLevel('Wisdom LV2', new Reward('Auto Wisdom', 0x0182, 'Ability'), 0x11D1A266, 20, 0x11D1A260),
			new FormLevel('Wisdom LV3', new Reward('Quick Run LV 1', 0x0062, 'Ability'), 0x11D1A26E, 60, 0x11D1A268),
			new FormLevel('Wisdom LV4', new Reward('MP Rage', 0x019C, 'Ability'), 0x11D1A276, 72, 0x11D1A270),
			new FormLevel('Wisdom LV5', new Reward('Quick Run LV 2', 0x0063, 'Ability'), 0x11D1A27E, 90, 0x11D1A278),
			new FormLevel('Wisdom LV6', new Reward('MP Haste', 0x019D, 'Ability'), 0x11D1A286, 108, 0x11D1A280),
			new FormLevel('Wisdom LV7', new Reward('Quick Run LV 3', 0x0064, 'Ability'), 0x11D1A28E, 150, 0x11D1A288)
		]
	},
	{
		driveForm: 'Limit',
		removeGrowthJankCodes: [
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
		driveLevels: [
			new FormLevel('Limit LV2', new Reward('Auto Limit', 0x0238, 'Ability'), 0x11D1A29E, 3, 0x11D1A298),
			new FormLevel('Limit LV3', new Reward('Dodge Roll LV 1', 0x0234, 'Ability'), 0x11D1A2A6, 6, 0x11D1A2A0),
			new FormLevel('Limit LV4', new Reward('Draw', 0x0195, 'Ability'), 0x11D1A2AE, 12, 0x11D1A2A8),
			new FormLevel('Limit LV5', new Reward('Dodge Roll LV 2', 0x0235, 'Ability'), 0x11D1A2B6, 19, 0x11D1A2B0),
			new FormLevel('Limit LV6', new Reward('Lucky Lucky', 0x0197, 'Ability'), 0x11D1A2BE, 23, 0x11D1A2B8),
			new FormLevel('Limit LV7', new Reward('Dodge Roll LV 3', 0x0236, 'Ability'), 0x11D1A2C6, 36, 0x11D1A2C0)
		]
	},
	{
		driveForm: 'Master',
		removeGrowthJankCodes: [
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
		driveLevels: [
			new FormLevel('Master LV2', new Reward('Auto Master', 0x0183, 'Ability'), 0x11D1A2D6, 60, 0x11D1A2D0),
			new FormLevel('Master LV3', new Reward('Aerial Dodge LV 1', 0x0066, 'Ability'), 0x11D1A2DE, 180, 0x11D1A2D8),
			new FormLevel('Master LV4', new Reward('Air Combo Plus', 0x00A3, 'Ability'), 0x11D1A2E6, 216, 0x11D1A2E0),
			new FormLevel('Master LV5', new Reward('Aerial Dodge LV 2', 0x0067, 'Ability'), 0x11D1A2EE, 270, 0x11D1A2E8),
			new FormLevel('Master LV6', new Reward('Air Combo Plus', 0x00A3, 'Ability'), 0x11D1A2F6, 324, 0x11D1A2F0),
			new FormLevel('Master LV7', new Reward('Aerial Dodge LV 3', 0x0068, 'Ability'), 0x11D1A2FE, 450, 0x11D1A2F8)
		]
	},
	{
		driveForm: 'Final',
		removeGrowthJankCodes: [
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
		driveLevels: [
			new FormLevel('Final LV2', new Reward('Auto Final', 0x0184, 'Ability'), 0x11D1A30E, 12, 0x11D1A308),
			new FormLevel('Final LV3', new Reward('Glide LV 1', 0x006A, 'Ability'), 0x11D1A316, 24, 0x11D1A310),
			new FormLevel('Final LV4', new Reward('Form Boost', 0x018E, 'Ability'), 0x11D1A31E, 48, 0x11D1A318),
			new FormLevel('Final LV5', new Reward('Glide LV 2', 0x006B, 'Ability'), 0x11D1A326, 76, 0x11D1A320),
			new FormLevel('Final LV6', new Reward('Form Boost', 0x018E, 'Ability'), 0x11D1A32E, 133, 0x11D1A328),
			new FormLevel('Final LV7', new Reward('Glide LV 3', 0x006C, 'Ability'), 0x11D1A336, 157, 0x11D1A330)
		]
	}
]