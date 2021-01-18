import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { magicCostsData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import MagicTable from '../Tables/MagicTable.js'

function MagicPage(props) {
	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<GenericSelect
						class='magic'
						selector={'Magic Type'}
						itemList={magicCostsData}
						name={'currentMagicType'}
						currentItem={props.magicData.currentMagicType}
						onChange={props.handleMagicTypeChange}
					/>
				</Form.Row>
				<Form.Row>
					<Col xs='auto'>
						<Form.Group controlId='currentCost'>
							<Form.Label column='sm'>Cost: </Form.Label>
							<Form.Control
								size='sm'
								name='currentCost'
								type='number'
								value={props.magicData.currentCost}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
			<MagicTable
				currentMagicType={magicCostsData[props.magicData.currentMagicType]}
				abilities={props.magicData.currentDisplayData}
				onRowCheck={props.onRowCheck}
				checkAll={props.checkAll}
				selectAll={props.magicData.selectAll}
			/>
			<Button variant='outline-dark'
				name='replaceButton'
				onClick={props.onClick}
			>
				REPLACE
			</Button>
			{' '}
			<Button variant='outline-dark'
				name='vanillaButton'
				onClick={props.onClick}
			>
				VANILLA
			</Button>
		</div >
	)
}

export default MagicPage