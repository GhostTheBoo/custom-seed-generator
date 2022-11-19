import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import './RewardStyles.css'

// import Icon from '../Components/Icon'
import { rewardsData, EMPTY } from './RewardsData'
import RewardSelectorModal from './RewardSelectorModal'

function RewardSelector(props) {
	// PROPS:
	// originalReward: original reward being replaced -> reward object
	// onReplace: replaces original reward with selected reward -> function

	const [show, setShow] = useState(false)
	const [currentRewardType, setCurrentRewardType] = useState(0)
	const [currentReplacementReward, setCurrentReplacementReward] = useState(rewardsData[rewardsData.length - 1].rewards[0])

	function onClick(replacement) {
		props.onReplace(replacement)
		setShow(false)
	}
	return (
		<>
			<Button
				variant='primary'
				onClick={() => setShow(true)}
			>
				{/* {props.originalReward ? `Replace ${props.originalReward.reward}` : 'Select a Reward!'} */}
				Select a Reward!
			</Button>
			{show
				? <RewardSelectorModal
					show={show}
					setShow={setShow}
					onClick={onClick}
					currentReplacementReward={currentReplacementReward}
					setCurrentReplacementReward={setCurrentReplacementReward}
					currentRewardType={currentRewardType}
					setCurrentRewardType={setCurrentRewardType}
					rewardsData={rewardsData}
					empty={EMPTY}
				/>
				: <></>
			}
		</>
	)
}

export default RewardSelector