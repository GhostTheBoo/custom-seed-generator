import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

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
							onChange={props.onSelectChange}
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
							onChange={props.onSelectChange}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
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
				currentFight={props.fieldData.currentFight}
				bonuses={props.bonusData.bonusFights}
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

export default BonusPage