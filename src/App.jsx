import React, { useState, useEffect } from 'react'

import JSZip from 'jszip'
import FileSaver from 'file-saver'

import { ZipSeed } from './views/generic/ZipSeed'
import HelpModal from './views/generic/HelpModal'

import Tracker from './data/trackerData'

import HomePage from './views/home/HomePage'

import { Chest, chestsData } from './data/chestsData'
import ChestPage from './views/chests/ChestPage'
import { Popup, popupsData } from './data/popupsData'
import PopupPage from './views/popups/PopupPage'
import { BonusFight, bonusData } from './data/bonusData'
import BonusPage from './views/bonus/BonusPage'
import { FormLevel, formsData } from './data/formsData'
import FormPage from './views/forms/FormPage'
import { Equipment, equipmentsData } from './data/equipmentsData'
import EquipmentPage from './views/equipment/EquipmentPage'
import { Level, levelsData } from './data/levelData'
import LevelPage from './views/levels/LevelPage'
import { AbilityCost, costsData } from './data/costsData'
import CostPage from './views/cost/CostPage'
import { StartingStatus, startingStatusData } from './data/startingStatusData'
import StartingStatusPage from './views/starting/StartingStatusPage'
import { Cheat, pnachCheatsData, luaCheatsData } from './data/cheatsData'
import CheatPage from './views/cheats/CheatPage'
import SideNav from './views/navbar/SideNav'



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
			"function _OnInit()\n",
			"\tkh2libstatus, kh2lib = pcall(require, \"kh2lib\")\n",
			"\tif not kh2libstatus then\n",
			"\t\tprint(\"ERROR (" + fileName + "): KH2-Lua-Library mod is not installed\")\n",
			"\t\tCanExecute = false\n",
			"\t\treturn\n",
			"\tend\n",
			"\tLog(" + fileName + " Ready!\")\n",
			"\tRequireKH2LibraryVersion(1)\n",
			"\tCanExecute = kh2lib.CanExecute\n",
			"\tStaticPointersLoaded = false\n",
			"\tOnPC = kh2lib.OnPC\n",
			"\tNow = kh2lib.Now\n",
			"\tSave = kh2lib.Save\n",
			"\tSlot1 = kh2lib.Slot1\n",
			"\tGauge = kh2lib.Gauge1\n",
			"\tSongs = kh2lib.Songs\n",
			"end\n\n",
			"function _OnFrame()\n",
			"\tif not CanExecute then\n",
			"\t\treturn\n",
			"\tend\n",
			"\tif not StaticPointersLoaded then\n",
			"\t\tObj0 = ReadLong(kh2lib.Obj0Pointer)\n",
			"\t\tSys3 = ReadLong(kh2lib.Sys3Pointer)\n",
			"\t\tBtl0 = ReadLong(kh2lib.Btl0Pointer)\n",
			"\tend\n",
			"\tWorld = ReadByte(Now + 0x00)\n",
			"\tRoom = ReadByte(Now + 0x01)\n",
			"\tPlace = ReadShort(Now + 0x00)\n",
			"\tDoor = ReadShort(Now + 0x02)\n",
			"\tMap = ReadShort(Now + 0x04)\n",
			"\tBtl = ReadShort(Now + 0x06)\n",
			"\tEvt = ReadShort(Now + 0x08)\n",
			"\tChests()\n",
			"\tPopups()\n",
			"\tBonusRewards()\n",
			"\tDriveForms()\n",
			"\tEquipment()\n",
			"\tLevelRewards()\n",
			"\tAbilityCosts()\n",
			"\tStartingStatus()\n",
			"\tCheats()\n",
			"end\n\n",
			"function Events(M,B,E) --Check for Map, Btl, and Evt\n",
			"\treturn ((Map == M or not M) and (Btl == B or not B) and (Evt == E or not E))\n",
			"end\n\n",
			"function BAR(File, Subfile, Offset)\n",
			"\tlocal Subpoint = File + 0x08 + 0x10*Subfile\n",
			"\tlocal Address\n",
			"\t--Detect errors\n",
			"\tif ReadInt(File,OnPC) ~= 0x01524142 then --Header mismatch\n",
			"\t\treturn\n",
			"\telseif Subfile > ReadInt(File+4,OnPC) then --Subfile over count\n",
			"\t\treturn\n",
			"\telseif Offset >= ReadInt(Subpoint+4,OnPC) then --Offset exceed subfile length\n",
			"\t\treturn\n",
			"\tend\n",
			"\t--Get address\n",
			"\tAddress = File + (ReadInt(Subpoint,OnPC) - ReadInt(File+8,OnPC)) + Offset\n",
			"\treturn Address\n",
			"end\n",
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
