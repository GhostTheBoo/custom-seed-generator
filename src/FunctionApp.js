import { React, useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { worldsData } from './Data/typesData'
import { rewardsData } from './Data/rewardsData'
import { chestsData } from './Data/chestsData'

import HomePage from './Pages/HomePage'
import ChestPage from './Pages/newChestPage'
import PopupPage from './Pages/newPopupPage'

function FunctionApp() {
	const [currentChestWorld, setCurrentChestWorld] = useState(0)
	const [currentChestRewardType, setCurrentChestRewardType] = useState(0)
	const [currentChestReward, setCurrentChestReward] = useState(0)
	const [chestSelectAll, setChestSelectAll] = useState(false)
	const [allChests, setChests] = useState(chestsData)
	const [currentChestData, setCurrentChestData] = useState(chestsData[0].chests)

	function handleChestTableChange(nextWorld) {
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

	function handleReplace(buttonName, currentReward, currentData, setCurrentData, setSelectAll) {
		let replacedObjects
		if (buttonName === 'replaceButton')
			replacedObjects = currentData.map(object => {
				if (object.toBeReplaced)
					object.replace({ reward: { ...currentReward } })
				return object
			})
		else
			replacedObjects = currentData.map(object => {
				if (object.toBeReplaced)
					object.vanilla()
				return object
			})
		setCurrentData(replacedObjects)
		setSelectAll(false)
	}

	function onRowCheck(row, currentData, setCurrentData) {
		let toggledObjects = currentData.map((object, index) => {
			if (index === parseInt(row))
				object.markForReplacement(!object.toBeReplaced)
			return object
		})
		setCurrentData(toggledObjects)
	}

	function checkAll(currentData, setCurrentData, selectAll, setSelectAll) {
		let toBeReplacedObjects = currentData.map(object => {
			object.markForReplacement(!selectAll)
			return object
		})
		setCurrentData(toBeReplacedObjects)
		setSelectAll(!selectAll)
	}

	let styles = {
		marginTop: '0',
		marginRight: '10px',
		marginBottom: '10px',
		marginLeft: '10px'
	}

	return (
		<div style={styles}>
			<Tabs defaultActiveKey="home" id="allTabs" transition={false}>
				<Tab eventKey="home" title="Home">
					<HomePage
					/>
				</Tab>
				<Tab eventKey="chest" title="Chest">
					<ChestPage
						style={styles}
						currentWorld={currentChestWorld}
						chestData={currentChestData}
						rewardList={rewardsData[currentChestRewardType].rewards}
						currentRewardType={currentChestRewardType}
						currentReward={currentChestReward}
						selectAll={chestSelectAll}
						handleWorldChange={(e) => handleChestTableChange(e.target.value)}
						onRewardTypeChange={(e) => {
							setCurrentChestRewardType(e.target.value)
							setCurrentChestReward(0)
						}}
						onRewardChange={(e) => setCurrentChestReward(e.target.value)}
						onRowCheck={(e) => onRowCheck(e.target.value, currentChestData, setCurrentChestData)}
						checkAll={() => checkAll(currentChestData, setCurrentChestData, chestSelectAll, setChestSelectAll)}
						onClick={(e) => {
							handleReplace(e.target.name, rewardsData[currentChestRewardType].rewards[currentChestReward], currentChestData, setCurrentChestData, setChestSelectAll)
						}}
					/>
				</Tab>
				{/* <Tab eventKey="popup" title="Popup">
					<PopupPage
						style={styles}
						currentWorld={currentChestWorld}
						chestData={currentChestData}
						rewardList={rewardsData[currentChestRewardType].rewards}
						currentRewardType={currentChestRewardType}
						currentReward={currentChestReward}
						selectAll={chestSelectAll}
						handleWorldChange={(e) => handleChestTableChange(e.target.value)}
						onRewardTypeChange={(e) => {
							setCurrentChestRewardType(e.target.value)
							setCurrentChestReward(0)
						}}
						onRewardChange={(e) => setCurrentChestReward(e.target.value)}
						onRowCheck={(e) => onRowCheck(e.target.value, currentChestData, setCurrentChestData)}
						checkAll={() => checkAll(currentChestData, setCurrentChestData, chestSelectAll, setChestSelectAll)}
						onClick={(e) => {
							handleReplace(e.target.name, rewardsData[currentChestRewardType].rewards[currentChestReward], currentChestData, setCurrentChestData, setChestSelectAll)
						}}
					/>
				</Tab> */}
			</Tabs>
		</div>
	)
}

export default FunctionApp