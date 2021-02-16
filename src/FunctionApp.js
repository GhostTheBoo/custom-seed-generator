import { React, useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { worldsData, charactersData, formTypesData, equipmentTypesData } from './Data/typesData'
import { rewardsData } from './Data/rewardsData'
import { chestsData } from './Data/chestsData'
import { popupsData } from './Data/popupsData'
// import { bonusData } from './Data/newBonusData'
import { formsData } from './Data/formsData'
import { equipmentsData } from './Data/equipmentsData'
import { levelsData } from './Data/levelsData'

import HomePage from './Pages/HomePage'
import ChestPage from './Pages/ChestPage'
import PopupPage from './Pages/PopupPage'
// import BonusPage from './Pages/BonusPage'
import FormPage from './Pages/FormPage'
import EquipmentPage from './Pages/EquipmentPage'
import LevelPage from './Pages/LevelPage'

function FunctionApp() {
	const [chestFieldData, setChestFieldData] = useState({
		curentWorld: 0,
		currentRewardType: 0,
		currentReward: 0,
		selectAll: false
	})
	const [allChests, setAllChests] = useState(chestsData)
	const [chestData, setChestData] = useState(chestsData[0].chests)

	const [popupFieldData, setPopupFieldData] = useState({
		curentWorld: 0,
		currentRewardType: 0,
		currentReward: 0,
		selectAll: false
	})
	const [allPopups, setAllPopups] = useState(popupsData)
	const [popupData, setPopupData] = useState(popupsData[0].popups)

	const [formFieldData, setFormFieldData] = useState({
		currentDriveForm: 0,
		currentRewardType: 0,
		currentReward: 0,
		currentEXPMultiplierValue: 2,
		currentEXP: 0,
		selectAll: false
	})
	const [allForms, setAllForms] = useState(formsData)
	const [formData, setFormData] = useState(formsData[0].driveLevels)

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
	const [equipmentData, setEquipmentData] = useState(equipmentsData[0].equipments)

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
		currentEXP: 0,
		currentEXPMultiplierValue: 2,
		selectAll: false
	})
	const [allLevels, setAllLevels] = useState(levelsData)

	//#region Table Change
	function handleChestTableChange(nextWorld) {
		let toBeStoredObjects = chestData.map(object => {
			object.markForReplacement(false)
			return object
		})
		let newAllObjects = allChests.map((list, index) => {
			if (index === chestFieldData.currentWorld)
				return {
					world: worldsData[index],
					chests: toBeStoredObjects
				}
			return list
		})
		setAllChests(newAllObjects)
		setChestData(newAllObjects[nextWorld].chests)
		setChestFieldData({
			...chestFieldData,
			currentWorld: nextWorld
		})
	}
	function handlePopupTableChange(nextWorld) {
		let toBeStoredObjects = popupData.map(object => {
			object.markForReplacement(false)
			return object
		})
		let newAllObjects = allPopups.map((list, index) => {
			if (index === popupFieldData.currentWorld)
				return {
					world: worldsData[index],
					popups: toBeStoredObjects
				}
			return list
		})
		setAllPopups(newAllObjects)
		setPopupData(newAllObjects[nextWorld].popups)
		setPopupFieldData({
			...popupFieldData,
			currentWorld: nextWorld
		})
	}
	// function handleBonusTableChange(nextWorld) {
	// 	let toBeStoredObjects = currentBonusData.map(object => {
	// 		object.markForReplacement(false)
	// 		return object
	// 	})
	// 	let newAllObjects = allBonuses.map((list, index) => {
	// 		if (index === currentBonusWorld)
	// 			return {
	// 				world: worldsData[index],
	// 				bonusFights: toBeStoredObjects
	// 			}
	// 		return list
	// 	})
	// 	setBonuses(newAllObjects)
	// 	setCurrentBonusData(newAllObjects[nextWorld].popups)
	// 	setCurrentBonusWorld(nextWorld)
	// }
	function handleFormTableChange(nextForm) {
		let toBeStoredObjects = formData.map(object => {
			object.markForReplacement(false)
			return object
		})
		let newAllObjects = allForms.map((list, index) => {
			if (index === formFieldData.currentDriveForm)
				return {
					driveForm: formTypesData[index],
					removeGrowthJankCodes: list.removeGrowthJankCodes,
					driveLevels: toBeStoredObjects
				}
			return list
		})
		setAllForms(newAllObjects)
		setFormData(newAllObjects[nextForm].driveLevels)
		setFormFieldData({
			...formFieldData,
			currentDriveForm: nextForm
		})
	}
	function handleEquipmentTableChange(nextEquipment) {
		let toBeStoredObjects = equipmentData.map(object => {
			object.markForReplacement(false)
			return object
		})
		let newAllObjects = allEquipments.map((list, index) => {
			if (index === equipmentFieldData.currentEquipmentType)
				return {
					equipmentType: equipmentTypesData[index],
					equipments: toBeStoredObjects
				}
			return list
		})
		setAllEquipments(newAllObjects)
		setEquipmentData(newAllObjects[nextEquipment].equipments)
		setEquipmentFieldData({
			...equipmentFieldData,
			currentEquipmentType: nextEquipment
		})
	}
	//#endregion

	//#region General Functions
	function handleReplace(buttonName, currentReward, currentData, setCurrentData, fieldData, setFieldData) {
		let replacedObjects
		if (buttonName === 'replaceButton')
			replacedObjects = currentData.map(object => {
				if (object.toBeReplaced)
					object.replace(currentReward)
				return object
			})
		else
			replacedObjects = currentData.map(object => {
				if (object.toBeReplaced)
					object.vanilla()
				return object
			})
		setCurrentData(replacedObjects)
		setFieldData({
			...fieldData,
			selectAll: false
		})
	}
	function onRowCheck(row, currentData, setCurrentData) {
		let toggledObjects = currentData.map((object, index) => {
			if (index === parseInt(row))
				object.markForReplacement(!object.toBeReplaced)
			return object
		})
		setCurrentData(toggledObjects)
	}
	function onCheckAll(currentData, setCurrentData, fieldData, setFieldData) {
		let toBeReplacedObjects = currentData.map(object => {
			object.markForReplacement(!fieldData.selectAll)
			return object
		})
		setCurrentData(toBeReplacedObjects)
		setFieldData({
			...fieldData,
			selectAll: !fieldData.selectAll
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
						chestData={chestData}
						rewardList={rewardsData[chestFieldData.currentRewardType].rewards}
						handleWorldChange={(e) => handleChestTableChange(e.target.value)}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, chestFieldData, setChestFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, chestFieldData, setChestFieldData)}
						onRowCheck={(e) => onRowCheck(e.target.value, chestData, setChestData)}
						onCheckAll={() => onCheckAll(chestData, setChestData, chestFieldData, setChestFieldData)}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[chestFieldData.currentRewardType].rewards[chestFieldData.currentReward]
								}
							}
							handleReplace(e.target.name, replacement, chestData, setChestData, chestFieldData, setChestFieldData)
						}}
					/>
				</Tab>
				<Tab eventKey="popup" title="Popup">
					<PopupPage
						style={styles}
						fieldData={popupFieldData}
						popupData={popupData}
						rewardList={rewardsData[popupFieldData.currentRewardType].rewards}
						handleWorldChange={(e) => handlePopupTableChange(e.target.value)}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, popupFieldData, setPopupFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, popupFieldData, setPopupFieldData)}
						onRowCheck={(e) => onRowCheck(e.target.value, popupData, setPopupData)}
						onCheckAll={() => onCheckAll(popupData, setPopupData, popupFieldData, setPopupFieldData)}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[popupFieldData.currentRewardType].rewards[popupFieldData.currentReward]
								}
							}
							handleReplace(e.target.name, replacement, popupData, setPopupData, popupFieldData, setPopupFieldData)
						}}
					/>
				</Tab>
				<Tab eventKey="form" title="Forms & Summons">
					<FormPage
						style={styles}
						formData={formData}
						fieldData={formFieldData}
						rewardList={rewardsData[formFieldData.currentRewardType].rewards}
						handleFormChange={(e) => handleFormTableChange(e.target.value)}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, formFieldData, setFormFieldData)}
						onSelectChange={(e) => handleFieldChange(e.target.name, e.target.value, formFieldData, setFormFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							formFieldData,
							setFormFieldData)
						}
						onRowCheck={(e) => onRowCheck(e.target.value, formData, setFormData)}
						onCheckAll={() => onCheckAll(formData, setFormData, formFieldData, setFormFieldData)}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[formFieldData.currentRewardType].rewards[formFieldData.currentReward]
								},
								currentEXPMultiplierValue: formFieldData.currentEXPMultiplierValue,
								currentEXP: formFieldData.currentEXP
							}
							handleReplace(e.target.name, replacement, formData, setFormData, formFieldData, setFormFieldData)
						}}

					/>
				</Tab>
				<Tab eventKey="equipment" title="Equipment">
					<EquipmentPage
						style={styles}
						equipmentData={equipmentData}
						fieldData={equipmentFieldData}
						rewardList={rewardsData[equipmentFieldData.currentRewardType].rewards}
						handleEquipmentTypeChange={(e) => handleEquipmentTableChange(e.target.value)}
						onRewardTypeChange={(e) => handleRewardTypeChange(e.target, equipmentFieldData, setEquipmentFieldData)}
						onRewardChange={(e) => handleFieldChange(e.target.name, e.target.value, formFieldData, setFormFieldData)}
						onInputChange={(e) => handleFieldChange(e.target.name,
							Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))),
							equipmentFieldData,
							setEquipmentFieldData)
						}
						onRowCheck={(e) => onRowCheck(e.target.value, equipmentData, setEquipmentData)}
						onCheckAll={() => onCheckAll(equipmentData, setEquipmentData, equipmentFieldData, setEquipmentFieldData)}
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
							handleReplace(e.target.name, replacement, equipmentData, setEquipmentData, equipmentFieldData, setEquipmentFieldData)
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
						onRowCheck={(e) => onRowCheck(e.target.value, allLevels, setAllLevels)}
						onCheckAll={() => onCheckAll(allLevels, setAllLevels, levelFieldData, setLevelFieldData)}
						onClick={(e) => {
							let replacement = {
								currentLevelAP: 0,
								currentLevelDefense: 0,
								currentLevelMagic: 0,
								currentLevelStrength: 0,
								currentEXP: 0,
								currentEXPMultiplierValue: 2,
								selectAll: false,
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
							handleReplace(e.target.name, replacement, allLevels, setAllLevels, levelFieldData, setLevelFieldData)
						}}
					/>
				</Tab>
			</Tabs>
		</div>
	)
}

export default FunctionApp