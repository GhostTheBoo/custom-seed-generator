import React, { useState, useRef, useEffect } from 'react'
import Chart from 'react-apexcharts'
import Line from 'react-chartjs-2'
import NavbarIcon from '../navbar/NavbarIcon'

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

    const [expOptions, setExpOptions] = useState({
        chart: {
            id: 'expChart',
            group: 'levelChart',
            toolbar: {
                tools: { download: false, }
            },
            events: {
                markerClick: (event, chartContext, { seriesIndex, dataPointIndex, config }) => {
                    console.log('I clicked on Level ' + (dataPointIndex + 1))
                }
            }
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return '<div>Yo!</div>'
            }
        },
        theme: { mode: 'dark' },
        xaxis: {
            categories: lvlArray,
            tickAmount: 10,
            tooltip: { enabled: false }
        },
        yaxis: {
            logarithmic: true,
            showAlways: true,
            forceNiceScale: true,
            labels: {
                formatter: (val) => {
                    if (val >= 1000000)
                        return (val / 1000000) + 'M'
                    if (val >= 1000)
                        return (val / 1000) + 'K'
                    return val
                }
            }
        },
        stroke: { curve: 'straight' },
        colors: ['#fff100']
    })
    const [expSeries, setExpSeries] = useState([{ name: 'Experience', data: expArray }])
    const [statOptions, setStatOptions] = useState({
        chart: {
            id: 'statChart',
            group: 'levelChart',
            toolbar: {
                tools: { download: false, }
            }
        },
        theme: { mode: 'dark' },
        xaxis: {
            categories: lvlArray,
            tickAmount: 10,
            tooltip: {
                enabled: false
            }
        },
        yaxis: { showAlways: true },
        stroke: { curve: 'straight' },
        colors: ['#ff0000', '#0000ff', '#00ff00', '#fff100']
    })
    const [statSeries, setStatSeries] = useState([
        { name: 'Strength', data: strArray },
        { name: 'Magic', data: magArray },
        { name: 'Defense', data: defArray }
    ])

    let lvlArray = []
    let expArray = []
    let strArray = []
    let magArray = []
    let defArray = []
    let sapArray = []
    let capArray = []

    props.levelData.forEach(level => {
        // if (level.level % 10 === 1)
        lvlArray.push('Level ' + level.level)
        expArray.push(level.replacementEXP)
        strArray.push(level.strength)
        magArray.push(level.magic)
        defArray.push(level.defense)
        sapArray.push(level.standardAP)
        capArray.push(level.criticalAP)
    })


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
                yo
            </div>
        </div>
    )
}

export default LevelPage