import React from 'react'
import { ListGroup, Form } from 'react-bootstrap'

function CheatListGroup(props) {
    let listGroup = props.dataList.map((data, index) => {
        return (
            <ListGroup.Item
                variant={data.isActive ? 'success' : 'dark'}
                key={props.cheatType + index}
                id={props.cheatType + index}
            >
                <div className='cheatListItem'>
                    <Form.Check
                        id={'cheatActiveSwitch' + props.cheatType + index}
                        type='switch'
                        style={{ margin: 'auto' }}
                        checked={data.isActive}
                        onChange={() => props.toggleActiveCheat(props.dataList, index)}
                    />
                    <div>
                        {data.name}
                    </div>
                </div>
            </ListGroup.Item>
        )
    })

    return (
        <ListGroup
            className='selectorList'
            style={{
                fontSize: '15px',
                overflowY: 'auto',
                height: '45rem'
            }}
        >
            {listGroup}
        </ListGroup>
    )
}

export default CheatListGroup