import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function GenericSelect(props) {
	let optionlist = props.itemList.map((item, index) => {
		return (
			<option key={index} value={index}>{item}</option>
		)
	})
	return (
		<Col xs='auto'>
			<Form.Group controlId={props.selector + 'Selector'}>
				<Form.Label column='sm'>{props.selector} Selector:</Form.Label>
				<Form.Control as='select'
					size='sm'
					value={props.currentItem}
					name={props.name}
					onChange={props.onChange}
				>
					{optionlist}
				</Form.Control>
			</Form.Group>
		</Col>
	)
}

export default GenericSelect