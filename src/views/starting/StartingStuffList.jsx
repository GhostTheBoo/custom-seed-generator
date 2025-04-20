import React from 'react'
import { ListGroup } from 'react-bootstrap'

import Icon from '../generic/Icon'
import { EMPTY } from '../../data/rewardsData'
import RewardSelectorButton from '../rewards/RewardSelectorButton'

function StartingStuffList(props) {

	let listGroup = props.dataList.filter(reward => reward.index !== 0x000).map((data, index) => {
		return (
			<ListGroup.Item
				className='startingStuffRow'
				variant='dark'
				key={index}
				id={index}
			>
				<div className='startingStuffIndex'>
					{index + 1}:
				</div>
				<div className='startingStuffItem'>
					<Icon
						fileName={data.iconType}
						type={'row'}
					>
						{data.reward}
					</Icon>
				</div>
				<RewardSelectorButton
					useIcon={true}
					iconPath={'./images/extra/edit.svg'}
					originalReward={data}
					onReplace={(replacementReward) => props.handleReplace(replacementReward, index)}
				/>
				<img
					className='editIcon empty btn btn-dark'
					src='./images/extra/trash.svg'
					alt='edit'
					width='100%'
					height='auto'
					onClick={() => props.handleDelete(index)}
				/>
			</ListGroup.Item>
		)
	})

	//add Extra Item
	if (listGroup.length < 32)
		listGroup.push(
			<ListGroup.Item
				className='startingStuffFinalRow'
				variant='dark'
				key={32}
				id={32}
			>
				<div className='startingStuffFinalLabel'>
					Add Starting Item
				</div>
				<RewardSelectorButton
					originalReward={EMPTY}
					onReplace={(replacementReward) => props.handleAdd(replacementReward)}
				/>
			</ListGroup.Item>
		)

	return (
		<ListGroup
			className='flex-grow-1 selectorList'
			style={{
				fontSize: '21px',
				overflowY: 'auto',
				height: '800px'
			}}
		>
			{listGroup}
		</ListGroup>
	)
}

export default StartingStuffList