import { React } from 'react'
import { Form, Col, Card, Button, Row } from 'react-bootstrap'

import RewardSelector from '../rewards/RewardSelector'
import Icon from '../Components/Icon'

function LevelForm(props) {

    function setCurrentSword(newValue) { props.setCurrentLevelFieldData('sword', newValue) }
    function setCurrentShield(newValue) { props.setCurrentLevelFieldData('shield', newValue) }
    function setCurrentStaff(newValue) { props.setCurrentLevelFieldData('staff', newValue) }
    function setCurrentAP(newValue) { props.setCurrentLevelFieldData('currentAP', newValue) }
    function setCurrentStrength(newValue) { props.setCurrentLevelFieldData('currentStrength', newValue) }
    function setCurrentMagic(newValue) { props.setCurrentLevelFieldData('currentMagic', newValue) }
    function setCurrentDefense(newValue) { props.setCurrentLevelFieldData('currentDefense', newValue) }
    function setCurrentEXP(newValue) {
        let modifiedNum = Math.max(props.previousLevel.replacementEXP, Math.min(0xFFFFFFFF, Number(parseInt(newValue))))
        props.setCurrentLevelFieldData('currentEXP', modifiedNum)
    }
    function setCurrentEXPChange(newValue) {
        let prevEXP = props.previousLevel.replacementEXP
        props.setCurrentLevelFieldData('currentEXP', Math.max(prevEXP, Math.min(0xFFFFFFFF, Number(parseInt(newValue + prevEXP)))))
    }

    function createStylizedStatChange(statChange) {
        let textColor = statChange >= 0 ? '#00F0FA' : '#FA0000'
        let prefix = statChange >= 0 ? '+' : ''
        return (
            <span
                style={{
                    fontFamily: 'KHGummi',
                    color: textColor,
                    textAlign: 'start'
                }}
            >
                {prefix + statChange}
            </span>
        )
    }
    function createStylizedEXPChange(statChange) {
        return (
            <span
                style={{
                    fontFamily: 'KHGummi',
                    color: '#FFF100',
                    textAlign: 'start'
                }}
            >
                {statChange}
            </span>
        )
    }

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
                            <h1>EDITING LEVEL {props.level.level}:</h1>
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
                                    <Form.Label column='lg' xs={4}>
                                        <Icon
                                            style={{ margin: '10px' }}
                                            fileName={'sword'}
                                            type={'row'}
                                        >
                                            {'Sword Reward: '}
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
                                    <Form.Label column='lg' xs={4}>
                                        <Icon
                                            style={{ margin: '10px' }}
                                            fileName={'shield'}
                                            type={'row'}
                                        >
                                            {'Shield Reward: '}
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
                                    <Form.Label column='lg' xs={4}>
                                        <Icon
                                            style={{ margin: '10px' }}
                                            fileName={'staff'}
                                            type={'row'}
                                        >
                                            {'Staff Reward: '}
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
                                    <Form.Label column='lg' xs={4}>
                                        Strength:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'LevelStrength'}
                                            size='lg'
                                            type='number'
                                            value={props.currentLevelFieldData.currentStrength}
                                            onChange={(e) => setCurrentStrength(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                    <Col className='form-label col-form-label col-form-label-lg' xs={5}>{createStylizedStatChange(props.currentLevelDifFieldData.strengthDif)}</Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        Magic:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'LevelMagic'}
                                            size='lg'
                                            type='number'
                                            value={props.currentLevelFieldData.currentMagic}
                                            onChange={(e) => setCurrentMagic(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                    <Col className='form-label col-form-label col-form-label-lg' xs={5}>{createStylizedStatChange(props.currentLevelDifFieldData.magicDif)}</Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        Defense:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'LevelDefense'}
                                            size='lg'
                                            type='number'
                                            value={props.currentLevelFieldData.currentDefense}
                                            onChange={(e) => setCurrentDefense(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                    <Col className='form-label col-form-label col-form-label-lg' xs={5}>{createStylizedStatChange(props.currentLevelDifFieldData.defenseDif)}</Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        Standard AP:
                                    </Form.Label>
                                    <Col xs={2}>
                                        <Form.Control
                                            name={'LevelAP'}
                                            size='lg'
                                            type='number'
                                            value={props.currentLevelFieldData.currentAP}
                                            onChange={(e) => { setCurrentAP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value))))) }}
                                            min='0'
                                            max='255'
                                        />
                                    </Col>
                                    <Col className='form-label col-form-label col-form-label-lg' xs={5}>{createStylizedStatChange(props.currentLevelDifFieldData.standardAPDif)}</Col>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        Critical AP:
                                    </Form.Label>
                                    <Col className='form-label col-form-label col-form-label-lg' xs={2} style={{ textAlign: 'left' }}>
                                        {props.currentLevelFieldData.currentCriticalAP}
                                    </Col>
                                    <Col className='form-label col-form-label col-form-label-lg' xs={5}>{createStylizedStatChange(props.currentLevelDifFieldData.criticalAPDif)}</Col>
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Form.Label column='lg' xs={4}>
                                        EXP to Next Level:
                                    </Form.Label>
                                    <Col xs={3}>
                                        <Form.Control
                                            name={'LevelEXP'}
                                            size='lg'
                                            type='number'
                                            value={props.currentLevelFieldData.currentEXP}
                                            onChange={(e) => setCurrentEXP(Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                                            min='0'
                                            max='0xFFFFFFFF'
                                        />
                                    </Col>
                                    <Col className='form-label col-form-label col-form-label-lg' xs={5}>{createStylizedEXPChange(props.currentLevelDifFieldData.expDif)}</Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col><Button onClick={() => setCurrentEXPChange(props.currentLevelDifFieldData.expDif / 5)} block variant='info'>1/5</Button></Col>
                                    <Col><Button onClick={() => setCurrentEXPChange(props.currentLevelDifFieldData.expDif / 3)} block variant='info'>1/3</Button></Col>
                                    <Col><Button onClick={() => setCurrentEXPChange(props.currentLevelDifFieldData.expDif / 2)} block variant='info'>1/2</Button></Col>
                                    <Col><Button onClick={() => setCurrentEXP(props.level.vanillaEXP)} block variant='secondary'>Vanilla</Button></Col>
                                    <Col><Button onClick={() => setCurrentEXPChange(props.currentLevelDifFieldData.expDif * 2)} block variant='info'>2x</Button></Col>
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Col>
                                        <Button
                                            variant='secondary'
                                            block
                                            onClick={() => props.handleVanilla(props.level)}
                                        >
                                            VANILLA
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            block
                                            onClick={() => props.handleReplace(props.level, props.currentLevelFieldData)}
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