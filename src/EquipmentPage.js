import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { equipmentTypesData } from './Data/typesData'
import rewardsData from './Data/rewardsData'
import equipmentsData from './Data/equipmentsData'

import GenericSelect from './Components/GenericSelect'
import RewardSelect from './Components/RewardSelect'
import EquipmentTable from './Components/EquipmentTable'
import Buttons from './Components/Buttons'

class EquipmentPage extends React.Component {
	constructor() {
		super()

		this.state = {
			currentEquipmentType: 0,
			currentRewardType: 0,
			currentReward: 0,
			currentEquipmentStrength: 0,
			currentEquipmentMagic: 0,
			currentEquipmentAP: 0,
			currentEquipmentDefense: 0,
			currentEquipmentPhysical: 0,
			currentEquipmentFire: 0,
			currentEquipmentBlizzard: 0,
			currentEquipmentThunder: 0,
			currentEquipmentDark: 0,
			currentEquipmentLight: 0,
			currentEquipmentUniversal: 0,
			selectAll: false,
			allEquipments: equipmentsData.slice(),
			currentEquipments: equipmentsData[0].equipments.slice(),
			pnachCodes: []
		}

		this.handleEquipmentTypeChange = this.handleEquipmentTypeChange.bind(this)
		this.handleReplace = this.handleReplace.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.onRowCheck = this.onRowCheck.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.checkAll = this.checkAll.bind(this)
	}

	handleEquipmentTypeChange(event) {
		let nextEquipmentType = parseInt(event.target.value)
		let toBeReplacedEquipments = this.state.currentEquipments.map(equipment => {
			equipment.toBeReplaced = false
			return equipment
		})
		let newAllEquipments = this.state.allEquipments.map((equipment, index) => {
			if (index === this.state.currentEquipmentType)
				return {
					equipmentType: equipmentTypesData[index],
					equipments: toBeReplacedEquipments
				}
			return equipment
		})
		let nextEquipments = newAllEquipments[nextEquipmentType].equipments.slice()
		this.setState({
			selectAll: false,
			currentEquipmentType: nextEquipmentType,
			allEquipments: newAllEquipments,
			currentEquipments: nextEquipments
		})
	}

	handleInputChange(event) {
		let { name, value, min, max } = event.target
		value = Math.max(Number(min), Math.min(Number(max), Number(value)));
		this.setState({
			[name]: parseInt(value),
		})
	}

	onRowCheck(event) {
		let toBeReplacedEquipments = this.state.currentEquipments.map((equipment, index) => {
			if (index === parseInt(event.target.value))
				equipment.toBeReplaced = !equipment.toBeReplaced
			return equipment
		})
		this.setState({
			currentEquipments: toBeReplacedEquipments
		})
	}

	checkAll() {
		let selectAll = !this.state.selectAll
		let toBeReplacedEquipments = this.state.currentEquipments.map(equipment => {
			equipment.toBeReplaced = selectAll
			return equipment
		})
		this.setState({
			selectAll: selectAll,
			currentEquipments: toBeReplacedEquipments
		})
	}

	handleChange(event) {
		const { name, value } = event.target
		if (name !== 'currentReward')
			this.setState({
				currentReward: 0
			})
		this.setState({
			[name]: parseInt(value),
		})
	}

	handleReplace(event) {
		let replacedEquipments
		if (event.target.name === 'replaceButton') {
			replacedEquipments = this.state.currentEquipments.map(equipment => {
				if (equipment.toBeReplaced) {
					let reward = rewardsData[this.state.currentRewardType].rewards[this.state.currentReward].reward
					let index = rewardsData[this.state.currentRewardType].rewards[this.state.currentReward].index
					equipment.toBeReplaced = false
					equipment.additionalLineCount = 0

					equipment.ability = reward
					if (equipment.ability === equipment.vanillaAbility) {
						equipment.isAbilityReplaced = false
						equipment.ability = equipment.vanillaAbility
						equipment.replacementAbilityIndex = ''
					} else {
						equipment.isAbilityReplaced = true
						equipment.replacementAbilityIndex = index
					}

					equipment.strength = this.state.currentEquipmentStrength
					equipment.magic = this.state.currentEquipmentMagic
					equipment.ap = this.state.currentEquipmentAP
					equipment.defense = this.state.currentEquipmentDefense
					equipment.isStatsReplaced = ((this.state.currentEquipmentStrength !== equipment.vanillaStrength) || (this.state.currentEquipmentMagic !== equipment.vanillaMagic) ||
						(this.state.currentEquipmentDefense !== equipment.vanillaDefense) || (this.state.currentEquipmentAP !== equipment.vanillaAP))

					if (equipment.isStatsReplaced) {
						if (this.state.currentEquipmentType !== 5) {
							if (equipment.ap !== 0)
								equipment.additionalLineCount++
						}
						if (this.state.currentEquipmentType !== 4) {
							if (equipment.defense !== 0)
								equipment.additionalLineCount++
						} else {
							if (equipment.strength !== 0)
								equipment.additionalLineCount++
							if (equipment.magic !== 0)
								equipment.additionalLineCount++
						}
					}

					equipment.fireResistance = this.state.currentEquipmentFire
					equipment.blizzardResistance = this.state.currentEquipmentBlizzard
					equipment.thunderResistance = this.state.currentEquipmentThunder
					equipment.physicalResistance = this.state.currentEquipmentPhysical
					equipment.isElementalResistanceChanged = ((this.state.currentEquipmentFire !== equipment.vanillaFireResistance) || (this.state.currentEquipmentBlizzard !== equipment.vanillaBlizzardResistance) ||
						(this.state.currentEquipmentThunder !== equipment.vanillaThunderResistance) || (this.state.currentEquipmentPhysical !== equipment.vanillaPhysicalResistance))

					equipment.darkResistance = this.state.currentEquipmentDark
					equipment.lightResistance = this.state.currentEquipmentLight
					equipment.universalResistance = this.state.currentEquipmentUniversal
					equipment.isOtherResistanceChanged = ((this.state.currentEquipmentDark !== equipment.vanillaDarkResistance) || (this.state.currentEquipmentLight !== equipment.vanillaLightResistance) ||
						(this.state.currentEquipmentUniversal !== equipment.vanillaUniversalResistance))

					if (this.state.currentEquipmentType !== 4) {
						if (equipment.fireResistance !== 0)
							equipment.additionalLineCount++
						if (equipment.blizzardResistance !== 0)
							equipment.additionalLineCount++
						if (equipment.thunderResistance !== 0)
							equipment.additionalLineCount++
						if (equipment.darkResistance !== 0)
							equipment.additionalLineCount++
					}
				}
				return equipment
			})
		} else {
			replacedEquipments = this.state.currentEquipments.map(equipment => {
				if (equipment.toBeReplaced) {
					equipment.toBeReplaced = false
					equipment.isAbilityReplaced = false
					equipment.isStatsReplaced = false
					equipment.isElementalResistanceChanged = false
					equipment.isOtherResistanceChanged = false
					equipment.ability = equipment.vanillaAbility
					equipment.replacementAbilityIndex = ''
					equipment.strength = equipment.vanillaStrength
					equipment.magic = equipment.vanillaMagic
					equipment.ap = equipment.vanillaAP
					equipment.defense = equipment.vanillaDefense
					equipment.fireResistance = equipment.vanillaFireResistance
					equipment.blizzardResistance = equipment.vanillaBlizzardResistance
					equipment.thunderResistance = equipment.vanillaThunderResistance
					equipment.physicalResistance = 0
					equipment.darkResistance = equipment.vanillaDarkResistance
					equipment.lightResistance = 0
					equipment.universalResistance = 0
					equipment.additionalLineCount = 0
				}
				return equipment
			})
		}
		this.setState({
			selectAll: !this.state.selectAll,
			currentEquipments: replacedEquipments
		})
	}

	handleSave() {
		let pnachCodes = this.state.allEquipments.map(equipment => {
			let ret = '// ' + equipment.equipmentType + '\n'

			equipment.equipments.forEach(eq => {
				ret += '// ' + eq.name + '\n'

				if (eq.isAbilityReplaced) {
					ret += 'patch=1,EE,' + eq.abilityAddress + ',extended,0000'
					ret += eq.replacementAbilityIndex + ' // Ability: ' + eq.ability + '\n'
				}

				if (eq.isStatsReplaced) {
					ret += 'patch=1,EE,' + eq.statAddress + ',extended,'
					ret += eq.ap.toString(16).toUpperCase().padStart(2, '0') + eq.defense.toString(16).toUpperCase().padStart(2, '0')
					ret += eq.magic.toString(16).toUpperCase().padStart(2, '0') + eq.strength.toString(16).toUpperCase().padStart(2, '0')
					ret += ' // AP:' + eq.ap + ' Defense:' + eq.defense + ' Magic:' + eq.magic + ' Strength:' + eq.strength + '\n'
				}

				if (eq.isElementalResistanceChanged) {
					ret += 'patch=1,EE,' + eq.elementalResistanceAddress + ',extended,'
					ret += (100 - eq.thunderResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - eq.blizzardResistance).toString(16).toUpperCase().padStart(2, '0')
					ret += (100 - eq.fireResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - eq.physicalResistance).toString(16).toUpperCase().padStart(2, '0')
					ret += ' // Thunder:' + eq.thunderResistance + '% Blizzard:' + eq.blizzardResistance
					ret += '% Fire:' + eq.fireResistance + '% Physical:' + eq.physicalResistance + '%\n'
				}

				if (eq.isOtherResistanceChanged) {
					ret += 'patch=1,EE,' + eq.otherResistanceAddress + ',extended,00' + (100 - eq.universalResistance).toString(16).toUpperCase().padStart(2, '0')
					ret += (100 - eq.lightResistance).toString(16).toUpperCase().padStart(2, '0') + (100 - eq.darkResistance).toString(16).toUpperCase().padStart(2, '0')
					ret += ' // Universal:' + eq.universalResistance + '% Light:' + eq.lightResistance + '% Dark:' + eq.darkResistance + '%\n'
				}
			})
			return ret
		})
		console.log(pnachCodes)
	}

