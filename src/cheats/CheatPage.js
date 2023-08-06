import React from 'react'
import { motion } from 'framer-motion'
import './CheatStyles.css'

import CheatListGroup from './CheatListGroup'

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
            <motion.div
                initial={{ opacity: .25, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', duration: .5 }}
                className='pageHeader'
            >
                <div className='flex-grow-1' />
                <div>
                    {props.children}
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: .25, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', duration: .5 }}
                className='cheatPageContent'
            >
                <h1 className='cheatTypeHeader' style={{ margin: '10px', textAlign: 'center' }}>Lua Cheats</h1>
                <h1 className='cheatTypeHeader' style={{ margin: '10px', textAlign: 'center' }}>Zip Cheats</h1>
                {/* <h1 className='cheatTypeHeader' style={{ margin: '10px', textAlign: 'center' }}>Pnach Cheats</h1> */}
                {/* <CheatListGroup
                    dataList={props.zipCheatData}
                    toggleActiveCheat={(cheatIndex) => toggleActiveCheat(props.zipCheatData, props.setAllZipCheats, cheatIndex)}
                /> */}
                {/* <CheatListGroup
                    dataList={props.pnachCheatData}
                    cheatType={'pnach'}
                    toggleActiveCheat={(allCheats, cheatIndex) => toggleActiveCheat(allCheats, props.setAllPnachCheats, cheatIndex)}
                /> */}
                <CheatListGroup
                    dataList={props.luaCheatData}
                    cheatType={'lua'}
                    toggleActiveCheat={(allCheats, cheatIndex) => toggleActiveCheat(allCheats, props.setAllLuaCheats, cheatIndex)}
                />
                <div className='temp'>Under Construction</div>
            </motion.div>
        </div>
    )
}

export default CheatPage