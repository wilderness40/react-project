import '../styles/Header.css'
import React, {useState} from 'react'
import homeIcons from "../HomeIconsData";
import { useNavigate, useLocation } from "react-router-dom"


function Header({}){

    const navigate = useNavigate()
    const moveToHomePage = () => { // 상단 X버튼 누르면 메인홈페이지로 이동
        navigate('/')
    }
        const {state, sidebar} = useLocation()
    console.log(sidebar.title)

    return(
        <div className="header">

            {/* <h5>{state ? state : 'NotFound' && `{${sidebartitle.title} ? ${sidebartitle.title}: 'NotFound'}` }</h5> */}
            <div className='button-container'>
                <button onClick={moveToHomePage}>X</button>
            </div>
        </div>    
    )
}

export default Header