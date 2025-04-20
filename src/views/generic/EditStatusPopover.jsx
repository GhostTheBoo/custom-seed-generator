import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import './styles/EditStatusPopoverStyles.css'

function EditStatusPopover(props) {
	return (
		props.message !== ''
			? <OverlayTrigger
				placement='bottom'
				delay={{ show: 100, hide: 200 }}
				overlay={<Popover><Popover.Body>{props.message}</Popover.Body></Popover>}
			>
				<div className={`editStatusPopover ${props.type}`}>{props.text}</div>
			</OverlayTrigger>
			: <div className={`editStatusPopover ${props.type}`}>{props.text}</div>
	)
}

export default EditStatusPopover