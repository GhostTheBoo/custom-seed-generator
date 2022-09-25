import { React, useState } from 'react'
import { Container, Form } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import PopupCard from './PopupCard'
// import AllPopupCard from './AllPopupCard'
import './PopupStyles.css'

function PopupPage(props) {
	// PROPS:
	// popupData: array of worlds + popup objects -> {world, popups[]}[]
	// setAllPopups: parent state function to set all popups -> function

	const [currentWorld, setCurrentWorld] = useState(0)
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
			<PopupCard
				key={'popup' + popupIndex}
				id={popupIndex}
				popup={popup}
				handleVanilla={() => { updatePopups(popup.vanilla()) }}
				handleReplace={(replacementReward) => { updatePopups(popup.replace({ reward: { ...replacementReward } })) }}
			/>
		)
	})
	popupList.push(
		<PopupCard
			key={'AllPopups'}
			id={currentWorldPopups.length}
			handleVanilla={() => updateAllPopups(currentWorldPopups.map(popup => { return popup.vanilla() }))}
			handleReplace={(replacementReward) => updateAllPopups(currentWorldPopups.map(popup => { return popup.replace({ reward: { ...replacementReward } }) }))}
		/>
	)

	return (
		<Container fluid>
			<div className='pageHeader'>
				<div>
					<Form.Label>World Selector:</Form.Label>
				</div>
				<div>
					<GenericSelect
						class={'popup'}
						selector={'World'}
						itemList={props.popupData.map(world => { return world.world })}
						name={'currentWorld'}
						currentItem={currentWorld}
						onChange={(e) => setCurrentWorld(parseInt(e.target.value))}
					/>
				</div>
				<div className='flex-grow-1' />
				<div>
					{props.children}
				</div>
			</div>
			<Container
				fluid
				className='popupCardGrid'
			>
				{popupList}
			</Container>
		</Container>
	)
}

export default PopupPage