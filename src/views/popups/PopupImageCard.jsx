import React from 'react'
import { motion } from 'framer-motion'

function PopupImageCard(props) {
    let popupImage = './images/popupImages/' + props.currentFolderName + '/' + props.currentFolderName + '.png'
    let popupAltText = props.currentFolderName + 'All Popups'
    let popupName = <div className='popupCardName'>All Popups</div>
    let isAll = true

    if (props.currentPopup !== undefined) {
        popupImage = './images/popupImages/' + props.currentFolderName + '/' + props.currentPopup.zipID + '.png'
        popupAltText = props.currentPopup.popup + ' ' + props.currentPopup.replacementReward.reward
        popupName = <div className='popupCardName'>{props.currentPopup.popup}</div>
        isAll = false
    }

    return (
        <div className='popupImageCard'>
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: .25, delay: .1 }}
                className='popupCardImage'
                key={popupImage}
                src={popupImage}
                alt={popupAltText}
            />
            <img
                className={`popupCardImageBackground${isAll ? ' all' : ''}`}
                src='./images/popupImages/black.png'
                alt='background'
            />
            {popupName}
        </div>
    )
}

export default PopupImageCard