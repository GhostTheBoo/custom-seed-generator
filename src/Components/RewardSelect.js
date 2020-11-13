import React from 'react'


function RewardSelect(props) {
	let rewardOptionList = props.rewardList.map((reward, index) => {
		return (
			<option key={reward.index} value={index}>{reward.reward}</option>
		)
	})
	
	let rewardTypeOptionList = props.rewardTypeList.map((rewardType, index) => {
		return (
			<option key={index} value={index}>{rewardType}</option>
		)
	})

	return (
		<div>
			<select
				value={props.currentRewardType}
				name='currentRewardType'
				onChange={props.onChange}
			>
				{rewardTypeOptionList}
			</select>
			<select
				value={props.currentReward}
				name='currentReward'
				onChange={props.onChange}
			>
				{rewardOptionList}
			</select>
		</div>
	)
}

export default RewardSelect