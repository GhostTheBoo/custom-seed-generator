import React from 'react'
import Table from 'react-bootstrap/Table'
// import Icon from '../Components/Icon'

function CriticalTable(props) {
	let criticalList = props.allCriticals.map((ce, index) => {
		let styles
		if (ce.isReplaced()) {
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
					{ce.vanillaReward.reward}
				</td>
				<td>
					{ce.replacementReward.reward}
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
							onChange={props.onCheckAll}
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