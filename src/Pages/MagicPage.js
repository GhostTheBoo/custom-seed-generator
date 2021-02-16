import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { magicCostsData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import MagicTable from '../Tables/MagicTable.js'
import HelpModal from '../Components/HelpModal'

function MagicPage(props) {
	const description = (
		<div id="magicPage">
			<h6>Magic and Limits</h6>
			<p>
				The magic and limits page allows for customization of the mp cost of magic spells, party limits, and limit form limits.
				Select all abilities to change, select the desired cost, and click replace.
				Clicking vanilla will return all selected abilities to their vanilla costs.
			</p>
			<h6>Why Am I Red?</h6>
			<p>
				Magic abilities can either have their cost changed or remain the same.
				They cannot be red.
			</p>
		</div>
	)

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
							currentItem={props.magicData.currentMagicType}
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
			<HelpModal
				page={'Magic & Limits'}
				description={description}
			/>
		</div >
	)
}

export default MagicPage