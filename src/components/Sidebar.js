import React, {useState, useEffect} from "react";
import '../styles/Sidebar.css'
import { Link } from "react-router-dom"


function Sidebar({homeIcons, buttonFlag}){
//     const [sidebarState, setSidebarState] =useState('')

//     const anotheClickHideSidebar = (e) => {
//         console.log(e.target)
//     const sidebarmenu = document.querySelector('.window-bar')
//       console.log(sidebarmenu)
//       if(
//             sidebarmenu &&         
//             e.target !== sidebarmenu 
//       )
//       {
//         sidebarmenu.classList.remove('show')
//       }
// }

// useEffect(() => { 
//     document.addEventListener('click', anotheClickHideSidebar);
//     return () => {
//       document.removeEventListener('click', anotheClickHideSidebar);  
//     };
//   }, []);


    return(
        <>
            <div className={`window-bar ${buttonFlag ? 'show' : ''}`}>
                <div className="window-textbar"><h5>Window<span>95</span></h5></div>
                <div className="window-menubar">
                    {homeIcons.map((icon, id)=>{
                        return (
                                <Link key={id} to={icon.url} state={{sidebarText : icon.iconTitle}}>
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