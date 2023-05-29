import React from 'react'
import { Offcanvas } from 'react-bootstrap'
// import './PageNavbarStyles.css'
import Icon from '../Components/Icon'

function PageNavbar(props) {
    function handleNewPage(newTab) {
        props.onSelect(newTab)
        props.onHide()
    }

    let tabList = props.pages.map((tab, tabIndex) => {
        return (
            <button
                key={tabIndex}
                id={tabIndex}
                className={'pageSelectorItem ' + (parseInt(props.currentTab) === tabIndex ? 'selected' : '')}
                onClick={(e) => { handleNewPage(e.target.id) }}
            >
                <Icon
                    fileName={tab.fileName}
                    type={'tab'}
                    className='tabNavbar'
                >
                    {tab.title}
                </Icon>
            </button>
        )
    })
    return (
        <Offcanvas
            onMouseLeave={props.onHide}
            show={props.show}
            onHide={props.onHide}
            placement='end'
        >
            <Offcanvas.Body className='pageNavbar'>
                {tabList}
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default PageNavbar