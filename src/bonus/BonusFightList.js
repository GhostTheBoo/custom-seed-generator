import React from 'react'
import { ListGroup } from 'react-bootstrap'

function BonusFightList(props) {
	// PROPS:
	// worldBonusData: array of current world's bonus fights -> {world, bonusFight[]}
	// setCurrentBonusFight: set current bonus fight -> function

	let bonusFightList = props.worldBonusData.bonusFights.map((bonusFight, bonusFightIndex) => {
		return (
			<ListGroup.Item
				className='bonusFightSelectorListItem'
				action
				variant='dark'
				key={bonusFightIndex}
				eventKey={bonusFightIndex}
				id={bonusFightIndex}
				onClick={(e) => props.setCurrentBonusFight(parseInt(e.target.id))}
			>
				{bonusFight.fight}
			</ListGroup.Item>
		)
	})

	return (
		<ListGroup
			className='bonusFightSelectorList'
			variant='flush'
			activeKey={props.currentBonusFight}
		>
			{bonusFightList}
		</ListGroup>
	)
}

export default BonusFightList