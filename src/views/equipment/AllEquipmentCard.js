import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import RewardSelectorButton from '../rewards/RewardSelectorButton'
import { EMPTY } from '../../data/rewardsData'
import Icon from '../generic/Icon'

function AllEquipmentCard(props) {
    const [currentFieldData, setCurrentFieldData] = useState({
        ability: { ...EMPTY },
        currentAP: 0,
        currentStrength: 0,
        currentMagic: 0,
        currentDefense: 0,
        currentFire: 0,
        currentBlizzard: 0,
        currentThunder: 0,
        currentDark: 0,
        currentPhysical: 0,
        currentLight: 0,
        currentUniversal: 0
    })
    const [currentEnabledData, setCurrentEnabledData] = useState({
        modifyAbility: false,
        modifyAP: false,
        modifyStrength: false,
        modifyMagic: false,
        modifyDefense: false,
        modifyFire: false,
        modifyBlizzard: false,
        modifyThunder: false,
        modifyDark: false,
        modifyPhysical: false,
        modifyLight: false,
        modifyUniversal: false
    })

    let currentCardState = props.isSelected ? ' hovered' : ''

    function handleMouseEnter() {
        if (!props.isSelected) {
            props.setCurrentEquipment(props.id)
            props.updateFocus('')
        }
    }

    function handleFocusChange() {
        props.handleReplace(props.equipment, currentFieldData)
        props.updateFocus('')
    }

    function isRes(fieldName) {
        switch (fieldName) {
            case 'Fire':
            case 'Blizzard':
            case 'Thunder':
            case 'Dark':
            case 'Physical':
            case 'Light':
            case 'Universal':
                return true;
            default:
                return false;
        }
    }

    function createEquipmentStatFormRow(fileName, fieldName) {
        let className = `equipmentCardStat${currentEnabledData['modify' + fieldName] ? '' : ' opaque'}`
        let percentClassName = currentEnabledData['modify' + fieldName] && props.currentFocus === fieldName ? ' invis' : ''
        let min = 0
        let max = 255
        if (isRes(fieldName)) {
            min = -100
            max = 150
        }

        function setCurrentStat(newValue) {
            let newStat = Math.max(min, Math.min(max, Number(parseInt(newValue))))
            setCurrentFieldData({ ...currentFieldData, ['current' + fieldName]: newStat })
        }

        return (
            <div className='allEquipmentStatRow'>
                <Form.Check type='checkbox' checked={currentEnabledData['modify' + fieldName]} onChange={() => toggleApplyFlag(fieldName)} />
                <Icon className={className} fileName={fileName} type={'form'} />
                <span className={`equipmentStatName${' ' + className}`}>{fieldName}</span>
                {
                    currentEnabledData['modify' + fieldName] && props.currentFocus === fieldName
                        ? <input
                            name={'equipment' + fieldName}
                            className={`specificEquipmentValue equipmentValueInputField`}
                            type='number'
                            value={isNaN(currentFieldData['current' + fieldName]) ? '' : currentFieldData['current' + fieldName]}
                            onChange={(e) => setCurrentStat(e.target.value)}
                            autoFocus
                            onBlur={() => handleFocusChange()}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleFocusChange() }}
                            min={min}
                            max={max}
                        />
                        : <span
                            className={`specificEquipmentValue${' ' + className}${currentEnabledData['modify' + fieldName] ? ' editable' : ''}`}
                            onClick={() => props.updateFocus(fieldName)}
                        >
                            {isNaN(currentFieldData['current' + fieldName]) ? '' : currentFieldData['current' + fieldName]}
                        </span>
                }
                <span
                    className={`specificEquipmentPercent${' ' + className}${' ' + percentClassName}`}
                >
                    {isRes(fieldName) ? '%' : ''}
                </span>
            </div>
        )
    }

    function toggleApplyFlag(fieldName) {
        let prevValue = currentEnabledData['modify' + fieldName]
        setCurrentEnabledData({ ...currentEnabledData, ['modify' + fieldName]: !prevValue })
    }

    return (
        <div
            className={`allEquipmentCard${currentCardState}`}
            onMouseEnter={handleMouseEnter}
        >
            <div className='equipmentStats'>
                {createEquipmentStatFormRow('tent', 'AP')}
                {createEquipmentStatFormRow('keyblade', 'Strength')}
                {createEquipmentStatFormRow('spell', 'Magic')}
                {createEquipmentStatFormRow('armor', 'Defense')}
            </div>
            <div className='equipmentStats'>
                {createEquipmentStatFormRow('fire', 'Fire')}
                {createEquipmentStatFormRow('blizzard', 'Blizzard')}
                {createEquipmentStatFormRow('thunder', 'Thunder')}
                {createEquipmentStatFormRow('critical', 'Dark')}
            </div>
            <div className='equipmentStats'>
                {createEquipmentStatFormRow('sword', 'Physical')}
                {createEquipmentStatFormRow('finalD', 'Light')}
                {createEquipmentStatFormRow('shield', 'Universal')}
                <div className='allEquipmentFormAbility'>
                    <Form.Check type='checkbox' checked={currentEnabledData.modifyAbility} onChange={() => toggleApplyFlag('Ability')} />
                    <RewardSelectorButton
                        className='equipmentFormAbility'
                        onReplace={(newReward) => setCurrentFieldData({ ...currentFieldData, ability: newReward })}
                        isDisabled={!currentEnabledData.modifyAbility}
                    >
                        <Icon fileName={currentFieldData.ability.iconType} type={'card'}>{currentFieldData.ability.reward}</Icon>
                    </RewardSelectorButton>
                </div>
            </div>
            <div className='allEquipmentReplaceButtonGroup'>
                <Button
                    variant='secondary'
                    onClick={() => props.handleVanilla(currentEnabledData)}
                >
                    VANILLA
                </Button>
                <Button onClick={() => props.handleReplace(currentFieldData, currentEnabledData)}>
                    CONFIRM
                </Button>
            </div>
        </div>
    )
}

export default AllEquipmentCard