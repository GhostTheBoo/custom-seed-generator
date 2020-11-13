import React from 'react'

function Buttons(props) {
	return (
		<div>
			<button
				name='replaceButton'
				onClick={props.onClick}
			>
				REPLACE
			</button>
			<button
				name='vanillaButton'
				onClick={props.onClick}
			>
				VANILLA
			</button>
			<button
				name='saveButton'
				onClick={props.onSaveClick}
			>
				SAVE
			</button>
		</div>
	)
}

export default Buttons