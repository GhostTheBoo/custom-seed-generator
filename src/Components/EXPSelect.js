import React from 'react'

function EXPSelect(props) {
	let multiplierList = []
	multiplierList.push(<option key={0} value={0}>CUSTOM</option>)
	for (let i = 1; i < 11; i++) {
		multiplierList.push(<option key={i} value={i / 2}>{i / 2}x</option>)
	}
	return (
		<div>
			<select
				value={props.currentEXPMultiplierValue}
				name={'currentEXPMultiplierValue'}
				onChange={props.onChange}
			>
				{multiplierList}
			</select>
			<input
				type={'text'}
				name={'currentEXP'}
				value={props.currentEXP}
				onChange={props.onChange}
			/>
		</div>
	)
}

export default EXPSelect