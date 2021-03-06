import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

import CheatTable from '../Tables/CheatTable'

function CheatPage(props) {
	return (
		<div style={props.style}>
			<CheatTable
				cheatData={props.cheatData}
				onRowCheck={props.onRowCheck}
				onCheckAll={props.onCheckAll}
				selectAll={props.fieldData.selectAll}
			/>
			<Container fluid>
				<Row>
					<Col xs='1'>
						<Button variant='outline-light'
							name='replaceButton'
							onClick={props.onClick}
						>
							TOGGLE
						</Button>
					</Col>
					<Col xs='9'></Col>
					{props.children}
				</Row>
			</Container>
		</div>
	)
}

export default CheatPage