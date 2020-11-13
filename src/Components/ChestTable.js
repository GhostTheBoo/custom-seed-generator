import React from 'react'

import ChestRow from './ChestRow'

function ChestTable(props) {
	let chestList = props.worldChests.map((chest, index) => {
		let keyValue = props.currentWorld + index
		return (
			<ChestRow
				key={keyValue}
				currentWorld={props.currentWorld}
				rowNumber={index}
				chestData={chest}
				onRowCheck={props.onRowCheck}
			/>
		)
	})
	return (
		<table name="chestsTable" id="chestsTable">
			<thead>
				<tr>
					<th></th>
					<th>
						Room
					</th>
					<th>
						Original Reward
					</th>
					<th>
						Replacement Reward
					</th>
				</tr>
			</thead>
			<tbody>
				{chestList}
			</tbody>
		</table>
	)
}

export default ChestTable