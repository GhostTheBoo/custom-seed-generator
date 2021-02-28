import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { worldsData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import PopupTable from '../Tables/PopupTable'
import HelpModal from '../Components/HelpModal'

function PopupPage(props) {
	const description = (
		<div id="popupPage">
			<h6>Popup</h6>
			<p>
				Popups are seperated by the in game world they appear in.
				After selecting a specific world, select what reward you wish to replace with.
				When clicking replace, all checked rows will be replaced with whatever reward is in the reward selector.
			</p>
			<h6>Why Am I Red?</h6>
			<p>
				That specific popup is trying to reward the player with an ability.
				Abilities do not always end up being given to the player so it would effectively be an empty reward.
				The ability will still show up in the popup for the player though.
			</p>
		</div>
	)

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
				page={'Popup'}
				description={description}
			/>
		</div>
	)
}

export default PopupPage