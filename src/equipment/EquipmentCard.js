import { React } from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function EquipmentCard(props) {
    let equipmentImage = './images/equipmentImages/' + props.currentFolderName + '/' + props.equipment.baseAddress.toString(16).toUpperCase() + '.png'

    let equipmentStatList = []
    let equipmentElementalResList = []
    let equipmentOtherResList = []

    function createStatRow(stat, label, className) {
        let suffix = label.slice(-3) === 'Res' ? '%' : ''
        return (
            <Row key={props.equipment.baseAddress + label.toLowerCase()} className={className + (!props.isWide ? ' equipmentFlexColumn' : '')}>
                <div>{label}</div>
                <div style={{ flexGrow: '1' }} />
                <div className='equipmentStatNumber'>{stat + suffix}</div>
            </Row>
        )
    }

    if (props.equipment.isAccessory() || props.equipment.ap !== 0)
        equipmentStatList.push(createStatRow(props.equipment.ap, 'AP', 'equipmentStatRow'))
    else
        equipmentStatList.push(createStatRow(props.equipment.ap, 'AP', 'equipmentEmptyRow'))

    if (props.equipment.isWeapon() || props.equipment.isAccessory() || props.equipment.isAllyWeapon() || props.equipment.strength !== 0)
        equipmentStatList.push(createStatRow(props.equipment.strength, 'Strength', 'equipmentStatRow'))
    else
        equipmentStatList.push(createStatRow(props.equipment.strength, 'Strength', 'equipmentEmptyRow'))

    if (props.equipment.isWeapon() || props.equipment.isAccessory() || props.equipment.isAllyWeapon() || props.equipment.magic !== 0)
        equipmentStatList.push(createStatRow(props.equipment.magic, 'Magic', 'equipmentStatRow'))
    else
        equipmentStatList.push(createStatRow(props.equipment.magic, 'Magic', 'equipmentEmptyRow'))

    if (props.equipment.isArmor() || props.equipment.defense !== 0)
        equipmentStatList.push(createStatRow(props.equipment.defense, 'Defense', 'equipmentStatRow'))
    else
        equipmentStatList.push(createStatRow(props.equipment.defense, 'Defense', 'equipmentEmptyRow'))



    if (props.equipment.isArmor() || props.equipment.fire !== 0)
        equipmentElementalResList.push(createStatRow(props.equipment.fire, 'Fire Res', 'equipmentStatRow'))
    else
        equipmentElementalResList.push(createStatRow(props.equipment.fire, 'Fire Res', 'equipmentEmptyRow'))

    if (props.equipment.isArmor() || props.equipment.blizzard !== 0)
        equipmentElementalResList.push(createStatRow(props.equipment.blizzard, 'Blizzard Res', 'equipmentStatRow'))
    else
        equipmentElementalResList.push(createStatRow(props.equipment.blizzard, 'Blizzard Res', 'equipmentEmptyRow'))

    if (props.equipment.isArmor() || props.equipment.thunder !== 0)
        equipmentElementalResList.push(createStatRow(props.equipment.thunder, 'Thunder Res', 'equipmentStatRow'))
    else
        equipmentElementalResList.push(createStatRow(props.equipment.thunder, 'Thunder Res', 'equipmentEmptyRow'))

    if (props.equipment.isArmor() || props.equipment.dark !== 0)
        equipmentElementalResList.push(createStatRow(props.equipment.dark, 'Dark Res', 'equipmentStatRow'))
    else
        equipmentElementalResList.push(createStatRow(props.equipment.dark, 'Dark Res', 'equipmentEmptyRow'))



    if (props.equipment.physical !== 0)
        equipmentOtherResList.push(createStatRow(props.equipment.physical, 'Physical Res', 'equipmentStatRow'))
    else
        equipmentOtherResList.push(createStatRow(props.equipment.physical, 'Physical Res', 'equipmentEmptyRow'))

    if (props.equipment.light !== 0)
        equipmentOtherResList.push(createStatRow(props.equipment.light, 'Light Res', 'equipmentStatRow'))
    else
        equipmentOtherResList.push(createStatRow(props.equipment.light, 'Light Res', 'equipmentEmptyRow'))

    if (props.equipment.universal !== 0)
        equipmentOtherResList.push(createStatRow(props.equipment.universal, 'Universal Res', 'equipmentStatRow'))
    else
        equipmentOtherResList.push(createStatRow(props.equipment.universal, 'Universal Res', 'equipmentEmptyRow'))

    let rewardClassName = 'equipmentEmptyRow'
    if (props.equipment.isWeapon() || props.equipment.replacementAbility.index !== 0)
        rewardClassName = 'equipmentStatRow'

    equipmentOtherResList.push(
        <Row
            key={props.equipment.baseAddress + ''}
            className={rewardClassName + ' equipmentReward'}
            style={{
                fontSize: (!props.isWide ? '1.25rem' : ''),
                flexDirection: (!props.isWide ? 'column' : 'row')
            }}
        >
            <div>Ability</div>
            <div style={{ flexGrow: '1' }} />
            <div>
                <Icon
                    fileName={props.equipment.replacementAbility.iconType}
                    type={'form'}
                >
                    {props.equipment.replacementAbility.reward}
                </Icon>
            </div>
        </Row>
    )

    let overlayPopover = <EditStatusPopover
        text={!props.equipment.isValidEquipment() ? 'WARNING!' : 'NEW!'}
        message={!props.equipment.isValidEquipment() ? 'Equipment can only draw 5 stats on screen' : ''}
        type='equipment'
    />

    return (
        <Container fluid className='equipmentCard'>
            <Row>
                <Col xs='auto' className='equipmentColumn equipmentImageColumn'>
                    {props.equipment.isReplaced() ? overlayPopover : <></>}
                    <Row className='equipmentImage'>
                        <img
                            src={equipmentImage}
                            alt={props.equipment.name + ' image'}
                            height='250px'
                            width='250px'
                        />
                    </Row>
                    <Row className='equipmentName'>{props.equipment.name}</Row>
                    <Row className='equipmentEditButton'>
                        <Button
                            variant='primary'
                            block
                            id={props.id}
                            disabled={props.isEditing}
                            onClick={() => props.setCurrentEquipment(props.id)}
                        >
                            {props.isEditing ? 'EDITING...' : 'EDIT'}
                        </Button>
                    </Row>
                </Col>
                <Col className='equipmentColumn'>{equipmentStatList}</Col>
                <Col className='equipmentColumn'>{equipmentElementalResList}</Col>
                <Col xs={4} className='equipmentColumn'>{equipmentOtherResList}</Col>
            </Row>
        </Container>
    )
}

export default EquipmentCard