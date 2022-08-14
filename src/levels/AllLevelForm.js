import { React } from 'react'
import { Form, Col, Card, Button, Row } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function LevelForm(props) {

    function setCurrentSword(newValue) { props.setCurrentLevelFieldData('sword', newValue) }
    function setCurrentShield(newValue) { props.setCurrentLevelFieldData('shield', newValue) }
    function setCurrentStaff(newValue) { props.setCurrentLevelFieldData('staff', newValue) }

    function setCurrentAP(newValue) { props.setCurrentLevelDifFieldData('standardAPDif', newValue) }
    function setCurrentStrength(newValue) { props.setCurrentLevelDifFieldData('strengthDif', newValue) }
    function setCurrentMagic(newValue) { props.setCurrentLevelDifFieldData('magicDif', newValue) }
    function setCurrentDefense(newValue) { props.setCurrentLevelDifFieldData('defenseDif', newValue) }
    function setCurrentEXP(newValue) { props.setCurrentLevelDifFieldData('expDif', newValue) }

    function setLevelSkip(newValue) { props.setCurrentAllLevelFieldData('levelSkip', newValue) }
    function setLevelOffset(newValue) { props.setCurrentAllLevelFieldData('levelOffset', newValue) }

    function setModifySword() { props.setCurrentAllLevelFieldData('modifySword', !props.currentAllLevelFieldData.modifySword) }
    function setModifyShield() { props.setCurrentAllLevelFieldData('modifyShield', !props.currentAllLevelFieldData.modifyShield) }
    function setModifyStaff() { props.setCurrentAllLevelFieldData('modifyStaff', !props.currentAllLevelFieldData.modifyStaff) }
    function setModifyStrength() { props.setCurrentAllLevelFieldData('modifyStrength', !props.currentAllLevelFieldData.modifyStrength) }
    function setModifyMagic() { props.setCurrentAllLevelFieldData('modifyMagic', !props.currentAllLevelFieldData.modifyMagic) }
    function setModifyDefense() { props.setCurrentAllLevelFieldData('modifyDefense', !props.currentAllLevelFieldData.modifyDefense) }
    function setModifyAP() { props.setCurrentAllLevelFieldData('modifyAP', !props.currentAllLevelFieldData.modifyAP) }
    function setModifyEXP() { props.setCurrentAllLevelFieldData('modifyEXP', !props.currentAllLevelFieldData.modifyEXP) }

    return (
        <Card
            border='dark'
            bg='dark'
            className='levelFormCard'
            style={{ margin: '10px', textAlign: 'center' }}
        >
            <Card.Body>
                <Card.Text as='div'>
                    <Row>
                        <Col xs={11}>
                            <h1>EDITING ALL LEVELS:</h1>
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
                                        id='allLevelSwordSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllLevelFieldData.modifySword}
                                        onChange={() => setModifySword()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        <Icon
                                            style={{ margin: '10px' }}
                                            fileName={'sword'}
                                            type={'row'}
                                        >
                                            {'Sword: '}
                                        </Icon>
                                    </Form.Label>
                                    <Col xs={4}>
                                        <Icon
                                            style={{ margin: '10px' }}
                                            fileName={props.currentLevelFieldData.sword.iconType}
                                            type={'row'}
                                        >
                                            {props.currentLevelFieldData.sword.reward}
                                        </Icon>
                                    </Col>
                                    <Col xs={4}>
                                        <RewardSelector
                                            onReplace={(replacementReward) => setCurrentSword(replacementReward)}
                                        />
                                    </Col>
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Form.Check
                                        id='allLevelShieldSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllLevelFieldData.modifyShield}
                                        onChange={() => setModifyShield()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        <Icon
                                            style={{ margin: '10px' }}
                                            fileName={'shield'}
                                            type={'row'}
                                        >
                                            {'Shield: '}
                                        </Icon>
                                    </Form.Label>
                                    <Col xs={4}>
                                        <Icon
                                            style={{ margin: '10px' }}
                                            fileName={props.currentLevelFieldData.shield.iconType}
                                            type={'row'}
                                        >
                                            {props.currentLevelFieldData.shield.reward}
                                        </Icon>
                                    </Col>
                                    <Col xs={4}>
                                        <RewardSelector
                                            onReplace={(replacementReward) => setCurrentShield(replacementReward)}
                                        />
                                    </Col>
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Form.Check
                                        id='allLevelStaffSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllLevelFieldData.modifyStaff}
                                        onChange={() => setModifyStaff()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        <Icon
                                            style={{ margin: '10px' }}
                                            fileName={'staff'}
                                            type={'row'}
                                        >
                                            {'Staff: '}
                                        </Icon>
                                    </Form.Label>
                                    <Col xs={4}>
                                        <Icon
                                            style={{ margin: '10px' }}
                                            fileName={props.currentLevelFieldData.staff.iconType}
                                            type={'row'}
                                        >
                                            {props.currentLevelFieldData.staff.reward}
                                        </Icon>
                                    </Col>
                                    <Col xs={4}>
                                        <RewardSelector
                                            onReplace={(replacementReward) => setCurrentStaff(replacementReward)}
                                        />
                                    </Col>
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Form.Check
                                        id='allLevelStrengthSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllLevelFieldData.modifyStrength}
                                        onChange={() => setModifyStrength()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Strength:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'LevelStrength'}
                                            size='lg'
                                            type='number'
                                            value={props.currentLevelDifFieldData.strengthDif}
                                            disabled={!props.currentAllLevelFieldData.modifyStrength}
                                            onChange={(e) => setCurrentStrength(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='-255'
                                            max='255'
                                        />
                                    </Col>
                                    <Form.Check
                                        id='allLevelAPSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllLevelFieldData.modifyAP}
                                        onChange={() => setModifyAP()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Standard AP:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'LevelAP'}
                                            size='lg'
                                            type='number'
                                            value={props.currentLevelDifFieldData.standardAPDif}
                                            disabled={!props.currentAllLevelFieldData.modifyAP}
                                            onChange={(e) => setCurrentAP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='-255'
                                            max='255'
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Check
                                        id='allLevelMagicSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllLevelFieldData.modifyMagic}
                                        onChange={() => setModifyMagic()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Magic:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'LevelMagic'}
                                            size='lg'
                                            type='number'
                                            value={props.currentLevelDifFieldData.magicDif}
                                            disabled={!props.currentAllLevelFieldData.modifyMagic}
                                            onChange={(e) => setCurrentMagic(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='-255'
                                            max='255'
                                        />
                                    </Col>
                                    <Col xs={1}></Col>
                                    <Form.Label column='lg' xs={3}>
                                        Critical AP:
                                    </Form.Label>
                                    <Col className='form-label col-form-label col-form-label-lg' xs={2} style={{ textAlign: 'left' }}>
                                        {Math.ceil(props.currentLevelDifFieldData.standardAPDif * 1.5)}
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Check
                                        id='allLevelDefenseSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllLevelFieldData.modifyDefense}
                                        onChange={() => setModifyDefense()}
                                    />
                                    <Form.Label column='lg' xs={3}>
                                        Defense:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'LevelDefense'}
                                            size='lg'
                                            type='number'
                                            value={props.currentLevelDifFieldData.defenseDif}
                                            disabled={!props.currentAllLevelFieldData.modifyDefense}
                                            onChange={(e) => setCurrentDefense(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='-255'
                                            max='255'
                                        />
                                    </Col>
                                    <Col xs={6}></Col>
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Form.Check
                                        id='allLevelEXPSwitch'
                                        type='switch'
                                        style={{ margin: 'auto' }}
                                        checked={props.currentAllLevelFieldData.modifyEXP}
                                        onChange={() => setModifyEXP()}
                                    />
                                    <Form.Label column='lg' xs={4}>
                                        EXP to Next Level:
                                    </Form.Label>
                                    <Col xs={3}>
                                        <Form.Control
                                            name={'LevelEXP'}
                                            size='lg'
                                            type='number'
                                            value={props.currentLevelDifFieldData.expDif}
                                            disabled={!props.currentAllLevelFieldData.modifyEXP}
                                            onChange={(e) => setCurrentEXP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='0xFFFFFFFF'
                                        />
                                    </Col>
                                    <Col xs={4}></Col>
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Col className='form-label col-form-label' style={{ textAlign: 'right' }}>Apply every </Col>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'AllLevelSkip'}
                                            type='number'
                                            value={props.currentAllLevelFieldData.levelSkip}
                                            onChange={(e) => setLevelSkip(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='99'
                                        />
                                    </Col>
                                    <Col className='form-label col-form-label' style={{ textAlign: 'left' }}>level(s) after Level:</Col>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'AllLevelOffset'}
                                            type='number'
                                            value={props.currentAllLevelFieldData.levelOffset}
                                            onChange={(e) => setLevelOffset(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='99'
                                        />
                                    </Col>
                                </Form.Row>
                                <br />
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

export default LevelForm