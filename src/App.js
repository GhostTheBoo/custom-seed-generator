import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import _ from 'lodash'

import { worldsData, formTypesData, equipmentTypesData, charactersData, magicCostsData } from './Data/typesData'
import rewardsData from './Data/rewardsData'

import HomePage from './Pages/HomePage'

import ChestPage from './Pages/ChestPage'
import chestsData from './Data/chestsData'

import PopupPage from './Pages/PopupPage'
import popupsData from './Data/popupsData'

import FormPage from './Pages/FormPage'
import formsData from './Data/formsData'

import EquipmentPage from './Pages/EquipmentPage'
import equipmentsData from './Data/equipmentsData'

import BonusPage from './Pages/BonusPage'
import bonusData from './Data/bonusData'

import LevelPage from './Pages/LevelPage'
import levelsData from './Data/levelsData'

import CriticalPage from './Pages/CriticalPage'
import criticalData from './Data/criticalData'

import CheatPage from './Pages/CheatPage'
import cheatsData from './Data/cheatsData'

import StartingPage from './Pages/StartingPage'
import startingStatusData from './Data/startingStatusData'

import MagicPage from './Pages/MagicPage'
import magicData from './Data/magicData'

class App extends React.Component {
	constructor() {
		super()

		this.state = {
			chest: {
				currentWorld: 0,
				currentRewardType: 0,
				currentReward: 0,
				selectAll: false,
				allChests: chestsData.slice(),
				currentDisplayData: chestsData[0].chests.slice(),
			},
			popup: {
				currentWorld: 0,
				currentRewardType: 0,
				currentReward: 0,
				selectAll: false,
				allPopups: popupsData.slice(),
				currentDisplayData: popupsData[0].popups.slice(),
			},
			form: {
				currentDriveForm: 0,
				currentRewardType: 0,
				currentReward: 0,
				currentEXP: 0,
				currentEXPMultiplierValue: 2,
				selectAll: false,
				allForms: formsData.slice(),
				currentDisplayData: formsData[0].driveLevels.slice(),
			},
			equipment: {
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
				allEquipments: equipmentsData.slice(),
				currentDisplayData: equipmentsData[0].equipments.slice()
			},
			bonus: {
				currentWorld: 0,
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
				selectAll: false,
				allBonuses: bonusData.slice(),
				currentDisplayData: bonusData[0].characterBonuses[0].worldBonuses.slice()
			},
			level: {
				currentWorld: 0,
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
				selectAll: false,
				currentDisplayData: levelsData.slice(),
			},
			critical: {
				currentRewardType: 0,
				currentReward: 0,
				selectAll: false,
				currentDisplayData: criticalData.slice()
			},
			cheat: {
				selectAll: false,
				currentDisplayData: cheatsData.slice()
			},
			startingStatus: {
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
				startingStatusData: _.cloneDeep(startingStatusData)
			},
			magicCost: {
				currentCost: 0,
				currentMagicType: 0,
				selectAll: false,
				allMagic: magicData.slice(),
				currentDisplayData: magicData[0].abilities.slice()
			},
			tracker: {
				fire: 3,
				blizzard: 3,
				thunder: 3,
				cure: 3,
				reflect: 3,
				magnet: 3,
				pages: 5,
				proofs: [1, 1, 1],
				reports: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				drives: [1, 1, 1, 1, 1],
				summons: [1, 1, 1, 1]
			},
			isHeavilyCommented: false
		}
		window.addEventListener('beforeunload', this.handleLeavePage);

		this.handleChestWorldChange = this.handleChestWorldChange.bind(this)
		this.handlePopupWorldChange = this.handlePopupWorldChange.bind(this)
		this.handleBonusWorldChange = this.handleBonusWorldChange.bind(this)
		this.handleFormChange = this.handleFormChange.bind(this)
		this.handleEquipmentTypeChange = this.handleEquipmentTypeChange.bind(this)
		this.handleBonusCharacterChange = this.handleBonusCharacterChange.bind(this)
		this.handleMagicTypeChange = this.handleMagicTypeChange.bind(this)

		this.handleChestReplace = this.handleChestReplace.bind(this)
		this.handlePopupReplace = this.handlePopupReplace.bind(this)
		this.handleFormReplace = this.handleFormReplace.bind(this)
		this.handleEquipmentReplace = this.handleEquipmentReplace.bind(this)
		this.handleBonusReplace = this.handleBonusReplace.bind(this)
		this.handleLevelReplace = this.handleLevelReplace.bind(this)
		this.handleMagicReplace = this.handleMagicReplace.bind(this)
		this.handleCriticalReplace = this.handleCriticalReplace.bind(this)
		this.handleCheatReplace = this.handleCheatReplace.bind(this)
		this.handleStartingStatusReplace = this.handleStartingStatusReplace.bind(this)

		this.onCommentCheck = this.onCommentCheck.bind(this)
		this.handleRewardTypeChange = this.handleRewardTypeChange.bind(this)
		this.handleGenericChange = this.handleGenericChange.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.onRowCheck = this.onRowCheck.bind(this)
		this.checkAll = this.checkAll.bind(this)
		this.updateTracker = this.updateTracker.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleSaveData = this.handleSaveData.bind(this)
		this.handleLoadData = this.handleLoadData.bind(this)
		this.onFileUpload = this.onFileUpload.bind(this)
		this.loadHandler = this.loadHandler.bind(this)
	}

	//#region Table Data Change
	handleChestWorldChange(event) {
		let nextWorld = parseInt(event.target.value)
		let toBeReplacedChests = this.state.chest.currentDisplayData.map(chest => {
			chest.toBeReplaced = false
			return chest
		})
		let newAllChests = this.state.chest.allChests.map((worldChestList, index) => {
			if (index === this.state.chest.currentWorld)
				return {
					world: worldsData[index],
					chests: toBeReplacedChests
				}
			return worldChestList
		})
		let nextWorldChests = newAllChests[nextWorld].chests.slice()
		this.setState(prevState => ({
			chest: {
				...prevState.chest,
				selectAll: false,
				currentWorld: nextWorld,
				allChests: newAllChests,
				currentDisplayData: nextWorldChests
			}
		}))
	}

	handlePopupWorldChange(event) {
		let nextWorld = parseInt(event.target.value)
		let toBeReplacedPopups = this.state.popup.currentDisplayData.map(popup => {
			popup.toBeReplaced = false
			return popup
		})
		let newAllPopups = this.state.popup.allPopups.map((worldPopupList, index) => {
			if (index === this.state.popup.currentWorld)
				return {
					world: worldsData[index],
					popups: toBeReplacedPopups
				}
			return worldPopupList
		})
		let nextWorldPopups = newAllPopups[nextWorld].popups.slice()
		this.setState(prevState => ({
			popup: {
				...prevState.popup,
				selectAll: false,
				currentWorld: nextWorld,
				allPopups: newAllPopups,
				currentDisplayData: nextWorldPopups
			}
		}))
	}

	handleBonusWorldChange(event) {
		let nextWorld = parseInt(event.target.value)
		let newAllCharacterBonuses = this.state.bonus.allBonuses[this.state.bonus.currentCharacter].characterBonuses.map((worldBonusList, index) => {
			if (index === this.state.bonus.currentWorld) {
				let newWorldBonusList = {
					world: worldsData[index],
					worldBonuses: worldBonusList.worldBonuses.map(bonus => {
						bonus.toBeReplaced = false
						return bonus
					})
				}
				return newWorldBonusList
			}
			return worldBonusList
		})
		let newAllBonuses = this.state.bonus.allBonuses.map(c => {
			if (c.character === charactersData[this.state.bonus.currentCharacter])
				return {
					character: c.character,
					characterBonuses: newAllCharacterBonuses
				}
			return c
		})
		this.setState(prevState => ({
			bonus: {
				...prevState.bonus,
				selectAll: false,
				currentWorld: nextWorld,
				allBonuses: newAllBonuses,
				currentDisplayData: newAllBonuses[this.state.bonus.currentCharacter].characterBonuses[nextWorld].worldBonuses.slice()
			}
		}))
	}

	handleFormChange(event) {
		let nextDriveForm = event.target.value
		let toBeReplacedDriveFormLevels = this.state.form.currentDisplayData.map(driveFormLevel => {
			driveFormLevel.toBeReplaced = false
			return driveFormLevel
		})
		let newAllForms = this.state.form.allForms.map((driveFormList, index) => {
			if (index === this.state.form.currentDriveForm)
				return {
					driveForm: formTypesData[index],
					driveLevels: toBeReplacedDriveFormLevels
				}
			return driveFormList
		})
		let nextDriveFormLevels = newAllForms[nextDriveForm].driveLevels.slice()
		this.setState(prevState => ({
			form: {
				...prevState.form,
				selectAll: false,
				currentDriveForm: nextDriveForm,
				allForms: newAllForms,
				currentDisplayData: nextDriveFormLevels
			}
		}))
	}

	handleEquipmentTypeChange(event) {
		let nextEquipmentType = parseInt(event.target.value)
		let toBeReplacedEquipments = this.state.equipment.currentDisplayData.map(equipment => {
			equipment.toBeReplaced = false
			return equipment
		})
		let newAllEquipments = this.state.equipment.allEquipments.map((equipment, index) => {
			if (index === this.state.equipment.currentEquipmentType)
				return {
					equipmentType: equipmentTypesData[index],
					equipments: toBeReplacedEquipments
				}
			return equipment
		})
		let nextEquipments = newAllEquipments[nextEquipmentType].equipments.slice()
		this.setState(prevState => ({
			equipment: {
				...prevState.equipment,
				selectAll: false,
				currentEquipmentType: nextEquipmentType,
				allEquipments: newAllEquipments,
				currentDisplayData: nextEquipments
			}
		}))
	}

	handleBonusCharacterChange(event) {
		let nextCharacter = parseInt(event.target.value)

		let newAllCharacterBonuses = this.state.bonus.allBonuses[this.state.bonus.currentCharacter].characterBonuses.map((worldBonusList, index) => {
			if (index === this.state.bonus.currentWorld) {
				let newWorldBonusList = {
					world: worldsData[index],
					worldBonuses: worldBonusList.worldBonuses.map(bonus => {
						bonus.toBeReplaced = false
						return bonus
					})
				}
				return newWorldBonusList
			}
			return worldBonusList
		})

		let newAllBonuses = this.state.bonus.allBonuses.map(c => {
			if (c.character === charactersData[this.state.bonus.currentCharacter])
				return {
					character: c.character,
					characterBonuses: newAllCharacterBonuses
				}
			return c
		})

		this.setState(prevState => ({
			bonus: {
				...prevState.bonus,
				selectAll: false,
				currentCharacter: nextCharacter,
				allBonuses: newAllBonuses,
				currentDisplayData: newAllBonuses[nextCharacter].characterBonuses[this.state.bonus.currentWorld].worldBonuses.slice()
			}
		}))
	}

	handleMagicTypeChange(event) {
		let nextMagicType = parseInt(event.target.value)
		let toBeReplacedMagicAbilities = this.state.magicCost.currentDisplayData.map(ability => {
			ability.toBeReplaced = false
			return ability
		})
		let newAllMagicAbilities = this.state.magicCost.allMagic.map((magicType, index) => {
			if (index === this.state.magicCost.currentMagicType)
				return {
					magicType: magicCostsData[index],
					abilities: toBeReplacedMagicAbilities
				}
			return magicType
		})
		let nextMagicAbilities = newAllMagicAbilities[nextMagicType].abilities.slice()
		this.setState(prevState => ({
			magicCost: {
				...prevState.magicCost,
				selectAll: false,
				currentMagicType: nextMagicType,
				allMagic: newAllMagicAbilities,
				currentDisplayData: nextMagicAbilities
			}
		}))
	}
	//#endregion

