import React, { useState, useEffect } from 'react'
import Icon from '../generic/Icon'
import EditStatusPopover from '../generic/EditStatusPopover'

import RewardSelectorButton from '../rewards/RewardSelectorButton'

function EquipmentCard(props) {
    const [currentFieldData, setCurrentFieldData] = useState(props.equipment.defaultFieldData)

    useEffect(() => {
        setCurrentFieldData(props.equipment.defaultFieldData)
    }, [props.equipment])

    let equipmentImage = './images/equipmentImages/' + props.currentFolderName + '/' + props.equipment.zipID + '.png'
    let currentCardState = ''
    if (props.isSelected)
        currentCardState = props.currentFocus !== '' ? ' selected' : ' hovered'

    let overlayPopover = <EditStatusPopover
        text={!props.equipment.isValidEquipment() ? 'WARNING!' : 'NEW!'}
        message={!props.equipment.isValidEquipment() ? 'Equipment can only draw 5 stats on screen' : ''}
        type='equipment'
    />

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

    function createStatRow(fileName, fieldName, min, max) {
        let inFocus = props.isSelected && props.currentFocus === fieldName
        let isEdited = props.equipment[fieldName.toLowerCase()] !== props.equipment['vanilla' + fieldName]
        let isOpaque = !props.equipment.shouldShowStat(fieldName) && props.equipment[fieldName.toLowerCase()] === 0
        let className = `equipmentCardStat${isOpaque ? ' opaque' : ''}`
        let percentClassName = ''

        if (inFocus) percentClassName += ' invis'
        if (isEdited) percentClassName += ' new'

        function setFieldData(newValue) {
            let newStat = Math.max(min, Math.min(max, Number(parseInt(newValue))))
            props.handleReplace(props.equipment, { ...currentFieldData, ['current' + fieldName]: newStat })
        }

        return (
            <div className='statRow'>
                <Icon
                    key={`${props.equipment.name}${fieldName}`}
                    fileName={fileName}
                    type={'row'}
                    className={className}
                >
                    {fieldName}
                </Icon>
                {
                    inFocus
                        ? <input
                            className='specificEquipmentValue equipmentValueInputField'
                            type='number'
                            value={isNaN(currentFieldData['current' + fieldName]) ? '' : currentFieldData['current' + fieldName]}
                            onChange={(e) => setFieldData(e.target.value)}
                            autoFocus
                            onBlur={() => handleFocusChange()}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleFocusChange() }}
                            min={min}
                            max={max}
                            size={4}
                        />
                        : <span
                            className={`specificEquipmentValue editable ${className}${isEdited ? ' new' : ''}`}
                            onClick={() => props.updateFocus(fieldName)}
                        >
                            {props.equipment[fieldName.toLowerCase()]}
                        </span>
                }
                <span
                    className={`specificEquipmentPercent ${className} ${percentClassName}`}
                >
                    {min < 0 && '%'}
                </span>
            </div>
        )
    }

    return (
        <div
            className={`equipmentCard${currentCardState}`}
            onMouseEnter={handleMouseEnter}
        >
            {props.equipment.isReplaced() ? overlayPopover : <></>}
            <div className='equipmentCardImageColumn'>
                <img
                    className='equipmentCardImage'
                    key={equipmentImage}
                    src={equipmentImage}
                    alt={props.equipment.name + ' Card'}
                />
                <div className='equipmentCardName'>
                    <span
                        className={'iconDescription equipmentTypeIcon'}
                        style={{ verticalAlign: 'middle' }}
                    >
                        {props.equipment.name}
                    </span>
                </div>
            </div>
            <div className='equipmentCardStats'>
                <div>
                    {createStatRow('tent', 'AP', 0, 255)}
                    {createStatRow('keyblade', 'Strength', 0, 255)}
                    {createStatRow('spell', 'Magic', 0, 255)}
                    {createStatRow('armor', 'Defense', 0, 255)}
                </div>
                <div>
                    {createStatRow('fire', 'Fire', -100, 150)}
                    {createStatRow('blizzard', 'Blizzard', -100, 150)}
                    {createStatRow('thunder', 'Thunder', -100, 150)}
                    {createStatRow('critical', 'Dark', -100, 150)}
                </div>
                <div>
                    {createStatRow('sword', 'Physical', -100, 150)}
                    {createStatRow('finalD', 'Light', -100, 150)}
                    {createStatRow('shield', 'Universal', -100, 150)}
                    <div>
                        <RewardSelectorButton
                            className='equipmentFormAbility'
                            onReplace={(newReward) => props.handleReplace(props.equipment, { ...currentFieldData, ability: { ...newReward } })}
                        >
                            <Icon fileName={props.equipment.replacementAbility.iconType} type={'card'}>{props.equipment.replacementAbility.reward}</Icon>
                        </RewardSelectorButton>
                    </div>
                </div>
            </div>
            <img
                className={`cardEditIcon${props.equipment.isReplaced() ? '' : ' invis'} btn btn-secondary`}
                src='./images/extra/undo.svg'
                alt='vanilla'
                width='100%'
                height='auto'
                onClick={() => props.handleVanilla(props.equipment)}
            />
        </div>
    )
}

export default EquipmentCard