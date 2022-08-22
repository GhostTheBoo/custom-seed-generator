import { React, useState } from 'react'
import { Row, Container, Col } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import StartingStuffList from './StartingStuffList'
import StartingStatsForm from './StartingStatsForm'
import { EMPTY } from '../rewards/RewardsData'

function StartingStatusPage(props) {
	const [currentCharacter, setCurrentCharacter] = useState(0)
	const [currentStartingStatusFieldData, setCurrentStartingStatusFieldData] = useState({
		currentHP: props.startingStatusData[0].hp,
		currentMP: props.startingStatusData[0].mp,
		currentAP: props.startingStatusData[0].ap,
		currentArmor: props.startingStatusData[0].armorSlots,
		currentAccessory: props.startingStatusData[0].accessorySlots,
		currentItem: props.startingStatusData[0].itemSlots
	})

	function handleCharacterChange(newCharacter) {
		setCurrentStartingStatusFieldData({
			currentHP: props.startingStatusData[newCharacter].hp,
			currentMP: props.startingStatusData[newCharacter].mp,
			currentAP: props.startingStatusData[newCharacter].ap,
			currentArmor: props.startingStatusData[newCharacter].armorSlots,
			currentAccessory: props.startingStatusData[newCharacter].accessorySlots,
			currentItem: props.startingStatusData[newCharacter].itemSlots
		})
		setCurrentCharacter(newCharacter)
	}
	function handleStartingRewardReplace(newReward, rewardIndex) {
		let newRewardList = props.startingStatusData[currentCharacter].startingStuff.map((startingThing, index) => {
			if (rewardIndex === index) return { ...newReward }
			return startingThing
		})
		updateStartingStatus(props.startingStatusData[currentCharacter].replaceStartingStuffs(newRewardList))
	}
	function updateStartingStatus(newStartingStatus) {
		let newAllStartingStatusData = props.startingStatusData.map((character, index) => {
			if (currentCharacter === index) return newStartingStatus
			return character
		})
		props.setAllStartingStatus(newAllStartingStatusData)
	}

	return (
		<Container fluid>
			<Row style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
				<Col xs={3}>
					<GenericSelect
						class={'startingStatus'}
						selector={'Character'}
						itemList={props.startingStatusData.map(character => { return character.getCharacter() })}
						name={'currentCharacter'}
						currentItem={currentCharacter}
						onChange={(e) => handleCharacterChange(parseInt(e.target.value))}
					/>
				</Col>
				<Col xs={7} />
				<Col xs={2}>
					{props.children}
				</Col>
			</Row>
			<Row>
				<Col xs={8}>
					<StartingStuffList
						dataList={props.startingStatusData[currentCharacter].startingStuff}
						handleReplace={handleStartingRewardReplace}
						handleDelete={(rewardIndex) => handleStartingRewardReplace(EMPTY, rewardIndex)}
						handleAdd={(newReward) => handleStartingRewardReplace(newReward, 31)}
					/>
				</Col>
				<Col xs={4}>
					<StartingStatsForm
						startingStats={props.startingStatusData[currentCharacter]}
						startingStatusFieldData={currentStartingStatusFieldData}
						setCurrentStartingStatusFieldData={(fieldName, newValue) => setCurrentStartingStatusFieldData({ ...currentStartingStatusFieldData, [fieldName]: newValue })}
						handleReplace={() => updateStartingStatus(props.startingStatusData[currentCharacter].replaceStartingStats(currentStartingStatusFieldData))}
						handleVanilla={() => updateStartingStatus(props.startingStatusData[currentCharacter].vanillaStartingStats())}
					/>
				</Col>
			</Row>
		</Container>
	)
}

export default StartingStatusPage