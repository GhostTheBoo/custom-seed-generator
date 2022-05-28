import { React } from 'react'
import { Form, Col, Button } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function AllFormForm(props) {

	function setCurrentReward(newValue) { props.setCurrentFormFieldData('reward', newValue) }
	function setCurrentEXP(newValue) { props.setCurrentFormFieldData('currentEXP', newValue) }
	function setCurrentEXPMultiplierValue(newValue) { props.setCurrentFormFieldData('currentEXPMultiplierValue', newValue) }

	let expMultiplierList = []

	for (let i = 1; i <= 10; i++) {
		expMultiplierList.push(
			<option key={i} value={i}>{i === 2 ? 'CUSTOM' : `${i / 2}x`}</option>
		)
	}

	return (
		<>
			<h1>
				EDITTING ALL {props.currentDriveForm.toUpperCase()} LEVELS
			</h1>
			<Form onSubmit={(e) => e.preventDefault()}>
				<Form.Row>
					<Form.Label column='lg' xs={3}>
						Reward:
					</Form.Label>
					<Col xs={3}>
						<Icon
							style={{ margin: '10px' }}
							fileName={props.currentFormFieldData.reward.iconType}
							type={'row'}
						>
							{props.currentFormFieldData.reward.reward}
						</Icon>
					</Col>
					<Col xs={5}>
						<RewardSelector
							onReplace={(replacementReward) => setCurrentReward(replacementReward)}
						/>
					</Col>
					<Col xs={1} />
				</Form.Row>
				<Form.Row>
					<Form.Label column='lg' xs={3}>
						Vanilla Experience Multiplier:
					</Form.Label>
					<Col xs={2}>
						<Form.Control
							size='lg'
							as='select'
							value={props.currentFormFieldData.currentEXPMultiplierValue}
							name='formEXPMultiplierSelect'
							onChange={(e) => { setCurrentEXPMultiplierValue(parseInt(e.target.value)) }}
						>
							{expMultiplierList}
						</Form.Control>
					</Col>
				</Form.Row>
				{
					props.currentFormFieldData.currentEXPMultiplierValue === 2
						? <Form.Row>
							<Form.Label column='lg' xs={3}>
								Experience for each Level:
							</Form.Label>
							<Col xs={2}>
								<Form.Control
									name={'FormExp'}
									size='lg'
									type='number'
									value={props.currentFormFieldData.currentEXP}
									onChange={(e) => setCurrentEXP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
									min='0'
									max='99999999'
								/>
							</Col>
						</Form.Row>
						: <></>
				}
				<br />
				<Form.Row>
					<Col>
						<Button
							variant='secondary'
							block
							onClick={() => props.setAllLevels('vanilla')}
						>
							VANILLA
						</Button>
					</Col>
					<Col>
						<Button
							block
							onClick={() => props.setAllLevels('replace')}
						>
							CONFIRM
						</Button>
					</Col>
				</Form.Row>
			</Form>
		</>
	)
}

export default AllFormForm