const startingStatusData = {
	startingKeyblade: {
		reward: "Kingdom Key",
		index: "0029"
	},
	keybladeCode: [
		'// Starting Keyblade\n',
		'patch=1,EE,E0050003,extended,0032DFC8\n',
		'patch=1,EE,E0042002,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE6\n',
		'patch=1,EE,E0010001,extended,0032BAE8\n',
		'patch=1,EE,1032E020,extended,0000'
		//+ keyblade.index.padStart(4, '0') + ' // ' + keyblade.reward + '\n'
	],
	startingArmor: {
		reward: "EMPTY",
		index: "0000"
	},
	armorCode: [
		'// Starting Armor\n',
		'patch=1,EE,E0050003,extended,0032DFC8\n',
		'patch=1,EE,E0042002,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE6\n',
		'patch=1,EE,E0010001,extended,0032BAE8\n',
		'patch=1,EE,1032E034,extended,0000'
		//+ armor.index.padStart(4, '0') + ' // ' + armor.reward + '\n'
	],
	startingAccessory: {
		reward: "EMPTY",
		index: "0000"
	},
	accessoryCode: [
		'// Starting Accessory\n',
		'patch=1,EE,E0050003,extended,0032DFC8\n',
		'patch=1,EE,E0042002,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE6\n',
		'patch=1,EE,E0010001,extended,0032BAE8\n',
		'patch=1,EE,1032E044,extended,0000'
		//+ accessory.index.padStart(4, '0') + ' // ' + accessory.reward + '\n'
	],
	startingMunny: 0,
	munnyCode: [
		'//Starting Munny\n',
		'patch=1,EE,E0050003,extended,0032DFC8\n',
		'patch=1,EE,E0042002,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE6\n',
		'patch=1,EE,E0010001,extended,0032BAE8\n',
		'patch=1,EE,2032DF70,extended,'
		//+ munny.toString(16).toUpperCase().padStart(8, '0') + ' // ' + munny + ' munny\n'
	],
	startingHP: 20,
	hpCode: [
		'//Starting Max HP\n',
		'patch=1,EE,E0041A04,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE8\n',
		'patch=1,EE,01C6C754,extended,000000',
		//+ hp.toString(16).toUpperCase().padStart(2, '0') + ' // Max HP: ' + hp + '\n'
		'patch=1,EE,01C6C750,extended,000000'
		//+ hp.toString(16).toUpperCase().padStart(2, '0') + ' // Current HP: ' + hp + '\n'
	],
	startingMP: 100,
	mpCode: [
		'//Starting Max MP\n',
		'patch=1,EE,E0041A04,extended,0032BAE0\n',
		'patch=1,EE,E0030001,extended,0032BAE4\n',
		'patch=1,EE,E0020001,extended,0032BAE8\n',
		'patch=1,EE,01C6C8D4,extended,000000',
		//+ mp.toString(16).toUpperCase().padStart(2, '0') + ' //Max MP: ' + mp + '\n'
		'patch=1,EE,01C6C8D0,extended,000000'
		//+ mp.toString(16).toUpperCase().padStart(2, '0') + ' //Current MP: ' + mp + '\n'
	]
}

export default startingStatusData