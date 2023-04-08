import React from 'react'

import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function FormCard(props) {
    let formName = [props.level.level.split(' ')[0]]

    let overlayPopover = <EditStatusPopover
        text='NEW!'
        message={''}
        type='form'
    />

    if (formName[0] !== 'Summon')
        formName.push('Form')

    let formLogo = './images/icons/' + formName[0].toLowerCase() + 'D.png'

    return (
        <div className='formLevelCardGroup'>
            {props.level.isEXPReplaced() || props.level.isRewardReplaced() ? overlayPopover : <></>}
            <div className={`formLevelCard ${formName[0].toLowerCase()}`}>
                <div className='formLevelName'>
                    <div style={{ width: '5%' }}></div>
                    <div className='formType'>{formName.join(' ')}</div>
                    <div className='flex-grow-1'></div>
                    <div className='lv'>LV.</div>
                    <div style={{ width: '10%' }}>{props.level.level.slice(-1)}</div>
                </div>
                <div className='formRewardBox'>
                    <div className='formCardReward'>
                        <Icon
                            fileName={props.level.replacementReward.iconType}
                            type={'form'}
                        >
                            {props.level.replacementReward.reward}
                        </Icon>
                    </div>
                    <div className='formCardReward'>
                        EXP: <span style={{ fontFamily: 'KHGummi', color: '#FFF100', textAlign: 'start' }}>{props.level.replacementEXP}</span>
                    </div>
                    <button
                        className='editFormLevelButton'
                        onClick={(e) => props.handleDriveFormLevelChange(parseInt(e.target.id))}
                        disabled={props.isEditing}
                    >
                        {props.isEditing ? 'EDITING' : 'EDIT'}
                    </button>
                </div>
            </div>
            <div className={`afterFormLevelCard ${formName[0].toLowerCase()}`} />
            <img className='formDriveLogo' src={formLogo} alt="Drive Logo" />
        </div>
    )
}

export default FormCard