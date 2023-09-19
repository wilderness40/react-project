import React, {useEffect, useState} from "react";

function DaejeonFoodAPI() {
    const [foodApiData, setFoodApiData] = useState([])
    const API_KEY = process.env.REACT_APP_FOOD_API_KEY
    useEffect(() => {
        fetch(`http://bigdata.daejeon.go.kr/api/stores?serviceKey=${API_KEY}?format=json`)
        .then(res => res.json())
        .then(result => {
            setFoodApiData(result)
            console.log(result)
        },[])
    }) 
    return foodApiData
}
export default DaejeonFoodAPI