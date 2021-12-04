import { React, useState } from 'react'
import { Row, Container, Col } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import ChestCard from './ChestCard'
import AllChestCard from './AllChestCard'

function ChestPage(props) {
	// PROPS:
	// chestData: array of worlds + chest objects -> {world, chests[]}[]
	// setAllChests: parent state function to set all chests -> function

	const [currentWorld, setCurrentWorld] = useState(0)

	let columnNum = 5
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
			<Col
				key={currentWorld + '_' + chestIndex}
				xs
			>
				<ChestCard
					key={chestIndex}
					id={chestIndex}
					chest={chest}
					currentWorldFolderName={chestFolderNames[currentWorld]}
					handleVanilla={(replacedChest) => { updateChest(replacedChest.vanilla()) }}
					handleReplace={(replacedChest, replacementReward) => { updateChest(replacedChest.replace({ reward: { ...replacementReward } })) }}
				/>
			</Col>
		)
	})

	chestList.push(
		<Col
			key={currentWorld + '_' + currentWorldChests.length}
			xs
		>
			<AllChestCard
				key={currentWorldChests.length}
				id={currentWorldChests.length}
				currentWorldFolderName={chestFolderNames[currentWorld]}
				handleVanilla={() => updateAllChests(currentWorldChests.map(chest => { return chest.vanilla() }))}
				handleReplace={(replacementReward) => updateAllChests(currentWorldChests.map(chest => { return chest.replace({ reward: { ...replacementReward } }) }))}
			/>
		</Col>
	)

	for (let i = chestList.length; chestList.length % columnNum !== 0; i++)
		chestList.push(<Col key={currentWorld + '_' + i} xs />)

	let chestRowList = []

	for (let i = 0; i < chestList.length; i += columnNum) {
		chestRowList.push(
			<Row
				key={currentWorld + '_' + i}
			>
				{chestList.slice(i, i + columnNum)}
			</Row>
		)
	}

	return (
		<Container fluid>
			<Row>
				<GenericSelect
					class={'chest'}
					selector={'World'}
					itemList={props.chestData.map(world => { return world.world })}
					name={'currentWorld'}
					currentItem={currentWorld}
					onChange={(e) => setCurrentWorld(parseInt(e.target.value))}
				/>
				{/* Room Select? */}
			</Row>
			<Container
				fluid
				className='cardGrid'
			>
				{chestRowList}
			</Container>
		</Container>
	)
}

export default ChestPage