import React from 'react'
import Button from 'react-bootstrap/Button'

import CheatTable from '../Tables/CheatTable'
import HelpModal from '../Components/HelpModal'

function CheatPage(props) {
	const description = (
		<div id="cheatPage">
			<h6>Cheat</h6>
			<p>
				Select any number of cheats to apply to the game when generating the pncah file.
				Click toggle include/exclude each cheat in the final file.
			</p>
			<h6>Why Am I red?</h6>
			<p>
				Cheats are either included or not.
				They cannot be red.
			</p>
		</div>
	)

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
			<HelpModal
				page={'Cheat'}
				description={description}
			/>
		</div >
	)
}

export default CheatPage