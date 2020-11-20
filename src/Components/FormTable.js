import React from 'react'
import Table from 'react-bootstrap/Table'

function FormTable(props) {
	let formList = props.driveLevels.map((driveLevel, index) => {
		return (
			<tr
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
					{driveLevel.vanillaReward}
				</td>
				<td>
					{driveLevel.replacementReward}
				</td>
				<td>
					{driveLevel.vanillaEXP}
				</td>
				<td>
					{driveLevel.replacementEXP}
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