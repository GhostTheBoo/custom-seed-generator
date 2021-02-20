import { React, useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import _ from 'lodash'

import { rewardsData } from './Data/rewardsData'
import { chestsData } from './Data/chestsData'
import { popupsData } from './Data/popupsData'
import { bonusData } from './Data/newBonusData'
import { formsData } from './Data/formsData'
import { equipmentsData } from './Data/equipmentsData'
import { levelsData } from './Data/levelsData'
import { magicsData } from './Data/magicData'
import { criticalData } from './Data/criticalData'
import { cheatsData } from './Data/cheatsData'
import { startingStatusData } from './Data/startingStatusData'

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
	//#endregion

	//#region Bonus Jank City
	function handleBonusTableChange(nextWorld) {
		return allBonuses.map((world, worldID) => {
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
	}
	// function handleBonusFightChange(nextFight) {
	// 	let newAllBonuses = allBonuses.map((world, worldID) => {
	// 		if (worldID === bonusFieldData.currentWorld) {
	// 			let toBeStoredWorldFights = world.bonusFights.map((fight, fightID) => {
	// 				if (fightID === bonusFieldData.currentFight) {
	// 					return fight.markForReplacement(false, -1)
	// 				}
	// 				return fight
	// 			})
	// 			return {
	// 				...world,
	// 				bonusFights: toBeStoredWorldFights
	// 			}
	// 		}
	// 		return world
	// 	})
	// 	setAllBonuses(newAllBonuses)
	// 	setBonusFieldData({
	// 		...bonusFieldData,
	// 		currentFight: nextFight
	// 	})
	// }
	// function onBonusRowCheck(row) {
	// 	let newAllBonuses = allBonuses.map((world, worldID) => {
	// 		if (worldID === bonusFieldData.currentWorld) {
	// 			let toBeStoredWorldFights = world.bonusFights.map((fight, fightID) => {
	// 				if (fightID === bonusFieldData.currentFight) {
	// 					return fight.markForReplacement(false, row)
	// 				}
	// 				return fight
	// 			})
	// 			return {
	// 				...world,
	// 				bonusFights: toBeStoredWorldFights
	// 			}
	// 		}
	// 		return world
	// 	})
	// 	setAllBonuses(newAllBonuses)
	// }
	// function onBonusCheckAll() {
	// 	let newAllBonuses = allBonuses.map((world, worldID) => {
	// 		if (worldID === bonusFieldData.currentWorld) {
	// 			let toBeStoredWorldFights = world.bonusFights.map((fight, fightID) => {
	// 				if (fightID === bonusFieldData.currentFight) {
	// 					return fight.markForReplacement(!bonusFieldData.selectAll, -1)
	// 				}
	// 				return fight
	// 			})
	// 			return {
	// 				...world,
	// 				bonusFights: toBeStoredWorldFights
	// 			}
	// 		}
	// 		return world
	// 	})
	// 	setAllBonuses(newAllBonuses)
	// 	setBonusFieldData({
	// 		...bonusFieldData,
	// 		selectAll: !bonusFieldData.selectAll
	// 	})
	// }
	//#endregion

	//#region General Functions
	function handleTableChange(currentIndex, fieldName, allData) {
		return allData.map((objectList, objectListID) => {
			if (objectListID === currentIndex) {
				return {
					...objectList,
					[fieldName]: objectList[fieldName].map(object => {
						return object.markForReplacement(false)
					})
				}
			}
			return objectList
		})
	}
	function handleReplace(toReplace, reward, currentIndex, fieldName, allData) {
		return allData.map((object, index) => {
			if (index === currentIndex)
				return {
					...object,
					[fieldName]: handleShallowReplace(toReplace, reward, object[fieldName])
				}
			return object
		})
	}
	function handleShallowReplace(toReplace, reward, currentData) {
		return currentData.map(object => {
			if (object.toBeReplaced())
				if (toReplace)
					return object.replace(reward)
				else
					return object.vanilla()
			return object
		})
	}
	function onRowCheck(row, currentIndex, fieldName, allData) {
		return allData.map((object, index) => {
			if (index === currentIndex)
				return {
					...object,
					[fieldName]: onShallowRowCheck(row, object[fieldName])
				}
			return object
		})
	}
	function onShallowRowCheck(row, currentData) {
		return currentData.map((object, index) => {
			if (index === parseInt(row))
				return object.markForReplacement(!object.toBeReplaced)
			return object
		})
	}
	function onCheckAll(currentIndex, fieldName, allData) {
		return allData.map((object, index) => {
			if (index === currentIndex)
				return {
					...object,
					[fieldName]: onShallowCheckAll(object[fieldName])
				}
			return object
		})
	}
	function onShallowCheckAll(currentData) {
		return currentData.map(object => {
			return object.markForReplacement(!object.toBeReplaced)
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
	//#endregion

	let styles = {
		marginTop: '0',
		marginRight: '10px',
		marginBottom: '10px',
		marginLeft: '10px'
	}

	return (
		<div style={styles}>
			<Tabs defaultActiveKey="home" id="allTabs" transition={false}>
				<Tab eventKey="home" title="Home">
					<HomePage />
				</Tab>
				<Tab eventKey="chest" title="Chest">
					<ChestPage
						style={styles}
						fieldData={chestFieldData}
						chestData={allChests[chestFieldData.curentWorld]}
						rewardList={rewardsData[chestFieldData.currentRewardType].rewards}
						handleWorldChange={(e) => {
							setAllChests(handleTableChange(chestFieldData.currentWorld, 'chests', allChests))
							setChestFieldData({ ...chestFieldData, currentWorld: e.target.value })
						}}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, chestFieldData, setChestFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, chestFieldData, setChestFieldData)}
						onRowCheck={(e) => setAllChests(onRowCheck(e.target.value, chestFieldData.currentWorld, 'chests', allChests))}
						onCheckAll={() => setAllChests(onCheckAll(chestFieldData.currentWorld, 'chests', allChests))}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[chestFieldData.currentRewardType].rewards[chestFieldData.currentReward]
								}
							}
							setAllChests(handleReplace(e.target.name === 'replaceButton', replacement, chestFieldData.currentWorld, 'chests', allChests))
							setChestFieldData({
								...chestFieldData,
								selectAll: false
							})
						}}
					/>
				</Tab>
				<Tab eventKey="popup" title="Popup">
					<PopupPage
						style={styles}
						fieldData={popupFieldData}
						popupData={allPopups[popupFieldData.currentWorld]}
						rewardList={rewardsData[popupFieldData.currentRewardType].rewards}
						handleWorldChange={(e) => {
							setAllPopups(handleTableChange(popupFieldData.currentWorld, 'popups', allPopups))
							setPopupFieldData({ ...popupFieldData, currentWorld: e.target.value })
						}}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, popupFieldData, setPopupFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, popupFieldData, setPopupFieldData)}
						onRowCheck={(e) => setAllPopups(onRowCheck(e.target.value, popupFieldData.currentWorld, 'popups', allPopups))}
						onCheckAll={() => setAllPopups(onCheckAll(popupFieldData.currentWorld, 'popups', allPopups))}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[popupFieldData.currentRewardType].rewards[popupFieldData.currentReward]
								}
							}
							setAllPopups(handleReplace(e.target.name === 'replaceButton', replacement, popupFieldData.currentWorld, 'popups', allPopups))
							setPopupFieldData({
								...popupFieldData,
								selectAll: false
							})
						}}
					/>
				</Tab>
				<Tab eventKey="bonus" title="Bonus">
					<BonusPage
						style={styles}
						bonusData={allBonuses[bonusFieldData.currentWorld]}
						fieldData={bonusFieldData}
						rewardListA={rewardsData[bonusFieldData.currentARewardType].rewards}
						rewardListB={rewardsData[bonusFieldData.currentBRewardType].rewards}
						handleWorldChange={(e) => {
							setAllBonuses(handleBonusTableChange())
							setBonusFieldData({
								...bonusFieldData,
								currentWorld: e.target.value,
								currentFight: 0
							})
						}}
						handleFightChange={(e) => {
							setAllBonuses(handleBonusTableChange())
							setBonusFieldData({
								...bonusFieldData,
								currentFight: e.target.value
							})
						}}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, bonusFieldData, setBonusFieldData)}
						onSelectChange={(e) => handleFieldChange(e.target.name, e.target.value, bonusFieldData, setBonusFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							bonusFieldData,
							setBonusFieldData)
						}
						onRowCheck={(e) => setAllBonuses(onRowCheck(e.target.value, bonusFieldData.currentWorld, 'bonusFights', allBonuses))}
						onCheckAll={() => setAllBonuses(onCheckAll(bonusFieldData.currentWorld, 'bonusFights', allBonuses))}
						onClick={(e) => {
							let replacement = {
								currentWorld: bonusFieldData.currentWorld,
								currentFight: bonusFieldData.currentFight,
								currentCharacter: bonusFieldData.currentCharacter,
								currentBonusHP: bonusFieldData.currentBonusHP,
								currentBonusMP: bonusFieldData.currentBonusMP,
								currentArmor: bonusFieldData.currentArmor,
								currentAccessory: bonusFieldData.currentAccessory,
								currentItem: bonusFieldData.currentItem,
								currentDrive: bonusFieldData.currentDrive,
								rewardA: {
									...rewardsData[bonusFieldData.currentRewardAType].rewards[bonusFieldData.currentRewardA]
								},
								rewardB: {
									...rewardsData[bonusFieldData.currentRewardBType].rewards[bonusFieldData.currentRewardB]
								}
							}
							setAllBonuses(handleReplace(e.target.name === 'replaceButton', replacement, bonusFieldData.currentWorld, 'bonusFights', allBonuses))
							setBonusFieldData({
								...bonusFieldData,
								selectAll: false
							})
						}}
					/>
				</Tab>
				<Tab eventKey="form" title="Forms & Summons">
					<FormPage
						style={styles}
						formData={allForms[formFieldData.currentDriveForm].driveLevels}
						fieldData={formFieldData}
						rewardList={rewardsData[formFieldData.currentRewardType].rewards}
						handleFormChange={(e) => {
							setAllForms(handleTableChange(formFieldData.currentDriveForm, 'driveLevels', allForms))
							setFormFieldData({ ...formFieldData, currentDriveForm: e.target.value })
						}}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, formFieldData, setFormFieldData)}
						onSelectChange={(e) => handleFieldChange(e.target.name, e.target.value, formFieldData, setFormFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							formFieldData,
							setFormFieldData)
						}
						onRowCheck={(e) => setAllForms(onRowCheck(e.target.value, formFieldData.currentDriveForm, 'driveLevels', allForms))}
						onCheckAll={() => setAllForms(onCheckAll(formFieldData.currentDriveForm, 'driveLevels', allForms))}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[formFieldData.currentRewardType].rewards[formFieldData.currentReward]
								},
								currentEXPMultiplierValue: formFieldData.currentEXPMultiplierValue,
								currentEXP: formFieldData.currentEXP
							}
							setAllForms(handleReplace(e.target.name === 'replaceButton', replacement, formFieldData.currentDriveForm, 'driveLevels', allForms))
							setFormFieldData({
								...formFieldData,
								selectAll: false
							})
						}}

					/>
				</Tab>
				<Tab eventKey="equipment" title="Equipment">
					<EquipmentPage
						style={styles}
						equipmentData={allEquipments[equipmentFieldData.currentEquipmentType].equipments}
						fieldData={equipmentFieldData}
						rewardList={rewardsData[equipmentFieldData.currentRewardType].rewards}
						handleEquipmentTypeChange={(e) => {
							setAllEquipments(handleTableChange(equipmentFieldData.currentEquipmentType, 'equipments', allEquipments))
							setEquipmentFieldData({ ...equipmentFieldData, currentEquipmentType: e.target.value })
						}}
						// handleEquipmentTypeChange={(e) => handleEquipmentTableChange(e.target.value)}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, equipmentFieldData, setEquipmentFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, equipmentFieldData, setEquipmentFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							equipmentFieldData,
							setEquipmentFieldData)
						}
						onRowCheck={(e) => setAllEquipments(onRowCheck(e.target.value, equipmentFieldData.currentEquipmentType, 'equipments', allEquipments))}
						onCheckAll={() => setAllEquipments(onCheckAll(equipmentFieldData.currentEquipmentType, 'equipments', allEquipments))}
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
								reward: {
									...rewardsData[equipmentFieldData.currentRewardType].rewards[equipmentFieldData.currentReward]
								}
							}
							setAllEquipments(handleReplace(e.target.name === 'replaceButton', replacement, equipmentFieldData.currentEquipmentType, 'equipments', allEquipments))
							setEquipmentFieldData({
								...equipmentFieldData,
								selectAll: false
							})
						}}
					/>
				</Tab>
				<Tab eventKey="level" title="Level">
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
							levelFieldData,
							setLevelFieldData)
						}
						onRowCheck={(e) => setAllLevels(onShallowRowCheck(e.target.value, allLevels))}
						onCheckAll={() => setAllLevels(onShallowCheckAll(allLevels))}
						onClick={(e) => {
							let replacement = {
								currentLevelAP: 0,
								currentLevelDefense: 0,
								currentLevelMagic: 0,
								currentLevelStrength: 0,
								currentEXP: 0,
								currentEXPMultiplierValue: 2,
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
							setAllLevels(handleShallowReplace(e.target.name === 'replaceButton', replacement, allLevels))
							setLevelFieldData({
								...levelFieldData,
								selectAll: false
							})
						}}
					/>
				</Tab>
				<Tab eventKey="magic" title="Magic & Limits">
					<MagicPage
						style={styles}
						magicData={allMagics[magicFieldData.currentMagicType].abilities}
						fieldData={magicFieldData}
						handleMagicTypeChange={(e) => {
							setAllMagics(handleTableChange(magicFieldData.currentMagicType, 'abilities', allMagics))
							setMagicFieldData({ ...magicFieldData, currentMagicType: e.target.value })
						}}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							magicFieldData,
							setMagicFieldData)
						}
						onRowCheck={(e) => setAllMagics(onRowCheck(e.target.value, magicFieldData.currentMagicType, 'abilities', allMagics))}
						onCheckAll={() => setAllMagics(onCheckAll(magicFieldData.currentMagicType, 'abilities', allMagics))}
						onClick={(e) => {
							let replacement = {
								cost: magicFieldData.currentCost
							}
							setAllMagics(handleReplace(e.target.name === 'replaceButton', replacement, magicFieldData.currentMagicType, 'abilities', allMagics))
							setMagicFieldData({
								...magicFieldData,
								selectAll: false
							})
						}}
					/>
				</Tab>
				<Tab eventKey="critical" title="Critical Extra">
					<CriticalPage
						style={styles}
						criticalData={allCriticals}
						fieldData={criticalFieldData}
						rewardList={rewardsData[criticalFieldData.currentRewardType].rewards}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, criticalFieldData, setCriticalFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, criticalFieldData, setCriticalFieldData)}
						onRowCheck={(e) => setAllCriticals(onShallowRowCheck(e.target.value, allCriticals))}
						onCheckAll={() => setAllCriticals(onShallowCheckAll(allCriticals))}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[criticalFieldData.currentRewardType].rewards[criticalFieldData.currentReward]
								}
							}
							setAllCriticals(handleShallowReplace(e.target.name === 'replaceButton', replacement, allCriticals))
							setCriticalFieldData({
								...criticalFieldData,
								selectAll: false
							})
						}}
					/>
				</Tab>
				<Tab eventKey="cheat" title="Cheat">
					<CheatPage
						style={styles}
						cheatData={allCheats}
						fieldData={cheatFieldData}
						onRowCheck={(e) => setAllCheats(onShallowRowCheck(e.target.value, allCheats))}
						onCheckAll={() => setAllCheats(onShallowCheckAll(allCheats))}
						onClick={() => {
							let replacedObjects = allCheats.map(object => {
								if (object.toBeReplaced)
									return object.toggle()
								return object
							})
							setAllCheats(replacedObjects)
							setCheatFieldData({ selectAll: false })
						}}
					/>
				</Tab>
				<Tab eventKey="startingStatus" title="Starting Status">
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
							startingStatusFieldData,
							setStartingStatusFieldData)
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
		</div>
	)
}

export default FunctionApp