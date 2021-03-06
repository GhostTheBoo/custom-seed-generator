import React from 'react'
import Table from 'react-bootstrap/Table'
import Icon from '../Components/Icon'

function PopupTable(props) {
	let popupList = props.worldPopups.map((popup, index) => {
		let keyValue = popup.vanillaAddress
		let backgroundColor = ''
		if (popup.isReplaced()) {
			if (index % 2 === 0)
				backgroundColor = '#225533'
			else
				backgroundColor = '#224433'
		}
		if (popup.isAbility()) {
			if (index % 2 === 0)
				backgroundColor = '#552222'
			else
				backgroundColor = '#442222'
		}
		return (
			<tr
				style={{ backgroundColor: backgroundColor }}
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
						type={'row'}
					/>
				</td>
				<td>
					<Icon
						fileName={popup.replacementReward.iconType}
						displayText={popup.replacementReward.reward}
						type={'row'}
					/>
				</td>
			</tr>
		)
	})
	return (
		<div className='rewardTable'>
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
							Original
					</th>
						<th>
							Replacement
					</th>
					</tr>
				</thead>
				<tbody>
					{popupList}
				</tbody>
			</Table>
		</div>
	)
}

export default PopupTable