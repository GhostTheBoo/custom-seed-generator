import React from 'react'
import Table from 'react-bootstrap/Table'
import Icon from '../Components/Icon'

function LevelTable(props) {
	let levelList = props.allLevels.map((l, index) => {
		let backgroundColor = ''
		if (l.isEXPReplaced() || l.isStatsReplaced() || l.isSwordReplaced() || l.isShieldReplaced() || l.isStaffReplaced()) {
			if (index % 2 === 0)
				backgroundColor = '#225533'
			else
				backgroundColor = '#224433'
		}
		return (
			<tr
				style={{ backgroundColor: backgroundColor }}
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
					{l.replacementEXP}
				</td>
				<td>
					{l.standardAP}
				</td>
				<td>
					{l.criticalAP()}
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
					<Icon
						fileName={l.replacementSwordReward.iconType}
						displayText={l.replacementSwordReward.index !== 0x0000 ? l.replacementSwordReward.reward : ''}
					/>
				</td>
				<td>
					<Icon
						fileName={l.replacementShieldReward.iconType}
						displayText={l.replacementShieldReward.index !== 0x0000 ? l.replacementShieldReward.reward : ''}
					/>
				</td>
				<td>
					<Icon
						fileName={l.replacementStaffReward.iconType}
						displayText={l.replacementStaffReward.index !== 0x0000 ? l.replacementStaffReward.reward : ''}
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
							name={'levelsAll'}
							checked={props.selectAll}
							onChange={props.onCheckAll}
						/>
					</th>
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
						<Icon
							fileName={'sword'}
							displayText={'Sword Replacement Reward'}
						/>
					</th>
					<th>
						<Icon
							fileName={'shield'}
							displayText={'Shield Replacement Reward'}
						/>
					</th>
					<th>
						<Icon
							fileName={'staff'}
							displayText={'Staff Replacement Reward'}
						/>
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