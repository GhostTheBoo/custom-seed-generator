import React from 'react'
import { ListGroup, Row, Col, Button } from 'react-bootstrap'

import Icon from '../Components/Icon'
import { EMPTY } from '../rewards/RewardsData'
import RewardSelector from '../rewards/RewardSelector'

function StartingStuffList(props) {

	let listGroup = props.dataList.filter(reward => reward.index !== 0x000).map((data, index) => {
		return (
			<ListGroup.Item
				variant='dark'
				key={index}
				id={index}
			>
				<Row>
					<Col xs={1}>
						{index + 1}:
					</Col>
					<Col xs={5}>
						<Icon
							fileName={data.iconType}
							type={'row'}
						>
							{data.reward}
						</Icon>
					</Col>
					<Col xs={3}>
						<RewardSelector
							originalReward={data}
							onReplace={(replacementReward) => props.handleReplace(replacementReward, index)}
						/>
					</Col>
					<Col xs={3}>
						<Button
							variant='secondary'
							block
							id={props.id}
							onClick={() => props.handleDelete(index)}
						>
							Delete
						</Button>
					</Col>
				</Row>
			</ListGroup.Item>
		)
	})

	//add Extra Item
	if (listGroup.length < 32)
		listGroup.push(
			<ListGroup.Item
				variant='dark'
				key={32}
				id={32}
			>
				<Row>
					<Col xs={6}>
						Add Starting Item
					</Col>
					<Col xs={6}>
						<RewardSelector
							originalReward={EMPTY}
							onReplace={(replacementReward) => props.handleAdd(replacementReward)}
						/>
					</Col>
				</Row>
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