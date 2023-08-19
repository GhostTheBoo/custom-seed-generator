import React, { useState, useEffect } from 'react'

import JSZip from 'jszip'
import FileSaver from 'file-saver'

import { ZipSeed } from './Components/ZipSeed'
import HelpModal from './Components/HelpModal'

import Tracker from './Data/trackerData'

import HomePage from './Home/HomePage'

import { Chest, chestsData } from './chests/ChestsData'
import ChestPage from './chests/ChestPage'
import { Popup, popupsData } from './popups/PopupsData'
import PopupPage from './popups/PopupPage'
import { BonusFight, bonusData } from './bonus/BonusData'
import BonusPage from './bonus/BonusPage'
import { FormLevel, formsData } from './forms/FormsData'
import FormPage from './forms/FormPage'
import { Equipment, equipmentsData } from './equipment/EquipmentsData'
import EquipmentPage from './equipment/EquipmentPage'
import { Level, levelsData } from './levels/LevelData'
import LevelPage from './levels/LevelPage'
import { AbilityCost, costsData } from './cost/CostsData'
import CostPage from './cost/CostPage'
import { StartingStatus, startingStatusData } from './starting/StartingStatusData'
import StartingStatusPage from './starting/StartingStatusPage'
import { Cheat, pnachCheatsData, luaCheatsData } from './cheats/CheatsData'
import CheatPage from './cheats/CheatPage'
import SideNav from './navbar/SideNav'



