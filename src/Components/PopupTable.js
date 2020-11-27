import React from 'react'
import Table from 'react-bootstrap/Table'

function PopupTable(props) {
	let popupList = props.worldPopups.map((popup, index) => {
		let keyValue = props.currentWorld + index
		let styles
		let originalReward = ''
		if (popup.isReplaced){
			styles = { background: 'green' }
			originalReward = popup.replacementReward
		}
		if (popup.isAbility)
			styles = { background: 'red' }
		return (
			<tr
				style={styles}
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
					{originalReward}
				</td>
			</tr>
		)
	})
	return (
		<Table striped bordered hover size='sm' variant='dark'>
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
		</Table>
	)
}

export default PopupTable