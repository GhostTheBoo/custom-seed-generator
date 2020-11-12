import React from 'react'

import RewardTypeSelect from './RewardTypeSelect'
import rewardsData from '../Data/rewardsData'
import rewardTypeData from '../Data/rewardTypeData'

function RewardSelect() {
	let rewardList = rewardsData.find(rewardTypes => rewardTypes.rewardType === rewardTypeData[this.props.currentRewardType]).rewards.slice()
	let optionList = rewardList.map((reward, index) => {
		return (
			<option key={reward.index} value={index}>{reward.reward}</option>
		)
	})
	return (
		<div>
			<RewardTypeSelect currentRewardType={this.props.currentRewardType} />
			<select value={this.props.currentReward}>
				{optionList}
			</select>
		</div>
	)
}

export default RewardSelect