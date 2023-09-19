import React, {useEffect, useState} from "react";

function Map() {
    const [mapData, setMapData] = useState([])
    const REST_API_KEY = process.env.REACT_APP_MAP_API_KEY
    useEffect( () => {
        fetch('https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.37540834451424&y=36.349333418390394', {
            method: 'GET',
            // headers: {Authorization : "KakaoAK" `${REST_API_KEY}`}
            headers: {Authorization : "KakaoAK d421028882d820fc76a68311971911b4"}
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            setMapData(result)
        })
    },[])
    return mapData
}
export default Map