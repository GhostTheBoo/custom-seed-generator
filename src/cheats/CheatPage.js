import React from 'react'
import './CheatStyles.css'

import CheatListGroup from './CheatListGroup'
import NavbarIcon from '../navbar/NavbarIcon'

function CheatPage(props) {
    function toggleActiveCheat(allCheatData, setAllCheatData, cheatIndex) {
        let newCheatData = allCheatData.map((cheat, index) => {
            if (index === cheatIndex) return cheat.toggleActive()
            return cheat
        })
        setAllCheatData(newCheatData)
    }
    return (
        <div className='fullPageContent'>
            <div className='pageHeader'>
                <div className='flex-grow-1' />
                <div>
                    {props.children}
                </div>
                <NavbarIcon
                    showNavbar={props.handleShowNavbar}
                    fileName={'cheat'}
                    title={'Cheats'}
                />
            </div>
            <div className='cheatPageContent'>
                <h1 className='cheatTypeHeader' style={{ margin: '10px', textAlign: 'center' }}>Zip Cheats</h1>
                <h1 className='cheatTypeHeader' style={{ margin: '10px', textAlign: 'center' }}>Pnach Cheats</h1>
                <h1 className='cheatTypeHeader' style={{ margin: '10px', textAlign: 'center' }}>Lua Cheats</h1>
                {/* <CheatListGroup
                    dataList={props.zipCheatData}
                    toggleActiveCheat={(cheatIndex) => toggleActiveCheat(props.zipCheatData, props.setAllZipCheats, cheatIndex)}
                /> */}
                <div className='temp'></div>
                <CheatListGroup
                    dataList={props.pnachCheatData}
                    cheatType={'pnach'}
                    toggleActiveCheat={(allCheats, cheatIndex) => toggleActiveCheat(allCheats, props.setAllPnachCheats, cheatIndex)}
                />
                <CheatListGroup
                    dataList={props.luaCheatData}
                    cheatType={'lua'}
                    toggleActiveCheat={(allCheats, cheatIndex) => toggleActiveCheat(allCheats, props.setAllLuaCheats, cheatIndex)}
                />
            </div>
        </div>
    )
}

export default CheatPage