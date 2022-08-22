import { React, useState } from 'react'
import { Row, Container, Col } from 'react-bootstrap'

import MagicCard from './MagicCard'
// import AllLevelCard from './AllLevelCard'
import MagicForm from './MagicForm'
// import AllLevelForm from './AllLevelForm'

function MagicPage(props) {
	const [currentMagicType, setCurrentMagicType] = useState(-1)

	const [currentCostFieldData, setCurrentCostFieldData] = useState([0, 0, 0, 0])

	function handleCurrentMagicChange(newMagicType) {
		if (newMagicType !== -1) {
			let costFields = props.magicData[newMagicType].abilities.map(ability => { return ability.replacementCost })
			while (costFields.length < 4) costFields.push(0)
			setCurrentCostFieldData(costFields)
		}
		setCurrentMagicType(newMagicType)
	}

	function handleCurrentCostFieldDataChange(index, newValue) {
		let newCostField = currentCostFieldData.map((field, fieldIndex) => {
			if (fieldIndex === index) return newValue
			return field
		})
		setCurrentCostFieldData(newCostField)
	}

	function updateMagic(updateType) {
		let newMagicAbilities = props.magicData[currentMagicType].abilities.map((ability, abilityIndex) => {
			return updateType === 'replace' ? ability.replace(currentCostFieldData[abilityIndex]) : ability.vanilla()
		})
		updateAllMagic({
			...props.magicData[currentMagicType],
			abilities: newMagicAbilities
		})
		handleCurrentMagicChange(-1)
	}

	function updateAllMagic(newMagicType) {
		props.setAllMagic(props.magicData.map((magicType, magicTypeIndex) => { return magicTypeIndex === currentMagicType ? newMagicType : magicType }))
	}

	let columnNum = 6

	let magicDataList = props.magicData.map((magicType, magicTypeIndex) => {
		return (
			<MagicCard
				key={magicTypeIndex}
				id={magicTypeIndex}
				magic={magicType}
				isEditing={magicTypeIndex === currentMagicType}
				setCurrentMagic={handleCurrentMagicChange}
			/>
		)
	})

	let magicRowList = []
	let i = 0
	// Magic Rows
	for (i = 0; i < 6; i += columnNum) {
		magicRowList.push(
			<Row
				id={'magicRow' + i}
				key={'magicRow' + i}
			>
				{magicDataList.slice(i, i + columnNum)}
			</Row>
		)
	}
	magicRowList.push(<hr id='limitRows' key='limitRows' />)
	// Limit Rows
	for (; i < 18; i += columnNum) {
		magicRowList.push(
			<Row
				id={'magicRow' + i}
				key={'magicRow' + i}
			>
				{magicDataList.slice(i, i + columnNum)}
			</Row>
		)
	}
	magicRowList.push(<hr id='limitFormRows' key='limitFormRows' />)
	// Limit Form Rows
	for (; i < 21; i += columnNum) {
		magicRowList.push(
			<Row
				id={'magicRow' + i}
				key={'magicRow' + i}
			>
				{magicDataList.slice(i, i + columnNum)}
			</Row>
		)
	}

	return (
		<Container fluid>
			<Row>
				<Col xs='auto'>
					<Row>
						<Container
							fluid
							className='cardGrid'
							style={{
								marginTop: '10px',
								overflowY: 'auto',
								height: '825px'
							}}
						>
							{magicRowList}
						</Container>
					</Row>
				</Col>
				<Col>
					<Row>
						<Col xs={6} />
						<Col xs={6} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
							{props.children}
						</Col>
					</Row>
					{currentMagicType !== -1
						? <MagicForm
							magic={props.magicData[currentMagicType]}
							currentCostFieldData={currentCostFieldData}
							setCurrentCostFieldData={handleCurrentCostFieldDataChange}
							closeFormCard={handleCurrentMagicChange}
							handleVanilla={updateMagic}
							handleReplace={updateMagic}
						/>
						: <></>}
				</Col>
			</Row>
		</Container>
	)
}

export default MagicPage