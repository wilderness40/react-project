import React, {useState} from "react";
import { Sidebar, Button, ScheduleBar } from '../components'

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