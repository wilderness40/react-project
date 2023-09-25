import React from "react";

function LoungeModal({ editModalText, onChange, updateInputValue, modalPosition }){
    return(
        <>
            {modalPosition ? (
                <div className={`checkPasswordModal`} 
                style={{
                        top: modalPosition.top + window.scrollY,
                        left: modalPosition.left + window.scrollX,
                    }} >
                        <h5>비밀번호 확인</h5>
                        <div className="passwordCheck">
                            <input type='password' className='editPassword' id='editPassword' onChange={onChange} />
                            <button type="button" className="submit" onClick={(e)=>editModalText(e)}>확인</button>
                        </div>
                    </div>
                ) : null}   
        </>
    )
}

export default LoungeModal