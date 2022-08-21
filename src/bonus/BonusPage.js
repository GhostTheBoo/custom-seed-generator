import { React, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'

import BonusFightList from './BonusFightList'
import BonusCard from './BonusCard'
import BonusForm from './BonusForm'

function BonusPage(props) {
	// PROPS:
	// bonusData: array of world's bonus fights -> {world, bonusFight[]}[]
	// setAllBonuses: parent state function to set all bonuses -> function

	const [currentWorld, setCurrentWorld] = useState(0)
	const [currentBonusFight, setCurrentBonusFight] = useState(0)
	const [currentBonusFightSlot, setCurrentBonusFightSlot] = useState(-1)
	const [currentBonusFieldData, setCurrentBonusFieldData] = useState({
		rewardA: { ...props.bonusData[0].bonusFights[0].slots[0].replacementRewardA },
		rewardB: { ...props.bonusData[0].bonusFights[0].slots[0].replacementRewardB },
		currentCharacter: props.bonusData[0].bonusFights[0].slots[0].replacementCharacter,
		currentBonusHP: props.bonusData[0].bonusFights[0].slots[0].hpIncrease,
		currentBonusMP: props.bonusData[0].bonusFights[0].slots[0].mpIncrease,
		currentArmor: props.bonusData[0].bonusFights[0].slots[0].armorSlotIncrease,
		currentAccessory: props.bonusData[0].bonusFights[0].slots[0].accessorySlotIncrease,
		currentItem: props.bonusData[0].bonusFights[0].slots[0].itemSlotIncrease,
		currentDrive: props.bonusData[0].bonusFights[0].slots[0].driveGaugeIncrease
	})

	function handleWorldChange(newWorld) {
		setCurrentWorld(newWorld)
		handleBonusFightChange(0)
	}
	function handleBonusFightChange(newBonusFight) {
		setCurrentBonusFight(newBonusFight)
		handleBonusFightSlotChange(-1)
	}
	function handleBonusFightSlotChange(newBonusFightSlot) {
		setCurrentBonusFightSlot(newBonusFightSlot)
	}
	function updateCurrentBonusFieldData(currentWorld, currentBonusFight, currentBonusFightSlot) {
		setCurrentBonusFieldData({
			rewardA: { ...props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot].replacementRewardA },
			rewardB: { ...props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot].replacementRewardB },
			currentCharacter: props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot].replacementCharacter,
			currentBonusHP: props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot].hpIncrease,
			currentBonusMP: props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot].mpIncrease,
			currentArmor: props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot].armorSlotIncrease,
			currentAccessory: props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot].accessorySlotIncrease,
			currentItem: props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot].itemSlotIncrease,
			currentDrive: props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot].driveGaugeIncrease
		})
	}
	function updateCurrentBonusFightSlot(newBonusReward) {
		props.setAllBonuses(props.bonusData.map((world, worldIndex) => {
			if (worldIndex === currentWorld) {
				let newBonusFights = world.bonusFights.map((bonusFight, bonusFightIndex) => {
					if (bonusFightIndex === currentBonusFight) {
						console.log(bonusFight)
						return bonusFight.update(newBonusReward, currentBonusFightSlot)
					}
					return bonusFight
				})
				return ({
					world: world.world,
					bonusFights: newBonusFights
				})
			}
			return world
		}))
		handleBonusFightSlotChange(-1)
		setCurrentBonusFieldData({
			rewardA: { ...newBonusReward.replacementRewardA },
			rewardB: { ...newBonusReward.replacementRewardB },
			currentCharacter: newBonusReward.replacementCharacter,
			currentBonusHP: newBonusReward.hpIncrease,
			currentBonusMP: newBonusReward.mpIncrease,
			currentArmor: newBonusReward.armorSlotIncrease,
			currentAccessory: newBonusReward.accessorySlotIncrease,
			currentItem: newBonusReward.itemSlotIncrease,
			currentDrive: newBonusReward.driveGaugeIncrease
		})
	}

	let bonusSlotList = props.bonusData[currentWorld].bonusFights[currentBonusFight].slots.map((slot, slotIndex) => {
		return (
			<BonusCard
				key={`BonusCard${currentWorld}${currentBonusFight}${slotIndex}`}
				bonusReward={slot}
				isEditing={slotIndex === currentBonusFightSlot}
				slotIndex={slotIndex}
				setCurrentBonusFightSlot={(newBonusFightSlot) => {
					handleBonusFightSlotChange(newBonusFightSlot)
					updateCurrentBonusFieldData(currentWorld, currentBonusFight, newBonusFightSlot)
				}}
			/>
		)
	})

	return (
		<Container fluid>
			<Row>
				<GenericSelect
					class={'bonus'}
					selector={'World'}
					itemList={props.bonusData.map(world => { return world.world })}
					name={'currentWorld'}
					currentItem={currentWorld}
					onChange={(e) => { handleWorldChange(parseInt(e.target.value)) }}
				/>
			</Row>
			<Row>
				<Col xs={3}>
					<BonusFightList
						fightList={props.bonusData[currentWorld].bonusFights}
						currentWorld={currentWorld}
						currentSelectItem={currentBonusFight}
						setCurrentSelectItem={(newBonusFight) => {
							handleBonusFightChange(newBonusFight)
						}}
					/>
				</Col>
				<Col
					xs={5}
					style={{ overflowY: 'auto', height: '800px' }}
				>
					{bonusSlotList}
				</Col>
				<Col xs={4}>
					{
						currentBonusFightSlot !== -1
							? <BonusForm
								currentSlotNumber={currentBonusFightSlot}
								currentBonusFieldData={currentBonusFieldData}
								setCurrentBonusFieldData={(fieldName, newValue) => setCurrentBonusFieldData({ ...currentBonusFieldData, [fieldName]: newValue })}
								bonusReward={props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot]}
								setCurrentBonusFightSlot={updateCurrentBonusFightSlot}
								closeFormCard={handleBonusFightSlotChange}
							/>
							: <></>
					}
				</Col>
			</Row>
		</Container>
	)
}

export default BonusPage