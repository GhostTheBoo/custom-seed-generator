import React from 'react'
import { Button } from 'react-bootstrap'

import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function CostCard(props) {
	let abilityImage = './images/' + props.category.path + '.png'

	let abilityCostList = props.category.specificAbilities.map((specificAbility, specificAbilityIndex) => {
		return (
			<div key={specificAbilityIndex} className='abilityCostRow'>
				<div className='specificAbilityName'>{specificAbility.ability}</div>
				<div className='specificAbilityCost'>{specificAbility.replacementCost}</div>
			</div>
		)
	})

	let overlayPopover = <EditStatusPopover
		text={'NEW!'}
		message={''}
		type='cost'
	/>

	return (
		<div className='costCard'>
			<div style={{ position: 'relative' }}>
				{props.category.specificAbilities.some(ability => ability.isReplaced()) ? overlayPopover : <></>}
				<img
					className='costCardImage'
					src={abilityImage}
					alt={props.category.category}
					width='100%'
					height='auto'
				/>
			</div>
			<div className='costAbilityName'>{props.category.category}</div>
			<hr />
			{abilityCostList}
			<hr />
			<Button onClick={() => props.setAbility(props.categoryIndex)}>
				EDIT
			</Button>
			<Button onClick={() => props.setVanilla(props.categoryIndex)} variant='secondary' >
				VANILLA
			</Button>
		</div>
	)
}

export default CostCard