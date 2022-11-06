import { React } from 'react'
import { Button } from 'react-bootstrap'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function EquipmentCard(props) {
    let equipmentImage = './images/equipmentImages/' + props.currentFolderName + '/' + props.equipment.baseAddress.toString(16).toUpperCase() + '.png'

    let equipmentStatList = []
    let equipmentElementalResList = []
    let equipmentOtherResList = []

    function createStatRow(label, stat) {
        let suffix = label.slice(-3) === 'Res' ? '%' : ''
        let className = props.equipment.shouldShowStat(label, stat) ? 'equipmentStatRow' : 'equipmentEmptyRow'
        return (
            <div key={props.equipment.baseAddress + label.toLowerCase()} className={className + (!props.isWide ? ' equipmentSquishRow' : '')}>
                <div>{label}</div>
                <div className='equipmentStatNumber'>{stat + suffix}</div>
            </div>
        )
    }

    equipmentStatList.push(createStatRow('AP', props.equipment.ap))
    equipmentStatList.push(createStatRow('Strength', props.equipment.strength))
    equipmentStatList.push(createStatRow('Magic', props.equipment.magic))
    equipmentStatList.push(createStatRow('Defense', props.equipment.defense))

    equipmentElementalResList.push(createStatRow('Fire', props.equipment.fire))
    equipmentElementalResList.push(createStatRow('Blizzard', props.equipment.blizzard))
    equipmentElementalResList.push(createStatRow('Thunder', props.equipment.thunder))
    equipmentElementalResList.push(createStatRow('Dark', props.equipment.dark))

    equipmentOtherResList.push(createStatRow('Physical', props.equipment.physical))
    equipmentOtherResList.push(createStatRow('Light', props.equipment.light))
    equipmentOtherResList.push(createStatRow('Universal', props.equipment.universal))

    let rewardClassName = props.equipment.isWeapon() || props.equipment.replacementAbility.index !== 0
        ? 'equipmentStatRow'
        : 'equipmentEmptyRow'

    equipmentOtherResList.push(
        <div
            key={props.equipment.baseAddress + ''}
            className={rewardClassName + ' equipmentReward' + (!props.isWide ? ' equipmentSquishRow' : '')}
        >
            <div>Ability</div>
            <div>
                <Icon
                    fileName={props.equipment.replacementAbility.iconType}
                    type={'form'}
                    className={'equipmentAbilityIcon'}
                >
                    {props.equipment.replacementAbility.reward}
                </Icon>
            </div>
        </div>
    )

    let overlayPopover = <EditStatusPopover
        text={!props.equipment.isValidEquipment() ? 'WARNING!' : 'NEW!'}
        message={!props.equipment.isValidEquipment() ? 'Equipment can only draw 5 stats on screen' : ''}
        type='equipment'
    />

    return (
        <div className='equipmentCard'>
            {props.equipment.isReplaced() ? overlayPopover : <></>}
            <div className={'equipmentColumn equipmentImageColumn' + (!props.isWide ? ' equipmentSquishColumn' : '')}>
                <img
                    className={'equipmentImage' + (!props.isWide ? ' equipmentSquishImage' : '')}
                    src={equipmentImage}
                    alt={props.equipment.name + ' image'}
                />
                <div className={'equipmentName' + (!props.isWide ? ' equipmentSquishName' : '')}>{props.equipment.name}</div>
                <div className='equipmentEditButton'>
                    <Button
                        variant='primary'
                        block
                        id={props.id}
                        disabled={props.isEditing}
                        onClick={() => props.setCurrentEquipment(props.id)}
                    >
                        {props.isEditing ? 'EDITING...' : 'EDIT'}
                    </Button>
                </div>
            </div>
            <div className='equipmentColumn equipmentStatColumn'>{equipmentStatList}</div>
            <div className='equipmentColumn equipmentResColumn'>{equipmentElementalResList}</div>
            <div className='equipmentColumn equipmentOtherColumn'>{equipmentOtherResList}</div>
        </div>
    )
}

export default EquipmentCard