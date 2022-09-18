import { React } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import './EditStatusPopoverStyles.css'

function EditStatusPopover(props) {
	return (
		props.message !== ''
			? <OverlayTrigger
				placement='bottom'
				delay={{ show: 100, hide: 200 }}
				overlay={<Popover><Popover.Content>{props.message}</Popover.Content></Popover>}
			>
				<div className={`editStatusPopover ${props.type}`}>{props.text}</div>
			</OverlayTrigger>
			: <div className={`editStatusPopover ${props.type}`}>{props.text}</div>
	)
}

export default EditStatusPopover