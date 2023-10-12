import React, {useState} from "react";
import {HomeMenubarButton , ScheduleBar, Sidebar, FooterBar} from "../components"
import homeIcons from "../HomeIconsData";
import "../styles/Footer.css"


function Footer({ handleMemoToggle, memoToggle,  userInfo }){
    const loginStatus = userInfo?.login
    console.log(loginStatus)
    const [buttonFlag, setButtonFlag] = useState(false)

    const toggleMenubar = () => {
        setButtonFlag(!buttonFlag)
    }
    const handleSidebarFlag = () => {
        setButtonFlag(false)
    }
    return(
        <footer>
            <Sidebar homeIcons={homeIcons} buttonFlag={buttonFlag} flagChange={handleSidebarFlag}></Sidebar>
            <HomeMenubarButton toggleMenubar={toggleMenubar} />
            <FooterBar handleMemoToggle={handleMemoToggle} memoToggle={memoToggle} homeIcons={homeIcons}></FooterBar>
            {loginStatus ? <div className="Login_status"><h5>로그인됨</h5></div> : <div className="Login_status"><h5>로그인필요</h5></div>}
            <ScheduleBar></ScheduleBar>
        </footer>
    )
}

export default Footer