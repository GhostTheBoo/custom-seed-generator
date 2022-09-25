import { React } from 'react'
import { Button } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'
import './EquipmentFormStyles.css'

function EquipmentForm(props) {
    let equipmentImage = './images/equipmentImages/' + props.currentFolderName + '/' + props.equipment.baseAddress.toString(16).toUpperCase() + '.png'

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

    return (
        <div className='equipmentFormCard'>
            <h1 className='equipmentFormName'>{props.equipment.name.toUpperCase()}:</h1>
            <button
                className='close'
                onClick={() => props.closeFormCard(-1)}
            >
                x
            </button>
            <img
                className='equipmentFormImage'
                src={equipmentImage}
                alt={props.equipment.name + ' Form'}
            />
            <hr />
            <div className='equipmentFormReward'>
                <label className='equipmentLabel'>Reward:</label>
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
            </div>
            <hr />
            <div className='equipmentInput grid-col-4'>
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
            <div className='equipmentInput grid-col-4'>
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
                    onClick={() => props.handleVanilla(props.equipment)}
                >
                    VANILLA
                </Button>
                <Button
                    block
                    onClick={() => props.handleReplace(props.equipment, props.currentEquipmentFieldData)}
                >
                    CONFIRM
                </Button>
            </div>
        </div>
    )
}

export default EquipmentForm