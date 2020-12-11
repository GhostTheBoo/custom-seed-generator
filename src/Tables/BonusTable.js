import React from 'react'
import Table from 'react-bootstrap/Table'

function BonusTable(props) {
	let bonusList = props.bonuses.map((bonus, index) => {
		let isReplaced = (bonus.isStatsReplaced || bonus.isSlotsReplaced || bonus.isRewardsReplaced)
		let changeCount = (bonus.statChangeCount + bonus.slotChangeCount + bonus.rewardChangeCount)
		let styles
		if (isReplaced)
			styles = { background: 'green' }
		if (changeCount > 2)
			styles = { background: 'red' }
		return (
			<tr
				style={styles}
				key={props.currentCharacter + ': ' + bonus.fight}
			>
				<td>
					<input
						type='checkbox'
						name={props.currentCharacter + props.currentWorld}
						value={index}
						checked={bonus.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{bonus.fight}
				</td>
				<td>
					{bonus.replacementReward1.index !== '0000' ? bonus.replacementReward1.reward : ''}
				</td>
				<td>
					{bonus.replacementReward2.index !== '0000' ? bonus.replacementReward2.reward : ''}
				</td>
				<td>
					{bonus.hpIncrease}
				</td>
				<td>
					{bonus.mpIncrease}
				</td>
				<td>
					{bonus.armorSlotIncrease}
				</td>
				<td>
					{bonus.accessorySlotIncrease}
				</td>
				<td>
					{bonus.itemSlotIncrease}
				</td>
				<td>
					{bonus.driveGaugeIncrease}
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
							onChange={props.checkAll}
						/>
					</th>
					<th>
						Fight
					</th>
					<th>
						Reward 1
					</th>
					<th>
						Reward 2
					</th>
					<th>
						HP Increase
					</th>
					<th>
						MP Increase
					</th>
					<th>
						Armor Slot Increase
					</th>
					<th>
						Accessory Slot Increase
					</th>
					<th>
						Item Slot Increase
					</th>
					<th>
						Drive Gauge Increase
					</th>
				</tr>
			</thead>
			<tbody>
				{bonusList}
			</tbody>
		</Table>
	)
}

export default BonusTable