import { Reward } from "./rewardsData"

export class StartingStatus {
	constructor() {
		this.keyblade = new Reward('Kingdom Key', 0x0029, 'Keyblade')
		this.armor = new Reward('EMPTY', 0x0000, 'EMPTY')
		this.accessory = new Reward('EMPTY', 0x0000, 'EMPTY')
		this.munny = 0
		this.hp = 20
		this.mp = 100

		this.vanilla = () => {
			return new StartingStatus()
		}
		this.replace = (newStartingData) => {
			let ret = new StartingStatus()
			ret.keyblade = newStartingData.keyblade.index !== undefined ? { ...newStartingData.keyblade } : new Reward('Kingdom Key', 0x0029, 'Keyblade')
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
			let equipmentMods = ''
			let statMods = ''
			let equipmentLineCount = 0
			let statLineCount = 0

			if (this.munny !== 0) {
				equipmentMods += 'patch=1,EE,2032DF70,extended,' + this.munny.toString(16).toUpperCase().padStart(8, '0')
				if (isCommented) equipmentMods += ' // Starting Munny: ' + this.munny
				equipmentMods += '\n'
				equipmentLineCount++
			} else if (isCommented) equipmentMods += '// Vanilla starting Munny of 0\n'

			if (this.keyblade.index !== 0x0029) {
				equipmentMods += 'patch=1,EE,1032E020,extended,0000' + this.keyblade.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) equipmentMods += ' // Starting Keyblade: ' + this.keyblade.reward
				equipmentMods += '\n'
				equipmentLineCount++
			} else if (isCommented) equipmentMods += '// Vanilla starting Keyblade of Kingdom Key\n'

			if (this.armor.index !== 0x0000) {
				equipmentMods += 'patch=1,EE,1032E034,extended,0000' + this.armor.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) equipmentMods += ' // Starting Armor: ' + this.armor.reward
				equipmentMods += '\n'
				equipmentLineCount++
			} else if (isCommented) equipmentMods += '// Vanilla starting Armor of EMPTY\n'

			if (this.accessory.index !== 0x0000) {
				equipmentMods += 'patch=1,EE,1032E044,extended,0000' + this.accessory.index.toString(16).toUpperCase().padStart(4, '0')
				if (isCommented) equipmentMods += ' // Starting Accessory: ' + this.accessory.reward
				equipmentMods += '\n'
				equipmentLineCount++
			} else if (isCommented) equipmentMods += '// Vanilla starting Accessory of EMPTY\n'

			if (this.hp !== 20) {
				statMods += 'patch=1,EE,01C6C754,extended,000000' + this.hp.toString(16).toUpperCase().padStart(2, '0')
				if (isCommented) statMods += ' // Max HP: ' + this.hp
				statMods += '\npatch=1,EE,01C6C750,extended,000000' + this.hp.toString(16).toUpperCase().padStart(2, '0')
				if (isCommented) statMods += ' // Current HP: ' + this.hp
				statMods += '\n'
				statLineCount += 2
			} else if (isCommented) ret += '// Vanilla starting HP of 20\n'

			if (this.mp !== 100) {
				statMods += 'patch=1,EE,01C6C8D4,extended,000000' + this.mp.toString(16).toUpperCase().padStart(2, '0')
				if (isCommented) statMods += ' // Max MP: ' + this.mp
				statMods += '\npatch=1,EE,01C6C8D0,extended,000000' + this.mp.toString(16).toUpperCase().padStart(2, '0')
				if (isCommented) statMods += ' // Current MP: ' + this.mp
				statMods += '\n'
				statLineCount += 2
			} else if (isCommented) statMods += '// Vanilla starting MP of 100\n'

			if (equipmentLineCount !== 0) {
				if (isCommented) ret += '//Starting Munny and Equipment\n'
				ret += 'patch=1,EE,E0' + (equipmentLineCount + 3).toString(16).toUpperCase().padStart(2, '0') + '2002,extended,0032BAE0\n'
				ret += 'patch=1,EE,E0' + (equipmentLineCount + 2).toString(16).toUpperCase().padStart(2, '0') + '0001,extended,0032BAE4\n'
				ret += 'patch=1,EE,E0' + (equipmentLineCount + 1).toString(16).toUpperCase().padStart(2, '0') + '0001,extended,0032BAE6\n'
				ret += 'patch=1,EE,E0' + equipmentLineCount.toString(16).toUpperCase().padStart(2, '0') + '0001,extended,0032BAE8\n'
				ret += equipmentMods + '\n'
			}

