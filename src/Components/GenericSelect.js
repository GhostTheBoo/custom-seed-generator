import React from 'react'

function GenericSelect(props) {
	let optionlist = props.itemList.map((item, index) => {
		return (
			<option key={index} value={index}>{item}</option>
		)
	})
	return (
		<div>
			<select
				value={props.currentItem}
				name={props.name}
				onChange={props.onChange}
			>
				{optionlist}
			</select>
		</div>
	)
}

export default GenericSelect