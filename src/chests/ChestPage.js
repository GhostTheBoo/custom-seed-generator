import { React, useState, useEffect, useRef } from 'react'
import { Row, Container, Col } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import ChestCard from './ChestCard'
import AllChestCard from './AllChestCard'

function ChestPage(props) {
	// PROPS:
	// chestData: array of worlds + chest objects -> {world, chests[]}[]
	// setAllChests: parent state function to set all chests -> function

	const [currentWorld, setCurrentWorld] = useState(0)
	const chestCardGrid = useRef(null)
	useEffect(() => {
		chestCardGrid.current.scrollTop = 0
	}, [currentWorld])

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
				key={'chestCol' + chestIndex}
				xs
			>
				<ChestCard
					key={'chest' + chestIndex}
					id={chestIndex}
					chest={chest}
					currentFolderName={chestFolderNames[currentWorld]}
					handleVanilla={(replacedChest) => { updateChest(replacedChest.vanilla()) }}
					handleReplace={(replacedChest, replacementReward) => { updateChest(replacedChest.replace({ reward: { ...replacementReward } })) }}
				/>
			</Col>
		)
	})

	chestList.push(
		<Col
			key={'chestColAll'}
			xs
		>
			<AllChestCard
				key={'chestAll'}
				id={currentWorldChests.length}
				currentFolderName={chestFolderNames[currentWorld]}
				handleVanilla={() => updateAllChests(currentWorldChests.map(chest => { return chest.vanilla() }))}
				handleReplace={(replacementReward) => updateAllChests(currentWorldChests.map(chest => { return chest.replace({ reward: { ...replacementReward } }) }))}
			/>
		</Col>
	)

	for (let i = chestList.length; chestList.length % columnNum !== 0; i++)
		chestList.push(<Col key={'chest' + currentWorld + '_empty_' + i} xs />)

	let chestRowList = []

	for (let i = 0; i < chestList.length; i += columnNum) {
		chestRowList.push(
			<Row
				key={'chestRows' + currentWorld + '_' + i}
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
			</Row>
			<Container
				fluid
				className='cardGrid'
				ref={chestCardGrid}
				style={{
					overflowY: 'auto',
					height: '800px'
				}}
			>
				{chestRowList}
			</Container>
		</Container>
	)
}

export default ChestPage