import { Reward } from './rewardsData'

export class Chest {
	constructor(room, reward, index, iconType, address) {
		this.room = room
		this.vanillaReward = new Reward(reward, index, iconType)
		this.replacementReward = new Reward(reward, index, iconType)
		this.vanillaAddress = address
		this.toBeReplaced = false
		this.isReplaced = false
	}

	vanilla() {
		this.replacementReward.reward = this.vanillaReward.reward
		this.replacementReward.index = this.vanillaReward.index
		this.replacementReward.iconType = this.vanillaReward.iconType
		this.toBeReplaced = false
		this.isReplaced = false
	}

	replace(newChestData) {
		this.replacementReward.reward = newChestData.reward.reward
		this.replacementReward.index = newChestData.reward.index
		this.replacementReward.iconType = newChestData.reward.iconType
		this.toBeReplaced = false
		this.isReplaced = newChestData.index !== this.vanillaReward.index
	}

	markForReplacement(toBeReplaced) {
		this.toBeReplaced = toBeReplaced
	}

	toPnach() {
		let ret = 'patch=1,EE,' + this.vanillaAddress.toString(16).toUpperCase().padStart(8, '0') + ',extended,0000' + this.replacementReward.toString(16).toUpperCase().index.padStart(4, '0')
		return ret + ' // ' + this.room + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward + '\n'
	}
}

