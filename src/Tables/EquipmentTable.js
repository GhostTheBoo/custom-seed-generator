import React from 'react'
import Table from 'react-bootstrap/Table'
import Icon from '../Components/Icon'

function EquipmentTable(props) {
	let equipmentList = props.equipments.map((equipment, index) => {
		let styles
		if (equipment.isAbilityReplaced() || equipment.isStatsReplaced() || equipment.isElementalResistanceChanged() || equipment.isOtherResistanceChanged()) {
			styles = { background: 'green' }
		}
		if (props.currentEquipmentType === 'Armor') {
			if (equipment.additionalLineCount !== 0)
				styles = { background: 'red' }
		} else if (equipment.additionalLineCount > 1)
			styles = { background: 'red' }
		return (
			<tr
				style={styles}
				key={equipment.name}
			>
				<td>
					<input
						type='checkbox'
						name={props.currentEquipmentType}
						value={index}
						checked={equipment.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					{equipment.name}
				</td>
				<td>
					<Icon
						fileName={equipment.replacementAbility.iconType}
						displayText={equipment.replacementAbility.index !== 0x0000 ? equipment.replacementAbility.reward : ''}
					/>
				</td>
				<td>
					{equipment.strength}
				</td>
				<td>
					{equipment.magic}
				</td>
				<td>
					{equipment.ap}
				</td>
				<td>
					{equipment.defense}
				</td>
				<td>
					{equipment.fireResistance}%
				</td>
				<td>
					{equipment.blizzardResistance}%
				</td>
				<td>
					{equipment.thunderResistance}%
				</td>
				<td>
					{equipment.darkResistance}%
				</td>
				<td>
					{equipment.physicalResistance}%
				</td>
				<td>
					{equipment.lightResistance}%
				</td>
				<td>
					{equipment.universalResistance}%
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
							name={props.currentEquipmentType + 'All'}
							checked={props.selectAll}
							onChange={props.onCheckAll}
						/>
					</th>
					<th>
						Name
					</th>
					<th>
						<Icon
							fileName={'ability'}
							displayText={'Ability'}
						/>
					</th>
					<th>
						Strength
					</th>
					<th>
						Magic
					</th>
					<th>
						AP
					</th>
					<th>
						Defense
					</th>
					<th>
						Fire Resistance
					</th>
					<th>
						Blizzard Resistance
					</th>
					<th>
						Thunder Resistance
					</th>
					<th>
						Dark Resistance
					</th>
					<th>
						Physical Resistance
					</th>
					<th>
						Light Resistance
					</th>
					<th>
						Universal Resistance
					</th>
				</tr>
			</thead>
			<tbody>
				{equipmentList}
			</tbody>
		</Table>
	)
}

export default EquipmentTable