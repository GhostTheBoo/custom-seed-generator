import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'

function StartingStatsForm(props) {
    function setCurrentHP(newValue) { props.setCurrentStartingStatusFieldData('currentHP', newValue) }
    function setCurrentMP(newValue) { props.setCurrentStartingStatusFieldData('currentMP', newValue) }
    function setCurrentAP(newValue) { props.setCurrentStartingStatusFieldData('currentAP', newValue) }
    function setCurrentArmor(newValue) { props.setCurrentStartingStatusFieldData('currentArmor', newValue) }
    function setCurrentAccessory(newValue) { props.setCurrentStartingStatusFieldData('currentAccessory', newValue) }
    function setCurrentItem(newValue) { props.setCurrentStartingStatusFieldData('currentItem', newValue) }

    let numberStyle = {
        fontFamily: 'KHGummi',
        color: '#FFF100',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Row>
                <Form.Label column='lg' xs={3}>
                    HP:
                </Form.Label>
                <Col xs={3} style={numberStyle}>
                    {props.startingStats.hp}
                </Col>
                <Col xs={6}>
                    <Form.Control
                        name={'StartingHP'}
                        size='lg'
                        type='number'
                        value={props.startingStatusFieldData.currentHP}
                        onChange={(e) => setCurrentHP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                        min='0'
                        max='255'
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Form.Label column='lg' xs={3}>
                    MP:
                </Form.Label>
                <Col xs={3} style={numberStyle}>
                    {props.startingStats.mp}
                </Col>
                <Col xs={6}>
                    <Form.Control
                        name={'StartingMP'}
                        size='lg'
                        type='number'
                        value={props.startingStatusFieldData.currentMP}
                        onChange={(e) => setCurrentMP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                        min='0'
                        max='255'
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Form.Label column='lg' xs={3}>
                    AP:
                </Form.Label>
                <Col xs={3} style={numberStyle}>
                    {props.startingStats.ap}
                </Col>
                <Col xs={6}>
                    <Form.Control
                        name={'StartingAP'}
                        size='lg'
                        type='number'
                        value={props.startingStatusFieldData.currentAP}
                        onChange={(e) => setCurrentAP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                        min='0'
                        max='255'
                    />
                </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Label column='lg' xs={3}>
                    Armor Slots:
                </Form.Label>
                <Col xs={3} style={numberStyle}>
                    {props.startingStats.armorSlots}
                </Col>
                <Col xs={6}>
                    <Form.Control
                        name={'StartingArmor'}
                        size='lg'
                        type='number'
                        value={props.startingStatusFieldData.currentArmor}
                        onChange={(e) => setCurrentArmor(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                        min='0'
                        max='19'
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Form.Label column='lg' xs={3}>
                    Accessory Slots:
                </Form.Label>
                <Col xs={3} style={numberStyle}>
                    {props.startingStats.accessorySlots}
                </Col>
                <Col xs={6}>
                    <Form.Control
                        name={'StartingAccessory'}
                        size='lg'
                        type='number'
                        value={props.startingStatusFieldData.currentAccessory}
                        onChange={(e) => setCurrentAccessory(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                        min='0'
                        max='19'
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Form.Label column='lg' xs={3}>
                    Item Slots:
                </Form.Label>
                <Col xs={3} style={numberStyle}>
                    {props.startingStats.itemSlots}
                </Col>
                <Col xs={6}>
                    <Form.Control
                        name={'StartingItem'}
                        size='lg'
                        type='number'
                        value={props.startingStatusFieldData.currentItem}
                        onChange={(e) => setCurrentItem(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                        min='0'
                        max='19'
                    />
                </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <Col>
                    <Button
                        variant='secondary'
                        block
                        onClick={() => props.handleVanilla(props.equipment)}
                    >
                        VANILLA
                    </Button>
                </Col>
                <Col>
                    <Button
                        block
                        onClick={() => props.handleReplace(props.equipment, props.currentEquipmentFieldData)}
                    >
                        CONFIRM
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    )
}

export default StartingStatsForm