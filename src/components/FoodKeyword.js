import React, {useEffect, useState} from 'react'
import FoodKeywordData from '../FoodKeywordData'
import '../styles/FoodKeyword.css'
function FoodKeyword({keyword, hashTagSelect}) {
    const [keywordData, setKeywordData] = useState([])
    useEffect(() => {
        FoodKeywordData.filter((data) => {
            if(data.title === keyword) {
                setKeywordData(data.keyword)
            }
        })
    },[keyword])
    return (
        <>
            <div className='food-keywordContainer'>
                {keywordData.map( (keyword) => {
                    return (
                        <div className='food-keywordContents' onClick={hashTagSelect}>
                            <span>{keyword}</span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default FoodKeyword