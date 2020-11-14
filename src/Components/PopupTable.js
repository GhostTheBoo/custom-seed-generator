import React from 'react'

function PopupTable(props) {
	let popupList = props.worldPopups.map((popup, index) => {
		let keyValue = props.currentWorld + index
		return (
			<tr
				key={keyValue}
			>
				<td>
					<input
						type='checkbox'
						name={props.currentWorld}
						value={index}
						checked={popup.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{popup.popup}
				</td>
				<td>
					{popup.vanillaReward}
				</td>
				<td>
					{popup.replacementReward}
				</td>
			</tr>
		)
	})
	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>
						Popup Description
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
				{popupList}
			</tbody>
		</table>
	)
}

export default PopupTable