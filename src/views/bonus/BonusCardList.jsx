import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import BonusCard from './BonusCard'

function BonusCardList(props) {
    let bonusSlotList = props.slots.map((slot, slotIndex) => {
        return (
            <BonusCard
                key={`BonusCard${props.currentWorld}${props.currentFight}${slotIndex}`}
                bonusReward={slot}
                isEditing={slotIndex === props.currentSlot}
                slotIndex={slotIndex}
                setCurrentBonusFightSlot={props.setCurrentBonusFightSlot}
            />
        )
    })

    return (
        <AnimatePresence mode='popLayout'>
            <motion.ul
                initial={{ opacity: .25, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: 'spring', duration: .5 }}
                key={`BonusCardGroup${props.currentWorld}${props.currentFight}`}
            >
                {bonusSlotList}
            </motion.ul>
        </AnimatePresence>
    )
}

export default BonusCardList