import { Reward } from "./rewardsData"

export class StartingStatus {
	constructor() {
		this.keyblade = new Reward('Kingdom Key', 0x0029, 'Keyblade')
		this.armor = new Reward('EMPTY', 0x0000, 'EMPTY')
		this.accessory = new Reward('EMPTY', 0x0000, 'EMPTY')
		this.munny = 0
		this.hp = 20
		this.mp = 100
		this.donald1 = new Reward('Donald Thunder', 0x00A7, 'Ability')
		this.donald2 = new Reward('Donald Cure', 0x00A8, 'Ability')
		this.goofy1 = new Reward('Goofy Bash', 0x01AD, 'Ability')
		this.goofy2 = new Reward('Item Boost', 0x019B, 'Ability')
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
		this.donaldCode = [
			'//Donald\'s Starting Abilities\n',
			'patch=1,EE,11D16EE0,extended,0000',//Donald Thunder
			'patch=1,EE,11D16EE2,extended,0000'	//Donald Cure
		]
		this.goofyCode = [
			'//Goofy\'s Starting Abilities\n',
			'patch=1,EE,11D16F62,extended,0000',//Goofy Bash
			'patch=1,EE,11D16F64,extended,0000'	//Item Boost
		]

		this.vanilla = () => {
			let ret = new StartingStatus()
			return ret
		}
		this.replace = (newStartingData) => {
			let ret = new StartingStatus()
			ret.keyblade = { ...newStartingData.keyblade }
			ret.armor = newStartingData.armor.index !== undefined ? { ...newStartingData.armor } : new Reward('EMPTY', 0x0000, 'EMPTY')
			ret.accessory = newStartingData.accessory.index !== undefined ? { ...newStartingData.accessory } : new Reward('EMPTY', 0x0000, 'EMPTY')
			ret.donald1 = newStartingData.donald1.index !== undefined ? { ...newStartingData.donald1 } : new Reward('EMPTY', 0x0000, 'EMPTY')
			ret.donald2 = newStartingData.donald2.index !== undefined ? { ...newStartingData.donald2 } : new Reward('EMPTY', 0x0000, 'EMPTY')
			ret.goofy1 = newStartingData.goofy1.index !== undefined ? { ...newStartingData.goofy1 } : new Reward('EMPTY', 0x0000, 'EMPTY')
			ret.goofy2 = newStartingData.goofy2.index !== undefined ? { ...newStartingData.goofy2 } : new Reward('EMPTY', 0x0000, 'EMPTY')
			return ret
		}
		this.toPnach = () => {
			let ret = this.keyblade.index !== 0x0029
				? this.keybladeCode.join('') + this.keyblade.index.toString(16).toUpperCase().padStart(4, '0') + ' // ' + this.keyblade.reward + '\n'
				: '// Vanilla starting Keyblade of Kingdom Key\n'

			ret += this.armor.index !== 0x0000
				? this.armorCode.join('') + this.armor.index.toString(16).toUpperCase().padStart(4, '0') + ' // ' + this.armor.reward + '\n'
				: '// Vanilla starting Armor of EMPTY\n'

			ret += this.accessory.index !== 0x0000
				? this.accessoryCode.join('') + this.accessory.index.toString(16).toUpperCase().padStart(4, '0') + ' // ' + this.accessory.reward + '\n'
				: '// Vanilla starting Accessory of EMPTY\n'

			ret += this.munny !== 0
				? this.munnyCode.join('') + this.munny.toString(16).toUpperCase().padStart(8, '0') + ' // ' + this.munny + ' munny\n'
				: '// Vanilla starting Munny of 0\n'

			if (this.HP !== 20) {
				ret += this.hpCode.slice(0, 5).join('') + this.hp.toString(16).toUpperCase().padStart(2, '0') + ' // Max HP: ' + this.hp + '\n'
				ret += this.hpCode[5] + this.hp.toString(16).toUpperCase().padStart(2, '0') + ' // Current HP: ' + this.hp + '\n'
			} else
				ret += '// Vanilla starting HP of 20\n'

			if (this.MP !== 100) {
				ret += this.mpCode.slice(0, 5).join('') + this.mp.toString(16).toUpperCase().padStart(2, '0') + ' // Max MP: ' + this.mp + '\n'
				ret += this.mpCode[5] + this.mp.toString(16).toUpperCase().padStart(2, '0') + ' // Current MP: ' + this.mp + '\n'
			} else
				ret += '// Vanilla starting MP of 100\n'

			ret += this.donaldCode[0]
			ret += this.Donald1.index !== 0x00A7
				? this.donaldCode[1] + this.donald1.index.toString(16).toUpperCase().padStart(4, '0') + ' // ' + this.donald1.reward + '\n'
				: '// Vanilla Donald Ability of Donald Thunder\n'
			ret += this.Donald2.index !== 0x00A8
				? this.donaldCode[2] + this.donald2.index.toString(16).toUpperCase().padStart(4, '0') + ' // ' + this.donald2.reward + '\n'
				: '// Vanilla Donald Ability of Donald Cure\n'

			ret += this.goofyCode[0]
			ret += this.Goofy1.index !== 0x01AD
				? this.goofyCode[1] + this.goofy1.index.toString(16).toUpperCase().padStart(4, '0') + ' // ' + this.goofy1.reward + '\n'
				: '// Vanilla Goofy Ability of Goofy Bash\n'
			ret += this.Goofy2.index !== 0x019B
				? this.goofyCode[2] + this.goofy2.index.toString(16).toUpperCase().padStart(4, '0') + ' // ' + this.goofy2.reward + '\n'
				: '// Vanilla Goofy Ability of Item Boost\n'

			return ret
		}
	}
}

export const startingStatusData = new StartingStatus()