import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'
import { Multiselect } from 'react-widgets'

import Icon from '../Components/Icon'

import LevelStatName from './util/LevelStatName'
import LevelGraphModal from './util/LevelGraphModal'

import RewardSelectorButton from '../rewards/RewardSelectorButton'
import { EMPTY } from '../rewards/RewardsData'


function AllLevelFormContent(props) {
    const [currentFieldData, setCurrentFieldData] = useState({
        sword: { ...EMPTY },
        shield: { ...EMPTY },
        staff: { ...EMPTY },
        standardAP: 0,
        defense: 0,
        magic: 0,
        strength: 0,
        replacementEXP: 0
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
                <div><Icon fileName={replacementReward.iconType} type={'card'}>{replacementReward.reward}</Icon></div>
                <RewardSelectorButton onReplace={(replacementReward) => setCurrentReward(replacementReward)} isDisabled={!currentEnabledData[dreamWeapon]} />
            </>
        )
    }

    function createLevelStatFormRow(statName, statLabel) {
        let statChange = currentFieldData[statName]
        return (
            <>
                <Form.Check type='checkbox' checked={currentEnabledData[statName]} onChange={() => toggleApplyFlag(statName)} />
                <LevelStatName statName={statLabel} />
                <div>Increase by</div>
                <input
                    name={'level' + statLabel}
                    className='levelInputField three-digit-input'
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
                <div>to Next Level</div>
                <input
                    name={'level' + statLabel}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={isNaN(levelStat) ? '' : levelStat}
                    onChange={(e) => setCurrentStat(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))), statName)}
                    disabled={!currentEnabledData[statName]}
                    min='0'
                    max='0xFFFFFFFF'
                />
                <div />
            </>
        )
    }

    let levelOptions = []
    for (let i = 0; i < 100; i++) { levelOptions.push(i + 1) }

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
                <Button onClick={() => props.handleReplace(appliedLevels, currentFieldData, currentEnabledData)}>
                    CONFIRM
                </Button>
            </div>
        </div>
    )
}

export default AllLevelFormContent