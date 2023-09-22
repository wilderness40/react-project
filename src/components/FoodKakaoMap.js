import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk"
const { kakao } = window
function FoodKakaoMap({FoodList, mapState}) {
    const [positions, setPositions] = useState([
        {
            title : '학원',
            latlng : {
                lat : 36.349184947679255,
                lng : 127.37775416701282
            },
            content : <div class ="label"><span class="left"></span><span class="center">학원</span><span class="right"></span></div>,
        }
    ])
    useEffect(()=>  {
        if(mapState === false) {
            console.log(positions)
        }
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
                    // new kakao.maps.LatLng(FoodList.data[i].LAT, FoodList.data[i].LOT),
                    content : <div class ="label"><span class="left"></span><span class="center">학원</span><span class="right"></span></div>,
                }
                array.push(data)
            }
            array.push({
                title : '학원',
                latlng : new kakao.maps.LatLng(36.349184947679255, 127.37775416701282) ,
                content : <div class ="label"><span class="left"></span><span class="center">학원</span><span class="right"></span></div>,
            })
        }
        setPositions(array)
    }
    },[FoodList])
    if(mapState === false) {
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
                        lat : positions[0].latlng.lat ,
                        lng : positions[0].latlng.lng
                    }}
                    image={{
                        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                        size: {
                            width: 24,
                            height: 35
                            },
                        }}
                    content={positions[0].content}
                    title={positions[0].title}
                    ></MapMarker>
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
                        content={data.content}
                    ></MapMarker>
                ))}
            </Map>
        )
    }
}

export default FoodKakaoMap

FoodKakaoMap.defaultProps = {

    mapState : false,
}