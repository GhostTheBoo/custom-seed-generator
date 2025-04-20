import React, { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import GSelect from '../generic/GSelect'


import BonusFightList from './BonusFightList'
import BonusCardList from './BonusCardList'
import BonusForm from './BonusForm'

import './styles/BonusStyles.css'
import './styles/BonusCardStyles.css'
import './styles/BonusFightListStyles.css'

function BonusPage(props) {
	// PROPS:
	// bonusData: array of world's bonus fights -> {world, bonusFight[]}[]
	// setAllBonuses: parent state function to set all bonuses -> function

	const [currentWorld, setCurrentWorld] = useState(0)
	const [currentBonusFight, setCurrentBonusFight] = useState(0)
	const [currentBonusFightSlot, setCurrentBonusFightSlot] = useState(-1)

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

	return (
		<div className='fullPageContent'>
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
					<GSelect
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
				<BonusFightList
					fightList={props.bonusData[currentWorld].bonusFights}
					currentWorld={currentWorld}
					currentFight={currentBonusFight}
					setCurrentFight={(newBonusFight) => { handleBonusFightChange(newBonusFight) }}
				/>
				<BonusCardList
					slots={props.bonusData[currentWorld].bonusFights[currentBonusFight].slots}
					currentWorld={currentWorld}
					currentFight={currentBonusFight}
					currentSlot={currentBonusFightSlot}
					setCurrentBonusFightSlot={(newBonusFightSlot) => { handleBonusFightSlotChange(newBonusFightSlot) }}
				/>
				<AnimatePresence>
					{
						currentBonusFightSlot !== -1
							?
							<BonusForm
								key={`bonusFormCard${currentWorld}${currentBonusFight}${currentBonusFightSlot}`}
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