export class Cheat {
	constructor(name, code) {
		this.name = name
		this.cheatCode = code
		this.isActive = false

		this.copy = () => {
			let ret = new Cheat(this.name, this.cheatCode)
			ret.isActive = this.isActive
			return ret
		}
		this.toggleActive = () => {
			let ret = this.copy()
			ret.isActive = !this.isActive
			return ret
		}
		this.saveToJSON = () => {
			return this.isActive ? JSON.stringify(this, ['name', 'isActive']) + ',' : ''
		}
		this.loadFromJSON = () => {
			let ret = this.copy()
			ret.isActive = true
			return ret
		}
		this.saveToFile = (isPnach) => {
			return isPnach
				? this.isActive ? '//' + this.name + '\n' + this.cheatCode + '\n\n' : ''
				: this.isActive ? '\t--' + this.name + '\n' + this.cheatCode + '\n\n' : ''
		}
	}

	static saveToPnach(cheatData, isCommented) {
		return ['\n//CHEAT CODES\n'].concat(cheatData.map(cheat => { return cheat.saveToFile(true) }))
	}
	static saveToLua(cheatData, isCommented) {
		return ['\nfunction Cheats()\n'].concat(cheatData.map(cheat => { return cheat.saveToFile(false) }), ['end'])
	}
}

