import React, {useState} from "react";
import homeIcons from "../HomeIconsData";
import { Icon , Footer } from "../components"
import "../styles/Home.css"

// 아이콘은 더블클릭으로 한다 ondbclick, onclick하면 active해서 배경 보라색 활성화, 더블클릭하면 페이지이동

function Home(){
    return(
        <>
            <div className="Home">
                <main>
                    {homeIcons.map((icon, id) => {
                 console.log(icon.iconSrc)

                    return (
                        <Icon key={id} src={icon.iconSrc}>{icon.iconTitle}</Icon>) 
                    })} 
                </main>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Home