import React from 'react'
import { motion } from 'framer-motion'

import './HomeStyles.css'

import KoFi from './KoFi'
import CreditsList from './CreditsList'
import SaveLoad from './SaveLoad'

function HomePage(props) {
	let lastUpdateDate = 'February 17, 2025'
	let logo = './images/logo.png'

	return (
		<motion.div
			initial={{ opacity: .25, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ type: 'spring', duration: .5 }}
			className='fullPageContent'
		>
			<CreditsList />
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
				<div className='flex-grow-1' />
			</div>
			<div className='homePageContent'>
				<div className='homePageText'>
					<div className='homePageDetails'>
						<div>
							<h1>About</h1>
							<p className='siteDescription'>
								This tool is used with the Garden of Assemblage mod to customize specific rewards and aspects of Kingdom Hearts 2 Final Mix.
								It will create a custom lua or zip file that can be used alongside the PS2 or PC version of the game to apply any customizations.
								This will let you make a planned out instance of a randomized seed (or a plando for short).
							</p>
							<p>The site was last updated on {lastUpdateDate}.</p>
						</div>
						<div>
							<h1>Links</h1>
							<ul>
								<li><a target='_blank' rel='noopener noreferrer' href='https://tommadness.github.io/KH2Randomizer/'>KH2 Rando</a></li>
								<li><a target='_blank' rel='noopener noreferrer' href='https://openkh.dev/kh2/'>OpenKh</a></li>
								<li><a target='_blank' rel='noopener noreferrer' href='https://discord.com/invite/KH2FMRando'>KH2FM Rando Discord</a></li>
								<li><a target='_blank' rel='noopener noreferrer' href='https://discord.gg/kt4Nsj6'>KH2FM Plando Dev Discord</a></li>
								<li><a target='_blank' rel='noopener noreferrer' href='https://github.com/GhostTheBoo/custom-seed-generator'>Repository</a></li>
							</ul>
						</div>
					</div>
					<SaveLoad
						isCommented={props.isCommented}
						onCommentChange={props.onCommentChange}
						// handleSaveAsPnach={props.handleSaveAsPnach}
						handleSaveAsLua={props.handleSaveAsLua}
						handleSaveAsZip={props.handleSaveAsZip}
						handleSaveAsJSON={props.handleSaveAsJSON}
						onFileUpload={props.onFileUpload}
					/>
				</div>
			</div>
		</motion.div>
	)
}

export default HomePage