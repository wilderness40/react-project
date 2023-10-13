import React, {useState} from "react";
import {HomeMenubarButton , ScheduleBar, Sidebar, FooterBar} from "../components"
import homeIcons from "../HomeIconsData";
import "../styles/Footer.css"
import { useCookies } from 'react-cookie';


function Footer({ handleMemoToggle, memoToggle,  userInfo }){
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const loginToken = cookies.accessToken
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
            {loginToken && <div className="Login_status"><a href="/modify">회원정보 수정</a></div>}
            <ScheduleBar></ScheduleBar>
        </footer>
    )
}

export default Footer