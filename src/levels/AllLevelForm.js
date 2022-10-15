import { React } from 'react'
import { Form, Button } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function LevelForm(props) {

    function setCurrentSword(newValue) { props.setCurrentLevelFieldData('sword', newValue) }
    function setCurrentShield(newValue) { props.setCurrentLevelFieldData('shield', newValue) }
    function setCurrentStaff(newValue) { props.setCurrentLevelFieldData('staff', newValue) }

    function setCurrentAP(newValue) { props.setCurrentLevelDifFieldData('standardAPDif', newValue) }
    function setCurrentStrength(newValue) { props.setCurrentLevelDifFieldData('strengthDif', newValue) }
    function setCurrentMagic(newValue) { props.setCurrentLevelDifFieldData('magicDif', newValue) }
    function setCurrentDefense(newValue) { props.setCurrentLevelDifFieldData('defenseDif', newValue) }
    function setCurrentEXP(newValue) { props.setCurrentLevelDifFieldData('expDif', newValue) }

    function setLevelSkip(newValue) { props.setCurrentAllLevelFieldData('levelSkip', newValue) }
    function setLevelOffset(newValue) { props.setCurrentAllLevelFieldData('levelOffset', newValue) }

    function setModifySword() { props.setCurrentAllLevelFieldData('modifySword', !props.currentAllLevelFieldData.modifySword) }
    function setModifyShield() { props.setCurrentAllLevelFieldData('modifyShield', !props.currentAllLevelFieldData.modifyShield) }
    function setModifyStaff() { props.setCurrentAllLevelFieldData('modifyStaff', !props.currentAllLevelFieldData.modifyStaff) }
    function setModifyStrength() { props.setCurrentAllLevelFieldData('modifyStrength', !props.currentAllLevelFieldData.modifyStrength) }
    function setModifyMagic() { props.setCurrentAllLevelFieldData('modifyMagic', !props.currentAllLevelFieldData.modifyMagic) }
    function setModifyDefense() { props.setCurrentAllLevelFieldData('modifyDefense', !props.currentAllLevelFieldData.modifyDefense) }
    function setModifyAP() { props.setCurrentAllLevelFieldData('modifyAP', !props.currentAllLevelFieldData.modifyAP) }
    function setModifyEXP() { props.setCurrentAllLevelFieldData('modifyEXP', !props.currentAllLevelFieldData.modifyEXP) }

    return (
        <div className='levelFormCard'>
            <h1 className='levelFormNumber'>ALL LEVELS:</h1>
            <button
                className='close'
                onClick={() => props.closeFormCard(-1)}
            >
                x
            </button>
            <hr />
            <div className='levelFormReward allLevelFormReward'>
                <Form.Check
                    id='allLevelSwordSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllLevelFieldData.modifySword}
                    onChange={() => setModifySword()}
                />
                <label className='levelLabel'>Sword:</label>
                <div>
                    <Icon
                        style={{ margin: '10px' }}
                        fileName={props.currentLevelFieldData.sword.iconType}
                        type={'row'}
                    >
                        {props.currentLevelFieldData.sword.reward}
                    </Icon>
                </div>
                <RewardSelector
                    onReplace={(replacementReward) => setCurrentSword(replacementReward)}
                />
                <Form.Check
                    id='allLevelShieldSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllLevelFieldData.modifyShield}
                    onChange={() => setModifyShield()}
                />
                <label className='levelLabel'>Shield:</label>
                <div>
                    <Icon
                        style={{ margin: '10px' }}
                        fileName={props.currentLevelFieldData.shield.iconType}
                        type={'row'}
                    >
                        {props.currentLevelFieldData.shield.reward}
                    </Icon>
                </div>
                <RewardSelector
                    onReplace={(replacementReward) => setCurrentShield(replacementReward)}
                />
                <Form.Check
                    id='allLevelStaffSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllLevelFieldData.modifyStaff}
                    onChange={() => setModifyStaff()}
                />
                <label className='levelLabel'>Staff:</label>
                <div>
                    <Icon
                        style={{ margin: '10px' }}
                        fileName={props.currentLevelFieldData.staff.iconType}
                        type={'row'}
                    >
                        {props.currentLevelFieldData.staff.reward}
                    </Icon>
                </div>
                <RewardSelector
                    onReplace={(replacementReward) => setCurrentStaff(replacementReward)}
                />
            </div>
            <hr />
            <div className='levelInput allLevelInput'>
                <Form.Check
                    id='allLevelStrengthSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllLevelFieldData.modifyStrength}
                    onChange={() => setModifyStrength()}
                />
                <label className='levelLabel'>Strength:</label>
                <input
                    name={'LevelStrength'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentLevelDifFieldData.strengthDif}
                    disabled={!props.currentAllLevelFieldData.modifyStrength}
                    onChange={(e) => setCurrentStrength(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <Form.Check
                    id='allLevelMagicSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllLevelFieldData.modifyMagic}
                    onChange={() => setModifyMagic()}
                />
                <label className='levelLabel'>Magic:</label>
                <input
                    name={'LevelMagic'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentLevelDifFieldData.magicDif}
                    disabled={!props.currentAllLevelFieldData.modifyMagic}
                    onChange={(e) => setCurrentMagic(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <Form.Check
                    id='allLevelDefenseSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllLevelFieldData.modifyDefense}
                    onChange={() => setModifyDefense()}
                />
                <label className='levelLabel'>Defense:</label>
                <input
                    name={'LevelDefense'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentLevelDifFieldData.defenseDif}
                    disabled={!props.currentAllLevelFieldData.modifyDefense}
                    onChange={(e) => setCurrentDefense(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <Form.Check
                    id='allLevelAPSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllLevelFieldData.modifyAP}
                    onChange={() => setModifyAP()}
                />
                <label className='levelLabel'>Standard AP:</label>
                <input
                    name={'LevelAP'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentLevelDifFieldData.standardAPDif}
                    disabled={!props.currentAllLevelFieldData.modifyAP}
                    onChange={(e) => setCurrentAP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <label className='levelLabel'>Critical AP:</label>
                <label className='levelLabel levelCriticalAPLabel'>{Math.ceil(props.currentLevelDifFieldData.standardAPDif * 1.5)}</label>
            </div>
            <hr />
            <div className='levelEXPInput allLevelEXPInput'>
                <Form.Check
                    id='allLevelEXPSwitch'
                    type='switch'
                    style={{ margin: 'auto' }}
                    checked={props.currentAllLevelFieldData.modifyEXP}
                    onChange={() => setModifyEXP()}
                />
                <label className='levelLabel'>EXP to Next Level:</label>
                <input
                    name={'LevelEXP'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentLevelDifFieldData.expDif}
                    disabled={!props.currentAllLevelFieldData.modifyEXP}
                    onChange={(e) => setCurrentEXP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='0xFFFFFFFF'
                />
            </div>
            <hr />
            <div className='allLevelSkips'>
                <div className='levelLabel'>Level Frequency:</div>
                <input
                    name={'allLevelSkip'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentAllLevelFieldData.levelSkip}
                    onChange={(e) => setLevelSkip(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='99'
                />
                <div className='levelLabel'>Starting Level:</div>
                <input
                    name={'LevelEXP'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentAllLevelFieldData.levelOffset}
                    onChange={(e) => setLevelOffset(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='99'
                />
            </div>
            <hr />
            <div className='levelReplaceButtonGroup'>
                <Button
                    variant='secondary'
                    block
                    onClick={() => props.handleVanilla(props.level)}
                >
                    VANILLA
                </Button>
                <Button
                    block
                    onClick={() => props.handleReplace(props.level, props.currentLevelFieldData)}
                >
                    CONFIRM
                </Button>
            </div>
        </div>
    )
}

export default LevelForm