import React from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'

import { formTypesData } from '../Data/typesData'

import GenericSelect from '../Components/GenericSelect'
import RewardSelect from '../Components/RewardSelect'
import RewardTypeSelect from '../Components/RewardTypeSelect'
import EXPSelect from '../Components/EXPSelect'
import FormTable from '../Tables/FormTable'

function FormPage(props) {
	return (
		<div style={props.style}>
			<Form>
				<Form.Row>
					<Col lg='2'>
						<GenericSelect
							class={'form'}
							selector={'Drive Form'}
							itemList={formTypesData}
							name={'currentDriveForm'}
							currentItem={props.fieldData.currentDriveForm}
							onChange={props.handleFormChange}
						/>
					</Col>
					<Col lg='2'>
						<RewardTypeSelect
							class={'form'}
							currentRewardType={props.fieldData.currentRewardType}
							name={'currentRewardType'}
							onChange={props.onRewardTypeChange}
						/>
					</Col>
					<Col lg='2'>
						<RewardSelect
							class={'form'}
							rewardList={props.rewardList}
							currentReward={props.fieldData.currentReward}
							name={'currentReward'}
							label={'Reward'}
							onChange={props.onSelectChange}
						/>
					</Col>
					<Col >
						<EXPSelect
							class={'form'}
							currentEXP={props.fieldData.currentEXP}
							currentEXPMultiplier={props.fieldData.currentEXPMultiplierValue}
							onInputChange={props.onInputChange}
							onMultiplierChange={props.onSelectChange}
						/>
					</Col>
				</Form.Row>
			</Form>
			<FormTable
				currentDriveForm={formTypesData[props.fieldData.currentDriveForm]}
				driveLevels={props.formData}
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

export default FormPage