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

	static saveToPnach(magicData, isCommented) {
		return ['\n//MAGIC COSTS\n'].concat(magicData.map(magicType => {
			let prefix = isCommented ? '// ' + magicType.magicType.toUpperCase() + '\n' : ''
			let ret = ''
			let tempString = ''
			let tempLastAbility
			let magicChangeCount = 0
			let lastAbility
			magicType.abilities.forEach(ability => {
				[tempString, tempLastAbility] = ability.saveToPnach(isCommented)
				if (tempString !== '') {
					ret += tempString
					lastAbility = tempLastAbility
					magicChangeCount++
				}
			})
			if (magicChangeCount > 0) {
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 3).toString(16).toUpperCase().padStart(2, '0') + 'FFFF,extended,1032BAE0 // If not on Title Screen\n'
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 2).toString(16).toUpperCase().padStart(2, '0') + '2002,extended,1032BAE0 // If not in Station of Serenity\n'
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 1).toString(16).toUpperCase().padStart(2, '0') + '0000,extended,1032BAD8 // If not screen transition\n'
				prefix += 'patch=1,EE,E1' + magicChangeCount.toString(16).toUpperCase().padStart(2, '0') + '00' + lastAbility.replacementCost.toString(16).toUpperCase().padStart(2, '0')
				prefix += ',extended,1' + lastAbility.costAddress.toString(16).toUpperCase().padStart(7, '0')
				if (isCommented) prefix += ' // If ' + lastAbility.ability + '\'s MP Cost is not ' + lastAbility.replacementCost
				prefix += '\n'
			}
			return prefix + ret
		}))
	}
	static saveToLua(magicData, isCommented) {
		return ['\nfunction MagicCosts()\n'].concat(magicData.map(magicType => {
			let tempString = ''
			let ret = isCommented ? '\t-- ' + magicType.magicType.toUpperCase() + '\n' : ''
			magicType.abilities.forEach(ability => {
				tempString = ability.saveToLua(isCommented)[0]
				ret += tempString
			})
			return ret
		}), ['end\n'])
	}
	static saveToYml(magicData, isCommented) {
		return ''
	}
	static saveToJSON(magicData) {
		let magicCostSaveData = magicData.map(magicType => {
			let ret = ''
			magicType.abilities.forEach(ability => { ret += ability.saveToJSON() })
			if (ret !== '')
				return '{"magicType":"' + magicType.magicType + '","abilities":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		return ['"magicData":[', magicCostSaveData.filter(s => s !== '').join(), '],']
	}
	static loadFromJSON(magicLoadData) {
		let globalIndex = 0
		return magicsData.map(magicType => {
			if (globalIndex < magicLoadData.length) {
				if (magicLoadData[globalIndex].magicType === magicType.magicType) {
					let magicIndex = 0
					let newMagics = magicType.abilities.map(ability => {
						if (magicIndex < magicLoadData[globalIndex].abilities.length) {
							if (magicLoadData[globalIndex].abilities[magicIndex].costAddress === ability.costAddress) {
								let ret = ability.loadFromJSON(magicLoadData[globalIndex].abilities[magicIndex])
								magicIndex++
								return ret
							}
						}
						return ability
					})
					globalIndex++
					return {
						...magicType,
						abilities: newMagics
					}
				}
			}
			return magicType
		})
	}
}

export const magicsData = [
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