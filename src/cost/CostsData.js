export class AbilityCost {
	constructor(category, path, ability, address, cost, zipID) {
		this.category = category
		this.path = path
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
			return new AbilityCost(this.category, this.path, this.ability, this.costAddress, this.vanillaCost, this.zipID)
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
			abilityType.abilities.forEach(abilityGroup => {
				abilityGroup.forEach(ability => {
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
			abilityType.abilities.forEach(abilityGroup => {
				abilityGroup.forEach(ability => {
					tempString = ability.saveToLua(isCommented)[0]
					ret += tempString
				})
			})
			return ret
		}), ['end\n'])
	}
	static saveToYml(costData, isCommented) {
		costData.reduce((prev, abilityType) => {
			abilityType.abilities.forEach(abilityGroup => { abilityGroup.forEach(ability => { prev += ability.saveToYml(isCommented) }) })
			return prev
		}, '')
	}
	static saveToJSON(costData) {
		let costSaveData = costData.map(abilityType => {
			let ret = ''
			abilityType.abilities.forEach(abilityGroup => {
				ret += '['
				abilityGroup.forEach(ability => { ret += ability.saveToJSON() })
				ret = ret.slice(0, -1) + '],'
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
					let abilityGroupIndex = 0
					let newAbilityGroups = abilityType.abilities.map(abilityGroup => {
						if (abilityGroupIndex < costLoadData[globalIndex].abilities.length) {
							let abilityIndex = 0
							let newAbilities = abilityGroup.map(ability => {
								if (abilityIndex < costLoadData[globalIndex].abilities[abilityGroupIndex].length) {
									if (costLoadData[globalIndex].abilities[abilityGroupIndex][abilityIndex].costAddress === ability.costAddress) {
										let ret = ability.loadFromJSON(costLoadData[globalIndex].abilities[abilityGroupIndex][abilityIndex])
										abilityIndex++
										return ret
									}
								}
								return ability
							})
							abilityGroupIndex++
							return newAbilities
						}
						return abilityGroup
					})
					globalIndex++
					return {
						...abilityType,
						abilities: newAbilityGroups
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
			[
				new AbilityCost('Fire Element', 'magicImages/fire', 'Fire', 0x1CCBCE0, 12, 49),
				new AbilityCost('Fire Element', 'magicImages/fire', 'Fira', 0x1CCC8E0, 12, 119),
				new AbilityCost('Fire Element', 'magicImages/fire', 'Firaga', 0x1CCC910, 12, 120)
			],
			[
				new AbilityCost('Blizzard Element', 'magicImages/blizzard', 'Blizzard', 0x1CCBD40, 15, 51),
				new AbilityCost('Blizzard Element', 'magicImages/blizzard', 'Blizzara', 0x1CCC940, 15, 121),
				new AbilityCost('Blizzard Element', 'magicImages/blizzard', 'Blizzaga', 0x1CCC970, 15, 122)
			],
			[
				new AbilityCost('Thunder Element', 'magicImages/thunder', 'Thunder', 0x1CCBD10, 18, 50),
				new AbilityCost('Thunder Element', 'magicImages/thunder', 'Thundara', 0x1CCC9A0, 18, 123),
				new AbilityCost('Thunder Element', 'magicImages/thunder', 'Thundaga', 0x1CCC9D0, 18, 124)
			],
			[
				new AbilityCost('Cure Element', 'magicImages/cure', 'Cure', 0x1CCBD70, 255, 52),
				new AbilityCost('Cure Element', 'magicImages/cure', 'Cura', 0x1CCCA00, 255, 125),
				new AbilityCost('Cure Element', 'magicImages/cure', 'Curaga', 0x1CCCA30, 255, 126)
			],
			[
				new AbilityCost('Magnet Element', 'magicImages/magnet', 'Magnet', 0x1CCD240, 30, 174),
				new AbilityCost('Magnet Element', 'magicImages/magnet', 'Magnera', 0x1CCD270, 30, 175),
				new AbilityCost('Magnet Element', 'magicImages/magnet', 'Magnega', 0x1CCD2A0, 30, 176)
			],
			[
				new AbilityCost('Reflect Element', 'magicImages/reflect', 'Reflect', 0x1CCD2D0, 10, 177),
				new AbilityCost('Reflect Element', 'magicImages/reflect', 'Reflera', 0x1CCD300, 10, 178),
				new AbilityCost('Reflect Element', 'magicImages/reflect', 'Reflega', 0x1CCD330, 10, 179)
			]
		]
	},
	{
		type: 'Drives and Summons',
		abilities: [
			[
				new AbilityCost('Limit Form', 'icons/limit_form', 'Strike Raid', 0x1CD3150, 65, 704),
				new AbilityCost('Limit Form', 'icons/limit_form', 'Sonic Blade', 0x1CD3030, 60, 698),
				new AbilityCost('Limit Form', 'icons/limit_form', 'Ragnarok', 0x1CD2F10, 80, 683),
				new AbilityCost('Limit Form', 'icons/limit_form', 'Ars Arcanum', 0x1CD30C0, 72, 701)
			]
		]
	},
	{
		type: 'Party Limits',
		abilities: [
			[new AbilityCost('Beast', 'equipmentImages/alw/1CDF406', 'Twin Howl', 0x1CCC130, 255, 74)],
			[new AbilityCost('Auron', 'equipmentImages/alw/1CDF3B6', 'Bushido', 0x1CCC2B0, 255, 82)],
			[new AbilityCost('Mulan', 'equipmentImages/alw/1CDF3C6', 'Red Rocket', 0x1CCCC40, 255, 139)],
			[new AbilityCost('Aladdin', 'equipmentImages/alw/1CDF3A6', 'Speedster', 0x1CCF280, 255, 351)],
			[new AbilityCost('Jack Sparrow', 'equipmentImages/alw/1CDF436', 'Bluff', 0x1CCF3A0, 255, 357)],
			[new AbilityCost('Simba', 'equipmentImages/alw/1CDF426', 'Wildcat', 0x1CCF730, 255, 376)],
			[new AbilityCost('Jack', 'equipmentImages/alw/1CDF416', 'Dance Call', 0x1CCFCA0, 255, 405)],
			[new AbilityCost('Tron', 'equipmentImages/alw/1CDF3E6', 'Setup', 0x1CCFE80, 255, 415)],
			[new AbilityCost('Riku', 'equipmentImages/alw/1CDF446', 'Session', 0x1CD1AD0, 255, 569)],
			[new AbilityCost('Sora', 'equipmentImages/key/key', 'Trinity Limit', 0x1CD0B40, 255, 620)], // Maybe? 620 or 484 idk
			[
				new AbilityCost('Goofy', 'equipmentImages/gsh/gsh', 'Whirli-Goof', 0x1CCE110, 255, 255),
				new AbilityCost('Goofy', 'equipmentImages/gsh/gsh', 'Knocksmash', 0x1CCF040, 255, 338)
			],
			[
				new AbilityCost('Donald', 'equipmentImages/dst/dst', 'Comet', 0x1CCE620, 255, 282),
				new AbilityCost('Donald', 'equipmentImages/dst/dst', 'Duck Flare', 0x1CCF160, 255, 344)
			]
		]
	}
]