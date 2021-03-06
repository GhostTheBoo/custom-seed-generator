import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function RewardSelect(props) {
	let rewardOptionList = props.rewardList.map((reward, index) => {
		return (
			<option key={reward.index} value={index}>{reward.reward}</option>
		)
	})

	return (
		<Form.Row>
			<Col>
				<Form.Group controlId={props.class + props.name}>
					<Form.Label column='sm'>{props.label} Selector: </Form.Label>
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