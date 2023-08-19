import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './CostStyles.css'

import GenericSelect from '../Components/GenericSelect'

import CostCard from './CostCard'

function CostPage(props) {
	const [currentFocus, setCurrentFocus] = useState(-1)
	const [currentAbilityType, setCurrentAbilityType] = useState(0)

	const costCardGrid = useRef(null)
	useEffect(() => {
		costCardGrid.current.scrollTo({ top: 0, behavior: 'smooth' })
	}, [currentAbilityType])

	let currentAbilityTypeCategories = props.costData[currentAbilityType]

	function updateCost(newCategoryIndex, costAddress, newCost) {
		let newCategoryAbilities = props.costData[currentAbilityType].abilities.map((category, categoryIndex) => {
			let newSpecificAbilities = category.specificAbilities
			if (categoryIndex === newCategoryIndex) {
				newSpecificAbilities = category.specificAbilities.map(specificAbility => {
					if (specificAbility.costAddress === costAddress)
						return specificAbility.replace(newCost)
					return specificAbility
				})
			}
			return {
				...category,
				specificAbilities: newSpecificAbilities
			}
		})
		updateAllCosts(newCategoryAbilities)
	}
	function updateAllCosts(newAbilityTypes) {
		let newCostData = props.costData.map((abilityType, abilityTypeIndex) => {
			if (currentAbilityType === abilityTypeIndex)
				return {
					...abilityType,
					abilities: newAbilityTypes
				}
			return abilityType
		})
		props.setAllCosts(newCostData)
	}

	let costList = currentAbilityTypeCategories.abilities.map((category, categoryIndex) => {
		let cardList = category.specificAbilities.map(specificAbility => {
			return (
				<CostCard
					key={specificAbility.costAddress}
					id={specificAbility.costAddress}
					category={category}
					categoryIndex={categoryIndex}
					ability={specificAbility}
					isEditing={currentFocus === specificAbility.costAddress}
					updateFocus={setCurrentFocus}
					updateCost={updateCost}
				/>
			)
		})
		let image = <img
			className='costCategoryImage'
			src={`./images/${category.path}.png`}
			alt={category.category}
			width='100%'
			height='auto'
		/>

		return <div key={`categoryGroup${category.category}`} className='costGridGroup'>
			{image}
			{cardList}
		</div>
	})

	return (
		<div className='fullPageContent'>
			<motion.div
				initial={{ opacity: .25, x: 100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ type: 'spring', duration: .5 }}
				className='pageHeader'
			>
				<div className='pageHeaderSelectorLabel'>
					Ability Type Selector:
				</div>
				<div>
					<GenericSelect
						class={'categoryIndex'}
						selector={'Ability Type'}
						itemList={props.costData.map(abilityType => { return abilityType.type })}
						name={'currentAbilityType'}
						currentItem={currentAbilityType}
						onChange={(e) => setCurrentAbilityType(parseInt(e.target.value))}
					/>
				</div>
				<div className='flex-grow-1' />
				<div>{props.children}</div>
			</motion.div>
			<AnimatePresence mode='popLayout'>
				<motion.div
					initial={{ opacity: .25, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, y: 100 }}
					transition={{ type: 'spring', duration: .5 }}
					key={`cost${currentAbilityType}`}
					className='costPageContent'
				>
					<div className='costCardGrid flex-grow-1' ref={costCardGrid}>{costList}</div>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default CostPage