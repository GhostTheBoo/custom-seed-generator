import { React } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import Icon from '../Components/Icon'

function BonusCard(props) {
	// PROPS:
	// bonusReward: bonus reward for selected fight -> Bonus
	// isEditting
	// slotIndex
	//// currentBonusFightSlot: current reward being editted -> number
	// setCurrentBonusFightSlot: set reward to start editting -> function

	function updateCurrentBonusFightSlot() {
		props.setCurrentBonusFightSlot(props.slotIndex)
	}

	let rewardList = []

	if (props.bonusReward.hpIncrease !== 0)
		rewardList.push(<Row key='bonusHP' className='bonusReward'>Maximum HP Increased by {props.bonusReward.hpIncrease}!</Row>)
	if (props.bonusReward.mpIncrease !== 0)
		rewardList.push(<Row key='bonusMP' className='bonusReward'>Maximum MP Increased by {props.bonusReward.mpIncrease}!</Row>)
	if (props.bonusReward.replacementRewardA.index !== 0x000)
		rewardList.push(
			<Row key='bonusRewardA' className='bonusReward'>
				<Icon
					fileName={props.bonusReward.replacementRewardA.iconType}
					type={'row'}
				>
					{props.bonusReward.replacementRewardA.reward + '!'}
				</Icon>
			</Row>
		)
	if (props.bonusReward.replacementRewardB.index !== 0x000)
		rewardList.push(
			<Row key='bonusRewardB' className='bonusReward'>
				<Icon
					fileName={props.bonusReward.replacementRewardB.iconType}
					type={'row'}
				>
					{props.bonusReward.replacementRewardB.reward + '!'}
				</Icon>
			</Row>
		)
	if (props.bonusReward.armorSlotIncrease !== 0)
		rewardList.push(<Row key='bonusArmor' className='bonusReward'>Gained {props.bonusReward.armorSlotIncrease} Armor Slot(s)!</Row>)
	if (props.bonusReward.accessorySlotIncrease !== 0)
		rewardList.push(<Row key='bonusAccessory' className='bonusReward'>Gained {props.bonusReward.accessorySlotIncrease} Accessory Slot(s)!</Row>)
	if (props.bonusReward.itemSlotIncrease !== 0)
		rewardList.push(<Row key='bonusItem' className='bonusReward'>Gained {props.bonusReward.itemSlotIncrease} Item Slot(s)!</Row>)
	if (props.bonusReward.driveGaugeIncrease !== 0)
		rewardList.push(<Row key='bonusDrive' className='bonusReward'>Drive Gauge Increased by {props.bonusReward.driveGaugeIncrease}!</Row>)

	let colors = [
		{
			characterName: 'Sora',
			cardColor: 'red',
			buttonType: 'danger',
			buttonTextColor: 'pink'
		},
		{
			characterName: 'Donald',
			cardColor: 'blue',
			buttonType: 'primary',
			buttonTextColor: 'lightblue'
		},
		{
			characterName: 'Goofy',
			cardColor: 'green',
			buttonType: 'success',
			buttonTextColor: 'lightgreen'
		},
		{
			characterName: 'Other',
			cardColor: 'orange',
			buttonType: 'warning',
			buttonTextColor: 'yellow'
		},
	]

	let currentColor = props.bonusReward.replacementCharacter > 3
		? colors[3]
		: colors[props.bonusReward.replacementCharacter - 1]

	return (
		<Card
			className='bonusCard'
			style={{ borderColor: currentColor.cardColor, margin: '10px' }}
		>
			<Card.Header
				className='bonusCardHeader'
				style={{ backgroundColor: currentColor.cardColor }}
			>
				<Container fluid>
					<Row>
						<Col xs={6}>
							<Button
								variant={currentColor.buttonType}
								disabled={props.isEditting}
								className='getBonus'
								style={{ color: currentColor.buttonTextColor }}
								// style={{ color: props.isEditting ? 'black' : currentColor.buttonTextColor }}
								onClick={() => updateCurrentBonusFightSlot()}
							>
								{props.isEditting ? 'EDITTING...' : 'EDIT BONUS!'}
							</Button>
						</Col>
						<Col xs={6}>
							<div className='bonusCharacterName'>
								{props.bonusReward.replacementCharacterString}
							</div>
						</Col>
					</Row>
				</Container>
			</Card.Header>
			<Card.Body>
				<Card.Title>
					<Container fluid>
						<Row>
							<Col>
								<Container fluid>
									{rewardList}
								</Container>
							</Col>
						</Row>
					</Container>
				</Card.Title>
			</Card.Body>
		</Card>
	)
}

export default BonusCard