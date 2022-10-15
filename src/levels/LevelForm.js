import { React } from 'react'
import { Button } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

import LevelStatChange from './LevelStatChange'
import LevelEXPChange from './LevelEXPChange'

function LevelForm(props) {

    function setCurrentSword(newValue) { props.setCurrentLevelFieldData('sword', newValue) }
    function setCurrentShield(newValue) { props.setCurrentLevelFieldData('shield', newValue) }
    function setCurrentStaff(newValue) { props.setCurrentLevelFieldData('staff', newValue) }
    function setCurrentAP(newValue) { props.setCurrentLevelFieldData('currentAP', newValue) }
    function setCurrentStrength(newValue) { props.setCurrentLevelFieldData('currentStrength', newValue) }
    function setCurrentMagic(newValue) { props.setCurrentLevelFieldData('currentMagic', newValue) }
    function setCurrentDefense(newValue) { props.setCurrentLevelFieldData('currentDefense', newValue) }
    function setCurrentEXP(newValue) {
        // let minExp = props.level.level === 1 ? 0 : props.previousLevel.replacementEXP
        // let modifiedNum = Math.max(minExp, Math.min(0xFFFFFFFF, Number(parseInt(newValue))))
        props.setCurrentLevelFieldData('currentEXP', newValue)
    }
    // function setCurrentEXPChange(newValue) {
    //     let prevEXP = props.previousLevel.replacementEXP
    //     props.setCurrentLevelFieldData('currentEXP', Math.max(prevEXP, Math.min(0xFFFFFFFF, Number(parseInt(newValue + prevEXP)))))
    // }

    return (
        <div className='levelFormCard'>
            <h1 className='levelFormNumber'>LEVEL {props.level.level}:</h1>
            <button
                className='close'
                onClick={() => props.closeFormCard(-1)}
            >
                x
            </button>
            <hr />
            <div className='levelFormReward'>
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
            <div className='levelInput'>
                <label className='levelLabel'>Strength:</label>
                <input
                    name={'LevelStrength'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentLevelFieldData.currentStrength}
                    onChange={(e) => setCurrentStrength(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <LevelStatChange stat={props.currentLevelDifFieldData.strengthDif} />
                <label className='levelLabel'>Magic:</label>
                <input
                    name={'LevelMagic'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentLevelFieldData.currentMagic}
                    onChange={(e) => setCurrentMagic(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <LevelStatChange stat={props.currentLevelDifFieldData.magicDif} />
                <label className='levelLabel'>Defense:</label>
                <input
                    name={'LevelDefense'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentLevelFieldData.currentDefense}
                    onChange={(e) => setCurrentDefense(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <LevelStatChange stat={props.currentLevelDifFieldData.defenseDif} />
                <label className='levelLabel'>Standard AP:</label>
                <input
                    name={'LevelAP'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentLevelFieldData.currentAP}
                    onChange={(e) => setCurrentAP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
                <LevelStatChange stat={props.currentLevelDifFieldData.standardAPDif} />
                <label className='levelLabel'>Critical AP:</label>
                <label className='levelLabel levelCriticalAPLabel'>{props.currentLevelFieldData.currentCriticalAP}</label>
                <LevelStatChange stat={props.currentLevelDifFieldData.criticalAPDif} />
            </div>
            <hr />
            <div className='levelEXPInput'>
                <label className='levelLabel'>EXP to Next Level:</label>
                <input
                    name={'LevelEXP'}
                    className='levelInputField three-digit-input'
                    type='number'
                    value={props.currentLevelFieldData.currentEXP}
                    onChange={(e) => setCurrentEXP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='0xFFFFFFFF'
                />
                <LevelEXPChange exp={props.level.level !== 99 ? props.currentLevelDifFieldData.expDif : 0} />
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