	//#region Replace
	handleChestReplace(event) {
		let replacedChests
		if (event.target.name === 'replaceButton') {
			replacedChests = this.state.chest.currentDisplayData.map(chest => {
				if (chest.toBeReplaced) {
					let reward = rewardsData[this.state.chest.currentRewardType].rewards[this.state.chest.currentReward]
					chest.toBeReplaced = false
					if (reward.index !== chest.replacementReward.index) {
						this.updateTracker(chest.replacementReward.index, reward.index)
						chest.isReplaced = reward.index !== chest.vanillaReward.index
						chest.replacementReward = reward
					}
				}
				return chest
			})
		} else {
			replacedChests = this.state.chest.currentDisplayData.map(chest => {
				if (chest.toBeReplaced) {
					chest.toBeReplaced = false
					chest.isReplaced = false
					this.updateTracker(chest.replacementReward.index, chest.vanillaReward.index)
					chest.replacementReward = chest.vanillaReward
				}
				return chest
			})
		}
		this.setState(prevState => ({
			chest: {
				...prevState.chest,
				selectAll: false,
				currentDisplayData: replacedChests
			}
		}))
	}

	handlePopupReplace(event) {
		let replacedPopups
		if (event.target.name === 'replaceButton') {
			replacedPopups = this.state.popup.currentDisplayData.map(popup => {
				if (popup.toBeReplaced) {
					let reward = rewardsData[this.state.popup.currentRewardType].rewards[this.state.popup.currentReward]
					popup.toBeReplaced = false
					popup.isAbility = this.state.popup.currentRewardType === 0 || this.state.popup.currentRewardType === 4
					if (reward.index !== popup.replacementReward.index) {
						this.updateTracker(popup.replacementReward.index, reward.index)
						popup.isReplaced = reward.index !== popup.vanillaReward.index
						popup.replacementReward = reward
					}
				}
				return popup
			})
		} else {
			replacedPopups = this.state.popup.currentDisplayData.map(popup => {
				if (popup.toBeReplaced) {
					popup.toBeReplaced = false
					popup.isReplaced = false
					popup.isAbility = false
					this.updateTracker(popup.replacementReward.index, popup.vanillaReward.index)
					popup.replacementReward = popup.vanillaReward
				}
				return popup
			})
		}
		this.setState(prevState => ({
			popup: {
				...prevState.popup,
				selectAll: false,
				currentDisplayData: replacedPopups
			}
		}))
	}

	handleFormReplace(event) {
		let replacedDriveFormLevels
		if (event.target.name === 'replaceButton') {
			replacedDriveFormLevels = this.state.form.currentDisplayData.map(driveFormLevel => {
				if (driveFormLevel.toBeReplaced) {
					let reward = rewardsData[this.state.form.currentRewardType].rewards[this.state.form.currentReward]
					driveFormLevel.toBeReplaced = false
					if (reward.index !== driveFormLevel.replacementReward.index) {
						this.updateTracker(driveFormLevel.replacementReward.index, reward.index)
						driveFormLevel.isRewardReplaced = reward.index !== driveFormLevel.vanillaReward.index
						driveFormLevel.replacementReward = reward
					}
					if (this.state.form.currentEXPMultiplierValue === 0)
						driveFormLevel.replacementEXP = this.state.form.currentEXP
					else
						driveFormLevel.replacementEXP = Math.max(1, Math.floor((2 * driveFormLevel.vanillaEXP) / this.state.form.currentEXPMultiplierValue))

					if (driveFormLevel.replacementEXP !== driveFormLevel.vanillaEXP)
						driveFormLevel.isEXPReplaced = true
					else
						driveFormLevel.isEXPReplaced = false
				}
				return driveFormLevel
			})
		} else {
			replacedDriveFormLevels = this.state.form.currentDisplayData.map(driveFormLevel => {
				if (driveFormLevel.toBeReplaced) {
					driveFormLevel.toBeReplaced = false
					driveFormLevel.isRewardReplaced = false
					driveFormLevel.isEXPReplaced = false
					this.updateTracker(driveFormLevel.replacementReward.index, driveFormLevel.vanillaReward.index)
					driveFormLevel.replacementReward = driveFormLevel.vanillaReward
					driveFormLevel.replacementEXP = driveFormLevel.vanillaEXP
				}
				return driveFormLevel
			})
		}
		this.setState(prevState => ({
			form: {
				...prevState.form,
				selectAll: false,
				currentDisplayData: replacedDriveFormLevels
			}
		}))
	}

	handleEquipmentReplace(event) {
		let replacedEquipments
		if (event.target.name === 'replaceButton') {
			replacedEquipments = this.state.equipment.currentDisplayData.map(equipment => {
				if (equipment.toBeReplaced) {
					let reward = rewardsData[this.state.equipment.currentRewardType].rewards[this.state.equipment.currentReward]
					equipment.toBeReplaced = false
					equipment.additionalLineCount = 0

					if (reward.index === equipment.vanillaAbility.index) {
						equipment.isAbilityReplaced = false
						equipment.replacementAbility = equipment.vanillaAbility
					} else {
						equipment.isAbilityReplaced = true
						equipment.replacementAbility = reward
					}

					equipment.strength = this.state.equipment.currentStrength
					equipment.magic = this.state.equipment.currentMagic
					equipment.ap = this.state.equipment.currentAP
					equipment.defense = this.state.equipment.currentDefense
					equipment.isStatsReplaced = ((this.state.equipment.currentStrength !== equipment.vanillaStrength) || (this.state.equipment.currentMagic !== equipment.vanillaMagic) ||
						(this.state.equipment.currentDefense !== equipment.vanillaDefense) || (this.state.equipment.currentAP !== equipment.vanillaAP))

					if (equipment.isStatsReplaced) {
						if (this.state.equipment.currentEquipmentType !== 5) {
							if (equipment.ap !== 0)
								equipment.additionalLineCount++
						}
						if (this.state.equipment.currentEquipmentType !== 4) {
							if (equipment.defense !== 0)
								equipment.additionalLineCount++
						} else {
							if (equipment.strength !== 0)
								equipment.additionalLineCount++
							if (equipment.magic !== 0)
								equipment.additionalLineCount++
						}
					}

					equipment.fireResistance = this.state.equipment.currentFire
					equipment.blizzardResistance = this.state.equipment.currentBlizzard
					equipment.thunderResistance = this.state.equipment.currentThunder
					equipment.physicalResistance = this.state.equipment.currentPhysical
					equipment.isElementalResistanceChanged = ((this.state.equipment.currentFire !== equipment.vanillaFireResistance) || (this.state.equipment.currentBlizzard !== equipment.vanillaBlizzardResistance) ||
						(this.state.equipment.currentThunder !== equipment.vanillaThunderResistance) || (this.state.equipment.currentPhysical !== equipment.vanillaPhysicalResistance))

					equipment.darkResistance = this.state.equipment.currentDark
					equipment.lightResistance = this.state.equipment.currentLight
					equipment.universalResistance = this.state.equipment.currentUniversal
					equipment.isOtherResistanceChanged = ((this.state.equipment.currentDark !== equipment.vanillaDarkResistance) || (this.state.equipment.currentLight !== equipment.vanillaLightResistance) ||
						(this.state.equipment.currentUniversal !== equipment.vanillaUniversalResistance))

					if (this.state.equipment.currentEquipmentType !== 4) {
						if (equipment.fireResistance !== 0)
							equipment.additionalLineCount++
						if (equipment.blizzardResistance !== 0)
							equipment.additionalLineCount++
						if (equipment.thunderResistance !== 0)
							equipment.additionalLineCount++
						if (equipment.darkResistance !== 0)
							equipment.additionalLineCount++
					}
				}
				return equipment
			})
		} else {
			replacedEquipments = this.state.equipment.currentDisplayData.map(equipment => {
				if (equipment.toBeReplaced) {
					equipment.toBeReplaced = false
					equipment.isAbilityReplaced = false
					equipment.isStatsReplaced = false
					equipment.isElementalResistanceChanged = false
					equipment.isOtherResistanceChanged = false
					equipment.replacementAbility = equipment.vanillaAbility
					equipment.strength = equipment.vanillaStrength
					equipment.magic = equipment.vanillaMagic
					equipment.ap = equipment.vanillaAP
					equipment.defense = equipment.vanillaDefense
					equipment.fireResistance = equipment.vanillaFireResistance
					equipment.blizzardResistance = equipment.vanillaBlizzardResistance
					equipment.thunderResistance = equipment.vanillaThunderResistance
					equipment.physicalResistance = 0
					equipment.darkResistance = equipment.vanillaDarkResistance
					equipment.lightResistance = 0
					equipment.universalResistance = 0
					equipment.additionalLineCount = 0
				}
				return equipment
			})
		}
		this.setState(prevState => ({
			equipment: {
				...prevState.equipment,
				selectAll: false,
				currentDisplayData: replacedEquipments
			}
		}))
	}

	handleBonusReplace(event) {
		let replacedBonuses = this.state.bonus.currentDisplayData.map(bonus => {
			if (event.target.name === 'replaceButton') {
				if (bonus.toBeReplaced) {
					let rewardA = rewardsData[this.state.bonus.currentARewardType].rewards[this.state.bonus.currentAReward]
					let rewardB = rewardsData[this.state.bonus.currentBRewardType].rewards[this.state.bonus.currentBReward]
					bonus.toBeReplaced = false

					this.updateTracker(bonus.replacementReward1.index, rewardA.index)
					bonus.replacementReward1 = rewardA
					this.updateTracker(bonus.replacementReward2.index, rewardB.index)
					bonus.replacementReward2 = rewardB
					bonus.isRewardsReplaced = bonus.replacementReward1.index !== bonus.vanillaReward1.index || bonus.replacementReward2.index !== bonus.vanillaReward2.index

					bonus.hpIncrease = this.state.bonus.currentBonusHP
					bonus.mpIncrease = this.state.bonus.currentBonusMP
					bonus.isStatsReplaced = bonus.hpIncrease !== bonus.vanillaHpIncrease || bonus.mpIncrease !== bonus.vanillaMpIncrease

					bonus.armorSlotIncrease = this.state.bonus.currentArmor
					bonus.accessorySlotIncrease = this.state.bonus.currentAccessory
					bonus.itemSlotIncrease = this.state.bonus.currentItem
					bonus.driveGaugeIncrease = this.state.bonus.currentDrive
					bonus.isSlotsReplaced = bonus.armorSlotIncrease !== bonus.vanillaArmorSlotIncrease || bonus.accessorySlotIncrease !== bonus.vanillaAccessorySlotIncrease ||
						bonus.itemSlotIncrease !== bonus.vanillaItemSlotIncrease || bonus.driveGaugeIncrease !== bonus.vanillaDriveGaugeIncrease
				}
			} else {
				if (bonus.toBeReplaced) {
					bonus.toBeReplaced = false

					this.updateTracker(bonus.replacementReward1.index, bonus.vanillaReward1.index)
					bonus.replacementReward1 = bonus.vanillaReward1
					this.updateTracker(bonus.replacementReward2.index, bonus.vanillaReward2.index)
					bonus.replacementReward2 = bonus.vanillaReward2
					bonus.hpIncrease = bonus.vanillaHpIncrease
					bonus.mpIncrease = bonus.vanillaMpIncrease
					bonus.armorSlotIncrease = bonus.vanillaArmorSlotIncrease
					bonus.accessorySlotIncrease = bonus.vanillaAccessorySlotIncrease
					bonus.itemSlotIncrease = bonus.vanillaItemSlotIncrease
					bonus.driveGaugeIncrease = bonus.vanillaDriveGaugeIncrease

					bonus.isRewardsReplaced = false
					bonus.isStatsReplaced = false
					bonus.isSlotsReplaced = false
				}
			}
			//reward count
			bonus.rewardChangeCount = 0
			if (bonus.replacementReward1.index !== '0000')
				bonus.rewardChangeCount++
			if (bonus.replacementReward2.index !== '0000')
				bonus.rewardChangeCount++
			//stat count
			bonus.statChangeCount = 0
			if (bonus.hpIncrease !== 0)
				bonus.statChangeCount++
			if (bonus.mpIncrease !== 0)
				bonus.statChangeCount++
			//slot count
			bonus.slotChangeCount = 0
			if (bonus.armorSlotIncrease !== 0)
				bonus.slotChangeCount++
			if (bonus.accessorySlotIncrease !== 0)
				bonus.slotChangeCount++
			if (bonus.itemSlotIncrease !== 0)
				bonus.slotChangeCount++
			if (bonus.driveGaugeIncrease !== 0)
				bonus.slotChangeCount++
			return bonus
		})
		this.setState(prevState => ({
			bonus: {
				...prevState.bonus,
				selectAll: false,
				currentDisplayData: replacedBonuses
			}
		}))
	}

