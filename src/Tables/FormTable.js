import React from 'react'
import Table from 'react-bootstrap/Table'
import Icon from '../Components/Icon'

function FormTable(props) {
	let formList = props.driveLevels.map((driveLevel, index) => {
		let backgroundColor = ''
		if (driveLevel.isRewardReplaced() || driveLevel.isEXPReplaced()) {
			if (index % 2 === 0)
				backgroundColor = '#225533'
			else
				backgroundColor = '#224433'
		}
		return (
			<tr
				style={{ backgroundColor: backgroundColor }}
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
					<Icon
						fileName={driveLevel.vanillaReward.iconType}
						displayText={driveLevel.vanillaReward.reward}
						type={'row'}
					/>
				</td>
				<td>
					<Icon
						fileName={driveLevel.replacementReward.iconType}
						displayText={driveLevel.replacementReward.reward}
						type={'row'}
					/>
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
		<div className='rewardTable'>
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
							Original
					</th>
						<th>
							Replacement
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
		</div>
	)
}

export default FormTable