import React from 'react'

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
		<table>
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
		</table>
	)
}

export default FormTable