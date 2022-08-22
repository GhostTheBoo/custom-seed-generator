import { React, useState } from 'react'
import { ListGroup, Row, Col, Button, Modal, Container } from 'react-bootstrap'
import Icon from '../Components/Icon'
import { rewardsData } from './RewardsData'

function NewRewardSelector(props) {
	let emptyReward = rewardsData[8].categories[0].rewards[0]

	const [show, setShow] = useState(false)
	const [currentRewardType, setCurrentRewardType] = useState(0)
	const [currentRewardTypeCategory, setCurrentRewardTypeCategory] = useState(0)
	const [currentReplacementReward, setCurrentReplacementReward] = useState(rewardsData[rewardsData.length - 1].categories[0].rewards[0])

	function onClick(replacement) {
		props.onReplace(replacement)
		setShow(false)
	}

	let rewardTypes = rewardsData.map(rewardType => { return rewardType.rewardType })
	let rewardTypeCategories = rewardsData[currentRewardType].categories.map(rewardTypeCategory => { return rewardTypeCategory.category })
	let rewards = rewardsData[currentRewardType].categories[currentRewardTypeCategory].rewards.map(reward => { return reward.reward })

	function createListGroup(className, dataList, currentItem, setCurrentItem) {
		let itemList = dataList.slice(0, -1).map((item, itemIndex) => {
			return (
				<ListGroup.Item
					className={className}
					action
					variant='dark'
					key={itemIndex}
					eventKey={itemIndex}
					id={itemIndex}
					onClick={(e) => setCurrentItem(parseInt(e.target.id))}
					style={{ fontSize: '21px' }}
				>
					{item}
				</ListGroup.Item>
			)
		})
		return (
			<ListGroup
				className={className + 'List'}
				variant='flush'
				activeKey={currentItem}
				style={{
					maxHeight: '35rem',
					marginBottom: '10px',
					overflowY: 'auto'
				}}
			>
				{itemList}
			</ListGroup>
		)
	}
	function handleRewardTypeChange(newRewardType) {
		setCurrentRewardType(newRewardType)
		setCurrentRewardTypeCategory(-1)
		setCurrentReplacementReward(emptyReward)
	}
	function handleRewardTypeCategoryChange(newRewardTypeCategory) {
		setCurrentRewardTypeCategory(newRewardTypeCategory)
		setCurrentReplacementReward(emptyReward)
	}
	function handleReplacementRewardChange() {
		setCurrentRewardTypeCategory(-1)
		setCurrentReplacementReward(emptyReward)
	}
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
				<Modal.Header
					closeButton
				>
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
				<Modal.Body style={{ height: '65vh', maxHeight: '85vh', overflowY: 'auto' }}>
					<Container fluid>
						<Row>
							<Col xs={3}>
								{createListGroup('rewardTypeSelector', rewardTypes, currentRewardType, handleRewardTypeChange)}
							</Col>
							<Col xs={4}>
								{createListGroup('rewardTypeCategorySelector', rewardTypeCategories, currentRewardTypeCategory, handleRewardTypeCategoryChange)}
							</Col>
							<Col xs={4}>
								{createListGroup('rewardSelector', rewards, currentReplacementReward, handleReplacementRewardChange)}
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Container>
						<Row>
							<Col xs={{ span: 2, offset: 8 }}>
								<Button
									variant='secondary'
									block
									onClick={() => onClick(emptyReward)}
								>
									EMPTY
								</Button>
							</Col>
							<Col xs={2}>
								<Button
									variant='primary'
									block
									onClick={() => onClick(currentReplacementReward)}
								>
									REPLACE
								</Button>
							</Col>
						</Row>
					</Container>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default NewRewardSelector