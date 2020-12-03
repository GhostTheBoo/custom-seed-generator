import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { formTypesData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EXPSelect from '../Components/EXPSelect'
import FormTable from '../Tables/FormTable'
import Buttons from '../Components/Buttons'

function FormPage(props) {
	return (
		<div>
			<Form>
				<Form.Row>
					<GenericSelect
						class={'form'}
						selector={'Drive Form'}
						itemList={formTypesData}
						name={'currentDriveForm'}
						currentItem={props.formData.currentDriveForm}
						onChange={props.handleFormChange}
					/>
				</Form.Row>
				<Form.Row>
					<Col>
						<RewardTypeSelect
							class={'form'}
							currentRewardType={props.formData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={'form'}
							rewardList={props.rewardList}
							currentReward={props.formData.currentReward}
							name={'currentReward'}
							onChange={props.onGenericChange}
						/>
					</Col>
				</Form.Row>
				<EXPSelect
					class={'form'}
					currentEXP={props.formData.currentEXP}
					currentEXPMultiplier={props.formData.currentEXPMultiplierValue}
					onInputChange={props.onInputChange}
					onMultiplierChange={props.onGenericChange}
				/>
			</Form>
			<FormTable
				currentDriveForm={formTypesData[props.formData.currentDriveForm]}
				driveLevels={props.formData.currentDisplayData}
				onRowCheck={props.onRowCheck}
				checkAll={props.checkAll}
				selectAll={props.formData.selectAll}
			/>
			<Buttons
				onClick={props.handleReplace}
				onSaveClick={props.handleSave}
			/>
		</div>
	)
}

export default FormPage