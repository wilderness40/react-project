import React, {useState} from "react";
import {Button , ScheduleBar, Sidebar} from "../components"

function Footer({homeIcons}){
    return(
        <footer>
            <Sidebar homeIcons={homeIcons}></Sidebar>
            <Button></Button>
            <ScheduleBar></ScheduleBar>
        </footer>
    )
}

export default Footer