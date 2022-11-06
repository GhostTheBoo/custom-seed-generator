import { React, useState } from 'react'
import './StartingStatusStyles.css'

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
		<div className='fullPageContent'>
			<div className='pageHeader'>
				<div className='pageHeaderSelectorLabel'>
					Character Selector:
				</div>
				<div>
					<GenericSelect
						class={'startingStatus'}
						selector={'Character'}
						itemList={props.startingStatusData.map(character => { return character.getCharacter() })}
						name={'currentCharacter'}
						currentItem={currentCharacter}
						onChange={(e) => handleCharacterChange(parseInt(e.target.value))}
					/>
				</div>
				<div className='flex-grow-1' />
				<div>{props.children}</div>
			</div>
			<div className='startingStatusPageContent'>
				<StartingStatsForm
					startingStats={props.startingStatusData[currentCharacter]}
					startingStatusFieldData={currentStartingStatusFieldData}
					setCurrentStartingStatusFieldData={(fieldName, newValue) => setCurrentStartingStatusFieldData({ ...currentStartingStatusFieldData, [fieldName]: newValue })}
					handleReplace={() => updateStartingStatus(props.startingStatusData[currentCharacter].replaceStartingStats(currentStartingStatusFieldData))}
					handleVanilla={() => updateStartingStatus(props.startingStatusData[currentCharacter].vanillaStartingStats())}
				/>
				<StartingStuffList
					dataList={props.startingStatusData[currentCharacter].startingStuff}
					handleReplace={handleStartingRewardReplace}
					handleDelete={(rewardIndex) => handleStartingRewardReplace(EMPTY, rewardIndex)}
					handleAdd={(newReward) => handleStartingRewardReplace(newReward, 31)}
				/>
			</div>
		</div>
	)
}

export default StartingStatusPage