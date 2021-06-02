import React from 'react'
import { Button, Form, Row, Col, Container, Card, Table } from 'react-bootstrap'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EXPSelect from '../Components/EXPSelect'
import Icon from '../Components/Icon'

function LevelCard(props) {
	return (
		<div>
			<Card border='primary' bg='dark'>
				<Card.Body>
					<Card.Title>Level {props.selectedLevel.level}</Card.Title>
				</Card.Body>
				<Table striped hover borderless size='sm' variant='dark'>
					<thead>
						<tr>
							<th></th>
							<th>Original</th>
							<th>Replacement</th>
							<th>Selector</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Total EXP to Next Level</td>
							<td>{props.selectedLevel.vanillaEXP}</td>
							<td>{props.selectedLevel.replacementEXP}</td>
							<td>
								<Form.Control
									size='sm'
									name='currentEXP'
									type='number'
									value={69}
									min="1"
									max="99999999"
								/>
								{/* <Form.Group controlId={'butt'}>
									<Form.Control
										size='sm'
										name='currentEXP'
										type='number'
										value={69}
										min="1"
										max="99999999"
									/>
								</Form.Group> */}
							</td>
						</tr>
					</tbody>
				</Table>
			</Card>
			{/* <Form>
				<Form.Row>
					<Col>
						<RewardTypeSelect
							label={'Sword'}
							class={'level'}
							currentRewardType={props.fieldData.currentSwordRewardType}
							name={'currentSwordRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							label={'Sword Reward'}
							class={'level'}
							rewardList={props.swordRewardList}
							currentReward={props.fieldData.currentSwordReward}
							name={'currentSwordReward'}
							onChange={props.onSelectChange}
						/>
					</Col>
					<Col>
						<RewardTypeSelect
							label={'Shield'}
							class={'level'}
							currentRewardType={props.fieldData.currentShieldRewardType}
							name={'currentShieldRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							label={'Shield Reward'}
							class={'level'}
							rewardList={props.shieldRewardList}
							currentReward={props.fieldData.currentShieldReward}
							name={'currentShieldReward'}
							onChange={props.onSelectChange}
						/>
					</Col>
					<Col>
						<RewardTypeSelect
							label={'Staff'}
							class={'level'}
							currentRewardType={props.fieldData.currentStaffRewardType}
							name={'currentStaffRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							label={'Staff Reward'}
							class={'level'}
							rewardList={props.staffRewardList}
							currentReward={props.fieldData.currentStaffReward}
							name={'currentStaffReward'}
							onChange={props.onSelectChange}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col lg='4'>
						<EXPSelect
							class={'level'}
							currentEXP={props.fieldData.currentEXP}
							currentEXPMultiplier={props.fieldData.currentEXPMultiplierValue}
							onInputChange={props.onInputChange}
							onMultiplierChange={props.onSelectChange}
						/>
					</Col>
					<Col lg='2'>
						<Form.Group controlId='currentLevelAP'>
							<Form.Label column='sm'>AP: </Form.Label>
							<Form.Control
								size='sm'
								name='currentLevelAP'
								type='number'
								value={props.fieldData.currentLevelAP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col lg='2'>
						<Form.Group controlId='currentLevelDefense'>
							<Form.Label column='sm'>Defense: </Form.Label>
							<Form.Control
								size='sm'
								name='currentLevelDefense'
								type='number'
								value={props.fieldData.currentLevelDefense}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col lg='2'>
						<Form.Group controlId='currentLevelStrength'>
							<Form.Label column='sm'>Strength: </Form.Label>
							<Form.Control
								size='sm'
								name='currentLevelStrength'
								type='number'
								value={props.fieldData.currentLevelStrength}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col lg='2'>
						<Form.Group controlId='currentLevelMagic'>
							<Form.Label column='sm'>Magic: </Form.Label>
							<Form.Control
								size='sm'
								name='currentLevelMagic'
								type='number'
								value={props.fieldData.currentLevelMagic}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
		 */}
		</div>
	)
}

export default LevelCard