import React from 'react'
import './styles/PageNavbarStyles.css'
import Icon from '../Components/Icon'

function NavbarIcon(props) {
    // let text = props.title === undefined ? '' : props.title
    return (
        <button
            onMouseEnter={props.showNavbar}
            onClick={props.showNavbar}
            className='pageNavbarIcon'
        >
            <Icon
                fileName={props.fileName}
                type={'navbarIcon'}
            >
                {props.title}
            </Icon>
        </button>
    )
}
export default NavbarIcon