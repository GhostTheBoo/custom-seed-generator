import React from 'react'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

function BonusFightList(props) {
    const bonusFolderNames = [
        'agr',
        'bc',
        'cor',
        'dc',
        'ht',
        'hb',
        'lod',
        'oc',
        'pr',
        'pl',
        'stt',
        'sp',
        'tr',
        'tt',
        'twtnw'
    ]

    let fightList = props.fightList.map((fight, fightIndex) => {
        let icon = './images/bonusFightImages/' + bonusFolderNames[props.currentWorld] + '/' + fight.zipID.toString() + '.png'
        return (
            <li
                key={fightIndex}
                id={fightIndex}
                className={'bonusFightSelectorItem ' + (parseInt(props.currentFight) === fightIndex ? 'selected' : '')}
                onClick={() => { props.setCurrentFight(fightIndex) }}
            >
                <img
                    className='bonusFightIcon'
                    src={icon}
                    alt={fight.fight + ' Icon'}
                />
                <span className='bonusFightIconDescription'>
                    {' ' + fight.fightName}
                </span>
                {parseInt(props.currentFight) === fightIndex
                    ? <motion.div className="underline" layoutId="underline" />
                    : null}
            </li>
        )
    })

    return (
        <AnimatePresence mode='popLayout'>
            <motion.ul
                initial={{ opacity: .25, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: 'spring', duration: .5 }}
                className='bonusFightList'
                key={bonusFolderNames[props.currentWorld]}
            >
                {fightList}
            </motion.ul>
        </AnimatePresence>
    )
}

export default BonusFightList