import { React } from 'react'
import { Row } from 'react-bootstrap'

import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover'

function FormCard(props) {
    let formName = [props.level.level.split(' ')[0]]

    let overlayPopover = <EditStatusPopover
        text='NEW!'
        message={''}
        type='form'
    />

    if (formName[0] !== 'Summon')
        formName.push('Form')

    let formLogo = require(`../assets/icons/${formName[0].toLowerCase()}D.png`)

    return (
        <Row style={{ filter: 'drop-shadow(3px 3px 2px black)' }}>
            {props.level.isEXPReplaced() || props.level.isRewardReplaced() ? overlayPopover : <></>}
            <div className={`formLevelCard ${formName[0].toLowerCase()}`}>
                <div className='formLevelName'>
                    <div style={{ width: '40%' }}>{formName.join(' ')}</div>
                    <div style={{ flexGrow: '1' }}></div>
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
                </div>
                <button
                    className='editFormLevelButton'
                    onClick={(e) => props.handleDriveFormLevelChange(parseInt(e.target.id))}
                    disabled={props.isEditing}
                    style={{ fontFamily: 'KHGummi', fontSize: '1.5rem' }}
                >
                    {props.isEditing ? 'EDITING...' : 'EDIT'}
                </button>
            </div>
            <div className={`afterFormLevelCard ${formName[0].toLowerCase()}`} />
            <img className='formDriveLogo' src={formLogo} alt="Drive Logo" />
        </Row>
    )
}

export default FormCard