import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'
import { Multiselect } from 'react-widgets'

import Icon from '../generic/Icon'

import LevelStatName from './LevelStatName'
import LevelGraphModal from './LevelGraphModal'

import RewardSelectorButton from '../rewards/RewardSelectorButton'
import { EMPTY } from '../../data/rewardsData'

import GSelect from '../generic/GSelect'


function AllLevelFormContent(props) {
    const [currentFieldData, setCurrentFieldData] = useState({
        sword: { ...EMPTY },
        shield: { ...EMPTY },
        staff: { ...EMPTY },
        standardAP: 0,
        defense: 0,
        magic: 0,
        strength: 0,
        replacementEXP: 0,
        currentEXPMultiplierValue: 0
    })
    const [currentEnabledData, setCurrentEnabledData] = useState({
        sword: false,
        shield: false,
        staff: false,
        standardAP: false,
        defense: false,
        magic: false,
        strength: false,
        replacementEXP: false
    })
    const [appliedLevels, setAppliedLevels] = useState([])
    const [showLevelGraph, setShowLevelGraph] = useState(false)
    const [expModifyMethod, setExpModifyMethod] = useState(0)

    let expMultiplierList = []
    for (let i = 1; i <= 10; i++) {
        expMultiplierList.push(`${i / 2}x`)
    }


    function setCurrentStat(newValue, statName) { setCurrentFieldData({ ...currentFieldData, [statName]: newValue }) }
    function toggleApplyFlag(statName) {
        let prevValue = currentEnabledData[statName]
        setCurrentEnabledData({ ...currentEnabledData, [statName]: !prevValue })
    }

    function createLevelRewardFormRow(dreamWeapon, replacementReward) {
        let dreamLabel = dreamWeapon.charAt(0).toUpperCase() + dreamWeapon.slice(1)
        function setCurrentReward(newValue) { setCurrentFieldData({ ...currentFieldData, [dreamWeapon]: newValue }) }
        return (
            <>
                <Form.Check type='checkbox' checked={currentEnabledData[dreamWeapon]} onChange={() => toggleApplyFlag(dreamWeapon)} />
                <div><Icon fileName={dreamWeapon} type={'row'}>{`${dreamLabel}: `}</Icon></div>
                <div className={`${!currentEnabledData[dreamWeapon] ? ' invis' : ''}`}><Icon fileName={replacementReward.iconType} type={'card'}>{replacementReward.reward}</Icon></div>
                <RewardSelectorButton
                    className={`${!currentEnabledData[dreamWeapon] ? ' invis' : ''}`}
                    isDisabled={!currentEnabledData[dreamWeapon]}
                    onReplace={(replacementReward) => setCurrentReward(replacementReward)}
                />
            </>
        )
    }

    function createLevelStatFormRow(statName, statLabel) {
        let statChange = currentFieldData[statName]
        return (
            <>
                <Form.Check type='checkbox' checked={currentEnabledData[statName]} onChange={() => toggleApplyFlag(statName)} />
                <LevelStatName statName={statLabel} />
                <div className={`${!currentEnabledData[statName] ? ' invis' : ''}`}>Increase by</div>
                <input
                    name={'level' + statLabel}
                    className={`levelInputField three-digit-input${!currentEnabledData[statName] ? ' invis' : ''}`}
                    type='number'
                    value={isNaN(statChange) ? '' : statChange}
                    onChange={(e) => setCurrentStat(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))), statName)}
                    disabled={!currentEnabledData[statName]}
                    min={-255}
                    max={255}
                />
            </>
        )
    }

    function createLevelEXPFormRow(statName, statLabel) {
        let levelStat = currentFieldData[statName]
        return (
            <>
                <Form.Check type='checkbox' checked={currentEnabledData[statName]} onChange={() => toggleApplyFlag(statName)} />
                <LevelStatName statName={statLabel} />
                <div className={`allLevelEXPModify${!currentEnabledData[statName] ? ' invis' : ''}`}>Modify Method:</div>
                <Form.Select
                    className={`genericSelect${!currentEnabledData[statName] ? ' invis' : ''}`}
                    value={expModifyMethod}
                    name={'expModifyMethodSelector'}
                    onChange={(e) => setExpModifyMethod(parseInt(e.target.value))}
                >
                    {
                        [
                            <option key={0} value={0}>Multiply Vanilla</option>,
                            <option key={1} value={1}>Custom EXP to Next Level</option>
                        ]
                    }
                </Form.Select>
                {
                    expModifyMethod === 0
                        ? <GSelect
                            class={`expMultiplier${!currentEnabledData[statName] ? ' invis' : ''}`}
                            selector={'EXP Multiplier'}
                            itemList={expMultiplierList}
                            name='expMultiplierSelect'
                            currentItem={currentFieldData.currentEXPMultiplierValue}
                            onChange={(e) => setCurrentFieldData({ ...currentFieldData, currentEXPMultiplierValue: parseInt(e.target.value) })}
                        />
                        : <input
                            name={'level' + statLabel}
                            className={`levelInputField three-digit-input${!currentEnabledData[statName] ? ' invis' : ''}`}
                            type='number'
                            value={isNaN(levelStat) ? '' : levelStat}
                            onChange={(e) => setCurrentStat(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))), statName)}
                            disabled={!currentEnabledData[statName]}
                            min='0'
                            max='0xFFFFFFFF'
                        />
                }
                <div />
            </>
        )
    }

    let levelOptions = []
    for (let i = 0; i < 99; i++) { levelOptions.push(i + 1) }
    levelOptions.push('All')

    return (
        <div className='levelCardContent'>
            <div className='levelFormStats allLevels'>
                {createLevelStatFormRow('strength', 'Strength')}
                {createLevelStatFormRow('magic', 'Magic')}
                {createLevelStatFormRow('defense', 'Defense')}
                {createLevelStatFormRow('standardAP', 'Standard AP')}
            </div>
            <hr />
            <div className='levelFormExp allLevels'>
                {createLevelEXPFormRow('replacementEXP', 'Experience')}
            </div>
            <hr />
            <div className='levelFormReward allLevels'>
                {createLevelRewardFormRow('sword', currentFieldData.sword)}
                {createLevelRewardFormRow('shield', currentFieldData.shield)}
                {createLevelRewardFormRow('staff', currentFieldData.staff)}
            </div>
            <hr />
            <div className='allLevelMultiSelectGroup'>
                <div>Apply changes to Levels...</div>
                <Multiselect
                    className='allLevelMultiSelect'
                    value={appliedLevels}
                    data={levelOptions}
                    onChange={(value) => setAppliedLevels(value.sort((a, b) => { return a - b }))}
                    dropUp
                />
            </div>
            <hr />
            <div className='levelReplaceButtonGroup'>
                <>
                    <Button
                        variant='outline-info'
                        onClick={() => setShowLevelGraph(true)}
                    >
                        View Level Graph
                    </Button>
                    {showLevelGraph
                        ? <LevelGraphModal
                            show={showLevelGraph}
                            setShow={setShowLevelGraph}
                            levelData={props.levelData}
                        />
                        : <></>
                    }
                </>
                <div className='flex-grow-1' />
                <Button onClick={() => props.handleVanilla(appliedLevels, currentEnabledData)} variant='secondary'>
                    VANILLA
                </Button>
                <Button onClick={() => props.handleReplace(appliedLevels, currentFieldData, currentEnabledData, expModifyMethod)}>
                    CONFIRM
                </Button>
            </div>
        </div>
    )
}

export default AllLevelFormContent