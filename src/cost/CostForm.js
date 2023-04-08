import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './CostFormStyles.css'

function CostForm(props) {
    let abilityImage = './images/' + props.category.path + '.png'

    function handleCostChange(abilityIndex, newValue) {
        let newCosts = props.currentCostFieldData.slice()
        newCosts[abilityIndex] = newValue
        props.setCurrentCostFieldData(newCosts)
    }

    let costEditFields = props.category.specificAbilities.map((specificAbility, specificAbilityIndex) => {
        return (
            <div key={'specificAbilityCostEditField ' + specificAbilityIndex} className='abilityCostEditRow'>
                <label className='costLabel'>{specificAbility.ability}:</label>
                <label className='costVanillaLabel'>{specificAbility.vanillaCost}</label>
                <label className='costReplacementLabel'>{specificAbility.replacementCost}</label>
                <input
                    name={specificAbility.ability}
                    className='costInputField three-digit-input'
                    type='number'
                    value={props.currentCostFieldData[specificAbilityIndex]}
                    onChange={(e) => handleCostChange(specificAbilityIndex, Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
            </div>
        )
    })

    return (
        <Modal show={props.categoryIndex !== -1} onHide={props.closeModal} className='costFormModal' size='xl'>
            <Modal.Header closeButton>
                <Modal.Title className='costAbilityTitle'>{props.category.category}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='costFormBody'>
                <img
                    className='costFormImage'
                    src={abilityImage}
                    alt={props.category.category}
                    width='250'
                    height='auto'
                />
                <div className='costEditFieldGroup'>
                    {costEditFields}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={() => props.updateCost()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CostForm