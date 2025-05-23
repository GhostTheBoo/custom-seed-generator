import React from 'react'

import Icon from '../generic/Icon'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import './styles/SideNavStyles.css'

function SideNav(props) {
    function handleNewPage(newTab) {
        props.onSelect(newTab)
    }

    let tabList = props.pages.map((tab, tabIndex) => {
        return (
            // <OverlayTrigger
            //     key={tabIndex}
            //     placement={'right'}
            //     overlay={
            //         <Tooltip id={`tooltip-${tabIndex}`}>
            //             {tab.title}
            //         </Tooltip>
            //     }
            // >
                <button
                    key={tabIndex}
                    id={tabIndex}
                    className={'pageSelectorItem ' + (parseInt(props.currentTab) === tabIndex ? 'selected' : '')}
                    onClick={(e) => { handleNewPage(e.target.id) }}
                >
                    <Icon
                        fileName={tab.fileName}
                        type={'navbarIcon'}
                        className='tabNavbar'
                    />
                </button>
            // </OverlayTrigger>
        )
    })
    return (<div className='sideNav'>{tabList}</div>)
}
export default SideNav