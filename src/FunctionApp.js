import { React, useState } from 'react'

import { worldsData } from './Data/typesData'
import { rewardsData } from './Data/rewardsData'
import { chestsData } from './Data/chestsData'

import ChestPage from './Pages/newChestPage'

function FunctionApp() {
	const [currentChestWorld, setCurrentChestWorld] = useState(0)
	const [currentChestRewardType, setCurrentChestRewardType] = useState(0)
	const [currentChestReward, setCurrentChestReward] = useState(0)
	const [chestSelectAll, setChestSelectAll] = useState(false)
	const [allChests, setChests] = useState(chestsData)
	const [currentChestData, setCurrentChestData] = useState(chestsData[0].chests)

	function handleTableChange(nextWorld) {
		let toBeStoredObjects = currentChestData.map(object => {
			object.markForReplacement(false)
			return object
		})
		let newAllObjects = allChests.map((list, index) => {
			if (index === currentChestWorld)
				return {
					world: worldsData[index],
					chests: toBeStoredObjects
				}
			return list
		})
		setChests(newAllObjects)
		setCurrentChestData(newAllObjects[nextWorld].chests)
		setCurrentChestWorld(nextWorld)
	}

	function handleReplace(buttonName) {
		let replacedObjects
		if (buttonName === 'replaceButton')
			replacedObjects = currentChestData.map(object => {
				if (object.toBeReplaced)
					object.replace(rewardsData[currentChestRewardType].rewards[currentChestReward])
				return object
			})
		else
			replacedObjects = currentChestData.map(object => {
				if (object.toBeReplaced)
					object.vanilla()
				return object
			})
		setCurrentChestData(replacedObjects)
		setChestSelectAll(false)
	}

	function onRowCheck(row) {
		let toggledObjects = currentChestData.map((object, index) => {
			if (index === parseInt(row))
				object.markForReplacement(!object.toBeReplaced)
			return object
		})
		setCurrentChestData(toggledObjects)
	}

	function checkAll() {
		let toBeReplacedObjects = currentChestData.map(object => {
			object.markForReplacement(!chestSelectAll)
			return object
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
				handleWorldChange={(e) => handleTableChange(e.target.value)}
				onRewardTypeChange={(e) => {
					setCurrentChestRewardType(e.target.value)
					setCurrentChestReward(0)
				}}
				onRewardChange={(e) => setCurrentChestReward(e.target.value)}
				onRowCheck={(e) => onRowCheck(e.target.value)}
				checkAll={() => checkAll()}
				onClick={(e) => handleReplace(e.target.name)}
			/>
		</div>
	)
}

export default FunctionApp