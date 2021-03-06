import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

import { worldsData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import ChestTable from '../Tables/ChestTable'

function ChestPage(props) {
	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col xs='4'>
						<GenericSelect
							class={'chest'}
							selector={'World'}
							itemList={worldsData}
							name={'currentWorld'}
							currentItem={props.fieldData.currentWorld}
							onChange={props.handleWorldChange}
						/>
					</Col>
					<Col xs='4'>
						<RewardTypeSelect
							class={'chest'}
							currentRewardType={props.fieldData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col xs='4'>
						<RewardSelect
							class={'chest'}
							rewardList={props.rewardList}
							currentReward={props.fieldData.currentReward}
							name={'currentReward'}
							label={'Reward'}
							onChange={props.onRewardChange}
						/>
					</Col>
				</Form.Row>
			</Form>
			<ChestTable
				currentWorld={worldsData[props.fieldData.currentWorld]}
				worldChests={props.chestData.chests}
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

export default ChestPage