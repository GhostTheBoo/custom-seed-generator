import React from 'react'

function ChestRow(props) {
	return (
		<tr>
			<td>
				<input
					type='checkbox'
					name={props.currentWorld}
					value={props.rowNumber}
					checked={props.chestData.toBeReplaced}
					onChange={props.onRowCheck}
				/>
			</td>
			<td>
				{props.chestData.room}
			</td>
			<td>
				{props.chestData.originalReward}
			</td>
			<td>
				{props.chestData.replacementReward}
			</td>
		</tr>
	)
}

export default ChestRow