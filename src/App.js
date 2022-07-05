import { React, useState } from 'react'
import { Tabs, Tab, Col } from 'react-bootstrap'

import SaveLoadModal from './Components/SaveLoadModal'
import Icon from './Components/Icon'
import HelpModal from './Components/HelpModal'

import Tracker from './Data/trackerData'

import HomePage from './home/HomePage'

import { chestsData } from './chests/ChestsData'
import ChestPage from './chests/ChestPage'
import { popupsData } from './popups/PopupsData'
import PopupPage from './popups/PopupPage'
import { bonusData } from './bonus/BonusData'
import BonusPage from './bonus/BonusPage'
import { formsData } from './forms/FormsData'
import FormPage from './forms/FormPage'
import { equipmentsData } from './equipment/EquipmentsData'
import EquipmentPage from './equipment/EquipmentPage'
import { levelsData } from './levels/LevelData'
import LevelPage from './levels/LevelPage'
import { magicData } from './magic/MagicData'
import MagicPage from './magic/MagicPage'



function FunctionApp() {
	//#region State
	const [allChests, setAllChests] = useState(chestsData)
	const [allPopups, setAllPopups] = useState(popupsData)
	const [allBonuses, setAllBonuses] = useState(bonusData)
	const [allForms, setAllForms] = useState(formsData)
	const [allEquipments, setAllEquipments] = useState(equipmentsData)
	const [allLevels, setAllLevels] = useState(levelsData)
	const [allMagic, setAllMagic] = useState(magicData)

	const [currentTab, setCurrentTab] = useState('home')

	const [isPnachCommented, setIsPnachCommented] = useState(true)
	const [isLuaCommented, setIsLuaCommented] = useState(true)
	//#endregion

	//#region General Functions
	function handleTracker(isPnach) {
		//Chest Tracker
		let chestTracker = allChests.reduce((prevWorlds, currentWorld) => {
			currentWorld.chests.forEach(chest => { prevWorlds = prevWorlds.update(chest.replacementReward.index) })
			return prevWorlds
		}, new Tracker())

		//Popup Tracker
		let popupTracker = allPopups.reduce((prevWorlds, currentWorld) => {
			currentWorld.popups.forEach(popup => { prevWorlds = prevWorlds.update(popup.replacementReward.index) })
			return prevWorlds
		}, new Tracker())

		//Bonus Tracker
		let finalBonusStats = {
			hp: 20,
			mp: 100,
			armor: 1,
			accessory: 1,
			item: 3,
			drive: 5
		}
		let bonusTracker = allBonuses.reduce((prevWorlds, currentWorld) => {
			currentWorld.bonusFights.forEach(bonusFight => {
				bonusFight.slots.filter(slot => Object.keys(slot).length !== 0).forEach(slot => {
					if (slot.replacementCharacter === 1) {
						finalBonusStats.hp += Math.floor(slot.hpIncrease / 2)
						finalBonusStats.mp += Math.floor(slot.mpIncrease / 2)
						finalBonusStats.armor += slot.armorSlotIncrease
						finalBonusStats.accessory += slot.accessorySlotIncrease
						finalBonusStats.item += slot.itemSlotIncrease
						finalBonusStats.drive += slot.driveGaugeIncrease
						prevWorlds = prevWorlds.update(slot.replacementRewardA.index)
						prevWorlds = prevWorlds.update(slot.replacementRewardB.index)
					}
				})
			})
			return prevWorlds
		}, new Tracker())
		let finalBonusStatsPnach = '//SORA\'S FINAL STATS IN CRITICAL MODE\n'
		let finalBonusStatsLua = '--SORA\'S FINAL STATS IN CRITICAL MODE\n'
		finalBonusStatsPnach += '// HP: ' + finalBonusStats.hp + '\n'
		finalBonusStatsLua += '-- HP: ' + finalBonusStats.hp + '\n'
		finalBonusStatsPnach += '// MP: ' + finalBonusStats.mp + '\n'
		finalBonusStatsLua += '-- MP: ' + finalBonusStats.mp + '\n'
		finalBonusStatsPnach += '// Armor: ' + finalBonusStats.armor + '\n'
		finalBonusStatsLua += '-- Armor: ' + finalBonusStats.armor + '\n'
		finalBonusStatsPnach += '// Accessory: ' + finalBonusStats.accessory + '\n'
		finalBonusStatsLua += '-- Accessory: ' + finalBonusStats.accessory + '\n'
		finalBonusStatsPnach += '// Item: ' + finalBonusStats.item + '\n'
		finalBonusStatsLua += '-- Item: ' + finalBonusStats.item + '\n'
		finalBonusStatsPnach += '// Drive: ' + Math.min(9, finalBonusStats.drive) + '\n'
		finalBonusStatsLua += '-- Drive: ' + Math.min(9, finalBonusStats.drive) + '\n'

		//Forms & Summons Tracker
		let formTracker = allForms.reduce((prevDriveForms, currentDriveForm) => {
			currentDriveForm.driveLevels.forEach(driveLevel => { prevDriveForms = prevDriveForms.update(driveLevel.replacementReward.index) })
			return prevDriveForms
		}, new Tracker())

		//Level Tracker
		let levelTracker = allLevels.reduce((prevLevels, currentLevel) => {
			prevLevels.sword = prevLevels.sword.update(currentLevel.replacementSwordReward.index)
			prevLevels.shield = prevLevels.shield.update(currentLevel.replacementShieldReward.index)
			prevLevels.staff = prevLevels.staff.update(currentLevel.replacementStaffReward.index)
			return prevLevels
		}, { sword: new Tracker(), shield: new Tracker(), staff: new Tracker() })

		return (isPnach)
			? [
				'//GAME STATUS\n',
				chestTracker.saveToPnach('CHEST') + '\n',
				popupTracker.saveToPnach('POPUP') + '\n',
				formTracker.saveToPnach('FORM & SUMMON') + '\n',
				'//LEVEL TALLY\n',
				levelTracker.sword.saveToPnach('SWORD') + '\n',
				levelTracker.shield.saveToPnach('SHIELD') + '\n',
				levelTracker.staff.saveToPnach('STAFF') + '\n',
				bonusTracker.saveToPnach('BONUS') + '\n',
				finalBonusStatsPnach + '\n'
			]
			: [
				'--GAME STATUS\n',
				chestTracker.saveToLua('CHEST') + '\n',
				popupTracker.saveToLua('POPUP') + '\n',
				formTracker.saveToLua('FORM & SUMMON') + '\n',
				'--LEVEL TALLY\n',
				levelTracker.sword.saveToLua('SWORD') + '\n',
				levelTracker.shield.saveToLua('SHIELD') + '\n',
				levelTracker.staff.saveToLua('STAFF') + '\n',
				bonusTracker.saveToLua('BONUS') + '\n',
				finalBonusStatsLua + '\n'
			]
	}
	function handleSaveAsPnach(fileName) {
		let trackerPnachCodes = isPnachCommented ? handleTracker(true) : []

		let chestPnachCodes = allChests.map(worldList => {
			let ret = isPnachCommented ? '// ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.chests.forEach(chest => { ret += chest.saveToPnach(isPnachCommented) })
			return ret
		})
		chestPnachCodes.unshift('\n//CHESTS\n')

		let popupPnachCodes = allPopups.map(worldList => {
			let ret = isPnachCommented ? '// ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.popups.forEach(popup => { ret += popup.saveToPnach(isPnachCommented) })
			return ret
		})
		popupPnachCodes.unshift('\n//POPUPS\n')

		let bonusPnachCodes = allBonuses.map(worldList => {
			let ret = isPnachCommented ? '// ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.bonusFights.forEach(bonusFight => { ret += bonusFight.saveToPnach(isPnachCommented) })
			return ret
		})
		bonusPnachCodes.unshift('\n//BONUS REWARDS\n')

		let formPnachCodes = allForms.map(driveForm => {
			let ret = isPnachCommented ? '// ' + driveForm.driveForm.toUpperCase() + '\n' : ''
			if (driveForm.driveLevels.some(driveFormLevel => driveFormLevel.isRewardReplaced()))
				if (driveForm.driveForm !== 'Summon')
					ret += driveForm.removeGrowthJankPnachCodes.join('')
			driveForm.driveLevels.forEach(driveLevel => { ret += driveLevel.saveToPnach(isPnachCommented) })
			return ret
		})
		formPnachCodes.unshift('\n//FORMS & SUMMONS\n')

		let equipmentPnachCodes = allEquipments.map(equipmentType => {
			let ret = isPnachCommented ? '// ' + equipmentType.equipmentType.toUpperCase() + '\n' : ''
			equipmentType.equipments.forEach(equipment => { ret += equipment.saveToPnach(isPnachCommented) })
			return ret
		})
		equipmentPnachCodes.unshift('\n//EQUIPMENT\n')

		let levelPnachCodes = allLevels.map(level => { return level.saveToPnach(isPnachCommented) })
		levelPnachCodes.unshift('\n//SORA LEVELS\n')

		let magicPnachCodes = allMagic.map(magicType => {
			let prefix = isPnachCommented ? '// ' + magicType.magicType.toUpperCase() + '\n' : ''
			let ret = ''
			let tempString = ''
			let tempLastAbility
			let magicChangeCount = 0
			let lastAbility
			magicType.abilities.forEach(ability => {
				[tempString, tempLastAbility] = ability.saveToPnach(isPnachCommented)
				if (tempString !== '') {
					ret += tempString
					lastAbility = tempLastAbility
					magicChangeCount++
				}
			})
			if (magicChangeCount > 0) {
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 3).toString(16).toUpperCase().padStart(2, '0') + 'FFFF,extended,1032BAE0 // If not on Title Screen\n'
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 2).toString(16).toUpperCase().padStart(2, '0') + '2002,extended,1032BAE0 // If not in Station of Serenity\n'
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 1).toString(16).toUpperCase().padStart(2, '0') + '0000,extended,1032BAD8 // If not screen transition\n'
				prefix += 'patch=1,EE,E1' + magicChangeCount.toString(16).toUpperCase().padStart(2, '0') + '00' + lastAbility.replacementCost.toString(16).toUpperCase().padStart(2, '0')
				prefix += ',extended,1' + lastAbility.costAddress.toString(16).toUpperCase().padStart(7, '0')
				if (isPnachCommented) prefix += ' // If ' + lastAbility.ability + '\'s MP Cost is not ' + lastAbility.replacementCost
				prefix += '\n'
			}
			return prefix + ret
		})
		magicPnachCodes.unshift('\n//MAGIC COSTS\n')

		let pnachCodes = [].concat(trackerPnachCodes, chestPnachCodes, popupPnachCodes, formPnachCodes, equipmentPnachCodes, bonusPnachCodes, levelPnachCodes, magicPnachCodes)


		const element = document.createElement('a')
		const file = new Blob(pnachCodes, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = fileName.length !== 0 ? '(' + fileName + ').pnach' : 'F266B00B.pnach'
		document.body.appendChild(element)
		element.click()
	}
	function handleSaveAsLua(fileName) {
		let trackerLuaCodes = isLuaCommented ? handleTracker(false) : []

		let chestLuaCodes = ['\nfunction Chests()\n'].concat(allChests.map(worldList => {
			let ret = isLuaCommented ? '\t-- ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.chests.forEach(chest => { ret += chest.saveToLua(isLuaCommented) })
			return ret
		}), ['end\n'])

		let popupLuaCodes = ['\nfunction Popups()\n'].concat(allPopups.map(worldList => {
			let ret = isLuaCommented ? '\t-- ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.popups.forEach(popup => { ret += popup.saveToLua(isLuaCommented) })
			return ret
		}), ['end\n'])

		let formLuaCodes = ['\nfunction DriveForms()\n'].concat(allForms.map(driveForm => {
			let ret = isLuaCommented ? '\t-- ' + driveForm.driveForm.toUpperCase() + '\n' : ''
			if (driveForm.driveLevels.some(driveFormLevel => driveFormLevel.isRewardReplaced()))
				if (driveForm.driveForm !== 'Summon')
					ret += driveForm.removeGrowthJankLuaCodes.join('')
			driveForm.driveLevels.forEach(driveFormLevel => { ret += driveFormLevel.saveToLua(isLuaCommented) })
			return ret
		}), ['end\n'])

		let equipmentLuaCodes = ['\nfunction Equipment()\n'].concat(allEquipments.map(equipmentTypeList => {
			let ret = isLuaCommented ? '\t-- ' + equipmentTypeList.equipmentType.toUpperCase() + '\n' : ''
			equipmentTypeList.equipments.forEach(equipment => { ret += equipment.saveToLua(isLuaCommented) })
			return ret
		}), ['end\n'])

		let bonusLuaCodes = ['\nfunction BonusRewards()\n'].concat(allBonuses.map(worldList => {
			let ret = isLuaCommented ? '\t-- ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.bonusFights.forEach(bonusFight => { ret += bonusFight.saveToLua(isLuaCommented) })
			return ret
		}), ['end\n'])

		let levelLuaCodes = ['\nfunction LevelRewards()\n'].concat(allLevels.map(level => { return level.saveToLua(isLuaCommented) }), ['end\n'])

		let magicCostLuaCodes = ['\nfunction MagicCosts()\n'].concat(allMagic.map(magicType => {
			let tempString = ''
			let ret = isLuaCommented ? '\t-- ' + magicType.magicType.toUpperCase() + '\n' : ''
			magicType.abilities.forEach(ability => {
				tempString = ability.saveToLua(isLuaCommented)[0]
				ret += tempString
			})
			return ret
		}), ['end\n'])

		let luaDefaultCodes = [
			'function _OnFrame()\n',
			'\tWorld = ReadByte(Now + 0x00)\n',
			'\tRoom = ReadByte(Now + 0x01)\n',
			'\tPlace = ReadShort(Now + 0x00)\n',
			'\tDoor = ReadShort(Now + 0x02)\n',
			'\tMap = ReadShort(Now + 0x04)\n',
			'\tBtl = ReadShort(Now + 0x06)\n',
			'\tEvt = ReadShort(Now + 0x08)\n',
			'\tChests()\n',
			'\tPopups()\n',
			'\tDriveForms()\n',
			'\tEquipment()\n',
			'\tBonusRewards()\n',
			'\tLevelRewards()\n',
			'\tMagicCosts()\n',
			'\tStartingAbilities()\n',
			'\tStartingStatus()\n',
			'\tCheats()\n',
			'end\n\n',
			'function _OnInit()\n',
			'\tif GAME_ID == 0xF266B00B or GAME_ID == 0xFAF99301 and ENGINE_TYPE == "ENGINE" then--PCSX2\n',
			'\t\tPlatform = \'PS2\'\n',
			'\t\tNow = 0x032BAE0 --Current Location\n',
			'\t\tSave = 0x032BB30 --Save File\n',
			'\t\tObj0 = 0x1C94100 --00objentry.bin\n',
			'\t\tSys3 = 0x1CCB300 --03system.bin\n',
			'\t\tBtl0 = 0x1CE5D80 --00battle.bin\n',
			'\t\tSlot1 = 0x1C6C750 --Unit Slot 1\n',
			'\telseif GAME_ID == 0x431219CC and ENGINE_TYPE == \'BACKEND\' then--PC\n',
			'\t\tPlatform = \'PC\'\n',
			'\t\tNow = 0x0714DB8 - 0x56454E\n',
			'\t\tSave = 0x09A7070 - 0x56450E\n',
			'\t\tObj0 = 0x2A22B90 - 0x56450E\n',
			'\t\tSys3 = 0x2A59DB0 - 0x56450E\n',
			'\t\tBtl0 = 0x2A74840 - 0x56450E\n',
			'\t\tSlot1 = 0x2A20C58 - 0x56450E\n',
			'\tend\n',
			'end\n\n',
			'function Events(M,B,E) --Check for Map, Btl, and Evt\n',
			'\treturn ((Map == M or not M) and (Btl == B or not B) and (Evt == E or not E))\n',
			'end\n\n'
		]

		let luaCodes = [].concat(trackerLuaCodes, luaDefaultCodes, chestLuaCodes, popupLuaCodes, formLuaCodes, equipmentLuaCodes, bonusLuaCodes, levelLuaCodes, magicCostLuaCodes,)

		const element = document.createElement('a')
		const file = new Blob(luaCodes, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = fileName.length !== 0 ? '(' + fileName + ').lua' : 'F266B00B.lua'
		document.body.appendChild(element)
		element.click()
	}
	function handleSaveAsJSON(fileName) {
		let chestSaveData = allChests.map(world => {
			let ret = ''
			world.chests.forEach(chest => { ret += chest.saveToJSON() })
			if (ret !== '')
				return '{"world":"' + world.world + '","chests":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		chestSaveData = ['"chestsData":[', chestSaveData.filter(s => s !== '').join(), '],']

		let popupSaveData = allPopups.map(world => {
			let ret = ''
			world.popups.forEach(popup => { ret += popup.saveToJSON() })
			if (ret !== '')
				return '{"world":"' + world.world + '","popups":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		popupSaveData = ['"popupsData":[', popupSaveData.filter(s => s !== '').join(), '],']

		let bonusSaveData = allBonuses.map(world => {
			let ret = ''
			world.bonusFights.forEach(bonusFight => { ret += bonusFight.saveToJSON() })
			if (ret !== '')
				return '{"world":"' + world.world + '","bonusFights":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		bonusSaveData = ['"bonusData":[', bonusSaveData.filter(s => s !== '').join(), '],']

		let formSaveData = allForms.map(driveForm => {
			let ret = ''
			driveForm.driveLevels.forEach(driveLevel => { ret += driveLevel.saveToJSON() })
			if (ret !== '')
				return '{"driveForm":"' + driveForm.driveForm + '","driveLevels":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		formSaveData = ['"formsData":[', formSaveData.filter(s => s !== '').join(), '],']

		let equipmentSaveData = allEquipments.map(equipmentType => {
			let ret = ''
			equipmentType.equipments.forEach(equipment => { ret += equipment.saveToJSON() })
			if (ret !== '')
				return '{"equipmentType":"' + equipmentType.equipmentType + '","equipments":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		equipmentSaveData = ['"equipmentsData":[', equipmentSaveData.filter(s => s !== '').join(), '],']

		let levelSaveData = ['"levelsData":[', allLevels.map(level => { return level.saveToJSON() }).join('').slice(0, -1), '],']

		let magicCostSaveData = allMagic.map(magicType => {
			let ret = ''
			magicType.abilities.forEach(ability => { ret += ability.saveToJSON() })
			if (ret !== '')
				return '{"magicType":"' + magicType.magicType + '","abilities":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		magicCostSaveData = ['"magicData":[', magicCostSaveData.filter(s => s !== '').join(), '],']

		let saveData = ['{',
			chestSaveData.join(''),
			popupSaveData.join(''),
			bonusSaveData.join(''),
			formSaveData.join(''),
			equipmentSaveData.join(''),
			levelSaveData.join(''),
			magicCostSaveData.join('').slice(0, -1),
			'}']

		const element = document.createElement("a")
		const file = new Blob(saveData, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = fileName.length !== 0 ? fileName + '.json' : 'save_data.json'
		document.body.appendChild(element)
		element.click()
	}
	function onFileUpload(loadData) {
		let allLoadData = JSON.parse(loadData)
		let globalIndex = 0

		let chestLoadData = (allLoadData.hasOwnProperty('chestsData') ? allLoadData.chestsData : [])
		let newAllChests = chestsData.map(world => {
			if (globalIndex < chestLoadData.length) {
				if (chestLoadData[globalIndex].world === world.world) {
					let chestIndex = 0
					let newChests = world.chests.map(chest => {
						if (chestIndex < chestLoadData[globalIndex].chests.length) {
							if (chestLoadData[globalIndex].chests[chestIndex].vanillaAddress === chest.vanillaAddress) {
								let ret = chest.loadFromJSON(chestLoadData[globalIndex].chests[chestIndex])
								chestIndex++
								return ret
							}
						}
						return chest
					})
					globalIndex++
					return {
						...world,
						chests: newChests
					}
				}
			}
			return world
		})
		globalIndex = 0

		let popupLoadData = (allLoadData.hasOwnProperty('popupsData') ? allLoadData.popupsData : [])
		let newAllPopups = popupsData.map(world => {
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
		globalIndex = 0

		let bonusLoadData = (allLoadData.hasOwnProperty('bonusData') ? allLoadData.bonusData : [])
		let newAllBonuses = bonusData.map(world => {
			if (globalIndex < bonusLoadData.length) {
				if (bonusLoadData[globalIndex].world === world.world) {
					let bonusIndex = 0
					let newBonuses = world.bonusFights.map(bonusFight => {
						if (bonusIndex < bonusLoadData[globalIndex].bonusFights.length) {
							if (bonusLoadData[globalIndex].bonusFights[bonusIndex].fight === bonusFight.fight) {
								let ret = bonusFight.loadFromJSON(bonusLoadData[globalIndex].bonusFights[bonusIndex])
								bonusIndex++
								return ret
							}
						}
						return bonusFight
					})
					globalIndex++
					return {
						...world,
						bonusFights: newBonuses
					}
				}
			}
			return world
		})
		globalIndex = 0

		let formLoadData = (allLoadData.hasOwnProperty('formsData') ? allLoadData.formsData : [])
		let newAllForms = formsData.map(driveForm => {
			if (globalIndex < formLoadData.length) {
				if (formLoadData[globalIndex].driveForm === driveForm.driveForm) {
					let formIndex = 0
					let newForms = driveForm.driveLevels.map(driveLevel => {
						if (formIndex < formLoadData[globalIndex].driveLevels.length) {
							if (formLoadData[globalIndex].driveLevels[formIndex].level === driveLevel.level) {
								let ret = driveLevel.loadFromJSON(formLoadData[globalIndex].driveLevels[formIndex])
								formIndex++
								return ret
							}
						}
						return driveLevel
					})
					globalIndex++
					return {
						...driveForm,
						driveLevels: newForms
					}
				}
			}
			return driveForm
		})
		globalIndex = 0

		let equipmentLoadData = (allLoadData.hasOwnProperty('equipmentsData') ? allLoadData.equipmentsData : [])
		let newAllEquipments = equipmentsData.map(equipmentType => {
			if (globalIndex < equipmentLoadData.length) {
				if (equipmentLoadData[globalIndex].equipmentType === equipmentType.equipmentType) {
					let equipmentIndex = 0
					let newEquipments = equipmentType.equipments.map(equipment => {
						if (equipmentIndex < equipmentLoadData[globalIndex].equipments.length) {
							if (equipmentLoadData[globalIndex].equipments[equipmentIndex].name === equipment.name) {
								let ret = equipment.loadFromJSON(equipmentLoadData[globalIndex].equipments[equipmentIndex])
								equipmentIndex++
								return ret
							}
						}
						return equipment
					})
					globalIndex++
					return {
						...equipmentType,
						equipments: newEquipments
					}
				}
			}
			return equipmentType
		})
		globalIndex = 0

		let levelLoadData = (allLoadData.hasOwnProperty('levelsData') ? allLoadData.levelsData : [])
		let newAllLevels = levelsData.map(level => {
			if (globalIndex < levelLoadData.length) {
				if (levelLoadData[globalIndex].level === level.level) {
					let ret = level.loadFromJSON(levelLoadData[globalIndex])
					globalIndex++
					return ret
				}
			}
			return level
		})
		globalIndex = 0

		let magicLoadData = (allLoadData.hasOwnProperty('magicData') ? allLoadData.magicData : [])
		let newAllMagics = magicData.map(magicType => {
			if (globalIndex < magicLoadData.length) {
				if (magicLoadData[globalIndex].magicType === magicType.magicType) {
					let magicIndex = 0
					let newMagics = magicType.abilities.map(ability => {
						if (magicIndex < magicLoadData[globalIndex].abilities.length) {
							if (magicLoadData[globalIndex].abilities[magicIndex].costAddress === ability.costAddress) {
								let ret = ability.loadFromJSON(magicLoadData[globalIndex].abilities[magicIndex])
								magicIndex++
								return ret
							}
						}
						return ability
					})
					globalIndex++
					return {
						...magicType,
						abilities: newMagics
					}
				}
			}
			return magicType
		})
		globalIndex = 0

		setAllChests(newAllChests)
		setAllPopups(newAllPopups)
		setAllBonuses(newAllBonuses)
		setAllForms(newAllForms)
		console.log(newAllEquipments)
		setAllEquipments(newAllEquipments)
		setAllLevels(newAllLevels)
		setAllMagic(newAllMagics)
	}
	//#endregion

	let styles = {
		marginTop: '10px',
		marginRight: '10px',
		marginBottom: '10px',
		marginLeft: '10px',
		color: '#fff'
	}

	let saveLoadModal = <SaveLoadModal
		isPnachCommented={isPnachCommented}
		isLuaCommented={isLuaCommented}
		onPnachCommentChange={() => { setIsPnachCommented(!isPnachCommented) }}
		onLuaCommentChange={() => { setIsLuaCommented(!isLuaCommented) }}
		handleSaveAsPnach={handleSaveAsPnach}
		handleSaveAsLua={handleSaveAsLua}
		handleSaveAsJSON={handleSaveAsJSON}
		onFileUpload={(e) => {
			let file = e.target.files[0]
			let reader = new FileReader()
			reader.readAsText(file)
			reader.onload = (e) => onFileUpload(e.target.result)
		}}
	/>

	return (
		<div style={styles}>
			<Tabs defaultActiveKey={currentTab} id='allTabs' transition={false} onSelect={(newTab) => setCurrentTab(newTab)}>
				{/* Home */}
				<Tab
					eventKey='home'
					title={
						<>
							<Icon
								fileName={'home'}
								type={'tab'}
							>
								{'Home'}
							</Icon>
						</>
					}
				>
					<HomePage>
						<Col xs={2}>
							{saveLoadModal}
						</Col>
					</HomePage>
				</Tab>
				{/* Chest */}
				<Tab
					eventKey='chest'
					title={
						<>
							<Icon
								fileName={'chest'}
								type={'tab'}
							>
								{'Chest'}
							</Icon>
						</>}
				>
					<ChestPage
						chestData={allChests}
						setAllChests={setAllChests}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</ChestPage>
				</Tab>
				{/* Popup */}
				<Tab
					eventKey='popup'
					title={
						<>
							<Icon
								fileName={'popup'}
								type={'tab'}
							>
								{'Popup'}
							</Icon>
						</>}
				>
					<PopupPage
						popupData={allPopups}
						setAllPopups={setAllPopups}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</PopupPage>
				</Tab>
				{/* Bonus */}
				<Tab
					eventKey='bonus'
					title={
						<>
							<Icon
								fileName={'key'}
								type={'tab'}
							>
								{'Bonus'}
							</Icon>
						</>}
				>
					<BonusPage
						bonusData={allBonuses}
						setAllBonuses={setAllBonuses}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</BonusPage>
				</Tab>
				{/* Form */}
				<Tab
					eventKey='form'
					title={
						<>
							<Icon
								fileName={'form'}
								type={'tab'}
							>
								{'Forms & Summons'}
							</Icon>
						</>}
				>
					<FormPage
						formData={allForms}
						setAllForms={setAllForms}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</FormPage>
				</Tab>
				{/* Equipment */}
				<Tab
					eventKey='equipment'
					title={
						<>
							<Icon
								fileName={'keyblade'}
								type={'tab'}
							>
								{'Equipment'}
							</Icon>
						</>}
				>
					<EquipmentPage
						equipmentData={allEquipments}
						setAllEquipments={setAllEquipments}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</EquipmentPage>
				</Tab>
				{/* Level */}
				<Tab
					eventKey='level'
					title={
						<>
							<Icon
								fileName={'level'}
								type={'tab'}
							>
								{'Levels'}
							</Icon>
						</>}
				>
					<LevelPage
						levelData={allLevels}
						setAllLevels={setAllLevels}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</LevelPage>
				</Tab>
				{/* Magic and Limits */}
				<Tab
					eventKey='magic'
					title={
						<>
							<Icon
								fileName={'spell'}
								type={'tab'}
							>
								{'Magic & Limits'}
							</Icon>
						</>}
				>
					<MagicPage
						magicData={allMagic}
						setAllMagic={setAllMagic}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</MagicPage>
				</Tab>
			</Tabs>
		</div>
	)
}

export default FunctionApp