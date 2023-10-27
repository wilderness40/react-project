import React, { useRef } from "react";
import "../styles/LoungeRegisterInput.css"

function LoungeRegisterInput({ getChatData }) {

    const nicknameRef = useRef(null)
    const passwordRef = useRef(null)
    const textRef = useRef(null)

    // 글 등록하기
    const registerText = async (nicknameValue, passwordValue, textValue) => { // 등록 버튼 누르면 글이 서버에 저장되고 웹페이지에서 보여줍니다
        await fetch('http://127.0.0.1:5300/lounge', { // db에 저장
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: nicknameValue,
                password: passwordValue,
                text: textValue
            })
        })
        getChatData() // db에서 데이터 가져오기

        // 입력창 초기화
        nicknameRef.current.value = ''
        passwordRef.current.value = ''
        textRef.current.value = ''
    }

    const handleKeydown = async (e) => { // 엔터키로 원글 등록
        if (e.key === 'Enter') {
            await handleRegister()
        }
    }
    const handleRegister = async () => {
        const nicknameValue = nicknameRef.current.value
        const passwordValue = passwordRef.current.value
        const textValue = textRef.current.value

        if (nicknameValue && passwordValue && textValue) {
            await registerText(nicknameValue, passwordValue, textValue)
            await getChatData()
        }
    }
    return (
        <>
            <div className="lounge__input" onKeyDown={e => handleKeydown(e)}>
                <div className="lounge__input__nameAndPassword">
                    <form onSubmit={(e) => { e.preventDefault(); return false }}>
                        <label htmlFor='nickname'>닉네임</label>
                        <input type='text' id='nickname' placeholder="닉네임 설정" ref={nicknameRef}></input>
                        <label htmlFor='password'>비밀번호</label>
                        <input type='password' id='password' placeholder="비밀번호 입력" autoComplete="on" ref={passwordRef}></input>
                    </form>
                </div>

                <div className="lounge__input__text__register">
                    <label htmlFor="text">내용</label>
                    <input type="text" placeholder="글을 입력하세요" id="text" ref={textRef}></input>
                    <button type="button" onClick={() => { handleRegister(); getChatData(); }}>등록</button>
                </div>
            </div>

        </>
    )
}

export default LoungeRegisterInput