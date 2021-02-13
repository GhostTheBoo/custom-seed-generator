import { React, useState } from 'react'

import { worldsData } from './Data/typesData'
import { rewardsData } from './Data/rewardsData'
// import { chestsData } from './Data/chestsData'
import * as Chest from './Data/chestsData'

import ChestPage from './Pages/newChestPage'

function FunctionApp() {
	const [currentChestWorld, setCurrentChestWorld] = useState(0)
	const [currentChestRewardType, setCurrentChestRewardType] = useState(0)
	const [currentChestReward, setCurrentChestReward] = useState(0)
	const [chestSelectAll, setChestSelectAll] = useState(false)
	const [allChests, setChests] = useState(Chest.chestsData)
	const [currentChestData, setCurrentChestData] = useState(Chest.chestsData[0].chests)

	function handleWorldChestChange(nextWorld) {
		let toBeStoredChests = currentChestData.map(chest => {
			Chest.markForReplacement(chest, false)
			return chest
		})
		let newAllChests = allChests.map((worldChestList, index) => {
			if (index === currentChestWorld)
				return {
					world: worldsData[index],
					chests: toBeStoredChests
				}
			return worldChestList
		})
		setChests(newAllChests)
		setCurrentChestData(newAllChests[nextWorld].chests)
		setCurrentChestWorld(nextWorld)
	}

	function handleChestReplace(buttonName) {
		let replacedChests
		if (buttonName === 'replaceButton')
			replacedChests = currentChestData.map(chest => {
				if (chest.toBeReplaced)
					Chest.replace(chest, rewardsData[currentChestRewardType].rewards[currentChestReward])
				return chest
			})
		else
			replacedChests = currentChestData.map(chest => {
				if (chest.toBeReplaced)
					Chest.vanilla(chest)
				return chest
			})
		setCurrentChestData(replacedChests)
		setChestSelectAll(false)
	}

	function onRowCheck(row) {
		let toggledChests = currentChestData.map((chest, index) => {
			if (index === parseInt(row))
				Chest.markForReplacement(chest, !chest.toBeReplaced)
			return chest
		})
		setCurrentChestData(toggledChests)
	}

	function checkAll() {
		let toBeReplacedObjects = currentChestData.map(chest => {
			Chest.markForReplacement(chest,!chestSelectAll )
			return chest
		})
		setCurrentChestData(toBeReplacedObjects)
		setChestSelectAll(!chestSelectAll)
	}

	let styles = {
		marginTop: '0',
		marginRight: '10px',
		marginBottom: '10px',
		marginLeft: '10px'
	}

	return (
		<div>
			<ChestPage
				style={styles}
				currentWorld={currentChestWorld}
				chestData={currentChestData}
				rewardList={rewardsData[currentChestRewardType].rewards}
				currentRewardType={currentChestRewardType}
				currentReward={currentChestReward}
				selectAll={chestSelectAll}
				handleWorldChange={(e) => handleWorldChestChange(e.target.value)}
				onRewardTypeChange={(e) => {
					setCurrentChestRewardType(e.target.value)
					setCurrentChestReward(0)
				}}
				onRewardChange={(e) => setCurrentChestReward(e.target.value)}
				onRowCheck={(e) => onRowCheck(e.target.value)}
				checkAll={() => checkAll()}
				onClick={(e) => handleChestReplace(e.target.name)}
			/>
		</div>
	)
}

export default FunctionApp