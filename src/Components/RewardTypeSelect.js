import React from 'react'
import rewardTypeData from '../Data/rewardTypeData'

function RewardTypeSelect (props) {
	let optionlist = rewardTypeData.map((rewardType, index) => {
		return (
			<option key={index} value={index}>{rewardType}</option>
		)
	})
	return (
		<select value={props.currentRewardType}>
			{optionlist}
		</select>
	)
}

export default RewardTypeSelect