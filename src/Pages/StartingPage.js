import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import RewardSelect from '../Components/RewardSelect'
import HelpModal from '../Components/HelpModal'

function StartingPage(props) {
	const description = (
		<div id="startingPage">
			<h6>Starting Status</h6>
			<p>
				Select a starting equipment from the dropdowns for keyblade, armor, and accessory.
				There is no starting armor or accessory in the vanilla game so their default is just EMPTY.
				Select the values for Munny, HP, and MP.
				Defaults are 0, 20, and 100.
				Select Apply to use the inputted starting status.
				Select Vanilla to not change any starting status.
			</p>
			<h6>Why Am I Red?</h6>
			<p>
				Starting status is either changed or left Vanilla.
				Nothing can be red.
			</p>
		</div>
	)

	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.keybladeList}
							currentReward={props.fieldData.currentKeyblade}
							name={'currentKeyblade'}
							label={'Starting Keyblade'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.keyblade.reward}</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.armorList}
							currentReward={props.fieldData.currentArmor}
							name={'currentArmor'}
							label={'Starting Armor'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.armor.reward}</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.accessoryList}
							currentReward={props.fieldData.currentAccessory}
							name={'currentAccessory'}
							label={'Starting Accessory'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.accessory.reward}</Form.Label>
					</Col>
				</Form.Row>
				<br></br>
				<Form.Row>
					<Col>
						<Form.Group controlId='currentMunny'>
							<Form.Label column='sm'>Starting Munny: </Form.Label>
							<Form.Control
								size='sm'
								name='currentMunny'
								type='number'
								value={props.fieldData.currentMunny}
								onChange={props.onInputChange}
								min="0"
								max="4294967295"
							/>
							<Form.Label column='sm'>{props.startingStatusData.munny}</Form.Label>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentStartingHP'>
							<Form.Label column='sm'>Starting HP: </Form.Label>
							<Form.Control
								size='sm'
								name='currentStartingHP'
								type='number'
								value={props.fieldData.currentStartingHP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
							<Form.Label column='sm'>{props.startingStatusData.hp}</Form.Label>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentStartingMP'>
							<Form.Label column='sm'>Starting MP: </Form.Label>
							<Form.Control
								size='sm'
								name='currentStartingMP'
								type='number'
								value={props.fieldData.currentStartingMP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
							<Form.Label column='sm'>{props.startingStatusData.mp}</Form.Label>
						</Form.Group>
					</Col>
				</Form.Row>
				<br></br>
				<Form.Row>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.donaldList}
							currentReward={props.fieldData.currentDonald1}
							name={'currentDonald1'}
							label={'Donald\'s First Starting Ability'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.donald1.reward}</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.donaldList}
							currentReward={props.fieldData.currentDonald2}
							name={'currentDonald2'}
							label={'Donald\'s Second Starting Ability'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.donald2.reward}</Form.Label>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.goofyList}
							currentReward={props.fieldData.currentGoofy1}
							name={'currentGoofy1'}
							label={'Goofy\'s First Starting Ability'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.goofy1.reward}</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.goofyList}
							currentReward={props.fieldData.currentGoofy2}
							name={'currentGoofy2'}
							label={'Goofy\'s Second Starting Ability'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.goofy2.reward}</Form.Label>
					</Col>
				</Form.Row>
				<br></br>
			</Form>
			<div>
				<Button
					variant='outline-light'
					name='replaceButton'
					onClick={props.onClick}
				>
					APPLY
			</Button>
				{' '}
				<Button
					variant='outline-light'
					name='vanillaButton'
					onClick={props.onClick}
				>
					VANILLA
			</Button>
			</div>
			<HelpModal
				page={'Cheat'}
				description={description}
			/>
		</div>
	)
}

export default StartingPage