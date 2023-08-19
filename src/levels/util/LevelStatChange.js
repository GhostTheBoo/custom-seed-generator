import React from 'react'

function LevelStatChange(props) {
    let textColor = '#FFFFFF'
    let prefix = ''
    let crit = ''
    if (props.stat > 0) {
        textColor = '#00F0FA'
        prefix = '+' + props.stat
    }
    else if (props.stat < 0) {
        textColor = '#FA0000'
        prefix = props.stat
    }
    if (props.children !== undefined) {
        crit += ' ['
        if (props.children > 0) {
            textColor = '#00F0FA'
            crit += '+' + props.children
        }
        else if (props.children < 0) {
            textColor = '#FA0000'
            crit += props.children
        }
        crit += ']'
    }
    return (
        <span
            style={{
                fontFamily: 'KHGummi',
                color: textColor,
                textAlign: 'start'
            }}
        >
            {prefix}
            {crit}
        </span>
    )
}

export default LevelStatChange