export const chestsData = [
	{
		world: 'Agrabah',
		chests: [
			new Chest('Agrabah', 'Dark Shard', 0x0118, 'Synthesis', 0x11CDF826),
			new Chest('Agrabah', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF832),
			new Chest('Agrabah', 'Hi-Potion', 0x0002, 'Consumable', 0x11CDF83E),
			new Chest('Agrabah', 'AP Boost', 0x0117, 'Tent', 0x11CDF84A),
			new Chest('Agrabah', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDF856),
			new Chest('Agrabah', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF862),
			new Chest('Agrabah', 'Serenity Shard', 0x0165, 'Synthesis', 0x11CDF86E),
			new Chest('Bazaar', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CDF87A),
			new Chest('Bazaar', 'Power Shard', 0x0149, 'Synthesis', 0x11CDF886),
			new Chest('Bazaar', 'Hi-Potion', 0x0002, 'Consumable', 0x11CDF892),
			new Chest('Bazaar', 'AP Boost', 0x0117, 'Tent', 0x11CDF89E),
			new Chest('Bazaar', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF8AA),
			new Chest('Palace Walls', 'Skill Ring', 0x0026, 'Accessory', 0x11CDF8B6),
			new Chest('Palace Walls', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDF8C2),
			new Chest('The Cave of Wonders Entrance', 'Power Stone', 0x014A, 'Synthesis', 0x11CDF8CE),
			new Chest('The Cave of Wonders Entrance', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF8DA),
			new Chest('Valley of Stone', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDF8E6),
			new Chest('Valley of Stone', 'AP Boost', 0x0117, 'Tent', 0x11CDF8F2),
			new Chest('Valley of Stone', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF8FE),
			new Chest('Valley of Stone', 'Hi-Potion', 0x0002, 'Consumable', 0x11CDF90A),
			new Chest('Chasm of Challenges', 'Cave of Wonders Map', 0x0079, 'Map', 0x11CDF916),
			new Chest('Chasm of Challenges', 'AP Boost', 0x0117, 'Tent', 0x11CDF922),
			new Chest('Treasure Room', 'AP Boost', 0x0117, 'Tent', 0x11CDF92E),
			new Chest('Treasure Room', 'Serenity Gem', 0x0167, 'Synthesis', 0x11CDF93A),
			new Chest('Ruined Chamber', 'Torn Pages', 0x0020, 'Key', 0x11CDF946),
			new Chest('Ruined Chamber', 'Ruins Map', 0x007A, 'Map', 0x11CDF952)
		]
	},
	{
		world: 'Atlantica',
		chests: []
	},
	{
		world: 'Beast\'s Castle',
		chests: [
			new Chest('Courtyard', 'AP Boost', 0x0117, 'Tent', 0x11CDFBF2),
			new Chest('Courtyard', 'Hi-Potion', 0x0002, 'Consumable', 0x11CDFBFE),
			new Chest('Courtyard', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFC0A),
			new Chest('Belle\'s Room', 'Castle Map', 0x005A, 'Map', 0x11CDFC16),
			new Chest('Belle\'s Room', 'Mega Recipe', 0x017E, 'Recipe', 0x11CDFC22),
			new Chest('The East Wing', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFC2E),
			new Chest('The East Wing', 'Tent', 0x0083, 'Tent', 0x11CDFC3A),
			new Chest('The West Hall', 'Hi-Potion', 0x0002, 'Consumable', 0x11CDFC46),
			new Chest('The West Hall', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFC52),
			new Chest('The West Hall', 'Power Shard', 0x0149, 'Synthesis', 0x11CDFC5E),
			new Chest('The West Hall', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFC6A),
			new Chest('The West Hall', 'AP Boost', 0x0117, 'Tent', 0x11CDFC76),
			new Chest('The West Hall', 'Bright Stone', 0x015E, 'Synthesis', 0x11CDFC82),
			new Chest('Dungeon', 'Basement Map', 0x005B, 'Map', 0x11CDFC8E),
			new Chest('Dungeon', 'AP Boost', 0x0117, 'Tent', 0x11CDFC9A),
			new Chest('Secret Passage', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFCA6),
			new Chest('Secret Passage', 'Hi-Potion', 0x0002, 'Consumable', 0x11CDFCB2),
			new Chest('Secret Passage', 'Lucid Shard', 0x014D, 'Synthesis', 0x11CDFCBE),
			new Chest('The West Wing', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFCCA),
			new Chest('The West Wing', 'Tent', 0x0083, 'Tent', 0x11CDFCD6),
			new Chest('The Beast\'s Room', 'Blazing Shard', 0x013D, 'Synthesis', 0x11CDFCE2)
		]
	},
	{
		world: 'Cavern of Remembrance',
		chests: [
			new Chest('Depths', 'AP Boost', 0x0117, 'Tent', 0x11CE04E6),
			new Chest('Depths', 'Power Crystal', 0x014C, 'Synthesis', 0x11CE04F2),
			new Chest('Depths', 'Frost Crystal', 0x017D, 'Synthesis', 0x11CE04FE),
			new Chest('Depths', 'Manifest Illusion', 0x0249, 'Synthesis', 0x11CE050A),
			new Chest('Depths', 'AP Boost', 0x0117, 'Tent', 0x11CE0516),
			new Chest('Depths Upper Level', 'Remembrance Gem', 0x0242, 'Synthesis', 0x11CE0522),
			new Chest('Mining Area', 'Serenity Gem', 0x0167, 'Synthesis', 0x11CE052E),
			new Chest('Mining Area', 'AP Boost', 0x0117, 'Tent', 0x11CE053A),
			new Chest('Mining Area', 'Serenity Crystal', 0x0168, 'Synthesis', 0x11CE0546),
			new Chest('Mining Area', 'Manifest Illusion', 0x0249, 'Synthesis', 0x11CE0552),
			new Chest('Mining Area', 'Serenity Gem', 0x0167, 'Synthesis', 0x11CE055E),
			new Chest('Mining Area', 'Dark Remembrance Map', 0x024A, 'Map', 0x11CE056A),
			new Chest('Engine Chamber', 'Serenity Crystal', 0x0168, 'Synthesis', 0x11CE0576),
			new Chest('Engine Chamber', 'Remembrance Crystal', 0x0243, 'Synthesis', 0x11CE0582),
			new Chest('Engine Chamber', 'AP Boost', 0x0117, 'Tent', 0x11CE058E),
			new Chest('Engine Chamber', 'Manifest Illusion', 0x0249, 'Synthesis', 0x11CE059A),
			new Chest('Mineshaft Lower Level', 'AP Boost', 0x0117, 'Tent', 0x11CE05A6),
			new Chest('Mineshaft Lower Level', 'Depths of Remembrance Map', 0x024E, 'Map', 0x11CE05BE),
			new Chest('Mineshaft Mid Level', 'Power Boost', 0x0114, 'Tent', 0x11CE05CA),
			new Chest('Mineshaft Upper Level', 'AP Boost', 0x0117, 'Tent', 0x11CE05B2),
			new Chest('Mineshaft Upper Level', 'Magic Boost', 0x0115, 'Tent', 0x11CE05D6),
			new Chest('Garden of Assemblage', 'Garden of Assemblage Map', 0x0250, 'Map', 0x11CE05E2),
			new Chest('Garden of Assemblage', 'Lost Illusion', 0x0248, 'Synthesis', 0x11CE05EE),
			new Chest('Garden of Assemblage', 'Proof of Nonexistence', 0x0252, 'Proof', 0x11CE05FA)
		]
	},
	{
		world: 'Disney Castle',
		chests: [
			new Chest('Courtyard', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF9B2),
			new Chest('Courtyard', 'Star Recipe', 0x01C1, 'Recipe', 0x11CDF9BE),
			new Chest('Courtyard', 'AP Boost', 0x0117, 'Tent', 0x11CDF9CA),
			new Chest('Courtyard', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDF9D6),
			new Chest('Courtyard', 'Blazing Stone', 0x013E, 'Synthesis', 0x11CDF9E2),
			new Chest('Courtyard', 'Blazing Shard', 0x013D, 'Synthesis', 0x11CDF9EE),
			new Chest('Courtyard', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF9FA),
			new Chest('Library', 'Torn Pages', 0x0020, 'Key', 0x11CDFA06)
		]
	},
	{
		world: 'Halloween Town',
		chests: [
			new Chest('Graveyard', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFD96),
			new Chest('Graveyard', 'Serenity Gem', 0x0167, 'Synthesis', 0x11CDFDA2),
			new Chest('Dr. Finklestein\'s Lab', 'Halloween Town Map', 0x00FA, 'Map', 0x11CDFDAE),
			new Chest('Halloween Town Square', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDFDBA),
			new Chest('Halloween Town Square', 'Energy Shard', 0x0161, 'Synthesis', 0x11CDFDC6),
			new Chest('Hinterlands', 'Lightning Shard', 0x0145, 'Synthesis', 0x11CDFDD2),
			new Chest('Hinterlands', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDFDDE),
			new Chest('Hinterlands', 'AP Boost', 0x0117, 'Tent', 0x11CDFDEA),
			new Chest('Candy Cane Lane', 'Mega Potion', 0x0005, 'Consumable', 0x11CDFDF6),
			new Chest('Candy Cane Lane', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CDFE02),
			new Chest('Candy Cane Lane', 'Lightning Stone', 0x0146, 'Synthesis', 0x11CDFE0E),
			new Chest('Candy Cane Lane', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDFE1A),
			new Chest('Santa\'s House', 'Christmas Town Map', 0x01FD, 'Map', 0x11CDFE26),
			new Chest('Santa\'s House', 'AP Boost', 0x0117, 'Tent', 0x11CDFE32)
		]
	},
	{
		world: 'Hollow Bastion',
		chests: [
			new Chest('Borough', 'Drive Recovery', 0x0112, 'Tent', 0x11CDFF3A),
			new Chest('Borough', 'AP Boost', 0x0117, 'Tent', 0x11CDFF46),
			new Chest('Borough', 'Hi-Potion', 0x0002, 'Consumable', 0x11CDFF52),
			new Chest('Borough', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFF5E),
			new Chest('Borough', 'Dark Shard', 0x0118, 'Synthesis', 0x11CDFF6A),
			new Chest('Postern', 'Castle Perimeter Map', 0x0201, 'Map', 0x11CDFF76),
			new Chest('Postern', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CDFF82),
			new Chest('Postern', 'AP Boost', 0x0117, 'Tent', 0x11CDFF8E),
			new Chest('Corridors', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDFF9A),
			new Chest('Corridors', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CDFFA6),
			new Chest('Corridors', 'Dark Crystal', 0x011B, 'Synthesis', 0x11CDFFB2),
			new Chest('Corridors', 'AP Boost', 0x0117, 'Tent', 0x11CDFFBE),
			new Chest('Ansem\'s Study', 'Skill Recipe', 0x01C3, 'Recipe', 0x11CDFFCA),
			new Chest('Ansem\'s Study', 'Ukulele Charm', 0x0019, 'Charm', 0x11CDFFD6),
			new Chest('Restoration Site', 'Moon Recipe', 0x01DC, 'Recipe', 0x11CDFFE2),
			new Chest('Restoration Site', 'AP Boost', 0x0117, 'Tent', 0x11CDFFEE),
			new Chest('Crystal Fissure', 'Torn Pages', 0x0020, 'Key', 0x11CDFFFA),
			new Chest('Crystal Fissure', 'The Great Maw Map', 0x0202, 'Map', 0x11CE0006),
			new Chest('Crystal Fissure', 'Energy Crystal', 0x0164, 'Synthesis', 0x11CE0012),
			new Chest('Crystal Fissure', 'AP Boost', 0x0117, 'Tent', 0x11CE001E),
			new Chest('Postern', 'Gull Wing', 0x01E9, 'Keyblade', 0x11CE002A),
			new Chest('Heartless Manufactory', 'Cosmic Chain', 0x0134, 'Accessory', 0x11CE0036)
		]
	},
	{
		world: 'Land of Dragons',
		chests: [
			new Chest('Bamboo Grove', 'Dark Shard', 0x0118, 'Synthesis', 0x11CDF72A),
			new Chest('Bamboo Grove', 'Ether', 0x0003, 'Consumable', 0x11CDF736),
			new Chest('Bamboo Grove', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF742),
			new Chest('Checkpoint', 'Hi-Potion', 0x0002, 'Consumable', 0x11CDF74E),
			new Chest('Checkpoint', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF75A),
			new Chest('Mountain Trail', 'Lightning Shard', 0x0145, 'Synthesis', 0x11CDF766),
			new Chest('Mountain Trail', 'Recovery Recipe', 0x01C2, 'Recipe', 0x11CDF772),
			new Chest('Mountain Trail', 'Ether', 0x0003, 'Consumable', 0x11CDF77E),
			new Chest('Mountain Trail', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF78A),
			new Chest('Village Cave', 'AP Boost', 0x0117, 'Tent', 0x11CDF796),
			new Chest('Village Cave', 'Dark Shard', 0x0118, 'Synthesis', 0x11CDF7A2),
			new Chest('Ridge', 'Frost Shard', 0x017A, 'Synthesis', 0x11CDF7AE),
			new Chest('Ridge', 'AP Boost', 0x0117, 'Tent', 0x11CDF7BA),
			new Chest('Throne Room', 'Torn Pages', 0x0020, 'Key', 0x11CDF7C6),
			new Chest('Throne Room', 'Palace Map', 0x0082, 'Map', 0x11CDF7D2),
			new Chest('Throne Room', 'AP Boost', 0x0117, 'Tent', 0x11CDF7DE),
			new Chest('Throne Room', 'Queen Recipe', 0x01DD, 'Recipe', 0x11CDF7EA),
			new Chest('Throne Room', 'AP Boost', 0x0117, 'Tent', 0x11CDF7F6),
			new Chest('Throne Room', 'Ogre Shield', 0x008D, 'Shield', 0x11CDF802),
			new Chest('Throne Room', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CDF80E),
			new Chest('Throne Room', 'Orichalcum', 0x0179, 'Synthesis', 0x11CDF81A)
		]
	},
	{
		world: 'Olympus Coliseum',
		chests: [
			new Chest('Underworld Entrance', 'Power Boost', 0x0114, 'Tent', 0x11CDFB02),
			new Chest('Passage', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFB0E),
			new Chest('Passage', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDFB1A),
			new Chest('Passage', 'Ether', 0x0003, 'Consumable', 0x11CDFB26),
			new Chest('Passage', 'AP Boost', 0x0117, 'Tent', 0x11CDFB32),
			new Chest('Passage', 'Hi-Potion', 0x0002, 'Consumable', 0x11CDFB3E),
			new Chest('Inner Chamber', 'Underworld Map', 0x0087, 'Map', 0x11CDFB4A),
			new Chest('Inner Chamber', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFB56),
			new Chest('Caverns Entrance', 'Lucid Shard', 0x014D, 'Synthesis', 0x11CDFB62),
			new Chest('Caverns Entrance', 'AP Boost', 0x0117, 'Tent', 0x11CDFB6E),
			new Chest('Caverns Entrance', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFB7A),
			new Chest('The Lost Road', 'Bright Shard', 0x015D, 'Synthesis', 0x11CDFB86),
			new Chest('The Lost Road', 'Ether', 0x0003, 'Consumable', 0x11CDFB92),
			new Chest('The Lost Road', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFB9E),
			new Chest('The Lost Road', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDFBAA),
			new Chest('Atrium', 'Lucid Stone', 0x014E, 'Synthesis', 0x11CDFBB6),
			new Chest('Atrium', 'AP Boost', 0x0117, 'Tent', 0x11CDFBC2),
			new Chest('The Lock', 'Caverns Map', 0x0088, 'Map', 0x11CDFBCE),
			new Chest('The Lock', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFBDA),
			new Chest('The Lock', 'AP Boost', 0x0117, 'Tent', 0x11CDFBE6)
		]
	},
	{
		world: 'Olympus Cups',
		chests: []
	},
	{
		world: '100 Acre Wood',
		chests: [
			new Chest('Pooh Bear\'s House', 'Hundred Acre Wood Map', 0x007D, 'Map', 0x11CDFA12),
			new Chest('Pooh Bear\'s House', 'AP Boost', 0x0117, 'Tent', 0x11CDFA1E),
			new Chest('Pooh Bear\'s House', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDFA2A),
			new Chest('Piglet\'s House', 'Defense Boost', 0x0116, 'Tent', 0x11CDFA36),
			new Chest('Piglet\'s House', 'AP Boost', 0x0117, 'Tent', 0x11CDFA42),
			new Chest('Piglet\'s House', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CDFA4E),
			new Chest('Rabbit\'s House', 'Draw Ring', 0x0041, 'Accessory', 0x11CDFA5A),
			new Chest('Rabbit\'s House', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CDFA66),
			new Chest('Rabbit\'s House', 'AP Boost', 0x0117, 'Tent', 0x11CDFA72),
			new Chest('Kanga\'s House', 'Magic Boost', 0x0115, 'Tent', 0x11CDFA7E),
			new Chest('Kanga\'s House', 'AP Boost', 0x0117, 'Tent', 0x11CDFA8A),
			new Chest('Kanga\'s House', 'Orichalcum', 0x0179, 'Synthesis', 0x11CDFA96),
			new Chest('The Spooky Cave', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CDFAA2),
			new Chest('The Spooky Cave', 'AP Boost', 0x0117, 'Tent', 0x11CDFAAE),
			new Chest('The Spooky Cave', 'Orichalcum', 0x0179, 'Synthesis', 0x11CDFABA),
			new Chest('The Spooky Cave', 'Guard Recipe', 0x01C4, 'Recipe', 0x11CDFAC6),
			new Chest('The Spooky Cave', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CDFAD2),
			new Chest('The Spooky Cave', 'AP Boost', 0x0117, 'Tent', 0x11CDFADE),
			new Chest('Starry Hill', 'Cosmic Ring', 0x0034, 'Accessory', 0x11CDFAEA),
			new Chest('Starry Hill', 'Style Recipe', 0x01DB, 'Recipe', 0x11CDFAF6)
		]
	},
	{
		world: 'Port Royal',
		chests: [
			new Chest('Rampart', 'Naval Map', 0x00FB, 'Map', 0x11CDFE3E),
			new Chest('Rampart', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDFE4A),
			new Chest('Rampart', 'Dark Shard', 0x0118, 'Synthesis', 0x11CDFE56),
			new Chest('Town', 'Dark Stone', 0x0119, 'Synthesis', 0x11CDFE62),
			new Chest('Town', 'AP Boost', 0x0117, 'Tent', 0x11CDFE6E),
			new Chest('Town', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFE7A),
			new Chest('Town', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CDFE86),
			new Chest('Cave Mouth', 'Bright Shard', 0x015D, 'Synthesis', 0x11CDFE92),
			new Chest('Cave Mouth', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFE9E),
			new Chest('Powder Store', 'AP Boost', 0x0117, 'Tent', 0x11CDFEAA),
			new Chest('Powder Store', 'AP Boost', 0x0117, 'Tent', 0x11CDFEB6),
			new Chest('Moonlight Nook', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDFEC2),
			new Chest('Moonlight Nook', 'Serenity Gem', 0x0167, 'Synthesis', 0x11CDFECE),
			new Chest('Moonlight Nook', 'Power Stone', 0x014A, 'Synthesis', 0x11CDFEDA),
			new Chest('The Interceptor\'s Hold', 'Feather Charm', 0x00A0, 'Charm', 0x11CDFEE6),
			new Chest('Seadrift Keep', 'AP Boost', 0x0117, 'Tent', 0x11CDFEF2),
			new Chest('Seadrift Keep', 'Orichalcum', 0x0179, 'Synthesis', 0x11CDFEFE),
			new Chest('Seadrift Keep', 'Meteor Staff', 0x0096, 'Staff', 0x11CDFF0A),
			new Chest('Seadrift Row', 'Serenity Gem', 0x0167, 'Synthesis', 0x11CDFF16),
			new Chest('Seadrift Row', 'King Recipe', 0x01DE, 'Recipe', 0x11CDFF22),
			new Chest('Seadrift Row', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CDFF2E)
		]
	},
	{
		world: 'Pride Lands',
		chests: [
			new Chest('Gorge', 'Savannah Map', 0x0200, 'Map', 0x11CE0042),
			new Chest('Gorge', 'Dark Gem', 0x011A, 'Synthesis', 0x11CE004E),
			new Chest('Gorge', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE005A),
			new Chest('Elephant Graveyard', 'Frost Gem', 0x017C, 'Synthesis', 0x11CE0066),
			new Chest('Elephant Graveyard', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE0072),
			new Chest('Elephant Graveyard', 'Bright Stone', 0x015E, 'Synthesis', 0x11CE007E),
			new Chest('Elephant Graveyard', 'AP Boost', 0x0117, 'Tent', 0x11CE008A),
			new Chest('Elephant Graveyard', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CE0096),
			new Chest('Pride Rock', 'Pride Rock Map', 0x00FC, 'Map', 0x11CE00A2),
			new Chest('Pride Rock', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE00AE),
			new Chest('Pride Rock', 'Serenity Crystal', 0x0168, 'Synthesis', 0x11CE00BA),
			new Chest('Wildebeest Valley', 'Energy Stone', 0x0162, 'Synthesis', 0x11CE00C6),
			new Chest('Wildebeest Valley', 'AP Boost', 0x0117, 'Tent', 0x11CE00D2),
			new Chest('Wildebeest Valley', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CE00DE),
			new Chest('Wildebeest Valley', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE00EA),
			new Chest('Wildebeest Valley', 'Lucid Gem', 0x014F, 'Synthesis', 0x11CE00F6),
			new Chest('Wastelands', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CE0102),
			new Chest('Wastelands', 'Serenity Gem', 0x0167, 'Synthesis', 0x11CE010E),
			new Chest('Wastelands', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE011A),
			new Chest('Jungle', 'Serenity Gem', 0x0167, 'Synthesis', 0x11CE0126),
			new Chest('Jungle', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE0132),
			new Chest('Jungle', 'Serenity Crystal', 0x0168, 'Synthesis', 0x11CE013E),
			new Chest('Oasis', 'Oasis Map', 0x01FF, 'Map', 0x11CE014A),
			new Chest('Oasis', 'Torn Pages', 0x0020, 'Key', 0x11CE0156),
			new Chest('Oasis', 'AP Boost', 0x0117, 'Tent', 0x11CE0162)
		]
	},
	{
		world: 'Simulated Twilight Town',
		chests: [
			new Chest('Station of Serenity', 'Potion', 0x0001, 'Consumable', 0x11CE016E),
			new Chest('Station of Calling', 'Potion', 0x0001, 'Consumable', 0x11CE017A),
			new Chest('Central Station', 'Potion', 0x0001, 'Consumable', 0x11CE0186),
			new Chest('Central Station', 'Hi-Potion', 0x0002, 'Consumable', 0x11CE0192),
			new Chest('Central Station', 'Potion', 0x0001, 'Consumable', 0x11CE019E),
			new Chest('Sunset Terrace', 'Ability Ring', 0x0008, 'Accessory', 0x11CE01AA),
			new Chest('Sunset Terrace', 'Hi-Potion', 0x0002, 'Consumable', 0x11CE01B6),
			new Chest('Sunset Terrace', 'Potion', 0x0001, 'Consumable', 0x11CE01C2),
			new Chest('Sunset Terrace', 'Potion', 0x0001, 'Consumable', 0x11CE01CE),
			new Chest('Mansion Foyer', 'Hi-Potion', 0x0002, 'Consumable', 0x11CE01DA),
			new Chest('Mansion Foyer', 'Potion', 0x0001, 'Consumable', 0x11CE01E6),
			new Chest('Mansion Foyer', 'Potion', 0x0001, 'Consumable', 0x11CE01F2),
			new Chest('Mansion Dining Room', 'Elven Bandana', 0x0043, 'Armor', 0x11CE01FE),
			new Chest('Mansion Dining Room', 'Potion', 0x0001, 'Consumable', 0x11CE020A),
			new Chest('Mansion Library', 'Hi-Potion', 0x0002, 'Consumable', 0x11CE0216),
			new Chest('Mansion Basement Corridor', 'Hi-Potion', 0x0002, 'Consumable', 0x11CE0222)
		]
	},
	{
		world: 'Space Paranoids',
		chests: [
			new Chest('Pit Cell', 'Pit Cell Area Map', 0x00FE, 'Map', 0x11CDFCEE),
			new Chest('Pit Cell', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CDFCFA),
			new Chest('Canyon', 'Dark Crystal', 0x011B, 'Synthesis', 0x11CDFD06),
			new Chest('Canyon', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDFD12),
			new Chest('Canyon', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CDFD1E),
			new Chest('Canyon', 'Frost Crystal', 0x017D, 'Synthesis', 0x11CDFD2A),
			new Chest('Hallway', 'Power Crystal', 0x014C, 'Synthesis', 0x11CDFD36),
			new Chest('Hallway', 'AP Boost', 0x0117, 'Tent', 0x11CDFD42),
			new Chest('Communications Room', 'I/O Tower Map', 0x0203, 'Map', 0x11CDFD4E),
			new Chest('Communications Room', 'Gaia Belt', 0x004F, 'Armor', 0x11CDFD5A),
			new Chest('Central Computer Core', 'AP Boost', 0x0117, 'Tent', 0x11CDFD66),
			new Chest('Central Computer Core', 'Orichalcum+', 0x0169, 'Synthesis', 0x11CDFD72),
			new Chest('Central Computer Core', 'Cosmic Arts', 0x0038, 'Accessory', 0x11CDFD7E),
			new Chest('Central Computer Core', 'Central Computer Core Map', 0x0204, 'Map', 0x11CDFD8A)
		]
	},
	{
		world: 'Timeless River',
		chests: [
			new Chest('Cornerstone Hill', 'Cornerstone Hill Map', 0x0072, 'Map', 0x11CDF95E),
			new Chest('Cornerstone Hill', 'Frost Shard', 0x017A, 'Synthesis', 0x11CDF96A),
			new Chest('Pier', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CDF976),
			new Chest('Pier', 'Hi-Potion', 0x0002, 'Consumable', 0x11CDF982),
			new Chest('Waterway', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CDF98E),
			new Chest('Waterway', 'AP Boost', 0x0117, 'Tent', 0x11CDF99A),
			new Chest('Waterway', 'Frost Stone', 0x017B, 'Synthesis', 0x11CDF9A6)
		]
	},
	{
		world: 'Twilight Town',
		chests: [
			new Chest('The Old Mansion', 'Potion', 0x0001, 'Consumable', 0x11CE022E),
			new Chest('The Old Mansion', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CE023A),
			new Chest('The Woods', 'Potion', 0x0001, 'Consumable', 0x11CE0246),
			new Chest('The Woods', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CE0252),
			new Chest('The Woods', 'Hi-Potion', 0x0002, 'Consumable', 0x11CE025E),
			new Chest('Tram Common', 'Hi-Potion', 0x0002, 'Consumable', 0x11CE026A),
			new Chest('Tram Common', 'AP Boost', 0x0117, 'Tent', 0x11CE0276),
			new Chest('Tram Common', 'Tent', 0x0083, 'Tent', 0x11CE0282),
			new Chest('Tram Common', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CE028E),
			new Chest('Tram Common', 'Potion', 0x0001, 'Consumable', 0x11CE029A),
			new Chest('Tram Common', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CE02A6),
			new Chest('Tram Common', 'Potion', 0x0001, 'Consumable', 0x11CE02B2),
			new Chest('Central Station', 'Tent', 0x0083, 'Tent', 0x11CE02BE),
			new Chest('Central Station', 'Hi-Potion', 0x0002, 'Consumable', 0x11CE02CA),
			new Chest('Central Station', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CE02D6),
			new Chest('The Tower', 'Potion', 0x0001, 'Consumable', 0x11CE02E2),
			new Chest('The Tower', 'Hi-Potion', 0x0002, 'Consumable', 0x11CE02EE),
			new Chest('The Tower', 'Ether', 0x0003, 'Consumable', 0x11CE02FA),
			new Chest('Tower Entryway', 'Ether', 0x0003, 'Consumable', 0x11CE0306),
			new Chest('Tower Entryway', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CE0312),
			new Chest('Sorcerer\'s Loft', 'Tower Map', 0x0215, 'Map', 0x11CE031E),
			new Chest('Tower Wardrobe', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE032A),
			new Chest('Underground Concourse', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CE0336),
			new Chest('Underground Concourse', 'Orichalcum', 0x0179, 'Synthesis', 0x11CE0342),
			new Chest('Underground Concourse', 'AP Boost', 0x0117, 'Tent', 0x11CE034E),
			new Chest('Underground Concourse', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CE035A),
			new Chest('Tunnelway', 'Orichalcum', 0x0179, 'Synthesis', 0x11CE0366),
			new Chest('Tunnelway', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CE0372),
			new Chest('Sunset Terrace', 'Orichalcum+', 0x0169, 'Synthesis', 0x11CE037E),
			new Chest('Sunset Terrace', 'Mythril Shard', 0x0159, 'Synthesis', 0x11CE038A),
			new Chest('Sunset Terrace', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CE0396),
			new Chest('Sunset Terrace', 'AP Boost', 0x0117, 'Tent', 0x11CE03A2),
			new Chest('Mansion Foyer', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CE03AE),
			new Chest('Mansion Foyer', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE03BA),
			new Chest('Mansion Foyer', 'Serenity Crystal', 0x0168, 'Synthesis', 0x11CE03C6),
			new Chest('Mansion Dining Room', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CE03D2),
			new Chest('Mansion Dining Room', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE03DE),
			new Chest('Mansion Library', 'Orichalcum', 0x0179, 'Synthesis', 0x11CE03EA),
			new Chest('Mansion Basement Corridor', 'Ultimate Recipe', 0x01DF, 'Recipe', 0x11CE03F6)
		]
	},
	{
		world: 'The World That Never Was',
		chests: [
			new Chest('Fragment Crossing', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE0402),
			new Chest('Fragment Crossing', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CE040E),
			new Chest('Fragment Crossing', 'AP Boost', 0x0117, 'Tent', 0x11CE041A),
			new Chest('Fragment Crossing', 'Orichalcum', 0x0179, 'Synthesis', 0x11CE0426),
			new Chest('Memory\'s Skyscraper', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CE0432),
			new Chest('Memory\'s Skyscraper', 'AP Boost', 0x0117, 'Tent', 0x11CE043E),
			new Chest('Memory\'s Skyscraper', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE044A),
			new Chest('The Brink of Despair', 'Dark City Map', 0x0100, 'Map', 0x11CE0456),
			new Chest('The Brink of Despair', 'Orichalum+', 0x0169, 'Synthesis', 0x11CE0462),
			new Chest('Nothing\'s Call', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CE046E),
			new Chest('Nothing\'s Call', 'Orichalcum', 0x0179, 'Synthesis', 0x11CE047A),
			new Chest('Twilight\'s View', 'Cosmic Belt', 0x006F, 'Armor', 0x11CE0486),
			new Chest('Naught\'s Skyway', 'Mythril Gem', 0x015B, 'Synthesis', 0x11CE0492),
			new Chest('Naught\'s Skyway', 'Orichalcum', 0x0179, 'Synthesis', 0x11CE049E),
			new Chest('Naught\'s Skyway', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CE04AA),
			new Chest('Ruin and Creation\'s Passage', 'Mythril Stone', 0x015A, 'Synthesis', 0x11CE04B6),
			new Chest('Ruin and Creation\'s Passage', 'AP Boost', 0x0117, 'Tent', 0x11CE04C2),
			new Chest('Ruin and Creation\'s Passage', 'Mythril Crystal', 0x015C, 'Synthesis', 0x11CE04CE),
			new Chest('Ruin and Creation\'s Passage', 'Orichalcum', 0x0179, 'Synthesis', 0x11CE04DA)
		]
	}
]