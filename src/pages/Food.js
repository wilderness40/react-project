import React, { useState, useEffect, useRef } from "react";
import { Header , Footer, FoodMenu, FoodSearch, FoodKeyword,
    FoodKakaoMap, FoodList, FoodSearchComponent} from "../components"
import '../styles/Food.css'
import axios from "axios";
function Food({}){
    // 전체 가게 리스트를 저장하기 위한 스테이트 값
    const [FoodListData, setFoodListData] = useState([])

    // 검색된 가게 리스트를 저장하기 위한 스테이트 값
    const [FoodSearchData, setFoodSearchData] = useState([])

    // 키워드에 따라 가게 리스트를 저장하기 위한 스테이트 값
    const [Foodkeyword, setFoodkeyword] = useState(null)

    // 맵 로딩을 위한 스테이트 값
    const [mapState, setMapState] = useState(false)

    // 키워드 선택에 따른 맵 로딩을 위한 스테이트 값
    const [loadState, setLoadState] = useState(false)

    // 메뉴 선택을 한 타이틀 값을 저장하기 위한 스테이트 값
    const [menuSelectTitle, setMenuSelectTitle] = useState(null)
    
    useEffect( ()=> { // 첫 로딩시 사용할 list 불러오기
        axios.get('http://127.0.0.1:5300/food')
        .then(res => {
            setFoodListData(res)
        })
    },[])

    useEffect( (e) => { // 키보드 엔터를 누를시 검색되게 하는 코드
        document.addEventListener('keydown' , (event) => {
           if(event.keyCode === 13) {
                keywordSearch()
           }
        })
    },[FoodSearchData])

    const addActive = (e) => { // 메뉴를 누르면 해당하는 메뉴에 대한 데이터를 가져오기 위한 코드 및 css 입히기 위한 함수
        const activeLi = document.querySelectorAll('li')
        // 메뉴에 acitve 된 것에 대한 css를 초기화 하기 위한 코드
        activeLi.forEach((li) => {
            if(li.className === 'active') {
                li.classList.remove('active')
            }
        })
        if(e.target.tagName === 'LI' && e.target.className !== 'active') {
            e.target.classList.add('active')
            const categoryKeyword = e.target.children[1].innerText
            if(categoryKeyword === '카페') {
                const categoryKeywordupdate = '카페·디저트'
                axios.get(`http://127.0.0.1:5300/food/category/${categoryKeywordupdate}`)
                .then(res => {
                    setFoodkeyword(categoryKeyword)
                    setFoodListData(res)
                    setLoadState(false)
                    setMapState(true)
                })
            } else {
                axios.get(`http://127.0.0.1:5300/food/category/${categoryKeyword}`)
                .then(res => {
                    setFoodkeyword(categoryKeyword)
                    setFoodListData(res)
                    setLoadState(false)
                    setMapState(true)
                })
            }
        } else {
            e.target.classList.remove('active')
        }
    }

    // 키워드에 따라 가게 데이터를 저장하기 위한 함수
    const keywordSearch = (e) => {
        const searchKeyword = document.querySelector('.keyword')
        console.log(searchKeyword.value)
        if(searchKeyword.value !== null && searchKeyword.value !== '') {
            axios.get(`http://127.0.0.1:5300/food/search/${searchKeyword.value}`)
            .then(res => {
                setFoodSearchData(res)
                setLoadState(true)
                setMapState(false)
            })
        }
    }

    const hashTagSelect = (e) => { // 해쉬태그를 클릭시 해당하는 메뉴를 포함하는 식당 데이터를 찾아 저장하기 위한 함수
        const keyword = e.target.innerText
        console.log(keyword)
        axios.get(`http://127.0.0.1:5300/food/hashTag/type=${Foodkeyword}&tag=${keyword}`)
        .then(res => {
            setFoodSearchData(res)
            setLoadState(true)
            setMapState(false)
        })
    }
    
    const customOverlayActive = (e, index) => { // 커스텀 오버레이 마커 선택을 위한 함수
        const markers = document.querySelectorAll('.title')
        const Active = e.target
        const activeTitle = e.target.innerText
        markers.forEach((marker) => {
            if(marker.className === 'title active') {
                marker.classList.remove('active')
            }
        })
        console.log(Active.className)
        if(Active.className !== 'title active') {
            Active.classList.add('active')
            setMenuSelectTitle(activeTitle)
        }
    }
    return(
       <>
        <Header></Header>
        <div className="food-container">
            <div className="food-contents">
                <h2>밥 먹자</h2>
                <div className="food-body">
                    <FoodMenu addActive={addActive}></FoodMenu>
                    <FoodKeyword keyword={Foodkeyword} hashTagSelect={hashTagSelect}></FoodKeyword>
                    <FoodSearch keywordSearch={keywordSearch}></FoodSearch>
                    {!loadState ? 
                    <FoodList FoodList={FoodListData} ></FoodList> :
                    <FoodSearchComponent FoodList={FoodSearchData} 
                    selectMenu={menuSelectTitle}></FoodSearchComponent>
                    }
                </div>
            </div>
            <FoodKakaoMap FoodList={FoodListData} searchFood={FoodSearchData} 
            mapState={mapState} loadState={loadState} selectMenu={customOverlayActive}></FoodKakaoMap>
        </div>
        <Footer></Footer>
       </>
    )
}

export default Food