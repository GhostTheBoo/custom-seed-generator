import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { worldsData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import ChestTable from '../Tables/ChestTable'
import HelpModal from '../Components/HelpModal'

function ChestPage(props) {
	const description = (
		<div id="chestPageHelp">
			<h6>Chest</h6>
			<p>
				Chests are seperated by the in game world they appear in.
				After selecting a specific world, select what reward you wish to replace with.
				When clicking replace, all checked rows will be replaced with whatever reward is in the reward selector.
		</p>
			<h6>Why Am I Red?</h6>
			<p>
				Chests can contain anything so they will never show up as red.
		</p>
		</div>
	)
	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col lg='4'>
						<GenericSelect
							class={'chest'}
							selector={'World'}
							itemList={worldsData}
							name={'currentWorld'}
							currentItem={props.fieldData.currentWorld}
							onChange={props.handleWorldChange}
						/>
					</Col>
					<Col lg='4'>
						<RewardTypeSelect
							class={'chest'}
							currentRewardType={props.fieldData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col lg='4'>
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
			<Button variant='outline-light'
				name='replaceButton'
				onClick={props.onClick}
			>
				REPLACE
			</Button>
			{' '}
			<Button variant='outline-light'
				name='vanillaButton'
				onClick={props.onClick}
			>
				VANILLA
			</Button>
			<HelpModal
				page={'Chest'}
				description={description}
			/>
		</div>
	)
}

export default ChestPage