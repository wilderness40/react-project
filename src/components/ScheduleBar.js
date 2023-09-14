import React, {useState} from "react";
import {Time , Calender, Dday, Todo} from "../components"
// import Time from "./Time";
// import Calender from "./Calender";
// import Dday from "./Dday";
// import Todo from "./Todo";

function ScheduleBar(){
    return(
        <>
            <Time></Time>
            <Calender></Calender>
            <Dday></Dday>
            <Todo></Todo>
       </>
    )
}

export default ScheduleBar