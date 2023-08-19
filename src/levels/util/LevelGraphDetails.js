import React from 'react'

import Icon from '../../Components/Icon'

import GenericStatValue from '../../Components/GenericStatValue'
import LevelStatName from './LevelStatName'

function LevelGraphDetails(props) {
    function createReward(replacementReward, dreamWeapon) {
        return (
            <div className={`${dreamWeapon}LevelReward levelRewardRow`}>
                <div><Icon fileName={dreamWeapon} type={'row'}>: </Icon></div>
                <div><Icon fileName={replacementReward.iconType} type={'card'}>{replacementReward.reward}</Icon></div>
            </div>
        )
    }

    function createStat(level, statName) {
        return (
            <>
                <LevelStatName
                    className='statLabel'
                    statName={statName}
                />
                <GenericStatValue
                    className='statValue'
                    stat={level}
                    statName={statName}
                />
            </>
        )
    }
    function createAPRow() {
        return (
            <>
                <LevelStatName
                    className='statLabel'
                    statName='AP'
                />
                <GenericStatValue
                    className='statValue'
                    stat={props.level.standardAP}
                    statName='ap'
                >
                    {` [${props.level.criticalAP()}]`}
                </GenericStatValue>
            </>
        )
    }

    return (
        <>
            <div className='levelLVGraphGroup'>
                <>
                    <div className='levelLVGraph'>LV.</div>
                    <div className='levelLVGraphNumber'>{props.level.level}</div>
                </>
            </div>
            <div className='levelGraphDetails'>
                {createStat(props.level.strength, 'STR')}
                {createStat(props.level.magic, 'MAG')}
                {createStat(props.level.defense, 'DEF')}
                {createAPRow()}
                <LevelStatName
                    className='statLabel'
                    statName='EXP'
                />
                <span className={'statValue expChange'}>{props.level.replacementEXP}</span>
                <div />
                {createReward(props.level.replacementSwordReward, 'sword')}
                {createReward(props.level.replacementShieldReward, 'shield')}
                {createReward(props.level.replacementStaffReward, 'staff')}
            </div>
        </>
    )
}

export default LevelGraphDetails