import React, { useState, useEffect } from "react";
import { Header , Footer, FoodMenu, FoodKakaoMap, FoodList} from "../components"
import '../styles/Food.css'
import axios from "axios";
function Food({}){
    const [searchFoodData, setSearchFoodData] = useState([])
    const [mapState, setMapState] = useState(false)
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
            const searchKeyword = e.target.children[1].innerText
            if(searchKeyword === '카페') {
                const searchKeywordupdate = '카페·디저트'
                axios.get(`http://127.0.0.1:5300/food/${searchKeywordupdate}`)
                .then(res => {
                    setSearchFoodData(res)
                })
                setMapState(true)
            } else {
                axios.get(`http://127.0.0.1:5300/food/${searchKeyword}`)
                .then(res => {
                    setSearchFoodData(res)
                })
                setMapState(true)
            }
        } else {
            e.target.classList.remove('active')
        }
    }
    const keywordSearch = () => {
        const keyword = document.querySelector('.keyword')
        console.log(keyword.value)
    }
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
                    <FoodList FoodList={searchFoodData}></FoodList>
                </div>
            </div>
            {/* <FoodMap FoodList={searchFoodData} mapState={mapState}></FoodMap> */}
            <FoodKakaoMap FoodList={searchFoodData} mapState={mapState}></FoodKakaoMap>
        </div>
        <Footer></Footer>
       </>
    )
}

export default Food