export const pnachCheatsData = [
	new Cheat(
		'Shorter Day 5 (Simulated Twilight Town)',
		`patch=1,EE,E0100B02,extended,0032BAE0
patch=1,EE,E00F0032,extended,0032BAE2
patch=1,EE,E00E0001,extended,0032BAE4
patch=1,EE,E00D0000,extended,0032BAE6
patch=1,EE,E00C000C,extended,0032BAE8
patch=1,EE,1032D80D,extended,000007FF
patch=1,EE,2032BE7A,extended,00020013
patch=1,EE,0032BE80,extended,0000000D
patch=1,EE,2032BE86,extended,00030013
patch=1,EE,0032BE8C,extended,00000001
patch=1,EE,0032BF18,extended,00000003
patch=1,EE,0032BF1C,extended,00000000
patch=1,EE,2032DBB0,extended,CB730000
patch=1,EE,1032DC40,extended,00000000
patch=1,EE,0032DE39,extended,0000007D
patch=1,EE,0032DE3C,extended,00000017
patch=1,EE,0032DEC4,extended,0000001E`
	),
	new Cheat(
		'Faster Oogie Boogie',
		`//Oogie Boogie HP Barrier Removal 1
patch=1,EE,E005090E,extended,0032BAE0
patch=1,EE,E0040037,extended,0032BAE4
patch=1,EE,E0030037,extended,0032BAE6
patch=1,EE,E0020037,extended,0032BAE8
patch=1,EE,E0010173,extended,01C6C01C
patch=1,EE,11C6C020,extended,00000000
//Oogie Boogie HP Barrier Removal 2
patch=1,EE,E005090E,extended,0032BAE0
patch=1,EE,E0040037,extended,0032BAE4
patch=1,EE,E0030037,extended,0032BAE6
patch=1,EE,E0020037,extended,0032BAE8
patch=1,EE,E0010173,extended,01C6C284
patch=1,EE,11C6C288,extended,00000000
//Oogie Boogie HP Barrier Removal 3
patch=1,EE,E005090E,extended,0032BAE0
patch=1,EE,E0040037,extended,0032BAE4
patch=1,EE,E0030037,extended,0032BAE6
patch=1,EE,E0020037,extended,0032BAE8
patch=1,EE,E0010173,extended,01C6C4EC
patch=1,EE,11C6C4F0,extended,00000000`
	),
	new Cheat(
		'Faster Presents',
		`patch=1,EE,11CA2E78,extended,00004C58
patch=1,EE,21CA2E98,extended,6D2E4C58
patch=1,EE,21CA2E9C,extended,00746573
patch=1,EE,11CA2ED8,extended,00004C58
patch=1,EE,21CA2EF8,extended,6D2E4C58
patch=1,EE,21CA2EFC,extended,00746573
patch=1,EE,11CA2F38,extended,00004C58
patch=1,EE,21CA2F58,extended,6D2E4C58
patch=1,EE,21CA2F5C,extended,00746573`
	),
	new Cheat(
		'Start with Dash on Lion Sora',
		`patch=1,EE,1032EF8C,extended,0000820E
patch=1,EE,E001820E,extended,0032EF8E
patch=1,EE,1032EF8E,extended,00000000`
	),
	new Cheat(
		'Faster Hyenas 2',
		`//Fast Hyenas II 1,
patch=1,EE,E003050A,extended,0032BAE0
patch=1,EE,E0020039,extended,0032BAE8
patch=1,EE,E0010087,extended,01D48EFC
patch=1,EE,11D48EFC,extended,000000EC
//Fast Hyenas II 2
patch=1,EE,E003050A,extended,0032BAE0
patch=1,EE,E0020039,extended,0032BAE8
patch=1,EE,11C4EDB4,extended,00000000
patch=1,EE,11C4EDF4,extended,00000000`
	),
	new Cheat(
		'Skip Dragon Xemnas',
		`patch=1,EE,E0061612,extended,0032BAE0
patch=1,EE,E0050048,extended,0032BAE4
patch=1,EE,E0040048,extended,0032BAE6
patch=1,EE,E0030048,extended,0032BAE8
patch=1,EE,1032BAE0,extended,00001712
patch=1,EE,2032BAE4,extended,00540054
patch=1,EE,1032BAE8,extended,00000054`
	),
	new Cheat(
		'Always Clear Atlantica Songs',
		`//Finny Fun
patch=1,EE,E003040B,extended,0032BAE0
patch=1,EE,E0020040,extended,0032BAE4
patch=1,EE,E0010040,extended,0032BAE8
patch=1,EE,2035DAD4,extended,00000000
//Part of Your World
patch=1,EE,E003010B,extended,0032BAE0
patch=1,EE,E0020033,extended,0032BAE4
patch=1,EE,E0010033,extended,0032BAE8
patch=1,EE,2035DAC8,extended,00000005
//Under The Sea
patch=1,EE,E003030B,extended,0032BAE0
patch=1,EE,E0020035,extended,0032BAE4
patch=1,EE,E0010035,extended,0032BAE8
patch=1,EE,2035DAC4,extended,00002710
//Ursula's Revenge
patch=1,EE,E003090B,extended,0032BAE0
patch=1,EE,E0020041,extended,0032BAE4
patch=1,EE,E0010041,extended,0032BAE8
patch=1,EE,2035DAC4,extended,00002710
//A New Day is Dawning
patch=1,EE,E003040B,extended,0032BAE0
patch=1,EE,E0020037,extended,0032BAE4
patch=1,EE,E0010037,extended,0032BAE8
patch=1,EE,2035DAC4,extended,00007530`
	),
	new Cheat(
		'Disable Final Form & Anti Form (No Anti Points)',
		`patch=1,EE,2032EF40,extended,00000000`
	),
	new Cheat(
		'Use Drives Without Party Members',
		`patch=1,EE,201C9A80,extended,0000102D`
	),
	new Cheat(
		'Party Members Remain while in a Drive Form',
		`patch=1,EE,201C99A0,extended,0000102D`
	),
	new Cheat(
		'Allow Summoning Alone',
		`patch=1,EE,201C9B5C,extended,0000102D`
	),
	new Cheat(
		'Cogsworth Never Loses Strength',
		`patch=1,EE,E0020C05,extended,0032BAE0
patch=1,EE,E0010002,extended,0032BAE8
patch=1,EE,21D48FA6,extended,CF704208`
	),
	new Cheat(
		'Faster Urns',
		`//Easy Urn Training 1
patch=1,EE,E0020006,extended,0032BAE0
patch=1,EE,E001008C,extended,0032BAE8
patch=1,EE,11D48EFC,extended,00000013
//Easy Urn Training 2
patch=1,EE,E0020006,extended,0032BAE0
patch=1,EE,E001008D,extended,0032BAE8
patch=1,EE,11D48EFC,extended,00000063`
	),
	new Cheat(
		'Randomize Spell Cost',
		`patch=1,EE,E015FFFF,extended,1032BAE0// If not FFFF
patch=1,EE,E0142002,extended,1032BAE0// If not 2002
patch=1,EE,E11300FF,extended,1032F0C4// If Fire != FF
patch=1,EE,E0120000,extended,1032BAD8// If not screen transition
patch=1,EE,30000001,extended,01CCBCE0// Fire
patch=1,EE,30000001,extended,01CCC8E0// Fira
patch=1,EE,30000001,extended,01CCC910// Firaga
patch=1,EE,30000001,extended,01CCBD40// Blizzard
patch=1,EE,30000001,extended,01CCC940// Blizzara
patch=1,EE,30000001,extended,01CCC970// Blizzaga
patch=1,EE,30000001,extended,01CCBD10// Thunder
patch=1,EE,30000001,extended,01CCC9A0// Thundara
patch=1,EE,30000001,extended,01CCC9D0// Thundaga
patch=1,EE,30000001,extended,01CCBD70// Cure
patch=1,EE,30000001,extended,01CCCA00// Cura
patch=1,EE,30000001,extended,01CCCA30// Curaga
patch=1,EE,30000001,extended,01CCD240// Magnet
patch=1,EE,30000001,extended,01CCD270// Magnera
patch=1,EE,30000001,extended,01CCD2A0// Magnega
patch=1,EE,30000001,extended,01CCD2D0// Reflect
patch=1,EE,30000001,extended,01CCD300// Reflera'
patch=1,EE,30000001,extended,01CCD330// Reflega`
	),
	new Cheat(
		'Randomize Party Limits Cost',
		`patch=1,EE,E0111FFF,extended,1032BAE0// If not FFFF
patch=1,EE,E0110002,extended,1032BAE0// If not 2002
patch=1,EE,E10F00FF,extended,1032F0C6// If Thunder != FF
patch=1,EE,E00E0000,extended,1032BAD8// If not screen transition
patch=1,EE,30000001,extended,01CCC130// Twin Howl
patch=1,EE,30000001,extended,01CCC2B0// Bushido
patch=1,EE,30000001,extended,01CCCC40// Red Rocket
patch=1,EE,30000001,extended,01CCE110// Whirli-Goof
patch=1,EE,30000001,extended,01CCE620// Comet
patch=1,EE,30000001,extended,01CCF040// Knocksmash
patch=1,EE,30000001,extended,01CCF160// Duck Flare
patch=1,EE,30000001,extended,01CCF280// Speedster
patch=1,EE,30000001,extended,01CCF3A0// Bluff
patch=1,EE,30000001,extended,01CCF730// WildCat
patch=1,EE,30000001,extended,01CCFCA0// Dance Call
patch=1,EE,30000001,extended,01CCFE80// Setup
patch=1,EE,30000001,extended,01CD0B40// Trinity Limit
patch=1,EE,30000001,extended,01CD1AD0// Session`
	),
	new Cheat(
		'Randomize Limit Form Limits Cost',
		`patch=1,EE,E007FFFF,extended,1032BAE0// If not FFFF
	patch=1,EE,E0062002,extended,1032BAE0// If not 2002
	patch=1,EE,E10500FF,extended,1032F0C5// If Blizzard != FF
	patch=1,EE,E0040000,extended,1032BAD8// If not screen transition
	patch=1,EE,30000001,extended,01CD3150// Strike Raid
	patch=1,EE,30000001,extended,01CD3030// Sonic Blade
	patch=1,EE,30000001,extended,01CD2F10// Ragnarok
	patch=1,EE,30000001,extended,01CD30C0// Ars Arcanum`
	),
	new Cheat(
		'Always Have Scan',
		`patch=1,EE,0032E112,extended,0000008A`
	)
]

