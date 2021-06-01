import { React, useState, useEffect } from 'react'
import { ListGroup, Button, Form, Row, Col, Container } from 'react-bootstrap'

import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EXPSelect from '../Components/EXPSelect'
import LevelTable from '../Tables/LevelTable'
import LevelCard from '../Cards/LevelCard'

function LevelPage(props) {
	const [currentSelectedLevel, setCurrentSelectedLevel] = useState(0)
	let styles = {
		maxHeight: '800px',
		marginBottom: '10px',
		overflowY: 'auto'
	}
	let levelList = []
	for (let i = 1; i < 100; i++) {
		levelList.push(<ListGroup.Item variant='dark' key={i - 1} eventKey={i - 1} id={i - 1} onClick={(e) => setCurrentSelectedLevel(e.target.id)}>{i}</ListGroup.Item>)
	}
	return (
		<div style={props.style}>
			<Container fluid>
				<Row>
					<Col xs={1}>
						<ListGroup style={styles}>
							{levelList}
						</ListGroup>
					</Col>
					<Col>
						<LevelCard
							selectedLevel={props.levelData[currentSelectedLevel]}
						/>
					</Col>
				</Row>
				<Row xs='4'>
					<Col xl='2'>
						<Button
							variant='outline-light'
							block
							name='replaceButton'
							onClick={props.onClick}
						>
							REPLACE
							</Button>
					</Col>
					<Col xl='2'>
						<Button
							variant='outline-light'
							block
							name='vanillaButton'
							onClick={props.onClick}
						>
							VANILLA
							</Button>
					</Col>
					{props.children}
				</Row>
			</Container>
		</div>
	)
}

export default LevelPage