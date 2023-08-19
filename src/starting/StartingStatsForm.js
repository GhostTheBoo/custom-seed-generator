import React, { useState } from 'react'
import './StartingStatusFormStyles.css'

import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'
import { useEffect } from 'react'

function StartingStatsForm(props) {
    const [currentFieldData, setCurrentFieldData] = useState({
        currentHP: props.startingStats.hp,
        currentMP: props.startingStats.mp,
        currentAP: props.startingStats.ap,
        currentArmor: props.startingStats.armorSlots,
        currentAccessory: props.startingStats.accessorySlots,
        currentItem: props.startingStats.itemSlots
    })
    useEffect(() => {
        setCurrentFieldData({
            currentHP: props.startingStats.hp,
            currentMP: props.startingStats.mp,
            currentAP: props.startingStats.ap,
            currentArmor: props.startingStats.armorSlots,
            currentAccessory: props.startingStats.accessorySlots,
            currentItem: props.startingStats.itemSlots
        })
    }, [props.startingStats, props.isEditing])

    function handleUpdate(fieldName, newValue) {
        let newStartingStats = {
            ...currentFieldData,
            [fieldName]: newValue
        }
        props.updateRow(newStartingStats)
        props.updateFocus(-1)
    }

    function createStatRow(statName, statLabel, currentValue, vanillaValue, isSlot) {
        let statValue = currentFieldData[statName]
        let max = isSlot ? 19 : 255
        function setCurrentStat(newValue, statName) { setCurrentFieldData({ ...currentFieldData, [statName]: newValue }) }
        return (
            <>
                <span className='statName'>{statLabel}</span>
                {
                    props.currentFocus === statName
                        ? <input
                            name={`statInput${statName}`}
                            className='statValue statValueInputField'
                            type='number'
                            value={isNaN(statValue) ? '' : statValue}
                            onChange={(e) => setCurrentStat(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))), statName)}
                            autoFocus
                            onBlur={() => handleUpdate(statName, currentFieldData[statName])}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleUpdate(statName, currentFieldData[statName]) }}
                            min='0'
                            max={max}
                            size={4}
                        />
                        : <span
                            className={`statValue ${statValue !== vanillaValue ? ' new' : ''}`}
                            onClick={() => props.updateFocus(statName)}
                        >
                            {statValue}
                        </span>
                }
                <div />
                <img
                    className={`editIcon${currentValue === vanillaValue ? ' isHidden' : ''} btn btn-secondary`}
                    src='./images/extra/undo.svg'
                    alt='vanilla'
                    width='100%'
                    height='auto'
                    onClick={() => handleUpdate(statName, vanillaValue)}
                />
            </>
        )
    }

    let overlayPopover = <EditStatusPopover
        text={'NEW!'}
        message={''}
        type='starting'
    />

    return (
        <div className='startingStuffFormCard'>
            {props.startingStats.isReplaced() ? overlayPopover : <></>}
            <h1 className='startingStuffFormName'>{props.startingStats.getCharacter()}:</h1>
            <hr />
            <div className='startingStuffInputGroup'>
                {createStatRow('currentHP', 'HP', props.startingStats.hp, props.startingStats.vanillaHp, false)}
                {createStatRow('currentMP', 'MP', props.startingStats.mp, props.startingStats.vanillaMp, false)}
                {createStatRow('currentAP', 'AP', props.startingStats.ap, props.startingStats.vanillaAp, false)}
            </div>
            <hr />
            <div className='startingStuffInputGroup'>
                {createStatRow('currentArmor', 'Armor Slots', props.startingStats.armorSlots, props.startingStats.vanillaArmorSlots, true)}
                {createStatRow('currentAccessory', 'Accessory Slots', props.startingStats.accessorySlots, props.startingStats.vanillaAccessorySlots, true)}
                {createStatRow('currentItem', 'Item Slots', props.startingStats.itemSlots, props.startingStats.vanillaItemSlots, true)}
            </div>
            {/* <hr />
            <div className='startingStuffReplaceButtonGroup'>
                <Button
                    variant='secondary'
                    onClick={() => props.handleVanilla()}
                >
                    VANILLA
                </Button>
            </div> */}
        </div>
    )
}

export default StartingStatsForm