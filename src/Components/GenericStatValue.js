import React from 'react'

function GenericStatValue(props) {
    let textColor = '#FFFFFF'

    if (props.statName.toLowerCase().includes('str'))
        textColor = '#FF8080'
    else if (props.statName.toLowerCase().includes('mag'))
        textColor = '#C080FF'
    else if (props.statName.toLowerCase().includes('def'))
        textColor = '#FFF34B'
    else if (props.statName.toLowerCase().includes('ap'))
        textColor = '#63C6F5'

    return (
        <span
            className={props.className !== undefined ? props.className : ''}
            style={{ fontFamily: 'KHGummi', color: textColor }}
        >
            {/* {`${props.stat} ${props.children}`} */}
            {props.stat}
            {props.children}
        </span>
    )
}

export default GenericStatValue