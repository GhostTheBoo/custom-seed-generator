import React from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap'

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
				<Row xs='3'>
					<Col xl='2'>
						<Button
							variant='outline-light'
							block
							name='replaceButton'
							onClick={props.onClick}
						>
							TOGGLE
							</Button>
					</Col>
					{props.children}
				</Row>
			</Container>
		</div>
	)
}

export default CheatPage