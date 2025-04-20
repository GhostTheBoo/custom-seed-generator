import { Reward } from './rewardsData'

export class Chest {
	constructor(room, vanilla, address, zipID) {
		this.room = room
		this.vanillaReward = { ...vanilla }
		this.replacementReward = { ...vanilla }
		this.vanillaAddress = address
		this.zipID = zipID
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
			return new Chest(this.room, new Reward(this.vanillaReward.reward, this.vanillaReward.index, this.vanillaReward.iconType), this.vanillaAddress, this.zipID)
		}
		this.replace = (newChestData) => {
			let ret = this.copy()
			ret.replacementReward = { ...newChestData.reward }
			ret.toBeReplaced = false
			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ""
			if (this.isReplaced()) {
				ret = 'patch=1,EE,1' + this.vanillaAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
				ret += this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // ' + this.room + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ""
			if (this.isReplaced()) {
				let address = "0x" + this.vanillaAddress.toString(16).toUpperCase()
				let reward = "0x" + this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0')
				ret = "\tWriteShort(BAR(Sys3, 0x7, " + address + "), " + reward + ", OnPC)"
				if (isCommented) ret += ' -- ' + this.room + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToYml = (isCommented) => {
			let ret = ""
			if (this.isReplaced()) {
				ret = this.zipID.toString() + ':\n  ItemId: '
				let itemID = this.replacementReward.index
				ret += itemID === 0x000 ? 0x176.toString() : itemID.toString()
				if (isCommented) ret += ' # ' + this.room + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToJSON = () => {
			return this.isReplaced() ? JSON.stringify(this, ['replacementReward', 'reward', 'index', 'iconType', 'vanillaAddress', 'zipID']) + ',' : ""
		}
		this.loadFromJSON = (chestJSON) => {
			let ret = this.copy()
			ret.replacementReward = { ...chestJSON.replacementReward }
			ret.toBeReplaced = false
			return ret
		}
	}

	static saveToPnach(chestData, isCommented) {
		return ['\n//CHESTS\n'].concat(chestData.map(worldList => {
			let ret = isCommented ? '// ' + worldList.world.toUpperCase() + '\n' : ""
			worldList.chests.forEach(chest => { ret += chest.saveToPnach(isCommented) })
			return ret
		}))
	}
	static saveToLua(chestData, isCommented) {
		return ['\nfunction Chests()\n'].concat(chestData.map(worldList => {
			let ret = isCommented ? '\t-- ' + worldList.world.toUpperCase() + '\n' : ""
			worldList.chests.forEach(chest => { ret += chest.saveToLua(isCommented) })
			return ret
		}), ['end\n'])
	}
	static saveToYml(chestData, isCommented) {
		return chestData.reduce((prev, worldList) => {
			if (worldList.chests.find(chest => chest.isReplaced())) {
				prev += isCommented ? '# ' + worldList.world + '\n' : ""
				worldList.chests.forEach(chest => { prev += chest.saveToYml(isCommented) })
			}
			return prev
		}, "")
	}
	static saveToJSON(chestData) {
		let chestSaveData = chestData.map(world => {
			let ret = ""
			world.chests.forEach(chest => { ret += chest.saveToJSON() })
			return ret === "" ? ret : '{"world":"' + world.world + '","chests":[' + ret.slice(0, -1) + ']}'
		})
		return ['"chestsData":[', chestSaveData.filter(s => s !== "").join(), '],']
	}
	static loadFromJSON(chestLoadData) {
		return chestsData.map(world => {
			let foundWorld = chestLoadData.find(loadWorld => loadWorld.world === world.world)
			if (foundWorld !== undefined) {
				let newChests = world.chests.map(chest => {
					let foundChest = foundWorld.chests.find(loadChest => loadChest.zipID === chest.zipID)
					if (foundChest !== undefined)
						return chest.loadFromJSON(foundChest)
					return chest
				})
				return {
					...world,
					chests: newChests
				}
			}
			return world
		})
	}
}

export const chestsData = [
	{
		world: "Agrabah",
		chests: [
			new Chest("Agrabah", new Reward("Dark Shard", 0x118, "synthesis"), 0x102, 28),
			new Chest("Agrabah", new Reward("Mythril Shard", 0x159, "synthesis"), 0x10E, 29),
			new Chest("Agrabah", new Reward("Hi-Potion", 0x002, "consumable"), 0x11A, 30),
			new Chest("Agrabah", new Reward("AP Boost", 0x117, "tent"), 0x126, 132),
			new Chest("Agrabah", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x132, 133),
			new Chest("Agrabah", new Reward("Mythril Shard", 0x159, "synthesis"), 0x13E, 249),
			new Chest("Agrabah", new Reward("Serenity Shard", 0x165, "synthesis"), 0x14A, 501),
			new Chest("Bazaar", new Reward("Mythril Gem", 0x15B, "synthesis"), 0x156, 31),
			new Chest("Bazaar", new Reward("Power Shard", 0x149, "synthesis"), 0x162, 32),
			new Chest("Bazaar", new Reward("Hi-Potion", 0x002, "consumable"), 0x16E, 33),
			new Chest("Bazaar", new Reward("AP Boost", 0x117, "tent"), 0x17A, 134),
			new Chest("Bazaar", new Reward("Mythril Shard", 0x159, "synthesis"), 0x186, 135),
			new Chest("Palace Walls", new Reward("Skill Ring", 0x026, "accessory"), 0x192, 136),
			new Chest("Palace Walls", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x19E, 520),
			new Chest("The Cave of Wonders Entrance", new Reward("Power Stone", 0x14A, "synthesis"), 0x1AA, 250),
			new Chest("The Cave of Wonders Entrance", new Reward("Mythril Shard", 0x159, "synthesis"), 0x1B6, 251),
			new Chest("Valley of Stone", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x1C2, 35),
			new Chest("Valley of Stone", new Reward("AP Boost", 0x117, "tent"), 0x1CE, 36),
			new Chest("Valley of Stone", new Reward("Mythril Shard", 0x159, "synthesis"), 0x1DA, 137),
			new Chest("Valley of Stone", new Reward("Hi-Potion", 0x002, "consumable"), 0x1E6, 138),
			new Chest("Chasm of Challenges", new Reward("Cave of Wonders Map", 0x079, "map"), 0x1F2, 487),
			new Chest("Chasm of Challenges", new Reward("AP Boost", 0x117, "tent"), 0x1FE, 37),
			new Chest("Treasure Room", new Reward("AP Boost", 0x117, "tent"), 0x20A, 502),
			new Chest("Treasure Room", new Reward("Serenity Gem", 0x167, "synthesis"), 0x216, 503),
			new Chest("Ruined Chamber", new Reward("Torn Pages", 0x020, "pages"), 0x222, 34),
			new Chest("Ruined Chamber", new Reward("Ruins Map", 0x07A, "map"), 0x22E, 486)
		]
	},
	{
		world: "Beast's Castle",
		chests: [
			new Chest("Courtyard", new Reward("AP Boost", 0x117, "tent"), 0x4CE, 39),
			new Chest("Courtyard", new Reward("Hi-Potion", 0x002, "consumable"), 0x4DA, 40),
			new Chest("Courtyard", new Reward("Mythril Shard", 0x159, "synthesis"), 0x4E6, 505),
			new Chest("Belle's Room", new Reward("Castle Map", 0x05A, "map"), 0x4F2, 46),
			new Chest("Belle's Room", new Reward("Mega Recipe", 0x17E, "recipe"), 0x4FE, 240),
			new Chest("The East Wing", new Reward("Mythril Shard", 0x159, "synthesis"), 0x50A, 63),
			new Chest("The East Wing", new Reward("Tent", 0x083, "tent"), 0x516, 155),
			new Chest("The West Hall", new Reward("Hi-Potion", 0x002, "consumable"), 0x522, 41),
			new Chest("The West Hall", new Reward("Mythril Shard", 0x159, "synthesis"), 0x52E, 206),
			new Chest("The West Hall", new Reward("Power Shard", 0x149, "synthesis"), 0x53A, 207),
			new Chest("The West Hall", new Reward("Mythril Shard", 0x159, "synthesis"), 0x546, 208),
			new Chest("The West Hall", new Reward("AP Boost", 0x117, "tent"), 0x552, 158),
			new Chest("The West Hall", new Reward("Bright Stone", 0x15E, "synthesis"), 0x55E, 159),
			new Chest("Dungeon", new Reward("Basement Map", 0x05B, "map"), 0x56A, 239),
			new Chest("Dungeon", new Reward("AP Boost", 0x117, "tent"), 0x576, 43),
			new Chest("Secret Passage", new Reward("Mythril Shard", 0x159, "synthesis"), 0x582, 44),
			new Chest("Secret Passage", new Reward("Hi-Potion", 0x002, "consumable"), 0x58E, 168),
			new Chest("Secret Passage", new Reward("Lucid Shard", 0x14D, "synthesis"), 0x59A, 45),
			new Chest("The West Wing", new Reward("Mythril Shard", 0x159, "synthesis"), 0x5A6, 42),
			new Chest("The West Wing", new Reward("Tent", 0x083, "tent"), 0x5B2, 164),
			new Chest("The Beast's Room", new Reward("Blazing Shard", 0x13D, "synthesis"), 0x5BE, 241)
		]
	},
	{
		world: "Cavern of Remembrance",
		chests: [
			new Chest("Depths", new Reward("AP Boost", 0x117, "tent"), 0xDC2, 562),
			new Chest("Depths", new Reward("Power Crystal", 0x14C, "synthesis"), 0xDCE, 563),
			new Chest("Depths", new Reward("Frost Crystal", 0x17D, "synthesis"), 0xDDA, 564),
			new Chest("Depths", new Reward("Manifest Illusion", 0x249, "synthesis"), 0xDE6, 565),
			new Chest("Depths", new Reward("AP Boost", 0x117, "tent"), 0xDF2, 566),
			new Chest("Depths Upper Level", new Reward("Remembrance Gem", 0x242, "synthesis"), 0xDFE, 567),
			new Chest("Mining Area", new Reward("Serenity Gem", 0x167, "synthesis"), 0xE0A, 568),
			new Chest("Mining Area", new Reward("AP Boost", 0x117, "tent"), 0xE16, 569),
			new Chest("Mining Area", new Reward("Serenity Crystal", 0x168, "synthesis"), 0xE22, 570),
			new Chest("Mining Area", new Reward("Manifest Illusion", 0x249, "synthesis"), 0xE2E, 571),
			new Chest("Mining Area", new Reward("Serenity Gem", 0x167, "synthesis"), 0xE3A, 572),
			new Chest("Mining Area", new Reward("Dark Remembrance Map", 0x24A, "map"), 0xE46, 573),
			new Chest("Engine Chamber", new Reward("Serenity Crystal", 0x168, "synthesis"), 0xE52, 574),
			new Chest("Engine Chamber", new Reward("Remembrance Crystal", 0x243, "synthesis"), 0xE5E, 575),
			new Chest("Engine Chamber", new Reward("AP Boost", 0x117, "tent"), 0xE6A, 576),
			new Chest("Engine Chamber", new Reward("Manifest Illusion", 0x249, "synthesis"), 0xE76, 577),
			new Chest("Mineshaft Lower Level", new Reward("AP Boost", 0x117, "tent"), 0xE82, 578),
			new Chest("Mineshaft Lower Level", new Reward("Depths of Remembrance Map", 0x24E, "map"), 0xE9A, 580),
			new Chest("Mineshaft Mid Level", new Reward("Power Boost", 0x114, "tent"), 0xEA6, 581),
			new Chest("Mineshaft Upper Level", new Reward("AP Boost", 0x117, "tent"), 0xE8E, 579),
			new Chest("Mineshaft Upper Level", new Reward("Magic Boost", 0x115, "tent"), 0xEB2, 582),
			new Chest("Garden of Assemblage", new Reward("Garden of Assemblage Map", 0x250, "map"), 0xEBE, 585),
			new Chest("Garden of Assemblage", new Reward("Lost Illusion", 0x248, "synthesis"), 0xECA, 586),
			new Chest("Garden of Assemblage", new Reward("Proof of Nonexistence", 0x252, "nonexistence"), 0xED6, 590)
		]
	},
	{
		world: "Disney Castle",
		chests: [
			new Chest("Courtyard", new Reward("Mythril Shard", 0x159, "synthesis"), 0x28E, 16),
			new Chest("Courtyard", new Reward("Star Recipe", 0x1C1, "recipe"), 0x29A, 17),
			new Chest("Courtyard", new Reward("AP Boost", 0x117, "tent"), 0x2A6, 18),
			new Chest("Courtyard", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x2B2, 92),
			new Chest("Courtyard", new Reward("Blazing Stone", 0x13E, "synthesis"), 0x2BE, 93),
			new Chest("Courtyard", new Reward("Blazing Shard", 0x13D, "synthesis"), 0x2CA, 247),
			new Chest("Courtyard", new Reward("Mythril Shard", 0x159, "synthesis"), 0x2D6, 248),
			new Chest("Library", new Reward("Torn Pages", 0x020, "pages"), 0x2E2, 91)
		]
	},
	{
		world: "Halloween Town",
		chests: [
			new Chest("Graveyard", new Reward("Mythril Shard", 0x159, "synthesis"), 0x672, 53),
			new Chest("Graveyard", new Reward("Serenity Gem", 0x167, "synthesis"), 0x67E, 212),
			new Chest("Dr. Finklestein's Lab", new Reward("Halloween Town Map", 0x0FA, "map"), 0x68A, 211),
			new Chest("Halloween Town Square", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x696, 209),
			new Chest("Halloween Town Square", new Reward("Energy Shard", 0x161, "synthesis"), 0x6A2, 210),
			new Chest("Hinterlands", new Reward("Lightning Shard", 0x145, "synthesis"), 0x6AE, 54),
			new Chest("Hinterlands", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x6BA, 213),
			new Chest("Hinterlands", new Reward("AP Boost", 0x117, "tent"), 0x6C6, 214),
			new Chest("Candy Cane Lane", new Reward("Mega Potion", 0x005, "consumable"), 0x6D2, 55),
			new Chest("Candy Cane Lane", new Reward("Mythril Gem", 0x15B, "synthesis"), 0x6DE, 56),
			new Chest("Candy Cane Lane", new Reward("Lightning Stone", 0x146, "synthesis"), 0x6EA, 216),
			new Chest("Candy Cane Lane", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x6F6, 217),
			new Chest("Santa's House", new Reward("Christmas Town Map", 0x1FD, "map"), 0x702, 57),
			new Chest("Santa's House", new Reward("AP Boost", 0x117, "tent"), 0x70E, 58)
		]
	},
	{
		world: "Hollow Bastion",
		chests: [
			new Chest("Borough", new Reward("Drive Recovery", 0x112, "tent"), 0x816, 194),
			new Chest("Borough", new Reward("AP Boost", 0x117, "tent"), 0x822, 195),
			new Chest("Borough", new Reward("Hi-Potion", 0x002, "consumable"), 0x82E, 196),
			new Chest("Borough", new Reward("Mythril Shard", 0x159, "synthesis"), 0x83A, 305),
			new Chest("Borough", new Reward("Dark Shard", 0x118, "synthesis"), 0x846, 506),
			new Chest("Postern", new Reward("Castle Perimeter Map", 0x201, "map"), 0x852, 310),
			new Chest("Postern", new Reward("Mythril Gem", 0x15B, "synthesis"), 0x85E, 189),
			new Chest("Postern", new Reward("AP Boost", 0x117, "tent"), 0x86A, 190),
			new Chest("Corridors", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x876, 200),
			new Chest("Corridors", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0x882, 201),
			new Chest("Corridors", new Reward("Dark Crystal", 0x11B, "synthesis"), 0x88E, 202),
			new Chest("Corridors", new Reward("AP Boost", 0x117, "tent"), 0x89A, 307),
			new Chest("Ansem's Study", new Reward("Skill Recipe", 0x1C3, "recipe"), 0x8A6, 184),
			new Chest("Ansem's Study", new Reward("Ukulele Charm", 0x019, "charm"), 0x8B2, 183),
			new Chest("Restoration Site", new Reward("Moon Recipe", 0x1DC, "recipe"), 0x8BE, 309),
			new Chest("Restoration Site", new Reward("AP Boost", 0x117, "tent"), 0x8CA, 507),
			new Chest("Crystal Fissure", new Reward("Torn Pages", 0x020, "pages"), 0x8D6, 179),
			new Chest("Crystal Fissure", new Reward("The Great Maw Map", 0x202, "map"), 0x8E2, 489),
			new Chest("Crystal Fissure", new Reward("Energy Crystal", 0x164, "synthesis"), 0x8EE, 180),
			new Chest("Crystal Fissure", new Reward("AP Boost", 0x117, "tent"), 0x8FA, 181),
			new Chest("Postern", new Reward("Gull Wing", 0x1E9, "keyblade"), 0x906, 491),
			new Chest("Heartless Manufactory", new Reward("Cosmic Chain", 0x134, "accessory"), 0x912, 311)
		]
	},
	{
		world: "Land of Dragons",
		chests: [
			new Chest("Bamboo Grove", new Reward("Dark Shard", 0x118, "synthesis"), 0x006, 245),
			new Chest("Bamboo Grove", new Reward("Ether", 0x003, "consumable"), 0x012, 497),
			new Chest("Bamboo Grove", new Reward("Mythril Shard", 0x159, "synthesis"), 0x01E, 498),
			new Chest("Checkpoint", new Reward("Hi-Potion", 0x002, "consumable"), 0x02A, 21),
			new Chest("Checkpoint", new Reward("Mythril Shard", 0x159, "synthesis"), 0x036, 121),
			new Chest("Mountain Trail", new Reward("Lightning Shard", 0x145, "synthesis"), 0x042, 22),
			new Chest("Mountain Trail", new Reward("Recovery Recipe", 0x1C2, "recipe"), 0x04E, 23),
			new Chest("Mountain Trail", new Reward("Ether", 0x003, "consumable"), 0x05A, 122),
			new Chest("Mountain Trail", new Reward("Mythril Shard", 0x159, "synthesis"), 0x066, 123),
			new Chest("Village Cave", new Reward("AP Boost", 0x117, "tent"), 0x072, 124),
			new Chest("Village Cave", new Reward("Dark Shard", 0x118, "synthesis"), 0x07E, 125),
			new Chest("Ridge", new Reward("Frost Shard", 0x17A, "synthesis"), 0x08A, 24),
			new Chest("Ridge", new Reward("AP Boost", 0x117, "tent"), 0x096, 126),
			new Chest("Throne Room", new Reward("Torn Pages", 0x020, "pages"), 0x0A2, 25),
			new Chest("Throne Room", new Reward("Palace Map", 0x082, "map"), 0x0AE, 127),
			new Chest("Throne Room", new Reward("AP Boost", 0x117, "tent"), 0x0BA, 26),
			new Chest("Throne Room", new Reward("Queen Recipe", 0x1DD, "recipe"), 0x0C6, 27),
			new Chest("Throne Room", new Reward("AP Boost", 0x117, "tent"), 0x0D2, 128),
			new Chest("Throne Room", new Reward("Ogre Shield", 0x08D, "goofy"), 0x0DE, 129),
			new Chest("Throne Room", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0x0EA, 130),
			new Chest("Throne Room", new Reward("Orichalcum", 0x179, "synthesis"), 0x0F6, 131)
		]
	},
	{
		world: "Olympus Coliseum",
		chests: [
			new Chest("Underworld Entrance", new Reward("Power Boost", 0x114, "tent"), 0x3DE, 242),
			new Chest("Passage", new Reward("Mythril Shard", 0x159, "synthesis"), 0x3EA, 7),
			new Chest("Passage", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x3F6, 8),
			new Chest("Passage", new Reward("Ether", 0x003, "consumable"), 0x402, 144),
			new Chest("Passage", new Reward("AP Boost", 0x117, "tent"), 0x40E, 145),
			new Chest("Passage", new Reward("Hi-Potion", 0x002, "consumable"), 0x41A, 146),
			new Chest("Inner Chamber", new Reward("Underworld Map", 0x087, "map"), 0x426, 2),
			new Chest("Inner Chamber", new Reward("Mythril Shard", 0x159, "synthesis"), 0x432, 243),
			new Chest("Caverns Entrance", new Reward("Lucid Shard", 0x14D, "synthesis"), 0x43E, 3),
			new Chest("Caverns Entrance", new Reward("AP Boost", 0x117, "tent"), 0x44A, 11),
			new Chest("Caverns Entrance", new Reward("Mythril Shard", 0x159, "synthesis"), 0x456, 504),
			new Chest("The Lost Road", new Reward("Bright Shard", 0x15D, "synthesis"), 0x462, 9),
			new Chest("The Lost Road", new Reward("Ether", 0x003, "consumable"), 0x46E, 10),
			new Chest("The Lost Road", new Reward("Mythril Shard", 0x159, "synthesis"), 0x47A, 148),
			new Chest("The Lost Road", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x486, 149),
			new Chest("Atrium", new Reward("Lucid Stone", 0x14E, "synthesis"), 0x492, 150),
			new Chest("Atrium", new Reward("AP Boost", 0x117, "tent"), 0x49E, 151),
			new Chest("The Lock", new Reward("Caverns Map", 0x088, "map"), 0x4AA, 244),
			new Chest("The Lock", new Reward("Mythril Shard", 0x159, "synthesis"), 0x4B6, 5),
			new Chest("The Lock", new Reward("AP Boost", 0x117, "tent"), 0x4C2, 142)
		]
	},
	{
		world: "100 Acre Wood",
		chests: [
			new Chest("Pooh Bear's House", new Reward("Hundred Acre Wood Map", 0x07D, "map"), 0x2EE, 313),
			new Chest("Pooh Bear's House", new Reward("AP Boost", 0x117, "tent"), 0x2FA, 97),
			new Chest("Pooh Bear's House", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x306, 98),
			new Chest("Piglet's House", new Reward("Defense Boost", 0x116, "tent"), 0x312, 105),
			new Chest("Piglet's House", new Reward("AP Boost", 0x117, "tent"), 0x31E, 103),
			new Chest("Piglet's House", new Reward("Mythril Gem", 0x15B, "synthesis"), 0x32A, 104),
			new Chest("Rabbit's House", new Reward("Draw Ring", 0x041, "accessory"), 0x336, 314),
			new Chest("Rabbit's House", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0x342, 100),
			new Chest("Rabbit's House", new Reward("AP Boost", 0x117, "tent"), 0x34E, 101),
			new Chest("Kanga's House", new Reward("Magic Boost", 0x115, "tent"), 0x35A, 108),
			new Chest("Kanga's House", new Reward("AP Boost", 0x117, "tent"), 0x366, 106),
			new Chest("Kanga's House", new Reward("Orichalcum", 0x179, "synthesis"), 0x372, 107),
			new Chest("The Spooky Cave", new Reward("Mythril Gem", 0x15B, "synthesis"), 0x37E, 110),
			new Chest("The Spooky Cave", new Reward("AP Boost", 0x117, "tent"), 0x38A, 111),
			new Chest("The Spooky Cave", new Reward("Orichalcum", 0x179, "synthesis"), 0x396, 112),
			new Chest("The Spooky Cave", new Reward("Guard Recipe", 0x1C4, "recipe"), 0x3A2, 113),
			new Chest("The Spooky Cave", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0x3AE, 115),
			new Chest("The Spooky Cave", new Reward("AP Boost", 0x117, "tent"), 0x3BA, 116),
			new Chest("Starry Hill", new Reward("Cosmic Ring", 0x034, "accessory"), 0x3C6, 312),
			new Chest("Starry Hill", new Reward("Style Recipe", 0x1DB, "recipe"), 0x3D2, 94)
		]
	},
	{
		world: "Port Royal",
		chests: [
			new Chest("Rampart", new Reward("Naval Map", 0x0FB, "map"), 0x71A, 70),
			new Chest("Rampart", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x726, 219),
			new Chest("Rampart", new Reward("Dark Shard", 0x118, "synthesis"), 0x732, 220),
			new Chest("Town", new Reward("Dark Stone", 0x119, "synthesis"), 0x73E, 71),
			new Chest("Town", new Reward("AP Boost", 0x117, "tent"), 0x74A, 72),
			new Chest("Town", new Reward("Mythril Shard", 0x159, "synthesis"), 0x756, 73),
			new Chest("Town", new Reward("Mythril Gem", 0x15B, "synthesis"), 0x762, 221),
			new Chest("Cave Mouth", new Reward("Bright Shard", 0x15D, "synthesis"), 0x76E, 74),
			new Chest("Cave Mouth", new Reward("Mythril Shard", 0x159, "synthesis"), 0x77A, 223),
			new Chest("Powder Store", new Reward("AP Boost", 0x117, "tent"), 0x786, 369),
			new Chest("Powder Store", new Reward("AP Boost", 0x117, "tent"), 0x792, 370),
			new Chest("Moonlight Nook", new Reward("Mythril Shard", 0x159, "synthesis"), 0x79E, 75),
			new Chest("Moonlight Nook", new Reward("Serenity Gem", 0x167, "synthesis"), 0x7AA, 224),
			new Chest("Moonlight Nook", new Reward("Power Stone", 0x14A, "synthesis"), 0x7B6, 371),
			new Chest("The Interceptor's Hold", new Reward("Feather Charm", 0x0A0, "charm"), 0x7C2, 252),
			new Chest("Seadrift Keep", new Reward("AP Boost", 0x117, "tent"), 0x7CE, 76),
			new Chest("Seadrift Keep", new Reward("Orichalcum", 0x179, "synthesis"), 0x7DA, 225),
			new Chest("Seadrift Keep", new Reward("Meteor Staff", 0x096, "donald"), 0x7E6, 372),
			new Chest("Seadrift Row", new Reward("Serenity Gem", 0x167, "synthesis"), 0x7F2, 77),
			new Chest("Seadrift Row", new Reward("King Recipe", 0x1DE, "recipe"), 0x7FE, 78),
			new Chest("Seadrift Row", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0x80A, 373)
		]
	},
	{
		world: "Pride Lands",
		chests: [
			new Chest("Gorge", new Reward("Savannah Map", 0x200, "map"), 0x91E, 492),
			new Chest("Gorge", new Reward("Dark Gem", 0x11A, "synthesis"), 0x92A, 404),
			new Chest("Gorge", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x936, 405),
			new Chest("Elephant Graveyard", new Reward("Frost Gem", 0x17C, "synthesis"), 0x942, 401),
			new Chest("Elephant Graveyard", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x94E, 402),
			new Chest("Elephant Graveyard", new Reward("Bright Stone", 0x15E, "synthesis"), 0x95A, 403),
			new Chest("Elephant Graveyard", new Reward("AP Boost", 0x117, "tent"), 0x966, 508),
			new Chest("Elephant Graveyard", new Reward("Mythril Shard", 0x159, "synthesis"), 0x972, 509),
			new Chest("Pride Rock", new Reward("Pride Rock Map", 0x0FC, "map"), 0x97E, 418),
			new Chest("Pride Rock", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x98A, 392),
			new Chest("Pride Rock", new Reward("Serenity Crystal", 0x168, "synthesis"), 0x996, 393),
			new Chest("Wildebeest Valley", new Reward("Energy Stone", 0x162, "synthesis"), 0x9A2, 396),
			new Chest("Wildebeest Valley", new Reward("AP Boost", 0x117, "tent"), 0x9AE, 397),
			new Chest("Wildebeest Valley", new Reward("Mythril Gem", 0x15B, "synthesis"), 0x9BA, 398),
			new Chest("Wildebeest Valley", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x9C6, 399),
			new Chest("Wildebeest Valley", new Reward("Lucid Gem", 0x14F, "synthesis"), 0x9D2, 400),
			new Chest("Wastelands", new Reward("Mythril Shard", 0x159, "synthesis"), 0x9DE, 406),
			new Chest("Wastelands", new Reward("Serenity Gem", 0x167, "synthesis"), 0x9EA, 407),
			new Chest("Wastelands", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x9F6, 408),
			new Chest("Jungle", new Reward("Serenity Gem", 0x167, "synthesis"), 0xA02, 409),
			new Chest("Jungle", new Reward("Mythril Stone", 0x15A, "synthesis"), 0xA0E, 410),
			new Chest("Jungle", new Reward("Serenity Crystal", 0x168, "synthesis"), 0xA1A, 411),
			new Chest("Oasis", new Reward("Oasis Map", 0x1FF, "map"), 0xA26, 412),
			new Chest("Oasis", new Reward("Torn Pages", 0x020, "pages"), 0xA32, 493),
			new Chest("Oasis", new Reward("AP Boost", 0x117, "tent"), 0xA3E, 413)
		]
	},
	{
		world: "Simulated Twilight Town",
		chests: [
			new Chest("Station of Serenity", new Reward("Potion", 0x001, "consumable"), 0xA4A, 315),
			new Chest("Station of Calling", new Reward("Potion", 0x001, "consumable"), 0xA56, 472),
			new Chest("Central Station", new Reward("Potion", 0x001, "consumable"), 0xA62, 428),
			new Chest("Central Station", new Reward("Hi-Potion", 0x002, "consumable"), 0xA6E, 429),
			new Chest("Central Station", new Reward("Potion", 0x001, "consumable"), 0xA7A, 430),
			new Chest("Sunset Terrace", new Reward("Ability Ring", 0x008, "accessory"), 0xA86, 434),
			new Chest("Sunset Terrace", new Reward("Hi-Potion", 0x002, "consumable"), 0xA92, 435),
			new Chest("Sunset Terrace", new Reward("Potion", 0x001, "consumable"), 0xA9E, 436),
			new Chest("Sunset Terrace", new Reward("Potion", 0x001, "consumable"), 0xAAA, 437),
			new Chest("Mansion Foyer", new Reward("Hi-Potion", 0x002, "consumable"), 0xAB6, 449),
			new Chest("Mansion Foyer", new Reward("Potion", 0x001, "consumable"), 0xAC2, 450),
			new Chest("Mansion Foyer", new Reward("Potion", 0x001, "consumable"), 0xACE, 451),
			new Chest("Mansion Dining Room", new Reward("Elven Bandana", 0x043, "armor"), 0xADA, 455),
			new Chest("Mansion Dining Room", new Reward("Potion", 0x001, "consumable"), 0xAE6, 456),
			new Chest("Mansion Library", new Reward("Hi-Potion", 0x002, "consumable"), 0xAF2, 459),
			new Chest("Mansion Basement Corridor", new Reward("Hi-Potion", 0x002, "consumable"), 0xAFE, 463)
		]
	},
	{
		world: "Space Paranoids",
		chests: [
			new Chest("Pit Cell", new Reward("Pit Cell Area Map", 0x0FE, "map"), 0x5CA, 316),
			new Chest("Pit Cell", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0x5D6, 64),
			new Chest("Canyon", new Reward("Dark Crystal", 0x11B, "synthesis"), 0x5E2, 65),
			new Chest("Canyon", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x5EE, 171),
			new Chest("Canyon", new Reward("Mythril Gem", 0x15B, "synthesis"), 0x5FA, 253),
			new Chest("Canyon", new Reward("Frost Crystal", 0x17D, "synthesis"), 0x606, 521),
			new Chest("Hallway", new Reward("Power Crystal", 0x14C, "synthesis"), 0x612, 49),
			new Chest("Hallway", new Reward("AP Boost", 0x117, "tent"), 0x61E, 50),
			new Chest("Communications Room", new Reward("I/O Tower Map", 0x203, "map"), 0x62A, 255),
			new Chest("Communications Room", new Reward("Gaia Belt", 0x04F, "armor"), 0x636, 499),
			new Chest("Central Computer Core", new Reward("AP Boost", 0x117, "tent"), 0x642, 177),
			new Chest("Central Computer Core", new Reward("Orichalcum+", 0x169, "synthesis"), 0x64E, 178),
			new Chest("Central Computer Core", new Reward("Cosmic Arts", 0x038, "accessory"), 0x65A, 51),
			new Chest("Central Computer Core", new Reward("Central Computer Core Map", 0x204, "map"), 0x666, 488)
		]
	},
	{
		world: "Timeless River",
		chests: [
			new Chest("Cornerstone Hill", new Reward("Cornerstone Hill Map", 0x072, "map"), 0x23A, 79),
			new Chest("Cornerstone Hill", new Reward("Frost Shard", 0x17A, "synthesis"), 0x246, 12),
			new Chest("Pier", new Reward("Mythril Shard", 0x159, "synthesis"), 0x252, 81),
			new Chest("Pier", new Reward("Hi-Potion", 0x002, "consumable"), 0x25E, 82),
			new Chest("Waterway", new Reward("Mythril Stone", 0x15A, "synthesis"), 0x26A, 83),
			new Chest("Waterway", new Reward("AP Boost", 0x117, "tent"), 0x276, 84),
			new Chest("Waterway", new Reward("Frost Stone", 0x17B, "synthesis"), 0x282, 85)
		]
	},
	{
		world: "Twilight Town",
		chests: [
			new Chest("The Old Mansion", new Reward("Potion", 0x001, "consumable"), 0xB0A, 447),
			new Chest("The Old Mansion", new Reward("Mythril Shard", 0x159, "synthesis"), 0xB16, 448),
			new Chest("The Woods", new Reward("Potion", 0x001, "consumable"), 0xB22, 442),
			new Chest("The Woods", new Reward("Mythril Shard", 0x159, "synthesis"), 0xB2E, 443),
			new Chest("The Woods", new Reward("Hi-Potion", 0x002, "consumable"), 0xB3A, 444),
			new Chest("Tram Common", new Reward("Hi-Potion", 0x002, "consumable"), 0xB46, 420),
			new Chest("Tram Common", new Reward("AP Boost", 0x117, "tent"), 0xB52, 421),
			new Chest("Tram Common", new Reward("Tent", 0x083, "tent"), 0xB5E, 422),
			new Chest("Tram Common", new Reward("Mythril Shard", 0x159, "synthesis"), 0xB6A, 423),
			new Chest("Tram Common", new Reward("Potion", 0x001, "consumable"), 0xB76, 424),
			new Chest("Tram Common", new Reward("Mythril Shard", 0x159, "synthesis"), 0xB82, 425),
			new Chest("Tram Common", new Reward("Potion", 0x001, "consumable"), 0xB8E, 484),
			new Chest("Central Station", new Reward("Tent", 0x083, "tent"), 0xB9A, 431),
			new Chest("Central Station", new Reward("Hi-Potion", 0x002, "consumable"), 0xBA6, 432),
			new Chest("Central Station", new Reward("Mythril Shard", 0x159, "synthesis"), 0xBB2, 433),
			new Chest("The Tower", new Reward("Potion", 0x001, "consumable"), 0xBBE, 465),
			new Chest("The Tower", new Reward("Hi-Potion", 0x002, "consumable"), 0xBCA, 466),
			new Chest("The Tower", new Reward("Ether", 0x003, "consumable"), 0xBD6, 522),
			new Chest("Tower Entryway", new Reward("Ether", 0x003, "consumable"), 0xBE2, 467),
			new Chest("Tower Entryway", new Reward("Mythril Shard", 0x159, "synthesis"), 0xBEE, 468),
			new Chest("Sorcerer's Loft", new Reward("Tower Map", 0x215, "map"), 0xBFA, 469),
			new Chest("Tower Wardrobe", new Reward("Mythril Stone", 0x15A, "synthesis"), 0xC06, 470),
			new Chest("Underground Concourse", new Reward("Mythril Gem", 0x15B, "synthesis"), 0xC12, 479),
			new Chest("Underground Concourse", new Reward("Orichalcum", 0x179, "synthesis"), 0xC1E, 480),
			new Chest("Underground Concourse", new Reward("AP Boost", 0x117, "tent"), 0xC2A, 481),
			new Chest("Underground Concourse", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0xC36, 482),
			new Chest("Tunnelway", new Reward("Orichalcum", 0x179, "synthesis"), 0xC42, 477),
			new Chest("Tunnelway", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0xC4E, 478),
			new Chest("Sunset Terrace", new Reward("Orichalcum+", 0x169, "synthesis"), 0xC5A, 438),
			new Chest("Sunset Terrace", new Reward("Mythril Shard", 0x159, "synthesis"), 0xC66, 439),
			new Chest("Sunset Terrace", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0xC72, 440),
			new Chest("Sunset Terrace", new Reward("AP Boost", 0x117, "tent"), 0xC7E, 441),
			new Chest("Mansion Foyer", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0xC8A, 452),
			new Chest("Mansion Foyer", new Reward("Mythril Stone", 0x15A, "synthesis"), 0xC96, 453),
			new Chest("Mansion Foyer", new Reward("Serenity Crystal", 0x168, "synthesis"), 0xCA2, 454),
			new Chest("Mansion Dining Room", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0xCAE, 457),
			new Chest("Mansion Dining Room", new Reward("Mythril Stone", 0x15A, "synthesis"), 0xCBA, 458),
			new Chest("Mansion Library", new Reward("Orichalcum", 0x179, "synthesis"), 0xCC6, 460),
			new Chest("Mansion Basement Corridor", new Reward("Ultimate Recipe", 0x1DF, "recipe"), 0xCD2, 464)
		]
	},
	{
		world: "The World That Never Was",
		chests: [
			new Chest("Fragment Crossing", new Reward("Mythril Stone", 0x15A, "synthesis"), 0xCDE, 374),
			new Chest("Fragment Crossing", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0xCEA, 375),
			new Chest("Fragment Crossing", new Reward("AP Boost", 0x117, "tent"), 0xCF6, 376),
			new Chest("Fragment Crossing", new Reward("Orichalcum", 0x179, "synthesis"), 0xD02, 377),
			new Chest("Memory's Skyscraper", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0xD0E, 391),
			new Chest("Memory's Skyscraper", new Reward("AP Boost", 0x117, "tent"), 0xD1A, 523),
			new Chest("Memory's Skyscraper", new Reward("Mythril Stone", 0x15A, "synthesis"), 0xD26, 524),
			new Chest("The Brink of Despair", new Reward("Dark City Map", 0x100, "map"), 0xD32, 335),
			new Chest("The Brink of Despair", new Reward("Orichalum+", 0x169, "synthesis"), 0xD3E, 500),
			new Chest("Nothing's Call", new Reward("Mythril Gem", 0x15B, "synthesis"), 0xD4A, 378),
			new Chest("Nothing's Call", new Reward("Orichalcum", 0x179, "synthesis"), 0xD56, 379),
			new Chest("Twilight's View", new Reward("Cosmic Belt", 0x06F, "armor"), 0xD62, 336),
			new Chest("Naught's Skyway", new Reward("Mythril Gem", 0x15B, "synthesis"), 0xD6E, 380),
			new Chest("Naught's Skyway", new Reward("Orichalcum", 0x179, "synthesis"), 0xD7A, 381),
			new Chest("Naught's Skyway", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0xD86, 382),
			new Chest("Ruin and Creation's Passage", new Reward("Mythril Stone", 0x15A, "synthesis"), 0xD92, 385),
			new Chest("Ruin and Creation's Passage", new Reward("AP Boost", 0x117, "tent"), 0xD9E, 386),
			new Chest("Ruin and Creation's Passage", new Reward("Mythril Crystal", 0x15C, "synthesis"), 0xDAA, 387),
			new Chest("Ruin and Creation's Passage", new Reward("Orichalcum", 0x179, "synthesis"), 0xDB6, 388)
		]
	}
]