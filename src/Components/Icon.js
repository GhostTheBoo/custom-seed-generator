import { React, useState, useEffect } from 'react'

function Icon(props) {
	const [iconPath, setIconPath] = useState(props.fileName.toLowerCase())
	useEffect(() => {
		setIconPath(props.fileName.toLowerCase())
	}, [props.fileName])
	function handleError() {
		setIconPath('empty')
	}
	let classNameSuffix = ' ' + (props.className !== undefined ? props.className : '')
	let icon = './images/icons/' + iconPath + '.png'

	let iconSize
	if (props.type === 'row')
		iconSize = 25
	else if (props.type === 'card')
		iconSize = 21
	else if (props.type === 'tab')
		iconSize = 40
	else if (props.type === 'header')
		iconSize = 20
	else if (props.type === 'form')
		iconSize = 30
	else if (props.type === 'bonusForm')
		iconSize = 50
	else
		iconSize = 0

	return (
		<>
			<img
				className={'icon' + classNameSuffix}
				src={icon}
				alt={props.fileName.toLowerCase()}
				onError={handleError}
				width={iconSize}
				style={{ verticalAlign: 'middle' }}
			/>
			<span
				className={'iconDescription' + classNameSuffix}
				style={{ verticalAlign: 'middle' }}
			>
				{' ' + props.children}
			</span>
		</>
	)
}

export default Icon