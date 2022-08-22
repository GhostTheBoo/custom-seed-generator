import { React } from 'react'
import { Row, Container, Col } from 'react-bootstrap'

import CheatListGroup from './CheatListGroup'

function CheatPage(props) {
    function toggleActiveCheat(allCheatData, setAllCheatData, cheatIndex) {
        let newCheatData = allCheatData.map((cheat, index) => {
            if (index === cheatIndex) return cheat.toggleActive()
            return cheat
        })
        setAllCheatData(newCheatData)
    }
    return (
        <Container fluid>
            <Row>
                <Col xs={10} />
                <Col xs={2} style={{ paddingTop: '1rem' }}>
                    {props.children}
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    <h1 style={{ margin: '10px', textAlign: 'center' }}>Zip Cheats</h1>
                </Col>
                <Col xs={4}>
                    <h1 style={{ margin: '10px', textAlign: 'center' }}>Pnach Cheats</h1>
                </Col>
                <Col xs={4}>
                    <h1 style={{ margin: '10px', textAlign: 'center' }}>Lua Cheats</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    {/* <CheatListGroup
                        dataList={props.zipCheatData}
                        toggleActiveCheat={(cheatIndex) => toggleActiveCheat(props.zipCheatData, props.setAllZipCheats, cheatIndex)}
                    /> */}
                </Col>
                <Col xs={4}>
                    <CheatListGroup
                        dataList={props.pnachCheatData}
                        cheatType={'pnach'}
                        toggleActiveCheat={(allCheats, cheatIndex) => toggleActiveCheat(allCheats, props.setAllPnachCheats, cheatIndex)}
                    />
                </Col>
                <Col xs={4}>
                    <CheatListGroup
                        dataList={props.luaCheatData}
                        cheatType={'lua'}
                        toggleActiveCheat={(allCheats, cheatIndex) => toggleActiveCheat(allCheats, props.setAllLuaCheats, cheatIndex)}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default CheatPage