import React from 'react'

function LevelStatName(props) {
    let textColor = '#FFFFFF'

    if (props.statName.toLowerCase() === 'strength')
        textColor = '#FF8080'
    else if (props.statName.toLowerCase() === 'magic')
        textColor = '#C080FF'
    else if (props.statName.toLowerCase() === 'defense')
        textColor = '#FFF34B'
    else if (props.statName.toLowerCase() === 'exp' || props.statName.toLowerCase() === 'experience')
        textColor = '#FFFF00'
    // else if (props.statName.toLowerCase() === 'standard ap')
    //     textColor = '#63C6F5'
    else
        textColor = '#63C6F5'

    return (
        <span style={{ color: textColor }}>
            {props.statName}
        </span>
    )
}

export default LevelStatName