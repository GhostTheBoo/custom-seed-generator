import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

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
							currentRewardType={props.fieldData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={'critical'}
							rewardList={props.rewardList}
							currentReward={props.fieldData.currentReward}
							name={'currentReward'}
							label={'Reward'}
							onChange={props.onRewardChange}
						/>
					</Col>
				</Form.Row>
			</Form>
			<CriticalTable
				allCriticals={props.criticalData}
				onRowCheck={props.onRowCheck}
				onCheckAll={props.onCheckAll}
				selectAll={props.fieldData.selectAll}
			/>
			<Container fluid>
				<Row>
					<Col xs='1'>
						<Button
							variant='outline-light'
							block
							name='replaceButton'
							onClick={props.onClick}
						>
							REPLACE
							</Button>
					</Col>
					<Col xs='1'>
						<Button
							variant='outline-light'
							block
							name='vanillaButton'
							onClick={props.onClick}
						>
							VANILLA
							</Button>
					</Col>
					<Col xs='8'></Col>
					{props.children}
				</Row>
			</Container>
		</div>
	)
}

export default CriticalPage