import React from 'react'
import Table from 'react-bootstrap/Table'

function CheatTable(props) {
	let cheatList = props.cheatData.map((cheat, index) => {
		let backgroundColor = ''
		if (cheat.isActive) {
			if (index % 2 === 0)
				backgroundColor = '#225533'
			else
				backgroundColor = '#224433'
		}
		return (
			<tr
				style={{ backgroundColor: backgroundColor }}
				key={index}
			>
				<td>
					<input
						type='checkbox'
						name={'cheats'}
						value={index}
						checked={cheat.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{cheat.name}
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
							name={'cheatList'}
							checked={props.selectAll}
							onChange={props.onCheckAll}
						/>
					</th>
					<th>
						Name
					</th>
				</tr>
			</thead>
			<tbody>
				{cheatList}
			</tbody>
		</Table>
	)
}

export default CheatTable