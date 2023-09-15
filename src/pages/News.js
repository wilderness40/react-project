import React, { useState } from "react";
import NewsPaper from "../components/NewsPaper";
import { Header , Footer } from "../components"


function News({}){
    return(
       <>
         <Header></Header>   
         <NewsPaper></NewsPaper>  
         <Footer></Footer>
       </>
    )
}

export default News