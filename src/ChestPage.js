import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { worldsData } from './Data/typesData'

import GenericSelect from './Components/GenericSelect'
import RewardSelect from './Components/RewardSelect'
import RewardTypeSelect from './Components/RewardTypeSelect'
import ChestTable from './Components/ChestTable'
import Buttons from './Components/Buttons'

function ChestPage(props) {
	return (
		<div>
			<Form>
				<Form.Row>
					<GenericSelect
						class={props.page}
						selector={'World'}
						itemList={worldsData}
						name={'currentWorld'}
						currentItem={props.chestData.currentWorld}
						onChange={props.handleWorldChange}
					/>
				</Form.Row>
				<Form.Row>
					<Col>
						<RewardTypeSelect
							class={props.page}
							currentRewardType={props.chestData.currentRewardType}
							name={'currentRewardType'}
							onChange={(event) => props.onRewardTypeChange(props.page, event)}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={props.page}
							rewardList={props.rewardList}
							currentReward={props.chestData.currentReward}
							name={'currentReward'}
							onChange={(event) => props.onRewardChange(props.page, event)}
						/>
					</Col>
				</Form.Row>
			</Form>
			<ChestTable
				currentWorld={worldsData[props.chestData.currentWorld]}
				worldChests={props.chestData.currentDisplayData}
				onRowCheck={props.onRowCheck}
				checkAll={props.checkAll}
				selectAll={props.chestData.selectAll}
			/>
			<Buttons
				onClick={props.handleReplace}
				onSaveClick={props.handleSave}
			/>
		</div>
	)
}

export default ChestPage