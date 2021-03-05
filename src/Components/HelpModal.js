import { React, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function HelpModal(props) {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<div>
			<Button variant="primary" onClick={handleShow}>
				Help!
      		</Button>
			<Modal size="lg" show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						{props.page}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.description}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Okay
          			</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default HelpModal