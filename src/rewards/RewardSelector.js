import { React, useState } from 'react'
import { Tabs, Tab, Button, Modal } from 'react-bootstrap'

import './RewardStyles.css'

import Icon from '../Components/Icon'
import { rewardsData } from './RewardsData'
import RewardListGroup from './RewardListGroup'

function RewardSelector(props) {
	// PROPS:
	// originalReward: original reward being replaced -> reward object
	// onReplace: replaces original reward with selected reward -> function

	const [show, setShow] = useState(false)
	const [currentRewardType, setCurrentRewardType] = useState(0)
	const [currentReplacementReward, setCurrentReplacementReward] = useState(rewardsData[rewardsData.length - 1].categories[0].rewards[0])

	function onClick(replacement) {
		props.onReplace(replacement)
		setShow(false)
	}

	let emptyReward = rewardsData[8].categories[0].rewards[0]

	let rewardCategories = rewardsData.slice(0, -1).map((rewardType, rewardTypeIndex) => {
		return (
			<Tab
				key={rewardTypeIndex}
				eventKey={rewardTypeIndex}
				title={rewardType.rewardType}
			>
				<div className='rewardCategories'>
					<RewardListGroup
						setCurrentReplacementReward={(categoryIndex, rewardIndex) => setCurrentReplacementReward(rewardsData[currentRewardType].categories[categoryIndex].rewards[rewardIndex])}
						rewardTypeIndex={currentRewardType}
						rewardType={rewardsData[currentRewardType].rewardType}
						rewardCategoryList={rewardsData[currentRewardType].categories}
					/>
				</div>
			</Tab>
		)
	})

	return (
		<>
			<Button
				variant='primary'
				block
				onClick={() => setShow(true)}
			>
				{/* {props.originalReward ? `Replace ${props.originalReward.reward}` : 'Select a Reward!'} */}
				Select a Reward!
			</Button>
			<Modal
				dialogClassName='rewardSelectorModal'
				show={show}
				onHide={() => setShow(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{/* {props.originalReward.reward} will be replaced with: */}
						<Icon
							fileName={currentReplacementReward.iconType}
							type={'row'}
						>
							{currentReplacementReward.reward}
						</Icon>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className='rewardSelectorModalBody'>
					<Tabs
						defaultActiveKey={currentRewardType}
						className='allRewardTabs'
						unmountOnExit={true}
						onSelect={(e) => setCurrentRewardType(parseInt(e))}
					>
						{rewardCategories}
					</Tabs>
				</Modal.Body>
				<Modal.Footer className='rewardSelectorModalButtonGroup'>
					<Button
						variant='secondary'
						block
						onClick={() => onClick(emptyReward)}
					>
						EMPTY
					</Button>
					<Button
						variant='primary'
						block
						onClick={() => onClick(currentReplacementReward)}
					>
						REPLACE
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default RewardSelector