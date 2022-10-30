import { React } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './CostFormStyles.css'

function CostForm(props) {
    let abilityImage = './images/' + props.ability[0].path + '.png'

    function handleCostChange(abilityIndex, newValue) {
        let newCosts = props.currentCostFieldData.slice()
        newCosts[abilityIndex] = newValue
        props.setCurrentCostFieldData(newCosts)
    }

    let costEditFields = props.ability.map((ability, abilityIndex) => {
        return (
            <div key={'abilityCostEditField ' + abilityIndex} className='abilityCostEditRow'>
                <label className='costLabel'>{ability.ability}:</label>
                <label className='costVanillaLabel'>{ability.replacementCost}</label>
                <input
                    name={ability.ability}
                    className='costInputField three-digit-input'
                    type='number'
                    value={props.currentCostFieldData[abilityIndex]}
                    onChange={(e) => handleCostChange(abilityIndex, Math.max(Number(e.target.min), Math.min(Number(e.target.max), Number(parseInt(e.target.value)))))}
                    min='0'
                    max='255'
                />
            </div>
        )
    })

    return (
        <Modal show={props.abilityIndex !== -1} onHide={props.closeModal} className='costFormModal' size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>{props.ability[0].category}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='costFormBody'>
                <img
                    className='costFormImage'
                    src={abilityImage}
                    alt={props.ability[0].category}
                    width='100%'
                    height='auto'
                />
                {costEditFields}
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