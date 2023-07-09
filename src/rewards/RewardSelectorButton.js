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

	let buttonText = 'Select a Reward!'
	if (props.textOverride !== undefined)
		buttonText = props.textOverride
	let buttonVariant = 'primary'
	if (props.variantOverride !== undefined)
		buttonVariant = props.variantOverride

	let isDisabled = props.isDisabled !== undefined ? props.isDisabled : false

	function onClick(replacement) {
		props.onReplace(replacement)
		setShow(false)
	}
	return (
		<>
			{props.useIcon !== undefined && props.useIcon
				? <img
					className={`editIcon edit btn btn-${buttonVariant}`}
					src={props.iconPath}
					alt='edit'
					width='100%'
					height='auto'
					onClick={() => setShow(true)}
				/>
				: <Button
					variant={buttonVariant}
					onClick={() => setShow(true)}
					disabled={isDisabled}
				>
					{buttonText}
				</Button>
			}
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