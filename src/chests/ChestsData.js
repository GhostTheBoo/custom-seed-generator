import { Reward } from '../rewards/RewardsData'

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
			let ret = ''
			if (this.isReplaced()) {
				ret = 'patch=1,EE,1' + this.vanillaAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
				ret += this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // ' + this.room + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ''
			if (this.isReplaced()) {
				let address = this.vanillaAddress - 0x1CCB300
				ret += '\tWriteShort(Sys3+0x' + address.toString(16).toUpperCase() + ',0x' + this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0') + ')'
				if (isCommented) ret += ' -- ' + this.room + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToYml = (isCommented) => {
			let ret = ''
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
			return this.isReplaced() ? JSON.stringify(this, ['replacementReward', 'reward', 'index', 'iconType', 'vanillaAddress', 'zipID']) + ',' : ''
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
			let ret = isCommented ? '// ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.chests.forEach(chest => { ret += chest.saveToPnach(isCommented) })
			return ret
		}))
	}
	static saveToLua(chestData, isCommented) {
		return ['\nfunction Chests()\n'].concat(chestData.map(worldList => {
			let ret = isCommented ? '\t-- ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.chests.forEach(chest => { ret += chest.saveToLua(isCommented) })
			return ret
		}), ['end\n'])
	}
	static saveToYml(chestData, isCommented) {
		return chestData.reduce((prev, worldList) => {
			if (worldList.chests.find(chest => chest.isReplaced())) {
				prev += isCommented ? '# ' + worldList.world + '\n' : ''
				worldList.chests.forEach(chest => { prev += chest.saveToYml(isCommented) })
			}
			return prev
		}, '')
	}
	static saveToJSON(chestData) {
		let chestSaveData = chestData.map(world => {
			let ret = ''
			world.chests.forEach(chest => { ret += chest.saveToJSON() })
			return ret === '' ? ret : '{"world":"' + world.world + '","chests":[' + ret.slice(0, -1) + ']}'
		})
		return ['"chestsData":[', chestSaveData.filter(s => s !== '').join(), '],']
	}
	static loadFromJSON(chestLoadData) {
		return chestsData.map(world => {
			let foundWorld = chestLoadData.find(loadWorld => loadWorld.world === world.world)
			if (foundWorld !== undefined) {
				let newChests = world.chests.map(chest => {
					let foundChest = foundWorld.chests.find(loadChest => loadChest.vanillaAddress === chest.vanillaAddress)
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
		world: 'Agrabah',
		chests: [
			new Chest('Agrabah', new Reward('Dark Shard', 0x118, 'Synthesis'), 0x1CDF826, 28),
			new Chest('Agrabah', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF832, 29), // double check
			new Chest('Agrabah', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDF83E, 30),
			new Chest('Agrabah', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF84A, 132),
			new Chest('Agrabah', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDF856, 133),
			new Chest('Agrabah', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF862, 249), // double check
			new Chest('Agrabah', new Reward('Serenity Shard', 0x165, 'Synthesis'), 0x1CDF86E, 501),
			new Chest('Bazaar', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDF87A, 31),
			new Chest('Bazaar', new Reward('Power Shard', 0x149, 'Synthesis'), 0x1CDF886, 32),
			new Chest('Bazaar', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDF892, 33),
			new Chest('Bazaar', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF89E, 134),
			new Chest('Bazaar', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF8AA, 135),
			new Chest('Palace Walls', new Reward('Skill Ring', 0x026, 'Accessory'), 0x1CDF8B6, 136),
			new Chest('Palace Walls', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDF8C2, 520),
			new Chest('The Cave of Wonders Entrance', new Reward('Power Stone', 0x14A, 'Synthesis'), 0x1CDF8CE, 250),
			new Chest('The Cave of Wonders Entrance', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF8DA, 251),
			new Chest('Valley of Stone', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDF8E6, 35),
			new Chest('Valley of Stone', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF8F2, 36),
			new Chest('Valley of Stone', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF8FE, 137),
			new Chest('Valley of Stone', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDF90A, 138),
			new Chest('Chasm of Challenges', new Reward('Cave of Wonders Map', 0x079, 'Map'), 0x1CDF916, 487),
			new Chest('Chasm of Challenges', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF922, 37),
			new Chest('Treasure Room', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF92E, 502),
			new Chest('Treasure Room', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CDF93A, 503),
			new Chest('Ruined Chamber', new Reward('Torn Pages', 0x020, 'Pages'), 0x1CDF946, 34),
			new Chest('Ruined Chamber', new Reward('Ruins Map', 0x07A, 'Map'), 0x1CDF952, 486)
		]
	},
	{
		world: 'Beast\'s Castle',
		chests: [
			new Chest('Courtyard', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFBF2, 39),
			new Chest('Courtyard', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDFBFE, 40),
			new Chest('Courtyard', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFC0A, 505),
			new Chest('Belle\'s Room', new Reward('Castle Map', 0x05A, 'Map'), 0x1CDFC16, 46),
			new Chest('Belle\'s Room', new Reward('Mega Recipe', 0x17E, 'Recipe'), 0x1CDFC22, 240),
			new Chest('The East Wing', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFC2E, 63),
			new Chest('The East Wing', new Reward('Tent', 0x083, 'Tent'), 0x1CDFC3A, 155),
			new Chest('The West Hall', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDFC46, 41),
			new Chest('The West Hall', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFC52, 206), // WEIRD
			new Chest('The West Hall', new Reward('Power Shard', 0x149, 'Synthesis'), 0x1CDFC5E, 207),
			new Chest('The West Hall', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFC6A, 208), // WEIRD
			new Chest('The West Hall', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFC76, 158),
			new Chest('The West Hall', new Reward('Bright Stone', 0x15E, 'Synthesis'), 0x1CDFC82, 159),
			new Chest('Dungeon', new Reward('Basement Map', 0x05B, 'Map'), 0x1CDFC8E, 239),
			new Chest('Dungeon', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFC9A, 43),
			new Chest('Secret Passage', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFCA6, 44),
			new Chest('Secret Passage', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDFCB2, 168),
			new Chest('Secret Passage', new Reward('Lucid Shard', 0x14D, 'Synthesis'), 0x1CDFCBE, 45),
			new Chest('The West Wing', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFCCA, 42),
			new Chest('The West Wing', new Reward('Tent', 0x083, 'Tent'), 0x1CDFCD6, 164),
			new Chest('The Beast\'s Room', new Reward('Blazing Shard', 0x13D, 'Synthesis'), 0x1CDFCE2, 241)
		]
	},
	{
		world: 'Cavern of Remembrance',
		chests: [
			new Chest('Depths', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE04E6, 562), // double check
			new Chest('Depths', new Reward('Power Crystal', 0x14C, 'Synthesis'), 0x1CE04F2, 563),
			new Chest('Depths', new Reward('Frost Crystal', 0x17D, 'Synthesis'), 0x1CE04FE, 564),
			new Chest('Depths', new Reward('Manifest Illusion', 0x249, 'Synthesis'), 0x1CE050A, 565),
			new Chest('Depths', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE0516, 566), // double check
			new Chest('Depths Upper Level', new Reward('Remembrance Gem', 0x242, 'Synthesis'), 0x1CE0522, 567),
			new Chest('Mining Area', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CE052E, 568), // double check
			new Chest('Mining Area', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE053A, 569),
			new Chest('Mining Area', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE0546, 570),
			new Chest('Mining Area', new Reward('Manifest Illusion', 0x249, 'Synthesis'), 0x1CE0552, 571),
			new Chest('Mining Area', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CE055E, 572), // double check
			new Chest('Mining Area', new Reward('Dark Remembrance Map', 0x24A, 'Map'), 0x1CE056A, 573),
			new Chest('Engine Chamber', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE0576, 574),
			new Chest('Engine Chamber', new Reward('Remembrance Crystal', 0x243, 'Synthesis'), 0x1CE0582, 575),
			new Chest('Engine Chamber', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE058E, 576),
			new Chest('Engine Chamber', new Reward('Manifest Illusion', 0x249, 'Synthesis'), 0x1CE059A, 577),
			new Chest('Mineshaft Lower Level', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE05A6, 578),
			new Chest('Mineshaft Lower Level', new Reward('Depths of Remembrance Map', 0x24E, 'Map'), 0x1CE05BE, 580),
			new Chest('Mineshaft Mid Level', new Reward('Power Boost', 0x114, 'Tent'), 0x1CE05CA, 581),
			new Chest('Mineshaft Upper Level', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE05B2, 579),
			new Chest('Mineshaft Upper Level', new Reward('Magic Boost', 0x115, 'Tent'), 0x1CE05D6, 582),
			new Chest('Garden of Assemblage', new Reward('Garden of Assemblage Map', 0x250, 'Map'), 0x1CE05E2, 585),
			new Chest('Garden of Assemblage', new Reward('Lost Illusion', 0x248, 'Synthesis'), 0x1CE05EE, 586),
			new Chest('Garden of Assemblage', new Reward('Proof of Nonexistence', 0x252, 'Nonexistence'), 0x1CE05FA, 590)
		]
	},
	{
		world: 'Disney Castle',
		chests: [
			new Chest('Courtyard', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF9B2, 16), // double check
			new Chest('Courtyard', new Reward('Star Recipe', 0x1C1, 'Recipe'), 0x1CDF9BE, 17),
			new Chest('Courtyard', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF9CA, 18),
			new Chest('Courtyard', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDF9D6, 92),
			new Chest('Courtyard', new Reward('Blazing Stone', 0x13E, 'Synthesis'), 0x1CDF9E2, 93),
			new Chest('Courtyard', new Reward('Blazing Shard', 0x13D, 'Synthesis'), 0x1CDF9EE, 247),
			new Chest('Courtyard', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF9FA, 248), // double check
			new Chest('Library', new Reward('Torn Pages', 0x020, 'Pages'), 0x1CDFA06, 91)
		]
	},
	{
		world: 'Halloween Town',
		chests: [
			new Chest('Graveyard', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFD96, 53),
			new Chest('Graveyard', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CDFDA2, 212),
			new Chest('Dr. Finklestein\'s Lab', new Reward('Halloween Town Map', 0x0FA, 'Map'), 0x1CDFDAE, 211),
			new Chest('Halloween Town Square', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFDBA, 209),
			new Chest('Halloween Town Square', new Reward('Energy Shard', 0x161, 'Synthesis'), 0x1CDFDC6, 210),
			new Chest('Hinterlands', new Reward('Lightning Shard', 0x145, 'Synthesis'), 0x1CDFDD2, 54),
			new Chest('Hinterlands', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFDDE, 213),
			new Chest('Hinterlands', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFDEA, 214),
			new Chest('Candy Cane Lane', new Reward('Mega Potion', 0x005, 'Consumable'), 0x1CDFDF6, 55),
			new Chest('Candy Cane Lane', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFE02, 56),
			new Chest('Candy Cane Lane', new Reward('Lightning Stone', 0x146, 'Synthesis'), 0x1CDFE0E, 216),
			new Chest('Candy Cane Lane', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFE1A, 217),
			new Chest('Santa\'s House', new Reward('Christmas Town Map', 0x1FD, 'Map'), 0x1CDFE26, 57),
			new Chest('Santa\'s House', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFE32, 58)
		]
	},
	{
		world: 'Hollow Bastion',
		chests: [
			new Chest('Borough', new Reward('Drive Recovery', 0x112, 'Tent'), 0x1CDFF3A, 194),
			new Chest('Borough', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFF46, 195),
			new Chest('Borough', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDFF52, 196),
			new Chest('Borough', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFF5E, 305),
			new Chest('Borough', new Reward('Dark Shard', 0x118, 'Synthesis'), 0x1CDFF6A, 506),
			new Chest('Postern', new Reward('Castle Perimeter Map', 0x201, 'Map'), 0x1CDFF76, 310),
			new Chest('Postern', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFF82, 189),
			new Chest('Postern', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFF8E, 190),
			new Chest('Corridors', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFF9A, 200),
			new Chest('Corridors', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDFFA6, 201),
			new Chest('Corridors', new Reward('Dark Crystal', 0x11B, 'Synthesis'), 0x1CDFFB2, 202),
			new Chest('Corridors', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFFBE, 307),
			new Chest('Ansem\'s Study', new Reward('Skill Recipe', 0x1C3, 'Recipe'), 0x1CDFFCA, 184),
			new Chest('Ansem\'s Study', new Reward('Ukulele Charm', 0x019, 'Charm'), 0x1CDFFD6, 183),
			new Chest('Restoration Site', new Reward('Moon Recipe', 0x1DC, 'Recipe'), 0x1CDFFE2, 309),
			new Chest('Restoration Site', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFFEE, 507),
			new Chest('Crystal Fissure', new Reward('Torn Pages', 0x020, 'Pages'), 0x1CDFFFA, 179),
			new Chest('Crystal Fissure', new Reward('The Great Maw Map', 0x202, 'Map'), 0x1CE0006, 489),
			new Chest('Crystal Fissure', new Reward('Energy Crystal', 0x164, 'Synthesis'), 0x1CE0012, 180),
			new Chest('Crystal Fissure', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE001E, 181),
			new Chest('Postern', new Reward('Gull Wing', 0x1E9, 'Keyblade'), 0x1CE002A, 491),
			new Chest('Heartless Manufactory', new Reward('Cosmic Chain', 0x134, 'Accessory'), 0x1CE0036, 311)
		]
	},
	{
		world: 'Land of Dragons',
		chests: [
			new Chest('Bamboo Grove', new Reward('Dark Shard', 0x118, 'Synthesis'), 0x1CDF72A, 245),
			new Chest('Bamboo Grove', new Reward('Ether', 0x003, 'Consumable'), 0x1CDF736, 497),
			new Chest('Bamboo Grove', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF742, 498),
			new Chest('Checkpoint', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDF74E, 21),
			new Chest('Checkpoint', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF75A, 121),
			new Chest('Mountain Trail', new Reward('Lightning Shard', 0x145, 'Synthesis'), 0x1CDF766, 22),
			new Chest('Mountain Trail', new Reward('Recovery Recipe', 0x1C2, 'Recipe'), 0x1CDF772, 23),
			new Chest('Mountain Trail', new Reward('Ether', 0x003, 'Consumable'), 0x1CDF77E, 122),
			new Chest('Mountain Trail', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF78A, 123),
			new Chest('Village Cave', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF796, 124),
			new Chest('Village Cave', new Reward('Dark Shard', 0x118, 'Synthesis'), 0x1CDF7A2, 125),
			new Chest('Ridge', new Reward('Frost Shard', 0x17A, 'Synthesis'), 0x1CDF7AE, 24),
			new Chest('Ridge', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF7BA, 126),
			new Chest('Throne Room', new Reward('Torn Pages', 0x020, 'Pages'), 0x1CDF7C6, 25),
			new Chest('Throne Room', new Reward('Palace Map', 0x082, 'Map'), 0x1CDF7D2, 127),
			new Chest('Throne Room', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF7DE, 26), // double check
			new Chest('Throne Room', new Reward('Queen Recipe', 0x1DD, 'Recipe'), 0x1CDF7EA, 27),
			new Chest('Throne Room', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF7F6, 128), // double check
			new Chest('Throne Room', new Reward('Ogre Shield', 0x08D, 'Goofy'), 0x1CDF802, 129),
			new Chest('Throne Room', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDF80E, 130),
			new Chest('Throne Room', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CDF81A, 131)
		]
	},
	{
		world: 'Olympus Coliseum',
		chests: [
			new Chest('Underworld Entrance', new Reward('Power Boost', 0x114, 'Tent'), 0x1CDFB02, 242),
			new Chest('Passage', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFB0E, 7),
			new Chest('Passage', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFB1A, 8),
			new Chest('Passage', new Reward('Ether', 0x003, 'Consumable'), 0x1CDFB26, 144),
			new Chest('Passage', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFB32, 145),
			new Chest('Passage', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDFB3E, 146),
			new Chest('Inner Chamber', new Reward('Underworld Map', 0x087, 'Map'), 0x1CDFB4A, 2),
			new Chest('Inner Chamber', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFB56, 243),
			new Chest('Caverns Entrance', new Reward('Lucid Shard', 0x14D, 'Synthesis'), 0x1CDFB62, 3),
			new Chest('Caverns Entrance', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFB6E, 11),
			new Chest('Caverns Entrance', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFB7A, 504),
			new Chest('The Lost Road', new Reward('Bright Shard', 0x15D, 'Synthesis'), 0x1CDFB86, 9),
			new Chest('The Lost Road', new Reward('Ether', 0x003, 'Consumable'), 0x1CDFB92, 10),
			new Chest('The Lost Road', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFB9E, 148),
			new Chest('The Lost Road', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFBAA, 149),
			new Chest('Atrium', new Reward('Lucid Stone', 0x14E, 'Synthesis'), 0x1CDFBB6, 150),
			new Chest('Atrium', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFBC2, 151),
			new Chest('The Lock', new Reward('Caverns Map', 0x088, 'Map'), 0x1CDFBCE, 244),
			new Chest('The Lock', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFBDA, 5),
			new Chest('The Lock', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFBE6, 142)
		]
	},
	{
		world: '100 Acre Wood',
		chests: [
			new Chest('Pooh Bear\'s House', new Reward('Hundred Acre Wood Map', 0x07D, 'Map'), 0x1CDFA12, 313),
			new Chest('Pooh Bear\'s House', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFA1E, 97),
			new Chest('Pooh Bear\'s House', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFA2A, 98),
			new Chest('Piglet\'s House', new Reward('Defense Boost', 0x116, 'Tent'), 0x1CDFA36, 105),
			new Chest('Piglet\'s House', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFA42, 103),
			new Chest('Piglet\'s House', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFA4E, 104),
			new Chest('Rabbit\'s House', new Reward('Draw Ring', 0x041, 'Accessory'), 0x1CDFA5A, 314),
			new Chest('Rabbit\'s House', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDFA66, 100),
			new Chest('Rabbit\'s House', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFA72, 101),
			new Chest('Kanga\'s House', new Reward('Magic Boost', 0x115, 'Tent'), 0x1CDFA7E, 108),
			new Chest('Kanga\'s House', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFA8A, 106),
			new Chest('Kanga\'s House', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CDFA96, 107),
			new Chest('The Spooky Cave', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFAA2, 110),
			new Chest('The Spooky Cave', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFAAE, 111), // double check
			new Chest('The Spooky Cave', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CDFABA, 112),
			new Chest('The Spooky Cave', new Reward('Guard Recipe', 0x1C4, 'Recipe'), 0x1CDFAC6, 113),
			new Chest('The Spooky Cave', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDFAD2, 115),
			new Chest('The Spooky Cave', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFADE, 116), // double check
			new Chest('Starry Hill', new Reward('Cosmic Ring', 0x034, 'Accessory'), 0x1CDFAEA, 312),
			new Chest('Starry Hill', new Reward('Style Recipe', 0x1DB, 'Recipe'), 0x1CDFAF6, 94)
		]
	},
	{
		world: 'Port Royal',
		chests: [
			new Chest('Rampart', new Reward('Naval Map', 0x0FB, 'Map'), 0x1CDFE3E, 70),
			new Chest('Rampart', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFE4A, 219),
			new Chest('Rampart', new Reward('Dark Shard', 0x118, 'Synthesis'), 0x1CDFE56, 220),
			new Chest('Town', new Reward('Dark Stone', 0x119, 'Synthesis'), 0x1CDFE62, 71),
			new Chest('Town', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFE6E, 72),
			new Chest('Town', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFE7A, 73),
			new Chest('Town', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFE86, 221),
			new Chest('Cave Mouth', new Reward('Bright Shard', 0x15D, 'Synthesis'), 0x1CDFE92, 74),
			new Chest('Cave Mouth', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFE9E, 223),
			new Chest('Powder Store', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFEAA, 369), // double check
			new Chest('Powder Store', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFEB6, 370), // double check
			new Chest('Moonlight Nook', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFEC2, 75),
			new Chest('Moonlight Nook', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CDFECE, 224),
			new Chest('Moonlight Nook', new Reward('Power Stone', 0x14A, 'Synthesis'), 0x1CDFEDA, 371),
			new Chest('The Interceptor\'s Hold', new Reward('Feather Charm', 0x0A0, 'Charm'), 0x1CDFEE6, 252),
			new Chest('Seadrift Keep', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFEF2, 76),
			new Chest('Seadrift Keep', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CDFEFE, 225),
			new Chest('Seadrift Keep', new Reward('Meteor Staff', 0x096, 'Donald'), 0x1CDFF0A, 372),
			new Chest('Seadrift Row', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CDFF16, 77),
			new Chest('Seadrift Row', new Reward('King Recipe', 0x1DE, 'Recipe'), 0x1CDFF22, 78),
			new Chest('Seadrift Row', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDFF2E, 373)
		]
	},
	{
		world: 'Pride Lands',
		chests: [
			new Chest('Gorge', new Reward('Savannah Map', 0x200, 'Map'), 0x1CE0042, 492),
			new Chest('Gorge', new Reward('Dark Gem', 0x11A, 'Synthesis'), 0x1CE004E, 404),
			new Chest('Gorge', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE005A, 405),
			new Chest('Elephant Graveyard', new Reward('Frost Gem', 0x17C, 'Synthesis'), 0x1CE0066, 401),
			new Chest('Elephant Graveyard', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE0072, 402),
			new Chest('Elephant Graveyard', new Reward('Bright Stone', 0x15E, 'Synthesis'), 0x1CE007E, 403),
			new Chest('Elephant Graveyard', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE008A, 508),
			new Chest('Elephant Graveyard', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE0096, 509),
			new Chest('Pride Rock', new Reward('Pride Rock Map', 0x0FC, 'Map'), 0x1CE00A2, 418),
			new Chest('Pride Rock', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE00AE, 392),
			new Chest('Pride Rock', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE00BA, 393),
			new Chest('Wildebeest Valley', new Reward('Energy Stone', 0x162, 'Synthesis'), 0x1CE00C6, 396),
			new Chest('Wildebeest Valley', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE00D2, 397),
			new Chest('Wildebeest Valley', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CE00DE, 398),
			new Chest('Wildebeest Valley', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE00EA, 399),
			new Chest('Wildebeest Valley', new Reward('Lucid Gem', 0x14F, 'Synthesis'), 0x1CE00F6, 400),
			new Chest('Wastelands', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE0102, 406),
			new Chest('Wastelands', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CE010E, 407),
			new Chest('Wastelands', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE011A, 408),
			new Chest('Jungle', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CE0126, 409),
			new Chest('Jungle', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE0132, 410),
			new Chest('Jungle', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE013E, 411),
			new Chest('Oasis', new Reward('Oasis Map', 0x1FF, 'Map'), 0x1CE014A, 412),
			new Chest('Oasis', new Reward('Torn Pages', 0x020, 'Pages'), 0x1CE0156, 493),
			new Chest('Oasis', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE0162, 413)
		]
	},
	{
		world: 'Simulated Twilight Town',
		chests: [
			new Chest('Station of Serenity', new Reward('Potion', 0x001, 'Consumable'), 0x1CE016E, 315),
			new Chest('Station of Calling', new Reward('Potion', 0x001, 'Consumable'), 0x1CE017A, 472),
			new Chest('Central Station', new Reward('Potion', 0x001, 'Consumable'), 0x1CE0186, 428), // double check
			new Chest('Central Station', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE0192, 429),
			new Chest('Central Station', new Reward('Potion', 0x001, 'Consumable'), 0x1CE019E, 430), // double check
			new Chest('Sunset Terrace', new Reward('Ability Ring', 0x008, 'Accessory'), 0x1CE01AA, 434),
			new Chest('Sunset Terrace', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE01B6, 435),
			new Chest('Sunset Terrace', new Reward('Potion', 0x001, 'Consumable'), 0x1CE01C2, 436), // double check
			new Chest('Sunset Terrace', new Reward('Potion', 0x001, 'Consumable'), 0x1CE01CE, 437), // double check
			new Chest('Mansion Foyer', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE01DA, 449),
			new Chest('Mansion Foyer', new Reward('Potion', 0x001, 'Consumable'), 0x1CE01E6, 450), // double check
			new Chest('Mansion Foyer', new Reward('Potion', 0x001, 'Consumable'), 0x1CE01F2, 451), // double check
			new Chest('Mansion Dining Room', new Reward('Elven Bandana', 0x043, 'Armor'), 0x1CE01FE, 455),
			new Chest('Mansion Dining Room', new Reward('Potion', 0x001, 'Consumable'), 0x1CE020A, 456),
			new Chest('Mansion Library', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE0216, 459),
			new Chest('Mansion Basement Corridor', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE0222, 463)
		]
	},
	{
		world: 'Space Paranoids',
		chests: [
			new Chest('Pit Cell', new Reward('Pit Cell Area Map', 0x0FE, 'Map'), 0x1CDFCEE, 316),
			new Chest('Pit Cell', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDFCFA, 64),
			new Chest('Canyon', new Reward('Dark Crystal', 0x11B, 'Synthesis'), 0x1CDFD06, 65),
			new Chest('Canyon', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFD12, 171),
			new Chest('Canyon', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFD1E, 253),
			new Chest('Canyon', new Reward('Frost Crystal', 0x17D, 'Synthesis'), 0x1CDFD2A, 521),
			new Chest('Hallway', new Reward('Power Crystal', 0x14C, 'Synthesis'), 0x1CDFD36, 49),
			new Chest('Hallway', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFD42, 50),
			new Chest('Communications Room', new Reward('I/O Tower Map', 0x203, 'Map'), 0x1CDFD4E, 255),
			new Chest('Communications Room', new Reward('Gaia Belt', 0x04F, 'Armor'), 0x1CDFD5A, 499),
			new Chest('Central Computer Core', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFD66, 177),
			new Chest('Central Computer Core', new Reward('Orichalcum+', 0x169, 'Synthesis'), 0x1CDFD72, 178),
			new Chest('Central Computer Core', new Reward('Cosmic Arts', 0x038, 'Accessory'), 0x1CDFD7E, 51),
			new Chest('Central Computer Core', new Reward('Central Computer Core Map', 0x204, 'Map'), 0x1CDFD8A, 488)
		]
	},
	{
		world: 'Timeless River',
		chests: [
			new Chest('Cornerstone Hill', new Reward('Cornerstone Hill Map', 0x072, 'Map'), 0x1CDF95E, 79),
			new Chest('Cornerstone Hill', new Reward('Frost Shard', 0x17A, 'Synthesis'), 0x1CDF96A, 12),
			new Chest('Pier', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF976, 81),
			new Chest('Pier', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDF982, 82),
			new Chest('Waterway', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDF98E, 83),
			new Chest('Waterway', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF99A, 84),
			new Chest('Waterway', new Reward('Frost Stone', 0x17B, 'Synthesis'), 0x1CDF9A6, 85)
		]
	},
	{
		world: 'Twilight Town',
		chests: [
			new Chest('The Old Mansion', new Reward('Potion', 0x001, 'Consumable'), 0x1CE022E, 447),
			new Chest('The Old Mansion', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE023A, 448),
			new Chest('The Woods', new Reward('Potion', 0x001, 'Consumable'), 0x1CE0246, 442),
			new Chest('The Woods', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE0252, 443),
			new Chest('The Woods', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE025E, 444),
			new Chest('Tram Common', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE026A, 420),
			new Chest('Tram Common', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE0276, 421),
			new Chest('Tram Common', new Reward('Tent', 0x083, 'Tent'), 0x1CE0282, 422),
			new Chest('Tram Common', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE028E, 423), // double check
			new Chest('Tram Common', new Reward('Potion', 0x001, 'Consumable'), 0x1CE029A, 424), // double check
			new Chest('Tram Common', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE02A6, 425), // double check
			new Chest('Tram Common', new Reward('Potion', 0x001, 'Consumable'), 0x1CE02B2, 484), // double check
			new Chest('Central Station', new Reward('Tent', 0x083, 'Tent'), 0x1CE02BE, 431),
			new Chest('Central Station', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE02CA, 432),
			new Chest('Central Station', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE02D6, 433),
			new Chest('The Tower', new Reward('Potion', 0x001, 'Consumable'), 0x1CE02E2, 465),
			new Chest('The Tower', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE02EE, 466),
			new Chest('The Tower', new Reward('Ether', 0x003, 'Consumable'), 0x1CE02FA, 522),
			new Chest('Tower Entryway', new Reward('Ether', 0x003, 'Consumable'), 0x1CE0306, 467),
			new Chest('Tower Entryway', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE0312, 468),
			new Chest('Sorcerer\'s Loft', new Reward('Tower Map', 0x215, 'Map'), 0x1CE031E, 469),
			new Chest('Tower Wardrobe', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE032A, 470),
			new Chest('Underground Concourse', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CE0336, 479),
			new Chest('Underground Concourse', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE0342, 480),
			new Chest('Underground Concourse', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE034E, 481),
			new Chest('Underground Concourse', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE035A, 482),
			new Chest('Tunnelway', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE0366, 477),
			new Chest('Tunnelway', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE0372, 478),
			new Chest('Sunset Terrace', new Reward('Orichalcum+', 0x169, 'Synthesis'), 0x1CE037E, 438),
			new Chest('Sunset Terrace', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE038A, 439),
			new Chest('Sunset Terrace', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE0396, 440),
			new Chest('Sunset Terrace', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE03A2, 441),
			new Chest('Mansion Foyer', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE03AE, 452),
			new Chest('Mansion Foyer', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE03BA, 453),
			new Chest('Mansion Foyer', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE03C6, 454),
			new Chest('Mansion Dining Room', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE03D2, 457),
			new Chest('Mansion Dining Room', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE03DE, 458),
			new Chest('Mansion Library', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE03EA, 460),
			new Chest('Mansion Basement Corridor', new Reward('Ultimate Recipe', 0x1DF, 'Recipe'), 0x1CE03F6, 464)
		]
	},
	{
		world: 'The World That Never Was',
		chests: [
			new Chest('Fragment Crossing', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE0402, 374),
			new Chest('Fragment Crossing', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE040E, 375),
			new Chest('Fragment Crossing', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE041A, 376),
			new Chest('Fragment Crossing', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE0426, 377),
			new Chest('Memory\'s Skyscraper', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE0432, 391),
			new Chest('Memory\'s Skyscraper', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE043E, 523),
			new Chest('Memory\'s Skyscraper', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE044A, 524),
			new Chest('The Brink of Despair', new Reward('Dark City Map', 0x100, 'Map'), 0x1CE0456, 335),
			new Chest('The Brink of Despair', new Reward('Orichalum+', 0x169, 'Synthesis'), 0x1CE0462, 500),
			new Chest('Nothing\'s Call', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CE046E, 378),
			new Chest('Nothing\'s Call', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE047A, 379),
			new Chest('Twilight\'s View', new Reward('Cosmic Belt', 0x06F, 'Armor'), 0x1CE0486, 336),
			new Chest('Naught\'s Skyway', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CE0492, 380),
			new Chest('Naught\'s Skyway', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE049E, 381),
			new Chest('Naught\'s Skyway', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE04AA, 382),
			new Chest('Ruin and Creation\'s Passage', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE04B6, 385),
			new Chest('Ruin and Creation\'s Passage', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE04C2, 386),
			new Chest('Ruin and Creation\'s Passage', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE04CE, 387),
			new Chest('Ruin and Creation\'s Passage', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE04DA, 388)
		]
	}
]