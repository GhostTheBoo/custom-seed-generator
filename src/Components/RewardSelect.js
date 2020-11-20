import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

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

	return (
		<Form.Row>
			<Col xl='2'>
				<Form.Group controlId={props.class + props.typeName}>
					<Form.Label column='sm'>{props.label} Reward Type Selector: </Form.Label>
					<Form.Control
						size='sm'
						as='select'
						value={props.currentRewardType}
						name={props.typeName}
						onChange={props.onChange}
					>
						{rewardTypeOptionList}
					</Form.Control>
				</Form.Group>
			</Col>
			<Col xl='2'>
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
			</Col>
		</Form.Row>
	)
}

export default RewardSelect