	handleLevelReplace(event) {
		let replacedLevels = this.state.level.currentDisplayData.map(l => {
			if (event.target.name === 'replaceButton') {
				if (l.toBeReplaced) {
					l.toBeReplaced = false

					let reward = rewardsData[this.state.level.currentSwordRewardType].rewards[this.state.level.currentSwordReward]
					this.updateTracker(l.replacementSwordReward.index, reward.index)
					l.replacementSwordReward = reward
					l.isSwordReplaced = l.replacementSwordReward.index !== l.vanillaSwordReward.index

					reward = rewardsData[this.state.level.currentShieldRewardType].rewards[this.state.level.currentShieldReward]
					this.updateTracker(l.replacementShieldReward.index, reward.index)
					l.replacementShieldReward = reward
					l.isShieldReplaced = l.replacementShieldReward.index !== l.vanillaShieldReward.index

					reward = rewardsData[this.state.level.currentStaffRewardType].rewards[this.state.level.currentStaffReward]
					this.updateTracker(l.replacementStaffReward.index, reward.index)
					l.replacementStaffReward = reward
					l.isStaffReplaced = l.replacementStaffReward.index !== l.vanillaStaffReward.index

					l.standardAP = this.state.level.currentLevelAP
					l.criticalAP = Math.floor(((this.state.level.currentLevelAP - 2) * 1.5) + 50)
					l.defense = this.state.level.currentLevelDefense
					l.magic = this.state.level.currentLevelMagic
					l.strength = this.state.level.currentLevelStrength

					l.isStatsReplaced = l.standardAP !== l.vanillaAP || l.defense !== l.vanillaDefense || l.magic !== l.vanillaMagic || l.strength !== l.vanillaStrength

					if (this.state.level.currentEXPMultiplierValue === 0)
						l.replacedEXP = this.state.level.currentEXP
					else
						l.replacedEXP = Math.max(1, Math.floor((2 * l.vanillaEXP) / this.state.level.currentEXPMultiplierValue))

					l.isEXPReplaced = l.replacedEXP !== l.vanillaEXP
				}
			} else {
				if (l.toBeReplaced) {
					l.toBeReplaced = false

					this.updateTracker(l.replacementSwordReward.index, l.vanillaSwordReward.index)
					l.replacementSwordReward = l.vanillaSwordReward
					l.isSwordReplaced = false

					this.updateTracker(l.replacementShieldReward.index, l.vanillaShieldReward.index)
					l.replacementShieldReward = l.vanillaShieldReward
					l.isShieldReplaced = false

					this.updateTracker(l.replacementStaffReward.index, l.vanillaStaffReward.index)
					l.replacementStaffReward = l.vanillaStaffReward
					l.isStaffReplaced = false

					l.standardAP = l.vanillaAP
					l.criticalAP = Math.floor(((l.vanillaAP - 2) * 1.5) + 50)
					l.defense = l.vanillaDefense
					l.magic = l.vanillaMagic
					l.strength = l.vanillaStrength
					l.isStatsReplaced = false

					l.replacedEXP = l.vanillaEXP
					l.isEXPReplaced = false
				}
			}
			return l
		})
		this.setState(prevState => ({
			level: {
				...prevState.level,
				selectAll: false,
				currentDisplayData: replacedLevels
			}
		}))
	}

	handleMagicReplace(event) {
		let replacedMagicAbilities
		if (event.target.name === 'replaceButton') {
			replacedMagicAbilities = this.state.magicCost.currentDisplayData.map(ability => {
				if (ability.toBeReplaced) {
					let cost = this.state.magicCost.currentCost
					ability.toBeReplaced = false
					if (cost !== ability.replacementCost) {
						ability.isReplaced = cost !== ability.vanillaCost
						ability.replacementCost = cost
					}
				}
				return ability
			})
		} else {
			replacedMagicAbilities = this.state.magicCost.currentDisplayData.map(ability => {
				if (ability.toBeReplaced) {
					ability.toBeReplaced = false
					ability.isReplaced = false
					ability.replacementCost = ability.vanillaCost
				}
				return ability
			})
		}
		this.setState(prevState => ({
			magicCost: {
				...prevState.magicCost,
				selectAll: false,
				currentDisplayData: replacedMagicAbilities
			}
		}))
	}

	handleCriticalReplace(event) {
		let replacedCriticalExtras
		if (event.target.name === 'replaceButton') {
			replacedCriticalExtras = this.state.critical.currentDisplayData.map(ce => {
				if (ce.toBeReplaced) {
					let reward = rewardsData[this.state.critical.currentRewardType].rewards[this.state.critical.currentReward]
					ce.toBeReplaced = false

					if (reward.index !== ce.replacementReward.index) {
						ce.isReplaced = reward.index !== ce.vanillaReward.index
						this.updateTracker(ce.replacementReward.index, reward.index)
						ce.replacementReward = reward
					}
				}
				return ce
			})
		} else {
			replacedCriticalExtras = this.state.critical.currentDisplayData.map(ce => {
				if (ce.toBeReplaced) {
					ce.toBeReplaced = false
					ce.isReplaced = false
					this.updateTracker(ce.replacementReward.index, ce.vanillaReward.index)
					ce.replacementReward = ce.vanillaReward
				}
				return ce
			})
		}
		this.setState(prevState => ({
			critical: {
				...prevState.critical,
				selectAll: false,
				currentDisplayData: replacedCriticalExtras
			}
		}))
	}

	handleCheatReplace(event) {
		let active = this.state.cheat.selectAll
		let final = this.state.cheat.currentDisplayData[0].isActive
		let activatedCheats = this.state.cheat.currentDisplayData.map(cheat => {
			if (cheat.toBeReplaced) {
				cheat.toBeReplaced = false
				cheat.isActive = active ? !final : !cheat.isActive
			}
			return cheat
		})
		this.setState(prevState => ({
			cheat: {
				...prevState.cheat,
				selectAll: false,
				currentDisplayData: activatedCheats
			}
		}))
	}

	handleStartingStatusReplace(event) {
		let newStartingStatus = _.cloneDeep(this.state.startingStatus.startingStatusData)
		let newKeyblade = 0
		let newArmor = 0
		let newAccessory = 0
		let newDonald1 = 28
		let newDonald2 = 29
		let newGoofy1 = 33
		let newGoofy2 = 64
		if (event.target.name === 'replaceButton') {
			newStartingStatus.startingKeyblade = rewardsData[7].rewards[this.state.startingStatus.currentKeyblade]
			newKeyblade = this.state.startingStatus.currentKeyblade

			if (this.state.startingStatus.currentArmor === 0)
				newStartingStatus.startingArmor = rewardsData[17].rewards[0]
			else
				newStartingStatus.startingArmor = rewardsData[2].rewards[this.state.startingStatus.currentArmor - 1]
			newArmor = this.state.startingStatus.currentArmor

			if (this.state.startingStatus.currentAccessory === 0)
				newStartingStatus.startingAccessory = rewardsData[17].rewards[0]
			else
				newStartingStatus.startingAccessory = rewardsData[1].rewards[this.state.startingStatus.currentAccessory - 1]
			newAccessory = this.state.startingStatus.currentAccessory

			if (this.state.startingStatus.currentDonald1 === 0)
				newStartingStatus.startingDonald1 = rewardsData[17].rewards[0]
			else
				newStartingStatus.startingDonald1 = rewardsData[0].rewards[this.state.startingStatus.currentDonald1 - 1]
			newDonald1 = this.state.startingStatus.currentDonald1
			if (this.state.startingStatus.currentDonald2 === 0)
				newStartingStatus.startingDonald2 = rewardsData[17].rewards[0]
			else
				newStartingStatus.startingDonald2 = rewardsData[0].rewards[this.state.startingStatus.currentDonald2 - 1]
			newDonald2 = this.state.startingStatus.currentDonald2

			if (this.state.startingStatus.currentGoofy1 === 0)
				newStartingStatus.startingGoofy1 = rewardsData[17].rewards[0]
			else
				newStartingStatus.startingGoofy1 = rewardsData[0].rewards[this.state.startingStatus.currentGoofy1 - 1]
			newGoofy1 = this.state.startingStatus.currentGoofy1
			if (this.state.startingStatus.currentGoofy2 === 0)
				newStartingStatus.startingGoofy2 = rewardsData[17].rewards[0]
			else
				newStartingStatus.startingGoofy2 = rewardsData[0].rewards[this.state.startingStatus.currentGoofy2 - 1]
			newGoofy2 = this.state.startingStatus.currentGoofy2

			newStartingStatus.startingMunny = this.state.startingStatus.currentMunny
			newStartingStatus.startingHP = this.state.startingStatus.currentStartingHP
			newStartingStatus.startingMP = this.state.startingStatus.currentStartingMP
		} else {
			newStartingStatus.startingKeyblade = rewardsData[7].rewards[0]
			newStartingStatus.startingArmor = rewardsData[17].rewards[0]
			newStartingStatus.startingAccessory = rewardsData[17].rewards[0]
			newStartingStatus.startingDonald1 = newDonald1
			newStartingStatus.startingDonald2 = newDonald2
			newStartingStatus.startingGoofy1 = newGoofy1
			newStartingStatus.startingGoofy2 = newGoofy2
			newStartingStatus.startingMunny = 0
			newStartingStatus.startingHP = 20
			newStartingStatus.startingMP = 100
		}

		this.setState({
			startingStatus: {
				currentKeyblade: newKeyblade,
				currentArmor: newArmor,
				currentAccessory: newAccessory,
				currentDonald1: newDonald1,
				currentDonald2: newDonald2,
				currentGoofy1: newGoofy1,
				currentGoofy2: newGoofy2,
				currentMunny: newStartingStatus.startingMunny,
				currentStartingHP: newStartingStatus.startingHP,
				currentStartingMP: newStartingStatus.startingMP,
				startingStatusData: newStartingStatus
			}
		})
	}
	//#endregion

	//#region General Functions
	handleLeavePage(event) {
		const message = 'Make sure you save your data before leaving!';
		event.returnValue = message;
		return message;
	}

	onCommentCheck() {
		this.setState({
			isHeavilyCommented: !this.state.isHeavilyCommented
		})
	}

	handleRewardTypeChange(page, event) {
		const currentReward = event.target.name.slice(0, -4)
		this.setState(prevState => ({
			[page]: {
				...prevState[page],
				[currentReward]: 0,
				[event.target.name]: parseInt(event.target.value)
			}
		}))
	}

	handleGenericChange(page, event) {
		const { name, value } = event.target
		this.setState(prevState => ({
			[page]: {
				...prevState[page],
				[name]: parseInt(value)
			}
		}))
	}

	handleInputChange(page, event) {
		let { name, value, min, max } = event.target
		value = Math.max(Number(min), Math.min(Number(max), Number(parseInt(value))))
		this.setState(prevState => ({
			[page]: {
				...prevState[page],
				[name]: parseInt(value)
			}
		}))
	}

	onRowCheck(page, event) {
		let toBeReplacedObjects = this.state[page].currentDisplayData.map((obj, index) => {
			if (index === parseInt(event.target.value))
				obj.toBeReplaced = !obj.toBeReplaced
			return obj
		})
		this.setState(prevState => ({
			[page]: {
				...prevState[page],
				currentDisplayData: toBeReplacedObjects
			}
		}))
	}

