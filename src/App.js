import { React, useState, useEffect } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { pageList } from './Data/typesData'
import { rewardsData } from './Data/rewardsData'
import { chestsData } from './Data/chestsData'
import { popupsData } from './Data/popupsData'
import { bonusData } from './Data/bonusData'
import { formsData } from './Data/formsData'
import { equipmentsData } from './Data/equipmentsData'
import { levelsData } from './Data/levelsData'
import { magicsData } from './Data/magicData'
import { criticalData } from './Data/criticalData'
import { cheatsData } from './Data/cheatsData'
import { startingStatusData } from './Data/startingStatusData'

import Tracker from './Data/trackerData'

import HomePage from './Pages/HomePage'
import ChestPage from './Pages/ChestPage'
import PopupPage from './Pages/PopupPage'
import BonusPage from './Pages/BonusPage'
import FormPage from './Pages/FormPage'
import EquipmentPage from './Pages/EquipmentPage'
import LevelPage from './Pages/LevelPage'
import MagicPage from './Pages/MagicPage'
import CriticalPage from './Pages/CriticalPage'
import CheatPage from './Pages/CheatPage'
import StartingPage from './Pages/StartingPage'

import SaveLoadModal from './Components/SaveLoadModal'
import Icon from './Components/Icon'

function FunctionApp() {
	//#region State
	const [chestFieldData, setChestFieldData] = useState({
		currentWorld: 0,
		currentRewardType: 0,
		currentReward: 0,
		selectAll: false
	})
	const [allChests, setAllChests] = useState(chestsData)
	const [popupFieldData, setPopupFieldData] = useState({
		currentWorld: 0,
		currentRewardType: 0,
		currentReward: 0,
		selectAll: false
	})
	const [allPopups, setAllPopups] = useState(popupsData)
	const [bonusFieldData, setBonusFieldData] = useState({
		currentWorld: 0,
		currentFight: 0,
		currentCharacter: 0,
		currentARewardType: 0,
		currentAReward: 0,
		currentBRewardType: 0,
		currentBReward: 0,
		currentBonusHP: 0,
		currentBonusMP: 0,
		currentArmor: 0,
		currentAccessory: 0,
		currentItem: 0,
		currentDrive: 0,
		selectAll: false
	})
	const [allBonuses, setAllBonuses] = useState(bonusData)
	const [formFieldData, setFormFieldData] = useState({
		currentDriveForm: 0,
		currentRewardType: 0,
		currentReward: 0,
		currentEXPMultiplierValue: 2,
		currentEXP: 1,
		selectAll: false
	})
	const [allForms, setAllForms] = useState(formsData)
	const [equipmentFieldData, setEquipmentFieldData] = useState({
		currentEquipmentType: 0,
		currentRewardType: 0,
		currentReward: 0,
		currentStrength: 0,
		currentMagic: 0,
		currentAP: 0,
		currentDefense: 0,
		currentPhysical: 0,
		currentFire: 0,
		currentBlizzard: 0,
		currentThunder: 0,
		currentDark: 0,
		currentLight: 0,
		currentUniversal: 0,
		selectAll: false,
	})
	const [allEquipments, setAllEquipments] = useState(equipmentsData)
	const [levelFieldData, setLevelFieldData] = useState({
		currentSwordRewardType: 0,
		currentSwordReward: 0,
		currentShieldRewardType: 0,
		currentShieldReward: 0,
		currentStaffRewardType: 0,
		currentStaffReward: 0,
		currentLevelAP: 0,
		currentLevelDefense: 0,
		currentLevelMagic: 0,
		currentLevelStrength: 0,
		currentEXP: 1,
		currentEXPMultiplierValue: 2,
		selectAll: false
	})
	const [allLevels, setAllLevels] = useState(levelsData)
	const [magicFieldData, setMagicFieldData] = useState({
		currentMagicType: 0,
		currentCost: 0,
		selectAll: false
	})
	const [allMagics, setAllMagics] = useState(magicsData)
	const [criticalFieldData, setCriticalFieldData] = useState({
		currentRewardType: 0,
		currentReward: 0,
		selectAll: false
	})
	const [allCriticals, setAllCriticals] = useState(criticalData)
	const [cheatFieldData, setCheatFieldData] = useState({
		selectAll: false
	})
	const [allCheats, setAllCheats] = useState(cheatsData)
	const [startingStatusFieldData, setStartingStatusFieldData] = useState({
		currentKeyblade: 0,
		currentArmor: 0,
		currentAccessory: 0,
		currentMunny: 0,
		currentStartingHP: 20,
		currentStartingMP: 100,
		currentDonald1: 28,
		currentDonald2: 29,
		currentGoofy1: 33,
		currentGoofy2: 64,
	})
	const [startingStatus, setStartingStatus] = useState(startingStatusData)
	const alertUser = e => {
		e.preventDefault()
		e.returnValue = ''
	}
	useEffect(() => {
		window.addEventListener('beforeunload', alertUser)
		return () => {
			window.removeEventListener('beforeunload', alertUser)
		}
	}, [])
	//#endregion

	//#region Bonus Jank City
	function handleBonusTableChange(nextWorld, nextFight) {
		let newAllBonuses = allBonuses.map((world, worldID) => {
			if (worldID === bonusFieldData.currentWorld) {
				let toBeStoredWorldFights = world.bonusFights.map((fight, fightID) => {
					if (fightID === bonusFieldData.currentFight) {
						return fight.markForReplacement(false, -1)
					}
					return fight
				})
				return {
					...world,
					bonusFights: toBeStoredWorldFights
				}
			}
			return world
		})
		setAllBonuses(newAllBonuses)
		setBonusFieldData({
			...bonusFieldData,
			currentWorld: parseInt(nextWorld),
			currentFight: parseInt(nextFight),
			selectAll: false
		})
	}
	function onBonusRowCheck(row) {
		let newAllBonuses = allBonuses.map((worldList, worldListID) => {
			if (worldListID === bonusFieldData.currentWorld) {
				let newBonusFightsList = worldList.bonusFights.map((bonusFight, bonusFightID) => {
					if (bonusFightID === bonusFieldData.currentFight)
						return bonusFight.markForReplacement(!bonusFight.slots[row].toBeReplaced, parseInt(row))
					return bonusFight
				})
				return {
					...worldList,
					bonusFights: newBonusFightsList
				}
			}
			return worldList
		})
		setAllBonuses(newAllBonuses)
	}
	function onBonusCheckAll() {
		let newSelectAll = !bonusFieldData.selectAll
		let newAllBonuses = allBonuses.map((worldList, worldListID) => {
			if (worldListID === bonusFieldData.currentWorld) {
				let newBonusFightsList = worldList.bonusFights.map((bonusFight, bonusFightID) => {
					if (bonusFightID === bonusFieldData.currentFight)
						return bonusFight.markForReplacement(newSelectAll, -1)
					return bonusFight
				})
				return {
					...worldList,
					bonusFights: newBonusFightsList
				}
			}
			return worldList
		})
		setAllBonuses(newAllBonuses)
		setBonusFieldData({
			...bonusFieldData,
			selectAll: newSelectAll
		})
	}
	function handleBonusReplace(toReplace, replacement) {
		let newAllBonuses = allBonuses.map((worldList, worldListID) => {
			if (worldListID === bonusFieldData.currentWorld) {
				let newBonusFights = worldList.bonusFights.map((bonusFight, bonusFightID) => {
					if (bonusFightID === bonusFieldData.currentFight)
						return toReplace
							? bonusFight.replace(replacement)
							: bonusFight.vanilla()
					return bonusFight
				})
				return {
					...worldList,
					bonusFights: newBonusFights
				}
			}
			return worldList
		})
		setAllBonuses(newAllBonuses)
		setBonusFieldData({
			...bonusFieldData,
			selectAll: false
		})
	}
	//#endregion

	//#region General Functions
	function handleTableChange(nextIndex, currentIndexFieldName, dataFieldName, fieldData, setFieldData, allData, setAllData) {
		let newAllData = allData.map((objectList, objectListID) => {
			if (objectListID === fieldData[currentIndexFieldName]) {
				return {
					...objectList,
					[dataFieldName]: objectList[dataFieldName].map(object => {
						return object.markForReplacement(false)
					})
				}
			}
			return objectList
		})
		setAllData(newAllData)
		setFieldData({
			...fieldData,
			[currentIndexFieldName]: parseInt(nextIndex),
			selectAll: false
		})
	}
	function handleReplace(isShallow, toReplace, replacement, currentIndexFieldName, fieldName, fieldData, setFieldData, allData, setAllData) {
		let newAllData = allData.map((objectList, objectListID) => {
			if (isShallow) {
				if (objectList.toBeReplaced)
					return toReplace
						? objectList.replace(replacement)
						: objectList.vanilla()
			}
			if (objectListID === fieldData[currentIndexFieldName]) {
				let newObjectList = objectList[fieldName].map(object => {
					if (object.toBeReplaced) {
						return toReplace
							? object.replace(replacement)
							: object.vanilla()
					}
					return object
				})
				return {
					...objectList,
					[fieldName]: newObjectList
				}
			}
			return objectList
		})
		setAllData(newAllData)
		setFieldData({
			...fieldData,
			selectAll: false
		})
	}
	function onRowCheck(isShallow, row, currentIndexFieldName, dataFieldName, fieldData, allData, setAllData) {
		let newAllData = allData.map((objectList, objectListID) => {
			if (isShallow) {
				if (objectListID === parseInt(row))
					return objectList.markForReplacement(!objectList.toBeReplaced)
				return objectList
			}
			if (objectListID === fieldData[currentIndexFieldName]) {
				let newObjectList = objectList[dataFieldName].map((object, objectID) => {
					if (objectID === parseInt(row)) {
						return object.markForReplacement(!object.toBeReplaced)
					}
					return object
				})
				return {
					...objectList,
					[dataFieldName]: newObjectList
				}
			}
			return objectList
		})
		setAllData(newAllData)
	}
	function onCheckAll(isShallow, currentIndexFieldName, dataFieldName, fieldData, setFieldData, allData, setAllData) {
		let newSelectAll = !fieldData.selectAll
		let newAllData = allData.map((objectList, objectListID) => {
			if (isShallow)
				return objectList.markForReplacement(newSelectAll)
			if (objectListID === fieldData[currentIndexFieldName]) {
				let newObjectList = objectList[dataFieldName].map(object => {
					return object.markForReplacement(newSelectAll)
				})
				return {
					...objectList,
					[dataFieldName]: newObjectList
				}
			}
			return objectList
		})
		setAllData(newAllData)
		setFieldData({
			...fieldData,
			selectAll: newSelectAll
		})
	}
	function handleRewardTypeChange(target, fieldData, setFieldData) {
		const currentReward = target.name.slice(0, -4)
		setFieldData({
			...fieldData,
			[target.name]: parseInt(target.value),
			[currentReward]: 0
		})
	}
	function handleFieldChange(name, value, fieldData, setFieldData) {
		setFieldData({
			...fieldData,
			[name]: parseInt(value)
		})
	}
	function handleTracker() {
		//Chest Tracker
		let chestTracker = allChests.reduce((prevWorlds, currentWorld) => {
			currentWorld.chests.forEach(chest => {
				prevWorlds = prevWorlds.update(chest.replacementReward.index)
			})
			return prevWorlds
		}, new Tracker())

		//Popup Tracker
		let popupTracker = allPopups.reduce((prevWorlds, currentWorld) => {
			currentWorld.popups.forEach(popup => {
				prevWorlds = prevWorlds.update(popup.replacementReward.index)
			})
			return prevWorlds
		}, new Tracker())

		//Bonus Tracker
		let finalBonusStats = {
			hp: startingStatus.hp,
			mp: startingStatus.mp,
			armor: 1,
			accessory: 1,
			item: 3,
			drive: 5
		}
		let bonusTracker = allBonuses.reduce((prevWorlds, currentWorld) => {
			currentWorld.bonusFights.forEach(bonusFight => {
				bonusFight.slots.filter(slot => Object.keys(slot).length !== 0).forEach(slot => {
					if (slot.replacementCharacter === 0) {
						finalBonusStats.hp += Math.floor(slot.hpIncrease / 2)
						finalBonusStats.mp += Math.floor(slot.mpIncrease / 2)
						finalBonusStats.armor += slot.armorSlotIncrease
						finalBonusStats.accessory += slot.accessorySlotIncrease
						finalBonusStats.item += slot.itemSlotIncrease
						finalBonusStats.drive += slot.driveGaugeIncrease
						prevWorlds = prevWorlds.update(slot.replacementReward1.index)
						prevWorlds = prevWorlds.update(slot.replacementReward2.index)
					}
				})
			})
			return prevWorlds
		}, new Tracker())
		let finalBonusStatsPnach = '//SORA\'S FINAL STATS IN CRITICAL MODE\n'
		finalBonusStatsPnach += '// HP: ' + finalBonusStats.hp + '\n'
		finalBonusStatsPnach += '// MP: ' + finalBonusStats.mp + '\n'
		finalBonusStatsPnach += '// Armor: ' + finalBonusStats.armor + '\n'
		finalBonusStatsPnach += '// Accessory: ' + finalBonusStats.accessory + '\n'
		finalBonusStatsPnach += '// Item: ' + finalBonusStats.item + '\n'
		finalBonusStatsPnach += '// Drive: ' + Math.min(9, finalBonusStats.drive) + '\n'

		//Forms & Summons Tracker
		let formTracker = allForms.reduce((prevDriveForms, currentDriveForm) => {
			currentDriveForm.driveLevels.forEach(driveLevel => {
				prevDriveForms = prevDriveForms.update(driveLevel.replacementReward.index)
			})
			return prevDriveForms
		}, new Tracker())

		//Level Tracker
		let levelTracker = allLevels.reduce((prevLevels, currentLevel) => {
			prevLevels.sword = prevLevels.sword.update(currentLevel.replacementSwordReward.index)
			prevLevels.shield = prevLevels.shield.update(currentLevel.replacementShieldReward.index)
			prevLevels.staff = prevLevels.staff.update(currentLevel.replacementStaffReward.index)
			return prevLevels
		}, { sword: new Tracker(), shield: new Tracker(), staff: new Tracker() })

		//Critical Extra Tracker
		let criticalTracker = allCriticals.reduce((prevCriticalExtras, currentCriticalExtra) => {
			return prevCriticalExtras.update(currentCriticalExtra.replacementReward.index)
		}, new Tracker())

		return [
			'//GAME STATUS\n',
			chestTracker.saveToPnach('CHEST') + '\n',
			popupTracker.saveToPnach('POPUP') + '\n',
			formTracker.saveToPnach('FORM & SUMMON') + '\n',
			criticalTracker.saveToPnach('CRITICAL EXTRA') + '\n',
			'//LEVEL TALLY\n',
			levelTracker.sword.saveToPnach('SWORD') + '\n',
			levelTracker.shield.saveToPnach('SHIELD') + '\n',
			levelTracker.staff.saveToPnach('STAFF') + '\n',
			bonusTracker.saveToPnach('BONUS') + '\n',
			finalBonusStatsPnach
		]
	}
	function handleSaveAsPnach(fileName) {
		let trackerPnachCodes = handleTracker()

		let chestPnachCodes = allChests.map(worldList => {
			let ret = '// ' + worldList.world.toUpperCase() + '\n'
			worldList.chests.forEach(chest => {
				ret += chest.saveToPnach()
			})
			return ret
		})
		chestPnachCodes.unshift('\n//CHESTS\n')

		let popupPnachCodes = allPopups.map(worldList => {
			let ret = '// ' + worldList.world.toUpperCase() + '\n'
			worldList.popups.forEach(popup => {
				ret += popup.saveToPnach()
			})
			return ret
		})
		popupPnachCodes.unshift('\n//POPUPS\n')

		let formPnachCodes = allForms.map(driveFormList => {
			let ret = '// ' + driveFormList.driveForm.toUpperCase() + '\n'
			if (driveFormList.driveLevels.some(driveFormLevel => driveFormLevel.isRewardReplaced()))
				if (driveFormList.driveForm !== 'Summon')
					ret += driveFormList.removeGrowthJankCodes.join('')
			driveFormList.driveLevels.forEach(driveFormLevel => {
				ret += driveFormLevel.saveToPnach()
			})
			return ret
		})
		formPnachCodes.unshift('\n//DRIVE FORMS\n')

		let equipmentPnachCodes = allEquipments.map(equipmentTypeList => {
			let ret = '// ' + equipmentTypeList.equipmentType.toUpperCase() + '\n'

			equipmentTypeList.equipments.forEach(equipment => {
				ret += equipment.saveToPnach()
			})
			return ret
		})
		equipmentPnachCodes.unshift('\nEQUIPMENT\n')

		let bonusPnachCodes = allBonuses.map(worldList => {
			let ret = '// ' + worldList.world.toUpperCase() + '\n'
			worldList.bonusFights.forEach(bonusFight => {
				ret += bonusFight.saveToPnach()
			})
			return ret
		})
		bonusPnachCodes.unshift('\n//BONUS REWARDS\n')

		let levelPnachCodes = allLevels.map(level => {
			return level.saveToPnach()
		})
		levelPnachCodes.unshift('\n//LEVEL REWARDS\n')

		let magicCostPnachCodes = allMagics.map(magicType => {
			let prefix = '// ' + magicType.magicType.toUpperCase() + '\n'
			let ret = ''
			let tempString = ''
			let tempLastAbility
			let magicChangeCount = 0
			let lastAbility
			magicType.abilities.forEach(ability => {
				[tempString, tempLastAbility] = ability.saveToPnach()
				if (tempString !== '') {
					ret += tempString
					lastAbility = tempLastAbility
					magicChangeCount++
				}
			})
			if (magicChangeCount > 0) {
				let checkAddress = (lastAbility.costAddress + 0x10000000).toString(16).toUpperCase().padStart(8, '0')
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 3).toString(16).toUpperCase().padStart(2, '0') + 'FFFF,extended,1032BAE0 // If not on Title Screen\n'
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 2).toString(16).toUpperCase().padStart(2, '0') + '2002,extended,1032BAE0 // If not in Station of Serenity\n'
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 1).toString(16).toUpperCase().padStart(2, '0') + '0000,extended,1032BAD8 // If not screen transition\n'
				prefix += 'patch=1,EE,E1' + magicChangeCount.toString(16).toUpperCase().padStart(2, '0') + '00' + lastAbility.replacementCost.toString(16).toUpperCase().padStart(2, '0')
				prefix += ',extended,' + checkAddress + ' // If ' + lastAbility.ability + '\'s MP Cost is not ' + lastAbility.replacementCost + '\n'
			}
			return prefix + ret
		})
		magicCostPnachCodes.unshift('\n//MAGIC COSTS\n')

		let criticalPnachCodes = allCriticals.map(criticalExtra => {
			return criticalExtra.saveToPnach()
		})
		criticalPnachCodes.unshift('\n//CRITICAL EXTRAS\n')

		let startingPnachCodes = ['\n//STARTING STATUS\n']
		startingPnachCodes.push(startingStatus.saveToPnach())

		let cheatPnachCodes = allCheats.map(cheat => {
			return cheat.saveToPnach()
		})
		cheatPnachCodes.unshift('\n//CHEAT CODES\n')

		let pnachCodes = trackerPnachCodes.concat(chestPnachCodes, popupPnachCodes, formPnachCodes, equipmentPnachCodes, bonusPnachCodes, levelPnachCodes, magicCostPnachCodes,
			criticalPnachCodes, startingPnachCodes, cheatPnachCodes)

		const element = document.createElement('a')
		const file = new Blob(pnachCodes, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = fileName.length !== 0 ? '(' + fileName + ').pnach' : 'F266B00B.pnach'
		document.body.appendChild(element)
		element.click()
	}
	function handleSaveAsJSON(fileName) {
		let chestSaveData = allChests.map(world => {
			let ret = ''
			world.chests.forEach(chest => {
				ret += chest.saveToJSON()
			})
			if (ret !== '')
				return '{"world":"' + world.world + '","chests":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		chestSaveData = ['"chestsData":[', chestSaveData.filter(s => s !== '').join(), '],']

		let popupSaveData = allPopups.map(world => {
			let ret = ''
			world.popups.forEach(popup => {
				ret += popup.saveToJSON()
			})
			if (ret !== '')
				return '{"world":"' + world.world + '","popups":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		popupSaveData = ['"popupsData":[', popupSaveData.filter(s => s !== '').join(), '],']

		let bonusSaveData = allBonuses.map(world => {
			let ret = ''
			world.bonusFights.forEach(bonusFight => {
				ret += bonusFight.saveToJSON()
			})
			if (ret !== '')
				return '{"world":"' + world.world + '","bonusFights":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		bonusSaveData = ['"bonusData":[', bonusSaveData.filter(s => s !== '').join(), '],']

		let formSaveData = allForms.map(driveForm => {
			let ret = ''
			driveForm.driveLevels.forEach(driveLevel => {
				ret += driveLevel.saveToJSON()
			})
			if (ret !== '')
				return '{"driveForm":"' + driveForm.driveForm + '","driveLevels":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		formSaveData = ['"formsData":[', formSaveData.filter(s => s !== '').join(), '],']

		let equipmentSaveData = allEquipments.map(equipmentType => {
			let ret = ''
			equipmentType.equipments.forEach(equipment => {
				ret += equipment.saveToJSON()
			})
			if (ret !== '')
				return '{"equipmentType":"' + equipmentType.equipmentType + '","equipments":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		equipmentSaveData = ['"equipmentsData":[', equipmentSaveData.filter(s => s !== '').join(), '],']

		let levelSaveData = allLevels.map(level => {
			return level.saveToJSON()
		})
		levelSaveData = ['"levelsData":[', levelSaveData.join('').slice(0, -1), '],']

		let magicCostSaveData = allMagics.map(magicType => {
			let ret = ''
			magicType.abilities.forEach(ability => {
				ret += ability.saveToJSON()
			})
			if (ret !== '')
				return '{"magicType":"' + magicType.magicType + '","abilities":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		magicCostSaveData = ['"magicData":[', magicCostSaveData.filter(s => s !== '').join(), '],']

		let criticalSaveData = allCriticals.map(critical => {
			return critical.saveToJSON()
		})
		criticalSaveData = ['"criticalsData":[', criticalSaveData.join('').slice(0, -1), '],']

		let cheatSaveData = allCheats.map(cheat => {
			return cheat.saveToJSON()
		})
		cheatSaveData = ['"cheatsData":[', cheatSaveData.join('').slice(0, -1), '],']

		let saveData = ['{',
			chestSaveData.join(''),
			popupSaveData.join(''),
			bonusSaveData.join(''),
			formSaveData.join(''),
			equipmentSaveData.join(''),
			levelSaveData.join(''),
			magicCostSaveData.join(''),
			criticalSaveData.join(''),
			'"startingStatusData":' + startingStatus.saveToJSON() + ',',
			cheatSaveData.join('').slice(0, -1),
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
		let newAllMagics = magicsData.map(magicType => {
			if (globalIndex < magicLoadData.length) {
				if (magicLoadData[globalIndex].magicType === magicType.magicType) {
					let magicIndex = 0
					let newMagics = magicType.abilities.map(ability => {
						if (magicIndex < magicLoadData[globalIndex].abilities.length) {
							if (magicLoadData[globalIndex].abilities[magicIndex].ability === ability.ability) {
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

		let criticalLoadData = (allLoadData.hasOwnProperty('criticalsData') ? allLoadData.criticalsData : [])
		let newAllCriticals = criticalData.map(critical => {
			if (globalIndex < criticalLoadData.length) {
				if (criticalLoadData[globalIndex].vanillaAddress === critical.vanillaAddress) {
					let ret = critical.loadFromJSON(criticalLoadData[globalIndex])
					globalIndex++
					return ret
				}
			}
			return critical
		})
		globalIndex = 0

		let cheatLoadData = (allLoadData.hasOwnProperty('cheatsData') ? allLoadData.cheatsData : [])
		let newAllCheats = cheatsData.map(cheat => {
			if (globalIndex < cheatLoadData.length) {
				if (cheatLoadData[globalIndex].name === cheat.name) {
					let ret = cheat.loadFromJSON(cheatLoadData[globalIndex])
					globalIndex++
					return ret
				}
			}
			return cheat
		})

		let startingStatusLoadData = (allLoadData.hasOwnProperty('startingStatusData') ? allLoadData.startingStatusData : [])
		let newStartingStatus = startingStatus.loadFromJSON(startingStatusLoadData)

		setAllChests(newAllChests)
		setAllPopups(newAllPopups)
		setAllBonuses(newAllBonuses)
		setAllForms(newAllForms)
		setAllEquipments(newAllEquipments)
		setAllLevels(newAllLevels)
		setAllMagics(newAllMagics)
		setAllCriticals(newAllCriticals)
		setAllCheats(newAllCheats)
		setStartingStatus(newStartingStatus)
	}
	//#endregion

	let icons = pageList.map(pageName => {
		return <Icon
			fileName={pageName}
			displayText={pageName}
		/>
	})
	let styles = {
		marginTop: '0',
		marginRight: '10px',
		marginBottom: '10px',
		marginLeft: '10px'
	}
	return (
		<div style={styles}>
			<Tabs defaultActiveKey='home' id='allTabs' transition={false}>
				<Tab eventKey='home' title={icons[0]}>
					<HomePage />
				</Tab>
				<Tab eventKey='chest' title={icons[1]}>
					<ChestPage
						style={styles}
						fieldData={chestFieldData}
						chestData={allChests[chestFieldData.currentWorld]}
						rewardList={rewardsData[chestFieldData.currentRewardType].rewards}
						handleWorldChange={(e) => handleTableChange(e.target.value, 'currentWorld', 'chests', chestFieldData, setChestFieldData, allChests, setAllChests)}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, chestFieldData, setChestFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, chestFieldData, setChestFieldData)}
						onRowCheck={(e) => onRowCheck(false, e.target.value, 'currentWorld', 'chests', chestFieldData, allChests, setAllChests)}
						onCheckAll={() => onCheckAll(false, 'currentWorld', 'chests', chestFieldData, setChestFieldData, allChests, setAllChests)}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[chestFieldData.currentRewardType].rewards[chestFieldData.currentReward]
								}
							}
							handleReplace(false, e.target.name === 'replaceButton', replacement, 'currentWorld', 'chests', chestFieldData, setChestFieldData, allChests, setAllChests)
						}}
					/>
				</Tab>
				<Tab eventKey='popup' title={icons[2]}>
					<PopupPage
						style={styles}
						fieldData={popupFieldData}
						popupData={allPopups[popupFieldData.currentWorld]}
						rewardList={rewardsData[popupFieldData.currentRewardType].rewards}
						handleWorldChange={(e) => handleTableChange(e.target.value, 'currentWorld', 'popups', popupFieldData, setPopupFieldData, allPopups, setAllPopups)}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, popupFieldData, setPopupFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, popupFieldData, setPopupFieldData)}
						onRowCheck={(e) => onRowCheck(false, e.target.value, 'currentWorld', 'popups', popupFieldData, allPopups, setAllPopups)}
						onCheckAll={() => onCheckAll(false, 'currentWorld', 'popups', popupFieldData, setPopupFieldData, allPopups, setAllPopups)}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[popupFieldData.currentRewardType].rewards[popupFieldData.currentReward]
								}
							}
							handleReplace(false, e.target.name === 'replaceButton', replacement, 'currentWorld', 'popups', popupFieldData, setPopupFieldData, allPopups, setAllPopups)
						}}
					/>
				</Tab>
				<Tab eventKey='bonus' title={icons[3]}>
					<BonusPage
						style={styles}
						bonusData={allBonuses[bonusFieldData.currentWorld]}
						fieldData={bonusFieldData}
						rewardListA={rewardsData[bonusFieldData.currentARewardType].rewards}
						rewardListB={rewardsData[bonusFieldData.currentBRewardType].rewards}
						handleWorldChange={(e) => handleBonusTableChange(e.target.value, 0)}
						handleFightChange={(e) => handleBonusTableChange(bonusFieldData.currentWorld, e.target.value)}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, bonusFieldData, setBonusFieldData)}
						onSelectChange={(e) => handleFieldChange(e.target.name, e.target.value, bonusFieldData, setBonusFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							bonusFieldData, setBonusFieldData)
						}
						onRowCheck={(e) => onBonusRowCheck(e.target.value)}
						onCheckAll={() => onBonusCheckAll()}
						onClick={(e) => {
							let replacement = {
								currentWorld: bonusFieldData.currentWorld,
								currentCharacter: bonusFieldData.currentCharacter,
								currentBonusHP: bonusFieldData.currentBonusHP,
								currentBonusMP: bonusFieldData.currentBonusMP,
								currentArmor: bonusFieldData.currentArmor,
								currentAccessory: bonusFieldData.currentAccessory,
								currentItem: bonusFieldData.currentItem,
								currentDrive: bonusFieldData.currentDrive,
								rewardA: {
									...rewardsData[bonusFieldData.currentARewardType].rewards[bonusFieldData.currentAReward]
								},
								rewardB: {
									...rewardsData[bonusFieldData.currentBRewardType].rewards[bonusFieldData.currentBReward]
								}
							}
							handleBonusReplace(e.target.name === 'replaceButton', replacement)
						}}
					/>
				</Tab>
				<Tab eventKey='form' title={icons[4]}>
					<FormPage
						style={styles}
						formData={allForms[formFieldData.currentDriveForm].driveLevels}
						fieldData={formFieldData}
						rewardList={rewardsData[formFieldData.currentRewardType].rewards}
						handleFormChange={(e) => handleTableChange(e.target.value, 'currentDriveForm', 'driveLevels', formFieldData, setFormFieldData, allForms, setAllForms)}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, formFieldData, setFormFieldData)}
						onSelectChange={(e) => handleFieldChange(e.target.name, e.target.value, formFieldData, setFormFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							formFieldData, setFormFieldData)
						}
						onRowCheck={(e) => onRowCheck(false, e.target.value, 'currentDriveForm', 'driveLevels', formFieldData, allForms, setAllForms)}
						onCheckAll={() => onCheckAll(false, 'currentDriveForm', 'driveLevels', formFieldData, setFormFieldData, allForms, setAllForms)}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[formFieldData.currentRewardType].rewards[formFieldData.currentReward]
								},
								currentEXPMultiplierValue: formFieldData.currentEXPMultiplierValue,
								currentEXP: formFieldData.currentEXP
							}
							handleReplace(false, e.target.name === 'replaceButton', replacement, 'currentDriveForm', 'driveLevels', formFieldData, setFormFieldData, allForms, setAllForms)
						}}
					/>
				</Tab>
				<Tab eventKey='equipment' title={icons[5]}>
					<EquipmentPage
						style={styles}
						equipmentData={allEquipments[equipmentFieldData.currentEquipmentType].equipments}
						fieldData={equipmentFieldData}
						rewardList={rewardsData[equipmentFieldData.currentRewardType].rewards}
						handleEquipmentTypeChange={(e) => handleTableChange(e.target.value, 'currentEquipmentType', 'equipments', equipmentFieldData, setEquipmentFieldData,
							allEquipments, setAllEquipments)}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, equipmentFieldData, setEquipmentFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, equipmentFieldData, setEquipmentFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							equipmentFieldData, setEquipmentFieldData)
						}
						onRowCheck={(e) => onRowCheck(false, e.target.value, 'currentEquipmentType', 'equipments', equipmentFieldData, allEquipments, setAllEquipments)}
						onCheckAll={() => onCheckAll(false, 'currentEquipmentType', 'equipments', equipmentFieldData, setEquipmentFieldData, allEquipments, setAllEquipments)}
						onClick={(e) => {
							let replacement = {
								currentEquipmentType: equipmentFieldData.currentEquipmentType,
								currentStrength: equipmentFieldData.currentStrength,
								currentMagic: equipmentFieldData.currentMagic,
								currentAP: equipmentFieldData.currentAP,
								currentDefense: equipmentFieldData.currentDefense,
								currentPhysical: equipmentFieldData.currentPhysical,
								currentFire: equipmentFieldData.currentFire,
								currentBlizzard: equipmentFieldData.currentBlizzard,
								currentThunder: equipmentFieldData.currentThunder,
								currentDark: equipmentFieldData.currentDark,
								currentLight: equipmentFieldData.currentLight,
								currentUniversal: equipmentFieldData.currentUniversal,
								ability: {
									...rewardsData[equipmentFieldData.currentRewardType].rewards[equipmentFieldData.currentReward]
								}
							}
							handleReplace(false, e.target.name === 'replaceButton', replacement, 'currentEquipmentType', 'equipments', equipmentFieldData, setEquipmentFieldData,
								allEquipments, setAllEquipments)
						}}
					/>
				</Tab>
				<Tab eventKey='level' title={icons[6]}>
					<LevelPage
						style={styles}
						levelData={allLevels}
						fieldData={levelFieldData}
						swordRewardList={rewardsData[levelFieldData.currentSwordRewardType].rewards}
						shieldRewardList={rewardsData[levelFieldData.currentShieldRewardType].rewards}
						staffRewardList={rewardsData[levelFieldData.currentStaffRewardType].rewards}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, levelFieldData, setLevelFieldData)}
						onSelectChange={(e) => handleFieldChange(e.target.name, e.target.value, levelFieldData, setLevelFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							levelFieldData, setLevelFieldData)
						}
						onRowCheck={(e) => onRowCheck(true, e.target.value, '', '', levelFieldData, allLevels, setAllLevels)}
						onCheckAll={() => onCheckAll(true, '', '', levelFieldData, setLevelFieldData, allLevels, setAllLevels)}
						onClick={(e) => {
							let replacement = {
								currentLevelAP: levelFieldData.currentLevelAP,
								currentLevelDefense: levelFieldData.currentLevelDefense,
								currentLevelMagic: levelFieldData.currentLevelMagic,
								currentLevelStrength: levelFieldData.currentLevelStrength,
								currentEXP: levelFieldData.currentEXP,
								currentEXPMultiplierValue: levelFieldData.currentEXPMultiplierValue,
								sword: {
									...rewardsData[levelFieldData.currentSwordRewardType].rewards[levelFieldData.currentSwordReward]
								},
								shield: {
									...rewardsData[levelFieldData.currentShieldRewardType].rewards[levelFieldData.currentShieldReward]
								},
								staff: {
									...rewardsData[levelFieldData.currentStaffRewardType].rewards[levelFieldData.currentStaffReward]
								}
							}
							handleReplace(true, e.target.name === 'replaceButton', replacement, '', '', levelFieldData, setLevelFieldData, allLevels, setAllLevels)
						}}
					/>
				</Tab>
				<Tab eventKey='magic' title={icons[7]}>
					<MagicPage
						style={styles}
						magicData={allMagics[magicFieldData.currentMagicType].abilities}
						fieldData={magicFieldData}
						handleMagicTypeChange={(e) => handleTableChange(e.target.value, 'currentMagicType', 'abilities', magicFieldData, setMagicFieldData, allMagics, setAllMagics)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							magicFieldData, setMagicFieldData)
						}
						onRowCheck={(e) => onRowCheck(false, e.target.value, 'currentMagicType', 'abilities', magicFieldData, allMagics, setAllMagics)}
						onCheckAll={() => onCheckAll(false, 'currentMagicType', 'abilities', magicFieldData, setMagicFieldData, allMagics, setAllMagics)}
						onClick={(e) => {
							let replacement = {
								cost: magicFieldData.currentCost
							}
							handleReplace(false, e.target.name === 'replaceButton', replacement, 'currentMagicType', 'abilities', magicFieldData, setMagicFieldData, allMagics, setAllMagics)
						}}
					/>
				</Tab>
				<Tab eventKey='critical' title={icons[8]}>
					<CriticalPage
						style={styles}
						criticalData={allCriticals}
						fieldData={criticalFieldData}
						rewardList={rewardsData[criticalFieldData.currentRewardType].rewards}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, criticalFieldData, setCriticalFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, criticalFieldData, setCriticalFieldData)}
						onRowCheck={(e) => onRowCheck(true, e.target.value, '', '', criticalFieldData, allCriticals, setAllCriticals)}
						onCheckAll={() => onCheckAll(true, '', '', criticalFieldData, setCriticalFieldData, allCriticals, setAllCriticals)}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[criticalFieldData.currentRewardType].rewards[criticalFieldData.currentReward]
								}
							}
							handleReplace(true, e.target.name === 'replaceButton', replacement, '', '', criticalFieldData, setCriticalFieldData, allCriticals, setAllCriticals)
						}}
					/>
				</Tab>
				<Tab eventKey='cheat' title={icons[9]}>
					<CheatPage
						style={styles}
						cheatData={allCheats}
						fieldData={cheatFieldData}
						onRowCheck={(e) => onRowCheck(true, e.target.value, '', '', cheatFieldData, allCheats, setAllCheats)}
						onCheckAll={() => onCheckAll(true, '', '', cheatFieldData, setCheatFieldData, allCheats, setAllCheats)}
						onClick={() => {
							setAllCheats(allCheats.map(object => {
								if (object.toBeReplaced)
									return object.toggle()
								return object
							}))
							setCheatFieldData({ selectAll: false })
						}}
					/>
				</Tab>
				<Tab eventKey='startingStatus' title={icons[10]}>
					<StartingPage
						style={styles}
						startingStatusData={startingStatus}
						fieldData={startingStatusFieldData}
						keybladeList={rewardsData[7].rewards}
						armorList={rewardsData[17].rewards.concat(rewardsData[2].rewards)}
						accessoryList={rewardsData[17].rewards.concat(rewardsData[1].rewards)}
						donaldList={rewardsData[17].rewards.concat(rewardsData[0].rewards)}
						goofyList={rewardsData[17].rewards.concat(rewardsData[0].rewards)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, startingStatusFieldData, setStartingStatusFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							startingStatusFieldData, setStartingStatusFieldData)
						}
						onClick={(e) => {
							let replacement = {
								keyblade: {
									...rewardsData[7].rewards[startingStatusFieldData.currentKeyblade]
								},
								armor: {
									...rewardsData[2].rewards[startingStatusFieldData.currentArmor - 1]
								},
								accessory: {
									...rewardsData[1].rewards[startingStatusFieldData.currentAccessory - 1]
								},
								munny: startingStatusFieldData.currentMunny,
								hp: startingStatusFieldData.currentStartingHP,
								mp: startingStatusFieldData.currentStartingMP,
								donald1: {
									...rewardsData[0].rewards[startingStatusFieldData.currentDonald1 - 1]
								},
								donald2: {
									...rewardsData[0].rewards[startingStatusFieldData.currentDonald2 - 1]
								},
								goofy1: {
									...rewardsData[0].rewards[startingStatusFieldData.currentGoofy1 - 1]
								},
								goofy2: {
									...rewardsData[0].rewards[startingStatusFieldData.currentGoofy2 - 1]
								}
							}
							let final
							let newFieldData = { ...startingStatusFieldData }
							if (e.target.name === 'replaceButton')
								final = startingStatus.replace(replacement)
							else {
								final = startingStatus.vanilla()
								newFieldData = {
									currentKeyblade: 0,
									currentArmor: 0,
									currentAccessory: 0,
									currentMunny: 0,
									currentStartingHP: 20,
									currentStartingMP: 100,
									currentDonald1: 28,
									currentDonald2: 29,
									currentGoofy1: 33,
									currentGoofy2: 64
								}
							}
							setStartingStatus(final)
							setStartingStatusFieldData(newFieldData)
						}}
					/>
				</Tab>
			</Tabs>
			<SaveLoadModal
				handleSaveAsPnach={handleSaveAsPnach}
				handleSaveAsJSON={handleSaveAsJSON}
				onFileUpload={(e) => {
					let file = e.target.files[0]
					let reader = new FileReader()
					reader.readAsText(file)
					reader.onload = (e) => onFileUpload(e.target.result)
				}}
			/>
		</div>
	)
}

export default FunctionApp