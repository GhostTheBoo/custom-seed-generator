export class MagicAbility {
	constructor(name, address, cost) {
		this.ability = name
		this.costAddress = address
		this.vanillaCost = cost
		this.replacementCost = cost
		this.toBeReplaced = false
		
		this.isReplaced=()=>{
			return this.replacementCost !== this.vanillaCost
		}
		this.copy=()=>{
			let ret = new MagicAbility(this.ability, this.costAddress, this.vanillaCost)
			ret.replacementCost = this.replacementCost
			ret.toBeReplaced = this.toBeReplaced
			return ret
		}
		this.vanilla=()=>{
			return new MagicAbility(this.name, this.costAddress, this.vanillaCost)
		}
		this.replace=(newMagicData)=>{
			let ret = this.copy()
			ret.replacementCost = newMagicData.cost
			ret.toBeReplaced = false
			return ret
		}
		this.markForReplacement=(toBeReplaced)=>{
			let ret = this.copy()
			ret.toBeReplaced = toBeReplaced
			return ret
		}
		this.toPnach=()=>{
			let ret = 'patch=1,EE,' + this.costAddress.toString(16).toUpperCase().padStart(8, '0')
			ret += ',extended,' + this.replacementCost.toString(16).toUpperCase().padStart(8, '0')
			ret += ' // ' + this.ability + ' Cost: ' + this.replacementCost + '\n'
	
			// prefix += 'patch=1,EE,E0' + (magicChangeCount + 3).toString(16).toUpperCase().padStart(2, '0') + 'FFFF,extended,1032BAE0 // If not on Title Screen\n'
			// prefix += 'patch=1,EE,E0' + (magicChangeCount + 2).toString(16).toUpperCase().padStart(2, '0') + '2002,extended,1032BAE0 // If not in Station of Serenity\n'
			// prefix += 'patch=1,EE,E0' + (magicChangeCount + 1).toString(16).toUpperCase().padStart(2, '0') + '0000,extended,1032BAD8 // If not screen transition\n'
			// prefix += 'patch=1,EE,E1' + magicChangeCount.toString(16).toUpperCase().padStart(2, '0') + '0000,extended,1'
			// prefix += lastAbility.costAddress.slice(0, -1) + ' // If ' + lastAbility.ability + '\'s MP Cost is not ' + lastAbility.replacementCost + '\n'
	
			return ret
		}
	}
}

export const magicsData = [
	{
		magicType: 'Magic Spells',
		abilities: [
			new MagicAbility('Fire', 0x01CCBCE0, 12),
			new MagicAbility('Fira', 0x01CCC8E0, 12),
			new MagicAbility('Firaga', 0x01CCC910, 12),
			new MagicAbility('Blizzard', 0x01CCBD40, 15),
			new MagicAbility('Blizzara', 0x01CCC940, 15),
			new MagicAbility('Blizzaga', 0x01CCC970, 15),
			new MagicAbility('Thunder', 0x01CCBD10, 18),
			new MagicAbility('Thundara', 0x01CCC9A0, 18),
			new MagicAbility('Thundaga', 0x01CCC9D0, 18),
			new MagicAbility('Cure', 0x01CCBD70, 255),
			new MagicAbility('Cura', 0x01CCCA00, 255),
			new MagicAbility('Curaga', 0x01CCCA30, 255),
			new MagicAbility('Magnet', 0x01CCD240, 30),
			new MagicAbility('Magnera', 0x01CCD270, 30),
			new MagicAbility('Magnega', 0x01CCD2A0, 30),
			new MagicAbility('Reflect', 0x01CCD2D0, 10),
			new MagicAbility('Reflera', 0x01CCD300, 10),
			new MagicAbility('Reflega', 0x01CCD330, 10)
		]
	},
	{
		magicType: 'Party Limits',
		abilities: [
			new MagicAbility('Twin Howl (Beast)', 0x01CCC130, 255),
			new MagicAbility('Bushido (Auron)', 0x01CCC2B0, 255),
			new MagicAbility('Red Rocket (Mulan)', 0x01CCCC40, 255),
			new MagicAbility('Whirli-Goof (Goofy)', 0x01CCE110, 255),
			new MagicAbility('Comet (Donald)', 0x01CCE620, 255),
			new MagicAbility('Knocksmash (Goofy)', 0x01CCF040, 255),
			new MagicAbility('Duck Flare (Donald)', 0x01CCF160, 255),
			new MagicAbility('Speedster (Aladdin)', 0x01CCF280, 255),
			new MagicAbility('Bluff (Jack Sparrow)', 0x01CCF3A0, 255),
			new MagicAbility('Wildcat (Simba)', 0x01CCF730, 255),
			new MagicAbility('Dance Call (Jack)', 0x01CCFCA0, 255),
			new MagicAbility('Setup (Tron)', 0x01CCFE80, 255),
			new MagicAbility('Trinity Limit (Sora)', 0x01CD0B40, 255),
			new MagicAbility('Session (Riku)', 0x01CD1AD0, 255)
		]
	},
	{
		magicType: 'Other',
		abilities: [
			new MagicAbility('Strike Raid', 0x01CD3150, 65),
			new MagicAbility('Sonic Blade', 0x01CD3030, 60),
			new MagicAbility('Ragnarok', 0x01CD2F10, 80),
			new MagicAbility('Ars Arcanum', 0x01CD30C0, 72)
		]
	}
]