import React from 'react'
import { motion } from 'framer-motion'

function ChestImageCard(props) {
    let chestImage = './images/chestImages/' + props.currentFolderName + '/' + props.currentFolderName + '.png'
    let chestAltText = props.currentFolderName + 'All Chests'
    let chestRoom = <div className='chestCardRoom'>All Chests</div>
    let isAll = true

    if (props.currentChest !== undefined) {
        chestImage = './images/chestImages/' + props.currentFolderName + '/' + props.currentChest.zipID + '.png'
        chestAltText = props.currentChest.room + ' ' + props.currentChest.replacementReward.reward
        chestRoom = <div className='chestCardRoom'>{props.currentChest.room !== props.prevChestRoom ? props.currentChest.room : ''}</div>
        isAll = false
    }

    return (
        <div className='chestImageCard'>
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: .25, delay: .1 }}
                className='chestCardImage'
                key={chestImage}
                src={chestImage}
                alt={chestAltText}
            />
            <img
                className={`chestCardImageBackground${isAll ? ' all' : ''}`}
                src='./images/chestImages/black.png'
                alt='background'
            />
            {/* <img
                className='chestCardImage'
                src={chestImage}
                alt={chestAltText}
            /> */}
            {chestRoom}
        </div>
    )
}

export default ChestImageCard