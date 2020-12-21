import React from 'react'
import Button from 'react-bootstrap/Button'

import CheatTable from '../Tables/CheatTable'

function CheatPage(props) {
	return (
		<div style={props.style}>
			<CheatTable
				cheatData={props.cheatData.currentDisplayData}
				onRowCheck={props.onRowCheck}
				checkAll={props.checkAll}
				selectAll={props.cheatData.selectAll}
			/>
			<Button variant='outline-dark'
				name='replaceButton'
				onClick={props.onClick}
			>
				TOGGLE
			</Button>
		</div >
	)
}

export default CheatPage