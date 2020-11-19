import React from 'react'
import Form from 'react-bootstrap/Form'

function GenericSelect(props) {
	let optionlist = props.itemList.map((item, index) => {
		return (
			<option key={index} value={index}>{item}</option>
		)
	})
	return (
		<Form.Group controlId={props.selector + 'Selector'}>
			<Form.Label>{props.selector} Selector:</Form.Label>
			<Form.Control as='select'
				value={props.currentItem}
				name={props.name}
				onChange={props.onChange}
			>
				{optionlist}
			</Form.Control>
		</Form.Group>
	)
}

export default GenericSelect