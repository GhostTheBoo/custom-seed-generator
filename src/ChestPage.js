import React from 'react'

import worldsData from './Data/worldsData'
import rewardTypesData from './Data/rewardTypesData'
import rewardsData from './Data/rewardsData'
import chestsData from './Data/chestsData'

import WorldSelect from './Components/WorldSelect'
import RewardSelect from './Components/RewardSelect'
import ChestTable from './Components/ChestTable'
import Buttons from './Components/Buttons'

class ChestPage extends React.Component {
	constructor() {
		super()

		let newChestArray = chestsData.map(worldChestList => {
			let newWorldChestList = worldChestList.chests.map(chest => {
				chest.toBeReplaced = false
				chest.isReplaced = false
				chest.replacementReward = ''
				chest.replacementIndex = ''
				return chest
			})
			return ({
				world: worldChestList.world,
				chests: newWorldChestList
			})
		})

		this.state = {
			currentWorld: 0,
			currentRewardType: 0,
			currentReward: 0,
			allChests: newChestArray,
			currentWorldChests: newChestArray[0].chests.slice(),
			pnachCodes: []
		}
		this.handleWorldChange = this.handleWorldChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleReplace = this.handleReplace.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.onRowCheck = this.onRowCheck.bind(this)
	}

	handleWorldChange(event) {
		let nextWorld = event.target.value
		let toBeReplacedChests = this.state.currentWorldChests.map(chest => {
			chest.toBeReplaced = false
			return chest
		})
		let newAllChests = this.state.allChests.map((worldChestList, index) => {
			if (index === this.state.currentWorld)
				return {
					world: worldsData[index],
					chests: toBeReplacedChests
				}
			return worldChestList
		})
		let nextWorldChests = newAllChests[nextWorld].chests.slice()
		this.setState({
			currentWorld: nextWorld,
			allChests: newAllChests,
			currentWorldChests: nextWorldChests
		})
	}

	handleChange(event) {
		const { name, value } = event.target
		if (name !== 'currentReward')
			this.setState({
				currentReward: 0
			})
		this.setState({
			[name]: value,
		})
	}

	onRowCheck(event) {
		// for each value checked, make new state where all chests indexed at those values are marked to be replaced
		let toBeReplacedWorldChests = this.state.currentWorldChests.map((chest, index) => {
			if (index === parseInt(event.target.value))
				chest.toBeReplaced = !chest.toBeReplaced
			return chest
		})
		this.setState({
			currentWorldChests: toBeReplacedWorldChests
		})
	}

	handleReplace(event) {
		let replacedChests
		if (event.target.name === 'replaceButton') {
			replacedChests = this.state.currentWorldChests.map(chest => {
				if (chest.toBeReplaced) {
					chest.toBeReplaced = false
					chest.isReplaced = true
					chest.replacementReward = rewardsData[this.state.currentRewardType].rewards[this.state.currentReward].reward
					chest.replacementIndex = rewardsData[this.state.currentRewardType].rewards[this.state.currentReward].index
				}
				return chest
			})
		} else {
			replacedChests = this.state.currentWorldChests.map(chest => {
				if (chest.toBeReplaced) {
					chest.toBeReplaced = false
					chest.isReplaced = false
					chest.replacementReward = ''
					chest.replacementIndex = ''
				}
				return chest
			})
		}
		this.setState({
			currentWorldChests: replacedChests
		})
	}

	handleSave() {
		let pnachCodes = this.state.allChests.map(worldList => {
			let ret = '// ' + worldList.world + '\n'
			worldList.chests.forEach(chest => {
				if (chest.isReplaced) {
					ret += 'patch=1,EE,' + chest.originalAddress + ',extended,0000' + chest.replacementIndex
					ret += ' // ' + chest.room + ', ' + chest.originalReward + ' is now ' + chest.replacementReward + '\n'
				}
			})
			return ret
		})
		console.log(pnachCodes)
	}

	render() {
		return (
			<div>
				<WorldSelect
					worldList={worldsData}
					currentWorld={this.state.currentWorld}
					onChange={this.handleWorldChange}
				/>
				<RewardSelect
					rewardTypeList={rewardTypesData}
					currentRewardType={this.state.currentRewardType}
					rewardList={rewardsData[this.state.currentRewardType].rewards}
					currentReward={this.state.currentReward}
					onChange={this.handleChange}
				/>
				<ChestTable
					currentWorld={worldsData[this.state.currentWorld]}
					worldChests={this.state.currentWorldChests}
					onRowCheck={this.onRowCheck}
				/>
				<Buttons
					onClick={this.handleReplace}
					onSaveClick={this.handleSave}
				/>
			</div>
		)
	}
}

export default ChestPage