function FunctionApp() {
	//#region State
	const [allChests, setAllChests] = useState(chestsData)
	const [allPopups, setAllPopups] = useState(popupsData)
	const [allBonuses, setAllBonuses] = useState(bonusData)
	const [allForms, setAllForms] = useState(formsData)
	const [allEquipments, setAllEquipments] = useState(equipmentsData)
	const [allLevels, setAllLevels] = useState(levelsData)
	const [allCosts, setAllCosts] = useState(costsData)
	const [allStartingStatus, setAllStartingStatus] = useState(startingStatusData)
	const [allPnachCheats, setAllPnachCheats] = useState(pnachCheatsData)
	const [allLuaCheats, setAllLuaCheats] = useState(luaCheatsData)

	const [currentTab, setCurrentTab] = useState(0)

	const [isCommented, setIsCommented] = useState(true)
	//#endregion
	const alertUser = e => {
		e.preventDefault()
		e.returnValue = ''
	}
	useEffect(() => {
		window.addEventListener('beforeunload', alertUser)
		return () => {
			window.removeEventListener('beforeunload', alertUser)
		}
	}, [])
	const currentVersion = '10.10'

	//#region General Functions
	function handleTracker(isPnach) {
		let comment = isPnach ? '//' : '--'

		//Chest Tracker
		let chestTracker = allChests.reduce((prevWorlds, currentWorld) => {
			currentWorld.chests.forEach(chest => { prevWorlds = prevWorlds.update(chest.replacementReward.index) })
			return prevWorlds
		}, new Tracker())

		//Popup Tracker
		let popupTracker = allPopups.reduce((prevWorlds, currentWorld) => {
			currentWorld.popups.forEach(popup => { prevWorlds = prevWorlds.update(popup.replacementReward.index) })
			return prevWorlds
		}, new Tracker())

		//Bonus Tracker
		let finalBonusStats = {
			hp: 20,
			mp: 100,
			armor: 1,
			accessory: 1,
			item: 3,
			drive: 5
		}
		let bonusTracker = allBonuses.reduce((prevWorlds, currentWorld) => {
			currentWorld.bonusFights.forEach(bonusFight => {
				bonusFight.slots.filter(slot => Object.keys(slot).length !== 0).forEach(slot => {
					if (slot.replacementCharacter === 1) {
						finalBonusStats.hp += Math.floor(slot.hpIncrease / 2)
						finalBonusStats.mp += Math.floor(slot.mpIncrease / 2)
						finalBonusStats.armor += slot.armorSlotIncrease
						finalBonusStats.accessory += slot.accessorySlotIncrease
						finalBonusStats.item += slot.itemSlotIncrease
						finalBonusStats.drive += slot.driveGaugeIncrease
						prevWorlds = prevWorlds.update(slot.replacementRewardA.index)
						prevWorlds = prevWorlds.update(slot.replacementRewardB.index)
					}
				})
			})
			return prevWorlds
		}, new Tracker())
		let finalBonusStatsComment = comment + 'SORA\'S FINAL STATS IN CRITICAL MODE\n'
		finalBonusStatsComment += comment + ' HP: ' + finalBonusStats.hp + '\n'
		finalBonusStatsComment += comment + ' MP: ' + finalBonusStats.mp + '\n'
		finalBonusStatsComment += comment + ' Armor: ' + finalBonusStats.armor + '\n'
		finalBonusStatsComment += comment + ' Accessory: ' + finalBonusStats.accessory + '\n'
		finalBonusStatsComment += comment + ' Item: ' + finalBonusStats.item + '\n'
		finalBonusStatsComment += comment + ' Drive: ' + Math.min(9, finalBonusStats.drive) + '\n'

		//Forms & Summons Tracker
		let formTracker = allForms.reduce((prevDriveForms, currentDriveForm) => {
			currentDriveForm.driveLevels.forEach(driveLevel => { prevDriveForms = prevDriveForms.update(driveLevel.replacementReward.index) })
			return prevDriveForms
		}, new Tracker())

		//Level Tracker
		let levelTracker = allLevels.reduce((prevLevels, currentLevel) => {
			prevLevels.sword = prevLevels.sword.update(currentLevel.replacementSwordReward.index)
			prevLevels.shield = prevLevels.shield.update(currentLevel.replacementShieldReward.index)
			prevLevels.staff = prevLevels.staff.update(currentLevel.replacementStaffReward.index)
			return prevLevels
		}, { sword: new Tracker(), shield: new Tracker(), staff: new Tracker() })

		return (isPnach)
			? [
				comment + 'GAME STATUS\n',
				chestTracker.saveToPnach('CHEST') + '\n',
				popupTracker.saveToPnach('POPUP') + '\n',
				formTracker.saveToPnach('FORM & SUMMON') + '\n',
				comment + 'LEVEL TALLY\n',
				levelTracker.sword.saveToPnach('SWORD') + '\n',
				levelTracker.shield.saveToPnach('SHIELD') + '\n',
				levelTracker.staff.saveToPnach('STAFF') + '\n',
				bonusTracker.saveToPnach('BONUS') + '\n',
				finalBonusStatsComment + '\n'
			]
			: [
				comment + 'GAME STATUS\n',
				chestTracker.saveToLua('CHEST') + '\n',
				popupTracker.saveToLua('POPUP') + '\n',
				formTracker.saveToLua('FORM & SUMMON') + '\n',
				comment + 'LEVEL TALLY\n',
				levelTracker.sword.saveToLua('SWORD') + '\n',
				levelTracker.shield.saveToLua('SHIELD') + '\n',
				levelTracker.staff.saveToLua('STAFF') + '\n',
				bonusTracker.saveToLua('BONUS') + '\n',
				finalBonusStatsComment + '\n'
			]
	}
	// function handleSaveAsPnach(fileName) {
	// 	let trackerPnachCodes = isCommented ? handleTracker(true) : []

	// 	let pnachCodes = [].concat(
	// 		trackerPnachCodes,
	// 		Chest.saveToPnach(allChests, isCommented),
	// 		Popup.saveToPnach(allPopups, isCommented),
	// 		BonusFight.saveToPnach(allBonuses, isCommented),
	// 		FormLevel.saveToPnach(allForms, isCommented),
	// 		Equipment.saveToPnach(allEquipments, isCommented),
	// 		Level.saveToPnach(allLevels, isCommented),
	// 		AbilityCost.saveToPnach(allCosts, isCommented),
	// 		StartingStatus.saveToPnach(allStartingStatus, isCommented),
	// 		Cheat.saveToPnach(allPnachCheats, isCommented)
	// 	)

	// 	downloadFile(pnachCodes, fileName.length !== 0 ? '(' + fileName + ').pnach' : 'F266B00B.pnach')
	// }
	function handleSaveAsLua(fileName) {
		let trackerLuaCodes = isCommented ? handleTracker(false) : []

		let luaDefaultCodes = [
			'function _OnFrame()\n',
			'\tWorld = ReadByte(Now + 0x00)\n',
			'\tRoom = ReadByte(Now + 0x01)\n',
			'\tPlace = ReadShort(Now + 0x00)\n',
			'\tDoor = ReadShort(Now + 0x02)\n',
			'\tMap = ReadShort(Now + 0x04)\n',
			'\tBtl = ReadShort(Now + 0x06)\n',
			'\tEvt = ReadShort(Now + 0x08)\n',
			'\tif Place == 0xFFFF or not Obj0 then\n',
			'\t\tif Platform == \'PS2\' then\n',
			'\t\t\tObj0 = ReadInt(Obj0Pointer)\n',
			'\t\t\tSys3 = ReadInt(Sys3Pointer)\n',
			'\t\t\tBtl0 = ReadInt(Btl0Pointer)\n',
			'\t\telseif Platform == \'PC\' then\n',
			'\t\t\tObj0 = ReadLong(Obj0Pointer)\n',
			'\t\t\tSys3 = ReadLong(Sys3Pointer)\n',
			'\t\t\tBtl0 = ReadLong(Btl0Pointer)\n',
			'\t\tend\n',
			'\tend\n',
			'\tChests()\n',
			'\tPopups()\n',
			'\tBonusRewards()\n',
			'\tDriveForms()\n',
			'\tEquipment()\n',
			'\tLevelRewards()\n',
			'\tAbilityCosts()\n',
			'\tStartingStatus()\n',
			'\tCheats()\n',
			'end\n\n',
			'function _OnInit()\n',
			'\tif GAME_ID == 0xF266B00B or GAME_ID == 0xFAF99301 and ENGINE_TYPE == "ENGINE" then--PCSX2\n',
			'\t\tPlatform = \'PS2\'\n',
			'\t\tNow = 0x032BAE0 --Current Location\n',
			'\t\tSave = 0x032BB30 --Save File\n',
			'\t\tObj0Pointer = 0x1D5BA10 --00objentry.bin\n',
			'\t\tSys3Pointer = 0x1C61AF8 --03system.bin\n',
			'\t\tBtl0Pointer = 0x1C61AFC --00battle.bin\n',
			'\t\tSlot1 = 0x1C6C750 --Unit Slot 1\n',
			'\telseif GAME_ID == 0x431219CC and ENGINE_TYPE == \'BACKEND\' then--PC\n',
			'\t\tPlatform = \'PC\'\n',
			'\t\tNow = 0x0714DB8 - 0x56454E\n',
			'\t\tSave = 0x09A7070 - 0x56450E\n',
			'\t\tObj0Pointer = 0x2A22730 - 0x56450E\n',
			'\t\tSys3Pointer = 0x2AE3550 - 0x56450E\n',
			'\t\tBtl0Pointer = 0x2AE3558 - 0x56450E\n',
			'\t\tSlot1 = 0x2A20C58 - 0x56450E\n',
			'\tend\n',
			'end\n\n',
			'function Events(M,B,E) --Check for Map, Btl, and Evt\n',
			'\treturn ((Map == M or not M) and (Btl == B or not B) and (Evt == E or not E))\n',
			'end\n\n'
		]

		let luaCodes = [].concat(
			trackerLuaCodes,
			luaDefaultCodes,
			Chest.saveToLua(allChests, isCommented),
			Popup.saveToLua(allPopups, isCommented),
			BonusFight.saveToLua(allBonuses, isCommented),
			FormLevel.saveToLua(allForms, isCommented),
			Equipment.saveToLua(allEquipments, isCommented),
			Level.saveToLua(allLevels, isCommented),
			AbilityCost.saveToLua(allCosts, isCommented),
			StartingStatus.saveToLua(allStartingStatus, isCommented),
			Cheat.saveToLua(allLuaCheats, isCommented)
		)

		downloadFile(luaCodes, fileName.length !== 0 ? '(' + fileName + ').lua' : 'F266B00B.lua')
	}
	function handleSaveAsZip(fileName, seedDescription) {
		let zip = new JSZip()
		let zipSeed = new ZipSeed()

		zip.file('TrsrList.yml', zipSeed.generateTrsrList(allChests, allPopups, isCommented)) // chests and popups
		zip.file('LvupList.yml', zipSeed.generateLvupList(allLevels, isCommented)) // level up rewards
		zip.file('FmlvList.yml', zipSeed.generateFmlvList(allForms, isCommented)) // Form Level Rewards
		zip.file('BonsList.yml', zipSeed.generateBonsList(allBonuses, isCommented)) // bonus level rewards
		zip.file('ItemList.yml', zipSeed.generateItemList(allEquipments, isCommented)) // equipment stats
		zip.file('CmdList.yml', zipSeed.generateCmdList(allCosts, isCommented)) // starting items
		zip.file('PlrpList.yml', zipSeed.generatePlrpList(allStartingStatus, isCommented)) // starting items
		// zip.file('HintFile.hints', HintFile) // encoded hints
		zip.file('sys.yml', zipSeed.generateSys()) // Menu text edits
		zip.file('jm.yml', zipSeed.generateJm()) // random journal entries
		zip.file('mod.yml', zipSeed.generateMod(fileName, seedDescription)) // enabled mods/scripts

		zip.generateAsync({ type: 'blob' }).then(function (content) {
			FileSaver.saveAs(content, fileName + '.zip')
		})
	}
	function handleSaveAsJSON(fileName) {
		let chestSaveData = Chest.saveToJSON(allChests)
		let popupSaveData = Popup.saveToJSON(allPopups)
		let bonusSaveData = BonusFight.saveToJSON(allBonuses)
		let formSaveData = FormLevel.saveToJSON(allForms)
		let equipmentSaveData = Equipment.saveToJSON(allEquipments)
		let levelSaveData = Level.saveToJSON(allLevels)
		let costSaveData = AbilityCost.saveToJSON(allCosts)
		let startingStatusSaveData = StartingStatus.saveToJSON(allStartingStatus)

		let saveData = ['{',
			'"version":"' + currentVersion + '",',
			chestSaveData.join(''),
			popupSaveData.join(''),
			bonusSaveData.join(''),
			formSaveData.join(''),
			equipmentSaveData.join(''),
			levelSaveData.join(''),
			costSaveData.join(''),
			startingStatusSaveData.join('').slice(0, -1),
			'}']

		downloadFile(saveData, fileName.length !== 0 ? fileName + '.json' : 'save_data.json')
	}
	function handleLoadFromJSON(loadData) {
		let allLoadData = JSON.parse(loadData)
		let loadVersion = allLoadData.version

		let newAllChests = allLoadData.hasOwnProperty('chestsData') ? allLoadData.chestsData : []
		let newAllPopups = allLoadData.hasOwnProperty('popupsData') ? allLoadData.popupsData : []
		let newAllBonuses = allLoadData.hasOwnProperty('bonusData') ? allLoadData.bonusData : []
		let newAllForms = allLoadData.hasOwnProperty('formsData') ? allLoadData.formsData : []
		let newAllEquipments = allLoadData.hasOwnProperty('equipmentsData') ? allLoadData.equipmentsData : []
		let newAllLevels = allLoadData.hasOwnProperty('levelsData') ? allLoadData.levelsData : []
		let newAllCosts = allLoadData.hasOwnProperty('costsData') ? allLoadData.costsData : []
		let newAllStartingStatus = allLoadData.hasOwnProperty('startingStatusData') ? allLoadData.startingStatusData : []
		setAllChests(Chest.loadFromJSON(newAllChests))
		setAllPopups(Popup.loadFromJSON(newAllPopups))
		setAllBonuses(BonusFight.loadFromJSON(newAllBonuses))
		setAllForms(FormLevel.loadFromJSON(newAllForms))
		setAllEquipments(Equipment.loadFromJSON(newAllEquipments))
		setAllLevels(Level.loadFromJSON(newAllLevels, loadVersion))
		setAllCosts(AbilityCost.loadFromJSON(newAllCosts))
		setAllStartingStatus(StartingStatus.loadFromJSON(newAllStartingStatus))
	}
	function downloadFile(contentArray, fileName) {
		const element = document.createElement('a')
		const file = new Blob(contentArray, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = fileName
		document.body.appendChild(element)
		element.click()
	}
	//#endregion

	let tabDataList = [
		{
			key: 'home',
			eventKey: 'home',
			fileName: 'home',
			title: 'Home',
			page: (
				<HomePage
					isCommented={isCommented}
					onCommentChange={() => { setIsCommented(!isCommented) }}
					// handleSaveAsPnach={handleSaveAsPnach}
					handleSaveAsLua={handleSaveAsLua}
					handleSaveAsZip={handleSaveAsZip}
					handleSaveAsJSON={handleSaveAsJSON}
					onFileUpload={(e) => {
						let file = e.target.files[0]
						let reader = new FileReader()
						reader.readAsText(file)
						reader.onload = (e) => handleLoadFromJSON(e.target.result)
					}}
				/>
			)
		},
		{
			key: 'chest',
			eventKey: 'chest',
			fileName: 'chest',
			title: 'Chest',
			page: (
				<ChestPage
					chestData={allChests}
					setAllChests={setAllChests}
				>
					<HelpModal tab={currentTab} />
				</ChestPage>
			)
		},
		{
			key: 'popup',
			eventKey: 'popup',
			fileName: 'popup',
			title: 'Popup',
			page: (
				<PopupPage
					popupData={allPopups}
					setAllPopups={setAllPopups}
				>
					<HelpModal tab={currentTab} />
				</PopupPage>
			)
		},
		{
			key: 'bonus',
			eventKey: 'bonus',
			fileName: 'key',
			title: 'Bonus',
			page: (
				<BonusPage
					bonusData={allBonuses}
					setAllBonuses={setAllBonuses}
				>
					<HelpModal tab={currentTab} />
				</BonusPage>
			)
		},
		{
			key: 'form',
			eventKey: 'form',
			fileName: 'form',
			title: 'Forms & Summons',
			page: (
				<FormPage
					formData={allForms}
					setAllForms={setAllForms}
				>
					<HelpModal tab={currentTab} />
				</FormPage>
			)
		},
		{
			key: 'equipment',
			eventKey: 'equipment',
			fileName: 'keyblade',
			title: 'Equipment',
			page: (
				<EquipmentPage
					equipmentData={allEquipments}
					setAllEquipments={setAllEquipments}
				>
					<HelpModal tab={currentTab} />
				</EquipmentPage>
			)
		},
		{
			key: 'level',
			eventKey: 'level',
			fileName: 'level',
			title: 'Levels',
			page: (
				<LevelPage
					levelData={allLevels}
					setAllLevels={setAllLevels}
				>
					<HelpModal tab={currentTab} />
				</LevelPage>
			)
		},
		{
			key: 'cost',
			eventKey: 'cost',
			fileName: 'spell',
			title: 'Ability Costs',
			page: (
				<CostPage
					costData={allCosts}
					setAllCosts={setAllCosts}
				>
					<HelpModal tab={currentTab} />
				</CostPage>
			)
		},
		{
			key: 'startingStatus',
			eventKey: 'startingStatus',
			fileName: 'starting',
			title: 'Starting Status',
			page: (
				<StartingStatusPage
					startingStatusData={allStartingStatus}
					setAllStartingStatus={setAllStartingStatus}
				>
					<HelpModal tab={currentTab} />
				</StartingStatusPage>
			)
		},
		{
			key: 'cheat',
			eventKey: 'cheat',
			fileName: 'cheat',
			title: 'Cheats',
			page: (
				<CheatPage
					pnachCheatData={allPnachCheats}
					luaCheatData={allLuaCheats}
					setAllPnachCheats={setAllPnachCheats}
					setAllLuaCheats={setAllLuaCheats}
				>
					<HelpModal tab={currentTab} />
				</CheatPage>
			)
		}
	]

	/* TODO:
	Clean up all level graph view
	Clean up magic page
	Clean up starting status page
	Clean up home page and add back in credits list
	
	Add inline editing to equipment page and remove form, add equipment image small to each card
	Condense Form Page and add inline editing instead of form
	Add text and description editing to equipment page
	Add inline editing to levels
	*/

	return (
		<div className='App'>
			<SideNav
				onSelect={(newTab) => setCurrentTab(newTab)}
				pages={tabDataList}
				currentTab={currentTab}
			/>
			{tabDataList[currentTab].page}
		</div>
	)
}

export default FunctionApp
