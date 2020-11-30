import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { worldsData } from './Data/typesData'
import rewardsData from './Data/rewardsData'

import ChestPage from './ChestPage'
import chestsData from './Data/chestsData'
// import PopupPage from './PopupPage'
// import FormPage from './FormPage'
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
			popup: null,
			form: null,
			equipment: null,
			bonus: null,
			level: null
		}

		this.handleChestWorldChange = this.handleChestWorldChange.bind(this)
		this.handleRewardTypeChange = this.handleRewardTypeChange.bind(this)
		this.handleRewardChange = this.handleRewardChange.bind(this)
		this.onRowCheck = this.onRowCheck.bind(this)
		this.checkAll = this.checkAll.bind(this)
		this.handleChestReplace = this.handleChestReplace.bind(this)
		this.handleSave = this.handleSave.bind(this)
	}

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

	handleRewardTypeChange(page, event) {
		const { name, value } = event.target
		const currentReward = name.slice(0, -4)
		this.setState(prevState => ({
			[page]: {
				...prevState[page],
				[currentReward]: 0,
				[name]: value
			}
		}))
	}

	handleRewardChange(page, event) {
		const { name, value } = event.target
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

	handleChestReplace(event) {
		let replacedChests
		console.log(this.state.chest.currentDisplayData)
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
				selectAll: !this.state.chest.selectAll,
				currentDisplayData: replacedChests
			}
		}))
	}

	handleSave() {
		let pnachCodes = this.state.chest.allChests.map(worldList => {
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
		console.log(pnachCodes)
	}

	render() {
		return (
			<Tabs defaultActiveKey="chest" transition={false} id="noanim-tab-example">
				<Tab eventKey="chest" title="Chest">
					<ChestPage
						chestData={this.state.chest}
						page={'chest'}
						handleWorldChange={this.handleChestWorldChange}
						onRewardTypeChange={this.handleRewardTypeChange}
						onRewardChange={this.handleRewardChange}
						onRowCheck={this.onRowCheck}
						checkAll={this.checkAll}
						handleReplace={this.handleChestReplace}
						handleSave={this.handleSave}
					/>
				</Tab>
				{/* <Tab eventKey="popup" title="Popup">
					<PopupPage
						page={'popup'}

					/>
				</Tab>
				<Tab eventKey="form" title="Form">
					<FormPage
						page={'form'}

					/>
				</Tab>
				<Tab eventKey="equipment" title="Equipment">
					<EquipmentPage
						page={'equipment'}

					/>
				</Tab>
				<Tab eventKey="bonus" title="Bonus">
					<BonusPage
						page={'bonus'}

					/>
				</Tab>
				<Tab eventKey="level" title="Level">
					<LevelPage
						page={'level'}

					/>
				</Tab> */}
			</Tabs>
		)
	}
}

export default App