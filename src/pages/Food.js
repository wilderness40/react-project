import React, { useState, useEffect } from "react";
import { Header , Footer, FoodMenu, 
    FoodKakaoMap, FoodList, FoodSearchComponent} from "../components"
import '../styles/Food.css'
import axios from "axios";
function Food({}){
    const [FoodListData, setFoodListData] = useState([])
    const [FoodSearchData, setFoodSearchData] = useState([])
    const [mapState, setMapState] = useState(false)
    const [loadState, setLoadState] = useState(false)
    useEffect( ()=> {
        axios.get('http://127.0.0.1:5300/food')
        .then(res => {
            setFoodListData(res)
        })
    },[])
    const addActive = (e) => {
        const activeLi = document.querySelectorAll('li')
        activeLi.forEach((li) => {
            if(li.className === 'active') {
                li.classList.remove('active')
            }
        })
        if(e.target.tagName === 'LI' && e.target.className !== 'active') {
            e.target.classList.add('active')
            // console.log(e.target.children[1].innerText)
            const categoryKeyword = e.target.children[1].innerText
            if(categoryKeyword === '카페') {
                const categoryKeywordupdate = '카페·디저트'
                axios.get(`http://127.0.0.1:5300/food/category/${categoryKeywordupdate}`)
                .then(res => {
                    setFoodListData(res)
                    setLoadState(false)
                    setMapState(true)
                })
            } else {
                axios.get(`http://127.0.0.1:5300/food/category/${categoryKeyword}`)
                .then(res => {
                    setFoodListData(res)
                    setLoadState(false)
                    setMapState(true)
                })
            }
        } else {
            e.target.classList.remove('active')
        }
    }
    const keywordSearch = (e) => {
        const searchKeyword = document.querySelector('.keyword')
        axios.get(`http://127.0.0.1:5300/food/search/${searchKeyword.value}`)
        .then(res => {
            console.log(res)
            setFoodSearchData(res)
            setLoadState(true)
            setMapState(false)
        })
    }
    console.log(FoodSearchData)
    return(
       <>
        <Header></Header>
        <div class="map-container">
            <div class="mapinfo">
                <h2>밥 먹자</h2>
                <div class="mapinfo-body">
                    <FoodMenu addActive={addActive}></FoodMenu>
                    <div className="foodSearch-container">
                        <input type="text" className="keyword"></input>
                        <button className="searchBtn" onClick={keywordSearch}>검색</button>
                    </div>
                    {loadState === false ? 
                    <FoodList FoodList={FoodListData}></FoodList> :
                    <FoodSearchComponent FoodList={FoodSearchData}></FoodSearchComponent>
                    }
                    
                </div>
            </div>
            <FoodKakaoMap FoodList={FoodListData} searchFood={FoodSearchData} 
            mapState={mapState} loadState={loadState}></FoodKakaoMap>
        </div>
        <Footer></Footer>
       </>
    )
}

export default Food