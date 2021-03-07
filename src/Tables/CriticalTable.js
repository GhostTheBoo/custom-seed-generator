import React from 'react'
import Table from 'react-bootstrap/Table'
import Icon from '../Components/Icon'

function CriticalTable(props) {
	let criticalList = props.allCriticals.map((ce, index) => {
		let backgroundColor = ''
		if (ce.isReplaced()) {
			if (index % 2 === 0)
				backgroundColor = '#225533'
			else
				backgroundColor = '#224433'
		}
		return (
			<tr
				style={{ backgroundColor: backgroundColor }}
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
					<Icon
						fileName={ce.vanillaReward.iconType}
						displayText={ce.vanillaReward.reward}
						type={'row'}
					/>
				</td>
				<td>
					<Icon
						fileName={ce.replacementReward.iconType}
						displayText={ce.replacementReward.reward}
						type={'row'}
					/>
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
								name={'criticalExtras'}
								checked={props.selectAll}
								onChange={props.onCheckAll}
							/>
						</th>
						<th>
							Original
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
		</div>
	)
}

export default CriticalTable