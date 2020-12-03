import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { equipmentTypesData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EquipmentTable from '../Tables/EquipmentTable'

function EquipmentPage(props) {
	return (
		<div>
			<Form>
				<Form.Row>
					<GenericSelect
						class='equipment'
						selector={'Equipment Type'}
						itemList={equipmentTypesData}
						name={'currentEquipmentType'}
						currentItem={props.equipmentData.currentEquipmentType}
						onChange={props.handleEquipmentTypeChange}
					/>
				</Form.Row>
				<Form.Row>
					<Col>
						<RewardTypeSelect
							class={'equipment'}
							currentRewardType={props.equipmentData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col>
						<RewardSelect
							class={'equipment'}
							rewardList={props.rewardList}
							currentReward={props.equipmentData.currentReward}
							name={'currentReward'}
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
								value={props.equipmentData.currentStrength}
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
								value={props.equipmentData.currentMagic}
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
								value={props.equipmentData.currentAP}
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
								value={props.equipmentData.currentDefense}
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
								value={props.equipmentData.currentFire}
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
								value={props.equipmentData.currentBlizzard}
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
								value={props.equipmentData.currentThunder}
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
								value={props.equipmentData.currentPhysical}
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
								value={props.equipmentData.currentDark}
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
								value={props.equipmentData.currentLight}
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
								value={props.equipmentData.currentUniversal}
								onChange={props.onInputChange}
								min="-155"
								max="100"
							/>
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
			<EquipmentTable
				currentEquipmentType={equipmentTypesData[props.equipmentData.currentEquipmentType]}
				equipments={props.equipmentData.currentDisplayData}
				onRowCheck={props.onRowCheck}
				checkAll={props.checkAll}
				selectAll={props.equipmentData.selectAll}
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

export default EquipmentPage