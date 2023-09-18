import React, {useState, useEffect} from "react";
import '../styles/Sidebar.css'
import { Link } from "react-router-dom"


function Sidebar({homeIcons, buttonFlag, flagChange}){
    const [sidebarState, setSidebarState] =useState('')

    const anotheClickHideSidebar = (e) => { // 다른 곳을 클릭하면 사이드바가 사라지게 하는 함수
        
        const sidebarmenu = document.querySelector('.window-bar')
        const footerButton = document.querySelector('footer button')   
        const footerButtonChildDiv = footerButton.childNodes[0]  
        const footerButtonChildDivImg = footerButton.childNodes[0].children[0] 
        const footerButtonChildDivSpan = footerButton.childNodes[0].children[1] 

        console.log(footerButtonChildDiv)
      if(sidebarmenu.classList.contains('showSidebar') // 사이드바가 보여지고 있을 때
      && e.target !== footerButton // footer button을 제외한 다른 곳을 클릭했을 때
      && e.target !== footerButtonChildDiv // footer button의 자식 div를 제외한 다른 곳을 클릭했을 때
      && e.target !== footerButtonChildDivImg // footer button의 자식 div의 자식 img를 제외한 다른 곳을 클릭했을 때
      && e.target !== footerButtonChildDivSpan  // footer button의 자식 div의 자식 span을 제외한 다른 곳을 클릭했을 때  
      )
      { 
        flagChange() // 상위 컴포넌트 footer에서 buttonFlag를 false로 바꿔주는 함수를 props로 받아와서 실행한다.
    }
}

useEffect(() => { 
    document.addEventListener('click', anotheClickHideSidebar); 
    return () => {
      document.removeEventListener('click', anotheClickHideSidebar);  
    };
  }, []);


    return(
        <>
            <div className={`window-bar ${buttonFlag ? 'showSidebar' : ''}`}>
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