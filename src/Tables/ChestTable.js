import React from 'react'
import Table from 'react-bootstrap/Table'
import Icon from '../Components/Icon'

function ChestTable(props) {
	let chestList = props.worldChests.map((chest, index) => {
		let keyValue = chest.vanillaAddress
		let styles
		let replacementReward = ''
		if (chest.isReplaced()) {
			styles = { background: 'green' }
			replacementReward = chest.replacementReward.reward
		}
		let reward = <Icon
			fileName={chest.replacementReward.iconType}
			displayText={chest.replacementReward.index !== 0x0000 ? chest.replacementReward.reward : ''}
		/>
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
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{chest.room}
				</td>
				<td>
					{/* {chest.vanillaReward.reward} */}
					{reward}
				</td>
				<td>
					{replacementReward}
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