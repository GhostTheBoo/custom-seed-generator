import { React } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'

function EditStatusPopover(props) {

	let textSize
	if (props.type === 'chest')
		textSize = '2.5rem'
	else if (props.type === 'popup')
		textSize = '1rem'
	else if (props.type === 'bonus')
		textSize = '1rem'
	else if (props.type === 'form')
		textSize = 20
	else if (props.type === 'equipment')
		textSize = '1.5rem'
	else if (props.type === 'level')
		textSize = '1rem'
	else if (props.type === 'magic')
		textSize = '1.5rem'
	else
		textSize = 0

	let styles = {
		fontFamily: 'KHGummi',
		fontSize: textSize,
		textShadow: '-.1rem 0 .2rem #B05927, .1rem 0 .2rem #B05927, .1rem .1rem .2rem #B05927, -.1rem .1rem .2rem #B05927, .1rem -.1rem .2rem #B05927, -.1rem -.1rem .2rem #B05927',
		color: '#9FA357',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		right: 0
	}

	return (
		props.message !== ''
			? <OverlayTrigger
				placement='bottom'
				delay={{ show: 100, hide: 200 }}
				overlay={<Popover><Popover.Content>{props.message}</Popover.Content></Popover>}
			>
				<div style={styles}>{props.text}</div>
			</OverlayTrigger>
			: <div style={styles}>{props.text}</div>
	)
}

export default EditStatusPopover