import { React } from 'react'
import { Accordion, Row, Col, Button, Card } from 'react-bootstrap'
import Icon from '../Components/Icon'

function RewardSelectorCard(props) {
	// PROPS:
	// setCurrentReplacementReward: set current replacement reward -> function
	// rewardTypeIndex: reward type index
	// rewardCategory: reward category
	// rewardCategoryIndex: reward category index
	// rewardList: reward list from category

	let columnNum = 5

	let rewardOnClick = (id) => {
		let indeces = id.split('_')
		props.setCurrentReplacementReward(parseInt(indeces[0]), parseInt(indeces[1]))
	}

	let rewardList = props.rewardList.map((reward, index) => {
		return (
			<Col
				key={props.rewardCategoryIndex + '_' + index}
				xs
			>
				<Button
					className='rewardListItem'
					variant='dark'
					block
					id={props.rewardCategoryIndex + '_' + index}
					onClick={(e) => { rewardOnClick(e.target.id) }}
					style={{
						margin: 0,
						padding: 0,
						textAlign: 'left'
					}}
				>
					<Icon
						fileName={reward.iconType}
						type={'row'}
					>
						{reward.reward}
					</Icon>
				</Button>
			</Col>
		)
	})
	for (let i = rewardList.length; rewardList.length % columnNum !== 0; i++)
		rewardList.push(<Col key={props.rewardCategoryIndex + '_' + i} xs />)

	let rewardRowList = []

	for (let i = 0; i < rewardList.length; i += columnNum) {
		rewardRowList.push(
			<Row
				key={props.rewardCategoryIndex + '_' + i}
			>
				{rewardList.slice(i, i + columnNum)}
			</Row>
		)
	}

	return (
		<Card
			border='dark'
			bg='dark'
			key={props.rewardCategoryIndex}
			id={props.rewardCategoryIndex}
		>
			<Accordion.Toggle
				as={Card.Header}
				eventKey={props.rewardCategory}
				className='rewardSelectorHeader'
				style={{
					textAlign: 'center',
					borderBottom: '1px solid white',
					borderTop: '1px solid rgb(100, 100, 100)',
					borderLeft: '1px solid rgb(100, 100, 100)',
					borderRight: '1px solid rgb(100, 100, 100)'
				}}
			>
				{props.rewardCategory}
			</Accordion.Toggle>
			<Accordion.Collapse eventKey={props.rewardCategory}>
				<Card.Body>
					{rewardRowList}
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	)
}

export default RewardSelectorCard