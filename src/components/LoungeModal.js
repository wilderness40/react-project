import React, { useCallback } from "react";

function LoungeModal ({editModalText, onChange, updateInputValue, modalPosition, modalStyle}){

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            editModalText(e)
        }
    }, [editModalText])

    return (
        <>
            {modalPosition && ( // modalPosition이 있을 때만 모달창이 뜨도록
                <div className={`checkPasswordModal ${!modalStyle ? modalStyle : 'password-incorrect'}`}
                    style={{
                        top: modalPosition.top + window.scrollY,
                        left: modalPosition.left + window.scrollX,
                    }} 
                    >
                    {!modalStyle ? <h5>비밀번호 확인</h5> : <h5 className="password-incorrect-text"><img width="48" height="48" src="images/warning.png" alt="warning-emoji" />비밀번호가 일치하지 않습니다</h5>}
                    <div className="passwordCheck">
                        <form onSubmit={(e) => { handleKeyDown(e); e.preventDefault();}}>
                            <input type='password' className='editPassword' id='editPassword' onChange={onChange} value={updateInputValue} autoComplete='on' />
                            <button type="submit" className="submit" onClick={(e) => editModalText(e)}>확인</button>
                        </form>

                    </div>
                </div>
            )}
        </>
    )
}

export default LoungeModal