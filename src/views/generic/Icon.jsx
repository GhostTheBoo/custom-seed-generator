import React, { useState, useEffect } from 'react'

function Icon(props) {
	const [iconPath, setIconPath] = useState(props.fileName)
	useEffect(() => {
		setIconPath(props.fileName)
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
		iconSize = 75
	else if (props.type === 'header')
		iconSize = 20
	else if (props.type === 'form')
		iconSize = 30
	else if (props.type === 'bonusForm')
		iconSize = 50
	else if (props.type === 'navbarIcon')
		iconSize = 50
	else
		iconSize = 0

	let text = ''
	if (props.children !== undefined) text = ' ' + props.children

	return (
		<>
			{
				iconPath !== 'empty'
					?
					<img
						className={'icon' + classNameSuffix}
						src={icon}
						alt={props.fileName}
						onError={handleError}
						width={iconSize}
						style={{ verticalAlign: 'middle' }}
					/>
					: <></>
			}
			{
				text.length !== 0
					? <span
						className={'iconDescription' + classNameSuffix}
						style={{ verticalAlign: 'middle' }}
					>
						{text}
					</span>
					: <></>
			}
		</>
	)
}

export default Icon