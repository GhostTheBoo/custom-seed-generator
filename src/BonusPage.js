import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { worldsData, charactersData } from './Data/typesData'

import GenericSelect from './Components/GenericSelect'
import RewardSelect from './Components/RewardSelect'
import RewardTypeSelect from './Components/RewardTypeSelect'
import BonusTable from './Components/BonusTable'
import Buttons from './Components/Buttons'

function BonusPage(props) {
	return (
		<div>
			<Form>
				<Form.Row>
					<GenericSelect
						class='bonus'
						selector={'World'}
						itemList={worldsData}
						name={'currentWorld'}
						currentItem={props.bonusData.currentWorld}
						onChange={props.handleWorldChange}
					/>
					<GenericSelect
						class='bonus'
						selector={'Character'}
						itemList={charactersData}
						name={'currentCharacter'}
						currentItem={props.bonusData.currentCharacter}
						onChange={props.handleCharacterChange}
					/>
				</Form.Row>
				<Form.Row>
					<Col>
						<RewardTypeSelect
							class={'bonus'}
							currentRewardType={props.bonusData.currentRewardType}
							name={'currentARewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={'bonus'}
							rewardList={props.rewardListA}
							currentReward={props.bonusData.currentReward}
							name={'currentAReward'}
							onChange={props.onRewardChange}
						/>
					</Col>
					<Col>
						<RewardTypeSelect
							class={'bonus'}
							currentRewardType={props.bonusData.currentRewardType}
							name={'currentBRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={'bonus'}
							rewardList={props.rewardListB}
							currentReward={props.bonusData.currentReward}
							name={'currentBReward'}
							onChange={props.onRewardChange}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col xl='2'>
						<Form.Group controlId='currentHP'>
							<Form.Label column='sm'>HP Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentHP'
								type='number'
								value={props.bonusData.currentHP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col xl='2'>
						<Form.Group controlId='currentMP'>
							<Form.Label column='sm'>MP Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentMP'
								type='number'
								value={props.bonusData.currentMP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col xl='2'>
						<Form.Group controlId='currentArmor'>
							<Form.Label column='sm'>Armor Slot Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentArmor'
								type='number'
								value={props.bonusData.currentArmor}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col xl='2'>
						<Form.Group controlId='currentAccessory'>
							<Form.Label column='sm'>Accessory Slot Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentAccessory'
								type='number'
								value={props.bonusData.currentAccessory}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col xl='2'>
						<Form.Group controlId='currentItem'>
							<Form.Label column='sm'>Item Slot Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentItem'
								type='number'
								value={props.bonusData.currentItem}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col xl='2'>
						<Form.Group controlId='currentDrive'>
							<Form.Label column='sm'>Drive Gauge Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentDrive'
								type='number'
								value={props.bonusData.currentDrive}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
			<BonusTable
				currentWorld={worldsData[props.bonusData.currentWorld]}
				currentCharacter={charactersData[props.bonusData.currentCharacter]}
				bonuses={props.bonusData.currentDisplayData}
				onRowCheck={props.onRowCheck}
				checkAll={props.checkAll}
				selectAll={props.bonusData.selectAll}
			/>
			<Buttons
				onClick={props.handleReplace}
				onSaveClick={props.handleSave}
			/>
		</div >
	)
}

export default BonusPage