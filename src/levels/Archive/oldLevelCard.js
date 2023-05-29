import React from 'react'
import { Button } from 'react-bootstrap'

import Icon from '../../Components/Icon'
import EditStatusPopover from '../../Components/EditStatusPopover/EditStatusPopover'

import LevelStatChange from '../LevelStatChange'
import LevelEXPChange from '../LevelEXPChange'

function LevelCard(props) {
	let overlayPopover = <EditStatusPopover
		text='NEW!'
		message={''}
		type='level'
	/>
	if (props.isAllLevel)
		return (
			<div className={`levelCard ${props.isSmall ? 'smallLevelCard' : ''}`}>
				<div className='levelCardNumber'>
					<div className='levelNumber'>All Levels</div>
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
					</div>
				</div>
				<div className='levelCardStats'>
					<div className='levelStrengthStat levelStatRow'>
						<div className='levelCardStatLabel'>STR:</div>
						<div>{props.level.strength}</div>
						<LevelStatChange stat={props.levelChangeData.strengthDif} />
					</div>
					<div className='levelMagicStat levelStatRow'>
						<div className='levelCardStatLabel'>MAG:</div>
						<div>{props.level.magic}</div>
						<LevelStatChange stat={props.levelChangeData.magicDif} />
					</div>
					<div className='levelDefenseStat levelStatRow'>
						<div className='levelCardStatLabel'>DEF:</div>
						<div>{props.level.defense}</div>
						<LevelStatChange stat={props.levelChangeData.defenseDif} />
					</div>
				</div>
				<div className='levelCardBigStats'>
					<div className='levelStandardAP levelBigStatRow'>
						<div className='levelCardStatLabel'>Standard AP:</div>
						<div>{props.level.standardAP}</div>
						<LevelStatChange stat={props.levelChangeData.standardAPDif} />
					</div>
					<div className='levelCriticalAP levelBigStatRow'>
						<div className='levelCardStatLabel'>Critical AP:</div>
						<div>{props.level.criticalAP()}</div>
						<LevelStatChange stat={props.levelChangeData.criticalAPDif} />
					</div>
					<div className='levelNextEXP levelBigStatRow'>
						<div className='levelCardStatLabel'>Next Level:</div>
						<div>{props.level.replacementEXP}</div>
						<LevelEXPChange exp={props.level.level !== 99 ? props.levelChangeData.expDif : 0} />
					</div>
				</div>
			</div>
		)
}

export default LevelCard