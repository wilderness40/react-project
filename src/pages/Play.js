import React, { useState } from "react";
import { TvContainer, Header, Footer } from "../components/index"
import "../styles/Play.css"

function Play({}){
    return(
       <>
         <Header></Header>
         <div className="Play">
            <TvContainer></TvContainer>
            <Footer></Footer>
         </div>
       </>
    )
}

export default Play