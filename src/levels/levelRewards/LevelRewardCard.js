import React from 'react'
import { Button } from 'react-bootstrap'

import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

import RewardSelectorButton from '../../rewards/RewardSelectorButton'

function LevelCard(props) {
	let overlayPopover = <EditStatusPopover
		text='NEW!'
		message={''}
		type='level'
	/>

	function replaceSword(replacementReward){

	}
	function replaceShield(replacementReward){

	}
	function replaceStaff(replacementReward){

	}

	if (props.isAllLevel)
		return (
			<div className={`levelCard ${props.isSmall ? 'smallLevelCard' : ''}`}>
				<div className='levelCardNumber'>
					<div className='levelNumber'>All Levels</div>
				</div>
			</div>
		)
	else
		return (
			<div className={`levelCard ${props.isSmall ? 'smallLevelCard' : ''}`}>
				{props.level.isReplaced() ? overlayPopover : <></>}
				<div className='levelCardNumber'>
					<div className='levelNumber'>LV. {props.level.level}</div>
					<div className='levelEditButton'>
						<Button
							variant='primary'
							id={props.id}
							disabled={props.isEditing}
							onClick={() => props.setCurrentLevel(props.id)}
						>
							{props.isEditing ? 'EDITING...' : 'EDIT'}
						</Button>
					</div>
				</div>
				<div className='levelCardRewards'>
					<div className='levelSwordReward levelRewardRow'>
						<div>
							<Icon
								style={{ margin: '10px' }}
								fileName={'sword'}
								type={'row'}
							>
								{': '}
							</Icon>
						</div>
						<div className='levelReward'>
							<Icon
								fileName={props.level.replacementSwordReward.iconType}
								type={'card'}
							>
								{props.level.replacementSwordReward.reward}
							</Icon>
						</div>
						<RewardSelectorButton
							originalReward={props.level.replacementSwordReward.reward}
							onReplace={(replacementReward) => replaceSword(replacementReward)}
						/>
					</div>
					<div className='levelShieldReward levelRewardRow'>
						<div>
							<Icon
								style={{ margin: '10px' }}
								fileName={'shield'}
								type={'row'}
							>
								{': '}
							</Icon>
						</div>
						<div className='levelReward'>
							<Icon
								fileName={props.level.replacementShieldReward.iconType}
								type={'card'}
							>
								{props.level.replacementShieldReward.reward}
							</Icon>
						</div>
						<RewardSelectorButton
							originalReward={props.level.replacementShieldReward.reward}
							onReplace={(replacementReward) => replaceShield(replacementReward)}
						/>
					</div>
					<div className='levelStaffReward levelRewardRow'>
						<div>
							<Icon
								style={{ margin: '10px' }}
								fileName={'staff'}
								type={'row'}
							>
								{': '}
							</Icon>
						</div>
						<div className='levelReward'>
							<Icon
								fileName={props.level.replacementStaffReward.iconType}
								type={'card'}
							>
								{props.level.replacementStaffReward.reward}
							</Icon>
						</div>
						<RewardSelectorButton
							originalReward={props.level.replacementStaffReward.reward}
							onReplace={(replacementReward) => replaceStaff(replacementReward)}
						/>
					</div>
				</div>
			</div>
		)
}

export default LevelCard