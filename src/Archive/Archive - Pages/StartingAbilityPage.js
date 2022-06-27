import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

import GenericSelect from '../../Components/GenericSelect'
import RewardSelect from '../../Components/RewardSelect'
import RewardTypeSelect from '../../Components/RewardTypeSelect'
import Icon from '../../Components/Icon'
import StartingAbilityTable from '../Tables/StartingAbilityTable'

function StartingAbilityPage(props) {
	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col xs='4'>
						<GenericSelect
							class={'startingAbility'}
							selector={'Character'}
							itemList={['Sora (Critical Mode)', 'Donald', 'Goofy']}
							name={'currentCharacter'}
							currentItem={props.fieldData.currentCharacter}
							onChange={props.handleCharacterChange}
						/>
					</Col>
					<Col xs='4'>
						<RewardTypeSelect
							class={'startingAbility'}
							currentRewardType={props.fieldData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col xs='4'>
						<RewardSelect
							class={'startingAbility'}
							rewardList={props.rewardList}
							currentReward={props.fieldData.currentReward}
							name={'currentReward'}
							label={'Reward'}
							onChange={props.onAbilityRewardChange}
						/>
					</Col>
				</Form.Row>
			</Form>
			<StartingAbilityTable
				allStartingAbilities={props.startingAbilityData.abilities}
				onRowCheck={props.onRowCheck}
				onCheckAll={props.onCheckAll}
				selectAll={props.fieldData.selectAll}
			/>
			<Form>
				<Form.Row>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.keybladeList}
							currentReward={props.fieldData.currentKeyblade}
							name={'currentKeyblade'}
							label={'Starting Keyblade'}
							onChange={props.onStatusRewardChange}
						/>
						{/* <Form.Label column='sm'>{props.startingStatusData.keyblade.reward}</Form.Label> */}
						<Form.Label column='sm'>
							<Icon
								fileName={props.startingStatusData.keyblade.iconType}
								displayText={props.startingStatusData.keyblade.reward}
								type={'row'}
							/>
						</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.armorList}
							currentReward={props.fieldData.currentArmor}
							name={'currentArmor'}
							label={'Starting Armor'}
							onChange={props.onStatusRewardChange}
						/>
						{/* <Form.Label column='sm'>{props.startingStatusData.armor.reward}</Form.Label> */}
						<Form.Label column='sm'>
							<Icon
								fileName={props.startingStatusData.armor.iconType}
								displayText={props.startingStatusData.armor.reward}
								type={'row'}
							/>
						</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.accessoryList}
							currentReward={props.fieldData.currentAccessory}
							name={'currentAccessory'}
							label={'Starting Accessory'}
							onChange={props.onStatusRewardChange}
						/>
						{/* <Form.Label column='sm'>{props.startingStatusData.accessory.reward}</Form.Label> */}
						<Form.Label column='sm'>
							<Icon
								fileName={props.startingStatusData.accessory.iconType}
								displayText={props.startingStatusData.accessory.reward}
								type={'row'}
							/>
						</Form.Label>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col>
						<Form.Group controlId='currentMunny'>
							<Form.Label column='sm'>Starting Munny: {props.startingStatusData.munny}</Form.Label>
							<Form.Control
								size='sm'
								name='currentMunny'
								type='number'
								value={props.fieldData.currentMunny}
								onChange={props.onInputChange}
								min="0"
								max="4294967295"
							/>
							{/* <Form.Label column='sm'>{props.startingStatusData.munny}</Form.Label> */}
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentStartingHP'>
							<Form.Label column='sm'>Starting HP: {props.startingStatusData.hp}</Form.Label>
							<Form.Control
								size='sm'
								name='currentStartingHP'
								type='number'
								value={props.fieldData.currentStartingHP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
							{/* <Form.Label column='sm'>{props.startingStatusData.hp}</Form.Label> */}
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentStartingMP'>
							<Form.Label column='sm'>Starting MP: {props.startingStatusData.mp}</Form.Label>
							<Form.Control
								size='sm'
								name='currentStartingMP'
								type='number'
								value={props.fieldData.currentStartingMP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
							{/* <Form.Label column='sm'>{props.startingStatusData.mp}</Form.Label> */}
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
			<Container fluid>
				<Row xs='4'>
					<Col xl='2'>
						<Button
							variant='outline-light'
							block
							name='replaceButton'
							onClick={props.onClick}
						>
							REPLACE
							</Button>
					</Col>
					<Col xl='2'>
						<Button
							variant='outline-light'
							block
							name='vanillaButton'
							onClick={props.onClick}
						>
							VANILLA
							</Button>
					</Col>
					{props.children}
				</Row>
			</Container>
		</div>
	)
}

export default StartingAbilityPage