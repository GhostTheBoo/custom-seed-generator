import { React } from 'react'
import { Form, Col, Button, Card, Row } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function FormForm(props) {

	function setCurrentReward(newValue) { props.setCurrentFormFieldData('reward', newValue) }
	function setCurrentEXP(newValue) { props.setCurrentFormFieldData('currentEXP', newValue) }
	// function setCurrentEXPMultiplierValue(newValue) { props.setCurrentFormFieldData('currentEXPMultiplierValue', newValue) }

	let expMultiplierList = []

	for (let i = 1; i <= 10; i++) {
		expMultiplierList.push(
			<option key={i} value={i}>{i === 2 ? 'CUSTOM' : `${i / 2}x`}</option>
		)
	}

	return (
		<Card
			border='dark'
			bg='dark'
			className='formFormCard'
			style={{ margin: '10px', textAlign: 'center' }}
		>
			<Card.Body>
				<Card.Text as='div'>
					<Row>
						<Col xs={11}>
							<h1>EDITING {props.currentDriveForm.toUpperCase()} LEVEL {props.currentDriveFormLevel + 2}:</h1>
						</Col>
						<Col xs={1}>
							<button
								className='close'
								onClick={() => props.closeFormCard()}
							>
								x
							</button>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.Row>
									<Form.Label column='lg' xs={4}>
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
								</Form.Row>
								<br />
								<Form.Row>
									<Form.Label column='lg' xs={4}>
										EXP from Level {props.currentDriveFormLevel + 1} → {props.currentDriveFormLevel + 2}:
									</Form.Label>
									<Col xs={3}>
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
								<hr />
								<Form.Row>
									<Col>
										<Button
											variant='secondary'
											block
											onClick={() => props.setCurrentDriveFormLevel(props.currentDriveFormLevelData.vanilla())}
										>
											VANILLA
										</Button>
									</Col>
									<Col>
										<Button
											block
											onClick={() => props.setCurrentDriveFormLevel(props.currentDriveFormLevelData.replace(props.currentFormFieldData))}
										>
											CONFIRM
										</Button>
									</Col>
								</Form.Row>
							</Form>
						</Col>
					</Row>
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default FormForm