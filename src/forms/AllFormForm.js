import { React } from 'react'
import { Container, Button, Form } from 'react-bootstrap'

import GenericSelect from '../Components/GenericSelect'
import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function AllFormForm(props) {

	function setCurrentReward(newValue) { props.setCurrentAllFormFieldData('reward', newValue) }
	function setCurrentEXP(newValue) { props.setCurrentAllFormFieldData('currentEXP', newValue) }
	function setCurrentEXPMultiplierValue(newValue) { props.setCurrentAllFormFieldData('currentEXPMultiplierValue', newValue) }

	function setModifyReward() { props.setCurrentAllFormFieldData('modifyReward', !props.currentAllFormFieldData.modifyReward) }

	let expMultiplierList = []

	for (let i = 1; i <= 10; i++) {
		expMultiplierList.push(`${i / 2}x`)
	}

	return (
		<Container fluid className='formFormCard'>
			<h1>EDITING ALL LEVELS:</h1>
			<button
				className='close'
				onClick={() => props.closeFormCard()}
			>
				x
			</button>
			<hr />
			<div className='allFormRewardRow'>
				<div style={{ width: '10%', marginTop: '.6rem' }}>
					<Form.Check
						id='allFormLevelRewardSwitch'
						type='switch'
						style={{ margin: 'auto' }}
						checked={props.currentAllFormFieldData.modifyReward}
						onChange={() => setModifyReward()}
					/>
				</div>
				<label>Reward:</label>
				<div className='flex-grow-1'>
					<Icon
						style={{ margin: '10px' }}
						fileName={props.currentAllFormFieldData.reward.iconType}
						type={'row'}
					>
						{props.currentAllFormFieldData.reward.reward}
					</Icon>
				</div>
			</div>
			<RewardSelector
				onReplace={(replacementReward) => setCurrentReward(replacementReward)}
			/>
			<hr />
			<div className='allFormOptionRow'>
				<Form.Check
					className='allFormSwitch'
					id='allFormLevelEXPMultiplierSwitch'
					type='switch'
					checked={props.currentAllFormFieldData.EXPMultiplier}
					onChange={() => props.handleAllEXPSwitch('EXPMultiplier')}
				/>
				<label className='allFormLabel'>EXP Multiplier:</label>
				<div className='allFormInput'>
					<GenericSelect
						class={'expMultiplier'}
						slector={'EXP Multiplier'}
						itemList={expMultiplierList}
						name='formEXPMultiplierSelect'
						currentItem={props.currentAllFormFieldData.currentEXPMultiplierValue}
						disabled={!props.currentAllFormFieldData.EXPMultiplier}
						onChange={(e) => { setCurrentEXPMultiplierValue(parseInt(e.target.value)) }}
					/>
				</div>
			</div>
			<div className='allFormOptionRow'>
				<Form.Check
					className='allFormSwitch'
					id='allFormLevelCustomEXPSwitch'
					type='switch'
					checked={props.currentAllFormFieldData.customEXP}
					onChange={() => props.handleAllEXPSwitch('customEXP')}
				/>
				<label className='allFormLabel'>Custom EXP:</label>
				<input
					className='allFormInput'
					name={'FormExp'}
					type='number'
					value={props.currentAllFormFieldData.currentEXP}
					disabled={!props.currentAllFormFieldData.customEXP}
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
					onClick={() => props.setAllLevels('vanilla')}
				>
					VANILLA
				</Button>
				<Button
					block
					onClick={() => props.setAllLevels('replace')}
				>
					CONFIRM
				</Button>
			</div>
		</Container>
	)
}

export default AllFormForm