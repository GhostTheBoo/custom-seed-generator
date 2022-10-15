import { React } from 'react'

function LevelEXPChange(props) {
    return (
        <div className='levelCardStylizedNumber'>
            <span
                style={{
                    fontFamily: 'KHGummi',
                    color: '#FFF100',
                    textAlign: 'start'
                }}
            >
                {props.exp}
            </span>
        </div>
    )
}

export default LevelEXPChange