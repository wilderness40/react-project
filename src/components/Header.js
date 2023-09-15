import '../styles/Header.css'
import React, {useState} from 'react'
import homeIcons from "../HomeIconsData";
import { Router, useNavigate } from "react-router-dom"


function Header({}){
    const navigate = useNavigate()
    const moveToHomePage = () => { // 상단 X버튼 누르면 메인홈페이지로 이동
        navigate('/')
    }
    const matchUrlAndTitle = () => {
        console.log(window.location.href.split('/').pop())
    }
    return(
        <div className="header">
            <h5>{matchUrlAndTitle}</h5>
            <div className='button-container'>
                <button onClick={moveToHomePage}>X</button>
            </div>
        </div>    
    )
}

export default Header