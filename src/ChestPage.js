import React from 'react'

import WorldSelect from './Components/WorldSelect'
import RewardSelect from './Components/RewardSelect'

class ChestPage extends React.Component {
	constructor() {
		super()
		this.state = {
			currentWorld: 0,
			currentRewardType: 0,
			currentReward: 0
		}
	}

	render() {
		return (
			<div>
				<WorldSelect currentWorld={this.state.currentWorld} />
				<RewardSelect
					currentRewardType={this.state.currentRewardType}
					currentReward={this.state.currentReward}
				/>
			</div>
		)
	}
}

export default ChestPage