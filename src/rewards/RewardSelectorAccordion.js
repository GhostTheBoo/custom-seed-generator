import { React } from 'react'
import { Accordion } from 'react-bootstrap'
import RewardSelectorCard from './RewardSelectorCard'

function RewardSelectorAccordion(props) {
	// PROPS:
	// setCurrentReplacementReward: set current replacement reward -> function
	// rewardTypeIndex: reward type index -> number
	// rewardType: reward type -> string
	// rewardCategoryList: reward category list -> array

	let rewardSelectorCardList = props.rewardCategoryList.map((category, index) => {
		return (
			<RewardSelectorCard
				key={category.category}
				setCurrentReplacementReward={props.setCurrentReplacementReward}
				rewardTypeIndex={props.rewardTypeIndex}
				rewardCategory={category.category}
				rewardCategoryIndex={index}
				rewardList={category.rewards}
			/>
		)
	})

	return (
		<Accordion defaultActiveKey={props.rewardCategoryList[0].category}>
			{rewardSelectorCardList}
		</Accordion>
	)
}

export default RewardSelectorAccordion