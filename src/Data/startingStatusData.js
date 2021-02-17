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
	}

	vanilla() {
		this.keyblade.reward = 'Kingdom Key'
		this.keyblade.index = 0x0029
		this.keyblade.iconType = 'Keyblade'
		this.armor.reward = 'EMPTY'
		this.armor.index = 0x000
		this.armor.iconType = 'EMPTY'
		this.accessory.reward = 'EMPTY'
		this.accessory.index = 0x000
		this.accessory.iconType = 'EMPTY'
		this.munny = 0
		this.hp = 20
		this.mp = 100
		this.donald1.reward = 'Donald Thunder'
		this.donald1.index = 0x00A7
		this.donald1.iconType = 'Ability'
		this.donald2.reward = 'Donald Cure'
		this.donald2.index = 0x00A8
		this.donald2.iconType = 'Ability'
		this.goofy1.reward = 'Goofy Bash'
		this.goofy1.index = 0x01AD
		this.goofy1.iconType = 'Ability'
		this.goofy2.reward = 'Item Boost'
		this.goofy2.index = 0x019B
		this.goofy2.iconType = 'Ability'
	}

	replace(newStartingData) {
		this.keyblade.reward = newStartingData.keyblade.reward
		this.keyblade.index = newStartingData.keyblade.index
		this.keyblade.iconType = newStartingData.keyblade.iconType
		this.armor.reward = newStartingData.armor.reward
		this.armor.index = newStartingData.armor.index
		this.armor.iconType = newStartingData.armor.iconType
		this.accessory.reward = newStartingData.accessory.reward
		this.accessory.index = newStartingData.accessory.index
		this.accessory.iconType = newStartingData.accessory.iconType
		this.munny = newStartingData.munny
		this.hp = newStartingData.hp
		this.mp = newStartingData.mp
		this.donald1.reward = newStartingData.donald1.reward
		this.donald1.index = newStartingData.donald1.index
		this.donald1.iconType = newStartingData.donald1.iconType
		this.donald2.reward = newStartingData.donald2.reward
		this.donald2.index = newStartingData.donald2.index
		this.donald2.iconType = newStartingData.donald2.iconType
		this.goofy1.reward = newStartingData.goofy1.reward
		this.goofy1.index = newStartingData.goofy1.index
		this.goofy1.iconType = newStartingData.goofy1.iconType
		this.goofy2.reward = newStartingData.goofy2.reward
		this.goofy2.index = newStartingData.goofy2.index
		this.goofy2.iconType = newStartingData.goofy2.iconType
	}

	toPnach() {
		let ret = ''
		ret += this.keyblade.index !== 0x0029 ?
			this.keybladeCode.join('') + this.keyblade.index.padStart(4, '0') + ' // ' + this.keyblade.reward + '\n' :
			'// Vanilla starting Keyblade of Kingdom Key\n'

		ret += this.armor.index !== 0x0000 ?
			this.armorCode.join('') + this.armor.index.padStart(4, '0') + ' // ' + this.armor.reward + '\n' :
			'// Vanilla starting Armor of EMPTY\n'

		if (this.accessory.index !== 0x0000)
			ret += this.accessoryCode.join('') + this.accessory.index.padStart(4, '0') + ' // ' + this.accessory.reward + '\n'
		else
			ret += '// Vanilla starting Accessory of EMPTY\n'

		if (this.munny !== 0)
			ret += this.munnyCode.join('') + this.munny.toString(16).toUpperCase().padStart(8, '0') + ' // ' + this.munny + ' munny\n'
		else
			ret += '// Vanilla starting Munny of 0\n'

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
		if (this.Donald1.index !== 0x00A7)
			ret += this.donaldCode[1] + this.donald1.index.padStart(4, '0') + ' // ' + this.donald1.reward + '\n'
		else
			ret += '// Vanilla Donald Ability of Donald Thunder\n'
		if (this.Donald2.index !== "00A8")
			ret += this.donaldCode[2] + this.donald2.index.padStart(4, '0') + ' // ' + this.donald2.reward + '\n'
		else
			ret += '// Vanilla Donald Ability of Donald Cure\n'

		ret += this.goofyCode[0]
		if (this.Goofy1.index !== 0x01AD)
			ret += this.goofyCode[1] + this.goofy1.index.padStart(4, '0') + ' // ' + this.goofy1.reward + '\n'
		else
			ret += '// Vanilla Goofy Ability of Goofy Bash\n'
		if (this.Goofy2.index !== 0x019B)
			ret += this.goofyCode[2] + this.goofy2.index.padStart(4, '0') + ' // ' + this.goofy2.reward + '\n'
		else
			ret += '// Vanilla Goofy Ability of Item Boost\n'
	}
}

export const startingStatusData = new StartingStatus()