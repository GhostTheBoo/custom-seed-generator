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
			<div className='pageHeader'>
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
				<NavbarIcon
					showNavbar={props.handleShowNavbar}
					fileName={'spell'}
					title={'Ability Costs'}
				/>
			</div>
			<div className='costPageContent'>
				<div className='costCardGrid flex-grow-1' ref={costCardGrid}>{costList}</div>
				{
					currentCategory !== -1
						? <CostForm
							category={props.costData[currentAbilityType].abilities[currentCategory]}
							categoryIndex={currentCategory}
							currentCostFieldData={currentCostFieldData}
							setCurrentCostFieldData={setCurrentCostFieldData}
							closeModal={() => handleCurrentCategoryChange(-1)}
							updateCost={updateCost}
						/>
						: <></>
				}
			</div>
		</div>
	)
}

export default CostPage