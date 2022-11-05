import { React, useState, useEffect, useRef } from 'react'
import './CostStyles.css'

import GenericSelect from '../Components/GenericSelect'

import CostCard from './CostCard'
import CostForm from './CostForm'

function CostPage(props) {
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
	const [currentAbility, setCurrentAbility] = useState(-1)
	const [currentCostFieldData, setCurrentCostFieldData] = useState([0, 0, 0, 0, 0])
	const costCardGrid = useRef(null)
	useEffect(() => {
		costCardGrid.current.scrollTo({ top: 0, behavior: 'smooth' })
	}, [currentCategoryIndex])

	let currentCategory = props.costData[currentCategoryIndex]

	function handleCostChange(newAbility) {
		if (newAbility !== -1) {
			let newCosts = [0, 0, 0, 0, 0]
			currentCategory.abilities[newAbility].forEach((specificAbility, sepcificAbilityIndex) => {
				newCosts[sepcificAbilityIndex] = specificAbility.replacementCost
			})
			setCurrentCostFieldData(newCosts)
		}
		else setCurrentCostFieldData([0, 0, 0, 0, 0])
	}

	function handleCurrentCategoryIndexChange(newCategoryIndex) {
		handleCurrentAbilityChange(-1)
		setCurrentCategoryIndex(newCategoryIndex)
	}

	function handleCurrentAbilityChange(newAbility) {
		handleCostChange(newAbility)
		setCurrentAbility(newAbility)
	}
	function handleVanilla(vanillaAbilityIndex) {
		let newCategoryAbilities = currentCategory.abilities.map((ability, abilityIndex) => {
			let newSpecificAbilities = ability
			if (abilityIndex === vanillaAbilityIndex) {
				newSpecificAbilities = ability.map(specificAbility => {
					return specificAbility.vanilla()
				})
			}
			return newSpecificAbilities
		})
		handleCurrentAbilityChange(-1)
		updateAllCosts(newCategoryAbilities)
	}
	function updateCost() {
		let newCategoryAbilities = currentCategory.abilities.map((ability, abilityIndex) => {
			let newSpecificAbilities = ability
			if (abilityIndex === currentAbility) {
				newSpecificAbilities = ability.map((specificAbility, specificAbilityIndex) => {
					return specificAbility.replace(currentCostFieldData[specificAbilityIndex])
				})
			}
			return newSpecificAbilities
		})
		handleCurrentAbilityChange(-1)
		updateAllCosts(newCategoryAbilities)
	}
	function updateAllCosts(newCategoryAbilities) {
		let newCostData = props.costData.map((category, categoryIndex) => {
			if (currentCategoryIndex === categoryIndex)
				return {
					...category,
					abilities: newCategoryAbilities
				}
			return category
		})
		props.setAllCosts(newCostData)
	}

	let costList = currentCategory.abilities.map((ability, abilityIndex) => {
		return (
			<CostCard
				key={'ability' + abilityIndex}
				id={'ability' + abilityIndex}
				ability={ability}
				abilityIndex={abilityIndex}
				isEditing={abilityIndex === currentAbility}
				setAbility={handleCurrentAbilityChange}
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
						itemList={props.costData.map(categoryIndex => { return categoryIndex.type })}
						name={'currentCategoryIndex'}
						currentItem={currentCategoryIndex}
						onChange={(e) => handleCurrentCategoryIndexChange(parseInt(e.target.value))}
					/>
				</div>
				<div className='flex-grow-1' />
				<div>{props.children}</div>
			</div>
			<div className='costPageContent'>
				<div className='costCardGrid flex-grow-1' ref={costCardGrid}>{costList}</div>
				{
					currentAbility !== -1
						? <CostForm
							ability={props.costData[currentCategoryIndex].abilities[currentAbility]}
							abilityIndex={currentAbility}
							currentCostFieldData={currentCostFieldData}
							setCurrentCostFieldData={setCurrentCostFieldData}
							closeModal={() => handleCurrentAbilityChange(-1)}
							updateCost={updateCost}
						/>
						: <></>
				}
			</div>
		</div>
	)
}

export default CostPage