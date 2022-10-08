import { React, useState, useEffect } from 'react'
import { Tabs, Tab, Col } from 'react-bootstrap'

import JSZip from 'jszip'
import FileSaver from 'file-saver'

import SaveLoadModal from './Components/SaveLoadModal'
import Icon from './Components/Icon'
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
import { MagicAbility, magicsData } from './magic/MagicData'
import MagicPage from './magic/MagicPage'
import { StartingStatus, startingStatusData } from './starting/StartingStatusData'
import StartingStatusPage from './starting/StartingStatusPage'
import { Cheat, pnachCheatsData, luaCheatsData } from './cheats/CheatsData'
import CheatPage from './cheats/CheatPage'



function FunctionApp() {
	//#region State
	const [allChests, setAllChests] = useState(chestsData)
	const [allPopups, setAllPopups] = useState(popupsData)
	const [allBonuses, setAllBonuses] = useState(bonusData)
	const [allForms, setAllForms] = useState(formsData)
	const [allEquipments, setAllEquipments] = useState(equipmentsData)
	const [allLevels, setAllLevels] = useState(levelsData)
	const [allMagic, setAllMagic] = useState(magicsData)
	const [allStartingStatus, setAllStartingStatus] = useState(startingStatusData)
	const [allPnachCheats, setAllPnachCheats] = useState(pnachCheatsData)
	const [allLuaCheats, setAllLuaCheats] = useState(luaCheatsData)

	const [currentTab, setCurrentTab] = useState('home')

	const [isZipCommented, setIsZipCommented] = useState(true)
	const [isPnachCommented, setIsPnachCommented] = useState(true)
	const [isLuaCommented, setIsLuaCommented] = useState(true)
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
	function handleSaveAsPnach(fileName) {
		let trackerPnachCodes = isPnachCommented ? handleTracker(true) : []

		let pnachCodes = [].concat(
			trackerPnachCodes,
			Chest.saveToPnach(allChests, isPnachCommented),
			Popup.saveToPnach(allPopups, isPnachCommented),
			BonusFight.saveToPnach(allBonuses, isPnachCommented),
			FormLevel.saveToPnach(allForms, isPnachCommented),
			Equipment.saveToPnach(allEquipments, isPnachCommented),
			Level.saveToPnach(allLevels, isPnachCommented),
			MagicAbility.saveToPnach(allMagic, isPnachCommented),
			StartingStatus.saveToPnach(allStartingStatus, isPnachCommented),
			Cheat.saveToPnach(allPnachCheats, isPnachCommented)
		)

		downloadFile(pnachCodes, fileName.length !== 0 ? '(' + fileName + ').pnach' : 'F266B00B.pnach')
	}
	function handleSaveAsLua(fileName) {
		let trackerLuaCodes = isLuaCommented ? handleTracker(false) : []

		let luaDefaultCodes = [
			'function _OnFrame()\n',
			'\tWorld = ReadByte(Now + 0x00)\n',
			'\tRoom = ReadByte(Now + 0x01)\n',
			'\tPlace = ReadShort(Now + 0x00)\n',
			'\tDoor = ReadShort(Now + 0x02)\n',
			'\tMap = ReadShort(Now + 0x04)\n',
			'\tBtl = ReadShort(Now + 0x06)\n',
			'\tEvt = ReadShort(Now + 0x08)\n',
			'\tChests()\n',
			'\tPopups()\n',
			'\tBonusRewards()\n',
			'\tDriveForms()\n',
			'\tEquipment()\n',
			'\tLevelRewards()\n',
			'\tMagicCosts()\n',
			'\tStartingStatus()\n',
			'\tCheats()\n',
			'end\n\n',
			'function _OnInit()\n',
			'\tif GAME_ID == 0xF266B00B or GAME_ID == 0xFAF99301 and ENGINE_TYPE == "ENGINE" then--PCSX2\n',
			'\t\tPlatform = \'PS2\'\n',
			'\t\tNow = 0x032BAE0 --Current Location\n',
			'\t\tSave = 0x032BB30 --Save File\n',
			'\t\tObj0 = 0x1C94100 --00objentry.bin\n',
			'\t\tSys3 = 0x1CCB300 --03system.bin\n',
			'\t\tBtl0 = 0x1CE5D80 --00battle.bin\n',
			'\t\tSlot1 = 0x1C6C750 --Unit Slot 1\n',
			'\telseif GAME_ID == 0x431219CC and ENGINE_TYPE == \'BACKEND\' then--PC\n',
			'\t\tPlatform = \'PC\'\n',
			'\t\tNow = 0x0714DB8 - 0x56454E\n',
			'\t\tSave = 0x09A7070 - 0x56450E\n',
			'\t\tObj0 = 0x2A22B90 - 0x56450E\n',
			'\t\tSys3 = 0x2A59DB0 - 0x56450E\n',
			'\t\tBtl0 = 0x2A74840 - 0x56450E\n',
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
			Chest.saveToLua(allChests, isLuaCommented),
			Popup.saveToLua(allPopups, isLuaCommented),
			BonusFight.saveToLua(allBonuses, isLuaCommented),
			FormLevel.saveToLua(allForms, isLuaCommented),
			Equipment.saveToLua(allEquipments, isLuaCommented),
			Level.saveToLua(allLevels, isLuaCommented),
			MagicAbility.saveToLua(allMagic, isLuaCommented),
			StartingStatus.saveToLua(allStartingStatus, isLuaCommented),
			Cheat.saveToLua(allLuaCheats, isPnachCommented)
		)

		downloadFile(luaCodes, fileName.length !== 0 ? '(' + fileName + ').lua' : 'F266B00B.lua')
	}
	function handleSaveAsZip(fileName) {
		let zip = new JSZip()
		let zipSeed = new ZipSeed()

		zip.file('TrsrList.yml', zipSeed.generateTrsrList(allChests, allPopups, true)) // chests and popups
		zip.file('LvupList.yml', zipSeed.generateLvupList(allLevels, true)) // level up rewards
		zip.file('FmlvList.yml', zipSeed.generateFmlvList(allForms, true)) // Form Level Rewards
		zip.file('BonsList.yml', zipSeed.generateBonsList(allBonuses, true)) // bonus level rewards
		zip.file('ItemList.yml', zipSeed.generateItemList(allEquipments, true)) // equipment stats
		zip.file('CmdList.yml', zipSeed.generateCmdList(allMagic, true)) // starting items
		zip.file('PlrpList.yml', zipSeed.generatePlrpList(allStartingStatus, true)) // starting items
		// zip.file('HintFile.hints', HintFile) // encoded hints
		zip.file('sys.yml', zipSeed.generateSys()) // Menu text edits
		zip.file('jm.yml', zipSeed.generateJm()) // random journal entries
		zip.file('mod.yml', zipSeed.generateMod(fileName)) // enabled mods/scripts

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
		let magicCostSaveData = MagicAbility.saveToJSON(allMagic)
		let startingStatusSaveData = StartingStatus.saveToJSON(allStartingStatus)

		let saveData = ['{',
			chestSaveData.join(''),
			popupSaveData.join(''),
			bonusSaveData.join(''),
			formSaveData.join(''),
			equipmentSaveData.join(''),
			levelSaveData.join(''),
			magicCostSaveData.join(''),
			startingStatusSaveData.join('').slice(0, -1),
			'}']

		downloadFile(saveData, fileName.length !== 0 ? fileName + '.json' : 'save_data.json')
	}
	function handleLoadFromJSON(loadData) {
		let allLoadData = JSON.parse(loadData)

		let newAllChests = allLoadData.hasOwnProperty('chestsData') ? allLoadData.chestsData : []
		let newAllPopups = allLoadData.hasOwnProperty('popupsData') ? allLoadData.popupsData : []
		let newAllBonuses = allLoadData.hasOwnProperty('bonusData') ? allLoadData.bonusData : []
		let newAllForms = allLoadData.hasOwnProperty('formsData') ? allLoadData.formsData : []
		let newAllEquipments = allLoadData.hasOwnProperty('equipmentsData') ? allLoadData.equipmentsData : []
		let newAllLevels = allLoadData.hasOwnProperty('levelsData') ? allLoadData.levelsData : []
		let newAllMagics = allLoadData.hasOwnProperty('magicData') ? allLoadData.magicData : []
		let newAllStartingStatus = allLoadData.hasOwnProperty('startingStatusData') ? allLoadData.startingStatusData : []

		setAllChests(Chest.loadFromJSON(newAllChests))
		setAllPopups(Popup.loadFromJSON(newAllPopups))
		setAllBonuses(BonusFight.loadFromJSON(newAllBonuses))
		setAllForms(FormLevel.loadFromJSON(newAllForms))
		setAllEquipments(Equipment.loadFromJSON(newAllEquipments))
		setAllLevels(Level.loadFromJSON(newAllLevels))
		setAllMagic(MagicAbility.loadFromJSON(newAllMagics))
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
			eventKey: 'home',
			fileName: 'home',
			title: 'Home',
			page: (
				<HomePage>
					<Col xs={3}>
						<SaveLoadModal
							isZipCommented={isZipCommented}
							isPnachCommented={isPnachCommented}
							isLuaCommented={isLuaCommented}
							onZipCommentChange={() => { setIsZipCommented(!isZipCommented) }}
							onPnachCommentChange={() => { setIsPnachCommented(!isPnachCommented) }}
							onLuaCommentChange={() => { setIsLuaCommented(!isLuaCommented) }}
							handleSaveAsPnach={handleSaveAsPnach}
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
					</Col>
				</HomePage>
			)
		},
		{
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
			eventKey: 'magic',
			fileName: 'spell',
			title: 'Magic & Limits',
			page: (
				<MagicPage
					magicData={allMagic}
					setAllMagic={setAllMagic}
				>
					<HelpModal tab={currentTab} />
				</MagicPage>
			)
		},
		{
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

	let styles = {
		marginTop: '10px',
		marginRight: '10px',
		marginBottom: '10px',
		marginLeft: '10px',
		color: '#fff'
	}

	let tabList = tabDataList.map(tab => {
		return (
			<Tab
				key={tab.eventKey}
				eventKey={tab.eventKey}
				title={
					<>
						<Icon
							fileName={tab.fileName}
							type={'tab'}
						>
							{tab.title}
						</Icon>
					</>}
			>
				{tab.page}
			</Tab>
		)
	})

	return (
		<div style={styles}>
			<Tabs
				defaultActiveKey={currentTab}
				id='allTabs'
				transition={false}
				unmountOnExit={true}
				onSelect={(newTab) => setCurrentTab(newTab)}
			>
				{tabList}
			</Tabs>
		</div>
	)
}

export default FunctionApp