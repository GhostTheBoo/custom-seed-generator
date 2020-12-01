import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { formTypesData } from './Data/typesData'

import GenericSelect from './Components/GenericSelect'
import RewardSelect from './Components/RewardSelect'
import RewardTypeSelect from './Components/RewardTypeSelect'
import EXPSelect from './Components/EXPSelect'
import FormTable from './Components/FormTable'
import Buttons from './Components/Buttons'

function FormPage(props) {
	return (
		<div>
			<Form>
				<Form.Row>
					<GenericSelect
						class={props.page}
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
							class={props.page}
							currentRewardType={props.formData.currentRewardType}
							name={'currentRewardType'}
							onChange={(event) => props.onRewardTypeChange(props.page, event)}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={props.page}
							rewardList={props.rewardList}
							currentReward={props.formData.currentReward}
							name={'currentReward'}
							onChange={(event) => props.onRewardChange(props.page, event)}
						/>
					</Col>
				</Form.Row>
				<EXPSelect
					class={props.page}
					currentEXP={props.formData.currentEXP}
					currentEXPMultiplier={props.formData.currentEXPMultiplierValue}
					onInputChange={(event) => props.onInputChange(props.page, event)}
					onMultiplierChange={(event) => props.onRewardChange(props.page, event)}
				/>
			</Form>
			<FormTable
				currentDriveForm={formTypesData[props.formData.currentDriveForm]}
				driveLevels={props.formData.currentDisplayData}
				onRowCheck={(event) => props.onRowCheck(props.page, event)}
				checkAll={(event) => props.checkAll(props.page, event)}
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