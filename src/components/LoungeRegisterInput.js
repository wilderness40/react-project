import React, { forwardRef } from "react";
import "../styles/LoungeRegisterInput.css"

const LoungeRegisterInput = forwardRef((props, ref) => {
    const { registerText, getChatData } = props
    const handleKeydown = (e) => { // 엔터키로 원글 등록
        if (e.key === 'Enter') {
            if(ref.current[0] !=='' && ref.current[1] !=='' && ref.current[2] !==''){
                registerText()
                getChatData()

            }
        }
    }
    console.log(ref.current)
    return (
        <>
            <div className="lounge__input" onKeyDown={e => handleKeydown(e)}>
                <div className="lounge__input__nameAndPassword">
                    <form onSubmit={(e) => { e.preventDefault(); return false }}>
                        <label htmlFor='nickname'>닉네임</label>
                        <input type='text' id='nickname' placeholder="닉네임 설정" ref={el =>(ref.current[0]=el?.value)}></input>
                        <label htmlFor='password'>비밀번호</label>
                        <input type='password' id='password' placeholder="비밀번호 입력" autoComplete="on" ref={el=>(ref.current[1]=el?.value)}></input>
                    </form>
                </div>

                <div className="lounge__input__text__register">
                    <label htmlFor="text">내용</label>
                    <input type="text" placeholder="글을 입력하세요" id="text" ref={el=>(ref.current[2]=el?.value)}></input>
                    <button type="button" onClick={() => { registerText(); getChatData(); }}>등록</button>
                </div>
            </div>

        </>
    )
})

export default LoungeRegisterInput