import React from 'react'
import './StartingStatusFormStyles.css'

import { Button } from 'react-bootstrap'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function StartingStatsForm(props) {
    function setCurrentHP(newValue) { props.setCurrentStartingStatusFieldData('currentHP', newValue) }
    function setCurrentMP(newValue) { props.setCurrentStartingStatusFieldData('currentMP', newValue) }
    function setCurrentAP(newValue) { props.setCurrentStartingStatusFieldData('currentAP', newValue) }
    function setCurrentArmor(newValue) { props.setCurrentStartingStatusFieldData('currentArmor', newValue) }
    function setCurrentAccessory(newValue) { props.setCurrentStartingStatusFieldData('currentAccessory', newValue) }
    function setCurrentItem(newValue) { props.setCurrentStartingStatusFieldData('currentItem', newValue) }

    let overlayPopover = <EditStatusPopover
        text={'NEW!'}
        message={''}
        type='starting'
    />

    return (
        <div className='startingStuffFormCard'>
            {props.startingStats.isReplaced() ? overlayPopover : <></>}
            <h1 className='startingStuffFormName'>{props.startingStats.getCharacter()}:</h1>
            <hr />
            <div className='startingStuffInputGroup'>
                <label className='startingStuffLabel'>HP:</label>
                <div className='startingStuffCurrentStatLabel'>{props.startingStats.hp}</div>
                <input
                    name={'StartingHP'}
                    className='startingStuffInputField three-digit-input'
                    type='number'
                    value={props.startingStatusFieldData.currentHP}
                    onChange={(e) => setCurrentHP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <label className='startingStuffLabel'>MP:</label>
                <div className='startingStuffCurrentStatLabel'>{props.startingStats.mp}</div>
                <input
                    name={'StartingMP'}
                    className='startingStuffInputField three-digit-input'
                    type='number'
                    value={props.startingStatusFieldData.currentMP}
                    onChange={(e) => setCurrentMP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <label className='startingStuffLabel'>AP:</label>
                <div className='startingStuffCurrentStatLabel'>{props.startingStats.ap}</div>
                <input
                    name={'StartingAP'}
                    className='startingStuffInputField three-digit-input'
                    type='number'
                    value={props.startingStatusFieldData.currentAP}
                    onChange={(e) => setCurrentAP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
            </div>
            <hr />
            <div className='startingStuffInputGroup'>
                <label className='startingStuffLabel large'>Armor Slots:</label>
                <label className='startingStuffLabel small'>Armor:</label>
                <div className='startingStuffCurrentStatLabel'>{props.startingStats.armorSlots}</div>
                <input
                    name={'StartingArmor'}
                    className='startingStuffInputField three-digit-input'
                    type='number'
                    value={props.startingStatusFieldData.currentArmor}
                    onChange={(e) => setCurrentArmor(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='19'
                />
                <label className='startingStuffLabel large'>Accessory Slots:</label>
                <label className='startingStuffLabel small'>Accessory:</label>
                <div className='startingStuffCurrentStatLabel'>{props.startingStats.accessorySlots}</div>
                <input
                    name={'StartingAccessory'}
                    className='startingStuffInputField three-digit-input'
                    type='number'
                    value={props.startingStatusFieldData.currentAccessory}
                    onChange={(e) => setCurrentAccessory(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='19'
                />
                <label className='startingStuffLabel large'>Item Slots:</label>
                <label className='startingStuffLabel small'>Item:</label>
                <div className='startingStuffCurrentStatLabel'>{props.startingStats.itemSlots}</div>
                <input
                    name={'StartingItem'}
                    className='startingStuffInputField three-digit-input'
                    type='number'
                    value={props.startingStatusFieldData.currentItem}
                    onChange={(e) => setCurrentItem(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='19'
                />
            </div>
            <hr />
            <div className='startingStuffReplaceButtonGroup'>
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

export default StartingStatsForm