import { Reward } from './rewardsData'

export class Chest {
	constructor(room, vanilla, address) {
		this.room = room
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
			return new Chest(this.room, new Reward(this.vanillaReward.reward, this.vanillaReward.index, this.vanillaReward.iconType), this.vanillaAddress)
		}
		this.replace = (newChestData) => {
			let ret = this.copy()
			ret.replacementReward = { ...newChestData.reward }
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
		this.loadFromJSON = (chestJSON) => {
			let ret = this.copy()
			ret.replacementReward = { ...chestJSON.replacementReward }
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
	}
}

export const chestsData = [
	{
		world: 'Agrabah',
		chests: [
			new Chest('Agrabah', new Reward('Dark Shard', 0x118, 'Synthesis'), 0x1CDF826),
			new Chest('Agrabah', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF832),
			new Chest('Agrabah', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDF83E),
			new Chest('Agrabah', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF84A),
			new Chest('Agrabah', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDF856),
			new Chest('Agrabah', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF862),
			new Chest('Agrabah', new Reward('Serenity Shard', 0x165, 'Synthesis'), 0x1CDF86E),
			new Chest('Bazaar', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDF87A),
			new Chest('Bazaar', new Reward('Power Shard', 0x149, 'Synthesis'), 0x1CDF886),
			new Chest('Bazaar', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDF892),
			new Chest('Bazaar', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF89E),
			new Chest('Bazaar', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF8AA),
			new Chest('Palace Walls', new Reward('Skill Ring', 0x026, 'Accessory'), 0x1CDF8B6),
			new Chest('Palace Walls', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDF8C2),
			new Chest('The Cave of Wonders Entrance', new Reward('Power Stone', 0x14A, 'Synthesis'), 0x1CDF8CE),
			new Chest('The Cave of Wonders Entrance', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF8DA),
			new Chest('Valley of Stone', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDF8E6),
			new Chest('Valley of Stone', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF8F2),
			new Chest('Valley of Stone', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF8FE),
			new Chest('Valley of Stone', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDF90A),
			new Chest('Chasm of Challenges', new Reward('Cave of Wonders Map', 0x079, 'Map'), 0x1CDF916),
			new Chest('Chasm of Challenges', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF922),
			new Chest('Treasure Room', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF92E),
			new Chest('Treasure Room', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CDF93A),
			new Chest('Ruined Chamber', new Reward('Torn Pages', 0x020, 'Pages'), 0x1CDF946),
			new Chest('Ruined Chamber', new Reward('Ruins Map', 0x07A, 'Map'), 0x1CDF952)
		]
	},
	{
		world: 'Atlantica',
		chests: []
	},
	{
		world: 'Beast\'s Castle',
		chests: [
			new Chest('Courtyard', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFBF2),
			new Chest('Courtyard', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDFBFE),
			new Chest('Courtyard', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFC0A),
			new Chest('Belle\'s Room', new Reward('Castle Map', 0x05A, 'Map'), 0x1CDFC16),
			new Chest('Belle\'s Room', new Reward('Mega Recipe', 0x17E, 'Recipe'), 0x1CDFC22),
			new Chest('The East Wing', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFC2E),
			new Chest('The East Wing', new Reward('Tent', 0x083, 'Tent'), 0x1CDFC3A),
			new Chest('The West Hall', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDFC46),
			new Chest('The West Hall', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFC52),
			new Chest('The West Hall', new Reward('Power Shard', 0x149, 'Synthesis'), 0x1CDFC5E),
			new Chest('The West Hall', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFC6A),
			new Chest('The West Hall', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFC76),
			new Chest('The West Hall', new Reward('Bright Stone', 0x15E, 'Synthesis'), 0x1CDFC82),
			new Chest('Dungeon', new Reward('Basement Map', 0x05B, 'Map'), 0x1CDFC8E),
			new Chest('Dungeon', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFC9A),
			new Chest('Secret Passage', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFCA6),
			new Chest('Secret Passage', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDFCB2),
			new Chest('Secret Passage', new Reward('Lucid Shard', 0x14D, 'Synthesis'), 0x1CDFCBE),
			new Chest('The West Wing', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFCCA),
			new Chest('The West Wing', new Reward('Tent', 0x083, 'Tent'), 0x1CDFCD6),
			new Chest('The Beast\'s Room', new Reward('Blazing Shard', 0x13D, 'Synthesis'), 0x1CDFCE2)
		]
	},
	{
		world: 'Cavern of Remembrance',
		chests: [
			new Chest('Depths', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE04E6),
			new Chest('Depths', new Reward('Power Crystal', 0x14C, 'Synthesis'), 0x1CE04F2),
			new Chest('Depths', new Reward('Frost Crystal', 0x17D, 'Synthesis'), 0x1CE04FE),
			new Chest('Depths', new Reward('Manifest Illusion', 0x249, 'Synthesis'), 0x1CE050A),
			new Chest('Depths', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE0516),
			new Chest('Depths Upper Level', new Reward('Remembrance Gem', 0x242, 'Synthesis'), 0x1CE0522),
			new Chest('Mining Area', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CE052E),
			new Chest('Mining Area', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE053A),
			new Chest('Mining Area', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE0546),
			new Chest('Mining Area', new Reward('Manifest Illusion', 0x249, 'Synthesis'), 0x1CE0552),
			new Chest('Mining Area', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CE055E),
			new Chest('Mining Area', new Reward('Dark Remembrance Map', 0x24A, 'Map'), 0x1CE056A),
			new Chest('Engine Chamber', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE0576),
			new Chest('Engine Chamber', new Reward('Remembrance Crystal', 0x243, 'Synthesis'), 0x1CE0582),
			new Chest('Engine Chamber', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE058E),
			new Chest('Engine Chamber', new Reward('Manifest Illusion', 0x249, 'Synthesis'), 0x1CE059A),
			new Chest('Mineshaft Lower Level', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE05A6),
			new Chest('Mineshaft Lower Level', new Reward('Depths of Remembrance Map', 0x24E, 'Map'), 0x1CE05BE),
			new Chest('Mineshaft Mid Level', new Reward('Power Boost', 0x114, 'Tent'), 0x1CE05CA),
			new Chest('Mineshaft Upper Level', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE05B2),
			new Chest('Mineshaft Upper Level', new Reward('Magic Boost', 0x115, 'Tent'), 0x1CE05D6),
			new Chest('Garden of Assemblage', new Reward('Garden of Assemblage Map', 0x250, 'Map'), 0x1CE05E2),
			new Chest('Garden of Assemblage', new Reward('Lost Illusion', 0x248, 'Synthesis'), 0x1CE05EE),
			new Chest('Garden of Assemblage', new Reward('Proof of Nonexistence', 0x252, 'Nonexistence'), 0x1CE05FA)
		]
	},
	{
		world: 'Disney Castle',
		chests: [
			new Chest('Courtyard', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF9B2),
			new Chest('Courtyard', new Reward('Star Recipe', 0x1C1, 'Recipe'), 0x1CDF9BE),
			new Chest('Courtyard', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF9CA),
			new Chest('Courtyard', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDF9D6),
			new Chest('Courtyard', new Reward('Blazing Stone', 0x13E, 'Synthesis'), 0x1CDF9E2),
			new Chest('Courtyard', new Reward('Blazing Shard', 0x13D, 'Synthesis'), 0x1CDF9EE),
			new Chest('Courtyard', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF9FA),
			new Chest('Library', new Reward('Torn Pages', 0x020, 'Pages'), 0x1CDFA06)
		]
	},
	{
		world: 'Halloween Town',
		chests: [
			new Chest('Graveyard', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFD96),
			new Chest('Graveyard', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CDFDA2),
			new Chest('Dr. Finklestein\'s Lab', new Reward('Halloween Town Map', 0x0FA, 'Map'), 0x1CDFDAE),
			new Chest('Halloween Town Square', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFDBA),
			new Chest('Halloween Town Square', new Reward('Energy Shard', 0x161, 'Synthesis'), 0x1CDFDC6),
			new Chest('Hinterlands', new Reward('Lightning Shard', 0x145, 'Synthesis'), 0x1CDFDD2),
			new Chest('Hinterlands', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFDDE),
			new Chest('Hinterlands', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFDEA),
			new Chest('Candy Cane Lane', new Reward('Mega Potion', 0x005, 'Consumable'), 0x1CDFDF6),
			new Chest('Candy Cane Lane', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFE02),
			new Chest('Candy Cane Lane', new Reward('Lightning Stone', 0x146, 'Synthesis'), 0x1CDFE0E),
			new Chest('Candy Cane Lane', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFE1A),
			new Chest('Santa\'s House', new Reward('Christmas Town Map', 0x1FD, 'Map'), 0x1CDFE26),
			new Chest('Santa\'s House', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFE32)
		]
	},
	{
		world: 'Hollow Bastion',
		chests: [
			new Chest('Borough', new Reward('Drive Recovery', 0x112, 'Tent'), 0x1CDFF3A),
			new Chest('Borough', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFF46),
			new Chest('Borough', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDFF52),
			new Chest('Borough', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFF5E),
			new Chest('Borough', new Reward('Dark Shard', 0x118, 'Synthesis'), 0x1CDFF6A),
			new Chest('Postern', new Reward('Castle Perimeter Map', 0x201, 'Map'), 0x1CDFF76),
			new Chest('Postern', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFF82),
			new Chest('Postern', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFF8E),
			new Chest('Corridors', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFF9A),
			new Chest('Corridors', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDFFA6),
			new Chest('Corridors', new Reward('Dark Crystal', 0x11B, 'Synthesis'), 0x1CDFFB2),
			new Chest('Corridors', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFFBE),
			new Chest('Ansem\'s Study', new Reward('Skill Recipe', 0x1C3, 'Recipe'), 0x1CDFFCA),
			new Chest('Ansem\'s Study', new Reward('Ukulele Charm', 0x019, 'Charm'), 0x1CDFFD6),
			new Chest('Restoration Site', new Reward('Moon Recipe', 0x1DC, 'Recipe'), 0x1CDFFE2),
			new Chest('Restoration Site', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFFEE),
			new Chest('Crystal Fissure', new Reward('Torn Pages', 0x020, 'Pages'), 0x1CDFFFA),
			new Chest('Crystal Fissure', new Reward('The Great Maw Map', 0x202, 'Map'), 0x1CE0006),
			new Chest('Crystal Fissure', new Reward('Energy Crystal', 0x164, 'Synthesis'), 0x1CE0012),
			new Chest('Crystal Fissure', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE001E),
			new Chest('Postern', new Reward('Gull Wing', 0x1E9, 'Keyblade'), 0x1CE002A),
			new Chest('Heartless Manufactory', new Reward('Cosmic Chain', 0x134, 'Accessory'), 0x1CE0036)
		]
	},
	{
		world: 'Land of Dragons',
		chests: [
			new Chest('Bamboo Grove', new Reward('Dark Shard', 0x118, 'Synthesis'), 0x1CDF72A),
			new Chest('Bamboo Grove', new Reward('Ether', 0x003, 'Consumable'), 0x1CDF736),
			new Chest('Bamboo Grove', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF742),
			new Chest('Checkpoint', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDF74E),
			new Chest('Checkpoint', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF75A),
			new Chest('Mountain Trail', new Reward('Lightning Shard', 0x145, 'Synthesis'), 0x1CDF766),
			new Chest('Mountain Trail', new Reward('Recovery Recipe', 0x1C2, 'Recipe'), 0x1CDF772),
			new Chest('Mountain Trail', new Reward('Ether', 0x003, 'Consumable'), 0x1CDF77E),
			new Chest('Mountain Trail', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF78A),
			new Chest('Village Cave', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF796),
			new Chest('Village Cave', new Reward('Dark Shard', 0x118, 'Synthesis'), 0x1CDF7A2),
			new Chest('Ridge', new Reward('Frost Shard', 0x17A, 'Synthesis'), 0x1CDF7AE),
			new Chest('Ridge', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF7BA),
			new Chest('Throne Room', new Reward('Torn Pages', 0x020, 'Pages'), 0x1CDF7C6),
			new Chest('Throne Room', new Reward('Palace Map', 0x082, 'Map'), 0x1CDF7D2),
			new Chest('Throne Room', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF7DE),
			new Chest('Throne Room', new Reward('Queen Recipe', 0x1DD, 'Recipe'), 0x1CDF7EA),
			new Chest('Throne Room', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF7F6),
			new Chest('Throne Room', new Reward('Ogre Shield', 0x08D, 'Goofy'), 0x1CDF802),
			new Chest('Throne Room', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDF80E),
			new Chest('Throne Room', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CDF81A)
		]
	},
	{
		world: 'Olympus Coliseum',
		chests: [
			new Chest('Underworld Entrance', new Reward('Power Boost', 0x114, 'Tent'), 0x1CDFB02),
			new Chest('Passage', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFB0E),
			new Chest('Passage', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFB1A),
			new Chest('Passage', new Reward('Ether', 0x003, 'Consumable'), 0x1CDFB26),
			new Chest('Passage', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFB32),
			new Chest('Passage', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDFB3E),
			new Chest('Inner Chamber', new Reward('Underworld Map', 0x087, 'Map'), 0x1CDFB4A),
			new Chest('Inner Chamber', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFB56),
			new Chest('Caverns Entrance', new Reward('Lucid Shard', 0x14D, 'Synthesis'), 0x1CDFB62),
			new Chest('Caverns Entrance', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFB6E),
			new Chest('Caverns Entrance', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFB7A),
			new Chest('The Lost Road', new Reward('Bright Shard', 0x15D, 'Synthesis'), 0x1CDFB86),
			new Chest('The Lost Road', new Reward('Ether', 0x003, 'Consumable'), 0x1CDFB92),
			new Chest('The Lost Road', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFB9E),
			new Chest('The Lost Road', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFBAA),
			new Chest('Atrium', new Reward('Lucid Stone', 0x14E, 'Synthesis'), 0x1CDFBB6),
			new Chest('Atrium', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFBC2),
			new Chest('The Lock', new Reward('Caverns Map', 0x088, 'Map'), 0x1CDFBCE),
			new Chest('The Lock', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFBDA),
			new Chest('The Lock', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFBE6)
		]
	},
	{
		world: 'Olympus Cups',
		chests: []
	},
	{
		world: '100 Acre Wood',
		chests: [
			new Chest('Pooh Bear\'s House', new Reward('Hundred Acre Wood Map', 0x07D, 'Map'), 0x1CDFA12),
			new Chest('Pooh Bear\'s House', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFA1E),
			new Chest('Pooh Bear\'s House', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFA2A),
			new Chest('Piglet\'s House', new Reward('Defense Boost', 0x116, 'Tent'), 0x1CDFA36),
			new Chest('Piglet\'s House', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFA42),
			new Chest('Piglet\'s House', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFA4E),
			new Chest('Rabbit\'s House', new Reward('Draw Ring', 0x041, 'Accessory'), 0x1CDFA5A),
			new Chest('Rabbit\'s House', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDFA66),
			new Chest('Rabbit\'s House', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFA72),
			new Chest('Kanga\'s House', new Reward('Magic Boost', 0x115, 'Tent'), 0x1CDFA7E),
			new Chest('Kanga\'s House', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFA8A),
			new Chest('Kanga\'s House', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CDFA96),
			new Chest('The Spooky Cave', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFAA2),
			new Chest('The Spooky Cave', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFAAE),
			new Chest('The Spooky Cave', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CDFABA),
			new Chest('The Spooky Cave', new Reward('Guard Recipe', 0x1C4, 'Recipe'), 0x1CDFAC6),
			new Chest('The Spooky Cave', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDFAD2),
			new Chest('The Spooky Cave', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFADE),
			new Chest('Starry Hill', new Reward('Cosmic Ring', 0x034, 'Accessory'), 0x1CDFAEA),
			new Chest('Starry Hill', new Reward('Style Recipe', 0x1DB, 'Recipe'), 0x1CDFAF6)
		]
	},
	{
		world: 'Port Royal',
		chests: [
			new Chest('Rampart', new Reward('Naval Map', 0x0FB, 'Map'), 0x1CDFE3E),
			new Chest('Rampart', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFE4A),
			new Chest('Rampart', new Reward('Dark Shard', 0x118, 'Synthesis'), 0x1CDFE56),
			new Chest('Town', new Reward('Dark Stone', 0x119, 'Synthesis'), 0x1CDFE62),
			new Chest('Town', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFE6E),
			new Chest('Town', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFE7A),
			new Chest('Town', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFE86),
			new Chest('Cave Mouth', new Reward('Bright Shard', 0x15D, 'Synthesis'), 0x1CDFE92),
			new Chest('Cave Mouth', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFE9E),
			new Chest('Powder Store', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFEAA),
			new Chest('Powder Store', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFEB6),
			new Chest('Moonlight Nook', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDFEC2),
			new Chest('Moonlight Nook', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CDFECE),
			new Chest('Moonlight Nook', new Reward('Power Stone', 0x14A, 'Synthesis'), 0x1CDFEDA),
			new Chest('The Interceptor\'s Hold', new Reward('Feather Charm', 0x0A0, 'Charm'), 0x1CDFEE6),
			new Chest('Seadrift Keep', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFEF2),
			new Chest('Seadrift Keep', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CDFEFE),
			new Chest('Seadrift Keep', new Reward('Meteor Staff', 0x096, 'Donald'), 0x1CDFF0A),
			new Chest('Seadrift Row', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CDFF16),
			new Chest('Seadrift Row', new Reward('King Recipe', 0x1DE, 'Recipe'), 0x1CDFF22),
			new Chest('Seadrift Row', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDFF2E)
		]
	},
	{
		world: 'Pride Lands',
		chests: [
			new Chest('Gorge', new Reward('Savannah Map', 0x200, 'Map'), 0x1CE0042),
			new Chest('Gorge', new Reward('Dark Gem', 0x11A, 'Synthesis'), 0x1CE004E),
			new Chest('Gorge', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE005A),
			new Chest('Elephant Graveyard', new Reward('Frost Gem', 0x17C, 'Synthesis'), 0x1CE0066),
			new Chest('Elephant Graveyard', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE0072),
			new Chest('Elephant Graveyard', new Reward('Bright Stone', 0x15E, 'Synthesis'), 0x1CE007E),
			new Chest('Elephant Graveyard', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE008A),
			new Chest('Elephant Graveyard', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE0096),
			new Chest('Pride Rock', new Reward('Pride Rock Map', 0x0FC, 'Map'), 0x1CE00A2),
			new Chest('Pride Rock', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE00AE),
			new Chest('Pride Rock', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE00BA),
			new Chest('Wildebeest Valley', new Reward('Energy Stone', 0x162, 'Synthesis'), 0x1CE00C6),
			new Chest('Wildebeest Valley', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE00D2),
			new Chest('Wildebeest Valley', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CE00DE),
			new Chest('Wildebeest Valley', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE00EA),
			new Chest('Wildebeest Valley', new Reward('Lucid Gem', 0x14F, 'Synthesis'), 0x1CE00F6),
			new Chest('Wastelands', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE0102),
			new Chest('Wastelands', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CE010E),
			new Chest('Wastelands', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE011A),
			new Chest('Jungle', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CE0126),
			new Chest('Jungle', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE0132),
			new Chest('Jungle', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE013E),
			new Chest('Oasis', new Reward('Oasis Map', 0x1FF, 'Map'), 0x1CE014A),
			new Chest('Oasis', new Reward('Torn Pages', 0x020, 'Pages'), 0x1CE0156),
			new Chest('Oasis', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE0162)
		]
	},
	{
		world: 'Simulated Twilight Town',
		chests: [
			new Chest('Station of Serenity', new Reward('Potion', 0x001, 'Consumable'), 0x1CE016E),
			new Chest('Station of Calling', new Reward('Potion', 0x001, 'Consumable'), 0x1CE017A),
			new Chest('Central Station', new Reward('Potion', 0x001, 'Consumable'), 0x1CE0186),
			new Chest('Central Station', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE0192),
			new Chest('Central Station', new Reward('Potion', 0x001, 'Consumable'), 0x1CE019E),
			new Chest('Sunset Terrace', new Reward('Ability Ring', 0x008, 'Accessory'), 0x1CE01AA),
			new Chest('Sunset Terrace', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE01B6),
			new Chest('Sunset Terrace', new Reward('Potion', 0x001, 'Consumable'), 0x1CE01C2),
			new Chest('Sunset Terrace', new Reward('Potion', 0x001, 'Consumable'), 0x1CE01CE),
			new Chest('Mansion Foyer', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE01DA),
			new Chest('Mansion Foyer', new Reward('Potion', 0x001, 'Consumable'), 0x1CE01E6),
			new Chest('Mansion Foyer', new Reward('Potion', 0x001, 'Consumable'), 0x1CE01F2),
			new Chest('Mansion Dining Room', new Reward('Elven Bandana', 0x043, 'Armor'), 0x1CE01FE),
			new Chest('Mansion Dining Room', new Reward('Potion', 0x001, 'Consumable'), 0x1CE020A),
			new Chest('Mansion Library', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE0216),
			new Chest('Mansion Basement Corridor', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE0222)
		]
	},
	{
		world: 'Space Paranoids',
		chests: [
			new Chest('Pit Cell', new Reward('Pit Cell Area Map', 0x0FE, 'Map'), 0x1CDFCEE),
			new Chest('Pit Cell', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CDFCFA),
			new Chest('Canyon', new Reward('Dark Crystal', 0x11B, 'Synthesis'), 0x1CDFD06),
			new Chest('Canyon', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDFD12),
			new Chest('Canyon', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CDFD1E),
			new Chest('Canyon', new Reward('Frost Crystal', 0x17D, 'Synthesis'), 0x1CDFD2A),
			new Chest('Hallway', new Reward('Power Crystal', 0x14C, 'Synthesis'), 0x1CDFD36),
			new Chest('Hallway', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFD42),
			new Chest('Communications Room', new Reward('I/O Tower Map', 0x203, 'Map'), 0x1CDFD4E),
			new Chest('Communications Room', new Reward('Gaia Belt', 0x04F, 'Armor'), 0x1CDFD5A),
			new Chest('Central Computer Core', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDFD66),
			new Chest('Central Computer Core', new Reward('Orichalcum+', 0x169, 'Synthesis'), 0x1CDFD72),
			new Chest('Central Computer Core', new Reward('Cosmic Arts', 0x038, 'Accessory'), 0x1CDFD7E),
			new Chest('Central Computer Core', new Reward('Central Computer Core Map', 0x204, 'Map'), 0x1CDFD8A)
		]
	},
	{
		world: 'Timeless River',
		chests: [
			new Chest('Cornerstone Hill', new Reward('Cornerstone Hill Map', 0x072, 'Map'), 0x1CDF95E),
			new Chest('Cornerstone Hill', new Reward('Frost Shard', 0x17A, 'Synthesis'), 0x1CDF96A),
			new Chest('Pier', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CDF976),
			new Chest('Pier', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CDF982),
			new Chest('Waterway', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CDF98E),
			new Chest('Waterway', new Reward('AP Boost', 0x117, 'Tent'), 0x1CDF99A),
			new Chest('Waterway', new Reward('Frost Stone', 0x17B, 'Synthesis'), 0x1CDF9A6)
		]
	},
	{
		world: 'Twilight Town',
		chests: [
			new Chest('The Old Mansion', new Reward('Potion', 0x001, 'Consumable'), 0x1CE022E),
			new Chest('The Old Mansion', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE023A),
			new Chest('The Woods', new Reward('Potion', 0x001, 'Consumable'), 0x1CE0246),
			new Chest('The Woods', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE0252),
			new Chest('The Woods', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE025E),
			new Chest('Tram Common', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE026A),
			new Chest('Tram Common', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE0276),
			new Chest('Tram Common', new Reward('Tent', 0x083, 'Tent'), 0x1CE0282),
			new Chest('Tram Common', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE028E),
			new Chest('Tram Common', new Reward('Potion', 0x001, 'Consumable'), 0x1CE029A),
			new Chest('Tram Common', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE02A6),
			new Chest('Tram Common', new Reward('Potion', 0x001, 'Consumable'), 0x1CE02B2),
			new Chest('Central Station', new Reward('Tent', 0x083, 'Tent'), 0x1CE02BE),
			new Chest('Central Station', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE02CA),
			new Chest('Central Station', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE02D6),
			new Chest('The Tower', new Reward('Potion', 0x001, 'Consumable'), 0x1CE02E2),
			new Chest('The Tower', new Reward('Hi-Potion', 0x002, 'Consumable'), 0x1CE02EE),
			new Chest('The Tower', new Reward('Ether', 0x003, 'Consumable'), 0x1CE02FA),
			new Chest('Tower Entryway', new Reward('Ether', 0x003, 'Consumable'), 0x1CE0306),
			new Chest('Tower Entryway', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE0312),
			new Chest('Sorcerer\'s Loft', new Reward('Tower Map', 0x215, 'Map'), 0x1CE031E),
			new Chest('Tower Wardrobe', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE032A),
			new Chest('Underground Concourse', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CE0336),
			new Chest('Underground Concourse', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE0342),
			new Chest('Underground Concourse', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE034E),
			new Chest('Underground Concourse', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE035A),
			new Chest('Tunnelway', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE0366),
			new Chest('Tunnelway', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE0372),
			new Chest('Sunset Terrace', new Reward('Orichalcum+', 0x169, 'Synthesis'), 0x1CE037E),
			new Chest('Sunset Terrace', new Reward('Mythril Shard', 0x159, 'Synthesis'), 0x1CE038A),
			new Chest('Sunset Terrace', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE0396),
			new Chest('Sunset Terrace', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE03A2),
			new Chest('Mansion Foyer', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE03AE),
			new Chest('Mansion Foyer', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE03BA),
			new Chest('Mansion Foyer', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE03C6),
			new Chest('Mansion Dining Room', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE03D2),
			new Chest('Mansion Dining Room', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE03DE),
			new Chest('Mansion Library', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE03EA),
			new Chest('Mansion Basement Corridor', new Reward('Ultimate Recipe', 0x1DF, 'Recipe'), 0x1CE03F6)
		]
	},
	{
		world: 'The World That Never Was',
		chests: [
			new Chest('Fragment Crossing', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE0402),
			new Chest('Fragment Crossing', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE040E),
			new Chest('Fragment Crossing', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE041A),
			new Chest('Fragment Crossing', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE0426),
			new Chest('Memory\'s Skyscraper', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE0432),
			new Chest('Memory\'s Skyscraper', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE043E),
			new Chest('Memory\'s Skyscraper', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE044A),
			new Chest('The Brink of Despair', new Reward('Dark City Map', 0x100, 'Map'), 0x1CE0456),
			new Chest('The Brink of Despair', new Reward('Orichalum+', 0x169, 'Synthesis'), 0x1CE0462),
			new Chest('Nothing\'s Call', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CE046E),
			new Chest('Nothing\'s Call', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE047A),
			new Chest('Twilight\'s View', new Reward('Cosmic Belt', 0x06F, 'Armor'), 0x1CE0486),
			new Chest('Naught\'s Skyway', new Reward('Mythril Gem', 0x15B, 'Synthesis'), 0x1CE0492),
			new Chest('Naught\'s Skyway', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE049E),
			new Chest('Naught\'s Skyway', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE04AA),
			new Chest('Ruin and Creation\'s Passage', new Reward('Mythril Stone', 0x15A, 'Synthesis'), 0x1CE04B6),
			new Chest('Ruin and Creation\'s Passage', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE04C2),
			new Chest('Ruin and Creation\'s Passage', new Reward('Mythril Crystal', 0x15C, 'Synthesis'), 0x1CE04CE),
			new Chest('Ruin and Creation\'s Passage', new Reward('Orichalcum', 0x179, 'Synthesis'), 0x1CE04DA)
		]
	}
]