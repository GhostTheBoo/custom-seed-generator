import React from 'react'

import Icon from '../Components/Icon'

import LevelStatChange from './util/LevelStatChange'
import GenericStatValue from '../Components/GenericStatValue'
import LevelStatName from './util/LevelStatName'

function LevelCardContent(props) {
    let isRewardLevelUp = props.level.replacementSwordReward.index + props.level.replacementShieldReward.index + props.level.replacementStaffReward.index > 0
    function createReward(replacementReward, dreamWeapon) {
        let dreamLabel = dreamWeapon.charAt(0).toUpperCase() + dreamWeapon.slice(1)
        return (
            <div className={`${dreamWeapon}LevelReward levelRewardRow`}>
                <div><Icon fileName={dreamWeapon} type={'row'}>{`${dreamLabel}: `}</Icon></div>
                <div><Icon fileName={replacementReward.iconType} type={'card'}>{replacementReward.reward}</Icon></div>
            </div>
        )
    }
    let levelCardRewards = isRewardLevelUp
        ? <>
            <hr />
            <div className='levelCardRewards'>
                {createReward(props.level.replacementSwordReward, 'sword')}
                {createReward(props.level.replacementShieldReward, 'shield')}
                {createReward(props.level.replacementStaffReward, 'staff')}
            </div>
        </>
        : <></>

    function createStat(level, prevLevel, statName) {
        let levelDif = level - prevLevel
        return (
            <div className={`levelStatRow ${statName.toLowerCase().replace(/\s/g, '')}`}>
                <LevelStatName statName={statName} />
                {levelDif === 0 ? <div /> : <LevelStatChange stat={levelDif} />}
                <GenericStatValue stat={level} statName={statName} />
            </div>
        )
    }
    function createAPRow() {
        let dif = props.level.standardAP - props.prevLevel.standardAP
        let critDif = props.level.criticalAP() - props.prevLevel.criticalAP()
        return (
            <div className='levelStatRow ap'>
                <LevelStatName statName='Standard [Critical] AP' />
                {dif === 0
                    ? <div />
                    : <LevelStatChange stat={dif}>
                        {critDif}
                    </LevelStatChange>
                }
                <GenericStatValue stat={props.level.standardAP} statName='ap'>
                    {` [${props.level.criticalAP()}]`}
                </GenericStatValue>
            </div>
        )
    }
    let levelCardStats = (
        <div className='levelCardStats'>
            {createStat(props.level.strength, props.prevLevel.strength, 'Strength')}
            {createStat(props.level.magic, props.prevLevel.magic, 'Magic')}
            {createStat(props.level.defense, props.prevLevel.defense, 'Defense')}
            {createAPRow()}
        </div>
    )

    return (
        <div className='levelCardContent'>
            {levelCardStats}
            <hr />
            <div className='exp levelStatRow'>
                <LevelStatName statName='EXP' />
                <div />
                <span className={'expChange'}>{props.level.replacementEXP}</span>
            </div>
            {levelCardRewards}
        </div>
    )
}

export default LevelCardContent