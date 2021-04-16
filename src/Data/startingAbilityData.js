import { Reward } from './rewardsData'

export class StartingAbility {
	constructor(vanilla, address) {
		this.vanillaReward = { ...vanilla }
		this.replacementReward = { ...vanilla }
		this.vanillaAddress = address
		this.toBeReplaced = false

		this.isReplaced = () => {
			return this.replacementReward.index !== this.vanillaReward.index
		}
		this.copy = () => {
			let ret = this.vanilla()
			ret.replacementReward = { ...this.replacementReward }
			ret.toBeReplaced = this.toBeReplaced
			return ret
		}
		this.vanilla = () => {
			return new StartingAbility(new Reward(this.vanillaReward.reward, this.vanillaReward.index, this.vanillaReward.iconType), this.vanillaAddress)
		}
		this.replace = (newStartingAbilityData) => {
			let ret = this.copy()
			ret.replacementReward = { ...newStartingAbilityData.reward }
			ret.toBeReplaced = false
			return ret
		}
		this.markForReplacement = (toBeReplaced) => {
			let ret = this.copy()
			ret.toBeReplaced = toBeReplaced
			return ret
		}
		this.saveToJSON = () => {
			return this.isReplaced() ? JSON.stringify(this, ['replacementReward', 'reward', 'index', 'iconType', 'vanillaAddress']) + ',' : ''
		}
		this.loadFromJSON = (startingAbilityJSON) => {
			let ret = this.copy()
			ret.replacementReward = { ...startingAbilityJSON.replacementReward }
			ret.toBeReplaced = false
			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ''
			if (this.isReplaced()) {
				ret += 'patch=1,EE,1' + this.vanillaAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
				ret += this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ''
			let address = this.vanillaAddress - 0x1CE5D80
			if (this.isReplaced()) {
				ret += '\tWriteShort(Btl0+0x' + address.toString(16).toUpperCase() + ',0x' + this.replacementReward.index.toString(16).toUpperCase().padStart(4,'0') + ')'
				if (isCommented) ret += ' -- ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
	}
}

export class StartingStatus {
	constructor(character, address, hp, mp, armorSlots, accessorySlots, itemSlots, startingStuff) {
		this.character = character
		this.baseAddress = address
		this.statAddress = 0x10000000 + address + 0x3
		this.slotAddress = 0x20000000 + address + 0x9
		this.stuffAddress = 0x10000000 + address + 0xC
		this.hp = hp
		this.vanillaHp = hp
		this.mp = mp
		this.vanillaMp = mp
		this.armorSlots = armorSlots
		this.vanillaArmorSlots = armorSlots
		this.accessorySlots = accessorySlots
		this.vanillaAccessorySlots = accessorySlots
		this.itemSlots = itemSlots
		this.vanillaItemSlots = itemSlots
		this.startingStuff = []
		this.vanillaStartingStuff = []
		startingStuff.forEach(startingThing => {
			this.startingStuff.push({ ...startingThing })
			this.vanillaStartingStuff.push({ ...startingThing })
		})

		this.isStatsReplaced = () => {
			return this.hp !== this.vanillaHp || this.mp !== this.vanillaMp
		}
		this.isSlotsReplaced = () => {
			return this.armorSlots !== this.vanillaArmorSlots || this.accessorySlots !== this.vanillaAccessorySlots || this.itemSlots !== this.vanillaItemSlots
		}
		this.isStartingStuffReplaced = () => {
			return true
		}
		this.isReplaced = () => {
			return this.isStatsReplaced() || this.isSlotsReplaced() || this.isStartingStuffReplaced()
		}
		this.copy = () => {
			let ret = new StartingStatus(this.baseAddress, this.vanillaHp, this.vanillaMp, this.vanillaArmorSlots, this.vanillaAccessorySlots, this.vanillaItemSlots,
				this.vanillaStartingStuff)
			ret.hp = this.hp
			ret.mp = this.mp
			ret.armorSlots = this.armorSlots
			ret.accessorySlots = this.accessorySlots
			ret.itemSlots = this.itemSlots
			this.startingStuff.forEach((startingThing, index) => { ret.startingStuff[index] = { ...startingThing } })
			return ret
		}
		this.saveToJSON = () => {
			return this.isReplaced() ? JSON.stringify(this, ['character', 'hp', 'mp', 'armorSlots', 'accessorySlots', 'itemSlots', 'startingStuff', 'reward', 'index', 'iconType']) + ',' : ''
		}
		this.loadFromJSON = (startingStatusJSON) => {
			let ret = this.copy()
			ret.hp = startingStatusJSON.hp
			ret.mp = startingStatusJSON.mp
			ret.armorSlots = startingStatusJSON.armorSlots
			ret.accessorySlots = startingStatusJSON.accessorySlots
			ret.itemSlots = startingStatusJSON.itemSlots
			startingStatusJSON.startingStuff.forEach((startingThing, index) => { ret.startingStuff[index] = { ...startingThing } })
			return ret
		}
		this.saveToPnach = () => {
			let ret = ''
			if (this.isReplaced()) {
				if (this.isStatsReplaced()) {
					ret += 'patch=1,EE,' + this.statAddress.toString(16).toUpperCase().padStart(8, '0') + ',extended,0000'
					ret += this.mp.toString(16).toUpperCase().padStart(2, '0') + this.hp.toString(16).toUpperCase().padStart(2, '0')
					ret += '// Starting HP: ' + this.hp + ' Starting MP: ' + this.mp + '\n'
				}
				if (this.isSlotsReplaced()) {
					ret += 'patch=1,EE,' + this.slotAddress.toString(16).toUpperCase().padStart(8, '0') + ',extended,0000'
					ret += this.itemSlots.toString(16).toUpperCase().padStart(2, '0') + this.accessorySlots.toString(16).toUpperCase().padStart(2, '0')
					ret += this.armorSlots.toString(16).toUpperCase().padStart(2, '0') + '// Starting Armor Slots: ' + this.armorSlots + ' Starting Accessory Slots: ' + this.accessorySlots
					ret += ' Starting Item Slots: ' + this.itemSlots + '\n'
				}
				if (this.isStatsReplaced()) {
					let firstAddress = this.stuffAddress
					ret += '// Starting Stuff:\n'
					this.startingStuff.forEach(startingThing => {
						ret += 'patch=1,EE,' + firstAddress.toString(16).toUpperCase().padStart(8, '0') + ',extended,0000'
						ret += startingThing.index.toString(16).toUpperCase().padStart(2, '0') + '// Starting with: ' + startingThing.reward + '\n'
					})
				}
			}
			return ret
		}
	}
}

export const startingAbilityData = [
	{
		character: 'Sora',
		abilities: [
			new StartingAbility(new Reward('Reaction Boost', 0x188, 'Ability'), 0x1D18DDE),
			new StartingAbility(new Reward('Finishing Plus', 0x189, 'Ability'), 0x1D18DDC),
			new StartingAbility(new Reward('Draw', 0x195, 'Ability'), 0x1D18DE8),
			new StartingAbility(new Reward('Lucky Lucky (1)', 0x197, 'Ability'), 0x1D18DE4),
			new StartingAbility(new Reward('Lucky Lucky (2)', 0x197, 'Ability'), 0x1D18DE6),
			new StartingAbility(new Reward('MP Hastera', 0x1A5, 'Ability'), 0x1D18DE0),
			new StartingAbility(new Reward('No Experience', 0x194, 'Ability'), 0x1D18DE2)
		]
	},
	{
		character: 'Donald',
		abilities: [
			new StartingAbility(new Reward('Donald Thunder', 0x0A7, 'Ability'), 0x1D16EE0),
			new StartingAbility(new Reward('Donald Cure', 0x0A8, 'Ability'), 0x1D16EE2)
		]
	},
	{
		character: 'Goofy',
		abilities: [
			new StartingAbility(new Reward('Goofy Bash', 0x1AD, 'Ability'), 0x1D16F62),
			new StartingAbility(new Reward('Item Boost', 0x19B, 'Ability'), 0x1D16F64)
		]
	}
]

export const notUsedStartingStatusData = [
	new StartingStatus('Sora (Non-Critical)', 0x1D16E50, 20, 100, 1, 1, 3, []),
	new StartingStatus('Sora (Critical)', 0x1D18DD0, 20, 100, 1, 1, 3, [
		new Reward('Finishing Plus', 0x189, 'Ability'),
		new Reward('Reaction Boost', 0x188, 'Ability'),
		new Reward('MP Hastera', 0x1A5, 'Ability'),
		new Reward('No Experience', 0x194, 'Ability'),
		new Reward('Lucky Lucky (1)', 0x197, 'Ability'),
		new Reward('Lucky Lucky (2)', 0x197, 'Ability'),
		new Reward('Draw', 0x195, 'Ability')
	]),
	new StartingStatus('Donald', 0x1D16ED0, 18, 100, 1, 2, 2, [
		new Reward('Donald Thunder', 0x0A7, 'Ability'),
		new Reward('Donald Cure', 0x0A8, 'Ability')
	]),
	new StartingStatus('Goofy', 0x1D16F50, 28, 100, 2, 1, 3, [
		new Reward('Goofy Bash', 0x1AD, 'Ability'),
		new Reward('Item Boost', 0x19B, 'Ability')
	]),
]