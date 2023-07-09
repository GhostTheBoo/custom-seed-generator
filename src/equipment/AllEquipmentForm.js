import React, { useState } from 'react'
import { Form, Button, CloseButton } from 'react-bootstrap'
import { motion } from 'framer-motion'

import RewardSelectorButton from '../rewards/RewardSelectorButton'
import { EMPTY } from '../rewards/RewardsData'
import Icon from '../Components/Icon'

function AllEquipmentForm(props) {
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

    function getFullEquipmentTypeText(equipmentType) {
        if (equipmentType === 'acc') return 'Accessories'
        if (equipmentType === 'alw') return 'Ally Weapons'
        if (equipmentType === 'arm') return 'Armor'
        if (equipmentType === 'dst') return 'Donald Staves'
        if (equipmentType === 'gsh') return 'Goofy Shields'
        if (equipmentType === 'key') return 'Keyblades'
    }

    function createEquipmentStatFormRow(statName, fileName, statLabel, isRes, modifyFlag) {
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
                {!props.isEditing
                    ? <></>
                    : <Form.Check type='checkbox' checked={currentEnabledData[modifyFlag]} onChange={() => toggleApplyFlag(modifyFlag)} />
                }
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
                        disabled={!currentEnabledData[modifyFlag]}
                        min={min}
                        max={max}
                    />
                }
            </>
        )
    }

    function toggleApplyFlag(statName) {
        let prevValue = currentEnabledData[statName]
        setCurrentEnabledData({ ...currentEnabledData, [statName]: !prevValue })
    }

    let equipmentImage = './images/equipmentImages/' + props.currentFolderName + '/' + props.currentFolderName + '.png'


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
                <h1 className='equipmentFormName'>ALL {getFullEquipmentTypeText(props.currentFolderName).toUpperCase()}:</h1>
                <motion.img
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', duration: .5, delay: .1 }}
                    layout
                    key={equipmentImage}
                    className='equipmentFormImage'
                    src={equipmentImage}
                    alt='All Equipment Form'
                />
            </div>
            <div className='equipmentFormAbility'>
                {!props.isEditing
                    ? <></>
                    : <Form.Check type='checkbox' checked={currentEnabledData.modifyAbility} onChange={() => toggleApplyFlag('modifyAbility')} />
                }
                <div><Icon fileName={currentFieldData.ability.iconType} type={'card'}>{currentFieldData.ability.reward}</Icon></div>
                {!props.isEditing
                    ? <></>
                    : <RewardSelectorButton
                        onReplace={(newReward) => setCurrentFieldData({ ...currentFieldData, ability: newReward })}
                        isDisabled={!currentEnabledData.modifyReward}
                    />
                }
            </div>
            <hr />
            <div className='equipmentStats'>
                {createEquipmentStatFormRow('currentAP', 'tent', 'AP', false, 'modifyAP')}
                {createEquipmentStatFormRow('currentStrength', 'keyblade', 'Strength', false, 'modifyStrength')}
                {createEquipmentStatFormRow('currentMagic', 'spell', 'Magic', false, 'modifyMagic')}
                {createEquipmentStatFormRow('currentDefense', 'armor', 'Defense', false, 'modifyDefense')}
            </div>
            <hr />
            <div className='equipmentStats'>
                {createEquipmentStatFormRow('currentFire', 'fire', 'Fire', true, 'modifyFire')}
                {createEquipmentStatFormRow('currentBlizzard', 'blizzard', 'Blizzard', true, 'modifyBlizzard')}
                {createEquipmentStatFormRow('currentThunder', 'thunder', 'Thunder', true, 'modifyThunder')}
                {createEquipmentStatFormRow('currentDark', 'critical', 'Dark', true, 'modifyDark')}
            </div>
            <hr />
            <div className='equipmentStats'>
                {createEquipmentStatFormRow('currentPhysical', 'shield', 'Physical', true, 'modifyPhysical')}
                {createEquipmentStatFormRow('currentLight', 'shield', 'Light', true, 'modifyLight')}
                {createEquipmentStatFormRow('currentUniversal', 'shield', 'Universal', true, 'modifyUniversal')}
            </div>
            {!props.isEditing
                ? <></>
                : <>
                    <hr />
                    <div className='formReplaceButtonGroup'>
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
                </>
            }
        </>
    )
}

export default AllEquipmentForm