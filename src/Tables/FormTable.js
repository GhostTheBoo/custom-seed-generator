import React from 'react'
import Table from 'react-bootstrap/Table'

function FormTable(props) {
	let formList = props.driveLevels.map((driveLevel, index) => {
		let styles
		let originalReward = driveLevel.isRewardReplaced ? driveLevel.replacementReward.reward : ''
		let originalEXP = driveLevel.isEXPReplaced ? driveLevel.replacementEXP : ''

		if (driveLevel.isRewardReplaced || driveLevel.isEXPReplaced)
			styles = { background: 'green' }
		return (
			<tr
				style={styles}
				key={driveLevel.level}
			>
				<td>
					<input
						type='checkbox'
						name={props.currentDriveForm}
						value={index}
						checked={driveLevel.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{driveLevel.level}
				</td>
				<td>
					{driveLevel.vanillaReward.reward}
				</td>
				<td>
					{originalReward}
				</td>
				<td>
					{driveLevel.vanillaEXP}
				</td>
				<td>
					{originalEXP}
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
							name={props.currentDriveForm + 'All'}
							checked={props.selectAll}
							onChange={props.checkAll}
						/>
					</th>
					<th>
						Level
					</th>
					<th>
						Original Ability
					</th>
					<th>
						Replacement Reward
					</th>
					<th>
						Original EXP to Level
					</th>
					<th>
						New EXP to Level
					</th>
				</tr>
			</thead>
			<tbody>
				{formList}
			</tbody>
		</Table>
	)
}

export default FormTable