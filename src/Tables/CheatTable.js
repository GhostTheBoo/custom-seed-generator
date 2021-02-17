import React from 'react'
import Table from 'react-bootstrap/Table'

function CheatTable(props) {
	let cheatList = props.cheatData.map((c, index) => {
		let styles
		if (c.isActive) {
			styles = { background: 'green' }
		}
		return (
			<tr
				style={styles}
				key={index}
			>
				<td>
					<input
						type='checkbox'
						name={'cheats'}
						value={index}
						checked={c.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{c.name}
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