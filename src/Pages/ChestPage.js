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
			<h6>Why Am I red?</h6>
			<p>
				Chests can contain anything so they will never show up as red.
		</p>
		</div>
	)

	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col>
						<GenericSelect
							class={'chest'}
							selector={'World'}
							itemList={worldsData}
							name={'currentWorld'}
							currentItem={props.chestData.currentWorld}
							onChange={props.handleWorldChange}
						/>
					</Col>
					<Col>
						<RewardTypeSelect
							class={'chest'}
							currentRewardType={props.chestData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={'chest'}
							rewardList={props.rewardList}
							currentReward={props.chestData.currentReward}
							name={'currentReward'}
							label={'Reward'}
							onChange={props.onRewardChange}
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
				page={'Chest'}
				description={description}
			/>
		</div>
	)
}

export default ChestPage