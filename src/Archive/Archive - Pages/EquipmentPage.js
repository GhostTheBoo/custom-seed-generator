import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

import { equipmentTypesData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EquipmentTable from '../Tables/EquipmentTable'

function EquipmentPage(props) {
	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col>
						<GenericSelect
							class='equipment'
							selector={'Equipment Type'}
							itemList={equipmentTypesData}
							name={'currentEquipmentType'}
							currentItem={props.fieldData.currentEquipmentType}
							onChange={props.handleEquipmentTypeChange}
						/>
					</Col>
					<Col>
						<RewardTypeSelect
							class={'equipment'}
							currentRewardType={props.fieldData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={'equipment'}
							rewardList={props.rewardList}
							currentReward={props.fieldData.currentReward}
							name={'currentReward'}
							label={'Ability'}
							onChange={props.onRewardChange}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col>
						<Form.Group controlId='currentStrength'>
							<Form.Label column='sm'>Strength: </Form.Label>
							<Form.Control
								size='sm'
								name='currentStrength'
								type='number'
								value={props.fieldData.currentStrength}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentMagic'>
							<Form.Label column='sm'>Magic: </Form.Label>
							<Form.Control
								size='sm'
								name='currentMagic'
								type='number'
								value={props.fieldData.currentMagic}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentAP'>
							<Form.Label column='sm'>AP: </Form.Label>
							<Form.Control
								size='sm'
								name='currentAP'
								type='number'
								value={props.fieldData.currentAP}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentDefense'>
							<Form.Label column='sm'>Defense: </Form.Label>
							<Form.Control
								size='sm'
								name='currentDefense'
								type='number'
								value={props.fieldData.currentDefense}
								onChange={props.onInputChange}
								min="0"
								max="255"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentFire'>
							<Form.Label column='sm'>Fire Resistance: </Form.Label>
							<Form.Control
								size='sm'
								name='currentFire'
								type='number'
								value={props.fieldData.currentFire}
								onChange={props.onInputChange}
								min="-155"
								max="100"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentBlizzard'>
							<Form.Label column='sm'>Blizzard Resistance: </Form.Label>
							<Form.Control
								size='sm'
								name='currentBlizzard'
								type='number'
								value={props.fieldData.currentBlizzard}
								onChange={props.onInputChange}
								min="-155"
								max="100"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentThunder'>
							<Form.Label column='sm'>Thunder Resistance: </Form.Label>
							<Form.Control
								size='sm'
								name='currentThunder'
								type='number'
								value={props.fieldData.currentThunder}
								onChange={props.onInputChange}
								min="-155"
								max="100"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentDark'>
							<Form.Label column='sm'>Dark Resistance: </Form.Label>
							<Form.Control
								size='sm'
								name='currentDark'
								type='number'
								value={props.fieldData.currentDark}
								onChange={props.onInputChange}
								min="-155"
								max="100"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentPhysical'>
							<Form.Label column='sm'>Physical Resistance: </Form.Label>
							<Form.Control
								size='sm'
								name='currentPhysical'
								type='number'
								value={props.fieldData.currentPhysical}
								onChange={props.onInputChange}
								min="-155"
								max="100"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentLight'>
							<Form.Label column='sm'>Light Resistance: </Form.Label>
							<Form.Control
								size='sm'
								name='currentLight'
								type='number'
								value={props.fieldData.currentLight}
								onChange={props.onInputChange}
								min="-155"
								max="100"
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='currentUniversal'>
							<Form.Label column='sm'>Universal Resistance: </Form.Label>
							<Form.Control
								size='sm'
								name='currentUniversal'
								type='number'
								value={props.fieldData.currentUniversal}
								onChange={props.onInputChange}
								min="-155"
								max="100"
							/>
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
			<EquipmentTable
				currentEquipmentType={equipmentTypesData[props.fieldData.currentEquipmentType]}
				equipments={props.equipmentData}
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

export default EquipmentPage