import React from 'react'
import Form from 'react-bootstrap/Form'

import { rewardTypesData } from '../Data/typesData'

function RewardTypeSelect(props) {
	let rewardTypeOptionList = rewardTypesData.map((rewardType, index) => {
		return (
			<option key={index} value={index}>{rewardType}</option>
		)
	})

	return (
		<Form.Group controlId={props.class + props.name}>
			<Form.Label column='sm'>{props.label} Reward Type Selector: </Form.Label>
			<Form.Control
				size='sm'
				as='select'
				value={props.currentRewardType}
				name={props.name}
				onChange={props.onChange}
			>
				{rewardTypeOptionList}
			</Form.Control>
		</Form.Group>
	)
}

export default RewardTypeSelect