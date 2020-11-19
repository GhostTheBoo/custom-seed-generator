import React from 'react'
import Form from 'react-bootstrap/Form'

import { rewardTypesData } from '../Data/typesData'

function RewardSelect(props) {
	let rewardOptionList = props.rewardList.map((reward, index) => {
		return (
			<option key={reward.index} value={index}>{reward.reward}</option>
		)
	})

	let rewardTypeOptionList = rewardTypesData.map((rewardType, index) => {
		return (
			<option key={index} value={index}>{rewardType}</option>
		)
	})
	let suffix = props.index === 1 ? '' : '2'
	return (
		<div>
			<Form.Group controlId={'rewardTypeSelector' + suffix}>
				<Form.Label>Reward Type Selector:</Form.Label>
				<Form.Control as='select'
					value={props.currentRewardType}
					name={props.typeName}
					onChange={props.onChange}
				>
					{rewardTypeOptionList}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId={'rewardSelector' + suffix}>
				<Form.Label>Reward Selector:</Form.Label>
				<Form.Control as='select'
					value={props.currentReward}
					name={props.name}
					onChange={props.onChange}
				>
					{rewardOptionList}
				</Form.Control>
			</Form.Group>
		</div>
	)
}

export default RewardSelect