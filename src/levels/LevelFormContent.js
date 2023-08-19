import React, { useState } from 'react'

import { Button } from 'react-bootstrap'

import Icon from '../Components/Icon'

import LevelStatName from './util/LevelStatName'

import RewardSelectorButton from '../rewards/RewardSelectorButton'

function LevelFormContent(props) {
    const [currentFieldData, setCurrentFieldData] = useState({
        sword: { ...props.level.replacementSwordReward },
        shield: { ...props.level.replacementShieldReward },
        staff: { ...props.level.replacementStaffReward },
        standardAP: props.level.standardAP - props.prevLevel.standardAP,
        criticalAP: props.level.criticalAP() - props.prevLevel.criticalAP(),
        defense: props.level.defense - props.prevLevel.defense,
        magic: props.level.magic - props.prevLevel.magic,
        strength: props.level.strength - props.prevLevel.strength,
        replacementEXP: props.level.replacementEXP
    })

    function createLevelRewardFormRow(dreamWeapon, replacementReward) {
        let dreamLabel = dreamWeapon.charAt(0).toUpperCase() + dreamWeapon.slice(1)
        function setCurrentReward(newValue) { setCurrentFieldData({ ...currentFieldData, [dreamWeapon]: newValue }) }
        return (
            <>
                <div><Icon fileName={dreamWeapon} type={'row'}>{`${dreamLabel}: `}</Icon></div>
                <div><Icon fileName={replacementReward.iconType} type={'card'}>{replacementReward.reward}</Icon></div>
                <RewardSelectorButton onReplace={(replacementReward) => setCurrentReward(replacementReward)} />
            </>
        )
    }

    function setCurrentStat(newValue, statName) { setCurrentFieldData({ ...currentFieldData, [statName]: newValue }) }
    
    function createLevelStatFormRow(statName, statLabel) {
        let prevLevelStat = props.prevLevel[statName]
        let statChange = currentFieldData[statName]
        let levelStat = props.prevLevel[statName] + currentFieldData[statName]

        return (
            <>
                <LevelStatName statName={statLabel} />
                <div>{prevLevelStat}</div>
                <input
                    name={'level' + statLabel}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={isNaN(statChange) ? '' : statChange}
                    onChange={(e) => setCurrentStat(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))), statName)}
                    min={-1 * prevLevelStat}
                    max={255 - prevLevelStat}
                />
                <div>{isNaN(currentFieldData[statName]) ? prevLevelStat : levelStat}</div>
            </>
        )
    }

    function createLevelEXPFormRow(statName, statLabel) {
        let levelStat = currentFieldData[statName]

        return (
            <>
                <LevelStatName statName={statLabel} />
                <div />
                <input
                    name={'level' + statLabel}
                    className='levelInputField three-digit-input'
                    disabled={props.level.level === 1 ? true : false}
                    type='number'
                    value={isNaN(levelStat) ? '' : levelStat}
                    onChange={(e) => setCurrentStat(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))), statName)}
                    min='0'
                    max='0xFFFFFFFF'
                />
                <div />
            </>
        )
    }

    return (
        <div className='levelCardContent'>
            <div className='levelFormStats'>
                <div></div>
                <div className='levelLVGroup'>
                    <div className='levelLV'>LV.</div>
                    <div className='levelLVNumber'>{props.prevLevel.level}</div>
                </div>
                <div></div>
                <div className='levelLVGroup'>
                    <div className='levelLV'>LV.</div>
                    <div className='levelLVNumber'>{props.level.level}</div>
                </div>
                {createLevelStatFormRow('strength', 'Strength')}
                {createLevelStatFormRow('magic', 'Magic')}
                {createLevelStatFormRow('defense', 'Defense')}
                {createLevelStatFormRow('standardAP', 'Standard AP')}
            </div>
            <hr />
            <div className='levelFormStats'>
                {createLevelEXPFormRow('replacementEXP', 'Experience')}
            </div>
            <hr />
            <div className='levelFormReward'>
                {createLevelRewardFormRow('sword', currentFieldData.sword)}
                {createLevelRewardFormRow('shield', currentFieldData.shield)}
                {createLevelRewardFormRow('staff', currentFieldData.staff)}
            </div>
            <hr />
            <div className='levelReplaceButtonGroup'>
                <Button variant='secondary' onClick={() => props.handleVanilla(props.level)}>
                    VANILLA
                </Button>
                <Button onClick={() => props.handleReplace(props.level, currentFieldData)}>
                    CONFIRM
                </Button>
            </div>
        </div>
    )
}

export default LevelFormContent