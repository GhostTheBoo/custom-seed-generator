import React from 'react'
import Table from 'react-bootstrap/Table'
/*
			<MagicTable
				currentMagicType={magicCostsData[props.magicData.currentMagicType]}
				abilities={props.magicData.currentDisplayData}
				onRowCheck={props.onRowCheck}
				checkAll={props.checkAll}
				selectAll={props.magicData.selectAll}
			/>
			*/
function MagicTable(props) {
	let magicList = props.abilities.map((ability, index) => {
		let styles
		if (ability.isReplaced) {
			styles = { background: 'green' }
		}
		return (
			<tr
				style={styles}
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
		<Table striped bordered hover size='sm' variant='dark'>
			<thead>
				<tr>
					<th>
						<input
							type='checkbox'
							name={'magicCosts'}
							checked={props.selectAll}
							onChange={props.checkAll}
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
	)
}

export default MagicTable