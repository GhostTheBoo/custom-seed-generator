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

    function createStatRow(fileName, fieldName) {
        let isOpaque = !props.equipment.shouldShowStat(fieldName) && props.equipment[fieldName.toLowerCase()] === 0
        let className = `equipmentCardStat${isOpaque ? ' opaque' : ''}`
        let percentClassName = props.isSelected && props.currentFocus === fieldName ? ' invis' : ''
        percentClassName += props.equipment[fieldName.toLowerCase()] !== props.equipment['vanilla' + fieldName] ? ' new' : ''
        let min = 0
        let max = 255
        if (isRes(fieldName)) {
            min = -100
            max = 150
        }

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
                    props.isSelected && props.currentFocus === fieldName
                        ? <input
                            name={props.equipment[fieldName.toLowerCase()]}
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
                            className={`specificEquipmentValue editable${' ' + className}${props.equipment[fieldName.toLowerCase()] !== props.equipment['vanilla' + fieldName] ? ' new' : ''}`}
                            onClick={() => props.updateFocus(fieldName)}
                        >
                            {props.equipment[fieldName.toLowerCase()]}
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
                    {createStatRow('tent', 'AP')}
                    {createStatRow('keyblade', 'Strength')}
                    {createStatRow('spell', 'Magic')}
                    {createStatRow('armor', 'Defense')}
                </div>
                <div>
                    {createStatRow('fire', 'Fire')}
                    {createStatRow('blizzard', 'Blizzard')}
                    {createStatRow('thunder', 'Thunder')}
                    {createStatRow('critical', 'Dark')}
                </div>
                <div>
                    {createStatRow('sword', 'Physical')}
                    {createStatRow('finalD', 'Light')}
                    {createStatRow('shield', 'Universal')}
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