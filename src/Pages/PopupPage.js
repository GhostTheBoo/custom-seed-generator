import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

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
					<GenericSelect
						class={'popup'}
						selector={'World'}
						itemList={worldsData}
						name={'currentWorld'}
						currentItem={props.popupData.currentWorld}
						onChange={props.handleWorldChange}
					/>
				</Form.Row>
				<Form.Row>
					<Col>
						<RewardTypeSelect
							class={'popup'}
							currentRewardType={props.popupData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
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
				currentWorld={worldsData[props.popupData.currentWorld]}
				worldPopups={props.popupData.currentDisplayData}
				onRowCheck={props.onRowCheck}
				checkAll={props.checkAll}
				selectAll={props.popupData.selectAll}
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

export default PopupPage