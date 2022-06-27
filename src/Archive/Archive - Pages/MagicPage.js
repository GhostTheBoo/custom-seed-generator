import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

import { magicCostsData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import MagicTable from '../Tables/MagicTable.js'

function MagicPage(props) {
	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col>
						<GenericSelect
							class='magic'
							selector={'Magic Type'}
							itemList={magicCostsData}
							name={'currentMagicType'}
							currentItem={props.fieldData.currentMagicType}
							onChange={props.handleMagicTypeChange}
						/>
					</Col>
					<Col>
						<Form.Group controlId='currentCost'>
							<Form.Label column='sm'>Cost: </Form.Label>
							<Form.Control
								size='sm'
								name='currentCost'
								type='number'
								value={props.fieldData.currentCost}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
			<MagicTable
				currentMagicType={magicCostsData[props.fieldData.currentMagicType]}
				abilities={props.magicData}
				onRowCheck={props.onRowCheck}
				onCheckAll={props.onCheckAll}
				selectAll={props.fieldData.selectAll}
			/>
			<Container fluid>
				<Row xs='4'>
					<Col xl='2'>
						<Button
							variant='outline-light'
							block
							name='replaceButton'
							onClick={props.onClick}
						>
							REPLACE
							</Button>
					</Col>
					<Col xl='2'>
						<Button
							variant='outline-light'
							block
							name='vanillaButton'
							onClick={props.onClick}
						>
							VANILLA
							</Button>
					</Col>
					{props.children}
				</Row>
			</Container>
		</div>
	)
}

export default MagicPage