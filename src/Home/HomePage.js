import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

import KoFi from './KoFi'
import CreditsList from './CreditsList'

function HomePage(props) {
	let lastUpdateDate = 'August 26, 2022'
	let logo = './images/logo.png'

	return (
		<Container fluid style={{ fontSize: '1.25rem' }}>
			<Row>
			</Row>
			<Row>
				<Col xs={8}>
					<img
						src={logo}
						alt='Custom Seed Generator'
						height='200px'
						width='600px'
						style={{ display: 'block', margin:'auto' }}
					/>
					{/* <h1 style={{ textAlign: 'center' }}>Custom Seed Generator</h1> */}
					<p style={{ textAlign: 'justify' }}>
						This tool is used with the Garden of Assemblage mod to customize specific rewards and aspects of Kingdom Hearts 2 Final Mix.
						It will create a custom pnach, lua, or zip file that can be used alongside the PS2 or PC version of the game to apply any customizations.
						This will let you make a planned out instance of a randomized seed (or a plando for short).
					</p>
					<hr />
					<h3 style={{ textAlign: 'center' }}>How To Use</h3>
					<p style={{ textAlign: 'justify' }}>
						Each page has its own rules for how to customize and change rewards and equipment.
						Checking rows and clicking replace will modify that reward in game.
						Clicking vanilla instead will have the reward be exactly how it is in the regular game.
						Anything that will end up being replaced in the game will be shown as a green row.
						Anything that may cause crashes or issues in game will be shown as a red row.
						Red rows will still be generated to use as described but use at your own risk.
						After all rewards are modified to your liking, the save button will download a pnach file ready to be used.
					</p>
					<hr />
					<h3 style={{ textAlign: 'center' }}>Saving / Loading Data</h3>
					<p style={{ textAlign: 'justify' }}>
						By clicking the save data button, a json file will be generated storing all the data of the current session.
						Whenever loading up the site again, select the downloaded json file.
						This will bring up all the modified values from the previous session.
						It is unrealistic for me to promise this feature works perfectly.
						If any issues come up let me know and be sure not to delete the json file even if it does not seem to work.
					</p>
					<hr />
					<h3 style={{ textAlign: 'center' }}>More Information</h3>
					<p style={{ textAlign: 'justify' }}>
						The site is hosted using Github Pages.
						The repository can be found <a target='_blank' rel='noopener noreferrer' href='https://github.com/GhostTheBoo/custom-seed-generator'>here</a>.
						<br />
						The site has most recently been updated on {lastUpdateDate}.
					</p>
					<Row>
						<KoFi
							color='#29AB00'
							id='ghosttheboo'
							label='Buy me a Sea-Salt Ice Cream!'
						/>
						<div style={{ flexGrow: '1' }} />
						{props.children}
					</Row>
				</Col>
				<hr />
				<Col xs={4} style={{ textAlign: 'center' }}>
					<h2>Thank You!</h2>
					<CreditsList />
				</Col>
			</Row>
		</Container>
	)
}

export default HomePage