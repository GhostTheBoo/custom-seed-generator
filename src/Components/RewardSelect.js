import React from 'react'

import rewardsData from '../Data/rewardsData'

class RewardTypeSelect extends React.Component {
	render() {
		return (
			<select>
				<option>Abilities</option>
				<option>Accessories</option>
				<option>Armor</option>
				<option>Forms</option>
				<option>Growth Abilities</option>
				<option>Items</option>
				<option>Key Items</option>
				<option>Keyblades</option>
				<option>Area Maps</option>
				<option>Proofs</option>
				<option>Recipes</option>
				<option>Secret Reports</option>
				<option>Goofy's Shields</option>
				<option>Donald's Staves</option>
				<option>Magic Spells</option>
				<option>Summons</option>
				<option>Synth Materials</option>
				<option>Empty</option>
			</select>
		)
	}
}

class RewardSelect extends React.Component {
	render() {
		let currentRewardType = 'Abilities'
		let rewardList = rewardsData.find(rewardTypes => rewardTypes.rewardType === currentRewardType).rewards.slice()
		let optionList = rewardList.map(reward => <option key={reward.index}>{reward.reward}</option>)
		return (
			<div>
				<RewardTypeSelect />
				<select>
					{optionList}
				</select>
			</div>
		)
	}
}

export default RewardSelect