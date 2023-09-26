import React from "react";

function LoungeModal({ editModalText, onChange, updateInputValue, modalPosition, modalStyle }){
    return(
        <>
            {modalPosition ? (
                <div className={`checkPasswordModal ${ !modalStyle ? modalStyle : 'password-incorrect'}`} 
                style={{
                        top: modalPosition.top + window.scrollY,
                        left: modalPosition.left + window.scrollX,
                    }} >
                        { !modalStyle ? <h5>비밀번호 확인</h5> : <h5 className="password-incorrect-text">비밀번호가 일치하지 않습니다.</h5> }
                        <div className="passwordCheck">
                            <input type='password' className='editPassword' id='editPassword' onChange={onChange} value={updateInputValue}/>
                            <button type="button" className="submit" onClick={(e)=>editModalText(e)}>확인</button>
                        </div>
                    </div>
                ) : null}   
        </>
    )
}

export default LoungeModal