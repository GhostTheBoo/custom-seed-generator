import React from 'react'
import Button from 'react-bootstrap/Button'

function Buttons(props) {
	return (
		<div>
			<Button variant='outline-dark'
				name='replaceButton'
				onClick={props.onClick}
			>
				REPLACE
			</Button>
			{' '}
			<Button variant='outline-dark'
				name='vanillaButton'
				onClick={props.onClick}
			>
				VANILLA
			</Button>
			{' '}
			<Button variant='outline-dark'
				name='saveButton'
				onClick={props.onSaveClick}
			>
				SAVE
			</Button>
		</div>
	)
}

export default Buttons