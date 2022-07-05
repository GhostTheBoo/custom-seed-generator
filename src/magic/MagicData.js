export class MagicAbility {
	constructor(name, address, cost) {
		this.ability = name
		this.costAddress = address
		this.vanillaCost = cost
		this.replacementCost = cost

		this.isReplaced = () => {
			return this.replacementCost !== this.vanillaCost
		}
		this.copy = () => {
			let ret = this.vanilla()
			ret.replacementCost = this.replacementCost
			ret.toBeReplaced = this.toBeReplaced
			return ret
		}
		this.vanilla = () => {
			return new MagicAbility(this.ability, this.costAddress, this.vanillaCost)
		}
		this.replace = (newMagicCost) => {
			let ret = this.copy()
			ret.replacementCost = newMagicCost
			ret.toBeReplaced = false
			return ret
		}
		this.markForReplacement = (toBeReplaced) => {
			let ret = this.copy()
			ret.toBeReplaced = toBeReplaced
			return ret
		}
		this.saveToJSON = () => {
			return this.isReplaced() ? JSON.stringify(this, ['costAddress', 'replacementCost']) + ',' : ''
		}
		this.loadFromJSON = (magicJSON) => {
			let ret = this.copy()
			ret.replacementCost = magicJSON.replacementCost
			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ''
			if (this.isReplaced()) {
				ret += 'patch=1,EE,0' + this.costAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,' + this.replacementCost.toString(16).toUpperCase().padStart(8, '0')
				if (isCommented) ret += ' // ' + this.ability + ' Cost: ' + this.replacementCost
				ret += '\n'
			}
			return [ret, this]
		}
		this.saveToLua = (isCommented) => {
			let costAddress = this.costAddress - 0x1CCB300
			let ret = ''
			if (this.isReplaced()) {
				ret += '\tWriteByte(Sys3+0x' + costAddress.toString(16).toUpperCase() + ',0x' + this.replacementCost.toString(16).toUpperCase().padStart(2, '0') + ')'
				if (isCommented) ret += ' -- ' + this.ability + ' Cost: ' + this.replacementCost
				ret += '\n'
			}
			return [ret, this]
		}
	}
}

export const magicData = [
	{
		magicType: 'Fire Element',
		pathName: 'magicImages/fire',
		abilities: [
			new MagicAbility('Fire', 0x1CCBCE0, 12),
			new MagicAbility('Fira', 0x1CCC8E0, 12),
			new MagicAbility('Firaga', 0x1CCC910, 12)
		]
	},
	{
		magicType: 'Blizzard Element',
		pathName: 'magicImages/blizzard',
		abilities: [
			new MagicAbility('Blizzard', 0x1CCBD40, 15),
			new MagicAbility('Blizzara', 0x1CCC940, 15),
			new MagicAbility('Blizzaga', 0x1CCC970, 15)
		]
	},
	{
		magicType: 'Thunder Element',
		pathName: 'magicImages/thunder',
		abilities: [
			new MagicAbility('Thunder', 0x1CCBD10, 18),
			new MagicAbility('Thundara', 0x1CCC9A0, 18),
			new MagicAbility('Thundaga', 0x1CCC9D0, 18)
		]
	},
	{
		magicType: 'Cure Element',
		pathName: 'magicImages/cure',
		abilities: [
			new MagicAbility('Cure', 0x1CCBD70, 255),
			new MagicAbility('Cura', 0x1CCCA00, 255),
			new MagicAbility('Curaga', 0x1CCCA30, 255)
		]
	},
	{
		magicType: 'Magnet Element',
		pathName: 'magicImages/magnet',
		abilities: [
			new MagicAbility('Magnet', 0x1CCD240, 30),
			new MagicAbility('Magnera', 0x1CCD270, 30),
			new MagicAbility('Magnega', 0x1CCD2A0, 30)
		]
	},
	{
		magicType: 'Reflect Element',
		pathName: 'magicImages/reflect',
		abilities: [
			new MagicAbility('Reflect', 0x1CCD2D0, 10),
			new MagicAbility('Reflera', 0x1CCD300, 10),
			new MagicAbility('Reflega', 0x1CCD330, 10)
		]
	},
	{
		magicType: 'Beast',
		pathName: 'equipmentImages/alw/1CDF406',
		abilities: [new MagicAbility('Twin Howl', 0x1CCC130, 255)]
	},
	{
		magicType: 'Auron',
		pathName: 'equipmentImages/alw/1CDF3B6',
		abilities: [new MagicAbility('Bushido', 0x1CCC2B0, 255)]
	},
	{
		magicType: 'Mulan',
		pathName: 'equipmentImages/alw/1CDF3C6',
		abilities: [new MagicAbility('Red Rocket', 0x1CCCC40, 255)]
	},
	{
		magicType: 'Aladdin',
		pathName: 'equipmentImages/alw/1CDF3A6',
		abilities: [new MagicAbility('Speedster', 0x1CCF280, 255)]
	},
	{
		magicType: 'Jack Sparrow',
		pathName: 'equipmentImages/alw/1CDF436',
		abilities: [new MagicAbility('Bluff', 0x1CCF3A0, 255)]
	},
	{
		magicType: 'Simba',
		pathName: 'equipmentImages/alw/1CDF426',
		abilities: [new MagicAbility('Wildcat', 0x1CCF730, 255)]
	},
	{
		magicType: 'Jack',
		pathName: 'equipmentImages/alw/1CDF416',
		abilities: [new MagicAbility('Dance Call', 0x1CCFCA0, 255)]
	},
	{
		magicType: 'Tron',
		pathName: 'equipmentImages/alw/1CDF3E6',
		abilities: [new MagicAbility('Setup', 0x1CCFE80, 255)]
	},
	{
		magicType: 'Riku',
		pathName: 'equipmentImages/alw/1CDF446',
		abilities: [new MagicAbility('Session', 0x1CD1AD0, 255)]
	},
	{
		magicType: 'Sora',
		pathName: 'equipmentImages/key/key',
		abilities: [new MagicAbility('Trinity Limit', 0x1CD0B40, 255)]
	},
	{
		magicType: 'Goofy',
		pathName: 'equipmentImages/gsh/gsh',
		abilities: [
			new MagicAbility('Whirli-Goof', 0x1CCE110, 255),
			new MagicAbility('Knocksmash', 0x1CCF040, 255)
		]
	},
	{
		magicType: 'Donald',
		pathName: 'equipmentImages/dst/dst',
		abilities: [
			new MagicAbility('Comet', 0x1CCE620, 255),
			new MagicAbility('Duck Flare', 0x1CCF160, 255)
		]
	},
	{
		magicType: 'Limit Form',
		pathName: 'icons/limit_form',
		abilities: [
			new MagicAbility('Strike Raid', 0x1CD3150, 65),
			new MagicAbility('Sonic Blade', 0x1CD3030, 60),
			new MagicAbility('Ragnarok', 0x1CD2F10, 80),
			new MagicAbility('Ars Arcanum', 0x1CD30C0, 72)
		]
	}
]