import React, {useState} from "react";
import homeIcons from "../HomeIconsData";
import { Icon , Footer } from "../components"
import "./Home.css"
function Home(){
    return(
        <>
            <div className="Home">
                <main>
                    {homeIcons.map((icon, id) => {
                    return (<Icon key={id} src={icon.iconSrc}>{icon.iconTitle}</Icon>) 
                    })} 
                </main>
            </div>
            <Footer homeIcons={homeIcons}></Footer>
        </>
    )
}

export default Home