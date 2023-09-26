import React, { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"
import "../styles/CustomOverlayStyle.css"
const { kakao } = window
function FoodKakaoMap({FoodList, mapState, searchFood, 
    loadState, selectMenu, selectRef}) {
    const [positions, setPositions] = useState([
        {   
            REST_NM : '학원',
            LAT : 36.349184947679255,
            LOT : 127.37775416701282
        }
    ])
    const [searchPositions, setSearchPositions] = useState([])
    const [check , setCheck] = useState(false)
    useEffect(()=> {
        if(loadState === true) {
            console.log('test')
            setSearchPositions([searchFood.data])
            setCheck(true)
        }
        console.log(searchPositions)
    },[searchFood])

    useEffect(()=>  {
        if(mapState === true){
            const array = []
            if(FoodList.length !== 0 ) {
                for(let i=0; i<FoodList.data.length; i++) {
                    const data = {
                        REST_NM : FoodList.data[i].REST_NM ,
                        LAT : FoodList.data[i].LAT,
                        LOT : FoodList.data[i].LOT,
                        content : `<div className="customoverlay" key=${i}><a><span className="title">${FoodList.data[i].REST_NM}</span></a></div>`
                    }
                    array.push(data)
                }
                // array.push({
                //     title : '학원',
                //     latlng : new kakao.maps.LatLng(36.349184947679255, 127.37775416701282) ,
                // })
            }
            setPositions(array)
        }
    },[FoodList])
    // const menuAcive = (e) => {
    //     console.log(e.target)
    // }
    if(mapState === false) {
        return (
            <Map
                center={{
                    lat: 36.349184947679255, 
                    lng: 127.37775416701282
                }}
                style={{
                    width : "70%",
                    height : "930px",
                }}
                level={3}
            >
                {check === false ? positions.map((position, index) => {
                    return (
                        <>
                            <MapMarker
                                position={{
                                    lat : position.LAT ,
                                    lng : position.LOT
                                }}
                                image={{
                                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                                    size: {
                                        width: 24,
                                        height: 35
                                        },
                                    }}
                                title={position.REST_NM}
                            />
                            <CustomOverlayMap
                                position={{
                                    lat : position.LAT ,
                                    lng : position.LOT
                                }}>
                                <div className="customoverlay">
                                    <a>
                                        <span className="title">{position.REST_NM}</span>
                                    </a>
                                </div>
                            </CustomOverlayMap>
                        </>
                    )
                }) : 
                searchPositions[0].map( (searchPosition, index) => {
                    return(
                        <>
                            <MapMarker
                                position={{
                                    lat : searchPosition.LAT ,
                                    lng : searchPosition.LOT
                                }}
                                image={{
                                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                                    size: {
                                        width: 24,
                                        height: 35
                                        },
                                    }}
                                title={searchPosition.REST_NM}
                            />
                            <CustomOverlayMap
                                position={{
                                    lat : searchPosition.LAT ,
                                    lng : searchPosition.LOT
                                }}>
                                <div className="customoverlay" ref={selectRef} onClick={selectMenu} key={index}>
                                    <a>
                                        <span className="title">{searchPosition.REST_NM}</span>
                                    </a>
                                </div>
                            </CustomOverlayMap>
                        </>
                    )
                })
            }

            </Map>
        )
    } 
    else if(mapState === true){
        console.log(positions)
        return (
            <Map
                center={{
                    lat: 36.349184947679255, 
                    lng: 127.37775416701282
                }}
                style={{
                    width : "70%",
                    height : "930px",
                }}
                level={4}
                >
                {positions.map((data, index) => (
                    <MapMarker
                        position={{
                            lat : data.LAT,
                            lng : data.LOT,
                        }}
                        title={data.REST_NM}
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