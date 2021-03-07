import { React, useState, useEffect } from 'react'

function Icon(props) {
	const [iconPath, setIconPath] = useState(props.fileName.toLowerCase())

	useEffect(() => {
		setIconPath(props.fileName.toLowerCase())
	}, [props.fileName])

	function handleError() {
		setIconPath('empty')
	}
	let iconSize
	if (props.type === 'row')
		iconSize = 25
	else if (props.type === 'tab')
		iconSize = 40
	else if (props.type === 'header')
		iconSize = 20
	else
		iconSize = 0

	return (
		<div>
			<img
				src={process.env.PUBLIC_URL + '/icons/' + iconPath + '.png'}
				alt={props.fileName.toLowerCase()}
				onError={handleError}
				height={iconSize}
				width={iconSize}
			/>
			{' ' + props.displayText}
		</div>
	)
}

export default Icon