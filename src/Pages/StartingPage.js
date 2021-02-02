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
			<h6>Why Am I red?</h6>
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
							currentReward={props.startingStatusData.currentKeyblade}
							name={'currentKeyblade'}
							label={'Starting Keyblade'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingKeyblade.reward}</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.armorList}
							currentReward={props.startingStatusData.currentArmor}
							name={'currentArmor'}
							label={'Starting Armor'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingArmor.reward}</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.accessoryList}
							currentReward={props.startingStatusData.currentAccessory}
							name={'currentAccessory'}
							label={'Starting Accessory'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingAccessory.reward}</Form.Label>
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
								value={props.startingStatusData.currentMunny}
								onChange={props.onInputChange}
								min="0"
								max="4294967295"
							/>
							<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingMunny}</Form.Label>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentStartingHP'>
							<Form.Label column='sm'>Starting HP: </Form.Label>
							<Form.Control
								size='sm'
								name='currentStartingHP'
								type='number'
								value={props.startingStatusData.currentStartingHP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
							<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingHP}</Form.Label>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentStartingMP'>
							<Form.Label column='sm'>Starting MP: </Form.Label>
							<Form.Control
								size='sm'
								name='currentStartingMP'
								type='number'
								value={props.startingStatusData.currentStartingMP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
							<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingMP}</Form.Label>
						</Form.Group>
					</Col>
				</Form.Row>
				<br></br>
				<Form.Row>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.donaldList}
							currentReward={props.startingStatusData.currentDonald1}
							name={'currentDonald1'}
							label={'Donald\'s First Starting Ability'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingDonald1.reward}</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.donaldList}
							currentReward={props.startingStatusData.currentDonald2}
							name={'currentDonald2'}
							label={'Donald\'s Second Starting Ability'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingDonald2.reward}</Form.Label>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.goofyList}
							currentReward={props.startingStatusData.currentGoofy1}
							name={'currentGoofy1'}
							label={'Goofy\'s First Starting Ability'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingGoofy1.reward}</Form.Label>
					</Col>
					<Col>
						<RewardSelect
							class={'startingStatus'}
							rewardList={props.goofyList}
							currentReward={props.startingStatusData.currentGoofy2}
							name={'currentGoofy2'}
							label={'Goofy\'s Second Starting Ability'}
							onChange={props.onRewardChange}
						/>
						<Form.Label column='sm'>{props.startingStatusData.startingStatusData.startingGoofy2.reward}</Form.Label>
					</Col>
				</Form.Row>
				<br></br>
			</Form>
			<Button variant='outline-dark'
				name='replaceButton'
				onClick={props.onClick}
			>
				APPLY
			</Button>
			{' '}
			<Button variant='outline-dark'
				name='vanillaButton'
				onClick={props.onClick}
			>
				VANILLA
			</Button>
			<HelpModal
				page={'Cheat'}
				description={description}
			/>
		</div >
	)
}

export default StartingPage