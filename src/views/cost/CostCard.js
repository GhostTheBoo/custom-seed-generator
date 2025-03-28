import React, { useState } from 'react'

import EditStatusPopover from '../generic/EditStatusPopover'
import { useEffect } from 'react'

function CostCard(props) {
	const [currentCost, setCurrentCost] = useState(props.ability.replacementCost)

	useEffect(() => {
		setCurrentCost(props.ability.replacementCost)
	}, [props.ability])

	function handleFocusChange() {
		props.updateCost(props.categoryIndex, props.ability.costAddress, currentCost)
	}

	let overlayPopover = <EditStatusPopover
		text={'NEW!'}
		message={''}
		type='cost'
	/>

	return (
		<div key={props.ability.costAddress} className='costCard'>
			{props.ability.isReplaced() ? overlayPopover : <></>}
			<span className='specificAbilityName'>{props.ability.ability}</span>
			{props.isEditing
				? <input
					name={props.ability.ability}
					className='specificAbilityCost costInputField'
					type='number'
					value={isNaN(currentCost) ? '' : currentCost}
					onChange={(e) => setCurrentCost(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
					autoFocus
					onBlur={() => handleFocusChange()}
					onKeyDown={(e) => { if (e.key === 'Enter') handleFocusChange() }}
					min='0'
					max='255'
					size={4}
				/>
				: <span
					className={`specificAbilityCost${props.ability.isReplaced() ? ' new' : ''}`}
					onClick={() => props.updateFocus(props.ability.costAddress)}
				>
					{props.ability.replacementCost}
				</span>
			}
			<div />
			<img
				className={`costEditIcon${props.ability.replacementCost === props.ability.vanillaCost ? ' invis' : ''} btn btn-secondary`}
				src='./images/extra/undo.svg'
				alt='vanilla'
				width='100%'
				height='auto'
				onClick={() => props.updateCost(props.categoryIndex, props.ability.costAddress, props.ability.vanillaCost)}
			/>
		</div>
	)
}

export default CostCard