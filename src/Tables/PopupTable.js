import React from 'react'
import Table from 'react-bootstrap/Table'
import Icon from '../Components/Icon'

function PopupTable(props) {
	let popupList = props.worldPopups.map((popup, index) => {
		let keyValue = popup.vanillaAddress
		let styles
		if (popup.isReplaced())
			styles = { background: 'green' }
		if (popup.isAbility())
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
					<Icon
						fileName={popup.vanillaReward.iconType}
						displayText={popup.vanillaReward.reward}
					/>
				</td>
				<td>
					<Icon
						fileName={popup.replacementReward.iconType}
						displayText={popup.replacementReward.reward}
					/>
				</td>
			</tr>
		)
	})
	return (
		<Table striped bordered hover size='sm' variant='dark'>
			<thead>
				<tr>
					<th>
						<input
							type='checkbox'
							name={props.currentWorld + 'All'}
							checked={props.selectAll}
							onChange={props.onCheckAll}
						/>
					</th>
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