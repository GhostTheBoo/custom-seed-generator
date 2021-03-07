import React from 'react'
import Table from 'react-bootstrap/Table'

function MagicTable(props) {
	let magicList = props.abilities.map((ability, index) => {
		let backgroundColor = ''
		if (ability.isReplaced()) {
			if (index % 2 === 0)
				backgroundColor = '#225533'
			else
				backgroundColor = '#224433'
		}
		return (
			<tr
				style={{ backgroundColor: backgroundColor }}
				key={ability.costAddress}
			>
				<td>
					<input
						type='checkbox'
						name={'magics'}
						value={index}
						checked={ability.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{ability.ability}
				</td>
				<td>
					{ability.vanillaCost}
				</td>
				<td>
					{ability.replacementCost}
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
								name={'magicCosts'}
								checked={props.selectAll}
								onChange={props.onCheckAll}
							/>
						</th>
						<th>
							Ability
					</th>
						<th>
							Original Cost
					</th>
						<th>
							Replacement Cost
					</th>
					</tr>
				</thead>
				<tbody>
					{magicList}
				</tbody>
			</Table>
		</div>
	)
}

export default MagicTable