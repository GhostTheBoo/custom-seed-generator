import { React, useState } from 'react'
import { ListGroup, Row, Col, Button, Modal, Container } from 'react-bootstrap'
import Icon from '../Components/Icon'
import { rewardsData } from './RewardsData'
import RewardSelectorAccordion from './RewardSelectorAccordion'

function RewardSelector(props) {
	// PROPS:
	// originalReward: original reward being replaced -> reward object
	// onReplace: replaces original reward with selected reward -> function

	const [show, setShow] = useState(false)
	const [currentRewardType, setCurrentRewardType] = useState(0)
	const [currentReplacementReward, setCurrentReplacementReward] = useState(rewardsData[rewardsData.length - 1].categories[0].rewards[0])

	function onClick(replacement) {
		props.onReplace(replacement)
		setShow(false)
	}

	let emptyReward = rewardsData[8].categories[0].rewards[0]

	let rewardTypeList = rewardsData.slice(0, -1).map((rewardType, rewardTypeIndex) => {
		return (
			<ListGroup.Item
				className='rewardTypeSelectorListItem'
				action
				variant='dark'
				key={rewardTypeIndex}
				eventKey={rewardTypeIndex}
				id={rewardTypeIndex}
				onClick={(e) => setCurrentRewardType(parseInt(e.target.id))}
				style={{ fontSize: '21px' }}
			>
				{rewardType.rewardType}
			</ListGroup.Item>
		)
	})

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
				<Modal.Body>
					<Container fluid>
						<Row>
							<Col xs='auto'>
								<ListGroup
									className='rewardTypeSelectorList'
									variant='flush'
									activeKey={currentRewardType}
									style={{
										maxHeight: '800px',
										marginBottom: '10px',
										overflowY: 'auto'
									}}
								>
									{rewardTypeList}
								</ListGroup>
							</Col>
							<Col>
								<RewardSelectorAccordion
									setCurrentReplacementReward={(categoryIndex, rewardIndex) =>
										setCurrentReplacementReward(rewardsData[currentRewardType].categories[categoryIndex].rewards[rewardIndex])
									}
									rewardTypeIndex={currentRewardType}
									rewardType={rewardsData[currentRewardType].rewardType}
									rewardCategoryList={rewardsData[currentRewardType].categories}
								/>
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

export default RewardSelector