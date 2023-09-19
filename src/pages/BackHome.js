import React, { useState, useEffect } from "react";
import { Header , Footer } from "../components"
// import mapApi from "../services/Map";
const { kakao } = window

function BackHome({}){
    // const mapData = mapApi()
    useEffect( ()=> {
        const mapContainer = document.getElementById('map')
        const mapOptions = {
            center : new kakao.maps.LatLng(36.349595616136654, 127.37540834451424) ,
            level: 3 ,
        }
        console.log(mapOptions)
        const map = new kakao.maps.Map(mapContainer, mapOptions)
    },[])
    const mapStyle = {
        width : "50%",
        height : "50%",
    }
    return(
       <>
            <Header></Header>
            <div id="map" style={mapStyle}>

            </div>
            <Footer></Footer>
       </>
    )
}

export default BackHome