import React from "react";
import '../styles/Icons.css'
import homeIcons from "../HomeIconsData";


function Icon({ src, children}) {
    // console.log(children)
    return (
        <div className="main-icons">
            <div className="icon-image"><img src={src} /></div>
            <h5>{children}</h5>
        </div>
    )
}

export default Icon