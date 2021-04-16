import { Reward } from './rewardsData'

export class Popup {
	constructor(popup, vanilla, address) {
		this.popup = popup
		this.vanillaReward = { ...vanilla }
		this.replacementReward = { ...vanilla }
		this.vanillaAddress = address
		this.toBeReplaced = false

		this.isReplaced = () => {
			return this.replacementReward.index !== this.vanillaReward.index
		}
		this.isAbility = () => {
			return this.replacementReward.iconType === 'Ability'
		}
		this.copy = () => {
			let ret = this.vanilla()
			ret.replacementReward = { ...this.replacementReward }
			return ret
		}
		this.vanilla = () => {
			return new Popup(this.popup, new Reward(this.vanillaReward.reward, this.vanillaReward.index, this.vanillaReward.iconType), this.vanillaAddress)
		}
		this.replace = (newPopupData) => {
			let ret = this.copy()
			ret.replacementReward = { ...newPopupData.reward }
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
		this.loadFromJSON = (popupJSON) => {
			let ret = this.copy()
			ret.replacementReward = { ...popupJSON.replacementReward }
			ret.toBeReplaced = false
			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ''
			if (this.isReplaced()) {
				ret += 'patch=1,EE,1' + this.vanillaAddress.toString(16).toUpperCase().padStart(7, '0') + ',extended,0000'
				ret += this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // ' + this.popup + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ''
			if (this.isReplaced()) {
				let address = this.vanillaAddress - 0x1CCB300
				ret += '\tWriteShort(Sys3+0x' + address.toString(16).toUpperCase() + ',0x' + this.replacementReward.index.toString(16).toUpperCase() + ')'
				if (isCommented) ret += ' -- ' + this.popup + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
	}
}

export const popupsData = [
	{
		world: 'Agrabah',
		popups: [
			new Popup('Agrabah Map', new Reward('Agrabah Map', 0x0078, 'Map'), 0x1CE0792),
			new Popup('Beating Agrabah 1', new Reward('Lamp Charm', 0x009F, 'Charm'), 0x1CE079E),
			new Popup('Beating Agrabah 2', new Reward('Wishing Lamp', 0x01EC, 'Keyblade'), 0x1CE08B2),
			new Popup('Lexaeus (Absent Silhouette)', new Reward('Strength Beyond Strength', 0x01D1, 'Recipe'), 0x1CE0A4A),
			new Popup('Lexaeus (Data)', new Reward('Lost Illusion', 0x0248, 'Synthesis'), 0x1CE0A86)
		]
	},
	{
		world: 'Atlantica',
		popups: [
			new Popup('Undersea Kingdom Map', new Reward('Undersea Kingdom Map', 0x007B, 'Map'), 0x1CE0846),
			new Popup('Beating Atlantica (Mysterious Abyss)', new Reward('Mysterious Abyss', 0x01F0, 'Keyblade'), 0x1CE08E2),
			new Popup('Blizzard', new Reward('Blizzard', 0x0016, 'Spell'), 0x1CE08EE),
			new Popup('Beating Atlantica (Orichalcum+)', new Reward('Orichalcum+', 0x0169, 'Synthesis'), 0x1CE08FA)
		]
	},
	{
		world: 'Beast\'s Castle',
		popups: [
			new Popup('Beating Beast\'s Castle 1', new Reward('Cure', 0x0018, 'Spell'), 0x1CE06F6),
			new Popup('Encouraging Beast', new Reward('Rumbling Rose', 0x01EA, 'Keyblade'), 0x1CE0852),
			new Popup('Castle Walls Map', new Reward('Castle Walls Map', 0x005C, 'Map'), 0x1CE085E),
			new Popup('Xaldin', new Reward('Secret Ansem\'s Report 4', 0x00E5, 'Report'), 0x1CE09C6),
			new Popup('Xaldin (Data)', new Reward('Defense Boost', 0x0116, 'Tent'), 0x1CE0AC2)
		]
	},
	{
		world: 'Cavern of Remembrance',
		popups: []
	},
	{
		world: 'Disney Castle',
		popups: [
			new Popup('Disney Castle Map', new Reward('Disney Castle Map', 0x0077, 'Map'), 0x1CE0756),
			new Popup('Proof of Connection', new Reward('Proof of Connection', 0x0251, 'Connection'), 0x1CE0B16),
			new Popup('Manifest Illusion', new Reward('Manifest Illusion', 0x0249, 'Synthesis'), 0x1CE0B22),
			new Popup('Marluxia (Absent Silhouette)', new Reward('Eternal Blossom', 0x01D4, 'Recipe'), 0x1CE0A6E),
			new Popup('Marluxia (Data)', new Reward('Lost Illusion', 0x0248, 'Synthesis'), 0x1CE0AAA)
		]
	},
	{
		world: 'Halloween Town',
		popups: [
			new Popup('Beating Halloween Town 1', new Reward('Magnet', 0x0057, 'Spell'), 0x1CE07AA),
			new Popup('Present', new Reward('Present', 0x0175, 'Key'), 0x1CE08BE),
			new Popup('Decoy Presents', new Reward('Decoy Presents', 0x0176, 'Key'), 0x1CE08CA),
			new Popup('Beating Halloween Town 2', new Reward('Decisive Pumpkin', 0x01ED, 'Keyblade'), 0x1CE08D6),
			new Popup('Vexen (Absent Silhouette)', new Reward('Road to Discovery', 0x01D0, 'Recipe'), 0x1CE0A3E),
			new Popup('Vexen (Data)', new Reward('Lost Illusion', 0x0248, 'Synthesis'), 0x1CE0A7A)
		]
	},
	{
		world: 'Hollow Bastion',
		popups: [
			new Popup('Marketplace Map', new Reward('Marketplace Map', 0x00FD, 'Map'), 0x1CE068A),
			new Popup('Membership Card', new Reward('Membership Card', 0x0171, 'Key'), 0x1CE0696),
			new Popup('First Visit to Merlin\'s', new Reward('Blizzard', 0x0016, 'Spell'), 0x1CE06A2),
			new Popup('Bailey Nobodies', new Reward('Secret Ansem\'s Report 7', 0x00E8, 'Report'), 0x1CE09EA),
			new Popup('100 Acre Woods First Visit', new Reward('Baseball Charm', 0x017F, 'Charm'), 0x1CE0702),
			new Popup('Finding the DTD Password', new Reward('Master Form', 0x001F, 'Form'), 0x1CE080A),
			new Popup('Cure', new Reward('Cure', 0x0018, 'Spell'), 0x1CE0822),
			new Popup('1,000 Heartless', new Reward('Secret Ansem\'s Report 1', 0x00E2, 'Report'), 0x1CE09A2),
			new Popup('Ice Cream', new Reward('Ice Cream', 0x0177, 'Key'), 0x1CE082E),
			new Popup('Picture', new Reward('Picture', 0x0178, 'Key'), 0x1CE083A),
			new Popup('Ansem\'s Study during MCP Takeover', new Reward('Sleeping Lion', 0x01EE, 'Keyblade'), 0x1CE0936),
			new Popup('Approaching Sephiroh after talking to Cloud', new Reward('Fenrir', 0x01F3, 'Keyblade'), 0x1CE0942),
			new Popup('Mushroom XIII (Proof of Peace)', new Reward('Proof of Peace', 0x0253, 'Peace'), 0x1CE0B3A),
			new Popup('Mushroom XIII (Winner\'s Proof)', new Reward('Winner\'s Proof', 0x0220, 'Keyblade'), 0x1CE0B2E),
			new Popup('Demyx (Data)', new Reward('AP Boost', 0x0117, 'Tent'), 0x1CE0AB6)
		]
	},
	{
		world: 'Land of Dragons',
		popups: [
			new Popup('Encampment Area Map', new Reward('Encampment Area Map', 0x0070, 'Map'), 0x1CE06D2),
			new Popup('AP Boost (Missions)', new Reward('AP Boost', 0x0117, 'Tent'), 0x1CE06C6),
			new Popup('Village Area Map', new Reward('Village Area Map', 0x0071, 'Map'), 0x1CE06DE),
			new Popup('Beating Land of Dragons 1', new Reward('Hidden Dragon', 0x01E1, 'Keyblade'), 0x1CE06EA),
			new Popup('Xigbar (Data)', new Reward('Defense Boost', 0x0116, 'Tent'), 0x1CE0AE6)
		]
	},
	{
		world: 'Olympus Coliseum',
		popups: [
			new Popup('Coliseum Map', new Reward('Coliseum Map', 0x0086, 'Map'), 0x1CE070E),
			new Popup('Olympus Stone', new Reward('Olympus Stone', 0x0172, 'Key'), 0x1CE071A),
			new Popup('OC Demyx', new Reward('Secret Ansem\'s Report 5', 0x00E6, 'Report'), 0x1CE09D2),
			new Popup('Beating Olympus Coliseum 1', new Reward('Hero\'s Crest', 0x01E4, 'Keyblade'), 0x1CE0726),
			new Popup('Auron\'s Statue', new Reward('Auron\'s Statue', 0x0173, 'Key'), 0x1CE0882),
			new Popup('Beating Olympus Coliseum 2', new Reward('Guardian Soul', 0x01EB, 'Keyblade'), 0x1CE088E),
			new Popup('Zexion (Absent Silhouette)', new Reward('Book of Shadows', 0x01D2, 'Recipe'), 0x1CE0A56),
			new Popup('Zexion (Data)', new Reward('Lost Illusion', 0x0248, 'Synthesis'), 0x1CE0A92)
		]
	},
	{
		world: 'Olympus Cups',
		popups: [
			new Popup('Protect Belt (Pain & Panic Cup)', new Reward('Protect Belt', 0x004E, 'Armor'), 0x1CE073E),
			new Popup('Serenity Gem (Pain & Panic Cup)', new Reward('Serenity Gem', 0x0167, 'Synthesis'), 0x1CE074A),
			new Popup('Rising Dragon (Cerberus Cup)', new Reward('Rising Dragon', 0x009A, 'Donald'), 0x1CE07CE),
			new Popup('Serenity Crystal (Cerberus Cup)', new Reward('Serenity Crystal', 0x0168, 'Synthesis'), 0x1CE07DA),
			new Popup('Genji Shield (Titan Cup)', new Reward('Genji Shield', 0x0091, 'Goofy'), 0x1CE089A),
			new Popup('Skillful Ring (Titan Cup)', new Reward('Skillful Ring', 0x0027, 'Accessory'), 0x1CE08A6),
			new Popup('Fatal Crest (Goddess of Fate Cup)', new Reward('Fatal Crest', 0x01F1, 'Keyblade'), 0x1CE094E),
			new Popup('Orichalcum+ (Goddess of Fate Cup)', new Reward('Orichalcum+', 0x0169, 'Synthesis'), 0x1CE095A),
			new Popup('Hades Cup', new Reward('Hades Cup Trophy', 0x0219, 'Key'), 0x1CE0996)
		]
	},
	{
		world: '100 Acre Wood',
		popups: [
			new Popup('Finish the Spooky Cave', new Reward('Sweet Memories', 0x01EF, 'Keyblade'), 0x1CE0906),
			new Popup('Spooky Cave Map', new Reward('Spooky Cave Map', 0x0081, 'Map'), 0x1CE0912),
			new Popup('Beating 100 Acre Woods (Cure)', new Reward('Cure', 0x0018, 'Spell'), 0x1CE091E),
			new Popup('Beating 100 Acre Woods (Orichalcum+)', new Reward('Orichalcum+', 0x0169, 'Synthesis'), 0x1CE092A)
		]
	},
	{
		world: 'Port Royal',
		popups: [
			new Popup('Isla de Muerta Map', new Reward('Isla de Muerta Map', 0x01FB, 'Map'), 0x1CE077A),
			new Popup('Beating Port Royal 1', new Reward('Follow the Wind', 0x01E6, 'Keyblade'), 0x1CE0786),
			new Popup('Cursed Medallion', new Reward('Cursed Medallion', 0x0174, 'Key'), 0x1CE086A),
			new Popup('Ship Graveyard Map', new Reward('Ship Graveyard Map', 0x01FC, 'Map'), 0x1CE0876),
			new Popup('Grim Reaper 2', new Reward('Secret Ansem\'s Report 6', 0x00E7, 'Report'), 0x1CE09DE),
			new Popup('Luxord (Data)', new Reward('AP Boost', 0x0117, 'Tent'), 0x1CE0AFE)
		]
	},
	{
		world: 'Pride Lands',
		popups: [
			new Popup('Cheer Up Simba', new Reward('Circle of Life', 0x01E7, 'Keyblade'), 0x1CE07B6),
			new Popup('Beating Pride Lands 1', new Reward('Fire', 0x0015, 'Spell'), 0x1CE07C2),
			new Popup('Saix (Data)', new Reward('Defense Boost', 0x0116, 'Tent'), 0x1CE0AF2)
		]
	},
	{
		world: 'Simulated Twilight Town',
		popups: [
			new Popup('Twilight Town Map', new Reward('Twilight Town Map', 0x00FF, 'Map'), 0x1CE0636),
			new Popup('Munny Pouch (Olette)', new Reward('Munny Pouch (Olette)', 0x016A, 'Key'), 0x1CE0606),
			new Popup('Setzer Victory', new Reward('Champion Belt', 0x0131, 'Armor'), 0x1CE0612),
			new Popup('Setzer Loss', new Reward('Medal', 0x0035, 'Accessory'), 0x1CE061E),
			new Popup('"The Struggle" Trophy', new Reward('"The Struggle" Trophy', 0x021A, 'Key'), 0x1CE062A),
			new Popup('Namine\'s Sketches', new Reward('Namine\'s Sketches', 0x0170, 'Key'), 0x1CE0642),
			new Popup('Mansion Map', new Reward('Mansion Map', 0x0214, 'Map'), 0x1CE064E),
			new Popup('Roxas (Data)', new Reward('Magic Boost', 0x0115, 'Tent'), 0x1CE0B0A)
		]
	},
	{
		world: 'Space Paranoids',
		popups: [
			new Popup('Beating Space Paranoids 1', new Reward('Photon Debugger', 0x01E8, 'Keyblade'), 0x1CE0816),
			new Popup('Larxene (Absent Silhouette)', new Reward('Cloaked Thunder', 0x01D3, 'Recipe'), 0x1CE0A62),
			new Popup('Larxene (Data)', new Reward('Lost Illusion', 0x0248, 'Synthesis'), 0x1CE0A9E)
		]
	},
	{
		world: 'Timeless River',
		popups: [
			new Popup('Window of Time Map', new Reward('Window of Time Map', 0x0206, 'Map'), 0x1CE076E),
			new Popup('Beating Timeless River (Monochrome)', new Reward('Monochrome', 0x01E5, 'Keyblade'), 0x1CE0732),
			new Popup('Beating Timeless River (Wisdom Form)', new Reward('Wisdom Form', 0x001B, 'Form'), 0x1CE0762)
		]
	},
	{
		world: 'Twilight Town',
		popups: [
			new Popup('Munny Pouch (Mickey)', new Reward('Munny Pouch (Mickey)', 0x0217, 'Key'), 0x1CE065A),
			new Popup('Crystal Orb', new Reward('Crystal Orb', 0x016B, 'Key'), 0x1CE0666),
			new Popup('New Outfit (Star Seeker)', new Reward('Star Seeker', 0x01E0, 'Keyblade'), 0x1CE0672),
			new Popup('New Outfit (Valor Form)', new Reward('Valor Form', 0x001A, 'Form'), 0x1CE067E),
			new Popup('Seifer\'s Trophy', new Reward('Seifer\'s Trophy', 0x016C, 'Key'), 0x1CE07E6),
			new Popup('Beating Twilight Town 1 (Oathkeeper)', new Reward('Oathkeeper', 0x002A, 'Keyblade'), 0x1CE07F2),
			new Popup('Beating Twilight Town 1 (Limit Form)', new Reward('Limit Form', 0x0233, 'Form'), 0x1CE07FE),
			new Popup('After Betwixt and Between fight', new Reward('Bond of Flame', 0x01F2, 'Keyblade'), 0x1CE0966),
			new Popup('Station Plaza Nobodies', new Reward('Secret Ansem\'s Report 2', 0x00E3, 'Report'), 0x1CE09AE),
			new Popup('Twilight Town 3', new Reward('Secret Ansem\'s Report 10', 0x00EB, 'Report'), 0x1CE0A0E),
			new Popup('Axel (Data)', new Reward('Magic Boost', 0x0115, 'Tent'), 0x1CE0ACE)
		]
	},
	{
		world: 'The World That Never Was',
		popups: [
			new Popup('Defeating Roxas', new Reward('Two Become One', 0x021F, 'Keyblade'), 0x1CE0972),
			new Popup('Riku joins the party', new Reward('Oblivion', 0x002B, 'Keyblade'), 0x1CE097E),
			new Popup('Castle That Never Was Map', new Reward('Castle That Never Was Map', 0x0218, 'Map'), 0x1CE098A),
			new Popup('Xigbar', new Reward('Secret Ansem\'s Report 3', 0x00E4, 'Report'), 0x1CE09BA),
			new Popup('Roxas', new Reward('Secret Ansem\'s Report 8', 0x00E9, 'Report'), 0x1CE09F6),
			new Popup('Luxord', new Reward('Secret Ansem\'s Report 9', 0x00EA, 'Report'), 0x1CE0A02),
			new Popup('Before Xemnas 1', new Reward('Secret Ansem\'s Report 11', 0x00EC, 'Report'), 0x1CE0A1A),
			new Popup('Saix', new Reward('Secret Ansem\'s Report 12', 0x00ED, 'Report'), 0x1CE0A26),
			new Popup('Xemnas 1', new Reward('Secret Ansem\'s Report 13', 0x00EE, 'Report'), 0x1CE0A32),
			new Popup('Xemnas (Data)', new Reward('Power Boost', 0x0114, 'Tent'), 0x1CE0ADA)
		]
	}
]