import { React, useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

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

	//#region General Functions
	function handleBonusTableChange() {
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
				return toReplace
					? objectList.replace(replacement)
					: objectList.vanilla()
			}
			if (objectListID === fieldData[currentIndexFieldName]) {
				let newObjectList = objectList[fieldName].map(object => {
					if (object.toBeReplaced)
						return toReplace
							? object.replace(replacement)
							: object.vanilla()
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
				<Tab eventKey="popup" title="Popup">
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
								currentFight: 0,
								selectAll: false
							})
						}}
						handleFightChange={(e) => {
							setAllBonuses(handleBonusTableChange())
							setBonusFieldData({
								...bonusFieldData,
								currentFight: e.target.value,
								selectAll: false
							})
						}}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, bonusFieldData, setBonusFieldData)}
						onSelectChange={(e) => handleFieldChange(e.target.name, e.target.value, bonusFieldData, setBonusFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							bonusFieldData, setBonusFieldData)
						}
						onRowCheck={(e) => onRowCheck(false, e.target.value, 'currentWorld', 'bonusFights', bonusFieldData, allBonuses, setAllBonuses)}
						onCheckAll={() => onCheckAll(false, 'currentWorld', 'bonusFights', bonusFieldData, setBonusFieldData, allBonuses, setAllBonuses)}
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
							handleReplace(false, e.target.name === 'replaceButton', replacement, 'currentWorld', 'bonusFights', bonusFieldData, setBonusFieldData, allBonuses, setAllBonuses)
						}}
					/>
				</Tab>
				<Tab eventKey="form" title="Forms & Summons">
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
				<Tab eventKey="equipment" title="Equipment">
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
								reward: {
									...rewardsData[equipmentFieldData.currentRewardType].rewards[equipmentFieldData.currentReward]
								}
							}
							handleReplace(false, e.target.name === 'replaceButton', replacement, 'currentEquipmentType', 'equipments', equipmentFieldData, setEquipmentFieldData,
								allEquipments, setAllEquipments)
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
				<Tab eventKey="magic" title="Magic & Limits">
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
				<Tab eventKey="critical" title="Critical Extra">
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
				<Tab eventKey="cheat" title="Cheat">
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
		</div>
	)
}

export default FunctionApp