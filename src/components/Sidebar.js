import React, {useState} from "react";
import '../styles/Sidebar.css'
import { Link } from "react-router-dom"


function Sidebar({homeIcons, buttonFlag}){
    return(
        <>
            <div className={`window-bar ${buttonFlag ? 'show' : ''}`}>
                <div className="window-textbar"><h5>Window<span>95</span></h5></div>
                <div className="window-menubar">
                    {homeIcons.map((icon, id)=>{
                        // console.log(icon)
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