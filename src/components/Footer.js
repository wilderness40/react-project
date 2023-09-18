import React, {useState} from "react";
import {Button , ScheduleBar, Sidebar, MinimizeTab } from "../components"
import homeIcons from "../HomeIconsData";
import "../styles/Footer.css"


function Footer({ handleMemoToggle }){
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
            <MinimizeTab handleMemoToggle={handleMemoToggle}>Help</MinimizeTab>
            <ScheduleBar></ScheduleBar>
        </footer>
    )
}

export default Footer