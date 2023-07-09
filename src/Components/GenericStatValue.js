import React from 'react'

function GenericStatValue(props) {
    let textColor = '#FFFFFF'

    if (props.statName.toLowerCase() === 'strength')
        textColor = '#FF8080'
    else if (props.statName.toLowerCase() === 'magic')
        textColor = '#C080FF'
    else if (props.statName.toLowerCase() === 'defense')
        textColor = '#FFF34B'
    else if (props.statName.toLowerCase() === 'ap')
        textColor = '#63C6F5'

    return (
        <span style={{ fontFamily: 'KHGummi', color: textColor }}>
            {/* {`${props.stat} ${props.children}`} */}
            {props.stat}
            {props.children}
        </span>
    )
}

export default GenericStatValue