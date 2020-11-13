import React from 'react'

import worldsData from './Data/worldsData'
import rewardTypesData from './Data/rewardTypesData'
import rewardsData from './Data/rewardsData'
import chestsData from './Data/chestsData'

import WorldSelect from './Components/WorldSelect'
import RewardSelect from './Components/RewardSelect'
import ChestTable from './Components/ChestTable'

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
			currentWorldChests: newChestArray[0].chests.slice()
		}
		this.handleChange = this.handleChange.bind(this)
		this.onRowCheck = this.onRowCheck.bind(this)
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

	render() {
		return (
			<div>
				<WorldSelect
					worldList={worldsData}
					currentWorld={this.state.currentWorld}
					onChange={this.handleChange}
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
			</div>
		)
	}
}

export default ChestPage