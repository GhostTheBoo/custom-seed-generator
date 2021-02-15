import { React, useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { worldsData, charactersData } from './Data/typesData'
import { rewardsData } from './Data/rewardsData'
import { chestsData } from './Data/chestsData'
import { popupsData } from './Data/popupsData'
import { bonusData } from './Data/newBonusData'

import HomePage from './Pages/HomePage'
import ChestPage from './Pages/ChestPage'
import PopupPage from './Pages/PopupPage'
import BonusPage from './Pages/BonusPage'

function FunctionApp() {
	const [currentChestWorld, setCurrentChestWorld] = useState(0)
	const [currentChestRewardType, setCurrentChestRewardType] = useState(0)
	const [currentChestReward, setCurrentChestReward] = useState(0)
	const [chestSelectAll, setChestSelectAll] = useState(false)
	const [allChests, setChests] = useState(chestsData)
	const [currentChestData, setCurrentChestData] = useState(chestsData[0].chests)

	const [currentPopupWorld, setCurrentPopupWorld] = useState(0)
	const [currentPopupRewardType, setCurrentPopupRewardType] = useState(0)
	const [currentPopupReward, setCurrentPopupReward] = useState(0)
	const [popupSelectAll, setPopupSelectAll] = useState(false)
	const [allPopups, setPopups] = useState(popupsData)
	const [currentPopupData, setCurrentPopupData] = useState(popupsData[0].popups)

	const [currentBonusWorld, setCurrentBonusWorld] = useState(0)
	const [currentBonusARewardType, setCurrentBonusARewardType] = useState(0)
	const [currentBonusAReward, setCurrentBonusAReward] = useState(0)
	const [currentBonusBRewardType, setCurrentBonusBRewardType] = useState(0)
	const [currentBonusBReward, setCurrentBonusBReward] = useState(0)
	const [currentBonusSlot, setCurrentBonusSlot] = useState(0)
	const [currentBonusCharacter, setCurrentBonusCharacter] = useState(0)
	const [currentBonusHP, setCurrentBonusHP] = useState(0)
	const [currentBonusMP, setCurrentBonusMP] = useState(0)
	const [currentBonusArmor, setCurrentBonusArmor] = useState(0)
	const [currentBonusAccessory, setCurrentBonusAccessory] = useState(0)
	const [currentBonusItem, setCurrentBonusItem] = useState(0)
	const [currentBonusDrive, setCurrentBonusDrive] = useState(0)
	const [bonusSelectAll, setBonusSelectAll] = useState(false)
	const [allBonuses, setBonuses] = useState(bonusData)
	const [currentBonusData, setCurrentBonusData] = useState(bonusData[0].bonus)

	//#region Table Change
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

	function handlePopupTableChange(nextWorld) {
		let toBeStoredObjects = currentPopupData.map(object => {
			object.markForReplacement(false)
			return object
		})
		let newAllObjects = allPopups.map((list, index) => {
			if (index === currentPopupWorld)
				return {
					world: worldsData[index],
					popups: toBeStoredObjects
				}
			return list
		})
		setPopups(newAllObjects)
		setCurrentPopupData(newAllObjects[nextWorld].popups)
		setCurrentPopupWorld(nextWorld)
	}

	function handleBonusTableChange(nextWorld) {
		let toBeStoredObjects = currentBonusData.map(object => {
			object.markForReplacement(false)
			return object
		})
		let newAllObjects = allPopups.map((list, index) => {
			if (index === currentPopupWorld)
				return {
					world: worldsData[index],
					popups: toBeStoredObjects
				}
			return list
		})
		setPopups(newAllObjects)
		setCurrentPopupData(newAllObjects[nextWorld].popups)
		setCurrentPopupWorld(nextWorld)
	}
	//#endregion

	function handleReplace(buttonName, currentReward, currentData, setCurrentData, setSelectAll) {
		let replacedObjects
		if (buttonName === 'replaceButton')
			replacedObjects = currentData.map(object => {
				if (object.toBeReplaced)
					object.replace(currentReward)
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

	function handleRowCheck(row, currentData, setCurrentData) {
		let toggledObjects = currentData.map((object, index) => {
			if (index === parseInt(row))
				object.markForReplacement(!object.toBeReplaced)
			return object
		})
		setCurrentData(toggledObjects)
	}

	function handleCheckAll(currentData, setCurrentData, selectAll, setSelectAll) {
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
						handleRowCheck={(e) => handleRowCheck(e.target.value, currentChestData, setCurrentChestData)}
						handleCheckAll={() => handleCheckAll(currentChestData, setCurrentChestData, chestSelectAll, setChestSelectAll)}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[currentChestRewardType].rewards[currentChestReward]
								}
							}
							handleReplace(e.target.name, replacement, currentChestData, setCurrentChestData, setChestSelectAll)
						}}
					/>
				</Tab>
				<Tab eventKey="popup" title="Popup">
					<PopupPage
						style={styles}
						currentWorld={currentPopupWorld}
						popupData={currentPopupData}
						rewardList={rewardsData[currentPopupRewardType].rewards}
						currentRewardType={currentPopupRewardType}
						currentReward={currentPopupReward}
						selectAll={popupSelectAll}
						handleWorldChange={(e) => handlePopupTableChange(e.target.value)}
						onRewardTypeChange={(e) => {
							setCurrentPopupRewardType(e.target.value)
							setCurrentPopupReward(0)
						}}
						onRewardChange={(e) => setCurrentPopupReward(e.target.value)}
						handleRowCheck={(e) => handleRowCheck(e.target.value, currentPopupData, setCurrentPopupData)}
						handleCheckAll={() => handleCheckAll(currentPopupData, setCurrentPopupData, popupSelectAll, setPopupSelectAll)}
						onClick={(e) => {
							let replacement = {
								reward: {
									...rewardsData[currentPopupRewardType].rewards[currentPopupReward]
								}
							}
							handleReplace(e.target.name, replacement, currentPopupData, setCurrentPopupData, setPopupSelectAll)
						}}
					/>
				</Tab>
				<Tab eventKey="bonus" title="Bonus">
					<BonusPage
						style={styles}
						currentWorld={currentBonusWorld}
						bonusData={currentBonusData}
						rewardListA={rewardsData[currentBonusARewardType].rewards}
						rewardListB={rewardsData[currentBonusBRewardType].rewards}
						handleWorldChange={this.handleBonusWorldChange}
						// handleSlotChange={this.handleBonusSlotChange}
						onARewardTypeChange={(e) => {
							setCurrentBonusARewardType(e.target.value)
							setCurrentBonusAReward(0)
						}}
						onARewardChange={(e) => setCurrentBonusAReward(e.target.value)}
						onBRewardTypeChange={(e) => {
							setCurrentBonusBRewardType(e.target.value)
							setCurrentBonusBReward(0)
						}}
						onBRewardChange={(e) => setCurrentBonusBReward(e.target.value)}
						// onInputChange={(event) => handleInputChange('bonus', event)}
						handleRowCheck={(e) => handleRowCheck(e.target.value, currentBonusData, setCurrentBonusData)}
						handleCheckAll={() => handleCheckAll(currentBonusData, setCurrentBonusData, bonusSelectAll, setBonusSelectAll)}
						onClick={(e) => {
							let replacement = {
								character: charactersData[currentBonusCharacter],
								reward1: {
									...rewardsData[currentBonusARewardType].rewards[currentBonusAReward]
								},
								reward2: {
									...rewardsData[currentBonusBRewardType].rewards[currentBonusBReward]
								},
								hp: currentBonusHP,
								mp: currentBonusMP,
								armor: currentBonusArmor,
								accessory: currentBonusAccessory,
								item: currentBonusItem,
								drive: currentBonusDrive
							}
							handleReplace(e.target.name, replacement, currentBonusData, setCurrentBonusData, setBonusSelectAll)
						}}
					/>
				</Tab>
			</Tabs>
		</div>
	)
}

export default FunctionApp