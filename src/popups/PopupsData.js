import { Reward } from '../rewards/RewardsData'

export class Popup {
	constructor(popup, vanilla, address, zipID) {
		this.popup = popup
		this.vanillaReward = { ...vanilla }
		this.replacementReward = { ...vanilla }
		this.vanillaAddress = address
		this.zipID = zipID
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
			return new Popup(this.popup, new Reward(this.vanillaReward.reward, this.vanillaReward.index, this.vanillaReward.iconType), this.vanillaAddress, this.zipID)
		}
		this.replace = (newPopupData) => {
			let ret = this.copy()
			ret.replacementReward = { ...newPopupData.reward }
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
				ret += '\tWriteShort(Sys3+0x' + address.toString(16).toUpperCase() + ',0x' + this.replacementReward.index.toString(16).toUpperCase().padStart(4, '0') + ')'
				if (isCommented) ret += ' -- ' + this.popup + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
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
				// if (isCommented) ret += ' // ' + this.room + ', ' + this.vanillaReward.reward + ' is now ' + this.replacementReward.reward
				ret += '\n'
			}
			return ret
		}
		this.saveToJSON = () => {
			return this.isReplaced() ? JSON.stringify(this, ['replacementReward', 'reward', 'index', 'iconType', 'vanillaAddress', 'zipID']) + ',' : ''
		}
		this.loadFromJSON = (popupJSON) => {
			let ret = this.copy()
			ret.replacementReward = { ...popupJSON.replacementReward }
			ret.toBeReplaced = false
			return ret
		}
	}


	static saveToPnach(popupData, isCommented) {
		return ['\n//POPUPS\n'].concat(popupData.map(worldList => {
			let ret = isCommented ? '// ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.popups.forEach(popup => { ret += popup.saveToPnach(isCommented) })
			return ret
		}))
	}
	static saveToLua(popupData, isCommented) {
		return ['\nfunction Popups()\n'].concat(popupData.map(worldList => {
			let ret = isCommented ? '\t-- ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.popups.forEach(popup => { ret += popup.saveToLua(isCommented) })
			return ret
		}), ['end\n'])
	}
	static saveToYml(popupData, isCommented) {
		return popupData.reduce((prev, worldList) => {
			worldList.popups.forEach(popup => { prev += popup.saveToYml(isCommented) })
			return prev
		}, '')
	}
	static saveToJSON(popupData) {
		let popupSaveData = popupData.map(world => {
			let ret = ''
			world.popups.forEach(popup => { ret += popup.saveToJSON() })
			return ret === '' ? ret : '{"world":"' + world.world + '","popups":[' + ret.slice(0, -1) + ']}'
		})
		return ['"popupsData":[', popupSaveData.filter(s => s !== '').join(), '],']
	}
	static loadFromJSON(popupLoadData) {
		let globalIndex = 0
		return popupsData.map(world => {
			if (globalIndex < popupLoadData.length) {
				if (popupLoadData[globalIndex].world === world.world) {
					let popupIndex = 0
					let newPopups = world.popups.map(popup => {
						if (popupIndex < popupLoadData[globalIndex].popups.length) {
							if (popupLoadData[globalIndex].popups[popupIndex].vanillaAddress === popup.vanillaAddress) {
								let ret = popup.loadFromJSON(popupLoadData[globalIndex].popups[popupIndex])
								popupIndex++
								return ret
							}
						}
						return popup
					})
					globalIndex++
					return {
						...world,
						popups: newPopups
					}
				}
			}
			return world
		})
	}
}

