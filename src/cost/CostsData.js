export class AbilityCost {
	constructor(ability, address, cost, zipID, extraData) {
		this.ability = ability
		this.costAddress = address
		this.vanillaCost = cost
		this.replacementCost = cost
		this.zipID = zipID
		this.extraData = extraData

		this.isReplaced = () => {
			return this.replacementCost !== this.vanillaCost
		}
		this.copy = () => {
			let ret = this.vanilla()
			ret.replacementCost = this.replacementCost
			return ret
		}
		this.vanilla = () => {
			return new AbilityCost(this.ability, this.costAddress, this.vanillaCost, this.zipID, this.extraData)
		}
		this.replace = (newAbilityCost) => {
			let ret = this.copy()
			if (!isNaN(newAbilityCost))
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
				ret = isCommented ? '# ' + this.ability + '\n' : ''
				ret += '- Id: ' + this.zipID.toString()
				ret += '\n  Cost: ' + this.replacementCost + ''
				ret += '\n' + this.extraData
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
			if (abilityType.abilities.find(category => category.specificAbilities.find(specAbility => specAbility.isReplaced()))) {
				prev += isCommented ? '# ' + abilityType.type + '\n' : ''
				abilityType.abilities.forEach(category => { category.specificAbilities.forEach(ability => { prev += ability.saveToYml(isCommented) }) })
			}
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
		return costsData.map(abilityType => {
			let foundAbilityType = costLoadData.find(loadAbilityType => loadAbilityType.type === abilityType.type)
			if (foundAbilityType !== undefined) {
				let newAbilities = abilityType.abilities.map(category => {
					let foundCategory = foundAbilityType.abilities.find(loadAbility => loadAbility.category === category.category)
					if (foundCategory !== undefined) {
						let newSpecificAbilities = category.specificAbilities.map(specificAbility => {
							let foundSpec = foundCategory.specificAbilities.find(loadSpec => loadSpec.costAddress === specificAbility.costAddress)
							if (foundSpec !== undefined)
								return specificAbility.loadFromJSON(foundSpec)
							return specificAbility
						})
						return {
							...category,
							specificAbilities: newSpecificAbilities
						}
					}
					return category
				})
				return {
					...abilityType,
					abilities: newAbilities
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
						new AbilityCost('Fire', 0x1CCBCE0, 12, 49,
							'  Execute: 2\n' +
							'  Argument: 0\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34056\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Fira', 0x1CCC8E0, 12, 119,
							'  Execute: 2\n' +
							'  Argument: 0\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34057\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Firaga', 0x1CCC910, 12, 120,
							'  Execute: 2\n' +
							'  Argument: 0\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34058\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						)
					]
			},
			{
				category: 'Blizzard Element',
				path: 'magicImages/blizzard',
				specificAbilities:
					[
						new AbilityCost('Blizzard', 0x1CCBD40, 15, 51,
							'  Execute: 2\n' +
							'  Argument: 1\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34062\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Blizzara', 0x1CCC940, 15, 121,
							'  Execute: 2\n' +
							'  Argument: 1\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34063\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Blizzaga', 0x1CCC970, 15, 122,
							'  Execute: 2\n' +
							'  Argument: 1\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34064\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						)
					]
			},
			{
				category: 'Thunder Element',
				path: 'magicImages/thunder',
				specificAbilities:
					[
						new AbilityCost('Thunder', 0x1CCBD10, 18, 50,
							'  Execute: 2\n' +
							'  Argument: 2\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34059\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Thundara', 0x1CCC9A0, 18, 123,
							'  Execute: 2\n' +
							'  Argument: 2\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34060\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Thundaga', 0x1CCC9D0, 18, 124,
							'  Execute: 2\n' +
							'  Argument: 2\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34061\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						)
					]
			},
			{
				category: 'Cure Element',
				path: 'magicImages/cure',
				specificAbilities:
					[
						new AbilityCost('Cure', 0x1CCBD70, 255, 52,
							'  Execute: 2\n' +
							'  Argument: 3\n' +
							'  SubMenu: 4\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34065\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Cura', 0x1CCCA00, 255, 125,
							'  Execute: 2\n' +
							'  Argument: 3\n' +
							'  SubMenu: 4\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34066\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Curaga', 0x1CCCA30, 255, 126,
							'  Execute: 2\n' +
							'  Argument: 3\n' +
							'  SubMenu: 4\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34067\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 10\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						)
					]
			},
			{
				category: 'Magnet Element',
				path: 'magicImages/magnet',
				specificAbilities:
					[
						new AbilityCost('Magnet', 0x1CCD240, 30, 174,
							'  Execute: 2\n' +
							'  Argument: 4\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34068\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 50\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Magnera', 0x1CCD270, 30, 175,
							'  Execute: 2\n' +
							'  Argument: 4\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34069\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 50\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Magnega', 0x1CCD2A0, 30, 176,
							'  Execute: 2\n' +
							'  Argument: 4\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34070\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 50\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						)
					]
			},
			{
				category: 'Reflect Element',
				path: 'magicImages/reflect',
				specificAbilities:
					[
						new AbilityCost('Reflect', 0x1CCD2D0, 10, 177,
							'  Execute: 2\n' +
							'  Argument: 5\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34071\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 50\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Reflera', 0x1CCD300, 10, 178,
							'  Execute: 2\n' +
							'  Argument: 5\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34072\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 50\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Reflega', 0x1CCD330, 10, 179,
							'  Execute: 2\n' +
							'  Argument: 5\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Magic\n' +
							'  MessageId: 34073\n' +
							'  Flags: Cursor, Battle, Secure\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 1\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 50\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						)
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
						new AbilityCost('Strike Raid', 0x1CD3150, 65, 704,
							'  Execute: 707\n' +
							'  Argument: 704\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Null\n' +
							'  MessageId: 52996\n' +
							'  Flags: Land, Battle, Drive, InBattleOnly\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 0\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 0\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Sonic Blade', 0x1CD3030, 60, 698,
							'  Execute: 707\n' +
							'  Argument: 698\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Null\n' +
							'  MessageId: 52990\n' +
							'  Flags: Land, Battle, Drive, InBattleOnly\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 0\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 0\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Ragnarok', 0x1CD2F10, 80, 683,
							'  Execute: 707\n' +
							'  Argument: 683\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Null\n' +
							'  MessageId: 52982\n' +
							'  Flags: Land, Battle, Drive, InBattleOnly\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 0\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 0\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						),
						new AbilityCost('Ars Arcanum', 0x1CD30C0, 72, 701,
							'  Execute: 707\n' +
							'  Argument: 701\n' +
							'  SubMenu: -1\n' +
							'  CmdIcon: Null\n' +
							'  MessageId: 52993\n' +
							'  Flags: Land, Battle, Drive, InBattleOnly\n' +
							'  Range: -1.0\n' +
							'  Dir: 0.0\n' +
							'  DirRange: -1.0\n' +
							'  CmdCamera: Null\n' +
							'  Priority: 100\n' +
							'  CmdReceiver: Player\n' +
							'  Time: 0\n' +
							'  Require: 0\n' +
							'  Mark: 0\n' +
							'  CmdAction: Null\n' +
							'  ReactionCount: 0\n' +
							'  DistRange: 0\n' +
							'  Score: 0\n' +
							'  DisableForm: 0\n' +
							'  Group: 2\n' +
							'  Reserve: 0'
						)
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
					new AbilityCost('Twin Howl', 0x1CCC130, 255, 74,
						'  Execute: 81\n' +
						'  Argument: 74\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 33932\n' +
						'  Flags: Land, Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 300\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 0\n' +
						'  Reserve: 0'
					)
				]
			},
			{
				category: 'Auron',
				path: 'equipmentImages/alw/1CDF3B6',
				specificAbilities: [
					new AbilityCost('Bushido', 0x1CCC2B0, 255, 82,
						'  Execute: 81\n' +
						'  Argument: 82\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 33936\n' +
						'  Flags: Land, Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 120\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 0\n' +
						'  Reserve: 0'
					)
				]
			},
			{
				category: 'Mulan',
				path: 'equipmentImages/alw/1CDF3C6',
				specificAbilities: [
					new AbilityCost('Red Rocket', 0x1CCCC40, 255, 139,
						'  Execute: 81\n' +
						'  Argument: 139\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 33940\n' +
						'  Flags: Land, Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 300\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 0\n' +
						'  Reserve: 0'
					)
				]
			},
			{
				category: 'Aladdin',
				path: 'equipmentImages/alw/1CDF3A6',
				specificAbilities: [
					new AbilityCost('Speedster', 0x1CCF280, 255, 351,
						'  Execute: 81\n' +
						'  Argument: 351\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 45794\n' +
						'  Flags: Land, Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 300\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 0\n' +
						'  Reserve: 0'
					)
				]
			},
			{
				category: 'Jack Sparrow',
				path: 'equipmentImages/alw/1CDF436',
				specificAbilities: [
					new AbilityCost('Bluff', 0x1CCF3A0, 255, 357,
						'  Execute: 81\n' +
						'  Argument: 357\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 45799\n' +
						'  Flags: Land, Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 120\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 0\n' +
						'  Reserve: 0'
					)
				]
			},
			{
				category: 'Simba',
				path: 'equipmentImages/alw/1CDF426',
				specificAbilities: [
					new AbilityCost('Wildcat', 0x1CCF730, 255, 376,
						'  Execute: 81\n' +
						'  Argument: 376\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 46857\n' +
						'  Flags: Land, Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 300\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 0\n' +
						'  Reserve: 0'
					)
				]
			},
			{
				category: 'Jack',
				path: 'equipmentImages/alw/1CDF416',
				specificAbilities: [
					new AbilityCost('Dance Call', 0x1CCFCA0, 255, 405,
						'  Execute: 81\n' +
						'  Argument: 405\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 47380\n' +
						'  Flags: Land, Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 300\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 0\n' +
						'  Reserve: 0'
					)
				]
			},
			{
				category: 'Tron',
				path: 'equipmentImages/alw/1CDF3E6',
				specificAbilities: [
					new AbilityCost('Setup', 0x1CCFE80, 255, 415,
						'  Execute: 81\n' +
						'  Argument: 415\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 47390\n' +
						'  Flags: Land, Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 300\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 0\n' +
						'  Reserve: 0'
					)
				]
			},
			{
				category: 'Riku',
				path: 'equipmentImages/alw/1CDF446',
				specificAbilities: [
					new AbilityCost('Session', 0x1CD1AD0, 255, 569,
						'  Execute: 81\n' +
						'  Argument: 569\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 50622\n' +
						'  Flags: Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 300\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 0\n' +
						'  Reserve: 0'
					)
				]
			},
			{
				category: 'Sora',
				path: 'equipmentImages/key/1CDF1D6',
				specificAbilities: [
					new AbilityCost('Trinity Limit', 0x1CD0B40, 255, 620,
						'  Execute: 81\n' +
						'  Argument: 620\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 48481\n' +
						'  Flags: Cursor, Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 180\n' +
						'  Require: 0\n' +
						'  Mark: 1\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 1\n' +
						'  Reserve: 0'
					)
					// Maybe? 620 or 484 id
				]
			},
			{
				category: 'Goofy',
				path: 'equipmentImages/gsh/1CDF2E6',
				specificAbilities: [
					new AbilityCost('Whirli-Goof', 0x1CCE110, 255, 255,
						'  Execute: 81\n' +
						'  Argument: 255\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 33944\n' +
						'  Flags: Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 180\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 1\n' +
						'  Reserve: 0'
					),
					new AbilityCost('Knocksmash', 0x1CCF040, 255, 338,
						'  Execute: 81\n' +
						'  Argument: 338\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 44864\n' +
						'  Flags: Land, Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 150\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 1\n' +
						'  Reserve: 0'
					)
				]
			},
			{
				category: 'Donald',
				path: 'equipmentImages/dst/1CDF236',
				specificAbilities: [
					new AbilityCost('Comet', 0x1CCE620, 255, 282,
						'  Execute: 81\n' +
						'  Argument: 282\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 40531\n' +
						'  Flags: Battle, Require, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 300\n' +
						'  Require: 279\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 1\n' +
						'  Reserve: 0'
					),
					new AbilityCost('Duck Flare', 0x1CCF160, 255, 344,
						'  Execute: 81\n' +
						'  Argument: 344\n' +
						'  SubMenu: -1\n' +
						'  CmdIcon: Null\n' +
						'  MessageId: 47397\n' +
						'  Flags: Battle, Drive\n' +
						'  Range: -1.0\n' +
						'  Dir: 0.0\n' +
						'  DirRange: -1.0\n' +
						'  CmdCamera: Null\n' +
						'  Priority: 100\n' +
						'  CmdReceiver: Player\n' +
						'  Time: 300\n' +
						'  Require: 0\n' +
						'  Mark: 0\n' +
						'  CmdAction: Null\n' +
						'  ReactionCount: 0\n' +
						'  DistRange: 0\n' +
						'  Score: 0\n' +
						'  DisableForm: 0\n' +
						'  Group: 1\n' +
						'  Reserve: 0'
					)
				]
			}
		]
	}
]