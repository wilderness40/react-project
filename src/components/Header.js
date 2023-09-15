import '../styles/Header.css'
import React, {useState} from 'react'
import homeIcons from "../HomeIconsData";
import { useNavigate, useLocation } from "react-router-dom"


function Header({}){

    const navigate = useNavigate()
    const moveToHomePage = () => { // 상단 X버튼 누르면 메인홈페이지로 이동
        navigate('/')
    }
        const iconText = useLocation()  // Icon 컴포넌트의 useNavigate state 값(icon.title)과 Sidebar 컴포넌트의 state값(icon.title)을 iconText로 모두 반환한다
    //   console.log(iconText.state) //  Icon 컴포넌트의 useNavigate state 값
    //   console.log(iconText.state.sidebarText) // Sidebar 컴포넌트의 state값

    return(
        <div className="header">
            <h5>{iconText.state.sidebarText ? iconText.state.sidebarText : iconText.state}</h5> 
            <div className='button-container'>
                <button onClick={moveToHomePage}>X</button>
            </div>
        </div>    
    )
}

export default Header