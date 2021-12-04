import { React, useState } from 'react'
import { Form, Col, Button, Modal } from 'react-bootstrap'

function SaveLoadModal(props) {
	const [show, setShow] = useState(false)
	const [pnachFileName, setPnachFileName] = useState('')
	const [luaFileName, setLuaFileName] = useState('')
	const [jsonFileName, setJSONFileName] = useState('')

	return (
		<>
			<Button variant="primary" block onClick={() => setShow(true)}>
				SAVE & LOAD
			</Button>
			<Modal size="lg" show={show} onHide={() => setShow(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						{'Save & Load'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Row>
						<Col xs='7'>
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
						<Col xs='3'>
							<Form.Check
								type={'checkbox'}
								id={`isCommentedPnachCheckbox`}
								label={`Include Comments?`}
								checked={props.isPnachCommented}
								onChange={props.onPnachCommentChange}
							/>
						</Col>
						<Col xs='2'>
							<Button
								variant='outline-light'
								block
								name='savePnachButton'
								onClick={() => props.handleSaveAsPnach(pnachFileName)}
							>
								SAVE PNACH
							</Button>
						</Col>
					</Form.Row>
					<br></br>
					<Form.Row>
						<Col xs='7'>
							<Form.Group controlId='currentLuaFileName'>
								<Form.Label column='sm' srOnly>Lua File Name: </Form.Label>
								<Form.Control
									size='sm'
									name='currentLuaFileName'
									type='text'
									value={luaFileName}
									placeholder='Lua File Name'
									onChange={(e) => setLuaFileName(e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Col xs='3'>
							<Form.Check
								type={'checkbox'}
								id={`isLuaCommentedCheckbox`}
								label={`Include Comments?`}
								checked={props.isLuaCommented}
								onChange={props.onLuaCommentChange}
							/>
						</Col>
						<Col xs='2'>
							<Button
								variant='outline-light'
								block
								name='saveLuaButton'
								onClick={() => props.handleSaveAsLua(luaFileName)}
							>
								SAVE LUA
							</Button>
						</Col>
					</Form.Row>
					<br></br>
					<Form.Row>
						<Col xs='10'>
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
						<Col>
							<Button
								variant='outline-light'
								block
								name='saveJSONButton'
								onClick={() => props.handleSaveAsJSON(jsonFileName)}
							>
								SAVE DATA
							</Button>
						</Col>
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
		</>
	)
}

export default SaveLoadModal