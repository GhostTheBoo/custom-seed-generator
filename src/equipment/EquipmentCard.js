import { React } from 'react'
import { Container, Button } from 'react-bootstrap'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function EquipmentCard(props) {
    let equipmentImage = './images/equipmentImages/' + props.currentFolderName + '/' + props.equipment.baseAddress.toString(16).toUpperCase() + '.png'

    let equipmentStatList = []
    let equipmentElementalResList = []
    let equipmentOtherResList = []

    function createStatRow(stat, label, rowType) {
        let suffix = label.slice(-3) === 'Res' ? '%' : ''
        let className = rowType ? 'equipmentStatRow' : 'equipmentEmptyRow'
        return (
            <div key={props.equipment.baseAddress + label.toLowerCase()} className={className + (!props.isWide ? ' equipmentSquishRow' : '')}>
                <div>{label}</div>
                <div className='equipmentStatNumber'>{stat + suffix}</div>
            </div>
        )
    }

    equipmentStatList.push(createStatRow(props.equipment.ap, 'AP',
        props.equipment.isAccessory() || props.equipment.ap !== 0
    ))

    equipmentStatList.push(createStatRow(props.equipment.strength, 'Strength',
        props.equipment.isWeapon() || props.equipment.isAccessory() || props.equipment.isAllyWeapon() || props.equipment.strength !== 0
    ))

    equipmentStatList.push(createStatRow(props.equipment.magic, 'Magic',
        props.equipment.isWeapon() || props.equipment.isAccessory() || props.equipment.isAllyWeapon() || props.equipment.magic !== 0
    ))

    equipmentStatList.push(createStatRow(props.equipment.defense, 'Defense',
        props.equipment.isArmor() || props.equipment.defense !== 0
    ))


    equipmentElementalResList.push(createStatRow(props.equipment.fire, 'Fire',
        props.equipment.isArmor() || props.equipment.fire !== 0
    ))
    equipmentElementalResList.push(createStatRow(props.equipment.blizzard, 'Blizzard',
        props.equipment.isArmor() || props.equipment.blizzard !== 0
    ))
    equipmentElementalResList.push(createStatRow(props.equipment.thunder, 'Thunder',
        props.equipment.isArmor() || props.equipment.thunder !== 0
    ))
    equipmentElementalResList.push(createStatRow(props.equipment.dark, 'Dark',
        props.equipment.isArmor() || props.equipment.dark !== 0
    ))


    equipmentOtherResList.push(createStatRow(props.equipment.physical, 'Physical',
        props.equipment.physical !== 0)
    )
    equipmentOtherResList.push(createStatRow(props.equipment.light, 'Light',
        props.equipment.light !== 0
    ))
    equipmentOtherResList.push(createStatRow(props.equipment.universal, 'Universal',
        props.equipment.universal !== 0
    ))

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
        <Container fluid className='equipmentCard'>
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
        </Container>
    )
}

export default EquipmentCard