export const luaCheatsData = [
	new Cheat(
		'Shorter Day 5 (Simulated Twilight Town)',
		`\tif ReadShort(Now+0) == 0x0B02 and ReadShort(Now+8) == 0x0C then
\t\tWriteShort(Save+0x034C,0x0002)
\t\tWriteShort(Save+0x0350,0x000D)
\t\tWriteShort(Save+0x0356,0x0013)
\t\tWriteShort(Save+0x0358,0x0003)
\t\tWriteShort(Save+0x035C,0x0001)
\t\tWriteShort(Save+0x03E8,0x0003)
\t\tWriteShort(Save+0x03EC,0x0000)
\t\tWriteByte(Save+0x2394,0x1E)
\t\tWriteShort(Save+0x2110,0x0000)
\t\tWriteByte(Save+0x1CDD,ReadByte(Save+0x1CDD)|0xC0)
\t\tWriteByte(Save+0x1CDE,ReadByte(Save+0x1CDE)|0x07)
\t\tWriteByte(Save+0x1CEF,ReadByte(Save+0x1CEF)|0x80)
\tend`
	),
	new Cheat(
		'Faster Oogie Boogie',
		`\tif ReadShort(Now+0) == 0x090E and ReadShort(Now+8) == 0x37 then
\t\tif Platform == 'PS2' then
\t\t\tWriteInt(0x1C6C4F0,0x00000000)
\t\t\tWriteInt(0x1C6C288,0x00000000)
\t\t\tWriteInt(0x1C6C020,0x00000000)
\t\telseif Platform == 'PC' then
\t\t\tWriteInt(0x2A209E8-0x56450E,0x00000000)
\t\t\tWriteInt(0x2A20770-0x56450E,0x00000000)
\t\t\tWriteInt(0x2A204F8-0x56450E,0x00000000)
\t\tend
\tend`
	),
	new Cheat(
		'Faster Presents',
		`\tif Platform == 'PS2' then
\t\tObj0 = 0x1C94100
\telseif Platform == 'PC' then
\t\tObj0 = 0x2A22B90 - 0x56450E
\tend
\tWriteString(Obj0+0xED70,'F_NM170_XL')
\tWriteString(Obj0+0xED90,'F_NM170_XL.mset')
\tWriteString(Obj0+0xEDD0,'F_NM170_XL')
\tWriteString(Obj0+0xEDF0,'F_NM170_XL.mset')
\tWriteString(Obj0+0xEE30,'F_NM170_XL')
\tWriteString(Obj0+0xEE50,'F_NM170_XL.mset')`
	),
	new Cheat(
		'Start with Dash on Lion Sora',
		`\tWriteShort(Btl0+0x31A6C,0x0000820E)
\tif ReadShort(Save+0x345E) == 0x820E then WriteShort(Save+0x345E,0x0000) end`
	),
	new Cheat(
		'Faster Hyenas 2',
		`\tif ReadShort(Now+0) == 0x050A and ReadShort(Now+8) == 0x39 then
\t\tif Platform == 'PS2' then
\t\t\tWriteInt(0x1C4EDB4,0x00000000)
\t\t\tWriteInt(0x1C4EDF4,0x00000000)
\t\tif ReadInt(0x1D48EFC) == 135 then WriteInt(0x1D48EFC,246) end
\t\telseif Platform == 'PC' then
\t\t\tWriteInt(0x29E32A0-0x56450E,0x00000000)
\t\t\tWriteInt(0x29E32E0-0x56450E,0x00000000)
\t\t\tif ReadInt(0x2A0D108-0x56450E) == 135 then WriteInt(0x2A0D108-0x56450E,246) end
\t\tend
\tend`
	),
	new Cheat(
		'Skip Dragon Xemnas',
		`\tif ReadShort(Now+0) == 0x1612 and ReadShort(Now+8) == 0x48 then
\t\tWriteShort(Now+0,0x1712)
\t\tWriteShort(Now+4,0x0054)
\t\tWriteShort(Now+6,0x0054)
\t\tWriteShort(Now+8,0x0054)
\tend`
	),
	new Cheat(
		'Always Clear Atlantica Songs',
		`\tif World == 0x0B then --Atlantica Songs
\t\tif Room == 0x02 and Events(0x3F,0x3F,0x3F) then --Tutorial
\t\t\tWriteInt(Songs+0x00,0x00000001)
\t\telseif Room == 0x04 then
\t\t\tif Events(0x40,0x40,0x40) then --Swim This Way (Story)
\t\t\t\tWriteInt(Songs+0x10,0x00000000)
\t\t\telseif Events(0x37,0x37,0x37) then --A New Day is Dawning (Story)
\t\t\t\tWriteInt(Songs+0x00,0x00007530)
\t\t\tend
\t\telseif Room == 0x01 and Events(0x33,0x33,0x33) then --Part of Your World (Story)
\t\t\tWriteInt(Songs+0x04,0x00000005)
\t\telseif Room == 0x03 and Events(0x35,0x35,0x35) then --Under the Sea (Story)
\t\t\tWriteInt(Songs+0x00,0x00002710)
\t\telseif Room == 0x09 and Events(0x41,0x41,0x41) then --Ursula's Revenge (Story)
\t\t\tWriteInt(Songs+0x00,0x00002710)
\t\tend
\tend`
	),
	new Cheat(
		'Disable Final Form & Anti Form (No Anti Points)',
		`\tWriteInt(Save+0x3410,0x00000000)`
	),
	new Cheat(
		'Cogsworth Never Loses Strength',
		`\tif Place == 0x0C05 and Events(0x02,0x16,0x02) then --BC Lanterns
\t\tWriteFloat(Gauge,34)
\tend`
	),
	new Cheat(
		'Faster Urns',
		`\tif World == 0x06 then --Olympus Coliseum Training
\t\tif Room == 0x00 and ReadInt(Score) == 0 then
\t\t\tif Events(0x8C,0x8C,0x8C) then --Urn Practice (Story)
\t\t\t\tWriteInt(Score,0x00000013)
\t\t\telseif Events(0x8D,0x8D,0x8D) then --Urn Maniac (Story)
\t\t\t\tWriteInt(Score,0x00000063)
\t\t\tend
\t\tend
\tend`
	),
	new Cheat(
		'Randomize Spell Cost',
		`\tWriteByte(Sys3+0x9E0,math.random(0,255)) -- Fire
\tWriteByte(Sys3+0x15E0,math.random(0,255)) -- Fira
\tWriteByte(Sys3+0x1610,math.random(0,255)) -- Firaga
\tWriteByte(Sys3+0xA40,math.random(0,255)) -- Blizzard
\tWriteByte(Sys3+0x1640,math.random(0,255)) -- Blizzara
\tWriteByte(Sys3+0x1670,math.random(0,255)) -- Blizzaga
\tWriteByte(Sys3+0xA10,math.random(0,255)) -- Thunder
\tWriteByte(Sys3+0x16A0,math.random(0,255)) -- Thundara
\tWriteByte(Sys3+0x16D0,math.random(0,255)) -- Thundaga
\tWriteByte(Sys3+0xA70,math.random(0,255)) -- Cure
\tWriteByte(Sys3+0x1700,math.random(0,255)) -- Cura
\tWriteByte(Sys3+0x1730,math.random(0,255)) -- Curaga
\tWriteByte(Sys3+0x1F40,math.random(0,255)) -- Magnet
\tWriteByte(Sys3+0x1F70,math.random(0,255)) -- Magnera
\tWriteByte(Sys3+0x1FA0,math.random(0,255)) -- Magnega
\tWriteByte(Sys3+0x1FD0,math.random(0,255)) -- Reflect
\tWriteByte(Sys3+0x2000,math.random(0,255)) -- Reflera
\tWriteByte(Sys3+0x2030,math.random(0,255)) -- Reflega`
	),
	new Cheat(
		'Randomize Party Limits Cost',
		`\tWriteByte(Sys3+0xE30,math.random(0,255)) -- Twin Howl (Beast)
\tWriteByte(Sys3+0xFB0,math.random(0,255)) -- Bushido (Auron)
\tWriteByte(Sys3+0x1940,math.random(0,255)) -- Red Rocket (Mulan)
\tWriteByte(Sys3+0x2E10,math.random(0,255)) -- Whirli-Goof (Goofy)
\tWriteByte(Sys3+0x3320,math.random(0,255)) -- Comet (Donald)
\tWriteByte(Sys3+0x3D40,math.random(0,255)) -- Knocksmash (Goofy)
\tWriteByte(Sys3+0x3E60,math.random(0,255)) -- Duck Flare (Donald)
\tWriteByte(Sys3+0x3F80,math.random(0,255)) -- Speedster (Aladdin)
\tWriteByte(Sys3+0x40A0,math.random(0,255)) -- Bluff (Jack Sparrow)
\tWriteByte(Sys3+0x4430,math.random(0,255)) -- Wildcat (Simba)
\tWriteByte(Sys3+0x49A0,math.random(0,255)) -- Dance Call (Jack)
\tWriteByte(Sys3+0x4B80,math.random(0,255)) -- Setup (Tron)
\tWriteByte(Sys3+0x5840,math.random(0,255)) -- Trinity Limit (Sora)
\tWriteByte(Sys3+0x67D0,math.random(0,255)) -- Session (Riku)`
	),
	new Cheat(
		'Randomize Limit Form Limits Cost',
		`\tWriteByte(Sys3+0x7E50,math.random(0,255)) -- Strike Raid
\tWriteByte(Sys3+0x7D30,math.random(0,255)) -- Sonic Blade
\tWriteByte(Sys3+0x7C10,math.random(0,255)) -- Ragnarok
\tWriteByte(Sys3+0x7DC0,math.random(0,255)) -- Ars Arcanum`
	),
	new Cheat(
		'Always Have Scan',
		`\tWriteShort(Save+0x25DA,0x808A)`
	)
]