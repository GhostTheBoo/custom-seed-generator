import { React } from 'react'

function LevelStatChange(props) {
    let textColor = '#FFFFFF'
    let prefix = ''
    if (props.stat > 0) {
        textColor = '#00F0FA'
        prefix = '+' + props.stat
    }
    else if (props.stat < 0) {
        textColor = '#FA0000'
        prefix = props.stat
    }
    return (
        <div className='levelCardStylizedNumber'>
            <span
                style={{
                    fontFamily: 'KHGummi',
                    color: textColor,
                    textAlign: 'start'
                }}
            >
                {prefix}
            </span>
        </div>
    )
}

export default LevelStatChange