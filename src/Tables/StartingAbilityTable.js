import React from 'react'
import Table from 'react-bootstrap/Table'
import Icon from '../Components/Icon'

function StartingAbilityTable(props) {
	let abilityList = props.allStartingAbilities.map((ability, index) => {
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
				key={ability.vanillaAddress}
			>
				<td>
					<input
						type='checkbox'
						name={'criticals'}
						value={index}
						checked={ability.toBeReplaced}
						onChange={props.onRowCheck}
					/>
				</td>
				<td>
					<Icon
						fileName={ability.vanillaReward.iconType}
						displayText={ability.vanillaReward.reward}
						type={'row'}
					/>
				</td>
				<td>
					<Icon
						fileName={ability.replacementReward.iconType}
						displayText={ability.replacementReward.reward}
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
								name={'startingAbilities'}
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
					{abilityList}
				</tbody>
			</Table>
		</div>
	)
}

export default StartingAbilityTable