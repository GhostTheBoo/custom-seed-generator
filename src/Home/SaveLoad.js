import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import './SaveLoadStyles.css'

function SaveLoad(props) {
	const [fileName, setFileName] = useState('')

	return (
		<>
			<h3>Save And Load</h3>
			<div className='saveLoad'>
				<label className='saveLoadLabel'>Seed Name:</label>
				<input
					name={'currentFileName'}
					className='saveLoadInputField'
					type='text'
					value={fileName}
					onChange={(e) => setFileName(e.target.value)}
				/>
				{/* </div>
			<div className='saveRow'> */}
				<Form.Switch
					id='isCommentedCheckbox'
					label={`Comments?`}
					style={{ margin: 'auto' }}
					checked={props.isCommented}
					onChange={props.onCommentChange}
				/>
				<Button
					variant='outline-light'
					name='saveZipButton'
					className='saveZipButton'
					onClick={() => props.handleSaveAsZip(fileName)}
				>
					SAVE ZIP SEED
				</Button>
				<Button
					variant='outline-light'
					name='saveLuaButton'
					className='saveLuaButton'
					onClick={() => props.handleSaveAsLua(fileName)}
				>
					SAVE LUA SEED
				</Button>
				{/* </div>
			<div className='saveLoadRow'> */}
				<Button
					variant='outline-light'
					name='saveJSeedButton'
					className='saveSeedButton'
					onClick={() => props.handleSaveAsJSON(fileName)}
				>
					SAVE PROGRESS
				</Button>
				<Form.Control className='loadSeedButton' type='file' onChange={props.onFileUpload} />
			</div>
		</>
	)
}

export default SaveLoad