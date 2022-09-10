import { React } from 'react'
import { Form, Col, Card, Button, Row, Image } from 'react-bootstrap'

function MagicForm(props) {
	let magicImage = './images/' + props.magic.pathName + '.png'

    let fieldRowList = props.magic.abilities.map((ability, abilityIndex) => {
        return <Form.Row key={'magicFormRow' + abilityIndex} >
            <Form.Label column='lg' xs={5}>
                {ability.ability}:
            </Form.Label>
            <Col xs={6}>
                <Form.Control
                    name={'abilityCostField' + abilityIndex}
                    size='lg'
                    type='number'
                    value={props.currentCostFieldData[abilityIndex]}
                    onChange={(e) => props.setCurrentCostFieldData(abilityIndex, Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='0xFFFFFFFF'
                />
            </Col>
        </Form.Row>
    })
    return (
        <Card
            border='dark'
            bg='dark'
            className='magicFormCard'
            style={{ margin: '10px', textAlign: 'center' }}
        >
            <Card.Body>
                <Card.Text as='div'>
                    <Row>
                        <Col xs={11}>
                            <h2>EDITING</h2>
                            <h2>{props.magic.magicType.toUpperCase()}:</h2>
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
                        src={magicImage}
                        height='190rem'
                        width='190rem'
                    />
                    <hr />
                    <Row>
                        <Col>
                            <Form onSubmit={(e) => e.preventDefault()}>
                                {fieldRowList}
                                <hr />
                                <Form.Row>
                                    <Col>
                                        <Button
                                            variant='secondary'
                                            block
                                            onClick={() => props.handleVanilla('vanilla')}
                                        >
                                            VANILLA
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            block
                                            onClick={() => props.handleReplace('replace')}
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

export default MagicForm