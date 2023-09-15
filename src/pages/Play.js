import React, { useState } from "react";
<<<<<<< HEAD
import { TvContainer, NewsPaper } from "../components/index"
import { Header , Footer } from "../components"

function Play({}){
    return(
       <>
         <Header></Header>
         <TvContainer></TvContainer>
         <Footer></Footer>
=======
import { TvContainer, Footer } from "../components/index"
import "../styles/Play.css"
function Play({}){
    return(
       <>
          <div className="Play">
            <TvContainer></TvContainer>
            <Footer></Footer>
          </div>
>>>>>>> 4e58def85adf17ba98d5330e5fe7f282b78eb7d4
       </>
    )
}

export default Play