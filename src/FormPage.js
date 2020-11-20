import React from 'react'

import { formTypesData } from './Data/typesData'
import rewardsData from './Data/rewardsData'
import formsData from './Data/formsData'

import GenericSelect from './Components/GenericSelect'
import RewardSelect from './Components/RewardSelect'
import EXPSelect from './Components/EXPSelect'
import FormTable from './Components/FormTable'
import Buttons from './Components/Buttons'

class FormPage extends React.Component {
	constructor() {
		super()

		this.state = {
			currentDriveForm: 0,
			currentRewardType: 0,
			currentReward: 0,
			currentEXP: 0,
			currentEXPMultiplierValue: 0,
			allForms: formsData.slice(),
			currentDriveFormLevels: formsData[0].driveLevels.slice(),
			pnachCodes: []
		}

		this.handleFormChange = this.handleFormChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.onRowCheck = this.onRowCheck.bind(this)
		this.handleReplace = this.handleReplace.bind(this)
		this.handleSave = this.handleSave.bind(this)
	}

	handleFormChange(event) {
		let nextDriveForm = event.target.value
		let toBeReplacedDriveFormLevels = this.state.currentDriveFormLevels.map(driveFormLevel => {
			driveFormLevel.toBeReplaced = false
			return driveFormLevel
		})
		let newAllForms = this.state.allForms.map((driveFormList, index) => {
			if (index === this.state.currentDriveForm)
				return {
					driveForm: formTypesData[index],
					driveLevels: toBeReplacedDriveFormLevels
				}
			return driveFormList
		})
		let nextDriveFormLevels = newAllForms[nextDriveForm].driveLevels.slice()
		this.setState({
			currentDriveForm: nextDriveForm,
			allForms: newAllForms,
			currentDriveFormLevels: nextDriveFormLevels
		})
	}

	handleChange(event) {
		const { name, value } = event.target
		if (name === 'currentRewardType')
			this.setState({
				currentReward: 0
			})
		this.setState({
			[name]: value,
		})
	}

	onRowCheck(event) {
		let toBeReplacedDriveFormLevels = this.state.currentDriveFormLevels.map((driveFormLevel, index) => {
			if (index === parseInt(event.target.value))
				driveFormLevel.toBeReplaced = !driveFormLevel.toBeReplaced
			return driveFormLevel
		})
		this.setState({
			currentDriveFormLevels: toBeReplacedDriveFormLevels
		})
	}

	handleReplace(event) {
		let replacedDriveFormLevels
		if (event.target.name === 'replaceButton') {
			replacedDriveFormLevels = this.state.currentDriveFormLevels.map(driveFormLevel => {
				if (driveFormLevel.toBeReplaced) {
					driveFormLevel.toBeReplaced = false
					driveFormLevel.isRewardReplaced = true
					driveFormLevel.replacementReward = rewardsData[this.state.currentRewardType].rewards[this.state.currentReward].reward
					driveFormLevel.replacementIndex = rewardsData[this.state.currentRewardType].rewards[this.state.currentReward].index
					if (this.state.currentEXPMultiplierValue === 0)
						driveFormLevel.replacementEXP = this.state.currentEXP
					else
						driveFormLevel.replacementEXP = Math.floor(driveFormLevel.vanillaEXP / this.state.currentEXPMultiplierValue)
				}
				return driveFormLevel
			})
		} else {
			replacedDriveFormLevels = this.state.currentDriveFormLevels.map(driveFormLevel => {
				if (driveFormLevel.toBeReplaced) {
					driveFormLevel.toBeReplaced = false
					driveFormLevel.isRewardReplaced = false
					driveFormLevel.replacementReward = ''
					driveFormLevel.replacementIndex = ''
					driveFormLevel.replacementEXP = driveFormLevel.vanillaEXP
				}
				return driveFormLevel
			})
		}
		this.setState({
			currentDriveFormLevels: replacedDriveFormLevels
		})
	}

	handleSave() {
		let pnachCodes = this.state.allForms.map(driveFormList => {
			let ret = '// ' + driveFormList.driveForm + '\n'
			if (driveFormList.driveLevels.some(driveFormLevel => driveFormLevel.isRewardReplaced))
				ret += driveFormList.removeGrowthJankCodes.join('')
			driveFormList.driveLevels.forEach(driveFormLevel => {
				if (driveFormLevel.isRewardReplaced) {
					ret += 'patch=1,EE,' + driveFormLevel.vanillaAddress + ',extended,0000' + driveFormLevel.replacementIndex
					ret += ' // ' + driveFormLevel.level + ', ' + driveFormLevel.vanillaReward + ' is now ' + driveFormLevel.replacementReward + '\n'
				}
				if (driveFormLevel.replacementEXP !== driveFormLevel.vanillaEXP) {
					ret += 'patch=1,EE,' + driveFormLevel.EXPAddress + ',extended,' + driveFormLevel.replacementEXP.toString(16).toUpperCase().padStart(8, 0)
					ret += ' // ' + driveFormLevel.replacementEXP + ' experience is required to reach ' + driveFormLevel.level + '\n'
				}
			})
			return ret
		})
		console.log(pnachCodes)
	}

	render() {
		return (
			<div>
				<GenericSelect
					selector={'Drive Form'}
					itemList={formTypesData}
					name={'currentDriveForm'}
					currentItem={this.state.currentDriveForm}
					onChange={this.handleFormChange}
				/>
				<RewardSelect
					currentRewardType={this.state.currentRewardType}
					rewardList={rewardsData[this.state.currentRewardType].rewards}
					currentReward={this.state.currentReward}
					typeName={'currentRewardType'}
					name={'currentReward'}
					onChange={this.handleChange}
				/>
				<EXPSelect
					currentEXP={this.state.currentEXP}
					currentEXPMultiplier={this.state.currentEXPMultiplierValue}
					onChange={this.handleChange}
				/>
				<FormTable
					currentDriveForm={formTypesData[this.state.currentDriveForm]}
					driveLevels={this.state.currentDriveFormLevels}
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

export default FormPage