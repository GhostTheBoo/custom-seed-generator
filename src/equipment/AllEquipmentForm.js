import { React } from 'react'
import { Form, Col, Card, Button, Row } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function AllEquipmentForm(props) {
    function getfullEquipmentTypeText(equipmentType) {
        if (equipmentType === 'acc') return 'Accessories'
        if (equipmentType === 'alw') return 'Ally Weapons'
        if (equipmentType === 'arm') return 'Armor'
        if (equipmentType === 'dst') return 'Donald Staves'
        if (equipmentType === 'gsh') return 'Goofy Shields'
        if (equipmentType === 'key') return 'Keyblades'
    }

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

    function setModifyAbility() { props.setCurrentAllEquipmentFieldData('modifyAbility', !props.currentAllEquipmentFieldData.modifyAbility) }
    function setModifyAP() { props.setCurrentAllEquipmentFieldData('modifyAP', !props.currentAllEquipmentFieldData.modifyAP) }
    function setModifyStrength() { props.setCurrentAllEquipmentFieldData('modifyStrength', !props.currentAllEquipmentFieldData.modifyStrength) }
    function setModifyMagic() { props.setCurrentAllEquipmentFieldData('modifyMagic', !props.currentAllEquipmentFieldData.modifyMagic) }
    function setModifyDefense() { props.setCurrentAllEquipmentFieldData('modifyDefense', !props.currentAllEquipmentFieldData.modifyDefense) }
    function setModifyFire() { props.setCurrentAllEquipmentFieldData('modifyFire', !props.currentAllEquipmentFieldData.modifyFire) }
    function setModifyBlizzard() { props.setCurrentAllEquipmentFieldData('modifyBlizzard', !props.currentAllEquipmentFieldData.modifyBlizzard) }
    function setModifyThunder() { props.setCurrentAllEquipmentFieldData('modifyThunder', !props.currentAllEquipmentFieldData.modifyThunder) }
    function setModifyDark() { props.setCurrentAllEquipmentFieldData('modifyDark', !props.currentAllEquipmentFieldData.modifyDark) }
    function setModifyPhysical() { props.setCurrentAllEquipmentFieldData('modifyPhysical', !props.currentAllEquipmentFieldData.modifyPhysical) }
    function setModifyLight() { props.setCurrentAllEquipmentFieldData('modifyLight', !props.currentAllEquipmentFieldData.modifyLight) }
    function setModifyUniversal() { props.setCurrentAllEquipmentFieldData('modifyUniversal', !props.currentAllEquipmentFieldData.modifyUniversal) }

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
                            <h1>EDITING ALL {getfullEquipmentTypeText(props.currentFolderName).toUpperCase()}:</h1>
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
                    <hr />
                    <Row>
                        <Col>
                            <Form onSubmit={(e) => e.preventDefault()}>
                                <Form.Row>
                                    <Form.Check
                                        id='allEquipmentAbilitySwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyAbility}
                                        onChange={() => setModifyAbility()}
                                    />
                                    <Form.Label column='lg' xs={3}>
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
                                    <Form.Check
                                        id='allEquipmentAPSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyAP}
                                        onChange={() => setModifyAP()}
                                    />
                                    <Form.Label column='lg' xs={3}>
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
                                    <Form.Check
                                        id='allEquipmentMagicSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyMagic}
                                        onChange={() => setModifyMagic()}
                                    />
                                    <Form.Label column='lg' xs={3}>
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
                                    <Form.Check
                                        id='allEquipmentStrengthSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyStrength}
                                        onChange={() => setModifyStrength()}
                                    />
                                    <Form.Label column='lg' xs={3}>
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
                                    <Form.Check
                                        id='allEquipmentDefenseSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyDefense}
                                        onChange={() => setModifyDefense()}
                                    />
                                    <Form.Label column='lg' xs={3}>
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
                                    <Form.Check
                                        id='allEquipmentFireSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyFire}
                                        onChange={() => setModifyFire()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Fire:
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
                                    <Form.Check
                                        id='allEquipmentPhysicalSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyPhysical}
                                        onChange={() => setModifyPhysical()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Physical:
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
                                    <Form.Check
                                        id='allEquipmentBlizzardSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyBlizzard}
                                        onChange={() => setModifyBlizzard()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Blizzard:
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
                                    <Form.Check
                                        id='allEquipmentLightSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyLight}
                                        onChange={() => setModifyLight()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Light:
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
                                    <Form.Check
                                        id='allEquipmentThunderSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyThunder}
                                        onChange={() => setModifyThunder()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Thunder:
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
                                    <Form.Check
                                        id='allEquipmentUniversalSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyUniversal}
                                        onChange={() => setModifyUniversal()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Universal:
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
                                    <Form.Check
                                        id='allEquipmentDarkSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllEquipmentFieldData.modifyDark}
                                        onChange={() => setModifyDark()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Dark:
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
                                    <Col xs={6} />
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Col>
                                        <Button
                                            variant='secondary'
                                            block
                                            onClick={() => props.handleVanilla()}
                                        >
                                            VANILLA
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            block
                                            onClick={() => props.handleReplace()}
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

export default AllEquipmentForm