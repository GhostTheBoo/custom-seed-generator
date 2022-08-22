import React from 'react'
import { ListGroup, Row, Col, Form } from 'react-bootstrap'

function CheatListGroup(props) {
    let listGroup = props.dataList.map((data, index) => {
        return (
            <ListGroup.Item
                variant={data.isActive ? 'success' : 'dark'}
                key={props.cheatType + index}
                id={props.cheatType + index}
            >
                <Row>
                    <Col xs={1}>
                        <Form.Check
                            id={'cheatActiveSwitch' + props.cheatType + index}
                            type='switch'
                            style={{ margin: 'auto' }}
                            checked={data.isActive}
                            onChange={() => props.toggleActiveCheat(props.dataList, index)}
                        />
                    </Col>
                    <Col xs={11}>
                        {data.name}
                    </Col>
                </Row>
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