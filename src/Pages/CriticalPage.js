import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import CriticalTable from '../Tables/CriticalTable'
import Buttons from '../Components/Buttons'

function CriticalPage(props) {
	return (
		<div>
			<Form>
				<Form.Row>
					<Col>
						<RewardTypeSelect
							class={'critical'}
							currentRewardType={props.criticalData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={'critical'}
							rewardList={props.rewardList}
							currentReward={props.criticalData.currentReward}
							name={'currentReward'}
							onChange={props.onRewardChange}
						/>
					</Col>
				</Form.Row>
			</Form>
			<CriticalTable
				criticalExtras={props.criticalData.currentDisplayData}
				onRowCheck={props.onRowCheck}
				checkAll={props.checkAll}
				selectAll={props.criticalData.selectAll}
			/>
			<Buttons
				onClick={props.handleReplace}
				onSaveClick={props.handleSave}
			/>
		</div>
	)
}

export default CriticalPage