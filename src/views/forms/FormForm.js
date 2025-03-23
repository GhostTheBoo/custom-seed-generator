import React, { useState } from 'react'
import { Button, CloseButton } from 'react-bootstrap'

import RewardSelectorButton from '../rewards/RewardSelectorButton'
import Icon from '../generic/Icon'
import './styles/FormFormStyles.css'

function FormForm(props) {
	const [currentFieldData, setCurrentFieldData] = useState({
		replacementReward: { ...props.currentLevel.replacementReward },
		currentEXP: props.currentLevel.replacementEXP,
		currentEXPMultiplierValue: 1
	})

	return (
		<>
			<h1>LEVEL {props.currentLevel.level.slice(-1)}:</h1>
			<CloseButton className='close' onClick={() => props.closeFormCard(-1)} />
			<hr />
			<div className='formCardContent'>
				<div className='formFormRewards'>
					<label className='formFormLabel'>Reward:</label>
					<div className='formFormReward'><Icon fileName={currentFieldData.replacementReward.iconType} type={'card'}>{currentFieldData.replacementReward.reward}</Icon></div>
					<RewardSelectorButton onReplace={(newReward) => setCurrentFieldData({ ...currentFieldData, replacementReward: newReward })} />
				</div>
				<hr />
				<div className='formFormEXP'>
					<label className='formFormLabel'>Experience:</label>
					<input
						name='formEXP'
						className='formInputField three-digit-input'
						type='number'
						value={isNaN(currentFieldData.currentEXP) ? '' : currentFieldData.currentEXP}
						onChange={(e) => setCurrentFieldData({ ...currentFieldData, currentEXP: Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))) })}
						min={0}
						max={255}
					/>
				</div>
				<hr />
				<div className='bonusReplaceButtonGroup'>
					<Button
						variant='secondary'
						onClick={() => props.setCurrentLevel(props.currentLevel.vanilla())}
					>
						VANILLA
					</Button>
					<Button onClick={() => props.setCurrentLevel(props.currentLevel.replace(currentFieldData))}>
						CONFIRM
					</Button>
				</div>
			</div>
		</>
	)
}

export default FormForm