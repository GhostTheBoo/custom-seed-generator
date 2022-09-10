import { React } from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap'

function AllLevelCard(props) {

	return (
		<Card
			border='dark'
			bg='dark'
			className='levelCard'
			style={{ margin: '10px', textAlign: 'center' }}
		>
			<Card.Body>
				<Row>
					<Col xs={2}>
						<Row><Col as={'h2'}>All Levels</Col></Row>
						<Row>
							<Button
								variant='primary'
								block
								id={100}
								disabled={props.isEditing}
								onClick={() => props.setCurrentLevel(100)}
							>
								{props.isEditing ? 'EDITING...' : 'EDIT'}
							</Button>
						</Row>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	)
}

export default AllLevelCard