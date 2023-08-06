import { Chest } from '../chests/ChestsData'
import { Popup } from '../popups/PopupsData'
import { BonusFight } from '../bonus/BonusData'
import { FormLevel } from '../forms/FormsData'
import { Equipment } from '../equipment/EquipmentsData'
import { Level } from '../levels/LevelData'
import { AbilityCost } from '../cost/CostsData'
import { StartingStatus } from '../starting/StartingStatusData'

export class ZipSeed {
  constructor() {
    this.BonsList = ''
    this.FmlvList = ''
    this.ItemList = ''
    this.jm = ''
    this.mod = ''
    this.LvupList = ''
    this.PlrpList = ''
    this.sys = ''
    this.TrsrList = ''
    this.CmdList = ''

    this.generateBonsList = (bonusData, isCommented) => {
      let ret = BonusFight.saveToYml(bonusData, isCommented)
      this.BonsList = ret.length > 0 ? ret.slice(0, -1) : ret
      return this.BonsList
    }
    this.generateFmlvList = (formData, isCommented) => {
      let ret = FormLevel.saveToYml(formData, isCommented)
      this.FmlvList = ret.length > 0 ? ret.slice(0, -1) : ret
      return this.FmlvList
    }
    this.generateItemList = (equipmentData, isCommented) => {
      let ret = Equipment.saveToYml(equipmentData, isCommented)
      this.ItemList = ret.length > 0 ? ret = 'Stats:\n' + ret.slice(0, -1) : ret
      return this.ItemList
    }
    this.generateJm = () => {
      let ret =
        '- en: Defeat Xemnas at the top of the Castle\n' +
        '  id: 20279\n' +
        '- en: Defeat Storm Rider\n' +
        '  id: 20280\n' +
        '- en: Defeat Xaldin in the Courtyard\n' +
        '  id: 20281\n' +
        '- en: Defeat Dr. Finkelstein\'s Experiment\n' +
        '  id: 20282\n' +
        '- en: Defeat Genie Jafar\n' +
        '  id: 20283\n' +
        '- en: Defeat Hades\n' +
        '  id: 20284\n' +
        '- en: Defeat Groundshaker\n' +
        '  id: 20285\n' +
        '- en: Fight alongside Axel in the world Between\n' +
        '  id: 20286\n' +
        '- en: Defend Hollow Bastion from the Heartless Army\n' +
        '  id: 20287\n' +
        '- en: Defeat Grim Reaper II\n' +
        '  id: 20288\n' +
        '- en: Protect the Cornerstone of Light from Pete\n' +
        '  id: 20289\n' +
        '- en: Defeat the Master Control Program\n' +
        '  id: 20290\n' +
        '- en: Confront DiZ in the Mansion\'s Pod Room\n' +
        '  id: 20291\n'
      this.jm = ret
      return this.jm
    }
    this.generateLvupList = (levelData, isCommented) => {
      let ret = Level.saveToYml(levelData, isCommented)
      this.LvupList = ret.length > 0 ? ret = 'Sora:\n' + ret.slice(0, -1) : ret
      return this.LvupList
    }
    this.generatePlrpList = (startingStatusData, isCommented) => {
      let ret = StartingStatus.saveToYml(startingStatusData, isCommented)
      this.PlrpList = ret.length > 0 ? ret.slice(0, -1) : ret
      return this.PlrpList
    }
    this.generateTrsrList = (chestData, popupData, isCommented) => {
      let ret = Chest.saveToYml(chestData, isCommented)
      ret += Popup.saveToYml(popupData, isCommented)
      this.TrsrList = ret.length > 0 ? ret.slice(0, -1) : ret
      return ret.length > 0 ? ret.slice(0, -1) : ret
    }
    this.generateSys = () => {
      let ret = ''
      this.sys = ret.length > 0 ? ret.slice(0, -1) : ret
      return this.sys
    }
    this.generateCmdList = (costData, isCommented) => {
      let ret = AbilityCost.saveToYml(costData, isCommented)
      this.CmdList = ret.length > 0 ? ret.slice(0, -1) : ret
      return ret.length > 0 ? ret.slice(0, -1) : ret
    }
    this.generateMod = (fileName, seedDescription) => {
      let ret =
        'assets:\n' +
        '- method: binarc\n' +
        '  multi:\n' +
        '  - name: msg/us/jm.bar\n' +
        '  - name: msg/uk/jm.bar\n' +
        '  name: msg/jp/jm.bar\n' +
        '  source:\n' +
        '  - method: kh2msg\n' +
        '    name: jm\n' +
        '    source:\n' +
        '    - language: en\n' +
        '      name: jm.yml\n' +
        '    type: list\n'
      if (this.FmlvList.length + this.LvupList.length + this.BonsList.length + this.PlrpList.length > 0) {
        ret +=
          '- method: binarc\n' +
          '  name: 00battle.bin\n' +
          '  source:\n'
        if (this.FmlvList.length > 0) {
          ret +=
            '  - method: listpatch\n' +
            '    name: fmlv\n' +
            '    source:\n' +
            '    - name: FmlvList.yml\n' +
            '      type: fmlv\n' +
            '    type: List\n'
        }
        if (this.LvupList.length > 0) {
          ret +=
            '  - method: listpatch\n' +
            '    name: lvup\n' +
            '    source:\n' +
            '    - name: LvupList.yml\n' +
            '      type: lvup\n' +
            '    type: List\n'
        }
        if (this.BonsList.length > 0) {
          ret +=
            '  - method: listpatch\n' +
            '    name: bons\n' +
            '    source:\n' +
            '    - name: BonsList.yml\n' +
            '      type: bons\n' +
            '    type: List\n'
        }
        if (this.PlrpList.length > 0) {
          ret +=
            '  - method: listpatch\n' +
            '    name: plrp\n' +
            '    source:\n' +
            '    - name: PlrpList.yml\n' +
            '      type: plrp\n' +
            '    type: List\n'
        }
      }
      if (this.TrsrList.length + this.ItemList.length + this.CmdList.length > 0) {
        ret +=
          '- method: binarc\n' +
          '  name: 03system.bin\n' +
          '  source:\n'
        if (this.TrsrList.length > 0) {
          ret +=
            '  - method: listpatch\n' +
            '    name: trsr\n' +
            '    source:\n' +
            '    - name: TrsrList.yml\n' +
            '      type: trsr\n' +
            '    type: List\n'
        }
        if (this.ItemList.length > 0) {
          ret +=
            '  - method: listpatch\n' +
            '    name: item\n' +
            '    source:\n' +
            '    - name: ItemList.yml\n' +
            '      type: item\n' +
            '    type: List\n'
        }
        if (this.CmdList.length > 0) {
          ret +=
            '  - method: listpatch\n' +
            '    name: cmd\n' +
            '    source:\n' +
            '    - name: CmdList.yml\n' +
            '      type: cmd\n' +
            '    type: List\n'
        }
      }
      ret += 'title: ' + fileName + '\n'
      ret += 'description: ' + seedDescription + '\n'
      this.mod = ret
      return this.mod
    }
  }
}