import React, {useState} from "react";
import homeIcons from "../HomeIconsData";
import { Icon , Footer } from "../components"
import "./Home.css"

// 아이콘은 더블클릭으로 한다 ondbclick, onclick하면 active해서 배경 보라색 활성화, 더블클릭하면 페이지이동

function Home(){
    const [iconActiveFlag, setIconActiveFlag] = useState(false)
    
    return(
        <>
            <div className="Home">
                <main>
                    {homeIcons.map((icon, id) => {
                    return (
                        <Icon key={id} src={icon.iconSrc} iconActiveFlag={iconActiveFlag} >{icon.iconTitle}</Icon>) 
                    })} 
                </main>
            </div>
            <Footer homeIcons={homeIcons}></Footer>
        </>
    )
}

export default Home