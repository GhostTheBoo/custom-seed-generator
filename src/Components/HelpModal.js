import { React, useState } from 'react'
import { Button, Modal, Col } from 'react-bootstrap'

import { helpData } from '../Data/helpData'

function HelpModal(props) {
	const [show, setShow] = useState(false)
	if (props.tab === 'home')
		return (
			<Col xs='1'>
			</Col>
		)
	let pageHelp = helpData.find(page => page.key === props.tab)
	return (
		<Col xs='1'>
			<Button block variant="primary" onClick={() => setShow(true)}>
				Help!
      		</Button>
			<Modal size="lg" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						{pageHelp.page}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{pageHelp.help}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => setShow(false)}>
						Okay
          			</Button>
				</Modal.Footer>
			</Modal>
		</Col>
	)
}

export default HelpModal