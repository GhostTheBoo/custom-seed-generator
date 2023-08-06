import React, { useState, useEffect, useRef } from 'react'
import './CostStyles.css'

import GenericSelect from '../Components/GenericSelect'
import NavbarIcon from '../navbar/NavbarIcon'

import CostCard from './CostCard'
import CostForm from './CostForm'

function CostPage(props) {
	const [currentAbilityType, setCurrentAbilityType] = useState(0)
	const [currentCategory, setCurrentCategory] = useState(-1)
	const [currentCostFieldData, setCurrentCostFieldData] = useState([0, 0, 0, 0, 0])
	const costCardGrid = useRef(null)
	useEffect(() => {
		costCardGrid.current.scrollTo({ top: 0, behavior: 'smooth' })
	}, [currentAbilityType])

	let currentAbilityTypeCategories = props.costData[currentAbilityType]

	function handleCostChange(newCategory) {
		if (newCategory !== -1) {
			let newCosts = [0, 0, 0, 0, 0]
			currentAbilityTypeCategories.abilities[newCategory].specificAbilities.forEach((specificAbility, sepcificAbilityIndex) => {
				newCosts[sepcificAbilityIndex] = specificAbility.replacementCost
			})
			setCurrentCostFieldData(newCosts)
		}
		else setCurrentCostFieldData([0, 0, 0, 0, 0])
	}

	function handleCurrentAbilityTypeChange(newAbilityType) {
		handleCurrentCategoryChange(-1)
		setCurrentAbilityType(newAbilityType)
	}

	function handleCurrentCategoryChange(newCategory) {
		handleCostChange(newCategory)
		setCurrentCategory(newCategory)
	}
	function handleVanilla(vanillaCategoryTypeIndex) {
		let newCategoryAbilities = currentAbilityTypeCategories.abilities.map((categoryType, categoryTypeIndex) => {
			let newSpecificAbilities = categoryType.specificAbilities
			if (categoryTypeIndex === vanillaCategoryTypeIndex) {
				newSpecificAbilities = categoryType.specificAbilities.map(specificAbility => {
					return specificAbility.vanilla()
				})
			}
			return {
				...categoryType,
				specificAbilities: newSpecificAbilities
			}
		})
		handleCurrentCategoryChange(-1)
		updateAllCosts(newCategoryAbilities)
	}
	function updateCost() {
		let newCategoryAbilities = currentAbilityTypeCategories.abilities.map((categoryType, categoryTypeIndex) => {
			let newSpecificAbilities = categoryType.specificAbilities
			if (categoryTypeIndex === currentCategory) {
				newSpecificAbilities = categoryType.specificAbilities.map((specificAbility, specificAbilityIndex) => {
					return specificAbility.replace(currentCostFieldData[specificAbilityIndex])
				})
			}
			return {
				...categoryType,
				specificAbilities: newSpecificAbilities
			}
		})
		handleCurrentCategoryChange(-1)
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
		return (
			<CostCard
				key={'category' + categoryIndex}
				id={'category' + categoryIndex}
				category={category}
				categoryIndex={categoryIndex}
				isEditing={categoryIndex === currentCategory}
				setAbility={handleCurrentCategoryChange}
				setVanilla={handleVanilla}
			/>
		)
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
						onChange={(e) => handleCurrentAbilityTypeChange(parseInt(e.target.value))}
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