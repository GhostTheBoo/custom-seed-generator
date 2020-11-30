import React from 'react'
import Table from 'react-bootstrap/Table'

function ChestTable(props) {
	let chestList = props.worldChests.map((chest, index) => {
		let keyValue = props.currentWorld + index
		let styles
		let originalReward = ''
		if (chest.isReplaced) {
			styles = { background: 'green' }
			originalReward = chest.replacementReward
		}
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
						checked={chest.toBeReplaced}
						onChange={(event) => props.onRowCheck('chest', event)}
					/>
				</td>
				<td>
					{chest.room}
				</td>
				<td>
					{chest.vanillaReward}
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
					<th>
						<input
							type='checkbox'
							name={props.currentWorld + 'All'}
							checked={props.selectAll}
							onChange={(event) => props.checkAll('chest', event)}
						/>
					</th>
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
		</Table>
	)
}

export default ChestTable