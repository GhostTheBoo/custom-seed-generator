const formsData = [
	{
		driveForm: "Valor",
		removeGrowthJankCodes: [
			"//Remove High Jump LV1\n",
			"patch=1,EE,E0030102,extended,0032EE26\n",
			"patch=1,EE,1036E5A2,extended,00000000\n",
			"patch=1,EE,1032EE2C,extended,0000805E\n",
			"patch=1,EE,1032EE42,extended,00000000\n",
			"//Remove High Jump LV2 1\n",
			"patch=1,EE,E0010102,extended,0032EE26\n",
			"patch=1,EE,1036E5A4,extended,0000005F\n",
			"//Remove High Jump LV2 2\n",
			"patch=1,EE,E0030103,extended,0032EE26\n",
			"patch=1,EE,1036E5A4,extended,00000000\n",
			"patch=1,EE,1032EE2C,extended,0000805F\n",
			"patch=1,EE,1032EE42,extended,00000000\n",
			"//Remove High Jump LV3 1\n",
			"patch=1,EE,E0010104,extended,0032EE26\n",
			"patch=1,EE,1036E5A6,extended,00000060\n",
			"//Remove High Jump LV3 2\n",
			"patch=1,EE,E0030105,extended,0032EE26\n",
			"patch=1,EE,1036E5A6,extended,00000000\n",
			"patch=1,EE,1032EE2C,extended,00008060\n",
			"patch=1,EE,1032EE42,extended,00000000\n",
			"//Remove High Jump MAX 1\n",
			"patch=1,EE,E0010106,extended,0032EE26\n",
			"patch=1,EE,1036E5A8,extended,00000061\n",
			"//Remove High Jump MAX 2\n",
			"patch=1,EE,E0020107,extended,0032EE26\n",
			"patch=1,EE,1032EE2C,extended,00008061\n",
			"patch=1,EE,1032EE42,extended,00000000\n"
		],
		driveLevels: [
			{
				level: "Valor LV2",
				vanillaReward:{
					reward: 'Auto Valor',
					index: '0181'
				},
				replacementReward:{
					reward: 'Auto Valor',
					index: '0181'
				},
				vanillaAddress: '11D1A22E',
				vanillaEXP: 80,
				replacementEXP: 80,
				EXPAddress: '11D1A228',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Valor LV3",
				vanillaReward:{
					reward: 'High Jump LV 1',
					index: '005E'
				},
				replacementReward:{
					reward: 'High Jump LV 1',
					index: '005E'
				},
				vanillaAddress: '11D1A236',
				vanillaEXP: 160,
				replacementEXP: 160,
				EXPAddress: '11D1A230',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Valor LV4",
				vanillaReward:{
					reward: 'Combo Plus',
					index: '00A2'
				},
				replacementReward:{
					reward: 'Combo Plus',
					index: '00A2'
				},
				vanillaAddress: '11D1A23E',
				vanillaEXP: 280,
				replacementEXP: 280,
				EXPAddress: '11D1A238',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Valor LV5",
				vanillaReward:{
					reward: 'High Jump LV 2',
					index: '005F'
				},
				replacementReward:{
					reward: 'High Jump LV 2',
					index: '005F'
				},
				vanillaAddress: '11D1A246',
				vanillaEXP: 448,
				replacementEXP: 448,
				EXPAddress: '11D1A240',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Valor LV6",
				vanillaReward:{
					reward: 'Combo Plus',
					index: '00A2'
				},
				replacementReward:{
					reward: 'Combo Plus',
					index: '00A2'
				},
				vanillaAddress: '11D1A24E',
				vanillaEXP: 560,
				replacementEXP: 560,
				EXPAddress: '11D1A248',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Valor LV7",
				vanillaReward:{
					reward: 'High Jump LV 3',
					index: '0060'
				},
				replacementReward:{
					reward: 'High Jump LV 3',
					index: '0060'
				},
				vanillaAddress: '11D1A256',
				vanillaEXP: 672,
				replacementEXP: 672,
				EXPAddress: '11D1A250',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			}
		]
	},
	{
		driveForm: "Wisdom",
		removeGrowthJankCodes: [
			"//Remove Quick Run LV1\n",
			"patch=1,EE,E0030102,extended,0032EE5E\n",
			"patch=1,EE,1036E5AC,extended,00000000\n",
			"patch=1,EE,1032EE64,extended,00008062\n",
			"patch=1,EE,1032EE74,extended,00000000\n",
			"//Remove Quick Run LV2 1\n",
			"patch=1,EE,E0010102,extended,0032EE5E\n",
			"patch=1,EE,1036E5AE,extended,00000063\n",
			"//Remove Quick Run LV2\n",
			"patch=1,EE,E0030103,extended,0032EE5E\n",
			"patch=1,EE,1036E5AE,extended,00000000\n",
			"patch=1,EE,1032EE64,extended,00008063\n",
			"patch=1,EE,1032EE74,extended,00000000\n",
			"//Remove Quick Run LV3 1\n",
			"patch=1,EE,E0010104,extended,0032EE5E\n",
			"patch=1,EE,1036E5B0,extended,00000064\n",
			"//Remove Quick Run LV3 2\n",
			"patch=1,EE,E0030105,extended,0032EE5E\n",
			"patch=1,EE,1036E5B0,extended,00000000\n",
			"patch=1,EE,1032EE64,extended,00008064\n",
			"patch=1,EE,1032EE74,extended,00000000\n",
			"//Remove Quick Run MAX 1\n",
			"patch=1,EE,E0010106,extended,0032EE5E\n",
			"patch=1,EE,1036E5B2,extended,00000065\n",
			"//Remove Quick Run MAX 2\n",
			"patch=1,EE,E0020107,extended,0032EE5E\n",
			"patch=1,EE,1032EE64,extended,00008065\n",
			"patch=1,EE,1032EE74,extended,00000000\n"
		],
		driveLevels: [
			{
				level: "Wisdom LV2",
				vanillaReward:{
					reward: 'Auto Wisdom',
					index: '0182'
				},
				replacementReward:{
					reward: 'Auto Wisdom',
					index: '0182'
				},
				vanillaAddress: '11D1A266',
				vanillaEXP: 20,
				replacementEXP: 20,
				EXPAddress: '11D1A260',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Wisdom LV3",
				vanillaReward:{
					reward: 'Quick Run LV 1',
					index: '0062'
				},
				replacementReward:{
					reward: 'Quick Run LV 1',
					index: '0062'
				},
				vanillaAddress: '11D1A26E',
				vanillaEXP: 60,
				replacementEXP: 60,
				EXPAddress: '11D1A268',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Wisdom LV4",
				vanillaReward:{
					reward: 'MP Rage',
					index: '019C'
				},
				replacementReward:{
					reward: 'MP Rage',
					index: '019C'
				},
				vanillaAddress: '11D1A276',
				vanillaEXP: 72,
				replacementEXP: 72,
				EXPAddress: '11D1A270',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Wisdom LV5",
				vanillaReward:{
					reward: 'Quick Run LV 2',
					index: '0063'
				},
				replacementReward:{
					reward: 'Quick Run LV 2',
					index: '0063'
				},
				vanillaAddress: '11D1A27E',
				vanillaEXP: 90,
				replacementEXP: 90,
				EXPAddress: '11D1A278',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Wisdom LV6",
				vanillaReward:{
					reward: 'MP Haste',
					index: '019D'
				},
				replacementReward:{
					reward: 'MP Haste',
					index: '019D'
				},
				vanillaAddress: '11D1A286',
				vanillaEXP: 108,
				replacementEXP: 108,
				EXPAddress: '11D1A280',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Wisdom LV7",
				vanillaReward:{
					reward: 'Quick Run LV 3',
					index: '0064'
				},
				replacementReward:{
					reward: 'Quick Run LV 3',
					index: '0064'
				},
				vanillaAddress: '11D1A28E',
				vanillaEXP: 150,
				replacementEXP: 150,
				EXPAddress: '11D1A288',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			}
		]
	},
	{
		driveForm: "Limit",
		removeGrowthJankCodes: [
			"//Remove Dodge Roll LV1\n",
			"patch=1,EE,E0030102,extended,0032EE96\n",
			"patch=1,EE,1036E5B6,extended,00000000\n",
			"patch=1,EE,1032EE9C,extended,00008234\n",
			"patch=1,EE,1032EEC2,extended,00000000\n",
			"//Remove Dodge Roll LV2 1\n",
			"patch=1,EE,E0010102,extended,0032EE96\n",
			"patch=1,EE,1036E5B8,extended,00000235\n",
			"//Remove Dodge Roll LV2 2\n",
			"patch=1,EE,E0030103,extended,0032EE96\n",
			"patch=1,EE,1036E5B8,extended,00000000\n",
			"patch=1,EE,1032EE9C,extended,00008235\n",
			"patch=1,EE,1032EEC2,extended,00000000\n",
			"//Remove Dodge Roll LV3 1\n",
			"patch=1,EE,E0010104,extended,0032EE96\n",
			"patch=1,EE,1036E5BA,extended,00000236\n",
			"//Remove Dodge Roll LV3 2\n",
			"patch=1,EE,E0030105,extended,0032EE96\n",
			"patch=1,EE,1036E5BA,extended,00000000\n",
			"patch=1,EE,1032EE9C,extended,00008236\n",
			"patch=1,EE,1032EEC2,extended,00000000\n",
			"//Remove Dodge Roll MAX 1\n",
			"patch=1,EE,E0010106,extended,0032EE96\n",
			"patch=1,EE,1036E5BC,extended,00000237\n",
			"//Remove Dodge Roll MAX 2\n",
			"patch=1,EE,E0020107,extended,0032EE96\n",
			"patch=1,EE,1032EE9C,extended,00008237\n",
			"patch=1,EE,1032EEC2,extended,00000000\n"
		],
		driveLevels: [
			{
				level: "Limit LV2",
				vanillaReward:{
					reward: 'Auto Limit',
					index: '0238'
				},
				replacementReward:{
					reward: 'Auto Limit',
					index: '0238'
				},
				vanillaAddress: '11D1A29E',
				vanillaEXP: 3,
				replacementEXP: 3,
				EXPAddress: '11D1A298',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Limit LV3",
				vanillaReward:{
					reward: 'Dodge Roll LV 1',
					index: '0234'
				},
				replacementReward:{
					reward: 'Dodge Roll LV 1',
					index: '0234'
				},
				vanillaAddress: '11D1A2A6',
				vanillaEXP: 6,
				replacementEXP: 6,
				EXPAddress: '11D1A2A0',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Limit LV4",
				vanillaReward:{
					reward: 'Draw',
					index: '0195'
				},
				replacementReward:{
					reward: 'Draw',
					index: '0195'
				},
				vanillaAddress: '11D1A2AE',
				vanillaEXP: 12,
				replacementEXP: 12,
				EXPAddress: '11D1A2A8',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Limit LV5",
				vanillaReward:{
					reward: 'Dodge Roll LV 2',
					index: '0235'
				},
				replacementReward:{
					reward: 'Dodge Roll LV 2',
					index: '0235'
				},
				vanillaAddress: '11D1A2B6',
				vanillaEXP: 19,
				replacementEXP: 19,
				EXPAddress: '11D1A2B0',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Limit LV6",
				vanillaReward:{
					reward: 'Lucky Lucky',
					index: '0197'
				},
				replacementReward:{
					reward: 'Lucky Lucky',
					index: '0197'
				},
				vanillaAddress: '11D1A2BE',
				vanillaEXP: 23,
				replacementEXP: 23,
				EXPAddress: '11D1A2B8',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Limit LV7",
				vanillaReward:{
					reward: 'Dodge Roll LV 3',
					index: '0236'
				},
				replacementReward:{
					reward: 'Dodge Roll LV 3',
					index: '0236'
				},
				vanillaAddress: '11D1A2C6',
				vanillaEXP: 36,
				replacementEXP: 36,
				EXPAddress: '11D1A2C0',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			}
		]
	},
	{
		driveForm: "Master",
		removeGrowthJankCodes: [
			"//Remove Aerial Dodge LV1\n",
			"patch=1,EE,E0030102,extended,0032EECE\n",
			"patch=1,EE,1036E5C0,extended,00000000\n",
			"patch=1,EE,1032EED4,extended,00008066\n",
			"patch=1,EE,1032EEEA,extended,00000000\n",
			"//Remove Aerial Dodge LV2 1\n",
			"patch=1,EE,E0010102,extended,0032EECE\n",
			"patch=1,EE,1036E5C2,extended,00000067\n",
			"//Remove Aerial Dodge LV2 2\n",
			"patch=1,EE,E0030103,extended,0032EECE\n",
			"patch=1,EE,1036E5C2,extended,00000000\n",
			"patch=1,EE,1032EED4,extended,00008067\n",
			"patch=1,EE,1032EEEA,extended,00000000\n",
			"//Remove Aerial Dodge LV3 1\n",
			"patch=1,EE,E0010104,extended,0032EECE\n",
			"patch=1,EE,1036E5C4,extended,00000068\n",
			"//Remove Aerial Dodge LV3 2\n",
			"patch=1,EE,E0030105,extended,0032EECE\n",
			"patch=1,EE,1036E5C4,extended,00000000\n",
			"patch=1,EE,1032EED4,extended,00008068\n",
			"patch=1,EE,1032EEEA,extended,00000000\n",
			"//Remove Aerial Dodge MAX 1\n",
			"patch=1,EE,E0010106,extended,0032EECE\n",
			"patch=1,EE,1036E5C6,extended,00000069\n",
			"//Remove Aerial Dodge MAX 2\n",
			"patch=1,EE,E0020107,extended,0032EECE\n",
			"patch=1,EE,1032EED4,extended,00008069\n",
			"patch=1,EE,1032EEEA,extended,00000000\n"
		],
		driveLevels: [
			{
				level: "Master LV2",
				vanillaReward:{
					reward: 'Auto Master',
					index: '0183'
				},
				replacementReward:{
					reward: 'Auto Master',
					index: '0183'
				},
				vanillaAddress: '11D1A2D6',
				vanillaEXP: 60,
				replacementEXP: 60,
				EXPAddress: '11D1A2D0',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Master LV3",
				vanillaReward:{
					reward: 'Aerial Dodge LV 1',
					index: '0066'
				},
				replacementReward:{
					reward: 'Aerial Dodge LV 1',
					index: '0066'
				},
				vanillaAddress: '11D1A2DE',
				vanillaEXP: 180,
				replacementEXP: 180,
				EXPAddress: '11D1A2D8',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Master LV4",
				vanillaReward:{
					reward: 'Air Combo Plus',
					index: '00A3'
				},
				replacementReward:{
					reward: 'Air Combo Plus',
					index: '00A3'
				},
				vanillaAddress: '11D1A2E6',
				vanillaEXP: 216,
				replacementEXP: 216,
				EXPAddress: '11D1A2E0',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Master LV5",
				vanillaReward:{
					reward: 'Aerial Dodge LV 2',
					index: '0067'
				},
				replacementReward:{
					reward: 'Aerial Dodge LV 2',
					index: '0067'
				},
				vanillaAddress: '11D1A2EE',
				vanillaEXP: 270,
				replacementEXP: 270,
				EXPAddress: '11D1A2E8',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Master LV6",
				vanillaReward:{
					reward: 'Air Combo Plus',
					index: '00A3'
				},
				replacementReward:{
					reward: 'Air Combo Plus',
					index: '00A3'
				},
				vanillaAddress: '11D1A2F6',
				vanillaEXP: 324,
				replacementEXP: 324,
				EXPAddress: '11D1A2F0',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Master LV7",
				vanillaReward:{
					reward: 'Aerial Dodge LV 3',
					index: '0068'
				},
				replacementReward:{
					reward: 'Aerial Dodge LV 3',
					index: '0068'
				},
				vanillaAddress: '11D1A2FE',
				vanillaEXP: 450,
				replacementEXP: 450,
				EXPAddress: '11D1A2F8',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			}
		]
	},
	{
		driveForm: "Final",
		removeGrowthJankCodes: [
			"//Remove Glide LV1\n",
			"patch=1,EE,E0030102,extended,0032EF06\n",
			"patch=1,EE,1036E5CA,extended,00000000\n",
			"patch=1,EE,1032EF0C,extended,0000806A\n",
			"patch=1,EE,1032EF1E,extended,00000000\n",
			"//Remove Glide LV2 1\n",
			"patch=1,EE,E0010102,extended,0032EF06\n",
			"patch=1,EE,1036E5CC,extended,0000006B\n",
			"//Remove Glide LV2 2\n",
			"patch=1,EE,E0030103,extended,0032EF06\n",
			"patch=1,EE,1036E5CC,extended,00000000\n",
			"patch=1,EE,1032EF0C,extended,0000806B\n",
			"patch=1,EE,1032EF1E,extended,00000000\n",
			"//Remove Glide LV3 1\n",
			"patch=1,EE,E0010104,extended,0032EF06\n",
			"patch=1,EE,1036E5CE,extended,0000006C\n",
			"//Remove Glide LV3 2\n",
			"patch=1,EE,E0030105,extended,0032EF06\n",
			"patch=1,EE,1036E5CE,extended,00000000\n",
			"patch=1,EE,1032EF0C,extended,0000806C\n",
			"patch=1,EE,1032EF1E,extended,00000000\n",
			"//Remove Glide LV2 1\n",
			"patch=1,EE,E0010106,extended,0032EF06\n",
			"patch=1,EE,1036E5D0,extended,0000006D\n",
			"//Remove Glide MAX 2\n",
			"patch=1,EE,E0020107,extended,0032EF06\n",
			"patch=1,EE,1032EF0C,extended,0000806D\n",
			"patch=1,EE,1032EF1E,extended,00000000\n"
		],
		driveLevels: [
			{
				level: "Final LV2",
				vanillaReward:{
					reward: 'Auto Final',
					index: '0184'
				},
				replacementReward:{
					reward: 'Auto Final',
					index: '0184'
				},
				vanillaAddress: '11D1A30E',
				vanillaEXP: 12,
				replacementEXP: 12,
				EXPAddress: '11D1A308',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Final LV3",
				vanillaReward:{
					reward: 'Glide LV 1',
					index: '006A'
				},
				replacementReward:{
					reward: 'Glide LV 1',
					index: '006A'
				},
				vanillaAddress: '11D1A316',
				vanillaEXP: 24,
				replacementEXP: 24,
				EXPAddress: '11D1A310',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Final LV4",
				vanillaReward:{
					reward: 'Form Boost',
					index: '018E'
				},
				replacementReward:{
					reward: 'Form Boost',
					index: '018E'
				},
				vanillaAddress: '11D1A31E',
				vanillaEXP: 48,
				replacementEXP: 48,
				EXPAddress: '11D1A318',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Final LV5",
				vanillaReward:{
					reward: 'Glide LV 2',
					index: '006B'
				},
				replacementReward:{
					reward: 'Glide LV 2',
					index: '006B'
				},
				vanillaAddress: '11D1A326',
				vanillaEXP: 76,
				replacementEXP: 76,
				EXPAddress: '11D1A320',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Final LV6",
				vanillaReward:{
					reward: 'Form Boost',
					index: '018E'
				},
				replacementReward:{
					reward: 'Form Boost',
					index: '018E'
				},
				vanillaAddress: '11D1A32E',
				vanillaEXP: 133,
				replacementEXP: 133,
				EXPAddress: '11D1A328',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			},
			{
				level: "Final LV7",
				vanillaReward:{
					reward: 'Glide LV 3',
					index: '006C'
				},
				replacementReward:{
					reward: 'Glide LV 3',
					index: '006C'
				},
				vanillaAddress: '11D1A336',
				vanillaEXP: 157,
				replacementEXP: 157,
				EXPAddress: '11D1A330',
				toBeReplaced: false,
				isRewardReplaced: false,
				isEXPReplaced: false
			}
		]
	}
]

export default formsData