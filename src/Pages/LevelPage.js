import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EXPSelect from '../Components/EXPSelect'
import LevelTable from '../Tables/LevelTable'
import HelpModal from '../Components/HelpModal'

function LevelPage(props) {
	const description = (
		<div id="levelPage">
			<h6>Level</h6>
			<p>
				The level page shows all of sora's levels, the exp required to reach them, and the rewards given based on dream weapon.
				From left to right, sword, shield, and staff rewards can all be individually selected for each level.
			</p>
			<h6>EXP and Stats</h6>
			<p>
				Levels do not measure increases in stats or EXP like bonus levels or forms do.
				Each row represents what Sora's status would look like at that sepcific level.
				For example, at level 18 on critical mode, Sora would have 68 AP, 12 Defense, 14 Magic, and 12 Strength.
				If all of those stats are set to 0 for level 18, then he will have 0 stats for that level.
				However, if level 19 is unmodified, Sora will return to what his level 19 status should be, which is 71 AP, 13 Defense, 14 Magic, and 12 Strength.
				This can lead to interesting results.
				Additonaly, AP entered is based on standard mode.
				The game does a specific calculation to give critical mode AP for each level.
				The calculation is equivalent to Critical AP = ((Standard AP - 2) * 1.5) + 50 rounded down.
				Experience also works in a similar way measuring the TOTAL amount of experience to reach the next level.
				So while it takes 10618 TOTAL experience to reach level 19, only 1804 ADDITONAL EXP is required to level up after reaching level 18.
			</p>
			<h6>Why Am I Red?</h6>
			<p>
				Levels shouldn't turn red, just make sure everything is being submitted as expected.
			</p>
		</div>
	)

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
				<EXPSelect
					class={'level'}
					currentEXP={props.fieldData.currentEXP}
					currentEXPMultiplier={props.fieldData.currentEXPMultiplierValue}
					onInputChange={props.onInputChange}
					onMultiplierChange={props.onSelectChange}
				/>
				<Form.Row>
					<Col>
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
					<Col>
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
					<Col>
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
					<Col>
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
			<HelpModal
				page={'Level'}
				description={description}
			/>
		</div >
	)
}

export default LevelPage