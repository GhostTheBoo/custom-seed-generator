import { React, useState, useEffect } from 'react'

function Icon(props) {
	const [iconPath, setIconPath] = useState(props.fileName.toLowerCase())

	useEffect(() => {
		setIconPath(props.fileName.toLowerCase())
	}, [props.fileName])

	function handleError() {
		setIconPath('empty')
	}

	return (
		<div>
			<img
				src={process.env.PUBLIC_URL + '/icons/' + iconPath + '.png'}
				alt={props.fileName.toLowerCase()}
				onError={handleError}
				height={30}
				width={30}
			/>
			{' ' + props.displayText}
		</div >
	)
}

export default Icon