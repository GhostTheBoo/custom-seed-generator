import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { worldsData, charactersData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import BonusTable from '../Tables/BonusTable'
import HelpModal from '../Components/HelpModal'
// import { bonusData } from '../Data/newBonusData'

function BonusPage(props) {
	const description = (
		<div id="bonusPage">
			<h6>Bonus</h6>
			<p>
				The bonus page displays all bonus level rewards for each world and for each character.
				Bonus levels can rewward up to 2 rewards, stat increases, or slot increases.
				However only 2 individual rewards can be given to the player without causing any bugs.
			</p>
			<h6>Rewards</h6>
			<p>
				A bonus level can give 2 rewards.
				The rewards can be of any type.
				Selecting empty for either reward will result in no reward being given.
			</p>
			<h6>Stats and Slots</h6>
			<p>
				HP and MP can both increase on a bonus level.
				The increases are based on standard mode.
				Critical mode takes the stat values from standard mode and halves them.
				So a standard mode HP increase of 10 will be 5 in critical mode.
				Same applies for MP.
				Slots do not have this half applied.
				They can all increase by whatever value entered but the menu does not like having too many slots. (I believe the cap is 20 total slots)
				The drive gauge is also capped at 9 no matter how many increases given.
			</p>
			<h6>Why Am I Red?</h6>
			<p>
				Bonus levels only visually show 2 rewards.
				If more than 2 rewards are given, the bonus level may either secretly give the reward to the player or not give it to them at all.
			</p>
		</div>
	)

	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col>
						<GenericSelect
							class='bonus'
							selector={'World'}
							itemList={worldsData}
							name={'currentWorld'}
							currentItem={props.fieldData.currentWorld}
							onChange={props.handleWorldChange}
						/>
					</Col>
					<Col>
						<GenericSelect
							class='bonus'
							selector={'Fight'}
							itemList={props.bonusData.bonusFights.map(fight => {
								return fight.fight
							})}
							name={'currentFight'}
							currentItem={props.fieldData.currentFight}
							onChange={props.handleFightChange}
						/>
					</Col>
					<Col>
						<GenericSelect
							class='bonus'
							selector={'Character'}
							itemList={charactersData}
							name={'currentCharacter'}
							currentItem={props.fieldData.currentCharacter}
							onChange={props.onSelectChange}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col>
						<RewardTypeSelect
							label={'"A"'}
							class={'bonus'}
							currentRewardType={props.fieldData.currentARewardType}
							name={'currentARewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							label={'"A" Reward'}
							class={'bonus'}
							rewardList={props.rewardListA}
							currentReward={props.fieldData.currentAReward}
							name={'currentAReward'}
							onChange={props.onRewardChange}
						/>
					</Col>
					<Col>
						<RewardTypeSelect
							label={'"B"'}
							class={'bonus'}
							currentRewardType={props.fieldData.currentBRewardType}
							name={'currentBRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							label={'"B" Reward'}
							class={'bonus'}
							rewardList={props.rewardListB}
							currentReward={props.fieldData.currentBReward}
							name={'currentBReward'}
							onChange={props.onRewardChange}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col>
						<Form.Group controlId='currentBonusHP'>
							<Form.Label column='sm'>HP Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentBonusHP'
								type='number'
								value={props.fieldData.currentBonusHP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col >
						<Form.Group controlId='currentBonusMP'>
							<Form.Label column='sm'>MP Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentBonusMP'
								type='number'
								value={props.fieldData.currentBonusMP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col >
						<Form.Group controlId='currentArmor'>
							<Form.Label column='sm'>Armor Slot Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentArmor'
								type='number'
								value={props.fieldData.currentArmor}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col >
						<Form.Group controlId='currentAccessory'>
							<Form.Label column='sm'>Accessory Slot Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentAccessory'
								type='number'
								value={props.fieldData.currentAccessory}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col >
						<Form.Group controlId='currentItem'>
							<Form.Label column='sm'>Item Slot Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentItem'
								type='number'
								value={props.fieldData.currentItem}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col >
						<Form.Group controlId='currentDrive'>
							<Form.Label column='sm'>Drive Gauge Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentDrive'
								type='number'
								value={props.fieldData.currentDrive}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
			<BonusTable
				currentWorld={worldsData[props.fieldData.currentWorld]}
				currentCharacter={charactersData[props.fieldData.currentCharacter]}
				bonuses={props.bonusData.bonusFights[props.fieldData.currentFight]}
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
				page={'Bonus'}
				description={description}
			/>
		</div >
	)
}

export default BonusPage