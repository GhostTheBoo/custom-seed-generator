import { React } from 'react'
import { Form, Button} from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function AllEquipmentForm(props) {
    function getFullEquipmentTypeText(equipmentType) {
        if (equipmentType === 'acc') return 'Accessories'
        if (equipmentType === 'alw') return 'Ally Weapons'
        if (equipmentType === 'arm') return 'Armor'
        if (equipmentType === 'dst') return 'Donald Staves'
        if (equipmentType === 'gsh') return 'Goofy Shields'
        if (equipmentType === 'key') return 'Keyblades'
    }

    function setCurrentAbility(newValue) { props.setCurrentEquipmentFieldData('ability', newValue) }
    function setCurrentAP(newValue) { props.setCurrentEquipmentFieldData('currentAP', newValue) }
    function setCurrentStrength(newValue) { props.setCurrentEquipmentFieldData('currentStrength', newValue) }
    function setCurrentMagic(newValue) { props.setCurrentEquipmentFieldData('currentMagic', newValue) }
    function setCurrentDefense(newValue) { props.setCurrentEquipmentFieldData('currentDefense', newValue) }
    function setCurrentFire(newValue) { props.setCurrentEquipmentFieldData('currentFire', newValue) }
    function setCurrentBlizzard(newValue) { props.setCurrentEquipmentFieldData('currentBlizzard', newValue) }
    function setCurrentThunder(newValue) { props.setCurrentEquipmentFieldData('currentThunder', newValue) }
    function setCurrentPhysical(newValue) { props.setCurrentEquipmentFieldData('currentPhysical', newValue) }
    function setCurrentDark(newValue) { props.setCurrentEquipmentFieldData('currentDark', newValue) }
    function setCurrentLight(newValue) { props.setCurrentEquipmentFieldData('currentLight', newValue) }
    function setCurrentUniversal(newValue) { props.setCurrentEquipmentFieldData('currentUniversal', newValue) }

    function setModifyAbility() { props.setCurrentAllEquipmentFieldData('modifyAbility', !props.currentAllEquipmentFieldData.modifyAbility) }
    function setModifyAP() { props.setCurrentAllEquipmentFieldData('modifyAP', !props.currentAllEquipmentFieldData.modifyAP) }
    function setModifyStrength() { props.setCurrentAllEquipmentFieldData('modifyStrength', !props.currentAllEquipmentFieldData.modifyStrength) }
    function setModifyMagic() { props.setCurrentAllEquipmentFieldData('modifyMagic', !props.currentAllEquipmentFieldData.modifyMagic) }
    function setModifyDefense() { props.setCurrentAllEquipmentFieldData('modifyDefense', !props.currentAllEquipmentFieldData.modifyDefense) }
    function setModifyFire() { props.setCurrentAllEquipmentFieldData('modifyFire', !props.currentAllEquipmentFieldData.modifyFire) }
    function setModifyBlizzard() { props.setCurrentAllEquipmentFieldData('modifyBlizzard', !props.currentAllEquipmentFieldData.modifyBlizzard) }
    function setModifyThunder() { props.setCurrentAllEquipmentFieldData('modifyThunder', !props.currentAllEquipmentFieldData.modifyThunder) }
    function setModifyDark() { props.setCurrentAllEquipmentFieldData('modifyDark', !props.currentAllEquipmentFieldData.modifyDark) }
    function setModifyPhysical() { props.setCurrentAllEquipmentFieldData('modifyPhysical', !props.currentAllEquipmentFieldData.modifyPhysical) }
    function setModifyLight() { props.setCurrentAllEquipmentFieldData('modifyLight', !props.currentAllEquipmentFieldData.modifyLight) }
    function setModifyUniversal() { props.setCurrentAllEquipmentFieldData('modifyUniversal', !props.currentAllEquipmentFieldData.modifyUniversal) }

    return (
        <div className='equipmentFormCard'>
            <h1 className='equipmentFormName'>ALL {getFullEquipmentTypeText(props.currentFolderName).toUpperCase()}:</h1>
            <button
                className='close'
                onClick={() => props.closeFormCard(-1)}
            >
                x
            </button>
            <div className='allequipmentFormRewardRow'>
                <div style={{ width: '10%', marginTop: '.6rem' }}>
                    <Form.Check
                        id='allEquipmentAbilitySwitch'
                        type='switch'
                        style={{ margin: 'auto' }}
                        checked={props.currentAllEquipmentFieldData.modifyAbility}
                        onChange={() => setModifyAbility()}
                    />
                </div>
                <label className='equipmentAbilityLabel equipmentLabel'>Ability:</label>
            </div>
            <div>
                <Icon
                    style={{ margin: '10px' }}
                    fileName={props.currentEquipmentFieldData.ability.iconType}
                    type={'row'}
                >
                    {props.currentEquipmentFieldData.ability.reward}
                </Icon>
            </div>
            <RewardSelector
                onReplace={(replacementReward) => setCurrentAbility(replacementReward)}
            />
            <hr />
            <div className='allEquipmentInput'>
                <Form.Check
                    id='allEquipmentAPSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyAP}
                    onChange={() => setModifyAP()}
                />
                <label className='equipmentLabel'>AP:</label>
                <input
                    name={'EquipmentAP'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentAP}
                    onChange={(e) => setCurrentAP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <Form.Check
                    id='allEquipmentMagicSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyMagic}
                    onChange={() => setModifyMagic()}
                />
                <label className='equipmentLabel'>Magic:</label>
                <input
                    name={'EquipmentMagic'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentMagic}
                    onChange={(e) => setCurrentMagic(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <Form.Check
                    id='allEquipmentStrengthSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyStrength}
                    onChange={() => setModifyStrength()}
                />
                <label className='equipmentLabel'>Strength:</label>
                <input
                    name={'EquipmentStrength'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentStrength}
                    onChange={(e) => setCurrentStrength(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <Form.Check
                    id='allEquipmentDefenseSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyDefense}
                    onChange={() => setModifyDefense()}
                />
                <label className='equipmentLabel'>Defense:</label>
                <input
                    name={'EquipmentDefense'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentDefense}
                    onChange={(e) => setCurrentDefense(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
            </div>
            <hr />
            <div className='allEquipmentInput grid-col-4'>
                <Form.Check
                    id='allEquipmentFireSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyFire}
                    onChange={() => setModifyFire()}
                />
                <label className='equipmentLabel'>Fire:</label>
                <input
                    name={'EquipmentFire'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentFire}
                    onChange={(e) => setCurrentFire(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='-150'
                    max='100'
                />
                <Form.Check
                    id='allEquipmentPhysicalSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyPhysical}
                    onChange={() => setModifyPhysical()}
                />
                <label className='equipmentLabel'>Physical:</label>
                <input
                    name={'EquipmentPhysical'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentPhysical}
                    onChange={(e) => setCurrentPhysical(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='-150'
                    max='100'
                />
                <Form.Check
                    id='allEquipmentBlizzardSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyBlizzard}
                    onChange={() => setModifyBlizzard()}
                />
                <label className='equipmentLabel'>Blizzard:</label>
                <input
                    name={'EquipmentBlizzard'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentBlizzard}
                    onChange={(e) => setCurrentBlizzard(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='-150'
                    max='100'
                />
                <Form.Check
                    id='allEquipmentLightSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyLight}
                    onChange={() => setModifyLight()}
                />
                <label className='equipmentLabel'>Light:</label>
                <input
                    name={'EquipmentLight'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentLight}
                    onChange={(e) => setCurrentLight(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='-150'
                    max='100'
                />
                <Form.Check
                    id='allEquipmentThunderSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyThunder}
                    onChange={() => setModifyThunder()}
                />
                <label className='equipmentLabel'>Thunder:</label>
                <input
                    name={'EquipmentThunder'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentThunder}
                    onChange={(e) => setCurrentThunder(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='-150'
                    max='100'
                />
                <Form.Check
                    id='allEquipmentUniversalSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyUniversal}
                    onChange={() => setModifyUniversal()}
                />
                <label className='equipmentLabel'>Universal:</label>
                <input
                    name={'EquipmentUniversal'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentUniversal}
                    onChange={(e) => setCurrentUniversal(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='-150'
                    max='100'
                />
                <Form.Check
                    id='allEquipmentDarkSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllEquipmentFieldData.modifyDark}
                    onChange={() => setModifyDark()}
                />
                <label className='equipmentLabel'>Dark:</label>
                <input
                    name={'EquipmentDark'}
                    className='equipmentInputField three-digit-input'
                    type='number'
                    value={props.currentEquipmentFieldData.currentDark}
                    onChange={(e) => setCurrentDark(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='-150'
                    max='100'
                />
            </div>
            <hr />
            <div className='equipmentReplaceButtonGroup'>
                <Button
                    variant='secondary'
                    block
                    onClick={() => props.handleVanilla()}
                >
                    VANILLA
                </Button>
                <Button
                    block
                    onClick={() => props.handleReplace()}
                >
                    CONFIRM
                </Button>
            </div>
        </div>
    )
}

export default AllEquipmentForm