	render() {
		return (
			<div>
				<Form>
					<Form.Row>
						<GenericSelect
							class='equipment'
							selector={'Equipment Type'}
							itemList={equipmentTypesData}
							name={'currentEquipmentType'}
							currentItem={this.state.currentEquipmentType}
							onChange={this.handleEquipmentTypeChange}
						/>
					</Form.Row>
					<RewardSelect
						class='equipment'
						currentRewardType={this.state.currentRewardType}
						rewardList={rewardsData[this.state.currentRewardType].rewards}
						currentReward={this.state.currentReward}
						typeName={'currentRewardType'}
						name={'currentReward'}
						onChange={this.handleChange}
					/>
					<Form.Row>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentStrength'>
								<Form.Label column='sm'>Strength: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentStrength'
									type='number'
									value={this.state.currentEquipmentStrength}
									onChange={this.handleInputChange}
									min="0"
									max="255"
								/>
							</Form.Group>
						</Col>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentMagic'>
								<Form.Label column='sm'>Magic: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentMagic'
									type='number'
									value={this.state.currentEquipmentMagic}
									onChange={this.handleInputChange}
									min="0"
									max="255"
								/>
							</Form.Group>
						</Col>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentAP'>
								<Form.Label column='sm'>AP: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentAP'
									type='number'
									value={this.state.currentEquipmentAP}
									onChange={this.handleInputChange}
									min="0"
									max="255"
								/>
							</Form.Group>
						</Col>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentDefense'>
								<Form.Label column='sm'>Defense: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentDefense'
									type='number'
									value={this.state.currentEquipmentDefense}
									onChange={this.handleInputChange}
									min="0"
									max="255"
								/>
							</Form.Group>
						</Col>
					</Form.Row>
					<Form.Row>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentFire'>
								<Form.Label column='sm'>Fire Resistance: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentFire'
									type='number'
									value={this.state.currentEquipmentFire}
									onChange={this.handleInputChange}
									min="-155"
									max="100"
								/>
							</Form.Group>
						</Col>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentBlizzard'>
								<Form.Label column='sm'>Blizzard Resistance: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentBlizzard'
									type='number'
									value={this.state.currentEquipmentBlizzard}
									onChange={this.handleInputChange}
									min="-155"
									max="100"
								/>
							</Form.Group>
						</Col>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentThunder'>
								<Form.Label column='sm'>Thunder Resistance: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentThunder'
									type='number'
									value={this.state.currentEquipmentThunder}
									onChange={this.handleInputChange}
									min="-155"
									max="100"
								/>
							</Form.Group>
						</Col>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentPhysical'>
								<Form.Label column='sm'>Physical Resistance: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentPhysical'
									type='number'
									value={this.state.currentEquipmentPhysical}
									onChange={this.handleInputChange}
									min="-155"
									max="100"
								/>
							</Form.Group>
						</Col>
					</Form.Row>
					<Form.Row>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentDark'>
								<Form.Label column='sm'>Dark Resistance: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentDark'
									type='number'
									value={this.state.currentEquipmentDark}
									onChange={this.handleInputChange}
									min="-155"
									max="100"
								/>
							</Form.Group>
						</Col>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentLight'>
								<Form.Label column='sm'>Light Resistance: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentLight'
									type='number'
									value={this.state.currentEquipmentLight}
									onChange={this.handleInputChange}
									min="-155"
									max="100"
								/>
							</Form.Group>
						</Col>
						<Col xl='2'>
							<Form.Group controlId='currentEquipmentUniversal'>
								<Form.Label column='sm'>Universal Resistance: </Form.Label>
								<Form.Control
									size='sm'
									name='currentEquipmentUniversal'
									type='number'
									value={this.state.currentEquipmentUniversal}
									onChange={this.handleInputChange}
									min="-155"
									max="100"
								/>
							</Form.Group>
						</Col>
					</Form.Row>
				</Form>
				<EquipmentTable
					currentEquipmentType={equipmentTypesData[this.state.currentEquipmentType]}
					equipments={this.state.currentEquipments}
					onRowCheck={this.onRowCheck}
					checkAll={this.checkAll}
					selectAll={this.state.selectAll}
				/>
				<Buttons
					onClick={this.handleReplace}
					onSaveClick={this.handleSave}
				/>
			</div>
		)
	}
}

export default EquipmentPage