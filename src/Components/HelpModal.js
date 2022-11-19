import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { helpData } from '../Data/helpData'

function HelpModal(props) {
	const [show, setShow] = useState(false)
	// let offsetValue = props.tab === 'cheat' ? '6' : '4'
	if (props.tab === 0)
		return null
	let pageHelp = helpData[props.tab - 1]
	return (
		<>
			<Button variant='primary' className='helpButton' onClick={() => setShow(true)}>
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
				<Modal.Footer>
					<Button variant='primary' onClick={() => setShow(false)}>
						Okay
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default HelpModal