import { React } from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover'

function LevelCard(props) {
	function createStylizedStatChange(statChange) {
		if (props.level.level === 1) return <></>
		let textColor = statChange >= 0 ? '#00F0FA' : '#FA0000'
		let prefix = statChange >= 0 ? '+' : ''
		return (
			<span
				style={{
					fontFamily: 'KHGummi',
					color: textColor,
					textAlign: 'start'
				}}
			>
				{prefix + statChange}
			</span>
		)
	}
	function createStylizedEXPChange(statChange) {
		return (
			<span
				style={{
					fontFamily: 'KHGummi',
					color: '#FFF100',
					textAlign: 'start'
				}}
			>
				{props.level.level !== 99 ? statChange : 0}
			</span>
		)
	}

	let overlayPopover = <EditStatusPopover
		text='NEW!'
		message={''}
		type='level'
	/>

	return (
		<Card
			border='dark'
			bg='dark'
			className='levelCard'
			style={{ margin: '10px', textAlign: 'center' }}
		>
			<Card.Body>
				<Row>
					{props.level.isReplaced() ? overlayPopover : <></>}
					<Col xs={2}>
						<Row><Col as={'h2'}>LV. {props.level.level}</Col></Row>
						<Row>
							<Button
								variant='primary'
								block
								id={props.id}
								disabled={props.isEditing}
								onClick={() => props.setCurrentLevel(props.id)}
							>
								{props.isEditing ? 'EDITING...' : 'EDIT'}
							</Button>
						</Row>
					</Col>
					<Col>
						<Row>
							<Col xs={4}>
								<Row>
									<Col xs={2}></Col>
									<Col xs={3}>
										<Icon
											style={{ margin: '10px' }}
											fileName={'sword'}
											type={'row'}
										>
											{': '}
										</Icon>
									</Col>
									<Col style={{ textAlign: 'left' }}>
										<Icon
											fileName={props.level.replacementSwordReward.iconType}
											type={'card'}
										>
											{props.level.replacementSwordReward.reward}
										</Icon>
									</Col>
								</Row>
							</Col>
							<Col xs={3}>
								<Row>
									<Col xs={5} style={{ textAlign: 'right' }}>Strength:</Col>
									<Col xs={3}>{props.level.strength}</Col>
									<Col xs={4} style={{ textAlign: 'left' }}>{createStylizedStatChange(props.levelChangeData.strengthDif)}</Col>
								</Row>
							</Col>
							<Col>
								<Row>
									<Col xs={4} style={{ textAlign: 'right' }}>Standard AP:</Col>
									<Col xs={3}>{props.level.standardAP}</Col>
									<Col style={{ textAlign: 'left' }}>{createStylizedStatChange(props.levelChangeData.standardAPDif)}</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col xs={4}>
								<Row>
									<Col xs={2}></Col>
									<Col xs={3}>
										<Icon
											style={{ margin: '10px' }}
											fileName={'shield'}
											type={'row'}
										>
											{': '}
										</Icon>
									</Col>
									<Col style={{ textAlign: 'left' }}>
										<Icon
											fileName={props.level.replacementShieldReward.iconType}
											type={'card'}
										>
											{props.level.replacementShieldReward.reward}
										</Icon>
									</Col>
								</Row>
							</Col>
							<Col xs={3}>
								<Row>
									<Col xs={5} style={{ textAlign: 'right' }}>Magic:</Col>
									<Col xs={3}>{props.level.magic}</Col>
									<Col xs={4} style={{ textAlign: 'left' }}>{createStylizedStatChange(props.levelChangeData.magicDif)}</Col>
								</Row>
							</Col>
							<Col>
								<Row>
									<Col xs={4} style={{ textAlign: 'right' }}>Critical AP:</Col>
									<Col xs={3}>{props.level.criticalAP()}</Col>
									<Col style={{ textAlign: 'left' }}>{createStylizedStatChange(props.levelChangeData.criticalAPDif)}</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col xs={4}>
								<Row>
									<Col xs={2}></Col>
									<Col xs={3}>
										<Icon
											style={{ margin: '10px' }}
											fileName={'staff'}
											type={'row'}
										>
											{': '}
										</Icon>
									</Col>
									<Col style={{ textAlign: 'left' }}>
										<Icon
											fileName={props.level.replacementStaffReward.iconType}
											type={'card'}
										>
											{props.level.replacementStaffReward.reward}
										</Icon>
									</Col>
								</Row>
							</Col>
							<Col xs={3}>
								<Row>
									<Col xs={5} style={{ textAlign: 'right' }}>Defense:</Col>
									<Col xs={3}>{props.level.defense}</Col>
									<Col xs={4} style={{ textAlign: 'left' }}>{createStylizedStatChange(props.levelChangeData.defenseDif)}</Col>
								</Row>
							</Col>
							<Col>
								<Row>
									<Col xs={4} style={{ textAlign: 'right' }}>Next Level:</Col>
									<Col xs={3}>{props.level.replacementEXP}</Col>
									<Col style={{ textAlign: 'left' }}>{createStylizedEXPChange(props.level.replacementEXP - props.prevLevelExp)}</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	)
}

export default LevelCard