export class Cheat {
	constructor(name, code) {
		this.name = name
		this.code = [...code]
		this.toBeReplaced = false
		this.isActive = false

		this.copy = () => {
			let ret = new Cheat(this.name, [...this.code])
			ret.toBeReplaced = this.toBeReplaced
			ret.isActive = this.isActive
			return ret
		}
		this.toggle = () => {
			let ret = this.markForReplacement(false)
			ret.isActive = !this.isActive
			return ret
		}
		this.markForReplacement = (toBeReplaced) => {
			let ret = this.copy()
			ret.toBeReplaced = toBeReplaced
			return ret
		}
		this.saveToJSON = () => {
			return this.isActive ? JSON.stringify(this, ['name', 'isActive']) : ''
		}
		this.loadFromJSON = () => {
			let ret = this.copy()
			ret.isActive = true
			ret.toBeReplaced = false
			return ret
		}
		this.saveToPnach = () => {
			return '//' + this.name + '\n' + this.code.join('\n') + '\n'
		}
	}
}

export const cheatsData = [
	new Cheat('Shorter Day 5 (Simulated Twilight Town)', [
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
	]),
	new Cheat('Faster Oogie Boogie', [
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
	]),
	new Cheat('Faster Presents', [
		"patch=1,EE,11CA2E78,extended,00004C58",
		"patch=1,EE,21CA2E98,extended,6D2E4C58",
		"patch=1,EE,21CA2E9C,extended,00746573",
		"patch=1,EE,11CA2ED8,extended,00004C58",
		"patch=1,EE,21CA2EF8,extended,6D2E4C58",
		"patch=1,EE,21CA2EFC,extended,00746573",
		"patch=1,EE,11CA2F38,extended,00004C58",
		"patch=1,EE,21CA2F58,extended,6D2E4C58",
		"patch=1,EE,21CA2F5C,extended,00746573"
	]),
	new Cheat('Start with Dash on Lion Sora', [
		"patch=1,EE,1032EF8C,extended,0000820E",
		"patch=1,EE,E001820E,extended,0032EF8E",
		"patch=1,EE,1032EF8E,extended,00000000"
	]),
	new Cheat('Faster Hyenas 2', [
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
	]),
	new Cheat('Skip Dragon Xemnas', [
		"patch=1,EE,E0061612,extended,0032BAE0",
		"patch=1,EE,E0050048,extended,0032BAE4",
		"patch=1,EE,E0040048,extended,0032BAE6",
		"patch=1,EE,E0030048,extended,0032BAE8",
		"patch=1,EE,1032BAE0,extended,00001712",
		"patch=1,EE,2032BAE4,extended,00540054",
		"patch=1,EE,1032BAE8,extended,00000054"
	]),
	new Cheat('Always Clear Atlantica Songs', [
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
	]),
	new Cheat('No Anti-Form and no Forced Final Form', [
		"patch=1,EE,201D6388,extended,0000102D"
	]),
	new Cheat('Use Drives Without Party Members', [
		"patch=1,EE,201C9A80,extended,0000102D"
	]),
	new Cheat('Party Members Remain while in a Drive Form', [
		"patch=1,EE,201C99A0,extended,0000102D"
	]),
	new Cheat('Allow Summoning Alone', [
		"patch=1,EE,201C9B5C,extended,0000102D"
	]),
	new Cheat('Cogsworth Never Loses Strength', [
		"patch=1,EE,E0020C05,extended,0032BAE0",
		"patch=1,EE,E0010002,extended,0032BAE8",
		"patch=1,EE,21D48FA6,extended,CF704208"
	]),
	new Cheat('Faster Urns', [
		"//Easy Urn Training 1",
		"patch=1,EE,E0020006,extended,0032BAE0",
		"patch=1,EE,E001008C,extended,0032BAE8",
		"patch=1,EE,11D48EFC,extended,00000013",
		"//Easy Urn Training 2",
		"patch=1,EE,E0020006,extended,0032BAE0",
		"patch=1,EE,E001008D,extended,0032BAE8",
		"patch=1,EE,11D48EFC,extended,00000063"
	]),
	new Cheat('Randomize Spell Cost', [
		"patch=1,EE,E015FFFF,extended,1032BAE0// If not FFFF",
		"patch=1,EE,E0142002,extended,1032BAE0// If not 2002",
		"patch=1,EE,E11300FF,extended,1032F0C4// If Fire != FF",
		"patch=1,EE,E0120000,extended,1032BAD8// If not screen transition",
		"patch=1,EE,30000001,extended,01CCBCE0// Fire",
		"patch=1,EE,30000001,extended,01CCC8E0// Fira",
		"patch=1,EE,30000001,extended,01CCC910// Firaga",
		"patch=1,EE,30000001,extended,01CCBD40// Blizzard",
		"patch=1,EE,30000001,extended,01CCC940// Blizzara",
		"patch=1,EE,30000001,extended,01CCC970// Blizzaga",
		"patch=1,EE,30000001,extended,01CCBD10// Thunder",
		"patch=1,EE,30000001,extended,01CCC9A0// Thundara",
		"patch=1,EE,30000001,extended,01CCC9D0// Thundaga",
		"patch=1,EE,30000001,extended,01CCBD70// Cure",
		"patch=1,EE,30000001,extended,01CCCA00// Cura",
		"patch=1,EE,30000001,extended,01CCCA30// Curaga",
		"patch=1,EE,30000001,extended,01CCD240// Magnet",
		"patch=1,EE,30000001,extended,01CCD270// Magnera",
		"patch=1,EE,30000001,extended,01CCD2A0// Magnega",
		"patch=1,EE,30000001,extended,01CCD2D0// Reflect",
		"patch=1,EE,30000001,extended,01CCD300// Reflera",
		"patch=1,EE,30000001,extended,01CCD330// Reflega"
	]),
	new Cheat('Randomize Party Limits Cost', [
		"patch=1,EE,E0111FFF,extended,1032BAE0// If not FFFF",
		"patch=1,EE,E0110002,extended,1032BAE0// If not 2002",
		"patch=1,EE,E10F00FF,extended,1032F0C6// If Thunder != FF",
		"patch=1,EE,E00E0000,extended,1032BAD8// If not screen transition",
		"patch=1,EE,30000001,extended,01CCC130// Twin Howl",
		"patch=1,EE,30000001,extended,01CCC2B0// Bushido",
		"patch=1,EE,30000001,extended,01CCCC40// Red Rocket",
		"patch=1,EE,30000001,extended,01CCE110// Whirli-Goof",
		"patch=1,EE,30000001,extended,01CCE620// Comet",
		"patch=1,EE,30000001,extended,01CCF040// Knocksmash",
		"patch=1,EE,30000001,extended,01CCF160// Duck Flare",
		"patch=1,EE,30000001,extended,01CCF280// Speedster",
		"patch=1,EE,30000001,extended,01CCF3A0// Bluff",
		"patch=1,EE,30000001,extended,01CCF730// WildCat",
		"patch=1,EE,30000001,extended,01CCFCA0// Dance Call",
		"patch=1,EE,30000001,extended,01CCFE80// Setup",
		"patch=1,EE,30000001,extended,01CD0B40// Trinity Limit",
		"patch=1,EE,30000001,extended,01CD1AD0// Session"
	]),
	new Cheat('Randomize Limit Form Limits Cost', [
		"patch=1,EE,E007FFFF,extended,1032BAE0// If not FFFF",
		"patch=1,EE,E0062002,extended,1032BAE0// If not 2002",
		"patch=1,EE,E10500FF,extended,1032F0C5// If Blizzard != FF",
		"patch=1,EE,E0040000,extended,1032BAD8// If not screen transition",
		"patch=1,EE,30000001,extended,01CD3150// Strike Raid",
		"patch=1,EE,30000001,extended,01CD3030// Sonic Blade",
		"patch=1,EE,30000001,extended,01CD2F10// Ragnarok",
		"patch=1,EE,30000001,extended,01CD30C0// Ars Arcanum"
	]),
	new Cheat('Always Have Scan', [
		"patch=1,EE,00032E112,extended,0000008A"
	])
]