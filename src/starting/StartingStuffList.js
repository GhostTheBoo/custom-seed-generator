import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'

import Icon from '../Components/Icon'
import { EMPTY } from '../rewards/RewardsData'
import RewardSelector from '../rewards/RewardSelector'

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
				<RewardSelector
					originalReward={data}
					onReplace={(replacementReward) => props.handleReplace(replacementReward, index)}
				/>
				<Button
					variant='secondary'
					id={props.id}
					onClick={() => props.handleDelete(index)}
				>
					Delete
				</Button>
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
				<RewardSelector
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