	checkAll(page) {
		let selectAll = !this.state[page].selectAll
		let toBeReplacedObjects = this.state[page].currentDisplayData.map(obj => {
			obj.toBeReplaced = selectAll
			return obj
		})
		this.setState(prevState => ({
			[page]: {
				...prevState[page],
				selectAll: selectAll,
				currentDisplayData: toBeReplacedObjects
			}
		}))
	}

	updateTracker(before, after) {
		if (before === after)
			return

		let currentTracker = {
			fire: 0,
			blizzard: 0,
			thunder: 0,
			cure: 0,
			reflect: 0,
			magnet: 0,
			pages: 0,
			proofs: [0, 0, 0],
			reports: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			drives: [0, 0, 0, 0, 0],
			summons: [0, 0, 0, 0]
		}

		let intAfter = parseInt(after, 16)
		if (intAfter === 0x15)
			currentTracker.fire++
		else if (intAfter === 0x16)
			currentTracker.blizzard++
		else if (intAfter === 0x17)
			currentTracker.thunder++
		else if (intAfter === 0x18)
			currentTracker.cure++
		else if (intAfter === 0x57)
			currentTracker.reflect++
		else if (intAfter === 0x58)
			currentTracker.magnet++
		else if (intAfter === 0x20)
			currentTracker.pages++
		else if (intAfter >= 0x251 && intAfter <= 0x253)
			currentTracker.proofs[intAfter - 0x251]++
		else if (intAfter >= 0xE2 && intAfter <= 0xEE)
			currentTracker.reports[intAfter - 0xE2]++
		else if (intAfter === 0x1A)
			//Valor
			currentTracker.drives[0]++
		else if (intAfter === 0x1B)
			//Wisdom
			currentTracker.drives[1]++
		else if (intAfter === 0x233)
			//Limit
			currentTracker.drives[2]++
		else if (intAfter === 0x1F)
			//Master
			currentTracker.drives[3]++
		else if (intAfter === 0x1D)
			//Final
			currentTracker.drives[4]++
		else if (intAfter === 0x17F)
			//Chicken Little
			currentTracker.summons[0]++
		else if (intAfter === 0x19)
			//Stitch
			currentTracker.summons[1]++
		else if (intAfter === 0x9F)
			//Genie
			currentTracker.summons[2]++
		else if (intAfter === 0xA0)
			//Peter Pan
			currentTracker.summons[3]++

		let intBefore = parseInt(before, 16)
		if (intBefore === 0x15)
			currentTracker.fire--
		else if (intBefore === 0x16)
			currentTracker.blizzard--
		else if (intBefore === 0x17)
			currentTracker.thunder--
		else if (intBefore === 0x18)
			currentTracker.cure--
		else if (intBefore === 0x57)
			currentTracker.reflect--
		else if (intBefore === 0x58)
			currentTracker.magnet--
		else if (intBefore === 0x20)
			currentTracker.pages--
		else if (intBefore >= 0x251 && intBefore <= 0x253)
			currentTracker.proofs[intBefore - 0x251]--
		else if (intBefore >= 0xE2 && intBefore <= 0xEE)
			currentTracker.reports[intBefore - 0xE2]--
		else if (intBefore === 0x1A)
			//Valor
			currentTracker.drives[0]--
		else if (intBefore === 0x1B)
			//Wisdom
			currentTracker.drives[1]--
		else if (intBefore === 0x233)
			//Limit
			currentTracker.drives[2]--
		else if (intBefore === 0x1F)
			//Master
			currentTracker.drives[3]--
		else if (intBefore === 0x1D)
			//Final
			currentTracker.drives[4]--
		else if (intBefore === 0x17F)
			//Chicken Little
			currentTracker.summons[0]--
		else if (intBefore === 0x19)
			//Stitch
			currentTracker.summons[1]--
		else if (intBefore === 0x9F)
			//Genie
			currentTracker.summons[2]--
		else if (intBefore === 0xA0)
			//Peter Pan
			currentTracker.summons[3]--

		this.setState(prevState => ({
			tracker: {
				fire: prevState.tracker.fire + currentTracker.fire,
				blizzard: prevState.tracker.blizzard + currentTracker.blizzard,
				thunder: prevState.tracker.thunder + currentTracker.thunder,
				cure: prevState.tracker.cure + currentTracker.cure,
				reflect: prevState.tracker.reflect + currentTracker.reflect,
				magnet: prevState.tracker.magnet + currentTracker.magnet,
				pages: prevState.tracker.pages + currentTracker.pages,
				proofs: prevState.tracker.proofs.map((proof, index) => {
					return proof + currentTracker.proofs[index]
				}),
				reports: prevState.tracker.reports.map((proof, index) => {
					return proof + currentTracker.reports[index]
				}),
				drives: prevState.tracker.drives.map((proof, index) => {
					return proof + currentTracker.drives[index]
				}),
				summons: prevState.tracker.summons.map((proof, index) => {
					return proof + currentTracker.summons[index]
				})
			}
		}))
	}

