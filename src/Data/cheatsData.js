const cheatsData = [
	{
		name: "Shorter Day 5 (Simulated Twilight Town)",
		toBeReplaced: false,
		isActive: false,
		code: [
			"patch=1,EE,E0100B02,extended,0032BAE0",
			"patch=1,EE,E00F0032,extended,0032BAE2",
			"patch=1,EE,E00E0001,extended,0032BAE4",
			"patch=1,EE,E00D0000,extended,0032BAE6",
			"patch=1,EE,E00C000C,extended,0032BAE8",
			"patch=1,EE,1032D80D,extended,000007FF",
			"patch=1,EE,2032BE7A,extended,00020013",
			"patch=1,EE,0032BE80,extended,0000000D",
			"patch=1,EE,2032BE86,extended,00030013",
			"patch=1,EE,0032BE8C,extended,00000001",
			"patch=1,EE,0032BF18,extended,00000003",
			"patch=1,EE,0032BF1C,extended,00000000",
			"patch=1,EE,2032DBB0,extended,CB730000",
			"patch=1,EE,1032DC40,extended,00000000",
			"patch=1,EE,0032DE39,extended,0000007D",
			"patch=1,EE,0032DE3C,extended,00000017",
			"patch=1,EE,0032DEC4,extended,0000001E"
		]
	},
	{
		name: "Faster Oogie Boogie",
		toBeReplaced: false,
		isActive: false,
		code: [
			"//Oogie Boogie HP Barrier Removal 1",
			"patch=1,EE,E005090E,extended,0032BAE0",
			"patch=1,EE,E0040037,extended,0032BAE4",
			"patch=1,EE,E0030037,extended,0032BAE6",
			"patch=1,EE,E0020037,extended,0032BAE8",
			"patch=1,EE,E0010173,extended,01C6C01C",
			"patch=1,EE,11C6C020,extended,00000000",
			"//Oogie Boogie HP Barrier Removal 2",
			"patch=1,EE,E005090E,extended,0032BAE0",
			"patch=1,EE,E0040037,extended,0032BAE4",
			"patch=1,EE,E0030037,extended,0032BAE6",
			"patch=1,EE,E0020037,extended,0032BAE8",
			"patch=1,EE,E0010173,extended,01C6C284",
			"patch=1,EE,11C6C288,extended,00000000",
			"//Oogie Boogie HP Barrier Removal 3",
			"patch=1,EE,E005090E,extended,0032BAE0",
			"patch=1,EE,E0040037,extended,0032BAE4",
			"patch=1,EE,E0030037,extended,0032BAE6",
			"patch=1,EE,E0020037,extended,0032BAE8",
			"patch=1,EE,E0010173,extended,01C6C4EC",
			"patch=1,EE,11C6C4F0,extended,00000000"
		]
	},
	{
		name: "Faster Presents",
		toBeReplaced: false,
		isActive: false,
		code: [
			"patch=1,EE,11CA2E78,extended,00004C58",
			"patch=1,EE,21CA2E98,extended,6D2E4C58",
			"patch=1,EE,21CA2E9C,extended,00746573",
			"patch=1,EE,11CA2ED8,extended,00004C58",
			"patch=1,EE,21CA2EF8,extended,6D2E4C58",
			"patch=1,EE,21CA2EFC,extended,00746573",
			"patch=1,EE,11CA2F38,extended,00004C58",
			"patch=1,EE,21CA2F58,extended,6D2E4C58",
			"patch=1,EE,21CA2F5C,extended,00746573"
		]
	},
	{
		name: "Start with Dash on Lion Sora",
		toBeReplaced: false,
		isActive: false,
		code: [
			"patch=1,EE,1032EF8C,extended,0000820E",
			"patch=1,EE,E001820E,extended,0032EF8E",
			"patch=1,EE,1032EF8E,extended,00000000"
		]
	},
	{
		name: "Faster Hyenas 2",
		toBeReplaced: false,
		isActive: false,
		code: [
			"//Fast Hyenas II 1",
			"patch=1,EE,E003050A,extended,0032BAE0",
			"patch=1,EE,E0020039,extended,0032BAE8",
			"patch=1,EE,E0010087,extended,01D48EFC",
			"patch=1,EE,11D48EFC,extended,000000EC",
			"//Fast Hyenas II 2",
			"patch=1,EE,E003050A,extended,0032BAE0",
			"patch=1,EE,E0020039,extended,0032BAE8",
			"patch=1,EE,11C4EDB4,extended,00000000",
			"patch=1,EE,11C4EDF4,extended,00000000"
		]
	},
	{
		name: "Skip Dragon Xemnas",
		toBeReplaced: false,
		isActive: false,
		code: [
			"patch=1,EE,E0061612,extended,0032BAE0",
			"patch=1,EE,E0050048,extended,0032BAE4",
			"patch=1,EE,E0040048,extended,0032BAE6",
			"patch=1,EE,E0030048,extended,0032BAE8",
			"patch=1,EE,1032BAE0,extended,00001712",
			"patch=1,EE,2032BAE4,extended,00540054",
			"patch=1,EE,1032BAE8,extended,00000054"
		]
	},
	{
		name: "Always Clear Atlantica Songs",
		toBeReplaced: false,
		isActive: false,
		code: [
			"//Finny Fun",
			"patch=1,EE,E003040B,extended,0032BAE0",
			"patch=1,EE,E0020040,extended,0032BAE4",
			"patch=1,EE,E0010040,extended,0032BAE8",
			"patch=1,EE,2035DAD4,extended,00000000",
			"//Part of Your World",
			"patch=1,EE,E003010B,extended,0032BAE0",
			"patch=1,EE,E0020033,extended,0032BAE4",
			"patch=1,EE,E0010033,extended,0032BAE8",
			"patch=1,EE,2035DAC8,extended,00000005",
			"//Unda Da Sea",
			"patch=1,EE,E003030B,extended,0032BAE0",
			"patch=1,EE,E0020035,extended,0032BAE4",
			"patch=1,EE,E0010035,extended,0032BAE8",
			"patch=1,EE,2035DAC4,extended,00002710",
			"//Ursula\"s Revenge",
			"patch=1,EE,E003090B,extended,0032BAE0",
			"patch=1,EE,E0020041,extended,0032BAE4",
			"patch=1,EE,E0010041,extended,0032BAE8",
			"patch=1,EE,2035DAC4,extended,00002710",
			"//A New Day is Dawning",
			"patch=1,EE,E003040B,extended,0032BAE0",
			"patch=1,EE,E0020037,extended,0032BAE4",
			"patch=1,EE,E0010037,extended,0032BAE8",
			"patch=1,EE,2035DAC4,extended,00007530"
		]
	},
	{
		name: "No Anti-Form and no Forced Final Form",
		toBeReplaced: false,
		isActive: false,
		code: [
			"patch=1,EE,201D6388,extended,0000102D"
		]
	},
	{
		name: "Use Drives Without Party Members",
		toBeReplaced: false,
		isActive: false,
		code: [
			"patch=1,EE,201C9A80,word,0000102D"
		]
	},
	{
		name: "Party Members Remain while in a Drive Form",
		toBeReplaced: false,
		isActive: false,
		code: [
			"patch=1,EE,201C99A0,word,0000102D"
		]
	},
	{
		name: "Cogsworth Never Loses Strength",
		toBeReplaced: false,
		isActive: false,
		code: [
			"patch=1,EE,E0020C05,extended,0032BAE0",
			"patch=1,EE,E0010002,extended,0032BAE8",
			"patch=1,EE,21D48FA6,extended,CF704208"
		]
	},
	{
		name: "Faster Urns",
		toBeReplaced: false,
		isActive: false,
		code: [
			"//Easy Urn Training 1",
			"patch=1,EE,E0020006,extended,0032BAE0",
			"patch=1,EE,E001008C,extended,0032BAE8",
			"patch=1,EE,11D48EFC,extended,00000013",
			"//Easy Urn Training 2",
			"patch=1,EE,E0020006,extended,0032BAE0",
			"patch=1,EE,E001008D,extended,0032BAE8",
			"patch=1,EE,11D48EFC,extended,00000063"
		]
	},
	{
		name: "Random MP Cost",
		toBeReplaced: false,
		isActive: false,
		code: [
			"//Easy Urn Training 1",
			"patch=1,EE,E0020006,extended,0032BAE0",
			"patch=1,EE,E001008C,extended,0032BAE8",
			"patch=1,EE,11D48EFC,extended,00000013",
			"//Easy Urn Training 2",
			"patch=1,EE,E0020006,extended,0032BAE0",
			"patch=1,EE,E001008D,extended,0032BAE8",
			"patch=1,EE,11D48EFC,extended,00000063"
		]
	}
]

export default cheatsData