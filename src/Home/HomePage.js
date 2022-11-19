import React from 'react'
import './HomeStyles.css'

import NavbarIcon from '../navbar/NavbarIcon'
import KoFi from './KoFi'
import CreditsList from './CreditsList'
import SaveLoad from './SaveLoad'

function HomePage(props) {
	let lastUpdateDate = 'November 19, 2022'
	let logo = './images/logo.png'

	return (
		<div style={{ fontSize: '1.25rem' }}>
			<div className='homePageHeader'>
				<div className='homePageKofi'>
					<KoFi
						color='#29AB00'
						id='ghosttheboo'
						label='Buy me a Sea-Salt Ice Cream!'
					/>
					<div className='flex-grow-1' />
				</div>
				<img
					src={logo}
					alt='Custom Seed Generator'
					height='180px'
					width='540px'
					style={{ display: 'block', margin: 'auto' }}
				/>
				<div className='homePageNavbarIcon'>
					<div className='flex-grow-1' />
					<NavbarIcon
						showNavbar={props.handleShowNavbar}
						fileName={'home'}
						title={'Home'}
					/>
				</div>
			</div>
			<div className='homePageContent'>
				<CreditsList />
				<div className='homePageText'>
					<div>
						<h3>About</h3>
						<p className='siteDescription'>
							This tool is used with the Garden of Assemblage mod to customize specific rewards and aspects of Kingdom Hearts 2 Final Mix.
							It will create a custom lua or zip file that can be used alongside the PS2 or PC version of the game to apply any customizations.
							This will let you make a planned out instance of a randomized seed (or a plando for short).
						</p>
						<p style={{ textAlign: 'justify' }}>
							Each page has its own rules for how to customize and change rewards and equipment.
							Check out the Help Button on each page for further info on how it works.
						</p>
						<p style={{ textAlign: 'justify' }}>
							When you're finished editing, come back to the home page to export your seed.
							Type in the Seed Name and click Save Zip Seed or Save Lua Seed to start downloading the file.
						</p>
						<p style={{ textAlign: 'justify' }}>
							If you want to take a break and come back to your seed later, click on Save Progress.
							This will download a file containing info on all the edits you've done so far.
							When you return, click on Choose File to upload your progress data and pick up where you left off.
							If any issues come up, let me know and I'll try to help out.
							Be sure to hold on to the JSON file even if it does not seem to work as data might still be recoverable.
						</p>
						The repository can be found <a target='_blank' rel='noopener noreferrer' href='https://github.com/GhostTheBoo/custom-seed-generator'>here</a>.
						The site was last updated on {lastUpdateDate}.
					</div>
					<div>
						<SaveLoad
							isCommented={props.isCommented}
							onCommentChange={props.onCommentChange}
							// handleSaveAsPnach={props.handleSaveAsPnach}
							handleSaveAsLua={props.handleSaveAsLua}
							handleSaveAsZip={props.handleSaveAsZip}
							handleSaveAsJSON={props.handleSaveAsJSON}
							onFileUpload={props.onFileUpload}
						>
						</SaveLoad>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage