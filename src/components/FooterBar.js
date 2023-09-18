import '../styles/FooterBar.css'

import React, {useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom"

function FooterBar({handleMemoToggle, memoToggle}){
    const iconText = useLocation() // Icon 컴포넌트의 useNavigate state 값(icon.title)과 Sidebar 컴포넌트의 state값(icon.title)을 iconText로 모두 반환한다
   
    // 하단 return문 <div>컨텐츠 문 앞에 ()를 하지 않으면 오류가 발생한다.
    return( 
        iconText.state !== null ? // Icon 컴포넌트의 useNavigate state 값이 null이 아닐 때만 FooterBar 컴포넌트를 렌더링한다.
       (<div className="footerBar"> 
            <span>😊</span><h5>{iconText.state.sidebarText ? iconText.state.sidebarText : iconText.state}</h5>
        </div>)
        :   (<div className={`Minimize-tab ${memoToggle ? '' :  'Minimize-tab-off'}`} onClick={handleMemoToggle}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOySF_Ur3n71KsGeLUgeuwuoE-2FkxxLZeUA&usqp=CAU" alt="minimize-icon"/>
        사이트 사용법
      </div>   )
    )
}

export default FooterBar