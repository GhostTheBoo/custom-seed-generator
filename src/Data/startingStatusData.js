import { Reward } from "./rewardsData"

export class StartingStatus {
	constructor() {
		this.keyblade = new Reward('Kingdom Key', 0x0029, 'Keyblade')
		this.armor = new Reward('EMPTY', 0x0000, 'EMPTY')
		this.accessory = new Reward('EMPTY', 0x0000, 'EMPTY')
		this.munny = 0
		this.hp = 20
		this.mp = 100

		this.keybladeCode = [
			'// Starting Keyblade\n',
			'patch=1,EE,E0050003,extended,0032DFC8\n',
			'patch=1,EE,E0042002,extended,0032BAE0\n',
			'patch=1,EE,E0030001,extended,0032BAE4\n',
			'patch=1,EE,E0020001,extended,0032BAE6\n',
			'patch=1,EE,E0010001,extended,0032BAE8\n',
			'patch=1,EE,1032E020,extended,0000'
			//+ keyblade.index.padStart(4, '0') + ' // ' + keyblade.reward + '\n'
		]
		this.armorCode = [
			'// Starting Armor\n',
			'patch=1,EE,E0050003,extended,0032DFC8\n',
			'patch=1,EE,E0042002,extended,0032BAE0\n',
			'patch=1,EE,E0030001,extended,0032BAE4\n',
			'patch=1,EE,E0020001,extended,0032BAE6\n',
			'patch=1,EE,E0010001,extended,0032BAE8\n',
			'patch=1,EE,1032E034,extended,0000'
			//+ armor.index.padStart(4, '0') + ' // ' + armor.reward + '\n'
		]
		this.accessoryCode = [
			'// Starting Accessory\n',
			'patch=1,EE,E0050003,extended,0032DFC8\n',
			'patch=1,EE,E0042002,extended,0032BAE0\n',
			'patch=1,EE,E0030001,extended,0032BAE4\n',
			'patch=1,EE,E0020001,extended,0032BAE6\n',
			'patch=1,EE,E0010001,extended,0032BAE8\n',
			'patch=1,EE,1032E044,extended,0000'
			//+ accessory.index.padStart(4, '0') + ' // ' + accessory.reward + '\n'
		]
		this.munnyCode = [
			'//Starting Munny\n',
			'patch=1,EE,E0050003,extended,0032DFC8\n',
			'patch=1,EE,E0042002,extended,0032BAE0\n',
			'patch=1,EE,E0030001,extended,0032BAE4\n',
			'patch=1,EE,E0020001,extended,0032BAE6\n',
			'patch=1,EE,E0010001,extended,0032BAE8\n',
			'patch=1,EE,2032DF70,extended,'
			//+ munny.toString(16).toUpperCase().padStart(8, '0') + ' // ' + munny + ' munny\n'
		]
		this.hpCode = [
			'//Starting Max HP\n',
			'patch=1,EE,E0041A04,extended,0032BAE0\n',
			'patch=1,EE,E0030001,extended,0032BAE4\n',
			'patch=1,EE,E0020001,extended,0032BAE8\n',
			'patch=1,EE,01C6C754,extended,000000',
			//+ hp.toString(16).toUpperCase().padStart(2, '0') + ' // Max HP: ' + hp + '\n'
			'patch=1,EE,01C6C750,extended,000000'
			//+ hp.toString(16).toUpperCase().padStart(2, '0') + ' // Current HP: ' + hp + '\n'
		]
		this.mpCode = [
			'//Starting Max MP\n',
			'patch=1,EE,E0041A04,extended,0032BAE0\n',
			'patch=1,EE,E0030001,extended,0032BAE4\n',
			'patch=1,EE,E0020001,extended,0032BAE8\n',
			'patch=1,EE,01C6C8D4,extended,000000',
			//+ mp.toString(16).toUpperCase().padStart(2, '0') + ' //Max MP: ' + mp + '\n'
			'patch=1,EE,01C6C8D0,extended,000000'
			//+ mp.toString(16).toUpperCase().padStart(2, '0') + ' //Current MP: ' + mp + '\n'
		]

		this.vanilla = () => {
			return new StartingStatus()
		}
		this.replace = (newStartingData) => {
			let ret = new StartingStatus()
			ret.keyblade = { ...newStartingData.keyblade }
			ret.armor = newStartingData.armor.index !== undefined ? { ...newStartingData.armor } : new Reward('EMPTY', 0x0000, 'EMPTY')
			ret.accessory = newStartingData.accessory.index !== undefined ? { ...newStartingData.accessory } : new Reward('EMPTY', 0x0000, 'EMPTY')
			ret.munny = newStartingData.munny
			ret.hp = newStartingData.hp
			ret.mp = newStartingData.mp
			return ret
		}
		this.saveToJSON = () => {
			return JSON.stringify(this, ['keyblade', 'armor', 'accessory', 'munny', 'hp', 'mp', 'reward', 'index', 'iconType',])
		}
		this.loadFromJSON = (startingStatusJSON) => {
			let ret = new StartingStatus()
			ret.keyblade = { ...startingStatusJSON.keyblade }
			ret.armor = { ...startingStatusJSON.armor }
			ret.accessory = { ...startingStatusJSON.accessory }
			ret.munny = startingStatusJSON.munny
			ret.hp = startingStatusJSON.hp
			ret.mp = startingStatusJSON.mp
			return ret
		}
		this.saveToPnach = (isCommented) => {
			let ret = ''
			if (this.keyblade.index !== 0x0029) {
				ret += this.keybladeCode.join('') + this.keyblade.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // ' + this.keyblade.reward
				ret += '\n'
			} else
				if (isCommented) ret += '// Vanilla starting Keyblade of Kingdom Key\n'

			if (this.armor.index !== 0x0000) {
				ret += this.armorCode.join('') + this.armor.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // ' + this.armor.reward
				ret += '\n'
			} else {
				if (isCommented) ret += '// Vanilla starting Armor of EMPTY\n'
			}

			if (this.accessory.index !== 0x0000) {
				ret += this.accessoryCode.join('') + this.accessory.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) ret += ' // ' + this.accessory.reward
				ret += '\n'
			} else {
				if (isCommented) ret += '// Vanilla starting Accessory of EMPTY\n'
			}

			if (this.munny !== 0) {
				ret += this.munnyCode.join('') + this.munny.toString(16).toUpperCase().padStart(8, '0')
				if (isCommented) ret += ' // ' + this.munny + ' munny'
				ret += '\n'
			} else {
				if (isCommented) ret += '// Vanilla starting Munny of 0\n'
			}

			if (this.hp !== 20) {
				ret += this.hpCode.slice(0, 5).join('') + this.hp.toString(16).toUpperCase().padStart(2, '0')
				if (isCommented) ret += ' // Max HP: ' + this.hp
				ret += '\n' + this.hpCode[5] + this.hp.toString(16).toUpperCase().padStart(2, '0')
				if (isCommented) ret += ' // Current HP: ' + this.hp
				ret += '\n'
			} else
				if (isCommented) ret += '// Vanilla starting HP of 20\n'

			if (this.mp !== 100) {
				ret += this.mpCode.slice(0, 5).join('') + this.mp.toString(16).toUpperCase().padStart(2, '0')
				if (isCommented) ret += ' // Max MP: ' + this.mp
				ret += '\n' + this.mpCode[5] + this.mp.toString(16).toUpperCase().padStart(2, '0')
				if (isCommented) ret += ' // Current MP: ' + this.mp
				ret += '\n'
			} else
				if (isCommented) ret += '// Vanilla starting MP of 100\n'

			return ret
		}
	}
}

export const startingStatusData = new StartingStatus()