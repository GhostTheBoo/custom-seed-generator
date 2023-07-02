import React, { useState } from 'react'
import { Button, Form, CloseButton } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import RewardSelectorButton from '../rewards/RewardSelectorButton'
import Icon from '../Components/Icon'

function AllFormForm(props) {
	const [currentFieldData, setCurrentFieldData] = useState({
		replacementReward: { ...props.currentDriveLevels[1].replacementReward },
		currentEXP: 0,
		currentEXPMultiplierValue: 1
	})
	const [currentEnabledData, setCurrentEnabledData] = useState({
		modifyReward: false,
		EXPMultiplier: false,
		customEXP: false
	})

	let expMultiplierList = []
	for (let i = 1; i <= 10; i++) {
		expMultiplierList.push(`${i / 2}x`)
	}

	function toggleApplyFlag(statName) {
		let prevValue = currentEnabledData[statName]
		setCurrentEnabledData({ ...currentEnabledData, [statName]: !prevValue })
	}

	function toggleEXP(toggleName) {
		let newEXPMultiplier = false
		let newCustomEXP = false
		if (toggleName === 'EXPMultiplier') {
			if (currentFieldData.customEXP) newCustomEXP = false
			newEXPMultiplier = !currentEnabledData.EXPMultiplier
		}
		if (toggleName === 'customEXP') {
			if (currentFieldData.customEXP) newEXPMultiplier = false
			newCustomEXP = !currentEnabledData.customEXP
		}
		setCurrentEnabledData({
			...currentEnabledData,
			EXPMultiplier: newEXPMultiplier,
			customEXP: newCustomEXP
		})
	}

	return (
		<>
			<h1>EDITING ALL LEVELS:</h1>
			<CloseButton className='close' onClick={() => props.closeFormCard()} />
			<hr />
			<div className='formFormReward allLevels'>
				<Form.Check type='checkbox' checked={currentEnabledData.modifyReward} onChange={() => toggleApplyFlag('modifyReward')} />
				<label className='formFormLabel'>Reward:</label>
				<div><Icon fileName={currentFieldData.replacementReward.iconType} type={'card'}>{currentFieldData.replacementReward.reward}</Icon></div>
				<RewardSelectorButton onReplace={(newReward) => setCurrentFieldData({ ...currentFieldData, replacementReward: newReward })} isDisabled={!currentEnabledData.modifyReward} />
			</div>
			<hr />
			<div className='formFormEXPMultiplier allLevels'>
				<Form.Check type='checkbox' checked={currentEnabledData.EXPMultiplier} onChange={() => toggleEXP('EXPMultiplier')} />
				<label className='formFormLabel'>Experience:</label>
				<GenericSelect
					class={'expMultiplier'}
					selector={'EXP Multiplier'}
					itemList={expMultiplierList}
					name='formEXPMultiplierSelect'
					currentItem={currentFieldData.currentEXPMultiplierValue}
					disabled={!currentEnabledData.EXPMultiplier}
					onChange={(e) => setCurrentFieldData({ ...currentFieldData, currentEXPMultiplierValue: parseInt(e.target.value) })}
				/>
			</div>
			<hr />
			<div className='formFormEXP allLevels'>
				<Form.Check type='checkbox' checked={currentEnabledData.customEXP} onChange={() => toggleEXP('customEXP')} />
				<label className='formFormLabel'>Custom EXP:</label>
				<input
					className='allFormInput'
					name={'FormExp'}
					type='number'
					value={currentFieldData.currentEXP}
					disabled={!currentEnabledData.customEXP}
					onChange={(e) => setCurrentFieldData({ ...currentFieldData, currentEXP: Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))) })}
					min='0'
					max='99999999'
				/>
			</div>
			<hr />
			<div className='formReplaceButtonGroup'>
				<Button
					variant='secondary'
					onClick={() => props.handleVanilla(currentEnabledData)}
				>
					VANILLA
				</Button>
				<Button onClick={() => props.handleReplace(currentFieldData, currentEnabledData)}>
					CONFIRM
				</Button>
			</div>
		</>
	)
}

export default AllFormForm