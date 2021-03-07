import React from 'react'
import Table from 'react-bootstrap/Table'
import Icon from '../Components/Icon'

function ChestTable(props) {
	let chestList = props.worldChests.map((chest, index) => {
		let keyValue = chest.vanillaAddress
		let backgroundColor = ''
		if (chest.isReplaced()) {
			if (index % 2 === 0)
				backgroundColor = '#225533'
			else
				backgroundColor = '#224433'
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
						checked={chest.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{chest.room}
				</td>
				<td>
					<Icon
						fileName={chest.vanillaReward.iconType}
						displayText={chest.vanillaReward.reward}
						type={'row'}
					/>
				</td>
				<td>
					<Icon
						fileName={chest.replacementReward.iconType}
						displayText={chest.replacementReward.reward}
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
							Room
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
					{chestList}
				</tbody>
			</Table>
		</div>
	)
}

export default ChestTable