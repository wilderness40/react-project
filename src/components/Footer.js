import React, {useState} from "react";
import {Button , ScheduleBar, Sidebar} from "../components"
import homeIcons from "../HomeIconsData";
import "../styles/Footer.css"


function Footer({}){
    const [buttonFlag, setButtonFlag] = useState(false)

    const toggleMenubar = () => {
        setButtonFlag(!buttonFlag)
    }

    return(
        <footer>
            <Sidebar homeIcons={homeIcons} buttonFlag={buttonFlag}></Sidebar>
            <Button toggleMenubar={toggleMenubar} />
            <ScheduleBar></ScheduleBar>
        </footer>
    )
}

export default Footer