import React from 'react'
import Table from 'react-bootstrap/Table'
// import Icon from '../Components/Icon'

function FormTable(props) {
	let formList = props.driveLevels.map((driveLevel, index) => {
		let styles

		if (driveLevel.isRewardReplaced() || driveLevel.isEXPReplaced())
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
					{driveLevel.isRewardReplaced() ? driveLevel.replacementReward.reward : ''}
				</td>
				<td>
					{driveLevel.vanillaEXP}
				</td>
				<td>
					{driveLevel.isEXPReplaced() ? driveLevel.replacementEXP : ''}
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
							onChange={props.onCheckAll}
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