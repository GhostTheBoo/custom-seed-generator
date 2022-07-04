import { React, useState } from 'react'
import { Tabs, Tab, Col } from 'react-bootstrap'

import SaveLoadModal from './Components/SaveLoadModal'
import Icon from './Components/Icon'
import HelpModal from './Components/HelpModal'

import Tracker from './Data/trackerData'

import HomePage from './home/HomePage'

import { chestsData } from './chests/ChestsData'
import ChestPage from './chests/ChestPage'
import { popupsData } from './popups/PopupsData'
import PopupPage from './popups/PopupPage'
import { bonusData } from './bonus/BonusData'
import BonusPage from './bonus/BonusPage'
import { formsData } from './forms/FormsData'
import FormPage from './forms/FormPage'
import { equipmentsData } from './equipment/EquipmentsData'
import EquipmentPage from './equipment/EquipmentPage'
import { levelsData } from './levels/LevelData'
import LevelPage from './levels/LevelPage'
import { magicData } from './magic/MagicData'
import MagicPage from './magic/MagicPage'



function FunctionApp() {
	//#region State
	const [allChests, setAllChests] = useState(chestsData)
	const [allPopups, setAllPopups] = useState(popupsData)
	const [allBonuses, setAllBonuses] = useState(bonusData)
	const [allForms, setAllForms] = useState(formsData)
	const [allEquipments, setAllEquipments] = useState(equipmentsData)
	const [allLevels, setAllLevels] = useState(levelsData)
	const [allMagic, setAllMagic] = useState(magicData)

	const [currentTab, setCurrentTab] = useState('home')

	const [isPnachCommented, setIsPnachCommented] = useState(true)
	const [isLuaCommented, setIsLuaCommented] = useState(true)
	//#endregion

	//#region General Functions
	function handleTracker(isPnach) {
		//Chest Tracker
		let chestTracker = allChests.reduce((prevWorlds, currentWorld) => {
			currentWorld.chests.forEach(chest => { prevWorlds = prevWorlds.update(chest.replacementReward.index) })
			return prevWorlds
		}, new Tracker())

		return (isPnach)
			? [
				'//GAME STATUS\n',
				chestTracker.saveToPnach('CHEST') + '\n'
			]
			: [
				'--GAME STATUS\n',
				chestTracker.saveToLua('CHEST') + '\n'
			]
	}
	function handleSaveAsPnach(fileName) {
		let trackerPnachCodes = isPnachCommented ? handleTracker(true) : []

		let chestPnachCodes = allChests.map(worldList => {
			let ret = isPnachCommented ? '// ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.chests.forEach(chest => { ret += chest.saveToPnach(isPnachCommented) })
			return ret
		})
		chestPnachCodes.unshift('\n//CHESTS\n')

		let pnachCodes = [].concat(trackerPnachCodes, chestPnachCodes)

		const element = document.createElement('a')
		const file = new Blob(pnachCodes, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = fileName.length !== 0 ? '(' + fileName + ').pnach' : 'F266B00B.pnach'
		document.body.appendChild(element)
		element.click()
	}
	function handleSaveAsLua(fileName) {
		let trackerLuaCodes = isLuaCommented ? handleTracker(false) : []

		let chestLuaCodes = ['\nfunction Chests()\n'].concat(allChests.map(worldList => {
			let ret = isLuaCommented ? '\t-- ' + worldList.world.toUpperCase() + '\n' : ''
			worldList.chests.forEach(chest => { ret += chest.saveToLua(isLuaCommented) })
			return ret
		}), ['end\n'])

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
			'\tDriveForms()\n',
			'\tEquipment()\n',
			'\tBonusRewards()\n',
			'\tLevelRewards()\n',
			'\tMagicCosts()\n',
			'\tStartingAbilities()\n',
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
			'\t\tNow = 0x0714DB8 - 0x56450E\n',
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

		let luaCodes = [].concat(trackerLuaCodes, luaDefaultCodes, chestLuaCodes)

		const element = document.createElement('a')
		const file = new Blob(luaCodes, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = fileName.length !== 0 ? '(' + fileName + ').lua' : 'F266B00B.lua'
		document.body.appendChild(element)
		element.click()
	}
	function handleSaveAsJSON(fileName) {
		let chestSaveData = allChests.map(world => {
			let ret = ''
			world.chests.forEach(chest => {
				ret += chest.saveToJSON()
			})
			if (ret !== '')
				return '{"world":"' + world.world + '","chests":[' + ret.slice(0, -1) + ']}'
			return ret
		})
		chestSaveData = ['"chestsData":[', chestSaveData.filter(s => s !== '').join(), '],']

		let saveData = ['{',
			chestSaveData.join(''),
			'}']

		const element = document.createElement("a")
		const file = new Blob(saveData, { type: 'text/plain;charset=utf-8' })
		element.href = URL.createObjectURL(file)
		element.download = fileName.length !== 0 ? fileName + '.json' : 'save_data.json'
		document.body.appendChild(element)
		element.click()
	}
	function onFileUpload(loadData) {
		let allLoadData = JSON.parse(loadData)
		let globalIndex = 0

		let chestLoadData = (allLoadData.hasOwnProperty('chestsData') ? allLoadData.chestsData : [])
		let newAllChests = chestsData.map(world => {
			if (globalIndex < chestLoadData.length) {
				if (chestLoadData[globalIndex].world === world.world) {
					let chestIndex = 0
					let newChests = world.chests.map(chest => {
						if (chestIndex < chestLoadData[globalIndex].chests.length) {
							if (chestLoadData[globalIndex].chests[chestIndex].vanillaAddress === chest.vanillaAddress) {
								let ret = chest.loadFromJSON(chestLoadData[globalIndex].chests[chestIndex])
								chestIndex++
								return ret
							}
						}
						return chest
					})
					globalIndex++
					return {
						...world,
						chests: newChests
					}
				}
			}
			return world
		})
		globalIndex = 0

		setAllChests(newAllChests)
	}
	//#endregion

	let styles = {
		marginTop: '10px',
		marginRight: '10px',
		marginBottom: '10px',
		marginLeft: '10px',
		color: '#fff'
	}

	let saveLoadModal = <SaveLoadModal
		isPnachCommented={isPnachCommented}
		isLuaCommented={isLuaCommented}
		onPnachCommentChange={() => { setIsPnachCommented(!isPnachCommented) }}
		onLuaCommentChange={() => { setIsLuaCommented(!isLuaCommented) }}
		handleSaveAsPnach={handleSaveAsPnach}
		handleSaveAsLua={handleSaveAsLua}
		handleSaveAsJSON={handleSaveAsJSON}
		onFileUpload={(e) => {
			let file = e.target.files[0]
			let reader = new FileReader()
			reader.readAsText(file)
			reader.onload = (e) => onFileUpload(e.target.result)
		}}
	/>

	return (
		<div style={styles}>
			<Tabs defaultActiveKey={currentTab} id='allTabs' transition={false} onSelect={(newTab) => setCurrentTab(newTab)}>
				{/* Home */}
				<Tab
					eventKey='home'
					title={
						<>
							<Icon
								fileName={'home'}
								type={'tab'}
							>
								{'Home'}
							</Icon>
						</>
					}
				>
					<HomePage>
						<Col xs={2}>
							{saveLoadModal}
						</Col>
					</HomePage>
				</Tab>
				{/* Chest */}
				<Tab
					eventKey='chest'
					title={
						<>
							<Icon
								fileName={'chest'}
								type={'tab'}
							>
								{'Chest'}
							</Icon>
						</>}
				>
					<ChestPage
						chestData={allChests}
						setAllChests={setAllChests}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</ChestPage>
				</Tab>
				{/* Popup */}
				<Tab
					eventKey='popup'
					title={
						<>
							<Icon
								fileName={'popup'}
								type={'tab'}
							>
								{'Popup'}
							</Icon>
						</>}
				>
					<PopupPage
						popupData={allPopups}
						setAllPopups={setAllPopups}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</PopupPage>
				</Tab>
				{/* Bonus */}
				<Tab
					eventKey='bonus'
					title={
						<>
							<Icon
								fileName={'key'}
								type={'tab'}
							>
								{'Bonus'}
							</Icon>
						</>}
				>
					<BonusPage
						bonusData={allBonuses}
						setAllBonuses={setAllBonuses}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</BonusPage>
				</Tab>
				{/* Form */}
				<Tab
					eventKey='form'
					title={
						<>
							<Icon
								fileName={'form'}
								type={'tab'}
							>
								{'Forms & Summons'}
							</Icon>
						</>}
				>
					<FormPage
						formData={allForms}
						setAllForms={setAllForms}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</FormPage>
				</Tab>
				{/* Equipment */}
				<Tab
					eventKey='equipment'
					title={
						<>
							<Icon
								fileName={'keyblade'}
								type={'tab'}
							>
								{'Equipment'}
							</Icon>
						</>}
				>
					<EquipmentPage
						equipmentData={allEquipments}
						setAllEquipments={setAllEquipments}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</EquipmentPage>
				</Tab>
				{/* Level */}
				<Tab
					eventKey='level'
					title={
						<>
							<Icon
								fileName={'level'}
								type={'tab'}
							>
								{'Levels'}
							</Icon>
						</>}
				>
					<LevelPage
						levelData={allLevels}
						setAllLevels={setAllLevels}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</LevelPage>
				</Tab>
				{/* Magic and Limits */}
				<Tab
					eventKey='magic'
					title={
						<>
							<Icon
								fileName={'spell'}
								type={'tab'}
							>
								{'Magic & Limits'}
							</Icon>
						</>}
				>
					<MagicPage
						magicData={allMagic}
						setAllMagic={setAllMagic}
					>
						<HelpModal tab={currentTab} />
						{saveLoadModal}
					</MagicPage>
				</Tab>
			</Tabs>
		</div>
	)
}

export default FunctionApp