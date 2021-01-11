import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { worldsData, charactersData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import BonusTable from '../Tables/BonusTable'

function BonusPage(props) {
	return (
		<div style={props.style}>
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
							label={'"A"'}
							class={'bonus'}
							currentRewardType={props.bonusData.currentRewardType}
							name={'currentARewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							label={'"A"'}
							class={'bonus'}
							rewardList={props.rewardListA}
							currentReward={props.bonusData.currentReward}
							name={'currentAReward'}
							onChange={props.onRewardChange}
						/>
					</Col>
					<Col>
						<RewardTypeSelect
							label={'"B"'}
							class={'bonus'}
							currentRewardType={props.bonusData.currentRewardType}
							name={'currentBRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							label={'"B"'}
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
						<Form.Group controlId='currentBonusHP'>
							<Form.Label column='sm'>HP Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentBonusHP'
								type='number'
								value={props.bonusData.currentBonusHP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col xl='2'>
						<Form.Group controlId='currentBonusMP'>
							<Form.Label column='sm'>MP Increase: </Form.Label>
							<Form.Control
								size='sm'
								name='currentBonusMP'
								type='number'
								value={props.bonusData.currentBonusMP}
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

export default BonusPage