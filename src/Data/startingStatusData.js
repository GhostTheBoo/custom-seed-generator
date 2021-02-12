import { Reward } from "./rewardsData"

export class StartingStatus {
	constructor() {
		this.keyblade = new Reward('Kingdom Key', 0x0029)
		this.armor = new Reward('EMPTY', 0x0000)
		this.accessory = new Reward('EMPTY', 0x0000)
		this.munny = 0
		this.hp = 20
		this.mp = 100
		this.donald1 = new Reward('Donald Thunder', 0x00A7)
		this.donald2 = new Reward('Donald Cure', 0x00A8)
		this.goofy1 = new Reward('Goofy Bash', 0x01AD)
		this.goofy2 = new Reward('Item Boost', 0x019B)
	}
	keybladeCode = [
		'// Starting Keyblade\n',
		'patch=1,EE,E0050003,extended,0032DFC8\n',
		'patch=1,EE,E0042002,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE6\n',
		'patch=1,EE,E0010001,extended,0032BAE8\n',
		'patch=1,EE,1032E020,extended,0000'
		//+ keyblade.index.padStart(4, '0') + ' // ' + keyblade.reward + '\n'
	]
	armorCode = [
		'// Starting Armor\n',
		'patch=1,EE,E0050003,extended,0032DFC8\n',
		'patch=1,EE,E0042002,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE6\n',
		'patch=1,EE,E0010001,extended,0032BAE8\n',
		'patch=1,EE,1032E034,extended,0000'
		//+ armor.index.padStart(4, '0') + ' // ' + armor.reward + '\n'
	]
	accessoryCode = [
		'// Starting Accessory\n',
		'patch=1,EE,E0050003,extended,0032DFC8\n',
		'patch=1,EE,E0042002,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE6\n',
		'patch=1,EE,E0010001,extended,0032BAE8\n',
		'patch=1,EE,1032E044,extended,0000'
		//+ accessory.index.padStart(4, '0') + ' // ' + accessory.reward + '\n'
	]
	munnyCode = [
		'//Starting Munny\n',
		'patch=1,EE,E0050003,extended,0032DFC8\n',
		'patch=1,EE,E0042002,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE6\n',
		'patch=1,EE,E0010001,extended,0032BAE8\n',
		'patch=1,EE,2032DF70,extended,'
		//+ munny.toString(16).toUpperCase().padStart(8, '0') + ' // ' + munny + ' munny\n'
	]
	hpCode = [
		'//Starting Max HP\n',
		'patch=1,EE,E0041A04,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE8\n',
		'patch=1,EE,01C6C754,extended,000000',
		//+ hp.toString(16).toUpperCase().padStart(2, '0') + ' // Max HP: ' + hp + '\n'
		'patch=1,EE,01C6C750,extended,000000'
		//+ hp.toString(16).toUpperCase().padStart(2, '0') + ' // Current HP: ' + hp + '\n'
	]
	mpCode = [
		'//Starting Max MP\n',
		'patch=1,EE,E0041A04,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE8\n',
		'patch=1,EE,01C6C8D4,extended,000000',
		//+ mp.toString(16).toUpperCase().padStart(2, '0') + ' //Max MP: ' + mp + '\n'
		'patch=1,EE,01C6C8D0,extended,000000'
		//+ mp.toString(16).toUpperCase().padStart(2, '0') + ' //Current MP: ' + mp + '\n'
	]
	donaldCode = [
		'//Donald\'s Starting Abilities\n',
		'patch=1,EE,11D16EE0,extended,0000',//Donald Thunder
		'patch=1,EE,11D16EE2,extended,0000'	//Donald Cure
	]
	goofyCode = [
		'//Goofy\'s Starting Abilities\n',
		'patch=1,EE,11D16F62,extended,0000',//Goofy Bash
		'patch=1,EE,11D16F64,extended,0000'	//Item Boost
	]
}

export const startingStatusData = new StartingStatus()