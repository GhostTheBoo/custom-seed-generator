import React from 'react'
import Table from 'react-bootstrap/Table'
// import Icon from '../Components/Icon'

import { charactersData } from '../Data/typesData'

function BonusTable(props) {
	let bonusList
	if (props.bonuses.length !== 0) {
		bonusList = props.bonuses[props.currentFight].slots.filter(bonus => Object.keys(bonus).length !== 0).map((bonus, index) => {
			let styles

			if (bonus.isStatsReplaced() || bonus.isSlotsReplaced() || bonus.isRewardsReplaced() || bonus.isCharacterReplaced())
				styles = { background: 'green' }
			if ((bonus.statChangeCount + bonus.slotChangeCount + bonus.rewardChangeCount) > 2)
				styles = { background: 'red' }

			let bonusReceiver
			if (bonus.replacementCharacter === 0) {
				if (props.currentWorld === 'Simulated Twilight Town')
					bonusReceiver = 'Roxas'
				else
					bonusReceiver = 'Sora'
			}
			else
				bonusReceiver = charactersData[bonus.replacementCharacter]

			// let bonusA = <Icon
			// 	fileName={bonus.replacementReward1.iconType}
			// 	displayText={bonus.replacementReward1.index !== 0x0000 ? bonus.replacementReward1.reward : ''}
			// />
			// let bonusB = <Icon
			// 	fileName={bonus.replacementReward2.iconType}
			// 	displayText={bonus.replacementReward2.index !== 0x0000 ? bonus.replacementReward2.reward : ''}
			// />

			return (
				<tr
					style={styles}
					key={bonus.fight + 'Slot' + index}
				>
					<td>
						<input
							type='checkbox'
							name={bonus.fight + 'Slot' + index + 'checkbox'}
							value={index}
							checked={bonus.toBeReplaced}
							onChange={props.onRowCheck}
						/>
					</td>
					<td>
						{bonusReceiver}
					</td>
					<td>
						{/* {bonusA} */}
						{bonus.replacementReward1.index !== 0x0000 ? bonus.replacementReward1.reward : ''}
					</td>
					<td>
						{/* {bonusB} */}
						{bonus.replacementReward2.index !== 0x0000 ? bonus.replacementReward2.reward : ''}
					</td>
					<td>
						{bonus.hpIncrease}
					</td>
					<td>
						{bonus.mpIncrease}
					</td>
					<td>
						{bonus.armorSlotIncrease}
					</td>
					<td>
						{bonus.accessorySlotIncrease}
					</td>
					<td>
						{bonus.itemSlotIncrease}
					</td>
					<td>
						{bonus.driveGaugeIncrease}
					</td>
				</tr>
			)
		})
	}
	else
		bonusList = []

	return (
		<Table striped bordered hover size='sm' variant='dark'>
			<thead>
				<tr>
					<th>
						<input
							type='checkbox'
							name={props.bonuses.fight + 'All'}
							checked={props.selectAll}
							onChange={props.onCheckAll}
						/>
					</th>
					<th>
						Character
					</th>
					<th>
						Reward 1
					</th>
					<th>
						Reward 2
					</th>
					<th>
						HP Increase
					</th>
					<th>
						MP Increase
					</th>
					<th>
						Armor Slot Increase
					</th>
					<th>
						Accessory Slot Increase
					</th>
					<th>
						Item Slot Increase
					</th>
					<th>
						Drive Gauge Increase
					</th>
				</tr>
			</thead>
			<tbody>
				{bonusList}
			</tbody>
		</Table>
	)
}

export default BonusTable