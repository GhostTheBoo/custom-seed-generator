import React, { useState, useRef, useEffect } from 'react'

import { motion } from 'framer-motion'

import GenericSelect from '../Components/GenericSelect'

import PopupCard from './PopupCard'

import './PopupStyles.css'

function PopupPage(props) {
	// PROPS:
	// popupData: array of worlds + popup objects -> {world, popups[]}[]
	// setAllPopups: parent state function to set all popups -> function

	const [currentWorld, setCurrentWorld] = useState(0)
	let currentWorldPopups = props.popupData[currentWorld].popups
	const popupCardGrid = useRef(null)
	useEffect(() => {
		popupCardGrid.current.scrollTo({ top: 0, behavior: 'smooth' })
	}, [currentWorld])

	function updatePopups(newPopup) {
		let newWorldPopups = currentWorldPopups.map(popup => {
			if (newPopup.vanillaAddress === popup.vanillaAddress)
				return newPopup
			return popup
		})
		updateAllPopups(newWorldPopups)
	}
	function updateAllEmptyPopups(newReward) {
		let newWorldPopups = currentWorldPopups.map(popup => {
			if (popup.replacementReward.index === 0)
				return popup.replace({ reward: { ...newReward } })
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
				world={props.popupData[currentWorld].world}
				popup={popup}
				handleVanilla={() => { updatePopups(popup.vanilla()) }}
				handleReplace={(replacementReward) => { updatePopups(popup.replace({ reward: { ...replacementReward } })) }}
			/>
		)
	}).concat([
		<PopupCard
			key={'AllPopups'}
			id={currentWorldPopups.length}
			world={props.popupData[currentWorld].world}
			handleVanilla={() => updateAllPopups(currentWorldPopups.map(popup => { return popup.vanilla() }))}
			handleReplace={(replacementReward) => updateAllPopups(currentWorldPopups.map(popup => { return popup.replace({ reward: { ...replacementReward } }) }))}
			handleReplaceAllEmpty={(replacementReward) => updateAllEmptyPopups(replacementReward)}
		/>
	])

	return (
		<div className='pageContent popupPageContent' ref={popupCardGrid}>
			<motion.div
				initial={{ opacity: .25, x: 100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ type: 'spring', duration: .5 }}
				className='pageHeader'
			>
				<div className='pageHeaderSelectorLabel'>
					World Selector:
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
			</motion.div>
			<div className='popupCardGrid'>
				{popupList}
			</div>
		</div>
	)
}

export default PopupPage