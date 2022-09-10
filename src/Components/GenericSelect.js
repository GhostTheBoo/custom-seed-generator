import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

function GenericSelect(props) {
	let optionlist = props.itemList.map((item, index) => {
		return (
			<option key={index} value={index}>{item}</option>
		)
	})
	let width = (props.selector.length > 8 ? '15rem' : '10rem')
	return (
		<Row>
			<Col xs='auto' className='genericSelectorLabel' style={{width: width}}>
				<Form.Label>{props.selector + ' Selector:'}</Form.Label>
			</Col>
			<Col xs={5}>
				<Form.Control
					className='genericSelect'
					as='select'
					value={props.currentItem}
					name={props.name}
					onChange={props.onChange}
				>
					{optionlist}
				</Form.Control>
			</Col>
		</Row>
	)
}

export default GenericSelect