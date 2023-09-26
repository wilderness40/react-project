import React from "react";
import '../styles/ScreenSaver.css'
function ScreenSaver({state}) {
    return (
        <>
            <div className={`screen-container ${state ? 'open' : 'close'}`}>
                <span> </span>
            </div>
        </>
    )
}
export default ScreenSaver