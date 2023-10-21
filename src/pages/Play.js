import React, { useEffect, useState } from "react";
import { TvContainer, Header, Footer } from "../components/index"
import "../styles/Play.css"

function Play({userInfo}){
   const [data , setData] = useState([])
   useEffect( ()=> {
      console.log(userInfo)
       fetch('http://127.0.0.1:5300/youtube')
       .then((res) => {
         if(!res.ok){
            throw new Error('YouTube 서버 통신이 원활하지 않습니다.')
         }
         return res.json();
       })
       .then((result) => {
         const newData = result.data.map((item) => {return {snippet:item.snippet, id:item.id}})
         setData(newData)
       })
       .catch(error => console.log(error))
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