import React, { useEffect, useState } from "react";
import { Time, Calender, Dday, Todo } from "../components"
import '../styles/ScheduleBar.css'

function ScheduleBar() {
    const [toggleOpenDetail, setToggleOpenDetail] = useState(false);

    const handleTimeClick = (e) => {
        e.stopPropagation();
        setToggleOpenDetail(!toggleOpenDetail);
    }
    return (
        <>
            <Time handleTimeClick={handleTimeClick}></Time>
            {toggleOpenDetail ? 
            <div className="ScheduleBar-detail-container">
                <Dday></Dday>
                <Todo></Todo>
                <Calender></Calender>
            </div>
            :<></>}
        </>
    )
}

export default ScheduleBar