import React from 'react'
import { Row, Container } from 'react-bootstrap'

function HomePage(props) {
	let lastUpdateDate = 'April 17, 2021'

	return (
		<div>
			<h1>Custom Seed Generator</h1>
			<p>
				This tool is used with the Garden of Assemblage mod to customize specific rewards and aspects of Kingdom Hearts 2 Final Mix.
				It will create a custom pnach file that can be put in the cheat folder of PCSX2 alongside the GoA mod pnach, applying all of the customizations to the game.
				This will let you make a planned out instance of a randomized seed (or a plando for short).
			</p>
			<h3>How To Use</h3>
			<p>
				Each page has its own rules for how to customize and change rewards and equipment.
				Checking rows and clicking replace will modify that reward in game.
				Clicking vanilla instead will have the reward be exactly how it is in the regular game.
				Anything that will end up being replaced in the game will be shown as a green row.
				Anything that may cause crashes or issues in game will be shown as a red row.
				Red rows will still be generated to use as described but use at your own risk.
				After all rewards are modified to your liking, the save button will download a pnach file ready to be used.
			</p>
			<h3>Saving / Loading Data</h3>
			<p>
				By clicking the save data button, a json file will be generated storing all the data of the current session.
				Whenever loading up the site again, select the downloaded json file.
				This will bring up all the modified values from the previous session.
				It is unrealistic for me to promise this feature works perfectly.
				If any issues come up let me know and be sure not to delete the json file even if it does not seem to work.
			</p>
			<h3>More Information</h3>
			<p>
				The site is hosted using Github Pages.
				The repository can be found <a target='_blank' rel='noopener noreferrer' href='https://github.com/GhostTheBoo/custom-seed-generator'>here</a>.
				<br></br>
				The site has most recently been updated on {lastUpdateDate}.
			</p>
			<Container fluid>
				<Row>
					{props.children}
				</Row>
			</Container>
		</div>
	)
}

export default HomePage