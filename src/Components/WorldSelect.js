import React from 'react'
import worldsData from '../Data/worldsData'

function WorldSelect(props) {
	let optionlist = worldsData.map((world, index) => {
		return (
			<option key={index} value={index}>{world}</option>
		)
	})
	return (
		<select value={props.currentWorld}>
			{optionlist}
		</select>
	)
}

export default WorldSelect