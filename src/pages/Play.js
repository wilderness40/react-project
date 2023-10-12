import React, { useEffect, useState } from "react";
import { TvContainer, Header, Footer } from "../components/index"
import YoutubeAPI from "../services/YoutubeAPI";
import "../styles/Play.css"
function Play({userInfo}){
   console.log(userInfo)
   const youTubeApiData = YoutubeAPI()
   const [data , setData] = useState([])
   useEffect( () => {
      setData(youTubeApiData)
   },[youTubeApiData])
    return(
       <>
         <Header></Header>
         <div className="Play">
            <TvContainer youTubeApiData={data}></TvContainer>
         </div>
         <Footer></Footer>
       </>
    )
}

export default Play