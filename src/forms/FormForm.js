import { React } from 'react'
import { Button } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'
import './FormFormStyles.css'

function FormForm(props) {

	function setCurrentReward(newValue) { props.setCurrentFormFieldData('reward', newValue) }
	function setCurrentEXP(newValue) { props.setCurrentFormFieldData('currentEXP', newValue) }
	// function setCurrentEXPMultiplierValue(newValue) { props.setCurrentFormFieldData('currentEXPMultiplierValue', newValue) }

	let expMultiplierList = []

	for (let i = 1; i <= 10; i++) {
		expMultiplierList.push(
			<option key={i} value={i}>{i === 2 ? 'CUSTOM' : `${i / 2}x`}</option>
		)
	}

	return (
		<div className='formFormCard'>
			<h1>LEVEL {props.currentDriveFormLevel + 2}:</h1>
			<button
				className='close'
				onClick={() => props.closeFormCard()}
			>
				x
			</button>
			<hr />
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<label>Reward:</label>
				<div>
					<Icon
						style={{ margin: '10px' }}
						fileName={props.currentFormFieldData.reward.iconType}
						type={'row'}
					>
						{props.currentFormFieldData.reward.reward}
					</Icon>
				</div>
				<RewardSelector
					onReplace={(replacementReward) => setCurrentReward(replacementReward)}
				/>
			</div>
			<hr />
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<label>EXP from Level {props.currentDriveFormLevel + 1} → {props.currentDriveFormLevel + 2}:</label>
				<input
					name={'FormExp'}
					className='three-digit-input'
					type='number'
					value={props.currentFormFieldData.currentEXP}
					onChange={(e) => setCurrentEXP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
					min='0'
					max='99999999'
				/>
			</div>
			<hr />
			<div className='formReplaceButtonGroup'>
				<Button
					variant='secondary'
					block
					onClick={() => props.setCurrentDriveFormLevel(props.currentDriveFormLevelData.vanilla())}
				>
					VANILLA
				</Button>
				<Button
					block
					onClick={() => props.setCurrentDriveFormLevel(props.currentDriveFormLevelData.replace(props.currentFormFieldData))}
				>
					CONFIRM
				</Button>
			</div>
		</div>
	)
}

export default FormForm