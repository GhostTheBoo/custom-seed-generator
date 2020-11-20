import React from 'react'
import Form from 'react-bootstrap/Form'

function EXPSelect(props) {
	let multiplierList = []
	multiplierList.push(<option key={0} value={0}>CUSTOM</option>)
	for (let i = 1; i < 11; i++) {
		multiplierList.push(<option key={i} value={i / 2}>{i / 2}x</option>)
	}
	return (
		<div>
			<Form.Group controlId='EXP Multiplier Value'>
				<Form.Label>EXP Multiplier: </Form.Label>
				<Form.Control as='select'
					value={props.currentEXPMultiplierValue}
					name={'currentEXPMultiplierValue'}
					onChange={props.onChange}
				>
					{multiplierList}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId='Custom EXP Value'>
				<Form.Label>Custom EXP: </Form.Label>
				<Form.Control
					name='currentEXP'
					type='number'
					value={props.currentEXP}
					onChange={props.onChange}
				/>
			</Form.Group>
		</div>
	)
}

export default EXPSelect