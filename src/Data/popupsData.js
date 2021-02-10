import { Reward } from './rewardsData'

export class Popup {
	constructor(popup, vanilla, address) {
		this.popup = popup
		this.vanillaReward = vanilla
		this.replacementReward = vanilla
		this.vanillaAddress = address
		this.isAbility = false
		this.toBeReplaced = false
		this.isReplaced = false
	}
}

export const popupsData = [
	{
		world: 'Agrabah',
		popups: [
			new Popup('Agrabah Map', new Reward('Agrabah Map', 0x0078), 0x11CE0792),
			new Popup('Beating Agrabah 1', new Reward('Lamp Charm', 0x009F), 0x11CE079E),
			new Popup('Beating Agrabah 2', new Reward('Wishing Lamp', 0x01EC), 0x11CE08B2),
			new Popup('Lexaeus (Absent Silhouette)', new Reward('Strength Beyond Strength', 0x01D1), 0x11CE0A4A),
			new Popup('Lexaeus (Data)', new Reward('Lost Illusion', 0x0248), 0x11CE0A86)
		]
	},
	{
		world: 'Atlantica',
		popups: [
			new Popup('Undersea Kingdom Map', new Reward('Undersea Kingdom Map', 0x007B), 0x11CE0846),
			new Popup('Beating Atlantica (Mysterious Abyss)', new Reward('Mysterious Abyss', 0x01F0), 0x11CE08E2),
			new Popup('Blizzard', new Reward('Blizzard', 0x0016), 0x11CE08EE),
			new Popup('Beating Atlantica (Orichalcum+)', new Reward('Orichalcum+', 0x0169), 0x11CE08FA)
		]
	},
	{
		world: 'Beast\'s Castle',
		popups: [
			new Popup('Beating Beast\'s Castle 1', new Reward('Cure', 0x0018), 0x11CE06F6),
			new Popup('Encouraging Beast', new Reward('Rumbling Rose', 0x01EA), 0x11CE0852),
			new Popup('Castle Walls Map', new Reward('Castle Walls Map', 0x005C), 0x11CE085E),
			new Popup('Xaldin', new Reward('Secret Ansem\'s Report 4', 0x00E5), 0x11CE09C6),
			new Popup('Xaldin (Data)', new Reward('Defense Boost', 0x0116), 0x11CE0AC2)
		]
	},
	{
		world: 'Cavern of Remembrance',
		popups: []
	},
	{
		world: 'Disney Castle',
		popups: [
			new Popup('Disney Castle Map', new Reward('Disney Castle Map', 0x0077), 0x11CE0756),
			new Popup('Proof of Connection', new Reward('Proof of Connection', 0x0251), 0x11CE0B16),
			new Popup('Manifest Illusion', new Reward('Manifest Illusion', 0x0249), 0x11CE0B22),
			new Popup('Marluxia (Absent Silhouette)', new Reward('Eternal Blossom', 0x01D4), 0x11CE0A6E),
			new Popup('Marluxia (Data)', new Reward('Lost Illusion', 0x0248), 0x11CE0AAA)
		]
	},
	{
		world: 'Halloween Town',
		popups: [
			new Popup('Beating Halloween Town 1', new Reward('Magnet', 0x0057), 0x11CE07AA),
			new Popup('Present', new Reward('Present', 0x0175), 0x11CE08BE),
			new Popup('Decoy Presents', new Reward('Decoy Presents', 0x0176), 0x11CE08CA),
			new Popup('Beating Halloween Town 2', new Reward('Decisive Pumpkin', 0x01ED), 0x11CE08D6),
			new Popup('Vexen (Absent Silhouette)', new Reward('Road to Discovery', 0x01D0), 0x11CE0A3E),
			new Popup('Vexen (Data)', new Reward('Lost Illusion', 0x0248), 0x11CE0A7A)
		]
	},
	{
		world: 'Hollow Bastion',
		popups: [
			new Popup('Marketplace Map', new Reward('Marketplace Map', 0x00FD), 0x11CE068A),
			new Popup('Membership Card', new Reward('Membership Card', 0x0171), 0x11CE0696),
			new Popup('First Visit to Merlin\'s', new Reward('Blizzard', 0x0016), 0x11CE06A2),
			new Popup('Bailey Nobodies', new Reward('Secret Ansem\'s Report 7', 0x00E8), 0x11CE09EA),
			new Popup('100 Acre Woods First Visit', new Reward('Baseball Charm', 0x017F), 0x11CE0702),
			new Popup('Finding the DTD Password', new Reward('Master Form', 0x001F), 0x11CE080A),
			new Popup('Cure', new Reward('Cure', 0x0018), 0x11CE0822),
			new Popup('1,000 Heartless', new Reward('Secret Ansem\'s Report 1', 0x00E2), 0x11CE09A2),
			new Popup('Ice Cream', new Reward('Ice Cream', 0x0177), 0x11CE082E),
			new Popup('Picture', new Reward('Picture', 0x0178), 0x11CE083A),
			new Popup('Ansem\'s Study during MCP Takeover', new Reward('Sleeping Lion', 0x01EE), 0x11CE0936),
			new Popup('Approaching Sephiroh after talking to Cloud', new Reward('Fenrir', 0x01F3), 0x11CE0942),
			new Popup('Mushroom XIII (Proof of Peace)', new Reward('Proof of Peace', 0x0253), 0x11CE0B3A),
			new Popup('Mushroom XIII (Winner\'s Proof)', new Reward('Winner\'s Proof', 0x0220), 0x11CE0B2E),
			new Popup('Demyx (Data)', new Reward('AP Boost', 0x0117), 0x11CE0AB6)
		]
	},
	{
		world: 'Land of Dragons',
		popups: [
			new Popup('Encampment Area Map', new Reward('Encampment Area Map', 0x0070), 0x11CE06D2),
			new Popup('AP Boost (Missions)', new Reward('AP Boost', 0x0117), 0x11CE06C6),
			new Popup('Village Area Map', new Reward('Village Area Map', 0x0071), 0x11CE06DE),
			new Popup('Beating Land of Dragons 1', new Reward('Hidden Dragon', 0x01E1), 0x11CE06EA),
			new Popup('Xigbar (Data)', new Reward('Defense Boost', 0x0116), 0x11CE0AE6)
		]
	},
	{
		world: 'Olympus Coliseum',
		popups: [
			new Popup('Coliseum Map', new Reward('Coliseum Map', 0x0086), 0x11CE070E),
			new Popup('Olympus Stone', new Reward('Olympus Stone', 0x0172), 0x11CE071A),
			new Popup('OC Demyx', new Reward('Secret Ansem\'s Report 5', 0x00E6), 0x11CE09D2),
			new Popup('Beating Olympus Coliseum 1', new Reward('Hero\'s Crest', 0x01E4), 0x11CE0726),
			new Popup('Auron\'s Statue', new Reward('Auron\'s Statue', 0x0173), 0x11CE0882),
			new Popup('Beating Olympus Coliseum 2', new Reward('Guardian Soul', 0x01EB), 0x11CE088E),
			new Popup('Zexion (Absent Silhouette)', new Reward('Book of Shadows', 0x01D2), 0x11CE0A56),
			new Popup('Zexion (Data)', new Reward('Lost Illusion', 0x0248), 0x11CE0A92)
		]
	},
	{
		world: 'Olympus Cups',
		popups: [
			new Popup('Protect Belt (Pain & Panic Cup)', new Reward('Protect Belt', 0x004E), 0x11CE073E),
			new Popup('Serenity Gem (Pain & Panic Cup)', new Reward('Serenity Gem', 0x0167), 0x11CE074A),
			new Popup('Rising Dragon (Cerberus Cup)', new Reward('Rising Dragon', 0x009A), 0x11CE07CE),
			new Popup('Serenity Crystal (Cerberus Cup)', new Reward('Serenity Crystal', 0x0168), 0x11CE07DA),
			new Popup('Genji Shield (Titan Cup)', new Reward('Genji Shield', 0x0091), 0x11CE089A),
			new Popup('Skillful Ring (Titan Cup)', new Reward('Skillful Ring', 0x0027), 0x11CE08A6),
			new Popup('Fatal Crest (Goddess of Fate Cup)', new Reward('Fatal Crest', 0x01F1), 0x11CE094E),
			new Popup('Orichalcum+ (Goddess of Fate Cup)', new Reward('Orichalcum+', 0x0169), 0x11CE095A),
			new Popup('Hades Cup', new Reward('Hades Cup Trophy', 0x0219), 0x11CE0996)
		]
	},
	{
		world: '100 Acre Wood',
		popups: [
			new Popup('Finish the Spooky Cave', new Reward('Sweet Memories', 0x01EF), 0x11CE0906),
			new Popup('Spooky Cave Map', new Reward('Spooky Cave Map', 0x0081), 0x11CE0912),
			new Popup('Beating 100 Acre Woods (Cure)', new Reward('Cure', 0x0018), 0x11CE091E),
			new Popup('Beating 100 Acre Woods (Orichalcum+)', new Reward('Orichalcum+', 0x0169), 0x11CE092A)
		]
	},
	{
		world: 'Port Royal',
		popups: [
			new Popup('Isla de Muerta Map', new Reward('Isla de Muerta Map', 0x01FB), 0x11CE077A),
			new Popup('Beating Port Royal 1', new Reward('Follow the Wind', 0x01E6), 0x11CE0786),
			new Popup('Cursed Medallion', new Reward('Cursed Medallion', 0x0174), 0x11CE086A),
			new Popup('Ship Graveyard Map', new Reward('Ship Graveyard Map', 0x01FC), 0x11CE0876),
			new Popup('Grim Reaper 2', new Reward('Secret Ansem\'s Report 6', 0x00E7), 0x11CE09DE),
			new Popup('Luxord (Data)', new Reward('AP Boost', 0x0117), 0x11CE0AFE)
		]
	},
	{
		world: 'Pride Lands',
		popups: [
			new Popup('Cheer Up Simba', new Reward('Circle of Life', 0x01E7), 0x11CE07B6),
			new Popup('Beating Pride Lands 1', new Reward('Fire', 0x0015), 0x11CE07C2),
			new Popup('Saix (Data)', new Reward('Defense Boost', 0x0116), 0x11CE0AF2)
		]
	},
	{
		world: 'Simulated Twilight Town',
		popups: [
			new Popup('Twilight Town Map', new Reward('Twilight Town Map', 0x00FF), 0x11CE0636),
			new Popup('Munny Pouch (Olette)', new Reward('Munny Pouch (Olette)', 0x016A), 0x11CE0606),
			new Popup('Setzer Victory', new Reward('Champion Belt', 0x0131), 0x11CE0612),
			new Popup('Setzer Loss', new Reward('Medal', 0x0035), 0x11CE061E),
			new Popup('"The Struggle" Trophy', new Reward('"The Struggle" Trophy', 0x021A), 0x11CE062A),
			new Popup('Namine\'s Sketches', new Reward('Namine\'s Sketches', 0x0170), 0x11CE0642),
			new Popup('Mansion Map', new Reward('Mansion Map', 0x0214), 0x11CE064E),
			new Popup('Roxas (Data)', new Reward('Magic Boost', 0x0115), 0x11CE0B0A)
		]
	},
	{
		world: 'Space Paranoids',
		popups: [
			new Popup('Beating Space Paranoids 1', new Reward('Photon Debugger', 0x01E8), 0x11CE0816),
			new Popup('Larxene (Absent Silhouette)', new Reward('Cloaked Thunder', 0x01D3), 0x11CE0A62),
			new Popup('Larxene (Data)', new Reward('Lost Illusion', 0x0248), 0x11CE0A9E)
		]
	},
	{
		world: 'Timeless River',
		popups: [
			new Popup('Window of Time Map', new Reward('Window of Time Map', 0x0206), 0x11CE076E),
			new Popup('Beating Timeless River (Monochrome)', new Reward('Monochrome', 0x01E5), 0x11CE0732),
			new Popup('Beating Timeless River (Wisdom Form)', new Reward('Wisdom Form', 0x001B), 0x11CE0762)
		]
	},
	{
		world: 'Twilight Town',
		popups: [
			new Popup('Munny Pouch (Mickey)', new Reward('Munny Pouch (Mickey)', 0x0217), 0x11CE065A),
			new Popup('Crystal Orb', new Reward('Crystal Orb', 0x016B), 0x11CE0666),
			new Popup('New Outfit (Star Seeker)', new Reward('Star Seeker', 0x01E0), 0x11CE0672),
			new Popup('New Outfit (Valor Form)', new Reward('Valor Form', 0x001A), 0x11CE067E),
			new Popup('Seifer\'s Trophy', new Reward('Seifer\'s Trophy', 0x016C), 0x11CE07E6),
			new Popup('Beating Twilight Town 1 (Oathkeeper)', new Reward('Oathkeeper', 0x002A), 0x11CE07F2),
			new Popup('Beating Twilight Town 1 (Limit Form)', new Reward('Limit Form', 0x0233), 0x11CE07FE),
			new Popup('After Betwixt and Between fight', new Reward('Bond of Flame', 0x01F2), 0x11CE0966),
			new Popup('Station Plaza Nobodies', new Reward('Secret Ansem\'s Report 2', 0x00E3), 0x11CE09AE),
			new Popup('Twilight Town 3', new Reward('Secret Ansem\'s Report 10', 0x00EB), 0x11CE0A0E),
			new Popup('Axel (Data)', new Reward('Magic Boost', 0x0115), 0x11CE0ACE)
		]
	},
	{
		world: 'The World That Never Was',
		popups: [
			new Popup('Defeating Roxas', new Reward('Two Become One', 0x021F), 0x11CE0972),
			new Popup('Riku joins the party', new Reward('Oblivion', 0x002B), 0x11CE097E),
			new Popup('Castle That Never Was Map', new Reward('Castle That Never Was Map', 0x0218), 0x11CE098A),
			new Popup('Xigbar', new Reward('Secret Ansem\'s Report 3', 0x00E4), 0x11CE09BA),
			new Popup('Roxas', new Reward('Secret Ansem\'s Report 8', 0x00E9), 0x11CE09F6),
			new Popup('Luxord', new Reward('Secret Ansem\'s Report 9', 0x00EA), 0x11CE0A02),
			new Popup('Before Xemnas 1', new Reward('Secret Ansem\'s Report 11', 0x00EC), 0x11CE0A1A),
			new Popup('Saix', new Reward('Secret Ansem\'s Report 12', 0x00ED), 0x11CE0A26),
			new Popup('Xemnas 1', new Reward('Secret Ansem\'s Report 13', 0x00EE), 0x11CE0A32),
			new Popup('Xemnas (Data)', new Reward('Power Boost', 0x0114), 0x11CE0ADA)
		]
	}
]