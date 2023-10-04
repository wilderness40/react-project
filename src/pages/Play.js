import React, { useState } from "react";
import { TvContainer, Header, Footer } from "../components/index"
import "../styles/Play.css"

function Play({}){
    return(
       <>
         <Header></Header>
         <div className="Play">
            <TvContainer></TvContainer>
         </div>
         <Footer></Footer>
       </>
    )
}

export default Play