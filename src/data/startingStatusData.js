import { Reward } from "./rewardsData"

export class StartingStatus {
	constructor(character, difficultyMode, address, hp, mp, ap, armorSlots, accessorySlots, itemSlots, startingStuff) {
		this.character = character
		this.difficultyMode = difficultyMode
		this.baseAddress = address
		// this.statAddress = 0x10000000 + address + 0x3
		// this.slotAddress = 0x20000000 + address + 0x9
		// this.stuffAddress = 0x10000000 + address + 0xC
		this.hp = hp
		this.vanillaHp = hp
		this.mp = mp
		this.vanillaMp = mp
		this.ap = ap
		this.vanillaAp = ap
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
		while (this.startingStuff.length < 32) {
			this.startingStuff.push(new Reward("EMPTY", 0x000, "empty"))
			this.vanillaStartingStuff.push(new Reward("EMPTY", 0x000, "empty"))
		}


		this.getCharacter = () => {
			if (this.character === 1)
				if (this.difficultyMode === 7) return "Sora (Critical Mode)"
				else return "Sora (Base)"
			if (this.character === 2) return "Donald"
			if (this.character === 3) return "Goofy"
			if (this.character === 13) return "Riku"
			if (this.character === 135) return "Sora (Lion)"
		}

		this.isStatsReplaced = () => {
			return this.hp !== this.vanillaHp || this.mp !== this.vanillaMp || this.ap !== this.vanillaAp
		}
		this.isSlotsReplaced = () => {
			return this.armorSlots !== this.vanillaArmorSlots || this.accessorySlots !== this.vanillaAccessorySlots || this.itemSlots !== this.vanillaItemSlots
		}
		this.isStartingStuffReplaced = () => {
			return this.startingStuff.some((startingThing, index) => startingThing.index !== this.vanillaStartingStuff[index].index)
		}
		this.isReplaced = () => {
			return this.isStatsReplaced() || this.isSlotsReplaced() || this.isStartingStuffReplaced()
		}
		this.copy = () => {
			let ret = new StartingStatus(this.character, this.difficultyMode, this.baseAddress, this.vanillaHp, this.vanillaMp, this.vanillaAp,
				this.vanillaArmorSlots, this.vanillaAccessorySlots, this.vanillaItemSlots, this.vanillaStartingStuff)
			ret.hp = this.hp
			ret.mp = this.mp
			ret.ap = this.ap
			ret.armorSlots = this.armorSlots
			ret.accessorySlots = this.accessorySlots
			ret.itemSlots = this.itemSlots
			this.startingStuff.forEach((startingThing, index) => { ret.startingStuff[index] = { ...startingThing } })
			return ret
		}
		this.vanillaStartingStats = () => {
			let ret = new StartingStatus(this.character, this.difficultyMode, this.baseAddress, this.vanillaHp, this.vanillaMp, this.vanillaAp,
				this.vanillaArmorSlots, this.vanillaAccessorySlots, this.vanillaItemSlots, this.vanillaStartingStuff)
			return ret.replaceStartingStuffs(this.startingStuff)
		}
		this.vanillaStartingStuffs = () => {
			let ret = new StartingStatus(this.character, this.difficultyMode, this.baseAddress, this.vanillaHp, this.vanillaMp, this.vanillaAp,
				this.vanillaArmorSlots, this.vanillaAccessorySlots, this.vanillaItemSlots, this.vanillaStartingStuff)
			ret.hp = this.hp
			ret.mp = this.mp
			ret.ap = this.ap
			ret.armorSlots = this.armor
			ret.accessorySlots = this.accessory
			ret.itemSlots = this.item
			return ret
		}
		this.replaceStartingStats = (newStartingStatData) => {
			let ret = this.copy()
			ret.hp = newStartingStatData.currentHP
			ret.mp = newStartingStatData.currentMP
			ret.ap = newStartingStatData.currentAP
			ret.armorSlots = newStartingStatData.currentArmor
			ret.accessorySlots = newStartingStatData.currentAccessory
			ret.itemSlots = newStartingStatData.currentItem
			return ret
		}
		this.replaceStartingStuffs = (newStartingStuff) => {
			let ret = this.copy()
			ret.startingStuff = []

			let filledRewards = newStartingStuff.filter(reward => reward.index !== 0x000)
			let emptyRewards = newStartingStuff.filter(reward => reward.index === 0x000)

			filledRewards.forEach(startingThing => { ret.startingStuff.push({ ...startingThing }) })
			emptyRewards.forEach(startingThing => { ret.startingStuff.push({ ...startingThing }) })
			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ""
			// let baseAddress = this.baseAddress - 0x1CE5D80
			let statAddress = this.baseAddress + 0x3
			let slotAddress = this.baseAddress + 0x9
			let stuffAddress = this.baseAddress + 0xC
			if (this.isReplaced()) {
				if (this.isStatsReplaced()) {
					ret += "patch=1,EE,0" + statAddress.toString(16).toUpperCase().padStart(7, "0") + ",extended,000000"
					ret += this.hp.toString(16).toUpperCase().padStart(2, "0")
					if (isCommented) ret += "// Starting HP: " + this.hp
					ret += "\n"

					ret += "patch=1,EE,1" + (statAddress + 1).toString(16).toUpperCase().padStart(7, "0") + ",extended,0000"
					ret += this.ap.toString(16).toUpperCase().padStart(2, "0")
					ret += this.mp.toString(16).toUpperCase().padStart(2, "0")
					if (isCommented) ret += "// Starting AP: " + this.ap + " Starting MP: " + this.mp + "\n"
				}
				if (this.isSlotsReplaced()) {
					ret += "patch=1,EE,0" + slotAddress.toString(16).toUpperCase().padStart(7, "0") + ",extended,000000"
					ret += this.armorSlots.toString(16).toUpperCase().padStart(2, "0")
					if (isCommented) ret += "// Starting Armor Slots: " + this.armorSlots + "\n"

					ret += "patch=1,EE,1" + (slotAddress + 1).toString(16).toUpperCase().padStart(7, "0") + ",extended,0000"
					ret += this.itemSlots.toString(16).toUpperCase().padStart(2, "0")
					ret += this.accessorySlots.toString(16).toUpperCase().padStart(2, "0")
					if (isCommented) ret += "// Starting Accessory Slots: " + this.accessorySlots + " Starting Item Slots: " + this.itemSlots + "\n"
				}
				if (this.isStartingStuffReplaced()) {
					if (isCommented) ret += "// Starting Stuff:\n"
					this.startingStuff.forEach(startingThing => {
						ret += "patch=1,EE,1" + stuffAddress.toString(16).toUpperCase().padStart(7, "0") + ",extended,0000"
						ret += startingThing.index.toString(16).toUpperCase().padStart(4, "0")
						if (isCommented) ret += "// Starting with: " + startingThing.reward + "\n"
						stuffAddress += 0x2
					})
				}
			}
			return ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ""
			let base = this.baseAddress
			let statAddress = base + 3
			let slotAddress = base + 9
			let stuffAddress = base + 12
			if (this.isReplaced()) {
				if (this.isStatsReplaced()) {
					let stat1Address = statAddress.toString(16).toUpperCase().padStart(4, "0")
					let stats1 = "0x" + this.hp.toString(16).toUpperCase().padStart(2, "0")
					ret += "\tWriteByte(BAR(Btl0, 0xB, " + stat1Address + "), " + stats1 + ", OnPC)"
					if (isCommented) ret += " -- Starting HP: " + this.hp
					ret += "\n"

					let stat2Address = (statAddress + 1).toString(16).toUpperCase().padStart(4, "0")
					let stats2 = "0x" + ((this.ap << 2) + this.mp).toString(16).toUpperCase().padStart(4, "0")
					ret += "\tWriteShort(BAR(Btl0, 0xB, " + stat2Address + "), " + stats2 + ", OnPC)"
					if (isCommented) ret += " -- Starting AP: " + this.ap + " Starting MP: " + this.mp
					ret += "\n"
				}
				if (this.isSlotsReplaced()) {
					let slot1Address = "0x" + slotAddress.toString(16).toUpperCase().padStart(4, "0")
					let slots1 = "0x" + this.armorSlots.toString(16).toUpperCase().padStart(2, "0")
					ret += "\tWriteByte(BAR(Btl0, 0xB, " + slot1Address + "), " + slots1 + ", OnPC)"
					if (isCommented) ret += " -- Starting Armor Slots: " + this.armorSlots
					ret += "\n"

					let slot2Address = "0x" + slotAddress.toString(16).toUpperCase().padStart(4, "0")
					let slots2 = "0x" + ((this.itemSlots << 2) + this.accessorySlots).toString(16).toUpperCase().padStart(4, "0")
					ret += "\tWriteByte(BAR(Btl0, 0xB, " + slot2Address + "), " + slots2 + ", OnPC)"
					if (isCommented) ret += " -- Starting Accessory Slots: " + this.accessorySlots + " Starting Item Slots: " + this.itemSlots
					ret += "\n"
				}
				if (this.isStartingStuffReplaced()) {
					if (isCommented) ret += "-- Starting Stuff:\n"
					this.startingStuff.forEach(startingThing => {
						let rewardString = "0x" + startingThing.index.toString(16).toUpperCase().padStart(4, "0")
						let stuffOffset = "0x" + stuffAddress.toString(16).toUpperCase().padStart(4, "0")
						ret += "\tWriteShort(BAR(Btl0, 0xB, " + stuffOffset + "), " + rewardString + ", OnPC)"
						if (isCommented) ret += "-- Starting with: " + startingThing.reward + "\n"
						stuffAddress += 2
					})
				}
			}
			return ret
		}
		this.saveToYml = (isCommented) => {
			let ret = ""
			if (this.isReplaced()) {
				ret += "- AccessorySlotMax: " + this.accessorySlots + "\n  "
				ret += "Ap: " + this.ap + "\n  "
				ret += "ArmorSlotMax: " + this.armorSlots + "\n  "
				ret += "Character: " + this.character + "\n  "
				ret += "Hp: " + this.hp + "\n  "
				ret += "Id: " + this.difficultyMode + "\n  "
				ret += "ItemSlotMax: " + this.itemSlots + "\n  "
				ret += "Items:"
				for (let i = 0; i < 32; i++)
					ret += "\n  - " + this.startingStuff[i].index
				ret += "\n  "
				ret += "Mp: " + this.mp + "\n  "
				ret += "Padding:"
				for (let i = 0; i < 52; i++)
					ret += "\n  - 0"
				ret += "\n"
			}
			return ret
		}
		this.saveToJSON = () => {
			return this.isReplaced()
				? JSON.stringify(this, ["character", "difficultyMode", "hp", "mp", "armorSlots", "accessorySlots", "itemSlots", "startingStuff", "reward", "index", "iconType"]) + ","
				: ""
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
	}

	static saveToPnach(startingData, isCommented) {
		return ["\n//STARTING STATUS\n"].concat(startingData.map(character => { return character.saveToPnach(isCommented) }))
	}
	static saveToLua(startingData, isCommented) {
		return ["\nfunction StartingStatus()\n"].concat(startingData.map(character => { return character.saveToLua(isCommented) }), ["end\n"])
	}
	static saveToYml(startingData, isCommented) {
		return startingData.reduce((prev, character) => { return prev + character.saveToYml(isCommented) }, "")
	}
	static saveToJSON(startingData) {
		return ["\"startingStatusData\":[", startingData.map(startingStatus => { return startingStatus.saveToJSON() }).join("").slice(0, -1), "],"]
	}
	static loadFromJSON(startingLoadData) {
		return startingStatusData.map(character => {
			let foundCharacter = startingLoadData.find(loadCharacter => loadCharacter.character === character.character && loadCharacter.difficultyMode === character.difficultyMode)
			if (foundCharacter !== undefined)
				return character.loadFromJSON(foundCharacter)
			return character
		})
	}
}

export const startingStatusData = [
	new StartingStatus(1, 0, 0x0008, 20, 100, 2, 1, 1, 3, [
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty")
	]),
	new StartingStatus(1, 7, 0x1F88, 20, 100, 50, 1, 1, 3, [
		new Reward("Finishing Plus", 0x189, "ability"),
		new Reward("Reaction Boost", 0x188, "ability"),
		new Reward("MP Hastera", 0x1A5, "ability"),
		new Reward("No Experience", 0x194, "ability"),
		new Reward("Lucky Lucky", 0x197, "ability"),
		new Reward("Lucky Lucky", 0x197, "ability"),
		new Reward("Draw", 0x195, "ability"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty")
	]),
	new StartingStatus(2, 0, 0x0088, 18, 100, 0, 1, 2, 2, [
		new Reward("Donald Thunder", 0x0A7, "ability"),
		new Reward("Donald Cure", 0x0A8, "ability"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty")
	]),
	new StartingStatus(3, 0, 0x0108, 28, 100, 0, 2, 1, 3, [
		new Reward("Goofy Bash", 0x1AD, "ability"),
		new Reward("Item Boost", 0x19B, "ability"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty"),
		new Reward("EMPTY", 0x000, "empty")
	])
]