import { React, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function SaveLoadModal(props) {
	const [show, setShow] = useState(false)
	const [pnachFileName, setPnachFileName] = useState('')
	const [jsonFileName, setJSONFileName] = useState('')

	return (
		<div>
			<Button variant="primary" onClick={() => setShow(true)}>
				SAVE & LOAD
      		</Button>
			<Modal size="lg" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						{'Save & Load'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Row>
						<Col lg='10'>
							<Form.Group controlId='currentPnachFileName'>
								<Form.Label column='sm' srOnly>Pnach File Name: </Form.Label>
								<Form.Control
									size='sm'
									name='currentPnachFileName'
									type='text'
									value={pnachFileName}
									placeholder='Pnach File Name'
									onChange={(e) => setPnachFileName(e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Button
							variant='outline-dark'
							name='savePnachButton'
							onClick={() => props.handleSaveAsPnach(pnachFileName)}
						>
							SAVE PNACH
						</Button>
					</Form.Row>
					<br></br>
					<Form.Row>
						<Col lg='10'>
							<Form.Group controlId='currentJSONFileName'>
								<Form.Label column='sm' srOnly>JSON Save File Name: </Form.Label>
								<Form.Control
									size='sm'
									name='currentJSONFileName'
									type='text'
									value={jsonFileName}
									placeholder='JSON Save File Name'
									onChange={(e) => setJSONFileName(e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Button
							variant='outline-dark'
							name='saveJSONButton'
							onClick={() => props.handleSaveAsJSON(jsonFileName)}
						>
							SAVE DATA
						</Button>
					</Form.Row>
					<br></br>
					<Form.Row>
						<Form.Group controlId='currentLoadFileName'>
							<Form.Label column='sm'>JSON Save File Name: </Form.Label>
							<Form.Control
								type='file'
								onChange={props.onFileUpload}
							/>
						</Form.Group>
					</Form.Row>
				</Modal.Body>
			</Modal>
		</div >
	)
}

export default SaveLoadModal