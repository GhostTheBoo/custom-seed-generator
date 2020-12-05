import React from 'react'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { worldsData, formTypesData, equipmentTypesData, charactersData } from './Data/typesData'
import rewardsData from './Data/rewardsData'

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
import cheatData from './Data/cheatData'

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
				currentHP: 0,
				currentMP: 0,
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
				currentCharacter: 0,
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
				currentDisplayData: cheatData.slice()
			}
		}

		this.handleChestWorldChange = this.handleChestWorldChange.bind(this)
		this.handlePopupWorldChange = this.handlePopupWorldChange.bind(this)
		this.handleBonusWorldChange = this.handleBonusWorldChange.bind(this)
		this.handleFormChange = this.handleFormChange.bind(this)
		this.handleEquipmentTypeChange = this.handleEquipmentTypeChange.bind(this)
		this.handleBonusCharacterChange = this.handleBonusCharacterChange.bind(this)

		this.handleChestReplace = this.handleChestReplace.bind(this)
		this.handlePopupReplace = this.handlePopupReplace.bind(this)
		this.handleFormReplace = this.handleFormReplace.bind(this)
		this.handleEquipmentReplace = this.handleEquipmentReplace.bind(this)
		this.handleBonusReplace = this.handleBonusReplace.bind(this)
		this.handleLevelReplace = this.handleLevelReplace.bind(this)
		this.handleCriticalReplace = this.handleCriticalReplace.bind(this)
		this.handleCheatReplace = this.handleCheatReplace.bind(this)

		this.handleRewardTypeChange = this.handleRewardTypeChange.bind(this)
		this.handleGenericChange = this.handleGenericChange.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.onRowCheck = this.onRowCheck.bind(this)
		this.checkAll = this.checkAll.bind(this)
		this.handleSave = this.handleSave.bind(this)
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
						if (reward.index === chest.vanillaReward.index) {
							chest.isReplaced = false
							chest.replacementReward = chest.vanillaReward
						} else {
							chest.isReplaced = true
							chest.replacementReward = reward
						}
					}
				}
				return chest
			})
		} else {
			replacedChests = this.state.chest.currentDisplayData.map(chest => {
				if (chest.toBeReplaced) {
					chest.toBeReplaced = false
					chest.isReplaced = false
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
					if (this.state.popup.currentRewardType === 0 || this.state.popup.currentRewardType === 4)
						popup.isAbility = true
					else
						popup.isAbility = false

					if (reward.index !== popup.replacementReward.index) {
						if (reward.index === popup.vanillaReward.index) {
							popup.isReplaced = false
							popup.replacementReward = popup.vanillaReward
						} else {
							popup.isReplaced = true
							popup.replacementReward = reward
						}
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
						if (reward.index === driveFormLevel.vanillaReward.index) {
							driveFormLevel.isRewardReplaced = false
							driveFormLevel.replacementReward = driveFormLevel.vanillaReward
						} else {
							driveFormLevel.isRewardReplaced = true
							driveFormLevel.replacementReward = reward
						}
					}

					if (this.state.form.currentEXPMultiplierValue === 0)
						driveFormLevel.replacementEXP = this.state.form.currentEXP
					else
						driveFormLevel.replacementEXP = Math.floor((2 * driveFormLevel.vanillaEXP) / this.state.form.currentEXPMultiplierValue)

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

					bonus.replacementReward1 = rewardA
					bonus.replacementReward2 = rewardB

					if (bonus.replacementReward1.index !== bonus.vanillaReward1.index || bonus.replacementReward2.index !== bonus.vanillaReward2.index)
						bonus.isRewardsReplaced = true

					bonus.hpIncrease = this.state.bonus.currentHP
					bonus.mpIncrease = this.state.bonus.currentMP

					if (bonus.hpIncrease !== bonus.vanillaHpIncrease || bonus.mpIncrease !== bonus.vanillaMpIncrease)
						bonus.isStatsReplaced = true

					bonus.armorSlotIncrease = this.state.bonus.currentArmor
					bonus.accessorySlotIncrease = this.state.bonus.currentAccessory
					bonus.itemSlotIncrease = this.state.bonus.currentItem
					bonus.driveGaugeIncrease = this.state.bonus.currentDrive

					if (bonus.armorSlotIncrease !== bonus.vanillaArmorSlotIncrease || bonus.accessorySlotIncrease !== bonus.vanillaAccessorySlotIncrease ||
						bonus.itemSlotIncrease !== bonus.vanillaItemSlotIncrease || bonus.driveGaugeIncrease !== bonus.vanillaDriveGaugeIncrease)
						bonus.isSlotsReplaced = true
				}
			} else {
				if (bonus.toBeReplaced) {
					bonus.toBeReplaced = false

					bonus.replacementReward1 = bonus.vanillaReward1
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
				currentDisplayDataes: replacedBonuses
			}
		}))
	}

	handleLevelReplace(event) {
		let replacedLevels = this.state.level.currentDisplayData.map(l => {
			if (event.target.name === 'replaceButton') {
				if (l.toBeReplaced) {
					l.toBeReplaced = false

					let reward = rewardsData[this.state.level.currentSwordRewardType].rewards[this.state.level.currentSwordReward]
					l.replacementSwordReward = reward
					if (l.replacementSwordReward.index !== l.vanillaSwordReward.index)
						l.isSwordReplaced = true

					reward = rewardsData[this.state.level.currentShieldRewardType].rewards[this.state.level.currentShieldReward]
					l.replacementShieldReward = reward
					if (l.replacementShieldReward.index !== l.vanillaShieldReward.index)
						l.isShieldReplaced = true

					reward = rewardsData[this.state.level.currentStaffRewardType].rewards[this.state.level.currentStaffReward]
					l.replacementStaffReward = reward
					if (l.replacementStaffReward.index !== l.vanillaStaffReward.index)
						l.isStaffReplaced = true

					l.standardAP = this.state.level.currentLevelAP
					l.criticalAP = Math.floor(((this.state.level.currentLevelAP - 2) * 1.5) + 50)
					l.defense = this.state.level.currentLevelDefense
					l.magic = this.state.level.currentLevelMagic
					l.strength = this.state.level.currentLevelStrength

					if (l.standardAP !== l.vanillaAP || l.defense !== l.vanillaDefense || l.magic !== l.vanillaMagic || l.strength !== l.vanillaStrength)
						l.isStatsReplaced = true

					if (this.state.level.currentEXPMultiplierValue === 0)
						l.replacedEXP = this.state.level.currentEXP
					else
						l.replacedEXP = Math.floor((2 * l.vanillaEXP) / this.state.level.currentEXPMultiplierValue)

					if (l.replacedEXP !== l.vanillaEXP)
						l.isEXPReplaced = true
					else
						l.isEXPReplaced = false
				}
			} else {
				if (l.toBeReplaced) {
					l.toBeReplaced = false

					l.replacementSwordReward = l.vanillaSwordReward
					l.isSwordReplaced = false

					l.replacementShieldReward = l.vanillaShieldReward
					l.isShieldReplaced = false

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

	handleCriticalReplace(event) {
		let replacedCriticalExtras
		if (event.target.name === 'replaceButton') {
			replacedCriticalExtras = this.state.critical.currentDisplayData.map(ce => {
				if (ce.toBeReplaced) {
					let reward = rewardsData[this.state.critical.currentRewardType].rewards[this.state.critical.currentReward]
					ce.toBeReplaced = false

					if (reward.index !== ce.replacementReward.index) {
						if (reward.index === ce.vanillaReward.index) {
							ce.isReplaced = false
							ce.replacementReward = ce.vanillaReward
						} else {
							ce.isReplaced = true
							ce.replacementReward = reward
						}
					}
				}
				return ce
			})
		} else {
			replacedCriticalExtras = this.state.critical.currentDisplayData.map(ce => {
				if (ce.toBeReplaced) {
					ce.toBeReplaced = false
					ce.isReplaced = false
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
	//#endregion

	//#region General Functions
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

	handleSave() {
		let chestPnachCodes = this.state.chest.allChests.map(worldList => {
			let ret = '// ' + worldList.world + '\n'
			let text
			worldList.chests.forEach(chest => {
				if (!chest.isReplaced) {
					ret += '//'
					text = ' is still '
				} else
					text = ' is now '

				ret += 'patch=1,EE,' + chest.vanillaAddress + ',extended,0000' + chest.replacementReward.index.padStart(4, '0')
				ret += ' // ' + chest.room + ', ' + chest.vanillaReward.reward + text + chest.replacementReward.reward + '\n'
			})
			return ret
		})

		let popupPnachCodes = this.state.popup.allPopups.map(worldList => {
			let ret = '// ' + worldList.world + '\n'
			let text
			worldList.popups.forEach(popup => {
				if (!popup.isReplaced) {
					ret += '//'
					text = ' is still '
				} else
					text = ' is now '

				ret += 'patch=1,EE,' + popup.vanillaAddress + ',extended,0000' + popup.replacementReward.index.padStart(4, '0')
				ret += ' // ' + popup.popup + ', ' + popup.vanillaReward.reward + text + popup.replacementReward.reward + '\n'
			})
			return ret
		})

		let formPnachCodes = this.state.form.allForms.map(driveFormList => {
			let ret = '// ' + driveFormList.driveForm + '\n'
			let text
			if (driveFormList.driveLevels.some(driveFormLevel => driveFormLevel.isRewardReplaced))
				ret += driveFormList.removeGrowthJankCodes.join('')

			driveFormList.driveLevels.forEach(driveFormLevel => {
				if (!driveFormLevel.isRewardReplaced) {
					ret += '//'
					text = ' is still '
				} else
					text = ' is now '

				ret += 'patch=1,EE,' + driveFormLevel.vanillaAddress + ',extended,0000' + driveFormLevel.replacementReward.index.padStart(4, '0')
				ret += ' // ' + driveFormLevel.level + ', ' + driveFormLevel.vanillaReward.reward + text + driveFormLevel.replacementReward.reward + '\n'

				if (!driveFormLevel.isEXPReplaced) {
					ret += '//'
					text = ' is still '
				} else
					text = ' is '

				ret += 'patch=1,EE,' + driveFormLevel.EXPAddress + ',extended,' + driveFormLevel.replacementEXP.toString(16).toUpperCase().padStart(8, 0)
				ret += ' // ' + driveFormLevel.replacementEXP + ' experience' + text + 'required to reach ' + driveFormLevel.level + '\n'
			})
			return ret
		})

		let equipmentPnachCodes = this.state.equipment.allEquipments.map(equipment => {
			let ret = '// ' + equipment.equipmentType + '\n'

			equipment.equipments.forEach(eq => {
				ret += '// ' + eq.name + '\n'

				if (!eq.isAbilityReplaced)
					ret += '//'
				ret += 'patch=1,EE,' + eq.abilityAddress + ',extended,0000' + eq.replacementAbility.index.padStart(4, '0') + ' // Ability: ' + eq.replacementAbility.reward + '\n'

				if (!eq.isStatsReplaced)
					ret += '//'
				ret += 'patch=1,EE,' + eq.statAddress + ',extended,'
				ret += eq.ap.toString(16).toUpperCase().padStart(2, '0') + eq.defense.toString(16).toUpperCase().padStart(2, '0')
				ret += eq.magic.toString(16).toUpperCase().padStart(2, '0') + eq.strength.toString(16).toUpperCase().padStart(2, '0')
				ret += ' // AP:' + eq.ap + ' Defense:' + eq.defense + ' Magic:' + eq.magic + ' Strength:' + eq.strength + '\n'

				if (!eq.isElementalResistanceChanged)
					ret += '//'
				ret += 'patch=1,EE,' + eq.elementalResistanceAddress + ',extended,'
				ret += (100 - eq.thunderResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - eq.blizzardResistance).toString(16).toUpperCase().padStart(2, '0')
				ret += (100 - eq.fireResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - eq.physicalResistance).toString(16).toUpperCase().padStart(2, '0')
				ret += ' // Thunder:' + eq.thunderResistance + '% Blizzard:' + eq.blizzardResistance
				ret += '% Fire:' + eq.fireResistance + '% Physical:' + eq.physicalResistance + '%\n'

				if (!eq.isOtherResistanceChanged)
					ret += '//'
				ret += 'patch=1,EE,' + eq.otherResistanceAddress + ',extended,00' + (100 - eq.universalResistance).toString(16).toUpperCase().padStart(2, '0')
				ret += (100 - eq.lightResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - eq.darkResistance).toString(16).toUpperCase().padStart(2, '0')
				ret += ' // Universal:' + eq.universalResistance + '% Light:' + eq.lightResistance + '% Dark:' + eq.darkResistance + '%\n'
			})
			return ret
		})

		let bonusPnachCodes = this.state.bonus.allBonuses.map(character => {
			let ret = '// ' + character.character + '\n'
			character.characterBonuses.forEach(world => {
				ret += '// ' + world.world + '\n'
				world.worldBonuses.forEach(bonus => {
					// if (bonus.isRewardsReplaced || bonus.isStatsReplaced || bonus.isSlotsReplaced)
					ret += '// ' + bonus.fight + '\n'

					if (!bonus.isStatsReplaced)
						ret += '//'
					ret += 'patch=1,EE,' + bonus.statAddress + ',extended,0000';
					ret += bonus.mpIncrease.toString(16).toUpperCase().padStart(2, '0') + bonus.hpIncrease.toString(16).toUpperCase().padStart(2, '0');
					ret += ' // MP:' + bonus.mpIncrease + ' HP:' + bonus.hpIncrease + '\n';

					if (!bonus.isSlotsReplaced)
						ret += '//'
					ret += 'patch=1,EE,' + bonus.slotAddress + ',extended,';
					ret += bonus.armorSlotIncrease.toString(16).toUpperCase().padStart(2, '0') + bonus.accessorySlotIncrease.toString(16).toUpperCase().padStart(2, '0');
					ret += bonus.itemSlotIncrease.toString(16).toUpperCase().padStart(2, '0') + bonus.driveGaugeIncrease.toString(16).toUpperCase().padStart(2, '0');
					ret += ' // Armor Slot:+' + bonus.armorSlotIncrease + ' Accessory Slot:+' + bonus.accessorySlotIncrease;
					ret += ' Item Slot:+' + bonus.itemSlotIncrease + ' Drive Gauge:+' + bonus.driveGaugeIncrease + '\n';

					if (!bonus.isRewardsReplaced)
						ret += '//'
					ret += 'patch=1,EE,' + bonus.rewardAddress + ',extended,' + bonus.replacementReward2.index.padStart(4, '0') + bonus.replacementReward1.index.padStart(4, '0');
					ret += ' // Replacement Reward #2:' + bonus.replacementReward2.reward + ', Replacement Reward #1:' + bonus.replacementReward1.reward + '\n';
				})
			})
			return ret
		})

		let levelPnachCodes = this.state.level.currentDisplayData.map(l => {
			let ret = '// Level: ' + l.level + '\n'

			if (l.level === 99)
				ret += '// Cannot Level to 100 so experience is not changed\n'
			else {
				if (!l.isEXPReplaced)
					ret += '//'
				ret += 'patch=1,EE,' + l.expAddress + ',extended,' + l.replacedEXP.toString(16).toUpperCase().padStart(8, '0')
				ret += ' // Level ' + l.level + ' at ' + l.replacedEXP + ' experience\n'
			}

			if (!l.isStatsReplaced)
				ret += '//'
			ret += 'patch=1,EE,' + l.statAddress + ',extended,'
			ret += l.standardAP.toString(16).toUpperCase().padStart(2, '0') + l.defense.toString(16).toUpperCase().padStart(2, '0')
			ret += l.magic.toString(16).toUpperCase().padStart(2, '0') + l.strength.toString(16).toUpperCase().padStart(2, '0')
			ret += ' // AP:' + l.standardAP.toString() + ' Magic:' + l.magic.toString() + ' Defense:' + l.defense.toString() + ' Strength:' + l.strength.toString() + '\n'

			if (l.level === 1)
				ret += '// No Level 1 Dream Weapon Rewards\n'
			else {
				if (!l.isSwordReplaced)
					ret += '//'
				ret += 'patch=1,EE,' + l.swordAddress + ',extended,0000' + l.replacementSwordReward.index + ' // Sword Reward: ' + l.replacementSwordReward.reward + '\n'

				if (!l.isShieldReplaced)
					ret += '//'
				ret += 'patch=1,EE,' + l.shieldAddress + ',extended,0000' + l.replacementShieldReward.index + ' // Shield Reward: ' + l.replacementShieldReward.reward + '\n'

				if (!l.isStaffReplaced)
					ret += '//'
				ret += 'patch=1,EE,' + l.staffAddress + ',extended,0000' + l.replacementStaffReward.index + ' // Staff Reward: ' + l.replacementStaffReward.reward + '\n'
			}
			return ret
		})

		let criticalPnachCodes = this.state.critical.currentDisplayData.map(ce => {
			let ret = ''
			let text
			if (!ce.isReplaced) {
				ret += '//'
				text = ' is still '
			} else
				text = ' is now '

			ret += 'patch=1,EE,' + ce.vanillaAddress + ',extended,0000' + ce.replacementReward.index.padStart(4, '0')
			ret += ' // ' + ce.vanillaReward.reward + text + ce.replacementReward.reward + '\n'
			return ret
		})

		let cheatPnachCodes = this.state.cheat.currentDisplayData.map(cheat => {
			let ret = '//' + cheat.name + '\n'
			ret += cheat.code.join('\n')
			ret += '\n'
			return ret
		})

		let pnachCodes = chestPnachCodes.concat(popupPnachCodes, formPnachCodes, equipmentPnachCodes, bonusPnachCodes, levelPnachCodes, criticalPnachCodes, cheatPnachCodes)

		const element = document.createElement("a")
		const file = new Blob(pnachCodes, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = "F266B00B.pnach"
		document.body.appendChild(element)
		element.click()
	}
	//#endregion

	render() {
		return (
			<div>
				<Tabs defaultActiveKey="chest" transition={false} id="noanim-tab-example">
					<Tab eventKey="chest" title="Chest">
						<ChestPage
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
					<Tab eventKey="form" title="Form">
						<FormPage
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
					<Tab eventKey="bonus" title="Bonus">
						<BonusPage
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
					<Tab eventKey="level" title="Level">
						<LevelPage
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
					<Tab eventKey="critical" title="Critical Extra">
						<CriticalPage
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
							cheatData={this.state.cheat}
							onRowCheck={(event) => this.onRowCheck('cheat', event)}
							checkAll={(event) => this.checkAll('cheat', event)}
							onClick={this.handleCheatReplace}
						/>
					</Tab>
				</Tabs>
				<Button variant='outline-dark'
					name='saveButton'
					onClick={this.handleSave}
				>
					SAVE
			</Button></div>
		)
	}
}

export default App