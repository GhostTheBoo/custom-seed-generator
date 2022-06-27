import { React } from 'react'
import { Form, Row, Col, Button, Card } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function BonusForm(props) {
	// PROPS:
	// bonusReward: current reward being editted -> bonusReward
	// setCurrentBonusFightSlot: set current bonus reward -> function

	function setCurrentRewardA(newValue) { props.setCurrentBonusFieldData('rewardA', newValue) }
	function setCurrentRewardB(newValue) { props.setCurrentBonusFieldData('rewardB', newValue) }
	function setCurrentCharacter(newValue) { props.setCurrentBonusFieldData('currentCharacter', newValue) }
	function setCurrentHP(newValue) { props.setCurrentBonusFieldData('currentBonusHP', newValue) }
	function setCurrentMP(newValue) { props.setCurrentBonusFieldData('currentBonusMP', newValue) }
	function setCurrentArmorSlot(newValue) { props.setCurrentBonusFieldData('currentArmor', newValue) }
	function setCurrentAccessorySlot(newValue) { props.setCurrentBonusFieldData('currentAccessory', newValue) }
	function setCurrentItemSlot(newValue) { props.setCurrentBonusFieldData('currentItem', newValue) }
	function setCurrentDriveGauge(newValue) { props.setCurrentBonusFieldData('currentDrive', newValue) }

	let characterList = [
		'Vanilla',
		'Sora/Roxas',
		'Donald',
		'Goofy',
		'Mickey',
		'Auron',
		'Ping/Mulan',
		'Aladdin',
		'Jack Sparrow',
		'Beast',
		'Jack Skellington',
		'Simba',
		'Tron',
		'Riku'
	]

	let characterOptionList = characterList.map((item, index) => {
		return (
			<option key={index} value={index}>{item}</option>
		)
	})

	return (
		<Card
			border='dark'
			bg='dark'
			className='equipmentFormCard'
			style={{ margin: '10px', textAlign: 'center' }}
		>
			<Card.Body>
				<Card.Text as='div'>
					<Row>
						<Col xs={11}>
							<h1>EDITING SLOT {props.currentSlotNumber + 1}:</h1>
						</Col>
						<Col xs={1}>
							<button
								className='close'
								onClick={() => props.closeFormCard(-1)}
							>
								x
							</button>
						</Col>
					</Row>
					<hr />
					<Form>
						<Form.Row>
							<Form.Label column='lg' xs={4}>
								Reward A:
							</Form.Label>
							<Col xs={4}>
								<Icon
									style={{ margin: '10px' }}
									fileName={props.currentBonusFieldData.rewardA.iconType}
									type={'row'}
								>
									{props.currentBonusFieldData.rewardA.reward}
								</Icon>
							</Col>
							<Col xs={4}>
								<RewardSelector
									onReplace={(replacementReward) => setCurrentRewardA(replacementReward)}
								/>
							</Col>
						</Form.Row>
						<Form.Row>
							<Form.Label column='lg' xs={4}>
								Reward B:
							</Form.Label>
							<Col xs={4}>
								<Icon
									fileName={props.currentBonusFieldData.rewardB.iconType}
									type={'row'}
								>
									{props.currentBonusFieldData.rewardB.reward}
								</Icon>
							</Col>
							<Col xs={4}>
								<RewardSelector
									onReplace={(replacementReward) => setCurrentRewardB(replacementReward)}
								/>
							</Col>
						</Form.Row>
						<Form.Row>
							<Form.Label column='lg' xs={4}>
								Character:
							</Form.Label>
							<Col>
								<Form.Control
									name={'Character'}
									size='lg'
									as='select'
									value={props.currentBonusFieldData.currentCharacter}
									onChange={(e) => setCurrentCharacter(parseInt(e.target.value))}
								>
									{characterOptionList}
								</Form.Control>
							</Col>
						</Form.Row>
						<hr />
						<Form.Row>
							<Form.Label column='lg' xs={4}>
								HP Increase:
							</Form.Label>
							<Col>
								<Form.Control
									name={'HP'}
									size='lg'
									type='number'
									value={props.currentBonusFieldData.currentBonusHP}
									onChange={(e) => setCurrentHP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
									min='0'
									max='255'
								/>
							</Col>
						</Form.Row>
						<Form.Row>
							<Form.Label column='lg' xs={4}>
								MP Increase:
							</Form.Label>
							<Col>
								<Form.Control
									name={'MP'}
									size='lg'
									type='number'
									value={props.currentBonusFieldData.currentBonusMP}
									onChange={(e) => setCurrentMP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
									min='0'
									max='255'
								/>
							</Col>
						</Form.Row>
						<hr />
						<Form.Row>
							<Form.Label column='lg' xs={4}>
								Armor Slot Increase:
							</Form.Label>
							<Col>
								<Form.Control
									name={'ArmorSlot'}
									size='lg'
									type='number'
									value={props.currentBonusFieldData.currentArmor}
									onChange={(e) => setCurrentArmorSlot(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
									min='0'
									max='255'
								/>
							</Col>
						</Form.Row>
						<Form.Row>
							<Form.Label column='lg' xs={4}>
								Accessory Slot Increase:
							</Form.Label>
							<Col>
								<Form.Control
									name={'AccessorySlot'}
									size='lg'
									type='number'
									value={props.currentBonusFieldData.currentAccessory}
									onChange={(e) => setCurrentAccessorySlot(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
									min='0'
									max='255'
								/>
							</Col>
						</Form.Row>
						<Form.Row>
							<Form.Label column='lg' xs={4}>
								Item Slot Increase:
							</Form.Label>
							<Col>
								<Form.Control
									name={'ItemSlot'}
									size='lg'
									type='number'
									value={props.currentBonusFieldData.currentItem}
									onChange={(e) => setCurrentItemSlot(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
									min='0'
									max='255'
								/>
							</Col>
						</Form.Row>
						<Form.Row>
							<Form.Label column='lg' xs={4}>
								Drive Gauge Increase:
							</Form.Label>
							<Col>
								<Form.Control
									name={'DriveGauge'}
									size='lg'
									type='number'
									value={props.currentBonusFieldData.currentDrive}
									onChange={(e) => setCurrentDriveGauge(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
									min='0'
									max='255'
								/>
							</Col>
						</Form.Row>
						<br />
						<Form.Row>
							<Col>
								<Button
									variant='secondary'
									block
									onClick={() => props.setCurrentBonusFightSlot(props.bonusReward.vanilla())}
								>
									VANILLA
								</Button>
							</Col>
							<Col>
								<Button
									block
									onClick={() => props.setCurrentBonusFightSlot(props.bonusReward.replace(props.currentBonusFieldData))}
								>
									CONFIRM
								</Button>
							</Col>
						</Form.Row>
					</Form>
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default BonusForm