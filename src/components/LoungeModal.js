import React, { useCallback, useEffect, useRef } from "react";

function LoungeModal({ editModalText, onChange, updateInputValue, modalPosition, modalStyle, setModalPosition, setUpdateInputValue }) {
    
    const modalRef = useRef(null) // 모달창 닫기, useRef로 변경
    useEffect(() => { // 모달창 바깥을 클릭하면 모달창이 닫히도록
        const clickModalOutside = (e) => {
            e.stopPropagation()
            if (modalPosition && !modalRef.current.contains(e.target)) {
                setModalPosition(null)
                setUpdateInputValue('')
            }
        }
        document.addEventListener('click', clickModalOutside)
        return () => {  // clean up
            document.removeEventListener('click', clickModalOutside)
        }
    }, [modalPosition]) // modalPosition이 바뀔때마다 useEffect가 실행됩니다

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
                    ref={modalRef}
                >
                    {!modalStyle ? <h5>비밀번호 확인</h5> : <h5 className="password-incorrect-text"><img width="48" height="48" src="images/warning.png" alt="warning-emoji" />비밀번호가 일치하지 않습니다</h5>}
                    <div className="passwordCheck">
                        <form onSubmit={(e) => { handleKeyDown(e); e.preventDefault(); }}>
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