// import React, { useEffect, useRef } from 'react'
import './CreditsList.css'

function CreditsList() {
    let creditData = [
        {
            name: 'Televo',
            contribution: 'ClutchArtist'
        },
        {
            name: 'Num',
            contribution: 'OriginalSquad'
        },
        {
            name: 'Corey',
            contribution: 'OriginalSquad'
        },
        {
            name: 'Cernunnos',
            contribution: 'OriginalSquad'
        },
        {
            name: 'Flutterdark',
            contribution: 'OriginalSquad'
        },
        {
            name: 'Sora-MMK',
            contribution: 'OriginalSquad'
        },
        {
            name: 'SPTKira',
            contribution: 'OriginalSquad'
        },
        {
            name: 'ChocoboXIII',
            contribution: 'OriginalSquad'
        },
        {
            name: 'Expelsword',
            contribution: 'BonafideBadass'
        },
        {
            name: 'thridi/tehSunBro',
            contribution: 'BonafideBadass'
        },
        {
            name: 'Wowowood',
            contribution: 'BonafideBadass'
        },
        {
            name: 'Valaxor',
            contribution: 'CoreCreator'
        },
        {
            name: 'Sonicshadowsilver2',
            contribution: 'CoreCreator'
        },
        {
            name: 'Thundrio',
            contribution: 'CoreCreator'
        },
        {
            name: 'Tommadness',
            contribution: 'CoreCreator'
        },
        {
            name: 'Sirius902',
            contribution: 'CoreCreator'
        },
        {
            name: 'DA',
            contribution: 'CoreCreator'
        },
        {
            name: 'Alios',
            contribution: 'CoreCreator'
        },
        {
            name: 'Denhonater',
            contribution: 'CoreCreator'
        },
        {
            name: 'TopazTK',
            contribution: 'CoreCreator'
        },
        {
            name: 'Shananas',
            contribution: 'CoreCreator'
        },
        {
            name: 'Sirius902',
            contribution: 'CoreCreator'
        },
        {
            name: 'Kayya',
            contribution: 'CoreCreator'
        },
        {
            name: 'equations19',
            contribution: 'CoreCreator'
        },
        {
            name: 'ZakTheRobot',
            contribution: 'CoreCreator'
        },
        {
            name: 'MainMemory',
            contribution: 'CoreCreator'
        },
        {
            name: 'Delta-47',
            contribution: 'CoreCreator'
        },
        {
            name: 'JSmartee',
            contribution: 'CoreCreator'
        },
        {
            name: 'Sirius902',
            contribution: 'CoreCreator'
        }
    ]

    let creditItemList = creditData.map(credit => {
        return (
            <li className='credit'>
                <div className={credit.contribution}>{credit.name}</div>
                {/* <div style={{ flexGrow: '1' }} />
                <div className='creditContribution'>{credit.contribution}</div> */}
            </li>
        )
    })

    return (
        <ul className='creditsList'>
            {creditItemList}
        </ul>
    )
}

export default CreditsList









