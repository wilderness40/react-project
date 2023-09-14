import React, {useState} from "react";
import '../assets/styles/Sidebar.css'
import { Link } from "react-router-dom"


function Sidebar({homeIcons}){
    return(
        <>
            <div className="window-bar">
                <div className="window-textbar"></div>
                <div className="window-menubar">
                    {homeIcons.map((icon, id)=>{
                        return (
                                <Link key={id} to={icon.url}>
                                   <div> 
                                    <img src={icon.iconSrc}  alt='' /> 
                                    {icon.iconTitle}
                                    </div>
                                </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Sidebar