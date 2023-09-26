import React, { useState, useEffect, useRef } from "react";
import { Header , Footer, FoodMenu, FoodKeyword, FoodSearch,
    FoodKakaoMap, FoodList, FoodSearchComponent} from "../components"
import '../styles/Food.css'
import axios from "axios";
function Food({}){
    const [FoodListData, setFoodListData] = useState([])
    const [FoodSearchData, setFoodSearchData] = useState([])
    const [mapState, setMapState] = useState(false)
    const [loadState, setLoadState] = useState(false)
    const [menuSelectTitle, setMenuSelectTitle] = useState(null)
    useEffect( ()=> {
        axios.get('http://127.0.0.1:5300/food')
        .then(res => {
            setFoodListData(res)
        })
    },[])
    useEffect( (e) => {
        document.addEventListener('keydown' , (event) => {
           if(event.keyCode === 13) {
                keywordSearch()
           }
        })
    },[FoodSearchData])
    const addActive = (e) => {
        const activeLi = document.querySelectorAll('li')
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
            setFoodSearchData(res)
            setLoadState(true)
            setMapState(false)
        })
    }
    const menuActive = (e, index) => {
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
        <div className="map-container">
            <div className="mapinfo">
                <h2>밥 먹자</h2>
                <div className="mapinfo-body">
                    <FoodMenu addActive={addActive}></FoodMenu>
                    <FoodSearch keywordSearch={keywordSearch}></FoodSearch>
                    {!loadState ? 
                    <FoodList FoodList={FoodListData} ></FoodList> :
                    <FoodSearchComponent FoodList={FoodSearchData} 
                    selectMenu={menuSelectTitle}></FoodSearchComponent>
                    }
                </div>
            </div>
            <FoodKakaoMap FoodList={FoodListData} searchFood={FoodSearchData} 
            mapState={mapState} loadState={loadState} selectMenu={menuActive}></FoodKakaoMap>
        </div>
        <Footer></Footer>
       </>
    )
}

export default Food