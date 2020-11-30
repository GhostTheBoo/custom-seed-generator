import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { worldsData } from './Data/typesData'
import rewardsData from './Data/rewardsData'
import chestsData from './Data/chestsData'

import GenericSelect from './Components/GenericSelect'
import RewardSelect from './Components/RewardSelect'
import RewardTypeSelect from './Components/RewardTypeSelect'
import ChestTable from './Components/ChestTable'
import Buttons from './Components/Buttons'

class ChestPage extends React.Component {
	constructor() {
		super()

		this.state = {
			currentWorld: 0,
			currentRewardType: 0,
			currentReward: 0,
			selectAll: false,
			allChests: chestsData.slice(),
			currentWorldChests: chestsData[0].chests.slice(),
			pnachCodes: []
		}

		this.handleWorldChange = this.handleWorldChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleReplace = this.handleReplace.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.onRowCheck = this.onRowCheck.bind(this)
		this.checkAll = this.checkAll.bind(this)
	}

	handleWorldChange(event) {
		let nextWorld = parseInt(event.target.value)
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
			selectAll: false,
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
		let toBeReplacedWorldChests = this.state.currentWorldChests.map((chest, index) => {
			if (index === parseInt(event.target.value))
				chest.toBeReplaced = !chest.toBeReplaced
			return chest
		})
		this.setState({
			currentWorldChests: toBeReplacedWorldChests
		})
	}

	checkAll() {
		let selectAll = !this.state.selectAll
		let toBeReplacedWorldChests = this.state.currentWorldChests.map(chest => {
			chest.toBeReplaced = selectAll
			return chest
		})
		this.setState({
			selectAll: selectAll,
			currentWorldChests: toBeReplacedWorldChests
		})
	}

	handleReplace(event) {
		let replacedChests
		if (event.target.name === 'replaceButton') {
			replacedChests = this.state.currentWorldChests.map(chest => {
				if (chest.toBeReplaced) {
					let reward = rewardsData[this.state.currentRewardType].rewards[this.state.currentReward].reward
					let index = rewardsData[this.state.currentRewardType].rewards[this.state.currentReward].index
					chest.toBeReplaced = false
					if (reward !== chest.replacementReward) {
						if (reward === chest.vanillaReward) {
							chest.isReplaced = false
							chest.replacementReward = chest.vanillaReward
							chest.replacementIndex = ''
						} else {
							chest.isReplaced = true
							chest.replacementReward = reward
							chest.replacementIndex = index
						}
					}
				}
				return chest
			})
		} else {
			replacedChests = this.state.currentWorldChests.map(chest => {
				if (chest.toBeReplaced) {
					chest.toBeReplaced = false
					chest.isReplaced = false
					chest.replacementReward = chest.vanillaReward
					chest.replacementIndex = ''
				}
				return chest
			})
		}
		this.setState({
			selectAll: !this.state.selectAll,
			currentWorldChests: replacedChests
		})
	}

	handleSave() {
		let pnachCodes = this.state.allChests.map(worldList => {
			let ret = '// ' + worldList.world + '\n'
			worldList.chests.forEach(chest => {
				if (chest.isReplaced) {
					ret += 'patch=1,EE,' + chest.vanillaAddress + ',extended,0000' + chest.replacementIndex
					ret += ' // ' + chest.room + ', ' + chest.vanillaReward + ' is now ' + chest.replacementReward + '\n'
				}
			})
			return ret
		})
		console.log(pnachCodes)
	}

	render() {
		return (
			<div>
				<Form>
					<Form.Row>
						<GenericSelect
							class='chest'
							selector={'World'}
							itemList={worldsData}
							name={'currentWorld'}
							currentItem={this.state.currentWorld}
							onChange={this.handleWorldChange}
						/>
					</Form.Row>
					<Form.Row>
						<Col>
							<RewardTypeSelect
								class='chest'
								currentRewardType={this.state.currentRewardType}
								name={'currentRewardType'}
								onChange={this.handleRewardTypeChange}
							/>
						</Col>
						<Col>
							<RewardSelect
								class='chest'
								rewardList={rewardsData[this.state.currentRewardType].rewards}
								currentReward={this.state.currentReward}
								name={'currentReward'}
								onChange={this.handleRewardChange}
							/>
						</Col>
					</Form.Row>
				</Form>
				<ChestTable
					currentWorld={worldsData[this.state.currentWorld]}
					worldChests={this.state.currentWorldChests}
					onRowCheck={this.onRowCheck}
					checkAll={this.checkAll}
					selectAll={this.state.selectAll}
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