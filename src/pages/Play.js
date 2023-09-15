import React, { useState } from "react";
import { TvContainer, Footer } from "../components/index"
import "../styles/Play.css"
function Play({}){
    return(
       <>
          <div className="Play">
            <TvContainer></TvContainer>
            <Footer></Footer>
          </div>
       </>
    )
}

export default Play