import React from 'react'
import { Button } from 'react-bootstrap'
import Icon from '../Components/Icon'

function RewardListGroup(props) {
    // PROPS:
    // setCurrentReplacementReward: set current replacement reward -> function
    // rewardTypeIndex: reward type index -> number
    // rewardType: reward type -> string
    // rewardCategoryList: reward category list -> array

    let rewardOnClick = (id) => {
        let indeces = id.split('_')
        props.setCurrentReplacementReward(parseInt(indeces[0]), parseInt(indeces[1]))
    }

    let rewardCategories = props.rewardCategoryList.map((category, categoryIndex) => {
        let rewardList = category.rewards.map((reward, rewardIndex) => {
            return (
                <button
                    className='rewardListItem'
                    id={categoryIndex + '_' + rewardIndex}
                    key={categoryIndex + '_' + rewardIndex}
                    onClick={(e) => { rewardOnClick(e.target.id) }}
                >
                    <Icon
                        fileName={reward.iconType}
                        type={'row'}
                    >
                        {reward.reward}
                    </Icon>
                </button>
            )
        })
        return (
            <div className='rewardCategoryGroup' key={category.category}>
                <h1 className='rewardCategoryName'>{category.category}</h1>
                <div className='rewardCategoryButtonGroup'>
                    {rewardList}
                </div>
            </div>
        )
    })
    return (
        <>{rewardCategories}</>
    )
}

export default RewardListGroup