export const popupsData = [
	{
		world: 'Agrabah',
		popups: [
			new Popup('Agrabah Map', new Reward('Agrabah Map', 0x078, 'Map'), 0x1CE0792, 353),
			new Popup('Beating Agrabah 1', new Reward('Lamp Charm', 0x09F, 'Charm'), 0x1CE079E, 300),
			new Popup('Beating Agrabah 2', new Reward('Wishing Lamp', 0x1EC, 'Keyblade'), 0x1CE08B2, 303),
			new Popup('Lexaeus (Absent Silhouette)', new Reward('Strength Beyond Strength', 0x1D1, 'Recipe'), 0x1CE0A4A, 545),
			new Popup('Lexaeus (Data)', new Reward('Lost Illusion', 0x248, 'Synthesis'), 0x1CE0A86, 550)
		]
	},
	{
		world: 'Atlantica',
		popups: [
			new Popup('Undersea Kingdom Map', new Reward('Undersea Kingdom Map', 0x07B, 'Map'), 0x1CE0846, 367),
			new Popup('Beating Atlantica (Mysterious Abyss)', new Reward('Mysterious Abyss', 0x1F0, 'Keyblade'), 0x1CE08E2, 287),
			new Popup('Blizzard', new Reward('Blizzard', 0x016, 'Spell'), 0x1CE08EE, 279),
			new Popup('Beating Atlantica (Orichalcum+)', new Reward('Orichalcum+', 0x169, 'Synthesis'), 0x1CE08FA, 538)
		]
	},
	{
		world: 'Beast\'s Castle',
		popups: [
			new Popup('Beating Beast\'s Castle 1', new Reward('Cure', 0x018, 'Spell'), 0x1CE06F6, 299),
			new Popup('Encouraging Beast', new Reward('Rumbling Rose', 0x1EA, 'Keyblade'), 0x1CE0852, 270),
			new Popup('Castle Walls Map', new Reward('Castle Walls Map', 0x05C, 'Map'), 0x1CE085E, 325),
			new Popup('Xaldin', new Reward('Secret Ansem\'s Report 4', 0x0E5, 'Report'), 0x1CE09C6, 528),
			new Popup('Xaldin (Data)', new Reward('Defense Boost', 0x116, 'Tent'), 0x1CE0AC2, 559)
		]
	},
	{
		world: 'Disney Castle',
		popups: [
			new Popup('Disney Castle Map', new Reward('Disney Castle Map', 0x077, 'Map'), 0x1CE0756, 332),
			new Popup('Proof of Connection', new Reward('Proof of Connection', 0x251, 'Connection'), 0x1CE0B16, 587),
			new Popup('Manifest Illusion', new Reward('Manifest Illusion', 0x249, 'Synthesis'), 0x1CE0B22, 591),
			new Popup('Marluxia (Absent Silhouette)', new Reward('Eternal Blossom', 0x1D4, 'Recipe'), 0x1CE0A6E, 548),
			new Popup('Marluxia (Data)', new Reward('Lost Illusion', 0x248, 'Synthesis'), 0x1CE0AAA, 553)
		]
	},
	{
		world: 'Halloween Town',
		popups: [
			new Popup('Beating Halloween Town 1', new Reward('Magnet', 0x057, 'Spell'), 0x1CE07AA, 301),
			new Popup('Present', new Reward('Present', 0x175, 'Key'), 0x1CE08BE, 297),
			new Popup('Decoy Presents', new Reward('Decoy Presents', 0x176, 'Key'), 0x1CE08CA, 298),
			new Popup('Beating Halloween Town 2', new Reward('Decisive Pumpkin', 0x1ED, 'Keyblade'), 0x1CE08D6, 275),
			new Popup('Vexen (Absent Silhouette)', new Reward('Road to Discovery', 0x1D0, 'Recipe'), 0x1CE0A3E, 544),
			new Popup('Vexen (Data)', new Reward('Lost Illusion', 0x248, 'Synthesis'), 0x1CE0A7A, 549)
		]
	},
	{
		world: 'Hollow Bastion',
		popups: [
			new Popup('Marketplace Map', new Reward('Marketplace Map', 0x0FD, 'Map'), 0x1CE068A, 362),
			new Popup('Membership Card', new Reward('Membership Card', 0x171, 'Key'), 0x1CE0696, 256),
			new Popup('First Visit to Merlin\'s', new Reward('Blizzard', 0x016, 'Spell'), 0x1CE06A2, 292),
			new Popup('Bailey Nobodies', new Reward('Secret Ansem\'s Report 7', 0x0E8, 'Report'), 0x1CE09EA, 531),
			new Popup('100 Acre Woods First Visit', new Reward('Baseball Charm', 0x17F, 'Charm'), 0x1CE0702, 258),
			new Popup('Finding the DTD Password', new Reward('Master Form', 0x01F, 'Form'), 0x1CE080A, 266),
			new Popup('Cure', new Reward('Cure', 0x018, 'Spell'), 0x1CE0822, 361),
			new Popup('1,000 Heartless', new Reward('Secret Ansem\'s Report 1', 0x0E2, 'Report'), 0x1CE09A2, 525),
			new Popup('Ice Cream', new Reward('Ice Cream', 0x177, 'Key'), 0x1CE082E, 269),
			new Popup('Picture', new Reward('Picture', 0x178, 'Key'), 0x1CE083A, 511),
			new Popup('Ansem\'s Study during MCP Takeover', new Reward('Sleeping Lion', 0x1EE, 'Keyblade'), 0x1CE0936, 276),
			new Popup('Approach Sephiroh after talking to Cloud', new Reward('Fenrir', 0x1F3, 'Keyblade'), 0x1CE0942, 282),
			new Popup('Mushroom XIII (Proof of Peace)', new Reward('Proof of Peace', 0x253, 'Peace'), 0x1CE0B3A, 589),
			new Popup('Mushroom XIII (Winner\'s Proof)', new Reward('Winner\'s Proof', 0x220, 'Keyblade'), 0x1CE0B2E, 588),
			new Popup('Demyx (Data)', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE0AB6, 560)
		]
	},
	{
		world: 'Land of Dragons',
		popups: [
			new Popup('Encampment Area Map', new Reward('Encampment Area Map', 0x070, 'Map'), 0x1CE06D2, 350),
			new Popup('AP Boost (Missions)', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE06C6, 417),
			new Popup('Village Area Map', new Reward('Village Area Map', 0x071, 'Map'), 0x1CE06DE, 495),
			new Popup('Beating Land of Dragons 1', new Reward('Hidden Dragon', 0x1E1, 'Keyblade'), 0x1CE06EA, 257),
			new Popup('Xigbar (Data)', new Reward('Defense Boost', 0x116, 'Tent'), 0x1CE0AE6, 555)
		]
	},
	{
		world: 'Olympus Coliseum',
		popups: [
			new Popup('Coliseum Map', new Reward('Coliseum Map', 0x086, 'Map'), 0x1CE070E, 338),
			new Popup('Olympus Stone', new Reward('Olympus Stone', 0x172, 'Key'), 0x1CE071A, 293),
			new Popup('OC Demyx', new Reward('Secret Ansem\'s Report 5', 0x0E6, 'Report'), 0x1CE09D2, 529),
			new Popup('Beating Olympus Coliseum 1', new Reward('Hero\'s Crest', 0x1E4, 'Keyblade'), 0x1CE0726, 260),
			new Popup('Auron\'s Statue', new Reward('Auron\'s Statue', 0x173, 'Key'), 0x1CE0882, 295),
			new Popup('Beating Olympus Coliseum 2', new Reward('Guardian Soul', 0x1EB, 'Keyblade'), 0x1CE088E, 272),
			new Popup('Zexion (Absent Silhouette)', new Reward('Book of Shadows', 0x1D2, 'Recipe'), 0x1CE0A56, 546),
			new Popup('Zexion (Data)', new Reward('Lost Illusion', 0x248, 'Synthesis'), 0x1CE0A92, 551)
		]
	},
	{
		world: 'Olympus Cups',
		popups: [
			new Popup('Protect Belt (Pain & Panic Cup)', new Reward('Protect Belt', 0x04E, 'Armor'), 0x1CE073E, 513),
			new Popup('Serenity Gem (Pain & Panic Cup)', new Reward('Serenity Gem', 0x167, 'Synthesis'), 0x1CE074A, 540),
			new Popup('Rising Dragon (Cerberus Cup)', new Reward('Rising Dragon', 0x09A, 'Donald'), 0x1CE07CE, 515),
			new Popup('Serenity Crystal (Cerberus Cup)', new Reward('Serenity Crystal', 0x168, 'Synthesis'), 0x1CE07DA, 542),
			new Popup('Genji Shield (Titan Cup)', new Reward('Genji Shield', 0x091, 'Goofy'), 0x1CE089A, 514),
			new Popup('Skillful Ring (Titan Cup)', new Reward('Skillful Ring', 0x027, 'Accessory'), 0x1CE08A6, 541),
			new Popup('Fatal Crest (Goddess of Fate Cup)', new Reward('Fatal Crest', 0x1F1, 'Keyblade'), 0x1CE094E, 516),
			new Popup('Orichalcum+ (Goddess of Fate Cup)', new Reward('Orichalcum+', 0x169, 'Synthesis'), 0x1CE095A, 517),
			new Popup('Hades Cup', new Reward('Hades Cup Trophy', 0x219, 'Key'), 0x1CE0996, 518)
		]
	},
	{
		world: '100 Acre Wood',
		popups: [
			new Popup('Finish the Spooky Cave', new Reward('Sweet Memories', 0x1EF, 'Keyblade'), 0x1CE0906, 284),
			new Popup('Spooky Cave Map', new Reward('Spooky Cave Map', 0x081, 'Map'), 0x1CE0912, 485),
			new Popup('Beating 100 Acre Woods (Cure)', new Reward('Cure', 0x018, 'Spell'), 0x1CE091E, 285),
			new Popup('Beating 100 Acre Woods (Orichalcum+)', new Reward('Orichalcum+', 0x169, 'Synthesis'), 0x1CE092A, 539)
		]
	},
	{
		world: 'Port Royal',
		popups: [
			new Popup('Isla de Muerta Map', new Reward('Isla de Muerta Map', 0x1FB, 'Map'), 0x1CE077A, 329),
			new Popup('Beating Port Royal 1', new Reward('Follow the Wind', 0x1E6, 'Keyblade'), 0x1CE0786, 263),
			new Popup('Cursed Medallion', new Reward('Cursed Medallion', 0x174, 'Key'), 0x1CE086A, 296),
			new Popup('Ship Graveyard Map', new Reward('Ship Graveyard Map', 0x1FC, 'Map'), 0x1CE0876, 331),
			new Popup('Grim Reaper 2', new Reward('Secret Ansem\'s Report 6', 0x0E7, 'Report'), 0x1CE09DE, 530),
			new Popup('Luxord (Data)', new Reward('AP Boost', 0x117, 'Tent'), 0x1CE0AFE, 557)
		]
	},
	{
		world: 'Pride Lands',
		popups: [
			new Popup('Cheer Up Simba', new Reward('Circle of Life', 0x1E7, 'Keyblade'), 0x1CE07B6, 264),
			new Popup('Beating Pride Lands 1', new Reward('Fire', 0x015, 'Spell'), 0x1CE07C2, 302),
			new Popup('Saix (Data)', new Reward('Defense Boost', 0x116, 'Tent'), 0x1CE0AF2, 556)
		]
	},
	{
		world: 'Simulated Twilight Town',
		popups: [
			new Popup('Twilight Town Map', new Reward('Twilight Town Map', 0x0FF, 'Map'), 0x1CE0636, 319),
			new Popup('Munny Pouch (Olette)', new Reward('Munny Pouch (Olette)', 0x16A, 'Key'), 0x1CE0606, 288),
			new Popup('Setzer Victory', new Reward('Champion Belt', 0x131, 'Armor'), 0x1CE0612, 389),
			new Popup('Setzer Loss', new Reward('Medal', 0x035, 'Accessory'), 0x1CE061E, 390),
			new Popup('"The Struggle" Trophy', new Reward('"The Struggle" Trophy', 0x21A, 'Key'), 0x1CE062A, 519),
			new Popup('Namine\'s Sketches', new Reward('Namine\'s Sketches', 0x170, 'Key'), 0x1CE0642, 289),
			new Popup('Mansion Map', new Reward('Mansion Map', 0x214, 'Map'), 0x1CE064E, 483),
			new Popup('Roxas (Data)', new Reward('Magic Boost', 0x115, 'Tent'), 0x1CE0B0A, 558)
		]
	},
	{
		world: 'Space Paranoids',
		popups: [
			new Popup('Beating Space Paranoids 1', new Reward('Photon Debugger', 0x1E8, 'Keyblade'), 0x1CE0816, 267),
			new Popup('Larxene (Absent Silhouette)', new Reward('Cloaked Thunder', 0x1D3, 'Recipe'), 0x1CE0A62, 547),
			new Popup('Larxene (Data)', new Reward('Lost Illusion', 0x248, 'Synthesis'), 0x1CE0A9E, 552)
		]
	},
	{
		world: 'Timeless River',
		popups: [
			new Popup('Window of Time Map', new Reward('Window of Time Map', 0x206, 'Map'), 0x1CE076E, 368),
			new Popup('Beating Timeless River (Monochrome)', new Reward('Monochrome', 0x1E5, 'Keyblade'), 0x1CE0732, 261),
			new Popup('Beating Timeless River (Wisdom Form)', new Reward('Wisdom Form', 0x01B, 'Form'), 0x1CE0762, 262)
		]
	},
	{
		world: 'Twilight Town',
		popups: [
			new Popup('Munny Pouch (Mickey)', new Reward('Munny Pouch (Mickey)', 0x217, 'Key'), 0x1CE065A, 290),
			new Popup('Crystal Orb', new Reward('Crystal Orb', 0x16B, 'Key'), 0x1CE0666, 291),
			new Popup('New Outfit (Star Seeker)', new Reward('Star Seeker', 0x1E0, 'Keyblade'), 0x1CE0672, 304),
			new Popup('New Outfit (Valor Form)', new Reward('Valor Form', 0x01A, 'Form'), 0x1CE067E, 286),
			new Popup('Seifer\'s Trophy', new Reward('Seifer\'s Trophy', 0x16C, 'Key'), 0x1CE07E6, 294),
			new Popup('Beating Twilight Town 2 (Oathkeeper)', new Reward('Oathkeeper', 0x02A, 'Keyblade'), 0x1CE07F2, 265),
			new Popup('Beating Twilight Town 2 (Limit Form)', new Reward('Limit Form', 0x233, 'Form'), 0x1CE07FE, 543),
			new Popup('After Betwixt and Between fight', new Reward('Bond of Flame', 0x1F2, 'Keyblade'), 0x1CE0966, 317),
			new Popup('Station Plaza Nobodies', new Reward('Secret Ansem\'s Report 2', 0x0E3, 'Report'), 0x1CE09AE, 526),
			new Popup('Twilight Town 3', new Reward('Secret Ansem\'s Report 10', 0x0EB, 'Report'), 0x1CE0A0E, 534),
			new Popup('Axel (Data)', new Reward('Magic Boost', 0x115, 'Tent'), 0x1CE0ACE, 561)
		]
	},
	{
		world: 'The World That Never Was',
		popups: [
			new Popup('Defeating Roxas', new Reward('Two Become One', 0x21F, 'Keyblade'), 0x1CE0972, 277),
			new Popup('Riku joins the party', new Reward('Oblivion', 0x02B, 'Keyblade'), 0x1CE097E, 278),
			new Popup('Castle That Never Was Map', new Reward('Castle That Never Was Map', 0x218, 'Map'), 0x1CE098A, 496),
			new Popup('Xigbar', new Reward('Secret Ansem\'s Report 3', 0x0E4, 'Report'), 0x1CE09BA, 527),
			new Popup('Roxas', new Reward('Secret Ansem\'s Report 8', 0x0E9, 'Report'), 0x1CE09F6, 532),
			new Popup('Luxord', new Reward('Secret Ansem\'s Report 9', 0x0EA, 'Report'), 0x1CE0A02, 533),
			new Popup('Before Xemnas 1', new Reward('Secret Ansem\'s Report 11', 0x0EC, 'Report'), 0x1CE0A1A, 535),
			new Popup('Saix', new Reward('Secret Ansem\'s Report 12', 0x0ED, 'Report'), 0x1CE0A26, 536),
			new Popup('Xemnas 1', new Reward('Secret Ansem\'s Report 13', 0x0EE, 'Report'), 0x1CE0A32, 537),
			new Popup('Xemnas (Data)', new Reward('Power Boost', 0x114, 'Tent'), 0x1CE0ADA, 554)
		]
	}
]