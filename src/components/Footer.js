import React, {useState} from "react";
import {Button , ScheduleBar, Sidebar} from "../components"
import "../assets/styles/Footer.css"


function Footer({homeIcons}){
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