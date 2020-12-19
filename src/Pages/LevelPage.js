import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EXPSelect from '../Components/EXPSelect'
import LevelTable from '../Tables/LevelTable'

function LevelPage(props) {
	return (
		<div>
			<Form>
				<Form.Row>
					<Col>
						<RewardTypeSelect
							label={'Sword'}
							class={'level'}
							currentRewardType={props.levelData.currentSwordRewardType}
							name={'currentSwordRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							label={'Sword'}
							class={'level'}
							rewardList={props.swordRewardList}
							currentReward={props.levelData.currentSwordReward}
							name={'currentSwordReward'}
							onChange={props.onGenericChange}
						/>
					</Col>
					<Col>
						<RewardTypeSelect
							label={'Shield'}
							class={'level'}
							currentRewardType={props.levelData.currentShieldRewardType}
							name={'currentShieldRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							label={'Shield'}
							class={'level'}
							rewardList={props.shieldRewardList}
							currentReward={props.levelData.currentShieldReward}
							name={'currentShieldReward'}
							onChange={props.onGenericChange}
						/>
					</Col>
					<Col>
						<RewardTypeSelect
							label={'Staff'}
							class={'level'}
							currentRewardType={props.levelData.currentStaffRewardType}
							name={'currentStaffRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							label={'Staff'}
							class={'level'}
							rewardList={props.staffRewardList}
							currentReward={props.levelData.currentStaffReward}
							name={'currentStaffReward'}
							onChange={props.onGenericChange}
						/>
					</Col>
				</Form.Row>
				<EXPSelect
					class={'level'}
					currentEXP={props.levelData.currentEXP}
					currentEXPMultiplier={props.levelData.currentEXPMultiplierValue}
					onInputChange={props.onInputChange}
					onMultiplierChange={props.onGenericChange}
				/>
				<Form.Row>
					<Col>
						<Form.Group controlId='currentLevelAP'>
							<Form.Label column='sm'>AP: </Form.Label>
							<Form.Control
								size='sm'
								name='currentLevelAP'
								type='number'
								value={props.levelData.currentLevelAP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentLevelDefense'>
							<Form.Label column='sm'>Defense: </Form.Label>
							<Form.Control
								size='sm'
								name='currentLevelDefense'
								type='number'
								value={props.levelData.currentLevelDefense}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentLevelStrength'>
							<Form.Label column='sm'>Strength: </Form.Label>
							<Form.Control
								size='sm'
								name='currentLevelStrength'
								type='number'
								value={props.levelData.currentLevelStrength}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentLevelMagic'>
							<Form.Label column='sm'>Magic: </Form.Label>
							<Form.Control
								size='sm'
								name='currentLevelMagic'
								type='number'
								value={props.levelData.currentLevelMagic}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
			<LevelTable
				allLevels={props.levelData.currentDisplayData}
				onRowCheck={props.onRowCheck}
				checkAll={props.checkAll}
				selectAll={props.levelData.selectAll}
			/>
			<Button variant='outline-dark'
				name='replaceButton'
				onClick={props.onClick}
			>
				REPLACE
			</Button>
			{' '}
			<Button variant='outline-dark'
				name='vanillaButton'
				onClick={props.onClick}
			>
				VANILLA
			</Button>
		</div >
	)
}

export default LevelPage