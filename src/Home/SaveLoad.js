import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import './SaveLoadStyles.css'

function SaveLoad(props) {
	const [seedTitle, setSeedTitle] = useState('')
	const [seedDescription, setSeedDescription] = useState('')

	return (
		<div className='saveLoad'>
			<div className='seedDetails'>
				<label className='saveLoadLabel'>Seed Title:</label>
				<input
					name={'currentseedTitle'}
					className='saveLoadTitle'
					type='text'
					value={seedTitle}
					onChange={(e) => setSeedTitle(e.target.value)}
				/>
				<label className='saveLoadLabel'>Seed Description:</label>
				<textarea
					name={'currentseedDescription'}
					className='saveLoadDescription'
					type='text'
					value={seedDescription}
					onChange={(e) => setSeedDescription(e.target.value)}
				/>
			</div>
			<div className='saveButtons'>
				<div className='saveCommentGroup'>
					<Form.Check type='checkbox' checked={props.isCommented} onChange={props.onCommentChange} />
					<label className='saveLoadLabel'>Enable Comments</label>
				</div>
				<div className='saveLoadLabel'>SAVE: </div>
				<Button
					variant='outline-primary'
					name='saveZipButton'
					className='saveZipButton'
					onClick={() => props.handleSaveAsZip(seedTitle, seedDescription)}
				>
					ZIP
				</Button>
				<Button
					variant='outline-primary'
					name='saveLuaButton'
					className='saveLuaButton'
					onClick={() => props.handleSaveAsLua(seedTitle)}
				>
					LUA
				</Button>
				<Button
					variant='outline-secondary'
					name='saveJSeedButton'
					className='saveProgressButton'
					onClick={() => props.handleSaveAsJSON(seedTitle)}
				>
					PROGRESS
				</Button>
				<div className='saveLoadLabel'>LOAD: </div>
				<input
					name='saveJSeedButton'
					className='progressButton'
					label='Load Progress'
					type='file'
					accept='.json'
					onChange={props.onFileUpload}
				/>
			</div>
		</div>
	)
}

export default SaveLoad