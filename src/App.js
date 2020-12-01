import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { worldsData, formTypesData } from './Data/typesData'
import rewardsData from './Data/rewardsData'

import ChestPage from './ChestPage'
import chestsData from './Data/chestsData'

import PopupPage from './PopupPage'
import popupsData from './Data/popupsData'

import FormPage from './FormPage'
import formsData from './Data/formsData'

// import EquipmentPage from './EquipmentPage'

// import BonusPage from './BonusPage'

// import LevelPage from './LevelPage'

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
			equipment: null,
			bonus: null,
			level: null
		}

		this.handleChestWorldChange = this.handleChestWorldChange.bind(this)
		this.handlePopupWorldChange = this.handlePopupWorldChange.bind(this)
		this.handleFormChange = this.handleFormChange.bind(this)

		this.handleChestReplace = this.handleChestReplace.bind(this)
		this.handlePopupReplace = this.handlePopupReplace.bind(this)
		this.handleFormReplace = this.handleFormReplace.bind(this)

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
	//#endregion

	//#region Replace
	handleChestReplace(event) {
		let replacedChests
		if (event.target.name === 'replaceButton') {
			replacedChests = this.state.chest.currentDisplayData.map(chest => {
				if (chest.toBeReplaced) {
					let reward = rewardsData[this.state.chest.currentRewardType].rewards[this.state.chest.currentReward]
					chest.toBeReplaced = false

					if (reward.reward !== chest.replacementReward) {
						if (reward.reward === chest.vanillaReward) {
							chest.isReplaced = false
							chest.replacementReward = chest.vanillaReward
							chest.replacementIndex = ''
						} else {
							chest.isReplaced = true
							chest.replacementReward = reward.reward
							chest.replacementIndex = reward.index
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
					chest.replacementIndex = ''
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
					console.log(popup.isAbility)

					if (reward.reward !== popup.replacementReward) {
						if (reward.reward === popup.vanillaReward) {
							popup.isReplaced = false
							popup.replacementReward = popup.vanillaReward
							popup.replacementIndex = ''
						} else {
							popup.isReplaced = true
							popup.replacementReward = reward.reward
							popup.replacementIndex = reward.index
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
					popup.replacementIndex = ''
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
					if (reward.reward !== driveFormLevel.replacementReward) {
						if (reward.reward === driveFormLevel.vanillaReward) {
							driveFormLevel.isRewardReplaced = false
							driveFormLevel.replacementReward = driveFormLevel.vanillaReward
							driveFormLevel.replacementIndex = ''
						} else {
							driveFormLevel.isRewardReplaced = true
							driveFormLevel.replacementReward = reward.reward
							driveFormLevel.replacementIndex = reward.index
						}
					}

					if (this.state.form.currentEXPMultiplierValue === 0)
						driveFormLevel.replacementEXP = this.state.form.currentEXP
					else
						driveFormLevel.replacementEXP = Math.floor(driveFormLevel.vanillaEXP / (this.state.form.currentEXPMultiplierValue / 2))

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
					driveFormLevel.replacementIndex = ''
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
		value = Math.max(Number(min), Math.min(Number(max), Number(value)));
		this.setState(prevState => ({
			[page]: {
				...prevState[page],
				[name]: value
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

		//#region Chest saving
		let chestPnachCodes = this.state.chest.allChests.map(worldList => {
			let ret = '// ' + worldList.world + '\n'
			let text
			worldList.chests.forEach(chest => {
				if (!chest.isReplaced) {
					ret += '//'
					text = ' is still '
				} else
					text = ' is now '

				ret += 'patch=1,EE,' + chest.vanillaAddress + ',extended,0000' + chest.replacementIndex.padStart(4, '0')
				ret += ' // ' + chest.room + ', ' + chest.vanillaReward + text + chest.replacementReward + '\n'
			})
			return ret
		})
		//#endregion

		//#region Popup saving
		let popupPnachCodes = this.state.popup.allPopups.map(worldList => {
			let ret = '// ' + worldList.world + '\n'
			let text
			worldList.popups.forEach(popup => {
				if (!popup.isReplaced) {
					ret += '//'
					text = ' is still '
				} else
					text = ' is now '

				ret += 'patch=1,EE,' + popup.vanillaAddress + ',extended,0000' + popup.replacementIndex.padStart(4, '0')
				ret += ' // ' + popup.popup + ', ' + popup.vanillaReward + text + popup.replacementReward + '\n'
			})
			return ret
		})
		//#endregion

		//#region Form saving
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

				ret += 'patch=1,EE,' + driveFormLevel.vanillaAddress + ',extended,0000' + driveFormLevel.replacementIndex.padStart(4, '0')
				ret += ' // ' + driveFormLevel.level + ', ' + driveFormLevel.vanillaReward + text + driveFormLevel.replacementReward + '\n'

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
		//#endregion

		//#region Equipment
		//#endregion

		//#region Bonus
		//#endregion

		//#region Level
		//#endregion

		let pnachCodes = chestPnachCodes.concat(popupPnachCodes, formPnachCodes)
		console.log(pnachCodes)
	}
	//#endregion

	render() {
		return (
			<Tabs defaultActiveKey="chest" transition={false} id="noanim-tab-example">
				<Tab eventKey="chest" title="Chest">
					<ChestPage
						chestData={this.state.chest}
						page={'chest'}
						rewardList={rewardsData[this.state.chest.currentRewardType].rewards}
						handleWorldChange={this.handleChestWorldChange}
						onRewardTypeChange={this.handleRewardTypeChange}
						onRewardChange={this.handleGenericChange}
						onRowCheck={this.onRowCheck}
						checkAll={this.checkAll}
						handleReplace={this.handleChestReplace}
						handleSave={this.handleSave}
					/>
				</Tab>
				<Tab eventKey="popup" title="Popup">
					<PopupPage
						popupData={this.state.popup}
						page={'popup'}
						rewardList={rewardsData[this.state.popup.currentRewardType].rewards}
						handleWorldChange={this.handlePopupWorldChange}
						onRewardTypeChange={this.handleRewardTypeChange}
						onRewardChange={this.handleGenericChange}
						onRowCheck={this.onRowCheck}
						checkAll={this.checkAll}
						handleReplace={this.handlePopupReplace}
						handleSave={this.handleSave}
					/>
				</Tab>
				<Tab eventKey="form" title="Form">
					<FormPage
						formData={this.state.form}
						page={'form'}
						rewardList={rewardsData[this.state.form.currentRewardType].rewards}
						handleFormChange={this.handleFormChange}
						onRewardTypeChange={this.handleRewardTypeChange}
						onRewardChange={this.handleGenericChange}
						onInputChange={this.handleInputChange}
						onRowCheck={this.onRowCheck}
						checkAll={this.checkAll}
						handleReplace={this.handleFormReplace}
						handleSave={this.handleSave}

					/>
				</Tab>
				{/* <Tab eventKey="equipment" title="Equipment">
					<EquipmentPage
						page={'equipment'}

					/>
				</Tab> */}
				{/* <Tab eventKey="bonus" title="Bonus">
					<BonusPage
						page={'bonus'}

					/>
				</Tab> */}
				{/* <Tab eventKey="level" title="Level">
					<LevelPage
						page={'level'}

					/>
				</Tab> */}
			</Tabs>
		)
	}
}

export default App