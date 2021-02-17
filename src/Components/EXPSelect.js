import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function EXPSelect(props) {
	let multiplierList = []
	multiplierList.push(<option key={0} value={0}>CUSTOM</option>)
	multiplierList.push(<option key={1} value={1}>0.5x</option>)
	multiplierList.push(<option key={2} value={2}>VANILLA</option>)
	for (let i = 3; i < 11; i++) {
		multiplierList.push(<option key={i} value={i}>{i / 2}x</option>)
	}
	return (
		<Form.Row>
			<Col>
				<Form.Group controlId={'EXP Multiplier Value' + props.class}>
					<Form.Label column='sm'>EXP Multiplier: </Form.Label>
					<Form.Control as='select'
						size='sm'
						value={props.currentEXPMultiplier}
						name={'currentEXPMultiplierValue'}
						onChange={props.onMultiplierChange}
					>
						{multiplierList}
					</Form.Control>
				</Form.Group>
			</Col>
			<Col>
				<Form.Group controlId={'Custom EXP Value' + props.class}>
					<Form.Label column='sm'>Custom EXP: </Form.Label>
					<Form.Control
						size='sm'
						name='currentEXP'
						type='number'
						value={props.currentEXP}
						onChange={props.onInputChange}
						min="1"
						max="99999999"
					/>
				</Form.Group>
			</Col>
		</Form.Row>
	)
}

export default EXPSelect