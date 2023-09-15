import React, { useState } from "react";
import { Time, Calender, Dday, Todo } from "../components"
// import Time from "./Time";
// import Calender from "./Calender";
// import Dday from "./Dday";
// import Todo from "./Todo";
import '../styles/ScheduleBar.css'

function ScheduleBar() {
    return (
        <>

            <Time></Time>
            {<div className="ScheduleBar-detail-container">
                <Dday></Dday>
                <Todo></Todo>
                <Calender></Calender>
            </div>}
            
        </>
    )
}

export default ScheduleBar