import React from 'react'

function Icon(props) {
	let iconName = props.fileName.toLowerCase()
	let displayIcon = '/icons/' + iconName + '.png'
	return (
		<div>
			<img
				src={process.env.PUBLIC_URL + displayIcon}
				alt={props.displayText}
				onError={() => displayIcon = '/icons/empty.png'}
				height={30}
				width={30}
			/>
			{props.displayText}
		</div >
	)
}

export default Icon