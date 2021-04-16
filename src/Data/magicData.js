export class MagicAbility {
	constructor(name, address, cost) {
		this.ability = name
		this.costAddress = address
		this.vanillaCost = cost
		this.replacementCost = cost
		this.toBeReplaced = false

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
		this.replace = (newMagicData) => {
			let ret = this.copy()
			ret.replacementCost = newMagicData.cost
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
			ret.toBeReplaced = false
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
				ret += '\tWriteByte(Sys3+0x' + costAddress.toString(16).toUpperCase() + ',0x' + this.replacementCost.toString(16).toUpperCase() + ')'
				if (isCommented) ret += ' -- ' + this.ability + ' Cost: ' + this.replacementCost
				ret += '\n'
			}
			return [ret, this]
		}
	}
}

export const magicsData = [
	{
		magicType: 'Magic Spells',
		abilities: [
			new MagicAbility('Fire', 0x1CCBCE0, 12),
			new MagicAbility('Fira', 0x1CCC8E0, 12),
			new MagicAbility('Firaga', 0x1CCC910, 12),
			new MagicAbility('Blizzard', 0x1CCBD40, 15),
			new MagicAbility('Blizzara', 0x1CCC940, 15),
			new MagicAbility('Blizzaga', 0x1CCC970, 15),
			new MagicAbility('Thunder', 0x1CCBD10, 18),
			new MagicAbility('Thundara', 0x1CCC9A0, 18),
			new MagicAbility('Thundaga', 0x1CCC9D0, 18),
			new MagicAbility('Cure', 0x1CCBD70, 255),
			new MagicAbility('Cura', 0x1CCCA00, 255),
			new MagicAbility('Curaga', 0x1CCCA30, 255),
			new MagicAbility('Magnet', 0x1CCD240, 30),
			new MagicAbility('Magnera', 0x1CCD270, 30),
			new MagicAbility('Magnega', 0x1CCD2A0, 30),
			new MagicAbility('Reflect', 0x1CCD2D0, 10),
			new MagicAbility('Reflera', 0x1CCD300, 10),
			new MagicAbility('Reflega', 0x1CCD330, 10)
		]
	},
	{
		magicType: 'Party Limits',
		abilities: [
			new MagicAbility('Twin Howl (Beast)', 0x1CCC130, 255),
			new MagicAbility('Bushido (Auron)', 0x1CCC2B0, 255),
			new MagicAbility('Red Rocket (Mulan)', 0x1CCCC40, 255),
			new MagicAbility('Whirli-Goof (Goofy)', 0x1CCE110, 255),
			new MagicAbility('Comet (Donald)', 0x1CCE620, 255),
			new MagicAbility('Knocksmash (Goofy)', 0x1CCF040, 255),
			new MagicAbility('Duck Flare (Donald)', 0x1CCF160, 255),
			new MagicAbility('Speedster (Aladdin)', 0x1CCF280, 255),
			new MagicAbility('Bluff (Jack Sparrow)', 0x1CCF3A0, 255),
			new MagicAbility('Wildcat (Simba)', 0x1CCF730, 255),
			new MagicAbility('Dance Call (Jack)', 0x1CCFCA0, 255),
			new MagicAbility('Setup (Tron)', 0x1CCFE80, 255),
			new MagicAbility('Trinity Limit (Sora)', 0x1CD0B40, 255),
			new MagicAbility('Session (Riku)', 0x1CD1AD0, 255)
		]
	},
	{
		magicType: 'Other',
		abilities: [
			new MagicAbility('Strike Raid', 0x1CD3150, 65),
			new MagicAbility('Sonic Blade', 0x1CD3030, 60),
			new MagicAbility('Ragnarok', 0x1CD2F10, 80),
			new MagicAbility('Ars Arcanum', 0x1CD30C0, 72)
		]
	}
]