import React, {useState} from "react";
import homeIcons from "../HomeIconsData";
import { Icon , Footer } from "../components"
import "../styles/Home.css"
import HelpMemo from '../components/HelpMemo'

// 아이콘은 더블클릭으로 한다 ondbclick, onclick하면 active해서 배경 보라색 활성화, 더블클릭하면 페이지이동

function Home(){
    // 메모 창 오픈 토글
    const [memoToggle, setMemoToggle] = useState(true);
    // 메모 창 토글 반전 함수
    const handleMemoToggle = () => {
        setMemoToggle(!memoToggle);
    }

    return(
        <>
            <div className="Home">
                <main>
                    {homeIcons.map((icon, id) => {
                    return (
                        <Icon key={id} src={icon.iconSrc} href={icon.url}>{icon.iconTitle}</Icon>) 
                    })} 
                </main>
            </div>
            <HelpMemo memoToggle={memoToggle} handleMemoToggle={handleMemoToggle}/>
            <Footer handleMemoToggle={handleMemoToggle}></Footer>
        </>
    )
}

export default Home