import { React } from 'react'
import GenericListGroup from '../Components/GenericListGroup'

function FormList(props) {
    const formNames = [
        { name: 'Summon', png: 'charm' },
        { name: 'Valor Form', png: 'valor' },
        { name: 'Wisdom Form', png: 'wisdom' },
        { name: 'Limit Form', png: 'limit_form' },
        { name: 'Master Form', png: 'master' },
        { name: 'Final Form', png: 'final' },
    ]

    return (
        <GenericListGroup
            dataList={formNames.map(form => {
                let icon = require(`../assets/icons/${form.png}.png`)
                return (
                    <>
                        <img
                            className='icon'
                            src={icon.default}
                            alt={form.name + ' Icon'}
                            height={50}
                            width={50}
                            style={{ verticalAlign: 'middle' }}
                        />
                        <span
                            className='iconDescription'
                            style={{ verticalAlign: 'middle', fontSize: '1.5rem', fontFamily:'KHMenu' }}
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