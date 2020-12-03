import React from 'react'
import Form from 'react-bootstrap/Form'

function RewardSelect(props) {
	let rewardOptionList = props.rewardList.map((reward, index) => {
		return (
			<option key={reward.index} value={index}>{reward.reward}</option>
		)
	})

	return (
		<Form.Group controlId={props.class + props.name}>
			<Form.Label column='sm'>{props.label} Reward Selector: </Form.Label>
			<Form.Control
				size='sm'
				as='select'
				value={props.currentReward}
				name={props.name}
				onChange={props.onChange}
			>
				{rewardOptionList}
			</Form.Control>
		</Form.Group>
	)
}

export default RewardSelect