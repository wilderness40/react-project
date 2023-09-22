import React, { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"
import "../styles/CustomOverlayStyle.css"
const { kakao } = window
function FoodKakaoMap({FoodList, mapState, searchFood, loadState}) {
    console.log(FoodList)
    console.log(searchFood)
    console.log(loadState)
    const [searchPositions, setSearchPositions] = useState([
            {   
                REST_NM : '학원',
                LAT : 36.349184947679255,
                LOT : 127.37775416701282
            }
        ])
    const [positions, setPositions] = useState([])
    
    useEffect(()=> {
        if(loadState === true) {
            console.log('test')
            setSearchPositions([searchFood.data])
        }
        console.log(searchPositions)
    },[searchFood])

    useEffect(()=>  {
        if(mapState === true){
        const array = []
        if(FoodList.length !== 0 ) {
            for(let i=0; i<FoodList.data.length; i++) {
                const data = {
                    title : FoodList.data[i].REST_NM ,
                    latlng : {
                        lat : FoodList.data[i].LAT,
                        lng : FoodList.data[i].LOT,
                    },
                    content : `<div className="customoverlay" key=${i}><a><span className="title">${FoodList.data[i].REST_NM}</span></a></div>`
                }
                array.push(data)
            }
            array.push({
                title : '학원',
                latlng : new kakao.maps.LatLng(36.349184947679255, 127.37775416701282) ,
            })
        }
        setPositions(array)
    }
    },[FoodList])
    if(mapState === false) {
        console.log(searchPositions)
        return (
            <Map
                center={{
                    lat: 36.349184947679255, 
                    lng: 127.37775416701282
                }}
                style={{
                    width : "70%",
                    height : "850px",
                }}
                level={3}
            >
                <MapMarker
                    position={{
                        lat : searchPositions[0].LAT ,
                        lng : searchPositions[0].LOT
                    }}
                    image={{
                        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                        size: {
                            width: 24,
                            height: 35
                            },
                        }}
                    title={searchPositions[0].REST_NM}
                    ></MapMarker>
                    <CustomOverlayMap
                        position={{
                            lat : searchPositions[0].LAT ,
                            lng : searchPositions[0].LOT
                        }}>
                        <div className="customoverlay">
                            <a>
                                <span className="title">{searchPositions[0].REST_NM}</span>
                            </a>
                        </div>
                    </CustomOverlayMap>
            </Map>
        )
    } 
    else if(mapState === true){
        return (
            <Map
                center={{
                    lat: 36.349184947679255, 
                    lng: 127.37775416701282
                }}
                style={{
                    width : "70%",
                    height : "850px",
                }}
                level={3}
                >
                {positions.map((data, index) => (
                    <MapMarker
                        key={index}
                        position={{
                            lat : data.latlng.lat,
                            lng : data.latlng.lng
                        }}
                        title={data.title}
                    >
                    </MapMarker>
                ))}
            </Map>
        )
    }
}

export default FoodKakaoMap

FoodKakaoMap.defaultProps = {

    mapState : false,
}