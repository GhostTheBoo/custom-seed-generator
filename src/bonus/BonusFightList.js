import React from 'react'
import GenericListGroup from '../Components/GenericListGroup'

function BonusFightList(props) {
    const bonusFolderNames = [
        'agr',
        'bc',
        'cor',
        'dc',
        'ht',
        'hb',
        'lod',
        'oc',
        'pr',
        'pl',
        'stt',
        'sp',
        'tr',
        'tt',
        'twtnw'
    ]

    return (
        <GenericListGroup
            dataList={props.fightList.map(fight => {
                let icon = './images/bonusFightImages/' + bonusFolderNames[props.currentWorld] + '/' + fight.zipID.toString() + '.png'
                return (
                    <div className='bonusFightButton flex'>
                        <img
                            className='bonusFightIcon'
                            src={icon}
                            alt={fight.fight + ' Icon'}
                        />
                        <span
                            className='bonusFightIconDescription flex-grow-1'
                        >
                            {' ' + fight.fightName}
                        </span>
                    </div>
                )
            })}
            currentSelectItem={props.currentSelectItem}
            setCurrentSelectItem={props.setCurrentSelectItem}
        />
    )
}

export default BonusFightList