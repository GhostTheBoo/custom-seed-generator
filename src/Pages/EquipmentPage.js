import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { equipmentTypesData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EquipmentTable from '../Tables/EquipmentTable'
import HelpModal from '../Components/HelpModal'

function EquipmentPage(props) {
	const description = (
		<div id="equipmentPage">
			<h6>Equipment</h6>
			<p>
				The equipment page displays all equipment of the specified category in the equipment type selector.
				Equipment have many unique aspects that can be modified.
			</p>
			<h6>Ability</h6>
			<p>
				An equipment ability can be modified using the reward selector.
				Only abilities truly function as expected but just about everything should work visually with no gameplay changes.
				Only keyblades and ally weapons will show the ability even though all other equipment will still apply their ability.
				Abilities do not count as a line being drawn to the screen as they do not show up when changing equipment.
			</p>
			<h6>Stats and Resistances</h6>
			<p>
				Strength, Magic, AP, and Defense can all be modified on equipment.
				Because of how many lines can be drawn on screen in the menu, certain types of equipment will cause crashes if too many things are modified.

				Resistances can also be modified on all equipment.
				Physical, Light, and Universal resistances are all hidden stats and can be modified freely for all equipment without drawing lines to the screen.
				Fire, Blizzard, Thunder, and Dark resistances will draw to the screen
				All resistances can go from -150% to 100% damage resistance so certain attacks can do extra damage to the wearer if he has a negative resistance.
			</p>
			<h6>Why Am I red?</h6>
			<p>
				Equipment have a limit of drawing 5 lines to the menu.
				While that doesn't cause many issues while equipped, trying to change the equipment can often times draw more lines then already shown.
				To prevent this, equipment types will turn red if they might draw too many lines.

				Armor already draws 5 lines (Defense, Fire, Blizzard, Thunder, and Dark Resistances).
				Modifying Strength, Magic, or AP on armor will turn the line red.

				All other equipment draws 3 lines to the screen.
				That means 1 extra line from the 4 resistances or Defense can be added as a stat.
				There are technicalities where if only 1 piece of equipment has 2 extra lines it might be fine, however the tool assumes that anything over 1 additional line will crash the game.
			</p>
		</div>
	)

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
							currentItem={props.equipmentData.currentEquipmentType}
							onChange={props.handleEquipmentTypeChange}
						/>
					</Col>
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
			<HelpModal
				page={'Equipment'}
				description={description}
			/>
		</div >
	)
}

export default EquipmentPage