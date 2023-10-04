import React, {useEffect, useState} from 'react'
import FoodKeywordData from '../FoodKeywordData'
import '../styles/FoodKeyword.css'
function FoodKeyword({keyword, hashTagSelect}) {

    // 선택된 메뉴 키워드를 저장하기 위한 스테이트 값
    const [keywordData, setKeywordData] = useState([])

    useEffect(() => { // 선택된 메뉴 키워드를 기준으로 임의의 추천해주는 해쉬태크를 보여주기 위한 코드
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