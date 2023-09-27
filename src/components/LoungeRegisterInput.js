import React from "react";
import "../styles/LoungeRegisterInput.css"

function LoungeRegisterInput({registerText}){

    return (
        <>
             <div className="lounge__input">
                       <div className="lounge__input__nameAndPassword"> 
                         <label htmlFor='nickname'>닉네임</label>
                            <input type='text' id='nickname' placeholder="닉네임 설정"></input>
                         <label htmlFor='password'>비밀번호</label>    
                            <input type='password' id='password' placeholder="비밀번호 입력"></input>
                        </div>

                        <div className="lounge__input__text__register">
                            <label htmlFor="text">내용</label>
                            <input type="text" placeholder="글을 입력하세요" id="text"></input>
                            <button type="button" onClick={registerText}>등록</button>
                        </div>
                    </div>
        
        </>
    )

}

export default LoungeRegisterInput