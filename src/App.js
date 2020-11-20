import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import ChestPage from './ChestPage'
import PopupPage from './PopupPage'
import FormPage from './FormPage'
import EquipmentPage from './EquipmentPage'
import BonusPage from './BonusPage'
import LevelPage from './LevelPage'

class App extends React.Component {
	render() {
		return (
			<Tabs defaultActiveKey="chest" transition={false} id="noanim-tab-example">
				<Tab eventKey="chest" title="Chest">
					<ChestPage />
				</Tab>
				<Tab eventKey="popup" title="Popup">
					<PopupPage />
				</Tab>
				<Tab eventKey="form" title="Form">
					<FormPage />
				</Tab>
				<Tab eventKey="equipment" title="Equipment">
					<EquipmentPage />
				</Tab>
				<Tab eventKey="bonus" title="Bonus">
					<BonusPage />
				</Tab>
				<Tab eventKey="level" title="Level">
					<LevelPage />
				</Tab>
			</Tabs>
		)
	}
}

export default App