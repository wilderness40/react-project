import React, { useEffect, forwardRef } from "react";
import '../styles/Sidebar.css'
import { Link } from "react-router-dom"
import { useCookies } from 'react-cookie';


const Sidebar = forwardRef((props, ref) => {
    const {homeIcons, buttonFlag,  setLoginModalState, setOptionModalState } = props
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
   
    const handleLoginModal = () => {
        setLoginModalState(true)
    }
    const handleOptionModal = () => {
        setOptionModalState(true)
    }
    const handleLogout = () => { 
        removeCookie('accessToken');
        window.location.reload()
    }

    return (
        <>
            <div className={`window-bar ${buttonFlag ? 'showSidebar' : ''}`} ref={el=>ref.current[0]=el}>  {/* buttonFlag가 true일때 sidebar가 나타난다 */}
                <div className="window-textbar"><h5>Window<span>95</span></h5></div>
                <div className="window-menubar">
                    {homeIcons.map((icon, id) => {
                        return (
                            <React.Fragment key={id}> 
                                {icon.iconTitle === '로그인' ? (
                                    <div onClick={handleLoginModal}>
                                        <img src={icon.iconSrc} alt="" />
                                        {icon.iconTitle}
                                    </div>
                                ) : icon.iconTitle === '설정' ? (
                                    <div onClick={handleOptionModal}>
                                        <img src={icon.iconSrc} alt="" />
                                        {icon.iconTitle}
                                    </div>
                                ) : icon.iconTitle === '로그아웃' ? (
                                    <div onClick={handleLogout}>
                                        <img src={icon.iconSrc} alt="" />
                                        {icon.iconTitle}
                                    </div>)
                                    : (
                                        <Link to={icon.url} state={icon.iconTitle}>
                                            <div>
                                                <img src={icon.iconSrc} alt="" />
                                                {icon.iconTitle}
                                            </div>
                                        </Link>
                                    )}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </>
    )
})

export default Sidebar