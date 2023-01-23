import React from 'react'
import GenericListGroup from '../Components/GenericListGroup'

function FormList(props) {
    const formNames = [
        { name: 'Summon', png: 'charm' },
        { name: 'Valor', png: 'valor' },
        { name: 'Wisdom', png: 'wisdom' },
        { name: 'Limit', png: 'limit_form' },
        { name: 'Master', png: 'master' },
        { name: 'Final', png: 'final' }
    ]

    return (
        <GenericListGroup
            dataList={formNames.map(form => {
                let icon = './images/icons/' + form.png + '.png'
                return (
                    <>
                        <img
                            className='formIcon'
                            src={icon}
                            alt={form.name + ' Icon'}
                            style={{ verticalAlign: 'middle' }}
                        />
                        <span
                            className='formIconDescription'
                        >
                            {' ' + form.name}
                        </span>
                    </>
                )
            })}
            currentSelectItem={props.currentSelectItem}
            setCurrentSelectItem={props.setCurrentSelectItem}
        />
    )
}

export default FormList