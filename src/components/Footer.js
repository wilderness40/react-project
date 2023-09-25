import React, {useState} from "react";
import {HomeMenubarButton , ScheduleBar, Sidebar, FooterBar, MinimizeTab} from "../components"
import homeIcons from "../HomeIconsData";
import "../styles/Footer.css"


function Footer({ handleMemoToggle, memoToggle }){
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
            <ScheduleBar></ScheduleBar>
        </footer>
    )
}

export default Footer