import React, { useState, useRef } from 'react'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

import GenericSelect from '../Components/GenericSelect'

import BonusFightList from './BonusFightList'
import BonusCard from './BonusCard'
import BonusForm from './BonusForm'
import './BonusStyles.css'
import './BonusCardStyles.css'

function BonusPage(props) {
	// PROPS:
	// bonusData: array of world's bonus fights -> {world, bonusFight[]}[]
	// setAllBonuses: parent state function to set all bonuses -> function

	const [currentWorld, setCurrentWorld] = useState(0)
	const [currentBonusFight, setCurrentBonusFight] = useState(0)
	const [currentBonusFightSlot, setCurrentBonusFightSlot] = useState(-1)
	const bonusCardRefs = useRef([])
	const bonusFormRef = useRef()

	function handleWorldChange(newWorld) {
		setCurrentWorld(newWorld)
		handleBonusFightChange(0)
	}
	function handleBonusFightChange(newBonusFight) {
		setCurrentBonusFight(newBonusFight)
		handleBonusFightSlotChange(-1)
	}
	function handleBonusFightSlotChange(newBonusFightSlot) {
		setCurrentBonusFightSlot(newBonusFightSlot)
	}
	function updateCurrentBonusFightSlot(newBonusReward) {
		props.setAllBonuses(props.bonusData.map((world, worldIndex) => {
			if (worldIndex === currentWorld) {
				let newBonusFights = world.bonusFights.map((bonusFight, bonusFightIndex) => {
					if (bonusFightIndex === currentBonusFight) {
						return bonusFight.update(newBonusReward, currentBonusFightSlot)
					}
					return bonusFight
				})
				return ({
					world: world.world,
					bonusFights: newBonusFights
				})
			}
			return world
		}))
		handleBonusFightSlotChange(-1)
	}

	let bonusSlotList = props.bonusData[currentWorld].bonusFights[currentBonusFight].slots.map((slot, slotIndex) => {
		return (
			<BonusCard
				key={`BonusCard${currentWorld}${currentBonusFight}${slotIndex}`}
				ref={(element) => bonusCardRefs.current.push(element)}
				bonusReward={slot}
				isEditing={slotIndex === currentBonusFightSlot}
				slotIndex={slotIndex}
				setCurrentBonusFightSlot={(newBonusFightSlot) => { handleBonusFightSlotChange(newBonusFightSlot) }}
			/>
		)
	})

	return (
		<div className='fullPageContent'>
			<motion.div
				initial={{ opacity: .25, x: 500 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ type: 'spring', duration: .5 }}
				className='pageHeader'
			>
				<div className='pageHeaderSelectorLabel'>
					World Selector:
				</div>
				<div>
					<GenericSelect
						class={'bonus'}
						selector={'World'}
						itemList={props.bonusData.map(world => { return world.world })}
						name={'currentWorld'}
						currentItem={currentWorld}
						onChange={(e) => handleWorldChange(parseInt(e.target.value))}
					/>
				</div>
				<div className='flex-grow-1' />
				<div>
					{props.children}
				</div>
			</motion.div>
			<div className='bonusPageContent'>
				<AnimatePresence mode='popLayout'>
					<motion.div
						initial={{ opacity: .25, x: 500 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, y: 500 }}
						transition={{ type: 'spring', duration: .5 }}
						className='bonusFightList'
						key='bonusFightList'
					>
						<BonusFightList
							fightList={props.bonusData[currentWorld].bonusFights}
							// displayFightName={currentBonusFightSlot === -1}
							currentWorld={currentWorld}
							currentSelectItem={currentBonusFight}
							setCurrentSelectItem={(newBonusFight) => {
								handleBonusFightChange(newBonusFight)
							}}
						/>
					</motion.div>
					<motion.div
						layout
						layoutId='bonusCards'
						className='bonusLevelCards'
						key='bonusLevelCards'
					>
						<div className='bonusFightName'>{props.bonusData[currentWorld].bonusFights[currentBonusFight].fightName}</div>
						<AnimatePresence mode='popLayout'>
							{bonusSlotList}
						</AnimatePresence>
					</motion.div>
					{
						currentBonusFightSlot !== -1
							?
							<BonusForm
								key={`bonusFormCard${currentWorld}${currentBonusFight}${currentBonusFightSlot}`}
								keyValue={`bonusFormCard${currentWorld}${currentBonusFight}${currentBonusFightSlot}`}
								ref={bonusFormRef}
								currentSlotNumber={currentBonusFightSlot}
								bonusReward={props.bonusData[currentWorld].bonusFights[currentBonusFight].slots[currentBonusFightSlot]}
								setCurrentBonusFightSlot={updateCurrentBonusFightSlot}
								closeFormCard={handleBonusFightSlotChange}
							/>
							: <></>
					}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default BonusPage