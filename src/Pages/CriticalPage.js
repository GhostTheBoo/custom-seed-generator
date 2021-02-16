import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import CriticalTable from '../Tables/CriticalTable'
import HelpModal from '../Components/HelpModal'

function CriticalPage(props) {
	const description = (
		<div id="criticalPage">
			<h6>Critical Extra</h6>
			<p>
				The seven extra critical mode abilities can each be changed to give anything else.
				Keep in mind these rewards are only provided in critical mode.
			</p>
			<h6>Why Am I Red?</h6>
			<p>
				Critical mode extras can be anything so they will never show up as red.
			</p>
		</div>
	)

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
			<HelpModal
				page={'Critical Extra'}
				description={description}
			/>
		</div>
	)
}

export default CriticalPage