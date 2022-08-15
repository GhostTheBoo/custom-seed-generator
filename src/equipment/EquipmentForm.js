import { React } from 'react'
import { Form, Col, Card, Button, Row, Image } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function EquipmentForm(props) {
    let equipmentImage = require(`../assets/equipmentImages/${props.currentFolderName}/${props.equipment.baseAddress.toString(16).toUpperCase()}.png`)

    function setCurrentAbility(newValue) { props.setCurrentEquipmentFieldData('ability', newValue) }
    function setCurrentAP(newValue) { props.setCurrentEquipmentFieldData('currentAP', newValue) }
    function setCurrentStrength(newValue) { props.setCurrentEquipmentFieldData('currentStrength', newValue) }
    function setCurrentMagic(newValue) { props.setCurrentEquipmentFieldData('currentMagic', newValue) }
    function setCurrentDefense(newValue) { props.setCurrentEquipmentFieldData('currentDefense', newValue) }
    function setCurrentFire(newValue) { props.setCurrentEquipmentFieldData('currentFire', newValue) }
    function setCurrentBlizzard(newValue) { props.setCurrentEquipmentFieldData('currentBlizzard', newValue) }
    function setCurrentThunder(newValue) { props.setCurrentEquipmentFieldData('currentThunder', newValue) }
    function setCurrentPhysical(newValue) { props.setCurrentEquipmentFieldData('currentPhysical', newValue) }
    function setCurrentDark(newValue) { props.setCurrentEquipmentFieldData('currentDark', newValue) }
    function setCurrentLight(newValue) { props.setCurrentEquipmentFieldData('currentLight', newValue) }
    function setCurrentUniversal(newValue) { props.setCurrentEquipmentFieldData('currentUniversal', newValue) }

    return (
        <Card
            border='dark'
            bg='dark'
            className='equipmentFormCard'
            style={{ margin: '10px', textAlign: 'center' }}
        >
            <Card.Body>
                <Card.Text as='div'>
                    <Row>
                        <Col xs={11}>
                            <h1>EDITING {props.equipment.name.toUpperCase()}:</h1>
                        </Col>
                        <Col xs={1}>
                            <button
                                className='close'
                                onClick={() => props.closeFormCard(-1)}
                            >
                                x
                            </button>
                        </Col>
                    </Row>
                    <Image
                        // variant='top'
                        src={equipmentImage.default}
                        height='180rem'
                        width='180rem'
                    />
                    <hr />
                    <Row>
                        <Col>
                            <Form onSubmit={(e) => e.preventDefault()}>
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        Ability:
                                    </Form.Label>
                                    <Col xs={4}>
                                        <Icon
                                            style={{ margin: '10px' }}
                                            fileName={props.currentEquipmentFieldData.ability.iconType}
                                            type={'row'}
                                        >
                                            {props.currentEquipmentFieldData.ability.reward}
                                        </Icon>
                                    </Col>
                                    <Col xs={4}>
                                        <RewardSelector
                                            onReplace={(replacementReward) => setCurrentAbility(replacementReward)}
                                        />
                                    </Col>
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        AP:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentAP'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentAP}
                                            onChange={(e) => setCurrentAP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                    <Form.Label column='lg' xs={4}>
                                        Magic:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentMagic'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentMagic}
                                            onChange={(e) => setCurrentMagic(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        Strength:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentStrength'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentStrength}
                                            onChange={(e) => setCurrentStrength(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                    <Form.Label column='lg' xs={4}>
                                        Defense:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentDefense'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentDefense}
                                            onChange={(e) => setCurrentDefense(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        Fire Resistance:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentFire'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentFire}
                                            onChange={(e) => setCurrentFire(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                    <Form.Label column='lg' xs={4}>
                                        Physical Resistance:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentPhysical'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentPhysical}
                                            onChange={(e) => setCurrentPhysical(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        Blizzard Resistance:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentBlizzard'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentBlizzard}
                                            onChange={(e) => setCurrentBlizzard(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                    <Form.Label column='lg' xs={4}>
                                        Light Resistance:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentLight'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentLight}
                                            onChange={(e) => setCurrentLight(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        Thunder Resistance:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentThunder'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentThunder}
                                            onChange={(e) => setCurrentThunder(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                    <Form.Label column='lg' xs={4}>
                                        Universal Resistance:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentUniversal'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentUniversal}
                                            onChange={(e) => setCurrentUniversal(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        Dark Resistance:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'EquipmentDark'}
                                            size='lg'
                                            type='number'
                                            value={props.currentEquipmentFieldData.currentDark}
                                            onChange={(e) => setCurrentDark(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                </Form.Row>
                                <hr />
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
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default EquipmentForm