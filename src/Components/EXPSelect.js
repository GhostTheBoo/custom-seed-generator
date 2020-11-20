import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function EXPSelect(props) {
	let multiplierList = []
	multiplierList.push(<option key={0} value={0}>CUSTOM</option>)
	for (let i = 1; i < 11; i++) {
		multiplierList.push(<option key={i} value={i / 2}>{i / 2}x</option>)
	}
	return (
		<Form.Row>
			<Col xl='2'>
				<Form.Group controlId={'EXP Multiplier Value' + props.class}>
					<Form.Label column='sm'>EXP Multiplier: </Form.Label>
					<Form.Control as='select'
						size='sm'
						value={props.currentEXPMultiplierValue}
						name={'currentEXPMultiplierValue'}
						onChange={props.onChange}
					>
						{multiplierList}
					</Form.Control>
				</Form.Group>
			</Col>
			<Col xl='2'>
				<Form.Group controlId={'Custom EXP Value' + props.class}>
					<Form.Label column='sm'>Custom EXP: </Form.Label>
					<Form.Control
						size='sm'
						name='currentEXP'
						type='number'
						value={props.currentEXP}
						onChange={props.onChange}
					/>
				</Form.Group>
			</Col>
		</Form.Row>
	)
}

export default EXPSelect