import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EXPSelect from '../Components/EXPSelect'
import LevelTable from '../Tables/LevelTable'

function LevelPage(props) {
	return (
		<div style={props.style}>
			<Form>
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
			<LevelTable
				allLevels={props.levelData}
				onRowCheck={props.onRowCheck}
				onCheckAll={props.onCheckAll}
				selectAll={props.fieldData.selectAll}
			/>
			<Container fluid>
				<Row>
					<Col xs='1'>
						<Button
							variant='outline-light'
							block
							name='replaceButton'
							onClick={props.onClick}
						>
							REPLACE
							</Button>
					</Col>
					<Col xs='1'>
						<Button
							variant='outline-light'
							block
							name='vanillaButton'
							onClick={props.onClick}
						>
							VANILLA
							</Button>
					</Col>
					<Col xs='8'></Col>
					{props.children}
				</Row>
			</Container>
		</div>
	)
}

export default LevelPage