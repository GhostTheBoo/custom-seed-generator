import React from 'react'
import Form from 'react-bootstrap/Form'

import { worldsData } from './Data/typesData'
import rewardsData from './Data/rewardsData'
import popupsData from './Data/popupsData'

import GenericSelect from './Components/GenericSelect'
import RewardSelect from './Components/RewardSelect'
import PopupTable from './Components/PopupTable'
import Buttons from './Components/Buttons'

class PopupPage extends React.Component {
	constructor() {
		super()

		this.state = {
			currentWorld: 0,
			currentRewardType: 0,
			currentReward: 0,
			allPopups: popupsData.slice(),
			currentWorldPopups: popupsData[0].popups.slice(),
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
		let toBeReplacedPopups = this.state.currentWorldPopups.map(popup => {
			popup.toBeReplaced = false
			return popup
		})
		let newAllPopups = this.state.allPopups.map((worldPopupList, index) => {
			if (index === this.state.currentWorld)
				return {
					world: worldsData[index],
					popups: toBeReplacedPopups
				}
			return worldPopupList
		})
		let nextWorldPopups = newAllPopups[nextWorld].popups.slice()
		this.setState({
			currentWorld: nextWorld,
			allPopups: newAllPopups,
			currentWorldPopups: nextWorldPopups
		})
	}

	handleChange(event) {
		const { name, value } = event.target
		if (name !== 'currentReward')
			this.setState({
				currentReward: 0
			})
		this.setState({
			[name]: parseInt(value),
		})
	}

	onRowCheck(event) {
		let toBeReplacedWorldPopups = this.state.currentWorldPopups.map((popup, index) => {
			if (index === parseInt(event.target.value))
				popup.toBeReplaced = !popup.toBeReplaced
			return popup
		})
		this.setState({
			currentWorldPopups: toBeReplacedWorldPopups
		})
	}

	handleReplace(event) {
		let replacedPopups
		if (event.target.name === 'replaceButton') {
			replacedPopups = this.state.currentWorldPopups.map(popup => {
				if (popup.toBeReplaced) {
					let reward = rewardsData[this.state.currentRewardType].rewards[this.state.currentReward].reward
					let index = rewardsData[this.state.currentRewardType].rewards[this.state.currentReward].index
					if (this.state.currentRewardType === 0 || this.state.currentRewardType === 4)
						popup.isAbility = true
					else
						popup.isAbility = false
					popup.toBeReplaced = false
					if (reward !== popup.replacementReward) {
						if (reward === popup.vanillaReward) {
							popup.isReplaced = false
							popup.replacementReward = popup.vanillaReward
							popup.replacementIndex = ''
						} else {
							popup.isReplaced = true
							popup.replacementReward = reward
							popup.replacementIndex = index
						}
					}
				}
				return popup
			})
		} else {
			replacedPopups = this.state.currentWorldPopups.map(popup => {
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
		this.setState({
			currentWorldPopups: replacedPopups
		})
	}

	handleSave() {
		let pnachCodes = this.state.allPopups.map(worldList => {
			let ret = '// ' + worldList.world + '\n'
			worldList.popups.forEach(popup => {
				if (popup.isReplaced) {
					ret += 'patch=1,EE,' + popup.vanillaAddress + ',extended,0000' + popup.replacementIndex
					ret += ' // ' + popup.popup + ', ' + popup.vanillaReward + ' is now ' + popup.replacementReward + '\n'
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
							class='popup'
							selector={'World'}
							itemList={worldsData}
							name={'currentWorld'}
							currentItem={this.state.currentWorld}
							onChange={this.handleWorldChange}
						/>
					</Form.Row>
					<RewardSelect
						class='popup'
						currentRewardType={this.state.currentRewardType}
						rewardList={rewardsData[this.state.currentRewardType].rewards}
						currentReward={this.state.currentReward}
						typeName={'currentRewardType'}
						name={'currentReward'}
						onChange={this.handleChange}
					/>
				</Form>
				<PopupTable
					currentWorld={worldsData[this.state.currentWorld]}
					worldPopups={this.state.currentWorldPopups}
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

export default PopupPage