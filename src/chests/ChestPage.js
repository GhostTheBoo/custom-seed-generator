import React, { useState, useEffect, useRef } from 'react'

import GenericSelect from '../Components/GenericSelect'
import NavbarIcon from '../navbar/NavbarIcon'
import ChestCard from './ChestCard'
import './ChestStyles.css'


function ChestPage(props) {
	// PROPS:
	// chestData: array of worlds + chest objects -> {world, chests[]}[]
	// setAllChests: parent state function to set all chests -> function

	const [currentWorld, setCurrentWorld] = useState(0)
	const chestCardGrid = useRef(null)
	useEffect(() => {
		chestCardGrid.current.scrollTo({ top: 0, behavior: 'smooth' })
	}, [currentWorld])

	let currentWorldChests = props.chestData[currentWorld].chests

	const chestFolderNames = [
		'agr',
		'bc',
		'cor',
		'dc',
		'ht',
		'hb',
		'lod',
		'oc',
		'pooh',
		'pr',
		'pl',
		'stt',
		'sp',
		'tr',
		'tt',
		'twtnw'
	]

	function updateChest(newChest) {
		let newWorldChests = currentWorldChests.map(chest => {
			if (newChest.vanillaAddress === chest.vanillaAddress)
				return newChest
			return chest
		})
		updateAllChests(newWorldChests)
	}
	function updateAllChests(newWorldChests) {
		let newChestData = props.chestData.map((world, worldIndex) => {
			if (currentWorld === worldIndex)
				return {
					world: world.world,
					chests: newWorldChests
				}
			return world
		})
		props.setAllChests(newChestData)
	}

	let chestList = currentWorldChests.map((chest, chestIndex) => {
		return (
			<ChestCard
				key={'chest' + chestIndex}
				id={chestIndex}
				chest={chest}
				currentFolderName={chestFolderNames[currentWorld]}
				handleReplace={(replacementReward) => { updateChest(chest.replace({ reward: { ...replacementReward } })) }}
				handleVanilla={() => { updateChest(chest.vanilla()) }}
			/>
		)
	})
	chestList.push(
		<ChestCard
			key={'chestAll'}
			id={currentWorldChests.length}
			currentFolderName={chestFolderNames[currentWorld]}
			handleVanilla={() => updateAllChests(currentWorldChests.map(chest => { return chest.vanilla() }))}
			handleReplace={(replacementReward) => updateAllChests(currentWorldChests.map(chest => { return chest.replace({ reward: { ...replacementReward } }) }))}
		/>
	)

	return (
		<div className='fullPageContent'>
			<div className='pageHeader'>
				<div className='pageHeaderSelectorLabel'>
					World Selector:
				</div>
				<div>
					<GenericSelect
						class={'chest'}
						selector={'World'}
						itemList={props.chestData.map(world => { return world.world })}
						name={'currentWorld'}
						currentItem={currentWorld}
						onChange={(e) => setCurrentWorld(parseInt(e.target.value))}
					/>
				</div>
				<div className='flex-grow-1' />
				<div>
					{props.children}
				</div>
				<NavbarIcon
					showNavbar={props.handleShowNavbar}
					fileName={'chest'}
					title={'Chest'}
				/>
			</div>
			<div className='chestCardGrid' ref={chestCardGrid}>
				{chestList}
			</div>
		</div>
	)
}

export default ChestPage