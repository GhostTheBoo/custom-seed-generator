import React from 'react'
import Table from 'react-bootstrap/Table'

function BonusTable(props) {
	let bonusList = props.bonuses.slots.filter(bonus => bonus !== null).map((bonus, index) => {
		let styles
		console.log(bonus)
		if (bonus.isStatsReplaced() || bonus.isSlotsReplaced() || bonus.isRewardsReplaced())
			styles = { background: 'green' }
		if ((bonus.getStatCount() + bonus.getSlotCount() + bonus.getRewardCount()) > 2)
			styles = { background: 'red' }
		return (
			<tr
				style={styles}
				key={bonus.fight + 'Slot' + index}
			>
				<td>
					<input
						type='checkbox'
						name={bonus.fight + 'Slot' + index + 'checkbox'}
						value={index}
						checked={bonus.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{bonus.replacementCharacter}
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
							name={props.bonuses.fight + 'All'}
							checked={props.selectAll}
							onChange={props.onCheckAll}
						/>
					</th>
					<th>
						Character
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