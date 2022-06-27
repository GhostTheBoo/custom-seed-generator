import { React } from 'react'
import { Container, Row, Button, Card } from 'react-bootstrap'
import Icon from '../Components/Icon'
import EditStatusPopover from '../Components/EditStatusPopover'

function EquipmentCard(props) {
	let equipmentImage = require(`../assets/equipmentImages/${props.currentFolderName}/${props.equipment.baseAddress.toString(16).toUpperCase()}.png`)
	let equipmentStatList = []

	if (props.equipment.isWeapon() || props.equipment.replacementAbility.index !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + ''}>
				<Icon
					fileName={props.equipment.replacementAbility.iconType}
					type={'card'}
				>
					{props.equipment.replacementAbility.reward}
				</Icon>
			</li>
		)

	if (props.equipment.isAccessory() || props.equipment.ap !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'ap'}>
				AP: {props.equipment.ap}
			</li>
		)

	if (props.equipment.isWeapon() || props.equipment.isAccessory() || props.equipment.isAllyWeapon() || props.equipment.strength !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'strength'}>
				Strength: {props.equipment.strength}
			</li>
		)

	if (props.equipment.isWeapon() || props.equipment.isAccessory() || props.equipment.isAllyWeapon() || props.equipment.magic !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'magic'}>
				Magic: {props.equipment.magic}
			</li>
		)

	if (props.equipment.isArmor() || props.equipment.defense !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'defense'}>
				Defense: {props.equipment.defense}
			</li>
		)

	if (props.equipment.isArmor() || props.equipment.fire !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'fire'}>
				Fire Resistance: {props.equipment.fire}
			</li>
		)

	if (props.equipment.isArmor() || props.equipment.blizzard !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'blizzard'}>
				Blizzard Resistance: {props.equipment.blizzard}
			</li>
		)

	if (props.equipment.isArmor() || props.equipment.thunder !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'thunder'}>
				Thunder Resistance: {props.equipment.thunder}
			</li>
		)

	if (props.equipment.isArmor() || props.equipment.dark !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'dark'}>
				Dark Resistance: {props.equipment.dark}
			</li>
		)

	if (props.equipment.physical !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'physical'}>
				Physical Resistance: {props.equipment.physical}
			</li>
		)

	if (props.equipment.light !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'light'}>
				Light Resistance: {props.equipment.light}
			</li>
		)

	if (props.equipment.universal !== 0)
		equipmentStatList.push(
			<li key={props.equipment.baseAddress + 'universal'}>
				Universal Resistance: {props.equipment.universal}
			</li>
		)

	let overlayPopover = <EditStatusPopover
		text={!props.equipment.isValidEquipment() ? 'WARNING!' : 'NEW!'}
		message={!props.equipment.isValidEquipment() ? 'Equipment can only draw 5 stats on screen' : ''}
		type='equipment'
	/>

	return (
		<Card
			border='dark'
			bg='dark'
			className='equipmentCard'
			style={{ margin: '10px', textAlign: 'center' }}
		>
			<div style={{ position: 'relative' }}>
				<Card.Img
					variant='top'
					src={equipmentImage.default}
					height='200px'
					width='200px'
				/>
				{props.equipment.isReplaced() ? overlayPopover : <></>}
			</div>
			<Card.Header className='cardHeader'>
				{props.equipment.name}
			</Card.Header>
			<Card.Body>
				<Card.Text as='div'>
					<ul style={{ listStyle: "none", margin: 0, padding: 0, textAlign: "left" }}>{equipmentStatList}</ul>
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Container fluid>
					<Row>
						<Button
							variant='primary'
							block
							id={props.id}
							disabled={props.isEditing}
							onClick={() => props.setCurrentEquipment(props.id)}
						>
							{props.isEditing ? 'EDITING...' : 'EDIT'}
						</Button>
					</Row>
				</Container>
			</Card.Footer>
		</Card>
	)
}

export default EquipmentCard