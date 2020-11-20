import React from 'react'
import Table from 'react-bootstrap/Table'

function LevelTable(props) {
	let levelList = props.allLevels.map((l, index) => {
		return (
			<tr
				key={l.level}
			>
				<td>
					<input
						type='checkbox'
						name={'levels'}
						value={index}
						checked={l.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{l.level}
				</td>
				<td>
					{l.replacedEXP}
				</td>
				<td>
					{l.standardAP}
				</td>
				<td>
					{l.criticalAP}
				</td>
				<td>
					{l.defense}
				</td>
				<td>
					{l.magic}
				</td>
				<td>
					{l.strength}
				</td>
				<td>
					{l.swordReplacementReward}
				</td>
				<td>
					{l.shieldReplacementReward}
				</td>
				<td>
					{l.staffReplacementReward}
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
						Level
					</th>
					<th>
						Total EXP to Next Level
					</th>
					<th>
						Standard AP
					</th>
					<th>
						Critical AP
					</th>
					<th>
						Defense
					</th>
					<th>
						Magic
					</th>
					<th>
						Strength
					</th>
					<th>
						Sword Replacement Reward
					</th>
					<th>
						Shield Replacement Reward
					</th>
					<th>
						Staff Replacement Reward
					</th>
				</tr>
			</thead>
			<tbody>
				{levelList}
			</tbody>
		</Table>
	)
}

export default LevelTable