import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import CriticalTable from '../Tables/CriticalTable'

function CriticalPage(props) {
	return (
		<div style={props.style}>
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
							label={'Reward'}
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
		</div>
	)
}

export default CriticalPage