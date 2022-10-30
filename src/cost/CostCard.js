import { React } from 'react'
import { Button, Container } from 'react-bootstrap'

import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function CostCard(props) {
	let abilityImage = './images/' + props.ability[0].path + '.png'

	let abilityCostList = props.ability.map((specificAbility, specificAbilityIndex) => {
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
		<Container fluid className='costCard'>
			<div style={{ position: 'relative' }}>
				{props.ability.some(ability => ability.isReplaced()) ? overlayPopover : <></>}
				<img
					className='costCardImage'
					src={abilityImage}
					alt={props.ability[0].category}
					width='100%'
					height='auto'
				/>
			</div>
			<div className='costAbilityName'>{props.ability[0].category}</div>
			{abilityCostList}
			<div className='flex-grow-1' />
			<Button onClick={() => props.setAbility(props.abilityIndex)}>
				EDIT
			</Button>
			<Button onClick={() => props.setVanilla(props.abilityIndex)} variant='secondary' >
				VANILLA
			</Button>
		</Container>
	)
}

export default CostCard