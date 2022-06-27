import { React, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import PopupCard from './PopupCard'
import AllPopupCard from './AllPopupCard'

function PopupPage(props) {
	// PROPS:
	// popupData: array of worlds + popup objects -> {world, popups[]}[]
	// setAllPopups: parent state function to set all popups -> function

	const [currentWorld, setCurrentWorld] = useState(0)
	let columnNum = 5
	let currentWorldPopups = props.popupData[currentWorld].popups

	function updatePopups(newPopup) {
		let newWorldPopups = currentWorldPopups.map(popup => {
			if (newPopup.vanillaAddress === popup.vanillaAddress)
				return newPopup
			return popup
		})
		updateAllPopups(newWorldPopups)
	}
	function updateAllPopups(newWorldPopups) {
		let newPopupData = props.popupData.map((world, worldIndex) => {
			if (currentWorld === worldIndex)
				return {
					world: world.world,
					popups: newWorldPopups
				}
			return world
		})
		props.setAllPopups(newPopupData)
	}

	let popupList = currentWorldPopups.map((popup, popupIndex) => {
		return (
			<Col
				key={'popup' + currentWorld + '_' + popupIndex}
				xs
			>
				<PopupCard
					key={'popup' + popupIndex}
					id={popupIndex}
					popup={popup}
					handleVanilla={(replacedPopup) => { updatePopups(replacedPopup.vanilla()) }}
					handleReplace={(replacedPopup, replacementReward) => { updatePopups(replacedPopup.replace({ reward: { ...replacementReward } })) }}
				/>
			</Col>
		)
	})

	popupList.push(
		<Col
			key={'chestColAll'}
			xs
		>
			<AllPopupCard
				key={'chestAll'}
				id={currentWorldPopups.length}
				// currentFolderName={chestFolderNames[currentWorld]}
				handleVanilla={() => updateAllPopups(currentWorldPopups.map(popup => { return popup.vanilla() }))}
				handleReplace={(replacementReward) => updateAllPopups(currentWorldPopups.map(popup => { return popup.replace({ reward: { ...replacementReward } }) }))}
			/>
		</Col>
	)

	for (let i = popupList.length; popupList.length % columnNum !== 0; i++)
		popupList.push(<Col key={'popup' + currentWorld + '_' + i} xs />)

	let popupRowList = []

	for (let i = 0; i < popupList.length; i += columnNum) {
		popupRowList.push(
			<Row
				key={'popup' + currentWorld + '_' + i}
			>
				{popupList.slice(i, i + columnNum)}
			</Row>
		)
	}

	return (
		<Container fluid>
			<Row>
				<GenericSelect
					class={'popup'}
					selector={'World'}
					itemList={props.popupData.map(world => { return world.world })}
					name={'currentWorld'}
					currentItem={currentWorld}
					onChange={(e) => setCurrentWorld(parseInt(e.target.value))}
				/>
			</Row>
			<Container
				fluid
				className='cardGrid'
			>
				{popupRowList}
			</Container>
		</Container>
	)
}

export default PopupPage