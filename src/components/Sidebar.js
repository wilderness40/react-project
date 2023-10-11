import React, {useEffect} from "react";
import '../styles/Sidebar.css'
import { Link } from "react-router-dom"

function Sidebar({homeIcons, buttonFlag, flagChange}){
    // 미해결사항 : 사이드바가 열려있을 때 하단 시계버튼을 클릭하면 사이드바가 사라지지 않는다.
    const anotheClickHideSidebar = (e) => { // 다른 곳을 클릭하면 사이드바가 사라지게 하는 함수
        
        const sidebarmenu = document.querySelector('.window-bar') // 사이드바 
        const footerButton = document.querySelector('footer button')   // 시작버튼
        const footerButtonChildDiv = footerButton.childNodes[0]  // div : 시작버튼의 자식 div
        const footerButtonChildDivImg = footerButton.childNodes[0].children[0] // img : 윈도우 아이콘
        const footerButtonChildDivSpan = footerButton.childNodes[0].children[1] // span : 시작 text

      if(sidebarmenu.classList.contains('showSidebar') // 사이드바가 보여지고 있을 때
      && e.target !== footerButton // footer>button을 제외한 다른 곳을 클릭했을 때
      && e.target !== footerButtonChildDiv // button>div를 제외한 다른 곳을 클릭했을 때
      && e.target !== footerButtonChildDivImg // '윈도우 아이콘'을 다른 곳을 클릭했을 때
      && e.target !== footerButtonChildDivSpan  // '시작' 문구를 제외한 다른 곳을 클릭했을 때  
      )
      { 
        flagChange() // 상위 컴포넌트 footer에서 buttonFlag를 false로 바꿔주는 함수를 props로 받아와서 실행한다.
    }
    
}

useEffect(() => { // 다른 곳을 클릭하면 사이드바가 사라지게 하는 함수를 실행한다.
    document.addEventListener('click', anotheClickHideSidebar); 
    return () => {
      document.removeEventListener('click', anotheClickHideSidebar);  
    };
  }, []);

    return(
        <>
            <div className={`window-bar ${buttonFlag ? 'showSidebar' : ''}`}>  {/* buttonFlag가 true일때 sidebar가 나타난다 */}
                <div className="window-textbar"><h5>Window<span>95</span></h5></div> 
                <div className="window-menubar">
                    {homeIcons.map((icon, id)=>{
                        return (
                                <Link key={id} to={icon.url} state={icon.iconTitle}> {/* Link to로 클릭시 해당 page로 이동, state는 페이지별 header의 text 변경을 위해 설정한다 */} 
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