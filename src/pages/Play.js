import React, { useEffect, useState } from "react";
import { TvContainer, Header, Footer } from "../components/index"
import YoutubeAPI from "../services/YoutubeAPI";
import "../styles/Play.css"
function Play({userInfo}){
   const [data , setData] = useState([])
   const API_KEY = process.env.REACT_APP_Youtube_API_KEY;
   useEffect( ()=> {
      console.log(userInfo)
       fetch('http://127.0.0.1:5300/youtube')
       .then( res => res.json())
       .then(response => {
           setData(response)
       })
   },[])
    return(
       <>
         <Header></Header>
         <div className="Play">
            <TvContainer youTubeApiData={data}></TvContainer>
         </div>
         <Footer userInfo={userInfo}></Footer>
       </>
    )
}

export default Play