import React from 'react'
import './KoFi.css'
import { Button } from 'react-bootstrap'

function KoFi(props) {
    const { color, id, label } = props
    return (
        <Button
            title={label}
            className='kofi-button'
            style={{ backgroundColor: color }}
            href={'https://ko-fi.com/' + id}
            target='_blank'
            rel='noopener noreferrer'
        >
            <span className='kofitext'>
                <img
                    src='https://ko-fi.com/img/cup-border.png'
                    className='kofiimg'
                    alt='Ko-Fi button'
                />
                {label}
            </span>
        </Button>
    )
}

export default KoFi