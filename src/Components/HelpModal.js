import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { helpData } from '../Data/helpData'

function HelpModal(props) {
	const [show, setShow] = useState(false)
	if (props.tab === 0)
		return null
	let pageHelp = helpData[props.tab - 1]
	return (
		<>
			<Button variant='outline-info' className='helpButton' onClick={() => setShow(true)}>
				Help!
			</Button>
			<Modal size='lg' show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						{pageHelp.page}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{pageHelp.help}
				</Modal.Body>
			</Modal>
		</>
	)
}

export default HelpModal