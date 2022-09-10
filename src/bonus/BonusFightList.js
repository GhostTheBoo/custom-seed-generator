import { React } from 'react'
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
                    <>
                        <img
                            className='icon'
                            src={icon}
                            alt={fight.fight + ' Icon'}
                            height={75}
                            width={60}
                            style={{ verticalAlign: 'middle' }}
                        />
                        <span
                            className='iconDescription'
                            style={{ verticalAlign: 'middle', fontSize: '1.3rem', fontFamily: 'KHMenu' }}
                        >
                            {' ' + fight.fightName}
                        </span>
                    </>
                )
            })}
            currentSelectItem={props.currentSelectItem}
            setCurrentSelectItem={props.setCurrentSelectItem}
        />
    )
}

export default BonusFightList