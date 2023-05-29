import React, { useState, useRef, useEffect } from 'react'
import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'

import NavbarIcon from '../navbar/NavbarIcon'
import newLevelCard from './newLevelCard'

import './newLevelStyles.css'

function LevelPage(props) {
    const [currentLevel, setCurrentLevel] = useState(-1)
    const [currentLevelRange, setCurrentLevelRange] = useState(1)
    const [currentDisplayedForm, setCurrentDisplayedForm] = useState(2)
    const [currentLevelFieldData, setCurrentLevelFieldData] = useState({
        sword: { ...props.levelData[0].replacementSwordReward },
        shield: { ...props.levelData[0].replacementShieldReward },
        staff: { ...props.levelData[0].replacementStaffReward },
        currentAP: props.levelData[0].standardAP,
        currentCriticalAP: props.levelData[0].criticalAP(),
        currentDefense: props.levelData[0].defense,
        currentMagic: props.levelData[0].magic,
        currentStrength: props.levelData[0].strength,
        currentEXP: props.levelData[0].replacementEXP
    })
    const [currentLevelDifFieldData, setCurrentLevelDifFieldData] = useState({
        strengthDif: props.levelData[0].strength,
        magicDif: props.levelData[0].magic,
        defenseDif: props.levelData[0].defense,
        standardAPDif: props.levelData[0].standardAP,
        criticalAPDif: props.levelData[0].criticalAP(),
        expDif: props.levelData[0].replacementEXP
    })
    const levelCardList = useRef(null)
    // useEffect(() => {
    //     levelCardList.current.scrollTo({ top: 0, behavior: 'smooth' })
    //     setCurrentLevel(-1)
    //     setCurrentDisplayedForm(2)
    // }, [currentLevelRange])
    const [currentAllLevelFieldData, setCurrentAllLevelFieldData] = useState({
        modifySword: false,
        modifyShield: false,
        modifyStaff: false,
        modifyStrength: false,
        modifyMagic: false,
        modifyDefense: false,
        modifyAP: false,
        modifyEXP: false,
        levelSkip: 0,
        levelOffset: 0
    })

    const [hoveredLevel, setHoveredLevel] = useState(0)
    

    let prevLevel = props.levelData[0]

    return (
        <div className='fullPageContent'>
            <div className='pageHeader'>
                <div className='flex-grow-1' />
                <div className='helpButton'>{props.children}</div>
                <NavbarIcon
                    showNavbar={props.handleShowNavbar}
                    fileName={'level'}
                    title={'Levels'}
                />
            </div>
            <div className='levelPageContent'>
                <ResponsiveContainer width='100%' height={300}>
                    <LineChart data={props.levelData}
                        onMouseMove={(e) => {
                            if (e.hasOwnProperty('activeLabel'))
                                setHoveredLevel(e.activeLabel - 1)
                            console.log(e.activeLabel)
                        }}
                    >
                        <Line yAxisId='stat' type='step' dot={false} strokeWidth={2} dataKey='standardAP' stroke='#00FFFF' />
                        <Line yAxisId='stat' type='step' dot={false} strokeWidth={2} dataKey='strength' stroke='#FF0000' />
                        <Line yAxisId='stat' type='step' dot={false} strokeWidth={2} dataKey='magic' stroke='#0000FF' />
                        <Line yAxisId='stat' type='step' dot={false} strokeWidth={2} dataKey='defense' stroke='#00FF00' />
                        {/* <Line yAxisId='exp' type='monotone' dataKey='replacementEXP' stroke='#FFFFFF' /> */}
                        <CartesianGrid stroke='#CCCCCC' vertical={false} />
                        <XAxis dataKey='level' />
                        <YAxis yAxisId='stat' orientation='left' />
                        <YAxis yAxisId='exp' orientation='right' />
                        <Tooltip isAnimationActive={false} />
                        <Legend onClick={(e) => console.log(e)} />
                    </LineChart>
                </ResponsiveContainer>
                <div>
                    <div className='levelCardStats'>
                        <div className='levelStrengthStat levelStatRow'>
                            <div className='levelCardStatLabel'>STR:</div>
                            <div>{props.levelData[hoveredLevel].strength}</div>
                        </div>
                        <div className='levelMagicStat levelStatRow'>
                            <div className='levelCardStatLabel'>MAG:</div>
                            <div>{props.levelData[hoveredLevel].magic}</div>
                        </div>
                        <div className='levelDefenseStat levelStatRow'>
                            <div className='levelCardStatLabel'>DEF:</div>
                            <div>{props.levelData[hoveredLevel].defense}</div>
                        </div>
                    </div>
                    <div className='levelCardBigStats'>
                        <div className='levelStandardAP levelBigStatRow'>
                            <div className='levelCardStatLabel'>Standard AP:</div>
                            <div>{props.levelData[hoveredLevel].standardAP}</div>
                        </div>
                        <div className='levelCriticalAP levelBigStatRow'>
                            <div className='levelCardStatLabel'>Critical AP:</div>
                            <div>{props.levelData[hoveredLevel].criticalAP()}</div>
                        </div>
                        <div className='levelNextEXP levelBigStatRow'>
                            <div className='levelCardStatLabel'>Next Level:</div>
                            <div>{props.levelData[hoveredLevel].replacementEXP}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LevelPage