import React, { useEffect } from "react";
import "../styles/LoungeRegisterInput.css"

function LoungeRegisterInput({ registerText, getChatData }) {

    const handleKeydown = (e) => { // 엔터키로 원글 등록
        if (e.key === 'Enter') {
            registerText()
            getChatData()
        }
    }
    return (
        <>
            <div className="lounge__input" onKeyDown={e => handleKeydown(e)}>
                <div className="lounge__input__nameAndPassword">
                    <form onSubmit={(e) => { e.preventDefault(); return false }}>
                        <label htmlFor='nickname'>닉네임</label>
                        <input type='text' id='nickname' placeholder="닉네임 설정"></input>
                        <label htmlFor='password'>비밀번호</label>
                        <input type='password' id='password' placeholder="비밀번호 입력" autoComplete="on"></input>
                    </form>
                </div>

                <div className="lounge__input__text__register">
                    <label htmlFor="text">내용</label>
                    <input type="text" placeholder="글을 입력하세요" id="text"></input>
                    <button type="button" onClick={() => { registerText(); getChatData(); }}>등록</button>
                </div>
            </div>

        </>
    )

}

export default LoungeRegisterInput