			if (statLineCount !== 0) {
				if (isCommented) ret += '//Starting HP and MP \n'
				ret += 'patch=1,EE,E0' + (statLineCount + 2).toString(16).toUpperCase().padStart(2, '0') + '1A04,extended,0032BAE0\n'
				ret += 'patch=1,EE,E0' + (statLineCount + 1).toString(16).toUpperCase().padStart(2, '0') + '0001,extended,0032BAE4\n'
				ret += 'patch=1,EE,E0' + statLineCount.toString(16).toUpperCase().padStart(2, '0') + '0001,extended,0032BAE8\n'
				ret += statMods + '\n'
			}

			return ret
		}
		this.saveToLua = (isCommented) => {
			let ret = ''
			let equipmentMods = ''
			let statMods = ''
			let equipmentLineCount = 0
			let statLineCount = 0

			if (this.munny !== 0) {
				equipmentMods += '\t\tWriteShort(Save+0x2440, 0x' + this.munny.toString(16).toUpperCase().padStart(4, '0') + ')'
				if (isCommented) equipmentMods += ' -- Starting Munny: ' + this.munny
				equipmentMods += '\n'
				equipmentLineCount++
			} else if (isCommented) equipmentMods += '\t-- Vanilla starting Munny of 0\n'

			if (this.keyblade.index !== 0x0029) {
				equipmentMods += '\t\tWriteShort(Save+0x24F0, 0x' + this.keyblade.index.toString(16).toUpperCase().padStart(4, '0') + ')'
				if (isCommented) equipmentMods += ' -- Starting Keyblade: ' + this.keyblade.reward
				equipmentMods += '\n'
				equipmentLineCount++
			} else if (isCommented) equipmentMods += '\t-- Vanilla starting Keyblade of Kingdom Key\n'

			if (this.armor.index !== 0x0000) {
				equipmentMods += '\t\tWriteShort(Save+0x2504, 0x' + this.armor.index.toString(16).toUpperCase().padStart(4, '0') + ')'
				if (isCommented) equipmentMods += ' -- Starting Armor: ' + this.armor.reward
				equipmentMods += '\n'
				equipmentLineCount++
			} else if (isCommented) equipmentMods += '\t-- Vanilla starting Armor of EMPTY\n'

			if (this.accessory.index !== 0x0000) {
				equipmentMods += '\t\tWriteShort(Save+0x2514, 0x' + this.accessory.index.toString(16).toUpperCase().padStart(4, '0') + ')'
				if (isCommented) equipmentMods += ' -- Starting Accessory: ' + this.accessory.reward
				equipmentMods += '\n'
				equipmentLineCount++
			} else if (isCommented) equipmentMods += '\t-- Vanilla starting Accessory of EMPTY\n'

			if (this.hp !== 20) {
				statMods += '\t\tWriteByte(Slot1+0x0, 0x' + this.hp.toString(16).toUpperCase().padStart(2, '0') + ')'
				if (isCommented) statMods += ' -- Current HP: ' + this.hp
				statMods += '\n\t\tWriteByte(Slot1+0x4, 0x' + this.hp.toString(16).toUpperCase().padStart(2, '0') + ')'
				if (isCommented) statMods += ' -- Max HP: ' + this.hp
				statMods += '\n'
				statLineCount++
			} else if (isCommented) statMods += '\t-- Vanilla starting HP of 20\n'

			if (this.mp !== 100) {
				statMods += '\t\tWriteByte(Slot1+0x180, 0x' + this.mp.toString(16).toUpperCase().padStart(2, '0') + ')'
				if (isCommented) statMods += ' -- Current MP: ' + this.mp
				statMods += '\n\t\tWriteByte(Slot1+0x184, 0x' + this.mp.toString(16).toUpperCase().padStart(2, '0') + ')'
				if (isCommented) statMods += ' -- Max MP: ' + this.mp
				statMods += '\n'
				statLineCount++
			} else if (isCommented) statMods += '\t-- Vanilla starting MP of 100\n'

			if (equipmentLineCount !== 0) {
				if (isCommented) ret += '\t--Starting Equipment and Munny\n'
				ret += '\tif ReadInt(Now+0x0) == 0x2002 '
				ret += 'and ReadInt(Now+0x4) == 0x1 '
				ret += 'and ReadInt(Now+0x6) == 0x1 '
				ret += 'and ReadInt(Now+0x8) == 0x1 then\n'
				ret += equipmentMods + '\tend\n'
			}

			if (statLineCount !== 0) {
				if (isCommented) ret += '\t--Starting Stats \n'
				ret += '\tif ReadInt(Now+0x0) == 0x1A04 '
				ret += 'and ReadInt(Now+0x4) == 0x1 '
				ret += 'and ReadInt(Now+0x8) == 0x1 then\n'
				ret += statMods + '\tend\n'
			}

			return ret
		}
	}
}

export const startingStatusData = new StartingStatus()