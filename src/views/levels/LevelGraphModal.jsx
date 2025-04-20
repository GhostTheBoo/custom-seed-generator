import React, { useState } from 'react'

import { Modal } from 'react-bootstrap'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { Reward } from '../../data/rewardsData'

import { Level } from '../../data/levelData'
import LevelGraphDetails from './LevelGraphDetails'
import EditStatusPopover from '../generic/EditStatusPopover'

function LevelGraphModal(props) {
    let level0 = new Level(0, 0, 0x0, 0, 0, 0, 0, new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'), new Reward('EMPTY', 0x000, 'EMPTY'))
    const [currentLevel, setCurrentLevel] = useState(1)
    const [lineOpacity, setLineOpacity] = useState({
        strength: 1,
        magic: 1,
        defense: 1,
        standardAP: 1,
        replacementEXP: 1
    })

    function handleMouseMove(event) {
        if (event.isTooltipActive) {
            setCurrentLevel(event.activeLabel)
        }
    }
    function handleMouseEnter(o) {
        let nonFocusOpacity = .1
        setLineOpacity({
            strength: nonFocusOpacity,
            magic: nonFocusOpacity,
            defense: nonFocusOpacity,
            standardAP: nonFocusOpacity,
            replacementEXP: nonFocusOpacity,
            [o.dataKey]: 1
        })
    }
    function handleMouseLeave(o) {
        setLineOpacity({
            strength: 1,
            magic: 1,
            defense: 1,
            standardAP: 1,
            replacementEXP: 1
        })
    }
    function formatStatNames(value) {
        let text = ''

        if (value === 'strength') text = 'Strength'
        else if (value === 'magic') text = 'Magic'
        else if (value === 'defense') text = 'Defense'
        else if (value === 'standardAP') text = 'Standard AP'
        else if (value === 'replacementEXP') text = 'Experience'

        return <span>{text}</span>;
    }
    let overlayPopover = <EditStatusPopover
        text='NEW!'
        message={''}
        type='level'
    />
    
    return (
        <Modal
            dialogClassName='levelGraphModal'
            show={props.show}
            onHide={() => props.setShow(false)}
            size='lg'
            centered
            animation={true}
        >
            <Modal.Header closeButton closeVariant='white' />
            <Modal.Body className='levelGraphModalBody'>
                <ResponsiveContainer width='100%' max-height='50rem'>
                    <LineChart
                        data={props.levelData}
                        margin={{
                            top: 50,
                            right: 20,
                            left: 20,
                            bottom: 5,
                        }}
                        onMouseMove={(e) => handleMouseMove(e)}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis allowDecimals={false} type='number' dataKey='level' />
                        <YAxis yAxisId='exp' orientation='right' domain={[0, 'dataMax + 1']} />
                        <YAxis yAxisId='stats' domain={[0, 'dataMax + 1']} />
                        <Tooltip content={<></>} />
                        <Legend formatter={formatStatNames} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                        <Line yAxisId='stats' dot={false} type='monotone' dataKey='strength' strokeOpacity={lineOpacity.strength} stroke='#FF8080' strokeWidth={5} />
                        <Line yAxisId='stats' dot={false} type='monotone' dataKey='magic' strokeOpacity={lineOpacity.magic} stroke='#C080FF' strokeWidth={5} />
                        <Line yAxisId='stats' dot={false} type='monotone' dataKey='defense' strokeOpacity={lineOpacity.defense} stroke='#FFF34B' strokeWidth={5} />
                        <Line yAxisId='stats' dot={false} type='monotone' dataKey='standardAP' strokeOpacity={lineOpacity.standardAP} stroke='#63C6F5' strokeWidth={5} />
                        <Line yAxisId='exp' dot={false} type='monotone' dataKey='replacementEXP' strokeOpacity={lineOpacity.replacementEXP} stroke='#FFFF00' strokeWidth={5} />
                    </LineChart>
                </ResponsiveContainer>
                <div className='levelGraphDetailsContainer'>
                    {props.levelData[currentLevel - 1].isReplaced() ? overlayPopover : <></>}
                    <LevelGraphDetails
                        level={props.levelData[currentLevel - 1]}
                        prevLevel={currentLevel === 1 ? level0 : props.levelData[currentLevel - 2]}
                    />
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default LevelGraphModal