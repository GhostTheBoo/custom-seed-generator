import { React } from 'react'
import { Form, Col, Button } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function FormForm(props) {
	function setCurrentReward(newValue) { props.setCurrentFormFieldData('reward', newValue) }
	function setCurrentExperience(newValue) { props.setCurrentFormFieldData('currentExperience', newValue) }

	return (
		<>
			<Form>
				<Form.Row>
					<Form.Label column='lg' xs={3}>
						Reward:
					</Form.Label>
					<Col xs={4}>
						<RewardSelector
							onReplace={(replacementReward) => setCurrentReward(replacementReward)}
						/>
					</Col>
					<Col xs={4}>
						<Icon
							style={{ margin: '10px' }}
							fileName={props.currentBonusFieldData.rewardA.iconType}
							type={'row'}
						>
							{props.currentBonusFieldData.rewardA.reward}
						</Icon>
					</Col>
					<Col xs={1} />
				</Form.Row>
				<Form.Row>
					<Form.Label column='lg' xs={3}>
						Experience To Next Level:
					</Form.Label>
					<Col>
						<Form.Control
							name={'Experience'}
							size='lg'
							type='number'
							value={props.currentBonusFieldData.currentBonusExperience}
							onChange={(e) => setCurrentExperience(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
							min='0'
							max='255'
						/>
					</Col>
					<Col xs={1} />
				</Form.Row>
				<br />
				<Form.Row>
					<Col>
						<Button
							variant='secondary'
							block
							onClick={() => props.setCurrentBonusFightSlot(props.bonusReward.vanilla())}
						>
							VANILLA
						</Button>
					</Col>
					<Col>
						<Button
							block
							onClick={() => props.setCurrentBonusFightSlot(props.bonusReward.replace(props.currentBonusFieldData))}
						>
							REPLACE
						</Button>
					</Col>
				</Form.Row>
			</Form>
		</>
	)
}

export default FormForm