import React from 'react'
import Marquee from "react-fast-marquee"

import './CreditsListStyles.css'

function CreditsList() {
    let creditData = [
        { name: 'Televo', contribution: 'ClutchArtist' },
        { name: 'Num', contribution: 'OriginalSquad' },
        { name: 'Corey', contribution: 'OriginalSquad' },
        { name: 'Cernunnos', contribution: 'OriginalSquad' },
        { name: 'Flutterdark', contribution: 'OriginalSquad' },
        { name: 'Sora-MMK', contribution: 'OriginalSquad' },
        { name: 'SPTKira', contribution: 'OriginalSquad' },
        { name: 'ChocoboXIII', contribution: 'OriginalSquad' },
        { name: 'Expelsword', contribution: 'BonafideBadass' },
        { name: 'thridi/tehSunBro', contribution: 'BonafideBadass' },
        { name: 'Wowowood', contribution: 'BonafideBadass' },
        { name: 'Zantetzuken', contribution: 'BonafideBadass' },
        { name: 'TheNja09', contribution: 'BonafideBadass' },
        { name: 'Valaxor', contribution: 'CoreCreator' },
        { name: 'Sonicshadowsilver2', contribution: 'CoreCreator' },
        { name: 'Thundrio', contribution: 'CoreCreator' },
        { name: 'Tommadness', contribution: 'CoreCreator' },
        { name: 'desa', contribution: 'CoreCreator' },
        { name: 'DA', contribution: 'CoreCreator' },
        { name: 'Alios', contribution: 'CoreCreator' },
        { name: 'Denhonater', contribution: 'CoreCreator' },
        { name: 'TopazTK', contribution: 'CoreCreator' },
        { name: 'Shananas', contribution: 'CoreCreator' },
        { name: 'Sirius902', contribution: 'CoreCreator' },
        { name: 'Kayya', contribution: 'CoreCreator' },
        { name: 'equations19', contribution: 'CoreCreator' },
        { name: 'ZakTheRobot', contribution: 'CoreCreator' },
        { name: 'MainMemory', contribution: 'CoreCreator' },
        { name: 'Delta-47', contribution: 'CoreCreator' },
        { name: 'JSmartee', contribution: 'CoreCreator' },
        { name: 'Zurph', contribution: 'CoreCreator' }
    ]

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    let creditItemList = creditData.map(credit => {
        return (
            <li key={'credit' + credit.name} className='credit'>
                <div className={credit.contribution}>{credit.name}</div>
            </li>
        )
    })

    return (
        <div className='informationBox'>
            <div className='fadeBox' />
            <div className='creditsLabelGroup'>
                <div className='creditsLabel'>Thank You!</div>
                <div className='labelAfterTriangle' />
                <div className='labelAfterTail' />
            </div>
            <div className='creditList'>
                <Marquee
                    speed={75}
                    gradientColor={[34, 34, 34]}
                    gradientWidth={0}
                >
                    {shuffle(creditItemList).slice()}
                </Marquee>
            </div>
        </div>
    )
}

export default React.memo(CreditsList, () => { return true })