import React from 'react'
import Table from 'react-bootstrap/Table'

function CriticalTable(props) {
	let criticalList = props.criticalExtras.map((ce, index) => {
		let styles
		if (ce.isReplaced) {
			styles = { background: 'green' }
		}
		return (
			<tr
				style={styles}
				key={ce.vanillaAddress}
			>
				<td>
					<input
						type='checkbox'
						name={'criticals'}
						value={index}
						checked={ce.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{ce.vanillaReward}
				</td>
				<td>
					{ce.replacementReward}
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
							name={'criticalExtras'}
							checked={props.selectAll}
							onChange={props.checkAll}
						/>
						</th>
					<th>
						Original Ability
					</th>
					<th>
						Replacement
					</th>
				</tr>
			</thead>
			<tbody>
				{criticalList}
			</tbody>
		</Table>
	)
}

export default CriticalTable