import React from 'react'

import { CloseButton } from 'react-bootstrap'
import { motion } from 'framer-motion'

import EditStatusPopover from '../Components/EditStatusPopover/EditStatusPopover'

function LevelCard(props) {
    let overlayPopover = <EditStatusPopover
        text='NEW!'
        message={''}
        type='level'
    />
    let levelNumber = props.isAll
        ? 100
        : props.level.level
    let levelGroup = props.isAll
        ? <>
            <div className='levelLVNumber'>All Levels</div>
        </>
        : <>
            <div className='levelLV'>LV.</div>
            <div className='levelLVNumber'>{levelNumber}</div>
        </>

    let isDisabled = props.isDisabled ? props.isDisabled : false

    return (
        <motion.div
            initial={{ opacity: .25, x: isDisabled ? 0 : 500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: isDisabled ? 0 : 500 }}
            transition={{ type: 'spring', duration: isDisabled ? .4 : .5 }}
            key={`levelCard${levelNumber}`}
            ref={el => props.updateRef(el, levelNumber)}
            className={`sora levelCard${props.isEditingThisLevel ? ' editing' : ''}`}
        >
            {!isDisabled && !props.isAll && props.level.isReplaced() ? overlayPopover : <></>}
            <div className={`levelHeader${props.isAll ? ' allLevels' : ''}`}>
                <div className='levelButtonGroup'>
                    <button
                        className='levelButton'
                        disabled={props.isEditingThisLevel || isDisabled}
                        onClick={() => props.setCurrentLevel(props.id)}
                    >
                        {
                            isDisabled
                                ? 'LEVEL UP!'
                                : props.isEditingThisLevel ? 'EDITING...' : 'EDIT LEVEL!'
                        }
                    </button>
                    <div className='levelAfterButtonTriangle levelAfterButton'></div>
                    <div className='levelAfterButtonTail levelAfterButton'></div>
                </div>
                <div className='levelLVGroup'>
                    {levelGroup}
                </div>
                <div className='flex-grow-1' />
                <div className={`levelCardCloseButton${props.isEditingThisLevel ? ' editing' : ''}`}>
                    <CloseButton className='close' onClick={() => props.closeLevelCard(levelNumber)} />
                </div>
            </div>
            <div className='levelRewardBox'>
                {props.children}
            </div>
        </motion.div>
    )
}

export default LevelCard