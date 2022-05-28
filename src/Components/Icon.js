import { React, useState, useEffect } from 'react'

function Icon(props) {
	const [iconPath, setIconPath] = useState(props.fileName.toLowerCase())
	let icon = require(`../assets/icons/${iconPath}.png`)

	useEffect(() => {
		setIconPath(props.fileName.toLowerCase())
	}, [props.fileName])

	function handleError() {
		setIconPath('empty')
	}
	let iconSize
	if (props.type === 'row')
		iconSize = 25
	else if (props.type === 'card')
		iconSize = 21
	else if (props.type === 'tab')
		iconSize = 40
	else if (props.type === 'header')
		iconSize = 20
	else
		iconSize = 0

	return (
		<>
			<img
				className='icon'
				src={icon.default}
				alt={props.fileName.toLowerCase()}
				onError={handleError}
				height={iconSize}
				width={iconSize}
				style={{ verticalAlign: 'middle' }}
			/>
			<span
				className='iconDescription'
				style={{ verticalAlign: 'middle' }}
			>
				{' ' + props.children}
			</span>
		</>
	)
}

export default Icon