import React from 'react'

function ChestImageCard(props) {
    let chestImage = './images/chestImages/' + props.currentFolderName + '/' + props.currentFolderName + '.png'
    let chestAltText = props.currentFolderName + 'All Chests'
    let chestRoom = <div className='chestCardRoom'>All Chests</div>

    if (props.currentChest !== undefined) {
        chestImage = './images/chestImages/' + props.currentFolderName + '/' + props.currentChest.vanillaAddress.toString(16).toUpperCase() + '.png'
        chestAltText = props.currentChest.room + ' ' + props.currentChest.replacementReward.reward
        chestRoom = <div className='chestCardRoom'>{props.currentChest.room !== props.prevChestRoom ? props.currentChest.room : ''}</div>
    }

    return (
        <div className='chestImageCard'>
            <img
                className='chestCardImage'
                src={chestImage}
                alt={chestAltText}
            />
            {chestRoom}
        </div>
    )
}

export default ChestImageCard