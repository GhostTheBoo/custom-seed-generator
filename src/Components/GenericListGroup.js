import React from 'react'
import { ListGroup } from 'react-bootstrap'

function GenericListGroup(props) {

	let listGroup = props.dataList.map((data, index) => {
		return (
			<ListGroup.Item
				className='selectorListItem'
				action
				variant='dark'
				key={index}
				eventKey={index}
				id={index}
				onClick={(e) => props.setCurrentSelectItem(parseInt(e.target.id))}
			>
				{data}
			</ListGroup.Item>
		)
	})

	return (
		<ListGroup
			className='selectorList'
			variant='flush'
			activeKey={props.currentSelectItem}
			style={{ border: '1px solid white', fontSize: '21px' }}
		>
			{listGroup}
		</ListGroup>
	)
}

export default GenericListGroup