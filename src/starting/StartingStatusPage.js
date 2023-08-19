import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './StartingStatusStyles.css'

import GenericSelect from '../Components/GenericSelect'
import StartingStuffList from './StartingStuffList'
import StartingStatsForm from './StartingStatsForm'
import { EMPTY } from '../rewards/RewardsData'

function StartingStatusPage(props) {
	const [currentCharacter, setCurrentCharacter] = useState(0)
	const [currentFocus, setCurrentFocus] = useState('')

	function handleCharacterChange(newCharacter) {
		setCurrentCharacter(newCharacter)
		setCurrentFocus('')
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
			<motion.div
				initial={{ opacity: .25, x: 100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ type: 'spring', duration: .5 }}
				className='pageHeader'
			>
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
			</motion.div>
			<AnimatePresence mode='popLayout'>
				<motion.div
					initial={{ opacity: .25, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, y: 100 }}
					transition={{ type: 'spring', duration: .5 }}
					key={`startingStatus${currentCharacter}`}
					className='startingStatusPageContent'
				>
					<StartingStatsForm
						startingStats={props.startingStatusData[currentCharacter]}
						currentFocus={currentFocus}
						updateFocus={setCurrentFocus}
						updateRow={(newStartingStats) => updateStartingStatus(props.startingStatusData[currentCharacter].replaceStartingStats(newStartingStats))}
					/>
					<StartingStuffList
						dataList={props.startingStatusData[currentCharacter].startingStuff}
						handleReplace={handleStartingRewardReplace}
						handleDelete={(rewardIndex) => handleStartingRewardReplace(EMPTY, rewardIndex)}
						handleAdd={(newReward) => handleStartingRewardReplace(newReward, 31)}
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default StartingStatusPage