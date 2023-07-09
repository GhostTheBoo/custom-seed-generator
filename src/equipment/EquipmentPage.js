import React, { useState } from 'react'
import './EquipmentStyles.css'

import { AnimatePresence, motion } from 'framer-motion'

import GenericSelect from '../Components/GenericSelect'
import EquipmentCard from './EquipmentCard'
import AllEquipmentCard from './AllEquipmentCard'
import EquipmentForm from './EquipmentForm'
import AllEquipmentForm from './AllEquipmentForm'

function EquipmentPage(props) {
	const [currentEquipmentType, setCurrentEquipmentType] = useState(0)
	const [currentEquipment, setCurrentEquipment] = useState(0)
	const [isFormOpen, setIsFormOpen] = useState(true)
	const [isEditing, setIsEditing] = useState(false)

	function handleCurrentEquipmentTypeChange(newEquipmentType) {
		setCurrentEquipmentType(newEquipmentType)
		setIsEditing(false)
		handleCurrentEquipmentChange(0)
	}

	function handleCurrentEquipmentChange(newEquipment) {
		setIsFormOpen(newEquipment >= 0)
		setCurrentEquipment(newEquipment)
	}

	function updateEquipment(newEquipment) {
		let newEquipmentList = currentEquipmentList.map(equipment => {
			if (newEquipment.baseAddress === equipment.baseAddress)
				return newEquipment
			return equipment
		})
		updateAllEquipment(newEquipmentList)
	}

	function updateAllEquipment(newEquipmentList) {
		let newEquipmentData = props.equipmentData.map((equipmentType, equipmentTypeIndex) => {
			if (currentEquipmentType === equipmentTypeIndex)
				return {
					equipmentType: equipmentType.equipmentType,
					equipments: newEquipmentList
				}
			return equipmentType
		})
		props.setAllEquipments(newEquipmentData)
		setIsEditing(false)
	}

	function replaceAllEquipment(fieldData, enabledData) {
		let newEquipmentList = props.equipmentData[currentEquipmentType].equipments.map((equipment) => {
			let newEquipmentData = {
				ability: { ...(enabledData.modifyAbility ? fieldData.ability : equipment.replacementAbility) },
				currentAP: enabledData.modifyAP ? fieldData.currentAP : equipment.ap,
				currentStrength: enabledData.modifyStrength ? fieldData.currentStrength : equipment.strength,
				currentMagic: enabledData.modifyMagic ? fieldData.currentMagic : equipment.magic,
				currentDefense: enabledData.modifyDefense ? fieldData.currentDefense : equipment.defense,
				currentFire: enabledData.modifyFire ? fieldData.currentFire : equipment.fire,
				currentBlizzard: enabledData.modifyBlizzard ? fieldData.currentBlizzard : equipment.blizzard,
				currentThunder: enabledData.modifyThunder ? fieldData.currentThunder : equipment.thunder,
				currentPhysical: enabledData.modifyPhysical ? fieldData.currentPhysical : equipment.physical,
				currentDark: enabledData.modifyDark ? fieldData.currentDark : equipment.dark,
				currentLight: enabledData.modifyLight ? fieldData.currentLight : equipment.light,
				currentUniversal: enabledData.modifyUniversal ? fieldData.currentUniversal : equipment.universal
			}
			return equipment.replace(newEquipmentData)
		})
		updateAllEquipment(newEquipmentList)
	}
	function vanillaAllEquipment(enabledData) {
		let newEquipmentList = props.equipmentData[currentEquipmentType].equipments.map((equipment) => {
			let newEquipmentData = {
				ability: { ...(enabledData.modifyAbility ? equipment.vanillaAbility : equipment.replacementAbility) },
				currentAP: enabledData.modifyAP ? equipment.vanillaAP : equipment.ap,
				currentStrength: enabledData.modifyStrength ? equipment.vanillaStrength : equipment.strength,
				currentMagic: enabledData.modifyMagic ? equipment.vanillaMagic : equipment.magic,
				currentDefense: enabledData.modifyDefense ? equipment.vanillaDefense : equipment.defense,
				currentFire: enabledData.modifyFire ? equipment.vanillaFire : equipment.fire,
				currentBlizzard: enabledData.modifyBlizzard ? equipment.vanillaBlizzard : equipment.blizzard,
				currentThunder: enabledData.modifyThunder ? equipment.vanillaThunder : equipment.thunder,
				currentPhysical: enabledData.modifyPhysical ? equipment.vanillaPhysical : equipment.physical,
				currentDark: enabledData.modifyDark ? equipment.vanillaDark : equipment.dark,
				currentLight: enabledData.modifyLight ? equipment.vanillaLight : equipment.light,
				currentUniversal: enabledData.modifyUniversal ? equipment.vanillaUniversal : equipment.universal
			}
			return equipment.replace(newEquipmentData)
		})
		updateAllEquipment(newEquipmentList)
	}

	let currentEquipmentList = props.equipmentData[currentEquipmentType].equipments

	const equipmentFolderNames = [
		'key',
		'dst',
		'gsh',
		'alw',
		'arm',
		'acc'
	]

	let equipmentRowList = currentEquipmentList.map((equipment, equipmentIndex) => {
		return (
			<li key={'equipmentFormCard' + currentEquipmentType + '_' + equipmentIndex}>
				<EquipmentCard
					key={'equipment' + currentEquipmentType + '_' + equipmentIndex}
					id={equipmentIndex}
					equipment={equipment}
					currentEquipment={currentEquipment}
					currentFolderName={equipmentFolderNames[currentEquipmentType]}
					setCurrentEquipment={handleCurrentEquipmentChange}
					isSelected={equipmentIndex === currentEquipment}
					isFormOpen={isFormOpen}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			</li>
		)
	})
	equipmentRowList.push(
		<li key={'equipmentFormCard' + currentEquipmentType + '_' + props.equipmentData[currentEquipmentType].equipments.length}>
			<AllEquipmentCard
				key={equipmentRowList.length}
				id={equipmentRowList.length}
				currentFolderName={equipmentFolderNames[currentEquipmentType]}
				currentEquipmentType={currentEquipmentType}
				setCurrentEquipment={handleCurrentEquipmentChange}
				isSelected={props.equipmentData[currentEquipmentType].equipments.length === currentEquipment}
				isFormOpen={isFormOpen}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
			/>
		</li>
	)


	return (
		<div className='equipmentPageContent pageContent'>
			<motion.div
				initial={{ opacity: .25, x: 100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ type: 'spring', duration: .5 }}
				className='pageHeader'
			>
				<div className='pageHeaderSelectorLabel'>
					Equipment Type Selector:
				</div>
				<div>
					<GenericSelect
						class={'equipment'}
						selector={'Equipment Type'}
						itemList={props.equipmentData.map(equipmentType => { return equipmentType.equipmentType })}
						name={'currentEquipmentType'}
						currentItem={currentEquipmentType}
						onChange={(e) => handleCurrentEquipmentTypeChange(parseInt(e.target.value))}
					/>
				</div>
				<div className='flex-grow-1' />
				<div>
					{props.children}
				</div>
			</motion.div>
			<AnimatePresence mode='popLayout'>
				<motion.ul
					initial={{ opacity: .25, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, y: 100 }}
					transition={{ type: 'spring', duration: .5 }}
					key={`${currentEquipmentType}LevelList`}
					className='equipmentCardList'
				>
					{equipmentRowList}
				</motion.ul>
				{currentEquipment >= 0
					? currentEquipment >= props.equipmentData[currentEquipmentType].equipments.length
						? <motion.div
							initial={{ opacity: .25, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, y: 100 }}
							transition={{ type: 'spring', duration: .5 }}
							key={currentEquipmentType}
							className={`equipmentFormCard all${isEditing ? ' editing' : ''}`}
						>
							<AllEquipmentForm
								currentEquipment={props.equipmentData[currentEquipmentType].equipments}
								currentFolderName={equipmentFolderNames[currentEquipmentType]}
								closeFormCard={handleCurrentEquipmentChange}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								handleVanilla={vanillaAllEquipment}
								handleReplace={replaceAllEquipment}
							/>
						</motion.div>
						: <motion.div
							initial={{ opacity: .25, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, y: 100 }}
							transition={{ type: 'spring', duration: .5 }}
							key={currentEquipmentType}
							className={`equipmentFormCard${isEditing ? ' editing' : ''}`}
						>
							<EquipmentForm
								equipment={props.equipmentData[currentEquipmentType].equipments[currentEquipment]}
								currentFolderName={equipmentFolderNames[currentEquipmentType]}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								closeFormCard={handleCurrentEquipmentChange}
								handleVanilla={(replacedEquipment) => { updateEquipment(replacedEquipment.vanilla()) }}
								handleReplace={(replacedEquipment, currentEquipmentFieldData) => { updateEquipment(replacedEquipment.replace(currentEquipmentFieldData)) }}
							/>
						</motion.div>
					: <></>
				}
			</AnimatePresence>
		</div>
	)
}

export default EquipmentPage