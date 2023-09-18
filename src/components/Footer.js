import React, {useState} from "react";
import {Button , ScheduleBar, Sidebar, FooterBar} from "../components"
import homeIcons from "../HomeIconsData";
import "../styles/Footer.css"


function Footer({}){
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
            <Button toggleMenubar={toggleMenubar} />
            <FooterBar homeIcons={homeIcons}></FooterBar>
            <ScheduleBar></ScheduleBar>
        </footer>
    )
}

export default Footer