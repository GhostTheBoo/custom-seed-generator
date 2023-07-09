import React from 'react'
import { Button } from 'react-bootstrap'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function EquipmentCard(props) {
    function createStatRow(fileName, label, stat, shouldDisplay) {
        let isRes = label.slice(-3) === 'Res' ? '%' : ''
        return (
            <Icon
                key={`${props.equipment.name}${label}`}
                fileName={fileName}
                type={'row'}
                className={`equipmentStatIcon${isRes ? ' resistance' : ''}${!shouldDisplay && stat === 0 ? ' invis' : ''}`}
            >
                {stat}
            </Icon>
        )
    }

    function handleMouseEnter() {
        if (props.isFormOpen && !props.isEditing) props.setCurrentEquipment(props.id)
    }

    function handleEditOnClick() {
        props.setCurrentEquipment(props.id)
        props.setIsEditing(true)
    }

    let overlayPopover = <EditStatusPopover
        text={!props.equipment.isValidEquipment() ? 'WARNING!' : 'NEW!'}
        message={!props.equipment.isValidEquipment() ? 'Equipment can only draw 5 stats on screen' : ''}
        type='equipment'
    />

    let currentState = ''
    if (props.isSelected)
        currentState = props.isEditing ? 'selected' : 'hovered'

    let fileNameList = [
        'keyblade',
        'donald',
        'goofy',
        'ally',
        'armor',
        'accessory'
    ]

    return (
        <div
            className={`equipmentCard ${currentState}`}
            onMouseEnter={handleMouseEnter}
        >
            {props.equipment.isReplaced() ? overlayPopover : <></>}
            <Icon
                fileName={fileNameList[props.equipment.equipmentType]}
                type={'form'}
                className={'equipmentTypeIcon'}
            >
                {props.equipment.name}
            </Icon>
            <div className='equipmentCardDetails'>
                <Icon
                    fileName={props.equipment.replacementAbility.iconType}
                    type={'form'}
                    className={'equipmentAbilityIcon'}
                >
                    {props.equipment.replacementAbility.reward}
                </Icon>
            </div>
            <div className='equipmentCardStats'>
                {createStatRow('tent', 'AP', props.equipment.ap, props.equipment.isAccessory())}
                {createStatRow('keyblade', 'Strength', props.equipment.strength, props.equipment.isWeapon() || props.equipment.isAllyWeapon() || props.equipment.isAccessory())}
                {createStatRow('spell', 'Magic', props.equipment.magic, props.equipment.isWeapon() || props.equipment.isAllyWeapon() || props.equipment.isAccessory())}
                {createStatRow('armor', 'Defense', props.equipment.defense, props.equipment.isArmor())}
                {createStatRow('fire', 'Fire Res', props.equipment.fire, props.equipment.isArmor())}
                {createStatRow('blizzard', 'Blizzard Res', props.equipment.blizzard, props.equipment.isArmor())}
                {createStatRow('thunder', 'Thunder Res', props.equipment.thunder, props.equipment.isArmor())}
                {createStatRow('critical', 'Dark Res', props.equipment.dark, props.equipment.isArmor())}
            </div>
            <Button variant='outline-info' onClick={handleEditOnClick} disabled={currentState === 'selected'}>
                {currentState !== 'selected' ? 'EDIT' : 'EDITING...'}
            </Button>
        </div>
    )
}

export default EquipmentCard