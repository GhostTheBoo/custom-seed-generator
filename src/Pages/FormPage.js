import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { formTypesData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EXPSelect from '../Components/EXPSelect'
import FormTable from '../Tables/FormTable'
import HelpModal from '../Components/HelpModal'

function FormPage(props) {
	const description = (
		<div id="formPage">
			<h6>Forms and Summons</h6>
			<p>
				The form page has all drive form levels separated by drive forms.
				Select the drive form to modify from the drive form selector.
				Select the reward to replace with from the reward selector.
				Then select the EXP to replace with.
				The EXP multiplier can modify EXP relative to what the EXP is in the vanilla game.
				If vanilla EXP is 100, and a x2 multiplier is selected, the level will be replaced with 50 EXP.
				The custom EXP value is only read when the custom EXP multiplier value is selected.
				It will replace the selected level with whatever custom EXP is provided.

				Summon modifications work the same way.
				However summon rewards do not pop up on screen on level up.
				They will show up in menus though.
			</p>
			<h6>EXP</h6>
			<p>
				EXP for form levels is how much EXP is required to reach that specific level from the previous level.
				For example, Valor Level 3 is reached by gaining 160 experience AFTER Valor Level 2.
				In other words, it takes a total of 240 EXP to reach Valor Level 3.
				Summon EXP works the same way.
			</p>
			<h6>Why Am I Red?</h6>
			<p>
				Form levels will not turn red.
				Their rewards can be anything and custom EXP is capped by the application between 0 and 99999999.
			</p>
		</div>
	)

	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col>
						<GenericSelect
							class={'form'}
							selector={'Drive Form'}
							itemList={formTypesData}
							name={'currentDriveForm'}
							currentItem={props.fieldData.currentDriveForm}
							onChange={props.handleFormChange}
						/>
					</Col>
					<Col>
						<RewardTypeSelect
							class={'form'}
							currentRewardType={props.fieldData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={'form'}
							rewardList={props.rewardList}
							currentReward={props.fieldData.currentReward}
							name={'currentReward'}
							label={'Reward'}
							onChange={props.onSelectChange}
						/>
					</Col>
				</Form.Row>
				<EXPSelect
					class={'form'}
					currentEXP={props.fieldData.currentEXP}
					currentEXPMultiplier={props.fieldData.currentEXPMultiplierValue}
					onInputChange={props.onInputChange}
					onMultiplierChange={props.onSelectChange}
				/>
			</Form>
			<FormTable
				currentDriveForm={formTypesData[props.fieldData.currentDriveForm]}
				driveLevels={props.formData}
				onRowCheck={props.onRowCheck}
				onCheckAll={props.onCheckAll}
				selectAll={props.fieldData.selectAll}
			/>
			<Button variant='outline-dark'
				name='replaceButton'
				onClick={props.onClick}
			>
				REPLACE
			</Button>
			{' '}
			<Button variant='outline-dark'
				name='vanillaButton'
				onClick={props.onClick}
			>
				VANILLA
			</Button>
			<HelpModal
				page={'Forms & Summons'}
				description={description}
			/>
		</div>
	)
}

export default FormPage