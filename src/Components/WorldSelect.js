import React from 'react'

function WorldSelect(props) {
	let optionlist = props.worldList.map((world, index) => {
		return (
			<option key={index} value={index}>{world}</option>
		)
	})
	return (
		<div>
			<select
				value={props.currentWorld}
				name='currentWorld'
				onChange={props.onChange}
			>
				{optionlist}
			</select>
		</div>
	)
}

export default WorldSelect