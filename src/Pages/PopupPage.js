import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

import { worldsData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import PopupTable from '../Tables/PopupTable'

function PopupPage(props) {
	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col lg='4'>
						<GenericSelect
							class={'popup'}
							selector={'World'}
							itemList={worldsData}
							name={'currentWorld'}
							currentItem={props.currentWorld}
							onChange={props.handleWorldChange}
						/>
					</Col>
					<Col lg='4'>
						<RewardTypeSelect
							class={'popup'}
							currentRewardType={props.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col lg='4'>
						<RewardSelect
							class={'popup'}
							rewardList={props.rewardList}
							currentReward={props.popupData.currentReward}
							name={'currentReward'}
							label={'Reward'}
							onChange={props.onRewardChange}
						/>
					</Col>
				</Form.Row>
			</Form>
			<PopupTable
				currentWorld={worldsData[props.currentWorld]}
				worldPopups={props.popupData.popups}
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

export default PopupPage