import { React } from 'react'
import { Form, Row, Col, Button, Card } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function AllFormForm(props) {

	function setCurrentReward(newValue) { props.setCurrentAllFormFieldData('reward', newValue) }
	function setCurrentEXP(newValue) { props.setCurrentAllFormFieldData('currentEXP', newValue) }
	function setCurrentEXPMultiplierValue(newValue) { props.setCurrentAllFormFieldData('currentEXPMultiplierValue', newValue) }

	function setModifyReward() { props.setCurrentAllFormFieldData('modifyReward', !props.currentAllFormFieldData.modifyReward) }

	let expMultiplierList = []

	for (let i = 1; i <= 10; i++) {
		expMultiplierList.push(
			<option key={i} value={i}>{i / 2}x</option>
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
							<h1>EDITING ALL {props.currentDriveForm.toUpperCase()} LEVELS</h1>
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
									<Form.Check
										id='allFormLevelRewardSwitch'
										type='switch'
										style={{ margin: 'auto' }}
										checked={props.currentAllFormFieldData.modifyReward}
										onChange={() => setModifyReward()}
									/>
									<Form.Label column='lg' xs={3}>
										Reward:
									</Form.Label>
									<Col xs={4}>
										<Icon
											style={{ margin: '10px' }}
											fileName={props.currentAllFormFieldData.reward.iconType}
											type={'row'}
										>
											{props.currentAllFormFieldData.reward.reward}
										</Icon>
									</Col>
									<Col xs={4}>
										<RewardSelector
											onReplace={(replacementReward) => setCurrentReward(replacementReward)}
										/>
									</Col>
								</Form.Row>
								<hr />
								<Form.Row>
									<Form.Check
										id='allFormLevelEXPMultiplierSwitch'
										type='switch'
										style={{ margin: 'auto' }}
										checked={props.currentAllFormFieldData.EXPMultiplier}
										onChange={() => props.handleAllEXPSwitch('EXPMultiplier')}
									/>
									<Form.Label column='lg' xs={3}>
										EXP Multiplier:
									</Form.Label>
									<Col xs={4}>
										<Form.Control
											size='lg'
											as='select'
											value={props.currentAllFormFieldData.currentEXPMultiplierValue}
											disabled={!props.currentAllFormFieldData.EXPMultiplier}
											name='formEXPMultiplierSelect'
											onChange={(e) => { setCurrentEXPMultiplierValue(parseInt(e.target.value)) }}
										>
											{expMultiplierList}
										</Form.Control>
									</Col>
									<Col xs={4} />
								</Form.Row>
								<Form.Row>
									<Form.Check
										id='allFormLevelCustomEXPSwitch'
										type='switch'
										style={{ margin: 'auto' }}
										checked={props.currentAllFormFieldData.customEXP}
										onChange={() => props.handleAllEXPSwitch('customEXP')}
									/>
									<Form.Label column='lg' xs={3}>
										Custom EXP:
									</Form.Label>
									<Col xs={4}>
										<Form.Control
											name={'FormExp'}
											size='lg'
											type='number'
											value={props.currentAllFormFieldData.currentEXP}
											disabled={!props.currentAllFormFieldData.customEXP}
											onChange={(e) => setCurrentEXP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
											min='0'
											max='99999999'
										/>
									</Col>
									<Col xs={4} />
								</Form.Row>
								<hr />
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
						</Col>
					</Row>
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default AllFormForm