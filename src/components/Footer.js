import React, { useState, useRef, useEffect } from "react";
import { HomeMenubarButton, ScheduleBar, Sidebar, FooterBar } from "../components"
import { useCookies } from 'react-cookie';
import homeIcons from "../HomeIconsData";
import "../styles/Footer.css"


function Footer({ handleMemoToggle, memoToggle, userInfo, setLoginModalState, setOptionModalState }) {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const loginToken = cookies.accessToken
    const [buttonFlag, setButtonFlag] = useState(false)
    const startButtonRef = useRef([]); // sidebar와 homeMenubarButton의 ref를 담을 배열

    const toggleMenubar = () => {
        setButtonFlag(!buttonFlag)
    }
    const handleSidebarFlag = () => {
        setButtonFlag(false)
    }

    const anotheClickHideSidebar = (e) => { // 다른 곳을 클릭하면 사이드바가 사라지게 하는 함수
        e.stopPropagation();
       const sidebarMenu = startButtonRef.current[0]
       const HomeMenubarButton = startButtonRef.current[1]

        if (!sidebarMenu.contains(e.target) 
        && !HomeMenubarButton.contains(e.target)){
            handleSidebarFlag() 
        }
    }

    useEffect(() => { // 다른 곳을 클릭하면 사이드바가 사라지게 하는 함수를 실행한다.
        document.addEventListener('click', anotheClickHideSidebar);
        return () => {
            document.removeEventListener('click', anotheClickHideSidebar);
        };
    }, []);

    return (
        <footer>
            <Sidebar
                homeIcons={homeIcons}
                buttonFlag={buttonFlag}
                setLoginModalState={setLoginModalState}
                setOptionModalState={setOptionModalState}
                ref={startButtonRef}
            ></Sidebar>
            <HomeMenubarButton
                toggleMenubar={toggleMenubar}
                ref={startButtonRef}
            />
            <FooterBar
                handleMemoToggle={handleMemoToggle}
                memoToggle={memoToggle}
                homeIcons={homeIcons}
            />
            {loginToken && <div className="Login_status"><a href="/modify"><img src="/images/user.png" alt='userModify' />회원정보 수정</a></div>}
            <ScheduleBar></ScheduleBar>
        </footer>
    )
}

export default Footer