	handleSave() {
		let trackerPnachComments = '//GAME STATUS\n'
		let trackerData = this.state.tracker
		trackerPnachComments += '// ' + trackerData.fire + ' Fire spell(s)\n'
		trackerPnachComments += '// ' + trackerData.blizzard + ' Blizzard spell(s)\n'
		trackerPnachComments += '// ' + trackerData.thunder + ' Thunder spell(s)\n'
		trackerPnachComments += '// ' + trackerData.cure + ' Cure spell(s)\n'
		trackerPnachComments += '// ' + trackerData.reflect + ' Reflect spell(s)\n'
		trackerPnachComments += '// ' + trackerData.magnet + ' Magnet spell(s)\n'
		trackerPnachComments += '// ' + trackerData.pages + ' Torn Page(s)\n'
		trackerPnachComments += '// ' + trackerData.proofs[0] + ' Proof(s) of Connection\n'
		trackerPnachComments += '// ' + trackerData.proofs[1] + ' Proof(s) of Nonexistence\n'
		trackerPnachComments += '// ' + trackerData.proofs[2] + ' Proof(s) of Peace\n'
		trackerData.reports.forEach((report, index) => {
			trackerPnachComments += '// ' + report + ' Secret Ansem\'s Report(s) ' + (index + 1) + '\n'
		})
		trackerPnachComments += '// ' + trackerData.drives[0] + ' Valor Form(s)\n'
		trackerPnachComments += '// ' + trackerData.drives[1] + ' Wisdom Form(s)\n'
		trackerPnachComments += '// ' + trackerData.drives[2] + ' Limit Form(s)\n'
		trackerPnachComments += '// ' + trackerData.drives[3] + ' Master Form(s)\n'
		trackerPnachComments += '// ' + trackerData.drives[4] + ' Final Form(s)\n'
		trackerPnachComments += '// ' + trackerData.summons[0] + ' Baseball Charm(s)\n'
		trackerPnachComments += '// ' + trackerData.summons[1] + ' Ukulele Charm(s)\n'
		trackerPnachComments += '// ' + trackerData.summons[2] + ' Lamp Charm(s)\n'
		trackerPnachComments += '// ' + trackerData.summons[3] + ' Feather Charm(s)\n\n'

		let finalHP = this.state.startingStatus.startingStatusData.startingHP
		let finalMP = this.state.startingStatus.startingStatusData.startingMP
		let finalArmor = 1
		let finalAccessory = 1
		let finalItem = 3
		let finalDrive = 5
		this.state.bonus.allBonuses[0].characterBonuses.forEach(world => {
			world.worldBonuses.forEach(bonus => {
				finalHP += Math.floor(bonus.hpIncrease / 2)
				finalMP += Math.floor(bonus.mpIncrease / 2)
				finalArmor += bonus.armorSlotIncrease
				finalAccessory += bonus.accessorySlotIncrease
				finalItem += bonus.itemSlotIncrease
				finalDrive += bonus.driveGaugeIncrease
			})
		})
		finalDrive = finalDrive >= 9 ? 9 : finalDrive
		trackerPnachComments += '// Sora\'s Final Stats in Critical Mode:\n'
		trackerPnachComments += '// HP: ' + finalHP + '\n'
		trackerPnachComments += '// MP: ' + finalMP + '\n'
		trackerPnachComments += '// Armor: ' + finalArmor + '\n'
		trackerPnachComments += '// Accessory: ' + finalAccessory + '\n'
		trackerPnachComments += '// Item: ' + finalItem + '\n'
		trackerPnachComments += '// Drive: ' + finalDrive + '\n'


		let chestPnachCodes = this.state.chest.allChests.map(worldList => {
			let ret = '// ' + worldList.world.toUpperCase() + '\n'
			worldList.chests.forEach(chest => {
				if (chest.isReplaced) {
					ret += 'patch=1,EE,' + chest.vanillaAddress + ',extended,0000' + chest.replacementReward.index.padStart(4, '0')
					ret += ' // ' + chest.room + ', ' + chest.vanillaReward.reward + ' is now ' + chest.replacementReward.reward + '\n'
				} else if (this.state.isHeavilyCommented) {
					ret += '//patch=1,EE,' + chest.vanillaAddress + ',extended,0000' + chest.replacementReward.index.padStart(4, '0')
					ret += ' // ' + chest.room + ', ' + chest.vanillaReward.reward + ' is still ' + chest.replacementReward.reward + '\n'
				}
			})
			return ret
		})
		chestPnachCodes.unshift('\n//CHESTS\n')

		let popupPnachCodes = this.state.popup.allPopups.map(worldList => {
			let ret = '// ' + worldList.world.toUpperCase() + '\n'
			worldList.popups.forEach(popup => {
				if (popup.isReplaced) {
					ret += 'patch=1,EE,' + popup.vanillaAddress + ',extended,0000' + popup.replacementReward.index.padStart(4, '0')
					ret += ' // ' + popup.popup + ', ' + popup.vanillaReward.reward + ' is now ' + popup.replacementReward.reward + '\n'
				} else if (this.state.isHeavilyCommented) {
					ret += '//patch=1,EE,' + popup.vanillaAddress + ',extended,0000' + popup.replacementReward.index.padStart(4, '0')
					ret += ' // ' + popup.popup + ', ' + popup.vanillaReward.reward + ' is still ' + popup.replacementReward.reward + '\n'
				}
			})
			return ret
		})
		popupPnachCodes.unshift('\n//POPUPS\n')

		let formPnachCodes = this.state.form.allForms.map(driveFormList => {
			let ret = '// ' + driveFormList.driveForm.toUpperCase() + '\n'
			if (driveFormList.driveLevels.some(driveFormLevel => driveFormLevel.isRewardReplaced))
				if (driveFormList.driveForm !== 'Summon')
					ret += driveFormList.removeGrowthJankCodes.join('')

			driveFormList.driveLevels.forEach(driveFormLevel => {
				if (driveFormLevel.isRewardReplaced) {
					ret += 'patch=1,EE,' + driveFormLevel.vanillaAddress + ',extended,0000' + driveFormLevel.replacementReward.index.padStart(4, '0')
					ret += ' // ' + driveFormLevel.level + ', ' + driveFormLevel.vanillaReward.reward + ' is now ' + driveFormLevel.replacementReward.reward + '\n'
				} else if (this.state.isHeavilyCommented) {
					ret += '//patch=1,EE,' + driveFormLevel.vanillaAddress + ',extended,0000' + driveFormLevel.replacementReward.index.padStart(4, '0')
					ret += ' // ' + driveFormLevel.level + ', ' + driveFormLevel.vanillaReward.reward + ' is still ' + driveFormLevel.replacementReward.reward + '\n'
				}

				if (driveFormLevel.isEXPReplaced) {
					ret += 'patch=1,EE,' + driveFormLevel.EXPAddress + ',extended,' + driveFormLevel.replacementEXP.toString(16).toUpperCase().padStart(8, 0)
					ret += ' // ' + driveFormLevel.replacementEXP + ' experience is now required to reach ' + driveFormLevel.level + '\n'
				} else if (this.state.isHeavilyCommented) {
					ret += '//patch=1,EE,' + driveFormLevel.EXPAddress + ',extended,' + driveFormLevel.replacementEXP.toString(16).toUpperCase().padStart(8, 0)
					ret += ' // ' + driveFormLevel.replacementEXP + ' experience is still required to reach ' + driveFormLevel.level + '\n'
				}
			})
			return ret
		})
		formPnachCodes.unshift('\n//DRIVE FORMS\n')

		let equipmentPnachCodes = this.state.equipment.allEquipments.map(equipment => {
			let ret = '// ' + equipment.equipmentType.toUpperCase() + '\n'

			equipment.equipments.forEach(eq => {
				let text = '// ' + eq.name + '\n'

				if (this.state.isHeavilyCommented || eq.isAbilityReplaced || eq.isStatsReplaced || eq.isElementalResistanceChanged || eq.isOtherResistanceChanged)
					ret += text
				text = ''

				text = 'patch=1,EE,' + eq.abilityAddress + ',extended,0000' + eq.replacementAbility.index.padStart(4, '0') + ' // Ability: ' + eq.replacementAbility.reward + '\n'
				if (eq.isAbilityReplaced)
					ret += text
				else if (this.state.isHeavilyCommented)
					ret += '//' + text
				text = ''

				text += 'patch=1,EE,' + eq.statAddress + ',extended,'
				text += eq.ap.toString(16).toUpperCase().padStart(2, '0') + eq.defense.toString(16).toUpperCase().padStart(2, '0')
				text += eq.magic.toString(16).toUpperCase().padStart(2, '0') + eq.strength.toString(16).toUpperCase().padStart(2, '0')
				text += ' // AP:' + eq.ap + ' Defense:' + eq.defense + ' Magic:' + eq.magic + ' Strength:' + eq.strength + '\n'
				if (eq.isStatsReplaced)
					ret += text
				else if (this.state.isHeavilyCommented)
					ret += '//' + text
				text = ''

				text += 'patch=1,EE,' + eq.elementalResistanceAddress + ',extended,'
				text += (100 - eq.thunderResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - eq.blizzardResistance).toString(16).toUpperCase().padStart(2, '0')
				text += (100 - eq.fireResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - eq.physicalResistance).toString(16).toUpperCase().padStart(2, '0')
				text += ' // Thunder:' + eq.thunderResistance + '% Blizzard:' + eq.blizzardResistance
				text += '% Fire:' + eq.fireResistance + '% Physical:' + eq.physicalResistance + '%\n'
				if (eq.isElementalResistanceChanged)
					ret += text
				else if (this.state.isHeavilyCommented)
					ret += '//' + text
				text = ''

				text += 'patch=1,EE,' + eq.otherResistanceAddress + ',extended,00' + (100 - eq.universalResistance).toString(16).toUpperCase().padStart(2, '0')
				text += (100 - eq.lightResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - eq.darkResistance).toString(16).toUpperCase().padStart(2, '0')
				text += ' // Universal:' + eq.universalResistance + '% Light:' + eq.lightResistance + '% Dark:' + eq.darkResistance + '%\n'
				if (eq.isOtherResistanceChanged)
					ret += text
				else if (this.state.isHeavilyCommented)
					ret += '//' + text
			})
			return ret
		})
		equipmentPnachCodes.unshift('\nEQUIPMENT\n')

		let bonusPnachCodes = this.state.bonus.allBonuses.map(character => {
			let ret = '// ' + character.character.toUpperCase() + '\n'
			character.characterBonuses.forEach(world => {
				let worldRet = ''
				world.worldBonuses.forEach(bonus => {
					let text = '// ' + bonus.fight + '\n'
					if (this.state.isHeavilyCommented || bonus.isRewardsReplaced || bonus.isStatsReplaced || bonus.isSlotsReplaced)
						worldRet += text
					text = ''

					text += 'patch=1,EE,' + bonus.statAddress + ',extended,0000'
					text += bonus.mpIncrease.toString(16).toUpperCase().padStart(2, '0') + bonus.hpIncrease.toString(16).toUpperCase().padStart(2, '0')
					text += ' // MP:' + bonus.mpIncrease + ' HP:' + bonus.hpIncrease + '\n'
					if (bonus.isStatsReplaced)
						worldRet += text
					else if (this.state.isHeavilyCommented)
						worldRet += '//' + text
					text = ''

					text += 'patch=1,EE,' + bonus.slotAddress + ',extended,'
					text += bonus.armorSlotIncrease.toString(16).toUpperCase().padStart(2, '0') + bonus.accessorySlotIncrease.toString(16).toUpperCase().padStart(2, '0')
					text += bonus.itemSlotIncrease.toString(16).toUpperCase().padStart(2, '0') + bonus.driveGaugeIncrease.toString(16).toUpperCase().padStart(2, '0')
					text += ' // Armor Slot:+' + bonus.armorSlotIncrease + ' Accessory Slot:+' + bonus.accessorySlotIncrease
					text += ' Item Slot:+' + bonus.itemSlotIncrease + ' Drive Gauge:+' + bonus.driveGaugeIncrease + '\n'
					if (bonus.isSlotsReplaced)
						worldRet += text
					else if (this.state.isHeavilyCommented)
						worldRet += '//' + text
					text = ''

					text += 'patch=1,EE,' + bonus.rewardAddress + ',extended,' + bonus.replacementReward2.index.padStart(4, '0') + bonus.replacementReward1.index.padStart(4, '0')
					text += ' // Replacement Reward #2:' + bonus.replacementReward2.reward + ', Replacement Reward #1:' + bonus.replacementReward1.reward + '\n'
					if (bonus.isRewardsReplaced)
						worldRet += text
					else if (this.state.isHeavilyCommented)
						worldRet += '//' + text
				})
				if (worldRet !== '')
					ret += '// ' + world.world.toUpperCase() + '\n' + worldRet
			})
			return ret
		})
		bonusPnachCodes.unshift('\n//BONUS REWARDS\n')

		let levelPnachCodes = this.state.level.currentDisplayData.map(l => {
			let ret = ''
			let text = ''

			if (l.level === 99)
				ret += '// Cannot Level to 100 so experience is not changed\n'
			else {
				text += 'patch=1,EE,' + l.expAddress + ',extended,' + l.replacedEXP.toString(16).toUpperCase().padStart(8, '0')
				text += ' // Next level at ' + l.replacedEXP + ' experience\n'
				if (l.isEXPReplaced)
					ret += text
				else if (this.state.isHeavilyCommented)
					ret += '//' + text
			}
			text = ''

			text += 'patch=1,EE,' + l.statAddress + ',extended,'
			text += l.standardAP.toString(16).toUpperCase().padStart(2, '0') + l.defense.toString(16).toUpperCase().padStart(2, '0')
			text += l.magic.toString(16).toUpperCase().padStart(2, '0') + l.strength.toString(16).toUpperCase().padStart(2, '0')
			text += ' // AP:' + l.standardAP.toString() + ' Magic:' + l.magic.toString() + ' Defense:' + l.defense.toString() + ' Strength:' + l.strength.toString() + '\n'
			if (l.isStatsReplaced)
				ret += text
			else if (this.state.isHeavilyCommented)
				ret += '//' + text
			text = ''

			if (l.level === 1)
				ret += '// No Level 1 Dream Weapon Rewards\n'
			else {
				text += 'patch=1,EE,' + l.swordAddress + ',extended,0000' + l.replacementSwordReward.index + ' // Sword Reward: ' + l.replacementSwordReward.reward + '\n'
				if (l.isSwordReplaced)
					ret += text
				else if (this.state.isHeavilyCommented)
					ret += '//' + text
				text = ''

				text += 'patch=1,EE,' + l.shieldAddress + ',extended,0000' + l.replacementShieldReward.index + ' // Shield Reward: ' + l.replacementShieldReward.reward + '\n'
				if (l.isShieldReplaced)
					ret += text
				else if (this.state.isHeavilyCommented)
					ret += '//' + text
				text = ''

				text += 'patch=1,EE,' + l.staffAddress + ',extended,0000' + l.replacementStaffReward.index + ' // Staff Reward: ' + l.replacementStaffReward.reward + '\n'
				if (l.isStaffReplaced)
					ret += text
				else if (this.state.isHeavilyCommented)
					ret += '//' + text
			}
			if (ret !== '')
				ret = '// Level: ' + l.level + '\n' + ret
			return ret
		})
		levelPnachCodes.unshift('\n//LEVEL REWARDS\n')

		let magicCostPnachCodes = this.state.magicCost.allMagic.map(magicType => {
			let prefix = '// ' + magicType.magicType.toUpperCase() + '\n'
			let ret = ''
			let magicChangeCount = 0
			let lastAbility

			magicType.abilities.forEach(ability => {
				let text = 'patch=1,EE,' + ability.costAddress + ',extended,' + ability.replacementCost.toString(16).toUpperCase().padStart(8, '0')
				text += ' // ' + ability.ability + ' Cost: ' + ability.replacementCost + '\n'
				if (!ability.isReplaced) {
					if (this.state.isHeavilyCommented)
						ret += '//' + text
				} else {
					lastAbility = ability
					magicChangeCount++
					ret += text
				}
			})
			if (magicChangeCount > 0) {
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 3).toString(16).toUpperCase().padStart(2, '0') + 'FFFF,extended,1032BAE0 // If not on Title Screen\n'
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 2).toString(16).toUpperCase().padStart(2, '0') + '2002,extended,1032BAE0 // If not in Station of Serenity\n'
				prefix += 'patch=1,EE,E0' + (magicChangeCount + 1).toString(16).toUpperCase().padStart(2, '0') + '0000,extended,1032BAD8 // If not screen transition\n'
				prefix += 'patch=1,EE,E1' + magicChangeCount.toString(16).toUpperCase().padStart(2, '0') + '0000,extended,1'
				prefix += lastAbility.costAddress.slice(0, -1) + ' // If ' + lastAbility.ability + '\'s MP Cost is not ' + lastAbility.replacementCost + '\n'
			}
			return prefix + ret + '\n'
		})
		magicCostPnachCodes.unshift('\n//MAGIC COSTS\n')

		let criticalPnachCodes = this.state.critical.currentDisplayData.map(ce => {
			let ret = ''

			if (ce.isReplaced) {
				ret += 'patch=1,EE,' + ce.vanillaAddress + ',extended,0000' + ce.replacementReward.index.padStart(4, '0')
				ret += ' // ' + ce.vanillaReward.reward + ' is now ' + ce.replacementReward.reward + '\n'
			} else if (this.state.isHeavilyCommented) {
				ret += '//patch=1,EE,' + ce.vanillaAddress + ',extended,0000' + ce.replacementReward.index.padStart(4, '0')
				ret += ' // ' + ce.vanillaReward.reward + ' is still ' + ce.replacementReward.reward + '\n'
			}
			return ret
		})
		criticalPnachCodes.unshift('\n//CRITICAL EXTRAS\n')

		let startingCodes = ''
		let initialData = this.state.startingStatus.startingStatusData
		if (initialData.startingKeyblade.index !== "0029") {
			let keyblade = initialData.startingKeyblade
			startingCodes += initialData.keybladeCode.join('') + keyblade.index.padStart(4, '0') + ' // ' + keyblade.reward + '\n'
		} else
			startingCodes += '// Vanilla starting Keyblade of Kingdom Key\n'

		if (initialData.startingArmor.index !== "0000") {
			let armor = initialData.startingArmor
			startingCodes += initialData.armorCode.join('') + armor.index.padStart(4, '0') + ' // ' + armor.reward + '\n'
		} else
			startingCodes += '// Vanilla starting Armor of EMPTY\n'

		if (initialData.startingAccessory.index !== "0000") {
			let accessory = initialData.startingAccessory
			startingCodes += initialData.accessoryCode.join('') + accessory.index.padStart(4, '0') + ' // ' + accessory.reward + '\n'
		} else
			startingCodes += '// Vanilla starting Accessory of EMPTY\n'

		if (initialData.startingMunny !== 0) {
			startingCodes += initialData.munnyCode.join('') + initialData.startingMunny.toString(16).toUpperCase().padStart(8, '0')
			startingCodes += ' // ' + initialData.startingMunny + ' munny\n'
		} else
			startingCodes += '// Vanilla starting Munny of 0\n'

		if (initialData.startingHP !== 20) {
			let hp = initialData.startingHP
			startingCodes += initialData.hpCode.slice(0, 5).join('') + hp.toString(16).toUpperCase().padStart(2, '0') + ' // Max HP: ' + hp + '\n'
			startingCodes += initialData.hpCode[5] + hp.toString(16).toUpperCase().padStart(2, '0') + ' // Current HP: ' + hp + '\n'
		} else
			startingCodes += '// Vanilla starting HP of 20\n'

		if (initialData.startingMP !== 100) {
			let mp = initialData.startingMP
			startingCodes += initialData.mpCode.slice(0, 5).join('') + mp.toString(16).toUpperCase().padStart(2, '0') + ' // Max MP: ' + mp + '\n'
			startingCodes += initialData.mpCode[5] + mp.toString(16).toUpperCase().padStart(2, '0') + ' // Current MP: ' + mp + '\n'
		} else
			startingCodes += '// Vanilla starting MP of 100\n'

		startingCodes += initialData.donaldCode[0]
		if (initialData.startingDonald1.index !== "00A7") {
			let donaldAbility = initialData.startingDonald1
			startingCodes += initialData.donaldCode[1] + donaldAbility.index.padStart(4, '0') + ' // ' + donaldAbility.reward + '\n'
		} else
			startingCodes += '// Vanilla Donald Ability of Donald Thunder\n'
		if (initialData.startingDonald2.index !== "00A8") {
			let donaldAbility = initialData.startingDonald2
			startingCodes += initialData.donaldCode[2] + donaldAbility.index.padStart(4, '0') + ' // ' + donaldAbility.reward + '\n'
		} else
			startingCodes += '// Vanilla Donald Ability of Donald Cure\n'

		startingCodes += initialData.goofyCode[0]
		if (initialData.startingGoofy1.index !== "01AD") {
			let goofyAbility = initialData.startingGoofy1
			startingCodes += initialData.goofyCode[1] + goofyAbility.index.padStart(4, '0') + ' // ' + goofyAbility.reward + '\n'
		} else
			startingCodes += '// Vanilla Goofy Ability of Goofy Bash\n'
		if (initialData.startingGoofy2.index !== "019B") {
			let goofyAbility = initialData.startingGoofy2
			startingCodes += initialData.goofyCode[2] + goofyAbility.index.padStart(4, '0') + ' // ' + goofyAbility.reward + '\n'
		} else
			startingCodes += '// Vanilla Goofy Ability of Item Boost\n'
		let startingPnachCodes = ['\n//STARTING STATUS\n']
		startingPnachCodes.push(startingCodes)

		let cheatPnachCodes = this.state.cheat.currentDisplayData.filter(cheat => cheat.isActive).map(cheat => {
			let ret = '//' + cheat.name + '\n'
			ret += cheat.code.join('\n')
			ret += '\n'
			return ret
		})
		cheatPnachCodes.unshift('\n//CHEAT CODES\n')

		let pnachCodes = chestPnachCodes.concat(popupPnachCodes, formPnachCodes, equipmentPnachCodes, bonusPnachCodes, levelPnachCodes, magicCostPnachCodes, criticalPnachCodes, startingPnachCodes, cheatPnachCodes)
		pnachCodes.unshift(trackerPnachComments)

		const element = document.createElement('a')
		const file = new Blob(pnachCodes, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = 'F266B00B.pnach'
		document.body.appendChild(element)
		element.click()
	}

	handleSaveData() {
		let chestSaveData = this.state.chest.allChests.map(world => {
			let ret = ''
			world.chests.filter(chest => chest.isReplaced).forEach(chest => {
				ret += '{"replacementReward":{"reward":' + JSON.stringify(chest.replacementReward.reward)
				ret += ',"index":"' + chest.replacementReward.index + '"},'
				ret += '"vanillaAddress":"' + chest.vanillaAddress + '",'
				ret += '"isReplaced":' + chest.isReplaced + '},'
			})
			if (ret !== '') {
				ret = ret.slice(0, -1)
				ret = '{"world":' + JSON.stringify(world.world) + ',"chests":[' + ret + ']}'
			}
			return ret
		})
		chestSaveData = ['"chestsData":[', chestSaveData.filter(s => s !== '').join(), '],']

		let popupSaveData = this.state.popup.allPopups.map(world => {
			let ret = ''
			world.popups.filter(popup => popup.isReplaced).forEach(popup => {
				ret += '{"replacementReward":{"reward":' + JSON.stringify(popup.replacementReward.reward)
				ret += ',"index":"' + popup.replacementReward.index + '"},'
				ret += '"vanillaAddress":"' + popup.vanillaAddress + '",'
				ret += '"isReplaced":' + popup.isReplaced + ','
				ret += '"isAbility":' + popup.isAbility + '},'
			})
			if (ret !== '') {
				ret = ret.slice(0, -1)
				ret = '{"world":' + JSON.stringify(world.world) + ',"popups":[' + ret + ']}'
			}
			return ret
		})
		popupSaveData = ['"popupsData":[', popupSaveData.filter(s => s !== '').join(), '],']

		let bonusSaveData = this.state.bonus.allBonuses.map(character => {
			let characterRet = ''
			character.characterBonuses.forEach(world => {
				let ret = ''
				world.worldBonuses.filter(b => b.isStatsReplaced || b.isSlotsReplaced || b.isRewardsReplaced).forEach(bonus => {
					ret += '{"fight":' + JSON.stringify(bonus.fight) + ','
					ret += '"isStatsReplaced":' + bonus.isStatsReplaced + ','
					if (bonus.isStatsReplaced) {
						ret += '"hpIncrease":' + bonus.hpIncrease + ',"mpIncrease":' + bonus.mpIncrease + ','
					}
					ret += '"isSlotsReplaced":' + bonus.isSlotsReplaced + ','
					if (bonus.isSlotsReplaced) {
						ret += '"armorSlotIncrease":' + bonus.armorSlotIncrease + ',"accessorySlotIncrease":' + bonus.accessorySlotIncrease + ','
						ret += '"itemSlotIncrease":' + bonus.itemSlotIncrease + ',"driveGaugeIncrease":' + bonus.driveGaugeIncrease + ','
					}
					ret += '"isRewardsReplaced":' + bonus.isRewardsReplaced + ','
					if (bonus.isRewardsReplaced) {
						ret += '"replacementReward1":{"reward":' + JSON.stringify(bonus.replacementReward1.reward) + ',"index":"' + bonus.replacementReward1.index + '"},'
						ret += '"replacementReward2":{"reward":' + JSON.stringify(bonus.replacementReward2.reward) + ',"index":"' + bonus.replacementReward2.index + '"},'
					}
					ret = ret.slice(0, -1) + '},'
				})
				if (ret !== '') {
					ret = ret.slice(0, -1)
					ret = '{"world":' + JSON.stringify(world.world) + ',"worldBonuses":[' + ret + ']},'
				}
				characterRet += ret
			})
			if (characterRet !== '') {
				characterRet = characterRet.slice(0, -1)
				characterRet = '{"character":' + JSON.stringify(character.character) + ',"characterBonuses":[' + characterRet + ']},'
			}
			return characterRet.slice(0, -1)
		})
		bonusSaveData = ['"bonusData":[', bonusSaveData.filter(s => s !== '').join(), '],']

		let formSaveData = this.state.form.allForms.map(form => {
			let ret = ''
			form.driveLevels.filter(dl => (dl.isRewardReplaced || dl.isEXPReplaced)).forEach(driveLevel => {
				ret += '{"level":' + JSON.stringify(driveLevel.level) + ','
				ret += '"isRewardReplaced":' + driveLevel.isRewardReplaced + ','
				if (driveLevel.isRewardReplaced) {
					ret += '"replacementReward":{"reward":' + JSON.stringify(driveLevel.replacementReward.reward)
					ret += ',"index":"' + driveLevel.replacementReward.index + '"},'
				}
				ret += '"isEXPReplaced":' + driveLevel.isEXPReplaced + ','
				if (driveLevel.isEXPReplaced)
					ret += '"replacementEXP":' + driveLevel.replacementEXP + ','
				ret = ret.slice(0, -1) + '},'
			})
			if (ret !== '') {
				ret = ret.slice(0, -1)
				ret = '{"driveForm":' + JSON.stringify(form.driveForm) + ',"driveLevels":[' + ret + ']}'
			}
			return ret
		})
		formSaveData = ['"formsData":[', formSaveData.filter(s => s !== '').join(), '],']

		let equipmentSaveData = this.state.equipment.allEquipments.map(equipmentType => {
			let ret = ''
			equipmentType.equipments.filter(e => (e.isAbilityReplaced || e.isStatsReplaced
				|| e.isElementalResistanceChanged || e.isOtherResistanceChanged)).forEach(equipment => {
					ret += '{"name":' + JSON.stringify(equipment.name) + ','
					ret += '"isAbilityReplaced":' + equipment.isAbilityReplaced + ','
					if (equipment.isAbilityReplaced) {
						ret += '"replacementAbility":{"reward":' + JSON.stringify(equipment.replacementAbility.reward)
						ret += ',"index":"' + equipment.replacementAbility.index + '"},'
					}
					ret += '"isStatsReplaced":' + equipment.isStatsReplaced + ','
					if (equipment.isStatsReplaced) {
						ret += '"strength":' + equipment.strength + ',"magic":' + equipment.magic
						ret += ',"ap":' + equipment.ap + ',"defense":' + equipment.defense + ','
					}
					ret += '"isElementalResistanceChanged":' + equipment.isElementalResistanceChanged + ','
					if (equipment.isElementalResistanceChanged) {
						ret += '"fireResistance":' + equipment.fireResistance + ',"blizzardResistance":' + equipment.blizzardResistance
						ret += ',"thunderResistance":' + equipment.thunderResistance + ',"physicalResistance":' + equipment.physicalResistance + ','
					}
					ret += '"isOtherResistanceChanged":' + equipment.isOtherResistanceChanged + ','
					if (equipment.isOtherResistanceChanged) {
						ret += '"darkResistance":' + equipment.darkResistance + ',"lightResistance":' + equipment.lightResistance
						ret += ',"universalResistance":' + equipment.universalResistance + ','
					}
					ret = ret.slice(0, -1) + '},'
				})
			if (ret !== '') {
				ret = ret.slice(0, -1)
				ret = '{"equipmentType":' + JSON.stringify(equipmentType.equipmentType) + ',"equipments":[' + ret + ']}'
			}
			return ret
		})
		equipmentSaveData = ['"equipmentsData":[', equipmentSaveData.filter(s => s !== '').join(), '],']

		let levelSaveData = this.state.level.currentDisplayData.filter(l => (l.isEXPReplaced || l.isStatsReplaced || l.isSwordReplaced || l.isShieldReplaced || l.isStaffReplaced)).map(level => {
			let ret = '{"level":' + level.level + ','
			ret += '"isEXPReplaced":' + level.isEXPReplaced + ','
			if (level.isEXPReplaced) {
				ret += '"replacedEXP":' + level.replacedEXP + ','
			}
			ret += '"isStatsReplaced":' + level.isStatsReplaced + ','
			if (level.isStatsReplaced) {
				ret += '"standardAP":' + level.standardAP + ','
				ret += '"defense":' + level.defense + ','
				ret += '"magic":' + level.magic + ','
				ret += '"strength":' + level.strength + ','
			}
			ret += '"isSwordReplaced":' + level.isSwordReplaced + ','
			if (level.isSwordReplaced) {
				ret += '"replacementSwordReward":{'
				ret += '"reward":' + JSON.stringify(level.replacementSwordReward.reward) + ','
				ret += '"index":"' + level.replacementSwordReward.index + '"},'
			}
			ret += '"isShieldReplaced":' + level.isShieldReplaced + ','
			if (level.isShieldReplaced) {
				ret += '"replacementShieldReward":{'
				ret += '"reward":' + JSON.stringify(level.replacementShieldReward.reward) + ','
				ret += '"index":"' + level.replacementShieldReward.index + '"},'
			}
			ret += '"isStaffReplaced":' + level.isStaffReplaced + ','
			if (level.isStaffReplaced) {
				ret += '"replacementStaffReward":{'
				ret += '"reward":' + JSON.stringify(level.replacementStaffReward.reward) + ','
				ret += '"index":"' + level.replacementStaffReward.index + '"},'
			}
			return ret.slice(0, -1) + '},'
		})
		levelSaveData = ['"levelsData":[', levelSaveData.join('').slice(0, -1), '],']

		let magicCostSaveData = this.state.magicCost.allMagic.map(magicType => {
			let ret = ''
			magicType.abilities.filter(ability => ability.isReplaced).forEach(ability => {
				ret += '{"ability":' + JSON.stringify(ability.ability)
				ret += ',"replacementCost":' + ability.replacementCost
				ret += ',"isReplaced":' + ability.isReplaced + '},'
			})
			if (ret !== '') {
				ret = ret.slice(0, -1)
				ret = '{"magicType":' + JSON.stringify(magicType.magicType) + ',"abilities":[' + ret + ']}'
			}
			return ret
		})
		magicCostSaveData = ['"magicData":[', magicCostSaveData.filter(s => s !== '').join(), '],']

		let criticalSaveData = this.state.critical.currentDisplayData.filter(critical => critical.isReplaced).map(critical => {
			let ret = '{"replacementReward":{"reward":' + JSON.stringify(critical.replacementReward.reward)
			ret += ',"index":"' + critical.replacementReward.index + '"},'
			ret += '"vanillaAddress":"' + critical.vanillaAddress + '",'
			ret += '"isReplaced":' + critical.isReplaced + '},'
			return ret
		})
		criticalSaveData = ['"criticalsData":[', criticalSaveData.join('').slice(0, -1), '],']

		let cheatSaveData = this.state.cheat.currentDisplayData.filter(cheat => cheat.isActive).map(cheat => {
			return '{"name":' + JSON.stringify(cheat.name) + ',"isActive":' + cheat.isActive + '},'
		})
		cheatSaveData = ['"cheatsData":[', cheatSaveData.join('').slice(0, -1), '],']

		let startingStatus = this.state.startingStatus.startingStatusData
		let startingStatusSaveData = '"startingStatusData":{'
		startingStatusSaveData += '"startingKeyblade": {"reward": "' + startingStatus.startingKeyblade.reward + '","index": "' + startingStatus.startingKeyblade.index + '"},'
		startingStatusSaveData += '"startingArmor": {"reward": "' + startingStatus.startingArmor.reward + '","index": "' + startingStatus.startingArmor.index + '"},'
		startingStatusSaveData += '"startingAccessory": {"reward": "' + startingStatus.startingAccessory.reward + '","index": "' + startingStatus.startingAccessory.index + '"},'
		startingStatusSaveData += '"startingDonald1": {"reward": "' + startingStatus.startingDonald1.reward + '","index": "' + startingStatus.startingDonald1.index + '"},'
		startingStatusSaveData += '"startingDonald2": {"reward": "' + startingStatus.startingDonald2.reward + '","index": "' + startingStatus.startingDonald2.index + '"},'
		startingStatusSaveData += '"startingGoofy1": {"reward": "' + startingStatus.startingGoofy1.reward + '","index": "' + startingStatus.startingGoofy1.index + '"},'
		startingStatusSaveData += '"startingGoofy2": {"reward": "' + startingStatus.startingGoofy2.reward + '","index": "' + startingStatus.startingGoofy2.index + '"},'
		startingStatusSaveData += '"startingMunny":' + startingStatus.startingMunny + ',"startingHP":' + startingStatus.startingHP + ',"startingMP":' + startingStatus.startingMP
		startingStatusSaveData += '},'

		let tracker = this.state.tracker
		let trackerData = '"trackerData":{'
		trackerData += '"fire":' + tracker.fire + ',"blizzard":' + tracker.blizzard + ',"thunder":' + tracker.thunder + ',"cure":' + tracker.cure
		trackerData += ',"reflect":' + tracker.reflect + ',"magnet":' + tracker.magnet + ',"pages":' + tracker.pages
		trackerData += ',"proofs":[' + tracker.proofs.toString() + ']'
		trackerData += ',"reports":[' + tracker.reports.toString() + ']'
		trackerData += ',"drives":[' + tracker.drives.toString() + ']'
		trackerData += ',"summons":[' + tracker.summons.toString() + ']},'

		let saveData = ['{',
			chestSaveData.join(''),
			popupSaveData.join(''),
			bonusSaveData.join(''),
			formSaveData.join(''),
			equipmentSaveData.join(''),
			levelSaveData.join(''),
			magicCostSaveData.join(''),
			criticalSaveData.join(''),
			startingStatusSaveData,
			trackerData,
			cheatSaveData.join('').slice(0, -1),
			'}']

		const element = document.createElement("a")
		const file = new Blob(saveData, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = "saveData.json"
		document.body.appendChild(element)
		element.click()
	}

	onFileUpload(event) {
		let file = event.target.files[0]
		let reader = new FileReader()
		reader.readAsText(file)
		reader.onload = this.loadHandler
	}

	loadHandler(event) {
		this.handleLoadData(event.target.result)
	}

	handleLoadData(loadData) {
		let allLoadData = JSON.parse(loadData)
		let globalIndex = 0

		let chestSaveData = (allLoadData.hasOwnProperty('chestsData') ? allLoadData.chestsData : [])
		let chestLoadData = chestsData.map(world => {
			let newWorld = { ...world }
			if (globalIndex < chestSaveData.length) {
				if (chestSaveData[globalIndex].world === newWorld.world) {
					let chestIndex = 0
					let newChests = newWorld.chests.map(chest => {
						let newChest = { ...chest }
						if (chestIndex < chestSaveData[globalIndex].chests.length) {
							if (chestSaveData[globalIndex].chests[chestIndex].vanillaAddress === newChest.vanillaAddress) {
								_.merge(newChest, chestSaveData[globalIndex].chests[chestIndex])
								chestIndex++
							}
						}
						return newChest
					})
					newWorld.chests = newChests
					globalIndex++
				}
			}
			return newWorld
		})
		globalIndex = 0

		let popupSaveData = (allLoadData.hasOwnProperty('popupsData') ? allLoadData.popupsData : [])
		let popupLoadData = popupsData.map(world => {
			let newWorld = { ...world }
			if (globalIndex < popupSaveData.length) {
				if (popupSaveData[globalIndex].world === newWorld.world) {
					let popupIndex = 0
					let newPopups = newWorld.popups.map(popup => {
						let newPopup = { ...popup }
						if (popupIndex < popupSaveData[globalIndex].popups.length) {
							if (popupSaveData[globalIndex].popups[popupIndex].vanillaAddress === newPopup.vanillaAddress) {
								_.merge(newPopup, popupSaveData[globalIndex].popups[popupIndex])
								popupIndex++
							}
						}
						return newPopup
					})
					newWorld.popups = newPopups
					globalIndex++
				}
			}
			return newWorld
		})
		globalIndex = 0

		let bonusSaveData = (allLoadData.hasOwnProperty('bonusData') ? allLoadData.bonusData : [])
		let bonusLoadData = bonusData.map(character => {
			let newCharacter = { ...character }
			if (globalIndex < bonusSaveData.length) {
				if (bonusSaveData[globalIndex].character === newCharacter.character) {
					let worldIndex = 0
					let newWorlds = newCharacter.characterBonuses.map(world => {
						let newWorld = { ...world }
						if (worldIndex < bonusSaveData[globalIndex].characterBonuses.length) {
							if (bonusSaveData[globalIndex].characterBonuses[worldIndex].world === newWorld.world) {
								let bonusIndex = 0
								let newBonuses = newWorld.worldBonuses.map(bonus => {
									let newBonus = { ...bonus }
									if (bonusIndex < bonusSaveData[globalIndex].characterBonuses[worldIndex].worldBonuses.length) {
										if (bonusSaveData[globalIndex].characterBonuses[worldIndex].worldBonuses[bonusIndex].fight === newBonus.fight) {
											_.merge(newBonus, bonusSaveData[globalIndex].characterBonuses[worldIndex].worldBonuses[bonusIndex])
											bonusIndex++
										}
									}
									return newBonus
								})
								worldIndex++
								newWorld.worldBonuses = newBonuses
							}
						}
						return newWorld
					})
					globalIndex++
					newCharacter.characterBonuses = newWorlds
				}
			}
			return newCharacter
		})
		globalIndex = 0

		let formSaveData = (allLoadData.hasOwnProperty('formsData') ? allLoadData.formsData : [])
		let formLoadData = formsData.map(form => {
			let newForm = { ...form }
			if (globalIndex < formSaveData.length) {
				if (formSaveData[globalIndex].driveForm === newForm.driveForm) {
					let driveLevelIndex = 0
					let newDriveLevels = newForm.driveLevels.map(driveLevel => {
						let newDriveLevel = { ...driveLevel }
						if (driveLevelIndex < formSaveData[globalIndex].driveLevels.length) {
							if (formSaveData[globalIndex].driveLevels[driveLevelIndex].level === newDriveLevel.level) {
								_.merge(newDriveLevel, formSaveData[globalIndex].driveLevels[driveLevelIndex])
								driveLevelIndex++
							}
						}
						return newDriveLevel
					})
					newForm.driveLevels = newDriveLevels
					globalIndex++
				}
			}
			return newForm
		})
		globalIndex = 0

		let equipmentSaveData = (allLoadData.hasOwnProperty('equipmentsData') ? allLoadData.equipmentsData : [])
		let equipmentLoadData = equipmentsData.map(equipmentType => {
			let newEquipmentType = { ...equipmentType }
			if (globalIndex < equipmentSaveData.length) {
				if (equipmentSaveData[globalIndex].equipmentType === newEquipmentType.equipmentType) {
					let equipmentIndex = 0
					let newEquipments = newEquipmentType.equipments.map(equipment => {
						let newEquipment = { ...equipment }
						if (equipmentIndex < equipmentSaveData[globalIndex].equipments.length) {
							if (equipmentSaveData[globalIndex].equipments[equipmentIndex].name === newEquipment.name) {
								_.merge(newEquipment, equipmentSaveData[globalIndex].equipments[equipmentIndex])
								equipmentIndex++
							}
						}
						return newEquipment
					})
					newEquipmentType.equipments = newEquipments
					globalIndex++
				}
			}
			return newEquipmentType
		})
		globalIndex = 0

		let levelSaveData = (allLoadData.hasOwnProperty('levelsData') ? allLoadData.levelsData : [])
		let levelLoadData = levelsData.map(level => {
			let newLevel = { ...level }
			if (globalIndex < levelSaveData.length) {
				if (newLevel.level === levelSaveData[globalIndex].level) {
					_.merge(newLevel, levelSaveData[globalIndex])
					globalIndex++
				}
			}
			return newLevel
		})
		globalIndex = 0

		let magicSaveData = (allLoadData.hasOwnProperty('magicData') ? allLoadData.magicData : [])
		let magicLoadData = magicData.map(magicType => {
			let newMagicType = { ...magicType }
			if (globalIndex < magicSaveData.length) {
				if (magicSaveData[globalIndex].magicType === newMagicType.magicType) {
					let abilityIndex = 0
					let newAbilities = newMagicType.abilities.map(ability => {
						let newAbility = { ...ability }
						if (abilityIndex < magicSaveData[globalIndex].abilities.length) {
							if (magicSaveData[globalIndex].abilities[abilityIndex].ability === newAbility.ability) {
								_.merge(newAbility, magicSaveData[globalIndex].abilities[abilityIndex])
								abilityIndex++
							}
						}
						return newAbility
					})
					globalIndex++
					newMagicType.abilities = newAbilities
				}
			}
			return newMagicType
		})
		globalIndex = 0

		let criticalSaveData = (allLoadData.hasOwnProperty('criticalsData') ? allLoadData.criticalsData : [])
		let criticalLoadData = criticalData.map(critExtra => {
			let newCritExtra = { ...critExtra }
			if (globalIndex < criticalSaveData.length) {
				if (newCritExtra.vanillaAddress === criticalSaveData[globalIndex].vanillaAddress) {
					_.merge(newCritExtra, criticalSaveData[globalIndex])
					globalIndex++
				}
			}
			return newCritExtra
		})
		globalIndex = 0

		let cheatSaveData = (allLoadData.hasOwnProperty('cheatsData') ? allLoadData.cheatsData : [])
		let cheatLoadData = cheatsData.map(cheat => {
			let newCheat = { ...cheat }
			if (globalIndex < cheatSaveData.length) {
				if (cheat.name === cheatSaveData[globalIndex].name) {
					_.merge(newCheat, cheatSaveData[globalIndex])
					globalIndex++
				}
			}
			return newCheat
		})

		let startingStatusLoadData = {
			startingKeyblade: {
				reward: "Kingdom Key",
				index: "0029"
			},
			startingArmor: {
				reward: "EMPTY",
				index: "0000"
			},
			startingAccessory: {
				reward: "EMPTY",
				index: "0000"
			},
			startingMunny: 0,
			startingHP: 20,
			startingMP: 100,
			startingDonald1: {
				reward: "Donald Thunder",
				index: "00A7"
			},
			startingDonald2: {
				reward: "Donald Cure",
				index: "00A8"
			},
			startingGoofy1: {
				reward: "Goofy Bash",
				index: "01AD"
			},
			startingGoofy2: {
				reward: "Item Boost",
				index: "019B"
			}
		}
		if (allLoadData.hasOwnProperty('startingStatusData'))
			_.merge(startingStatusLoadData, allLoadData.startingStatusData)
		startingStatusLoadData.keybladeCode = startingStatusData.keybladeCode
		startingStatusLoadData.armorCode = startingStatusData.armorCode
		startingStatusLoadData.accessoryCode = startingStatusData.accessoryCode
		startingStatusLoadData.munnyCode = startingStatusData.munnyCode
		startingStatusLoadData.hpCode = startingStatusData.hpCode
		startingStatusLoadData.mpCode = startingStatusData.mpCode
		startingStatusLoadData.donaldCode = startingStatusData.donaldCode
		startingStatusLoadData.goofyCode = startingStatusData.goofyCode

		let trackerLoadData = {
			fire: 3,
			blizzard: 3,
			thunder: 3,
			cure: 3,
			reflect: 3,
			magnet: 3,
			pages: 5,
			proofs: [1, 1, 1],
			reports: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			drives: [1, 1, 1, 1, 1],
			summons: [1, 1, 1, 1]
		}
		if (allLoadData.hasOwnProperty('trackerData'))
			_.merge(trackerLoadData, allLoadData.trackerData)

		this.setState(prevState => ({
			chest: {
				...prevState.chest,
				allChests: chestLoadData.slice(),
				currentDisplayData: chestLoadData[this.state.chest.currentWorld].chests.slice()
			},
			popup: {
				...prevState.popup,
				allPopups: popupLoadData.slice(),
				currentDisplayData: popupLoadData[this.state.popup.currentWorld].popups.slice()
			},
			form: {
				...prevState.form,
				allForms: formLoadData.slice(),
				currentDisplayData: formLoadData[this.state.form.currentDriveForm].driveLevels.slice()
			},
			equipment: {
				...prevState.equipment,
				allEquipments: equipmentLoadData.slice(),
				currentDisplayData: equipmentLoadData[this.state.equipment.currentEquipmentType].equipments.slice()
			},
			bonus: {
				...prevState.bonus,
				allBonuses: bonusLoadData.slice(),
				currentDisplayData: bonusLoadData[this.state.bonus.currentCharacter].characterBonuses[this.state.bonus.currentWorld].worldBonuses.slice()
			},
			level: {
				...prevState.level,
				currentDisplayData: levelLoadData.slice()
			},
			critical: {
				...prevState.critical,
				currentDisplayData: criticalLoadData.slice()
			},
			cheat: {
				...prevState.cheat,
				currentDisplayData: cheatLoadData.slice()
			},
			startingStatus: {
				...prevState.startingStatus,
				startingStatusData: _.cloneDeep(startingStatusLoadData)
			},
			magicCost: {
				...prevState.magicCost,
				allMagic: magicLoadData.slice(),
				currentDisplayData: magicLoadData[this.state.magicCost.currentMagicType].abilities.slice()
			},
			tracker: _.clone(trackerLoadData)
		}))
	}
	//#endregion

	render() {
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
						<HomePage
						/>
					</Tab>
					<Tab eventKey="chest" title="Chest">
						<ChestPage
							style={styles}
							chestData={this.state.chest}
							rewardList={rewardsData[this.state.chest.currentRewardType].rewards}
							handleWorldChange={this.handleChestWorldChange}
							onRewardTypeChange={(event) => this.handleRewardTypeChange('chest', event)}
							onRewardChange={(event) => this.handleGenericChange('chest', event)}
							onRowCheck={(event) => this.onRowCheck('chest', event)}
							checkAll={(event) => this.checkAll('chest', event)}
							onClick={this.handleChestReplace}
						/>
					</Tab>
					<Tab eventKey="popup" title="Popup">
						<PopupPage
							style={styles}
							popupData={this.state.popup}
							rewardList={rewardsData[this.state.popup.currentRewardType].rewards}
							handleWorldChange={this.handlePopupWorldChange}
							onRewardTypeChange={(event) => this.handleRewardTypeChange('popup', event)}
							onRewardChange={(event) => this.handleGenericChange('popup', event)}
							onRowCheck={(event) => this.onRowCheck('popup', event)}
							checkAll={(event) => this.checkAll('popup', event)}
							onClick={this.handlePopupReplace}
						/>
					</Tab>
					<Tab eventKey="bonus" title="Bonus">
						<BonusPage
							style={styles}
							bonusData={this.state.bonus}
							rewardListA={rewardsData[this.state.bonus.currentARewardType].rewards}
							rewardListB={rewardsData[this.state.bonus.currentBRewardType].rewards}
							handleWorldChange={this.handleBonusWorldChange}
							handleCharacterChange={this.handleBonusCharacterChange}
							onRewardTypeChange={(event) => this.handleRewardTypeChange('bonus', event)}
							onRewardChange={(event) => this.handleGenericChange('bonus', event)}
							onInputChange={(event) => this.handleInputChange('bonus', event)}
							onRowCheck={(event) => this.onRowCheck('bonus', event)}
							checkAll={(event) => this.checkAll('bonus', event)}
							onClick={this.handleBonusReplace}
						/>
					</Tab>
					<Tab eventKey="form" title="Forms & Summons">
						<FormPage
							style={styles}
							formData={this.state.form}
							rewardList={rewardsData[this.state.form.currentRewardType].rewards}
							handleFormChange={this.handleFormChange}
							onRewardTypeChange={(event) => this.handleRewardTypeChange('form', event)}
							onGenericChange={(event) => this.handleGenericChange('form', event)}
							onInputChange={(event) => this.handleInputChange('form', event)}
							onRowCheck={(event) => this.onRowCheck('form', event)}
							checkAll={(event) => this.checkAll('form', event)}
							onClick={this.handleFormReplace}

						/>
					</Tab>
					<Tab eventKey="equipment" title="Equipment">
						<EquipmentPage
							style={styles}
							equipmentData={this.state.equipment}
							rewardList={rewardsData[this.state.equipment.currentRewardType].rewards}
							handleEquipmentTypeChange={this.handleEquipmentTypeChange}
							onRewardTypeChange={(event) => this.handleRewardTypeChange('equipment', event)}
							onRewardChange={(event) => this.handleGenericChange('equipment', event)}
							onInputChange={(event) => this.handleInputChange('equipment', event)}
							onRowCheck={(event) => this.onRowCheck('equipment', event)}
							checkAll={(event) => this.checkAll('equipment', event)}
							onClick={this.handleEquipmentReplace}
						/>
					</Tab>
					<Tab eventKey="level" title="Level">
						<LevelPage
							style={styles}
							levelData={this.state.level}
							swordRewardList={rewardsData[this.state.level.currentSwordRewardType].rewards}
							shieldRewardList={rewardsData[this.state.level.currentShieldRewardType].rewards}
							staffRewardList={rewardsData[this.state.level.currentStaffRewardType].rewards}
							onRewardTypeChange={(event) => this.handleRewardTypeChange('level', event)}
							onGenericChange={(event) => this.handleGenericChange('level', event)}
							onInputChange={(event) => this.handleInputChange('level', event)}
							onRowCheck={(event) => this.onRowCheck('level', event)}
							checkAll={(event) => this.checkAll('level', event)}
							onClick={this.handleLevelReplace}
						/>
					</Tab>
					<Tab eventKey="magic" title="Magic & Limits">
						<MagicPage
							style={styles}
							magicData={this.state.magicCost}
							handleMagicTypeChange={this.handleMagicTypeChange}
							onInputChange={(event) => this.handleInputChange('magicCost', event)}
							onRowCheck={(event) => this.onRowCheck('magicCost', event)}
							checkAll={(event) => this.checkAll('magicCost', event)}
							onClick={this.handleMagicReplace}
						/>
					</Tab>
					<Tab eventKey="critical" title="Critical Extra">
						<CriticalPage
							style={styles}
							criticalData={this.state.critical}
							rewardList={rewardsData[this.state.critical.currentRewardType].rewards}
							onRewardTypeChange={(event) => this.handleRewardTypeChange('critical', event)}
							onRewardChange={(event) => this.handleGenericChange('critical', event)}
							onRowCheck={(event) => this.onRowCheck('critical', event)}
							checkAll={(event) => this.checkAll('critical', event)}
							onClick={this.handleCriticalReplace}
						/>
					</Tab>
					<Tab eventKey="cheat" title="Cheat">
						<CheatPage
							style={styles}
							cheatData={this.state.cheat}
							onRowCheck={(event) => this.onRowCheck('cheat', event)}
							checkAll={(event) => this.checkAll('cheat', event)}
							onClick={this.handleCheatReplace}
						/>
					</Tab>
					<Tab eventKey="startingStatus" title="Starting Status">
						<StartingPage
							style={styles}
							startingStatusData={this.state.startingStatus}
							keybladeList={rewardsData[7].rewards}
							armorList={rewardsData[17].rewards.concat(rewardsData[2].rewards)}
							accessoryList={rewardsData[17].rewards.concat(rewardsData[1].rewards)}
							donaldList={rewardsData[17].rewards.concat(rewardsData[0].rewards)}
							goofyList={rewardsData[17].rewards.concat(rewardsData[0].rewards)}
							onRewardChange={(event) => this.handleGenericChange('startingStatus', event)}
							onInputChange={(event) => this.handleInputChange('startingStatus', event)}
							onClick={this.handleStartingStatusReplace}
						/>
					</Tab>
				</Tabs>
				<Form.Check
					type={'checkbox'}
					id={'commentCheckBox'}
					label={'Include Thorough Comments?'}
					checked={this.state.isHeavilyCommented}
					onChange={this.onCommentCheck}
				/>
				<Button variant='outline-dark'
					name='saveButton'
					onClick={this.handleSave}
				>
					SAVE
				</Button>
				{' '}
				<Button variant='outline-dark'
					name='saveDataButton'
					onClick={this.handleSaveData}
				>
					SAVE DATA
				</Button>
				{' '}
				<input type="file" onChange={this.onFileUpload} />
			</div>
		)
	}
}

export default App