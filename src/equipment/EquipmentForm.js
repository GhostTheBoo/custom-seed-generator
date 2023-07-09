import React, { useState, useEffect } from 'react'
import { Button, CloseButton } from 'react-bootstrap'
import { motion } from 'framer-motion'

import RewardSelectorButton from '../rewards/RewardSelectorButton'
import Icon from '../Components/Icon'
import './EquipmentFormStyles.css'

function EquipmentForm(props) {
    const [currentFieldData, setCurrentFieldData] = useState({
        ability: { ...props.equipment.replacementAbility },
        currentAP: props.equipment.ap,
        currentStrength: props.equipment.strength,
        currentMagic: props.equipment.magic,
        currentDefense: props.equipment.defense,
        currentFire: props.equipment.fire,
        currentBlizzard: props.equipment.blizzard,
        currentThunder: props.equipment.thunder,
        currentDark: props.equipment.dark,
        currentPhysical: props.equipment.physical,
        currentLight: props.equipment.light,
        currentUniversal: props.equipment.universal
    })

    useEffect(() => {
        setCurrentFieldData({
            ability: { ...props.equipment.replacementAbility },
            currentAP: props.equipment.ap,
            currentStrength: props.equipment.strength,
            currentMagic: props.equipment.magic,
            currentDefense: props.equipment.defense,
            currentFire: props.equipment.fire,
            currentBlizzard: props.equipment.blizzard,
            currentThunder: props.equipment.thunder,
            currentDark: props.equipment.dark,
            currentPhysical: props.equipment.physical,
            currentLight: props.equipment.light,
            currentUniversal: props.equipment.universal
        })
    }, [props.equipment, props.isEditing])

    let equipmentImage = './images/equipmentImages/' + props.currentFolderName + '/' + props.equipment.baseAddress.toString(16).toUpperCase() + '.png'

    function createEquipmentStatFormRow(statName, fileName, statLabel, isRes) {
        let statValue = currentFieldData[statName]
        let min = 0
        let max = 255
        if (isRes) {
            min = -100
            max = 150
        }
        function setCurrentStat(newValue, statName) { setCurrentFieldData({ ...currentFieldData, [statName]: newValue }) }
        return (
            <>
                <Icon fileName={fileName} type={'form'} />
                <span className='equipmentStatName'>{statLabel}</span>
                {!props.isEditing
                    ? <span className='equipmentStatValue'>{isRes ? statValue + '%' : statValue}</span>
                    : <input
                        name={'equipment' + statLabel}
                        className='equipmentInputField three-digit-input'
                        type='number'
                        value={isNaN(statValue) ? '' : statValue}
                        onChange={(e) => setCurrentStat(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))), statName)}
                        min={min}
                        max={max}
                    />
                }
            </>
        )
    }

    return (
        <>
            <div className='equipmentFormImageColumn'>
                <div className='equipmentFormCardHeader'>
                    {!props.isEditing
                        ? <CloseButton className='close' onClick={() => props.closeFormCard(-1)} />
                        : <Button variant='info'
                            onClick={() => props.setIsEditing(false)}
                        >
                            CANCEL
                        </Button>
                    }
                </div>
                <h1 className='equipmentFormName'>{props.equipment.name.toUpperCase()}</h1>
                <motion.img
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', duration: .5, delay: .1 }}
                    className='equipmentFormImage'
                    key={equipmentImage}
                    src={equipmentImage}
                    alt={props.equipment.name + ' Form'}
                />
            </div>
            <div className='equipmentFormAbility'>
                <Icon fileName={currentFieldData.ability.iconType} type={'card'}>{currentFieldData.ability.reward}</Icon>
            </div>
            {!props.isEditing
                ? <></>
                : <RewardSelectorButton
                    onReplace={(newReward) => setCurrentFieldData({ ...currentFieldData, ability: { ...newReward } })}
                />
            }
            <hr />
            <div className='equipmentStats'>
                {createEquipmentStatFormRow('currentAP', 'tent', 'AP', false)}
                {createEquipmentStatFormRow('currentStrength', 'keyblade', 'Strength', false)}
                {createEquipmentStatFormRow('currentMagic', 'spell', 'Magic', false)}
                {createEquipmentStatFormRow('currentDefense', 'armor', 'Defense', false)}
            </div>
            <hr />
            <div className='equipmentStats'>
                {createEquipmentStatFormRow('currentFire', 'fire', 'Fire', true)}
                {createEquipmentStatFormRow('currentBlizzard', 'blizzard', 'Blizzard', true)}
                {createEquipmentStatFormRow('currentThunder', 'thunder', 'Thunder', true)}
                {createEquipmentStatFormRow('currentDark', 'critical', 'Dark', true)}
            </div>
            <hr />
            <div className='equipmentStats'>
                {createEquipmentStatFormRow('currentPhysical', 'shield', 'Physical', true)}
                {createEquipmentStatFormRow('currentLight', 'shield', 'Light', true)}
                {createEquipmentStatFormRow('currentUniversal', 'shield', 'Universal', true)}
            </div>
            {!props.isEditing
                ? <></>
                : <>
                    <hr />
                    <div className='equipmentReplaceButtonGroup'>
                        <Button
                            variant='secondary'
                            onClick={() => props.handleVanilla(props.equipment)}
                        >
                            VANILLA
                        </Button>
                        <Button onClick={() => props.handleReplace(props.equipment, currentFieldData)}>
                            CONFIRM
                        </Button>
                    </div>
                </>
            }
        </>
    )
}

export default EquipmentForm