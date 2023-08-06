import React from 'react'

function LevelStatName(props) {
    let textColor = '#FFFFFF'

    if (props.statName.toLowerCase().includes('str'))
        textColor = '#FF8080'
    else if (props.statName.toLowerCase().includes('mag'))
        textColor = '#C080FF'
    else if (props.statName.toLowerCase().includes('def'))
        textColor = '#FFF34B'
    else if (props.statName.toLowerCase().includes('exp'))
        textColor = '#FFFF00'
    // else if (props.statName.toLowerCase() === 'standard ap')
    //     textColor = '#63C6F5'
    else
        textColor = '#63C6F5'

    return (
        <span
            className={props.className !== undefined ? props.className : ''}
            style={{ color: textColor }}
        >
            {props.statName}
        </span>
    )
}

export default LevelStatName