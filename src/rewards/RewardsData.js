export function Reward(reward, index, iconType) {
	this.reward = reward
	this.index = index
	this.iconType = iconType
}

// ANTI FORM ?!?!?!?

export const rewardsData = [
	{
		rewardType: 'Sora\'s Abilities',
		categories: [
			{
				category: 'Combo Modifiers',
				rewards: [
					new Reward('Slapshot', 0x106, 'Ability'),
					new Reward('Dodge Slash', 0x107, 'Ability'),
					new Reward('Flash Step', 0x22F, 'Ability'),
					new Reward('Slide Dash', 0x108, 'Ability'),
					new Reward('Vicinity Break', 0x232, 'Ability'),
					new Reward('Aerial Sweep', 0x10D, 'Ability'),
					new Reward('Aerial Dive', 0x230, 'Ability'),
					new Reward('Aerial Spiral', 0x10E, 'Ability')
				]
			},
			{
				category: 'Activated Abilities',
				rewards: [
					new Reward('Guard', 0x052, 'Ability'),
					new Reward('Upper Slash', 0x089, 'Ability'),
					new Reward('Horizontal Slash', 0x10F, 'Ability'),
					new Reward('Finishing Leap', 0x10B, 'Ability'),
					new Reward('Retaliating Slash', 0x111, 'Ability'),
					new Reward('Counterguard', 0x10C, 'Ability'),
					new Reward('Trinity Limit', 0x0C6, 'Limit')
				]
			},
			{
				category: 'Combo Finishers',
				rewards: [
					new Reward('Guard Break', 0x109, 'Ability'),
					new Reward('Explosion', 0x10A, 'Ability'),
					new Reward('Aerial Finish', 0x110, 'Ability'),
					new Reward('Magnet Burst', 0x231, 'Ability')
				]
			},
			{
				category: 'Auto Abilities',
				rewards: [
					new Reward('Auto Valor', 0x181, 'Ability'),
					new Reward('Auto Wisdom', 0x182, 'Ability'),
					new Reward('Auto Limit', 0x238, 'Ability'),
					new Reward('Auto Master', 0x183, 'Ability'),
					new Reward('Auto Final', 0x184, 'Ability'),
					new Reward('Auto Summon', 0x185, 'Ability')
				]
			},
			{
				category: 'Boost Abilities',
				rewards: [
					new Reward('Combo Boost', 0x186, 'Ability'),
					new Reward('Air Combo Boost', 0x187, 'Ability'),
					new Reward('Reaction Boost', 0x188, 'Ability'),
					new Reward('Drive Boost', 0x18D, 'Ability'),
					new Reward('Form Boost', 0x18E, 'Ability'),
					new Reward('Summon Boost', 0x18F, 'Ability'),
					new Reward('Combination Boost', 0x190, 'Ability'),
					new Reward('Experience Boost', 0x191, 'Ability'),
					new Reward('Fire Boost', 0x198, 'Ability'),
					new Reward('Blizzard Boost', 0x199, 'Ability'),
					new Reward('Thunder Boost', 0x19A, 'Ability'),
					new Reward('Item Boost', 0x19B, 'Ability')
				]
			},
			{
				category: 'Combo Count Modifiers',
				rewards: [
					new Reward('Combo Plus', 0x0A2, 'Ability'),
					new Reward('Air Combo Plus', 0x0A3, 'Ability'),
					new Reward('Finishing Plus', 0x189, 'Ability'),
					new Reward('Negative Combo', 0x18A, 'Ability'),
					new Reward('Berserk Charge', 0x18B, 'Ability')
				]
			},
			{
				category: 'Sora Only Support Abilities',
				rewards: [
					new Reward('Scan', 0x08A, 'Ability'),
					new Reward('Aerial Recovery', 0x09E, 'Ability'),
					new Reward('Combo Master', 0x21B, 'Ability'),
					new Reward('Damage Drive', 0x18C, 'Ability'),
					new Reward('Leaf Bracer', 0x192, 'Ability'),
					new Reward('Magic Lock-On', 0x193, 'Ability'),
					new Reward('Light & Darkness', 0x21D, 'Ability'),
					new Reward('Drive Converter', 0x21C, 'Ability'),
					new Reward('No Experience', 0x194, 'Ability')
				]
			}
		]
	},
	{
		rewardType: 'Universal Abilities',
		categories: [
			{
				category: 'Party Action Abilities',
				rewards: [
					new Reward('Donald Fire', 0x0A5, 'Ability'),
					new Reward('Donald Blizzard', 0x0A6, 'Ability'),
					new Reward('Donald Thunder', 0x0A7, 'Ability'),
					new Reward('Donald Cure', 0x0A8, 'Ability'),
					new Reward('Goofy Tornado', 0x1A7, 'Ability'),
					new Reward('Goofy Bash', 0x1AD, 'Ability'),
					new Reward('Goofy Turbo', 0x1A9, 'Ability')
				]
			},
			{
				category: 'Limits',
				rewards: [
					new Reward('Fantasia (Comet)', 0x0C7, 'Limit'),
					new Reward('Flare Force (Duck Flare)', 0x0C8, 'Limit'),
					new Reward('Tornado Fusion (Whirli-Goof)', 0x0C9, 'Limit'),
					new Reward('Teamwork (Knocksmash)', 0x0CA, 'Limit')
				]
			},
			{
				category: 'Support Abilities',
				rewards: [
					new Reward('Draw', 0x195, 'Ability'),
					new Reward('Jackpot', 0x196, 'Ability'),
					new Reward('Lucky Lucky', 0x197, 'Ability'),
					new Reward('MP Rage', 0x19C, 'Ability'),
					new Reward('MP Haste', 0x19D, 'Ability'),
					new Reward('MP Hastera', 0x1A5, 'Ability'),
					new Reward('MP Hastega', 0x1A6, 'Ability'),
					new Reward('Defender', 0x19E, 'Ability'),
					new Reward('Damage Control', 0x21E, 'Ability'),
					new Reward('Second Chance', 0x19F, 'Ability'),
					new Reward('Once More', 0x1A0, 'Ability'),
					new Reward('Auto Limit', 0x1A1, 'Ability'),
					new Reward('Auto Change', 0x1A2, 'Ability'),
					new Reward('Hyper Healing', 0x1A3, 'Ability'),
					new Reward('Auto Healing', 0x1A4, 'Ability'),
					new Reward('Protect', 0x254, 'Ability'),
					new Reward('Protectra', 0x255, 'Ability'),
					new Reward('Protectga', 0x256, 'Ability')
				]
			}
		]
	},
	{
		rewardType: 'Equipment',
		categories: [
			{
				category: 'Accessories',
				rewards: [
					new Reward('Ability Ring', 0x008, 'Accessory'),
					new Reward('Engineer\'s Ring', 0x009, 'Accessory'),
					new Reward('Technician\'s Ring', 0x00A, 'Accessory'),
					new Reward('Skill Ring', 0x026, 'Accessory'),
					new Reward('Skillful Ring', 0x027, 'Accessory'),
					new Reward('Expert\'s Ring', 0x00B, 'Accessory'),
					new Reward('Master\'s Ring', 0x022, 'Accessory'),
					new Reward('Cosmic Ring', 0x034, 'Accessory'),
					new Reward('Executive\'s Ring', 0x257, 'Accessory'),
					new Reward('Sardonyx Ring', 0x00C, 'Accessory'),
					new Reward('Tourmaline Ring', 0x00D, 'Accessory'),
					new Reward('Aquamarine Ring', 0x00E, 'Accessory'),
					new Reward('Garnet Ring', 0x00F, 'Accessory'),
					new Reward('Diamond Ring', 0x010, 'Accessory'),
					new Reward('Silver Ring', 0x011, 'Accessory'),
					new Reward('Gold Ring', 0x012, 'Accessory'),
					new Reward('Platinum Ring', 0x013, 'Accessory'),
					new Reward('Mythril Ring', 0x014, 'Accessory'),
					new Reward('Orichalcum Ring', 0x01C, 'Accessory'),
					new Reward('Soldier Earring', 0x028, 'Accessory'),
					new Reward('Fencer Earring', 0x02E, 'Accessory'),
					new Reward('Mage Earring', 0x02F, 'Accessory'),
					new Reward('Slayer Earring', 0x030, 'Accessory'),
					new Reward('Medal', 0x035, 'Accessory'),
					new Reward('Moon Amulet', 0x023, 'Accessory'),
					new Reward('Star Charm', 0x024, 'Accessory'),
					new Reward('Cosmic Arts', 0x038, 'Accessory'),
					new Reward('Shadow Archive', 0x039, 'Accessory'),
					new Reward('Shadow Archive+', 0x03A, 'Accessory'),
					new Reward('Full Bloom', 0x040, 'Accessory'),
					new Reward('Full Bloom+', 0x042, 'Accessory'),
					new Reward('Draw Ring', 0x041, 'Accessory'),
					new Reward('Lucky Ring', 0x03F, 'Accessory')
				]
			},
			{
				category: 'Armor',
				rewards: [
					new Reward('Elven Bandana', 0x043, 'Armor'),
					new Reward('Divine Bandana', 0x044, 'Armor'),
					new Reward('Protect Belt', 0x04E, 'Armor'),
					new Reward('Gaia Belt', 0x04F, 'Armor'),
					new Reward('Power Band', 0x045, 'Armor'),
					new Reward('Buster Band', 0x046, 'Armor'),
					new Reward('Cosmic Belt', 0x06F, 'Armor'),
					new Reward('Fire Bangle', 0x0AD, 'Armor'),
					new Reward('Fira Bangle', 0x0AE, 'Armor'),
					new Reward('Firaga Bangle', 0x0C5, 'Armor'),
					new Reward('Firagun Bangle', 0x11C, 'Armor'),
					new Reward('Blizzard Armlet', 0x11E, 'Armor'),
					new Reward('Blizzara Armlet', 0x11F, 'Armor'),
					new Reward('Blizzaga Armlet', 0x120, 'Armor'),
					new Reward('Blizzagun Armlet', 0x121, 'Armor'),
					new Reward('Thunder Trinket', 0x123, 'Armor'),
					new Reward('Thundara Trinket', 0x124, 'Armor'),
					new Reward('Thundaga Trinket', 0x125, 'Armor'),
					new Reward('Thundagun Trinket', 0x126, 'Armor'),
					new Reward('Shock Charm', 0x084, 'Armor'),
					new Reward('Shock Charm+', 0x085, 'Armor'),
					new Reward('Shadow Anklet', 0x128, 'Armor'),
					new Reward('Dark Anklet', 0x129, 'Armor'),
					new Reward('Midnight Anklet', 0x12A, 'Armor'),
					new Reward('Chaos Anklet', 0x12B, 'Armor'),
					new Reward('Champion Belt', 0x131, 'Armor'),
					new Reward('Abas Chain', 0x12D, 'Armor'),
					new Reward('Aegis Chain', 0x12E, 'Armor'),
					new Reward('Acrisius', 0x12F, 'Armor'),
					new Reward('Acrisius+', 0x133, 'Armor'),
					new Reward('Cosmic Chain', 0x134, 'Armor'),
					new Reward('Petite Ribbon', 0x132, 'Armor'),
					new Reward('Ribbon', 0x130, 'Armor'),
					new Reward('Grand Ribbon', 0x09D, 'Armor')
				]
			}
		]
	},
	{
		rewardType: 'Weapons',
		categories: [
			{
				category: 'Keyblades',
				rewards: [
					new Reward('Kingdom Key', 0x029, 'Keyblade'),
					new Reward('Oathkeeper', 0x02A, 'Keyblade'),
					new Reward('Oblivion', 0x02B, 'Keyblade'),
					new Reward('Star Seeker', 0x1E0, 'Keyblade'),
					new Reward('Hidden Dragon', 0x1E1, 'Keyblade'),
					new Reward('Hero\'s Crest', 0x1E4, 'Keyblade'),
					new Reward('Monochrome', 0x1E5, 'Keyblade'),
					new Reward('Follow the Wind', 0x1E6, 'Keyblade'),
					new Reward('Circle of Life', 0x1E7, 'Keyblade'),
					new Reward('Photon Debugger', 0x1E8, 'Keyblade'),
					new Reward('Gull Wing', 0x1E9, 'Keyblade'),
					new Reward('Rumbling Rose', 0x1EA, 'Keyblade'),
					new Reward('Guardian Soul', 0x1EB, 'Keyblade'),
					new Reward('Wishing Lamp', 0x1EC, 'Keyblade'),
					new Reward('Decisive Pumpkin', 0x1ED, 'Keyblade'),
					new Reward('Sweet Memories', 0x1EF, 'Keyblade'),
					new Reward('Mysterious Abyss', 0x1F0, 'Keyblade'),
					new Reward('Sleeping Lion', 0x1EE, 'Keyblade'),
					new Reward('Bond of Flame', 0x1F2, 'Keyblade'),
					new Reward('Two Become One', 0x21F, 'Keyblade'),
					new Reward('Fatal Crest', 0x1F1, 'Keyblade'),
					new Reward('Fenrir', 0x1F3, 'Keyblade'),
					new Reward('Ultima Weapon', 0x1F4, 'Keyblade'),
					new Reward('Winner\'s Proof', 0x220, 'Keyblade'),
					new Reward('Alpha Weapon', 0x02C, 'Keyblade'),
					new Reward('Omega Weapon', 0x02D, 'Keyblade'),
					new Reward('Pureblood', 0x047, 'Keyblade'),
					new Reward('Kingdom Key D', 0x051, 'Keyblade'),
					new Reward('Struggle Sword', 0x180, 'Keyblade'),
					new Reward('Struggle Hammer', 0x1F5, 'Keyblade'),
					new Reward('Struggle Wand', 0x1F6, 'Keyblade')
				]
			},
			{
				category: 'Goofy\'s Shields',
				rewards: [
					new Reward('Knight\'s Shield', 0x031, 'Goofy'),
					new Reward('Adamant Shield', 0x08B, 'Goofy'),
					new Reward('Chain Gear', 0x08C, 'Goofy'),
					new Reward('Falling Star', 0x08E, 'Goofy'),
					new Reward('Dream Cloud', 0x08F, 'Goofy'),
					new Reward('Knight Defender', 0x090, 'Goofy'),
					new Reward('Ogre Shield', 0x08D, 'Goofy'),
					new Reward('Genji Shield', 0x091, 'Goofy'),
					new Reward('Akashic Record', 0x092, 'Goofy'),
					new Reward('Akashic Record+', 0x259, 'Goofy'),
					new Reward('Nobody Guard', 0x093, 'Goofy'),
					new Reward('Frozen Pride', 0x228, 'Goofy'),
					new Reward('Frozen Pride+', 0x229, 'Goofy'),
					new Reward('Save The King', 0x1E3, 'Goofy'),
					new Reward('Save The King+', 0x1F8, 'Goofy'),
					new Reward('Joyous Mushroom', 0x22A, 'Goofy'),
					new Reward('Joyous Mushroom+', 0x22B, 'Goofy'),
					new Reward('Majestic Mushroom', 0x22C, 'Goofy'),
					new Reward('Majestic Mushroom+', 0x22D, 'Goofy'),
					new Reward('Ultimate Mushroom', 0x22E, 'Goofy'),
					new Reward('Detection Shield', 0x032, 'Goofy'),
					new Reward('Test The King', 0x033, 'Goofy')
				]
			},
			{
				category: 'Donald\'s Staves',
				rewards: [
					new Reward('Mage\'s Staff', 0x04B, 'Donald'),
					new Reward('Hammer Staff', 0x094, 'Donald'),
					new Reward('Victory Bell', 0x095, 'Donald'),
					new Reward('Comet Staff', 0x097, 'Donald'),
					new Reward('Lord\'s Broom', 0x098, 'Donald'),
					new Reward('Wisdom Wand', 0x099, 'Donald'),
					new Reward('Meteor Staff', 0x096, 'Donald'),
					new Reward('Rising Dragon', 0x09A, 'Donald'),
					new Reward('Shaman\'s Relic', 0x09C, 'Donald'),
					new Reward('Shaman\'s Relic+ ', 0x258, 'Donald'),
					new Reward('Nobody Lance', 0x09B, 'Donald'),
					new Reward('Centurion', 0x221, 'Donald'),
					new Reward('Centurion+', 0x222, 'Donald'),
					new Reward('Save The Queen', 0x1E2, 'Donald'),
					new Reward('Save The Queen+', 0x1F7, 'Donald'),
					new Reward('Plain Mushroom', 0x223, 'Donald'),
					new Reward('Plain Mushroom+', 0x224, 'Donald'),
					new Reward('Precious Mushroom', 0x225, 'Donald'),
					new Reward('Precious Mushroom+', 0x226, 'Donald'),
					new Reward('Premium Mushroom', 0x227, 'Donald'),
					new Reward('Staff of Detection', 0x0A1, 'Donald')
				]
			}
		]
	},
	{
		rewardType: 'Items',
		categories: [
			{
				category: 'Battle Consumables',
				rewards: [
					new Reward('Potion', 0x001, 'Consumable'),
					new Reward('Hi-Potion', 0x002, 'Consumable'),
					new Reward('Ether', 0x003, 'Consumable'),
					new Reward('Elixir', 0x004, 'Consumable'),
					new Reward('Mega-Potion', 0x005, 'Consumable'),
					new Reward('Mega-Ether', 0x006, 'Consumable'),
					new Reward('Megalixir', 0x007, 'Consumable')
				]
			},
			{
				category: 'Menu Consumables',
				rewards: [
					new Reward('Tent', 0x083, 'Tent'),
					new Reward('Drive Recovery', 0x112, 'Tent'),
					new Reward('High Drive Recovery', 0x113, 'Tent'),
					new Reward('Power Boost', 0x114, 'Tent'),
					new Reward('Magic Boost', 0x115, 'Tent'),
					new Reward('Defense Boost', 0x116, 'Tent'),
					new Reward('AP Boost', 0x117, 'Tent')
				]
			},
			{
				category: 'Stat Increases',
				rewards: [
					new Reward(0x1CF, 'Item Slot Up', 'Stat'),
					new Reward(0x1D6, 'Max HP Up', 'Stat'),
					new Reward(0x1D7, 'Max MP Up', 'Stat'),
					new Reward(0x1D8, 'Drive Gauge Up', 'Stat'),
					new Reward(0x1D9, 'Armor Slot Up', 'Stat'),
					new Reward(0x1DA, 'Accessory Slot Up', 'Stat')
				]
			},
			{
				category: 'Proofs',
				rewards: [
					new Reward('Proof of Connection', 0x251, 'Connection'),
					new Reward('Proof of Nonexistence', 0x252, 'Nonexistence'),
					new Reward('Proof of Peace', 0x253, 'Peace')
				]
			},
			{
				category: 'Useful Key Items',
				rewards: [
					new Reward('Torn Page', 0x020, 'Pages'),
					new Reward('Munny Pouch (Olette)', 0x16A, 'Key'),
					new Reward('Munny Pouch (Mickey)', 0x217, 'Key'),
					new Reward('Unknown Disk', 0x1CE, 'Key'),
					new Reward('Olympus Stone', 0x172, 'Key'),
					new Reward('Poster', 0x16E, 'Key'),
					new Reward('Promise Charm', 0x20C, 'Promise'),
					new Reward('Hades Cup Trophy', 0x219, 'Key'),
				]
			},
			{
				category: 'Progression Locks',
				rewards: [
					new Reward('Sword of the Ancestor (Mulan)', 0x037, 'Ally'),
					new Reward('Beast\'s Claw (Beast)', 0x03B, 'Ally'),
					new Reward('Battlefields of War (Auron)', 0x036, 'Ally'),
					new Reward('Skill and Crossbones (Jack Sparrow)', 0x03E, 'Ally'),
					new Reward('Scimitar (Aladdin)', 0x048, 'Ally'),
					new Reward('Bone Fist (Jack Skellington)', 0x03C, 'Ally'),
					new Reward('Proud Fang (Simba)', 0x03D, 'Ally'),
					new Reward('Identity Disk (Tron)', 0x04A, 'Ally'),
					new Reward('Way to the Dawn (Riku)', 0x049, 'Ally'),
					new Reward('Tournament Poster', 0x16D, 'Key'),
					new Reward('Membership Card', 0x171, 'Key'),
					new Reward('Ice Cream', 0x177, 'Key'),
					new Reward('Picture', 0x178, 'Key')
				]
			},
			{
				category: 'Useless Key Items',
				rewards: [
					new Reward('Crystal Orb', 0x16B, 'Key'),
					new Reward('Seifer\'s Trophy', 0x16C, 'Key'),
					new Reward('Letter', 0x16F, 'Key'),
					new Reward('Namine\'s Sketches', 0x170, 'Key'),
					new Reward('Auron\'s Statue', 0x173, 'Key'),
					new Reward('Cursed Medallion', 0x174, 'Key'),
					new Reward('Presents', 0x175, 'Key'),
					new Reward('Decoy Presents', 0x176, 'Key'),
					new Reward('"The Struggle" Trophy', 0x21A, 'Key')
				]
			},
			{
				category: 'Secret Reports',
				rewards: [
					new Reward('Secret Ansem\'s Report 1', 0x0E2, 'Report'),
					new Reward('Secret Ansem\'s Report 2', 0x0E3, 'Report'),
					new Reward('Secret Ansem\'s Report 3', 0x0E4, 'Report'),
					new Reward('Secret Ansem\'s Report 4', 0x0E5, 'Report'),
					new Reward('Secret Ansem\'s Report 5', 0x0E6, 'Report'),
					new Reward('Secret Ansem\'s Report 6', 0x0E7, 'Report'),
					new Reward('Secret Ansem\'s Report 7', 0x0E8, 'Report'),
					new Reward('Secret Ansem\'s Report 8', 0x0E9, 'Report'),
					new Reward('Secret Ansem\'s Report 9', 0x0EA, 'Report'),
					new Reward('Secret Ansem\'s Report 10', 0x0EB, 'Report'),
					new Reward('Secret Ansem\'s Report 11', 0x0EC, 'Report'),
					new Reward('Secret Ansem\'s Report 12', 0x0ED, 'Report'),
					new Reward('Secret Ansem\'s Report 13', 0x0EE, 'Report')
				]
			}
		]
	},
	{
		rewardType: 'Maps & Recipes',
		categories: [
			{
				category: 'Area Maps',
				rewards: [
					// new Reward('Navigational Map', 0x059, 'Map'),
					// new Reward('DH Map', 0x216, 'Map'),
					new Reward('Tower Map', 0x215, 'Map'),
					new Reward('Twilight Town Map', 0x0FF, 'Map'),
					new Reward('Sunset Hill Map', 0x213, 'Map'),
					new Reward('Mansion Map', 0x214, 'Map'),
					new Reward('Castle Perimeter Map', 0x201, 'Map'),
					new Reward('The Great Maw Map', 0x202, 'Map'),
					new Reward('Marketplace Map', 0x0FD, 'Map'),
					new Reward('Dark Remembrance Map', 0x24A, 'Map'),
					new Reward('Depths of Remembrance Map', 0x24E, 'Map'),
					new Reward('Garden of Assemblage Map', 0x250, 'Map'),
					new Reward('Castle Map', 0x05A, 'Map'),
					new Reward('Basement Map', 0x05B, 'Map'),
					new Reward('Castle Walls Map', 0x05C, 'Map'),
					new Reward('Underworld Map', 0x087, 'Map'),
					new Reward('Caverns Map', 0x088, 'Map'),
					new Reward('Coliseum Map', 0x086, 'Map'),
					new Reward('Cave of Wonders Map', 0x079, 'Map'),
					new Reward('Ruins Map', 0x07A, 'Map'),
					new Reward('Agrabah Map', 0x078, 'Map'),
					new Reward('Palace Map', 0x082, 'Map'),
					new Reward('Encampment Area Map', 0x070, 'Map'),
					new Reward('Village Area Map', 0x071, 'Map'),
					new Reward('100 Acre Wood Map', 0x07D, 'Map'),
					new Reward('Piglet\'s House Map', 0x07F, 'Map'),
					new Reward('Rabbit\'s House Map', 0x07E, 'Map'),
					new Reward('Kanga\'s House Map', 0x080, 'Map'),
					new Reward('Spooky Cave Map', 0x081, 'Map'),
					new Reward('Starry Hill Map', 0x07C, 'Map'),
					new Reward('Savannah Map', 0x200, 'Map'),
					new Reward('Pride Rock Map', 0x0FC, 'Map'),
					new Reward('Oasis Map', 0x1FF, 'Map'),
					new Reward('Undersea Kingdom Map', 0x07B, 'Map'),
					new Reward('Disney Castle Map', 0x077, 'Map'),
					new Reward('Cornerstone Hill Map', 0x072, 'Map'),
					new Reward('Window of Time Map', 0x206, 'Map'),
					new Reward('Window of Time Map?', 0x073, 'Map'),
					new Reward('Lilliput Map', 0x074, 'Map'),
					new Reward('Building Site Map', 0x075, 'Map'),
					new Reward('Mickey\'s House Map', 0x076, 'Map'),
					new Reward('Halloween Town Map', 0x0FA, 'Map'),
					new Reward('Christmas Town Map', 0x1FD, 'Map'),
					new Reward('Curly Hill Map', 0x1FE, 'Map'),
					new Reward('Naval Map', 0x0FB, 'Map'),
					new Reward('Isla de Muerta Map', 0x1FB, 'Map'),
					new Reward('Ship Graveyard Map', 0x1FC, 'Map'),
					new Reward('The Interceptor Map', 0x1F9, 'Map'),
					new Reward('The Black Pearl Map', 0x1FA, 'Map'),
					new Reward('Pit Cell Area Map', 0x0FE, 'Map'),
					new Reward('I/O Tower Map', 0x203, 'Map'),
					new Reward('Central Computer Core Map', 0x204, 'Map'),
					new Reward('Solar Sailer Simulation Map', 0x205, 'Map'),
					new Reward('Dark City Map', 0x100, 'Map'),
					new Reward('Castle That Never Was Map', 0x218, 'Map')
				]
			},
			{
				category: 'Recipes',
				rewards: [
					new Reward('Mega-Recipe', 0x17E, 'Recipe'),
					new Reward('Star Recipe', 0x1C1, 'Recipe'),
					new Reward('Recovery Recipe', 0x1C2, 'Recipe'),
					new Reward('Skill Recipe', 0x1C3, 'Recipe'),
					new Reward('Guard Recipe', 0x1C4, 'Recipe'),
					new Reward('Road to Discovery', 0x1D0, 'Recipe'),
					new Reward('Strength Beyond Strength', 0x1D1, 'Recipe'),
					new Reward('Book of Shadows', 0x1D2, 'Recipe'),
					new Reward('Cloaked Thunder', 0x1D3, 'Recipe'),
					new Reward('Eternal Blossom', 0x1D4, 'Recipe'),
					new Reward('Rare Document', 0x1D5, 'Recipe'),
					new Reward('Style Recipe', 0x1DB, 'Recipe'),
					new Reward('Moon Recipe', 0x1DC, 'Recipe'),
					new Reward('Queen Recipe', 0x1DD, 'Recipe'),
					new Reward('King Recipe', 0x1DE, 'Recipe'),
					new Reward('Ultimate Recipe', 0x1DF, 'Recipe')
				]
			}
		]
	},
	{
		rewardType: 'Forms, Summons, & Magic',
		categories: [
			{
				category: 'Valor',
				rewards: [
					new Reward('Valor Form', 0x01A, 'Form'),
					new Reward('High Jump LV1', 0x05E, 'HighJump'),
					new Reward('High Jump LV2', 0x05F, 'HighJump'),
					new Reward('High Jump LV3', 0x060, 'HighJump'),
					new Reward('High Jump MAX', 0x061, 'HighJump')
				]
			},
			{
				category: 'Wisdom',
				rewards: [
					new Reward('Wisdom Form', 0x01B, 'Form'),
					new Reward('Quick Run LV1', 0x062, 'QuickRun'),
					new Reward('Quick Run LV2', 0x063, 'QuickRun'),
					new Reward('Quick Run LV3', 0x064, 'QuickRun'),
					new Reward('Quick Run MAX', 0x065, 'QuickRun')
				]
			},
			{
				category: 'Limit',
				rewards: [
					new Reward('Limit Form', 0x233, 'Form'),
					new Reward('Dodge Roll LV1', 0x234, 'DodgeRoll'),
					new Reward('Dodge Roll LV2', 0x235, 'DodgeRoll'),
					new Reward('Dodge Roll LV3', 0x236, 'DodgeRoll'),
					new Reward('Dodge Roll MAX', 0x237, 'DodgeRoll')
				]
			},
			{
				category: 'Master',
				rewards: [
					new Reward('Master Form', 0x01F, 'Form'),
					new Reward('Aerial Dodge LV1', 0x066, 'AerialDodge'),
					new Reward('Aerial Dodge LV2', 0x067, 'AerialDodge'),
					new Reward('Aerial Dodge LV3', 0x068, 'AerialDodge'),
					new Reward('Aerial Dodge MAX', 0x069, 'AerialDodge')
				]
			},
			{
				category: 'Final',
				rewards: [
					new Reward('Final Form', 0x01D, 'Form'),
					new Reward('Glide LV1', 0x06A, 'Glide'),
					new Reward('Glide LV2', 0x06B, 'Glide'),
					new Reward('Glide LV3', 0x06C, 'Glide'),
					new Reward('Glide MAX', 0x06D, 'Glide')
				]
			},
			{
				category: 'Anti',
				rewards: [
					new Reward('Anti Form', 0x01E, 'Form')
				]
			},
			{
				category: 'Summons',
				rewards: [
					new Reward('Baseball Charm', 0x17F, 'Charm'),
					new Reward('Ukulele Charm', 0x019, 'Charm'),
					new Reward('Lamp Charm', 0x09F, 'Charm'),
					new Reward('Feather Charm', 0x0A0, 'Charm')
				]
			},
			{
				category: 'Magic Spells',
				rewards: [
					new Reward('Fire', 0x015, 'Spell'),
					new Reward('Blizzard', 0x016, 'Spell'),
					new Reward('Thunder', 0x017, 'Spell'),
					new Reward('Cure', 0x018, 'Spell'),
					new Reward('Magnet', 0x057, 'Spell'),
					new Reward('Reflect', 0x058, 'Spell')
				]
			}
		]
	},
	{
		rewardType: 'Synthesis Materials',
		categories: [
			{
				category: 'Synthesis Materials',
				rewards: [
					new Reward('Blazing Shard', 0x13D, 'Synthesis'),
					new Reward('Blazing Stone', 0x13E, 'Synthesis'),
					new Reward('Blazing Gem', 0x13F, 'Synthesis'),
					new Reward('Blazing Crystal', 0x140, 'Synthesis'),
					new Reward('Frost Shard', 0x17A, 'Synthesis'),
					new Reward('Frost Stone', 0x17B, 'Synthesis'),
					new Reward('Frost Gem', 0x17C, 'Synthesis'),
					new Reward('Frost Crystal', 0x17D, 'Synthesis'),
					new Reward('Lightning Shard', 0x145, 'Synthesis'),
					new Reward('Lightning Stone', 0x146, 'Synthesis'),
					new Reward('Lightning Gem', 0x147, 'Synthesis'),
					new Reward('Lightning Crystal', 0x148, 'Synthesis'),
					new Reward('Lucid Shard', 0x14D, 'Synthesis'),
					new Reward('Lucid Stone', 0x14E, 'Synthesis'),
					new Reward('Lucid Gem', 0x14F, 'Synthesis'),
					new Reward('Lucid Crystal', 0x150, 'Synthesis'),
					new Reward('Power Shard', 0x149, 'Synthesis'),
					new Reward('Power Stone', 0x14A, 'Synthesis'),
					new Reward('Power Gem', 0x14B, 'Synthesis'),
					new Reward('Power Crystal', 0x14C, 'Synthesis'),
					new Reward('Dark Shard', 0x118, 'Synthesis'),
					new Reward('Dark Stone', 0x119, 'Synthesis'),
					new Reward('Dark Gem', 0x11A, 'Synthesis'),
					new Reward('Dark Crystal', 0x11B, 'Synthesis'),
					new Reward('Dense Shard', 0x151, 'Synthesis'),
					new Reward('Dense Stone', 0x152, 'Synthesis'),
					new Reward('Dense Gem', 0x153, 'Synthesis'),
					new Reward('Dense Crystal', 0x154, 'Synthesis'),
					new Reward('Twilight Shard', 0x155, 'Synthesis'),
					new Reward('Twilight Stone', 0x156, 'Synthesis'),
					new Reward('Twilight Gem', 0x157, 'Synthesis'),
					new Reward('Twilight Crystal', 0x158, 'Synthesis'),
					new Reward('Mythril Shard', 0x159, 'Synthesis'),
					new Reward('Mythril Stone', 0x15A, 'Synthesis'),
					new Reward('Mythril Gem', 0x15B, 'Synthesis'),
					new Reward('Mythril Crystal', 0x15C, 'Synthesis'),
					new Reward('Remembrance Shard', 0x240, 'Synthesis'),
					new Reward('Remembrance Stone', 0x241, 'Synthesis'),
					new Reward('Remembrance Gem', 0x242, 'Synthesis'),
					new Reward('Remembrance Crystal', 0x243, 'Synthesis'),
					new Reward('Tranquility Shard', 0x244, 'Synthesis'),
					new Reward('Tranquility Stone', 0x245, 'Synthesis'),
					new Reward('Tranquility Gem', 0x246, 'Synthesis'),
					new Reward('Tranquility Crystal', 0x247, 'Synthesis'),
					new Reward('Bright Shard', 0x15D, 'Synthesis'),
					new Reward('Bright Stone', 0x15E, 'Synthesis'),
					new Reward('Bright Gem', 0x15F, 'Synthesis'),
					new Reward('Bright Crystal', 0x160, 'Synthesis'),
					new Reward('Energy Shard', 0x161, 'Synthesis'),
					new Reward('Energy Stone', 0x162, 'Synthesis'),
					new Reward('Energy Gem', 0x163, 'Synthesis'),
					new Reward('Energy Crystal', 0x164, 'Synthesis'),
					new Reward('Serenity Shard', 0x165, 'Synthesis'),
					new Reward('Serenity Stone', 0x166, 'Synthesis'),
					new Reward('Serenity Gem', 0x167, 'Synthesis'),
					new Reward('Serenity Crystal', 0x168, 'Synthesis'),
					new Reward('Lost Illusion', 0x248, 'Synthesis'),
					new Reward('Manifest Illusion', 0x249, 'Synthesis'),
					new Reward('Orichalcum', 0x179, 'Synthesis'),
					new Reward('Orichalcum+', 0x169, 'Synthesis')
				]
			}
		]
	},
	{
		rewardType: 'EMPTY',
		categories: [
			{
				category: 'EMPTY',
				rewards: [
					new Reward('EMPTY', 0x000, 'EMPTY')
				]
			}
		]
	}
]