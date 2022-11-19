export class AbilityCost {
	constructor(ability, address, cost, zipID) {
		this.ability = ability
		this.costAddress = address
		this.vanillaCost = cost
		this.replacementCost = cost
		this.zipID = zipID

		this.isReplaced = () => {
			return this.replacementCost !== this.vanillaCost
		}
		this.copy = () => {
			let ret = this.vanilla()
			ret.replacementCost = this.replacementCost
			return ret
		}
		this.vanilla = () => {
			return new AbilityCost(this.ability, this.costAddress, this.vanillaCost, this.zipID)
		}
		this.replace = (newAbilityCost) => {
			let ret = this.copy()
			ret.replacementCost = newAbilityCost
			ret.toBeReplaced = false
			return ret
		}
		this.saveToJSON = () => {
			return this.isReplaced() ? JSON.stringify(this, ['costAddress', 'replacementCost']) + ',' : ''
		}
		this.loadFromJSON = (costJSON) => {
			let ret = this.copy()
			ret.replacementCost = costJSON.replacementCost
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
		this.saveToYml = (isCommented) => {
			let ret = ''
			if (this.isReplaced()) {
				ret = this.zipID.toString() + ':\n  Cost: ' + this.replacementCost
				ret += '\n'
			}
			return ret
		}
	}

	static saveToPnach(costData, isCommented) {
		return ['\n//ABILITY COSTS\n'].concat(costData.map(abilityType => {
			let prefix = isCommented ? '// ' + abilityType.type.toUpperCase() + '\n' : ''
			let ret = ''
			let tempString = ''
			let tempLastAbility
			let magicChangeCount = 0
			let lastAbility
			abilityType.abilities.forEach(category => {
				category.specificAbilities.forEach(ability => {
					[tempString, tempLastAbility] = ability.saveToPnach(isCommented)
					if (tempString !== '') {
						ret += tempString
						lastAbility = tempLastAbility
						magicChangeCount++
					}
				})
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
	static saveToLua(costData, isCommented) {
		return ['\nfunction AbilityCosts()\n'].concat(costData.map(abilityType => {
			let tempString = ''
			let ret = isCommented ? '\t-- ' + abilityType.type.toUpperCase() + '\n' : ''
			abilityType.abilities.forEach(category => {
				category.specificAbilities.forEach(ability => {
					tempString = ability.saveToLua(isCommented)[0]
					ret += tempString
				})
			})
			return ret
		}), ['end\n'])
	}
	static saveToYml(costData, isCommented) {
		return costData.reduce((prev, abilityType) => {
			abilityType.abilities.forEach(category => { category.specificAbilities.forEach(ability => { prev += ability.saveToYml(isCommented) }) })
			return prev
		}, '')
	}
	static saveToJSON(costData) {
		let costSaveData = costData.map(abilityType => {
			let ret = ''
			abilityType.abilities.forEach(category => {
				let categoryRet = ''
				category.specificAbilities.forEach(ability => { categoryRet += ability.saveToJSON() })
				if (categoryRet !== '')
					ret = ret + '{"category":"' + category.category + '","specificAbilities":[' + categoryRet.slice(0, -1) + ']},'
			})
			if (ret !== '')
				return '{"type":"' + abilityType.type + '","abilities":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		return ['"costsData":[', costSaveData.filter(s => s !== '').join(), '],']
	}
	static loadFromJSON(costLoadData) {
		let globalIndex = 0
		return costsData.map(abilityType => {
			if (globalIndex < costLoadData.length) {
				if (costLoadData[globalIndex].type === abilityType.type) {
					let categoryIndex = 0
					let newCategories = abilityType.abilities.map(category => {
						if (categoryIndex < costLoadData[globalIndex].abilities.length) {
							let abilityIndex = 0
							let newAbilities = category.specificAbilities.map(ability => {
								if (abilityIndex < costLoadData[globalIndex].abilities[categoryIndex].specificAbilities.length) {
									if (costLoadData[globalIndex].abilities[categoryIndex].specificAbilities[abilityIndex].costAddress === ability.costAddress) {
										let ret = ability.loadFromJSON(costLoadData[globalIndex].abilities[categoryIndex].specificAbilities[abilityIndex])
										abilityIndex++
										return ret
									}
								}
								return ability
							})
							categoryIndex++
							return {
								...category,
								specificAbilities: newAbilities
							}
						}
						return category
					})
					globalIndex++
					return {
						...abilityType,
						abilities: newCategories
					}
				}
			}
			return abilityType
		})
	}
}

export const costsData = [
	{
		type: 'Magic',
		abilities: [
			{
				category: 'Fire Element',
				path: 'magicImages/fire',
				specificAbilities:
					[
						new AbilityCost('Fire', 0x1CCBCE0, 12, 49),
						new AbilityCost('Fira', 0x1CCC8E0, 12, 119),
						new AbilityCost('Firaga', 0x1CCC910, 12, 120)
					]
			},
			{
				category: 'Blizzard Element',
				path: 'magicImages/blizzard',
				specificAbilities:
					[
						new AbilityCost('Blizzard', 0x1CCBD40, 15, 51),
						new AbilityCost('Blizzara', 0x1CCC940, 15, 121),
						new AbilityCost('Blizzaga', 0x1CCC970, 15, 122)
					]
			},
			{
				category: 'Thunder Element',
				path: 'magicImages/thunder',
				specificAbilities:
					[
						new AbilityCost('Thunder', 0x1CCBD10, 18, 50),
						new AbilityCost('Thundara', 0x1CCC9A0, 18, 123),
						new AbilityCost('Thundaga', 0x1CCC9D0, 18, 124)
					]
			},
			{
				category: 'Cure Element',
				path: 'magicImages/cure',
				specificAbilities:
					[
						new AbilityCost('Cure', 0x1CCBD70, 255, 52),
						new AbilityCost('Cura', 0x1CCCA00, 255, 125),
						new AbilityCost('Curaga', 0x1CCCA30, 255, 126)
					]
			},
			{
				category: 'Magnet Element',
				path: 'magicImages/magnet',
				specificAbilities:
					[
						new AbilityCost('Magnet', 0x1CCD240, 30, 174),
						new AbilityCost('Magnera', 0x1CCD270, 30, 175),
						new AbilityCost('Magnega', 0x1CCD2A0, 30, 176)
					]
			},
			{
				category: 'Reflect Element',
				path: 'magicImages/reflect',
				specificAbilities:
					[
						new AbilityCost('Reflect', 0x1CCD2D0, 10, 177),
						new AbilityCost('Reflera', 0x1CCD300, 10, 178),
						new AbilityCost('Reflega', 0x1CCD330, 10, 179)
					]
			}
		]
	},
	{
		type: 'Drives and Summons',
		abilities: [
			{
				category: 'Limit Form',
				path: 'icons/limit_form',
				specificAbilities:
					[
						new AbilityCost('Strike Raid', 0x1CD3150, 65, 704),
						new AbilityCost('Sonic Blade', 0x1CD3030, 60, 698),
						new AbilityCost('Ragnarok', 0x1CD2F10, 80, 683),
						new AbilityCost('Ars Arcanum', 0x1CD30C0, 72, 701)
					]
			}
		]
	},
	{
		type: 'Party Limits',
		abilities: [
			{
				category: 'Beast',
				path: 'equipmentImages/alw/1CDF406',
				specificAbilities: [
					new AbilityCost('Twin Howl', 0x1CCC130, 255, 74)
				]
			},
			{
				category: 'Auron',
				path: 'equipmentImages/alw/1CDF3B6',
				specificAbilities: [
					new AbilityCost('Bushido', 0x1CCC2B0, 255, 82)
				]
			},
			{
				category: 'Mulan',
				path: 'equipmentImages/alw/1CDF3C6',
				specificAbilities: [
					new AbilityCost('Red Rocket', 0x1CCCC40, 255, 139)
				]
			},
			{
				category: 'Aladdin',
				path: 'equipmentImages/alw/1CDF3A6',
				specificAbilities: [
					new AbilityCost('Speedster', 0x1CCF280, 255, 351)
				]
			},
			{
				category: 'Jack Sparrow',
				path: 'equipmentImages/alw/1CDF436',
				specificAbilities: [
					new AbilityCost('Bluff', 0x1CCF3A0, 255, 357)
				]
			},
			{
				category: 'Simba',
				path: 'equipmentImages/alw/1CDF426',
				specificAbilities: [
					new AbilityCost('Wildcat', 0x1CCF730, 255, 376)
				]
			},
			{
				category: 'Jack',
				path: 'equipmentImages/alw/1CDF416',
				specificAbilities: [
					new AbilityCost('Dance Call', 0x1CCFCA0, 255, 405)
				]
			},
			{
				category: 'Tron',
				path: 'equipmentImages/alw/1CDF3E6',
				specificAbilities: [
					new AbilityCost('Setup', 0x1CCFE80, 255, 415)
				]
			},
			{
				category: 'Riku',
				path: 'equipmentImages/alw/1CDF446',
				specificAbilities: [
					new AbilityCost('Session', 0x1CD1AD0, 255, 569)
				]
			},
			{
				category: 'Sora',
				path: 'equipmentImages/key/key',
				specificAbilities: [
					new AbilityCost('Trinity Limit', 0x1CD0B40, 255, 620) // Maybe? 620 or 484 id
				]
			},
			{
				category: 'Goofy',
				path: 'equipmentImages/gsh/gsh',
				specificAbilities: [
					new AbilityCost('Whirli-Goof', 0x1CCE110, 255, 255),
					new AbilityCost('Knocksmash', 0x1CCF040, 255, 338)
				]
			},
			{
				category: 'Donald',
				path: 'equipmentImages/dst/dst',
				specificAbilities: [
					new AbilityCost('Comet', 0x1CCE620, 255, 282),
					new AbilityCost('Duck Flare', 0x1CCF160, 255, 344)
				]
			}
		]
	}
]