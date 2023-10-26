import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/LoungeCommentRegister.css"
import LoungeCommentOutput from "./LoungeCommentOutput";


function LoungeCommentRegister({ comment, getCommentData, toggleComment, commentCode, dbCode, chat, HandleModalEdit, passwordMatched, modalPosition, confirmEditText, depth, arrayCode }) {

    const nicknameRef = useRef(null);
    const passwordRef = useRef(null);
    const textRef = useRef(null);
    const inputForm = useRef(null);

    const [dbId, setDbId] = useState(null)

    const registerComment = useCallback(async (dbId) => { // 등록 버튼을 누르면 글이 등록됩니다      
        // 입력값 가져오기
        const nickname = nicknameRef.current.value
        const password = passwordRef.current.value;
        const text = textRef.current.value;

        await fetch('http://127.0.0.1:5300/loungeComment', { // db에 저장
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: nickname,
                password: password,
                text: text,
                parent: dbId,
            })
        })
        getCommentData() // db에서 데이터 가져오기
        // 입력값 초기화
        nicknameRef.current.value = ''
        passwordRef.current.value = ''
        textRef.current.value = ''
    }, [])

    const setDbCode = (e) => { // 닉네임에 글을 입력하면 해당 댓글 부모의 db코드를 가져온다
        const inputCode = e.target.parentNode.nextSibling.querySelector('.dbCode')?.innerText
        setDbId(inputCode)
    }
    
    const handleSubmit = useCallback((e) => { // 엔터키 누르면 글이 등록되고 dbId를 registerComment에 넘겨준다
        if (e.key === 'Enter') { // 이부분을 삭제하니까 2번씩 등록이 된다
            registerComment(dbId)
        }
    }, [dbId, registerComment]) // dbId 의존성배열에 등록 안하면 바로 업데이트 안됨, enter로 등록했을때에는 입력이안된다

    return (
        <>
            {
                arrayCode.includes(chat._id) &&
                <>
                    <LoungeCommentOutput
                        comment={comment.filter(cmt => { return cmt.parent === chat._id })} // 부모가 chat._id인 댓글만 가져온다, 이 부분을 생각하지 못했다, 선생님이 해결해주심
                        commentCode={commentCode}
                        HandleModalEdit={HandleModalEdit}
                        passwordMatched={passwordMatched}
                        modalPosition={modalPosition}
                        confirmEditText={confirmEditText}
                        depth={depth}
                    />
                    <form onSubmit={(e) => { handleSubmit(e); e.preventDefault(); }}>
                        <div className="comment__input" ref={inputForm}>
                            <div className="comment__input__nameAndPassword">
                                <label htmlFor='comment__nickname'>닉네임</label>
                                <input type='text' id='comment__nickname' placeholder="닉네임 설정" ref={nicknameRef} onChange={e=>setDbCode(e)}></input>
                                <label htmlFor='comment__password'>비밀번호</label>
                                <input type='password' id='comment__password' placeholder="비밀번호 입력" autoComplete="on" ref={passwordRef}></input>
                            </div>

                            <div className="comment__input__text__register">
                                <label htmlFor="comment__text">내용</label>
                                <input type="text" placeholder="글을 입력하세요" id="comment__text" ref={textRef}></input>
                                <button type="submit" onClick={() => { registerComment(dbId); getCommentData(); }}>등록</button>
                                <span className='dbCode' style={{ opacity: 0 }} >{chat._id}</span>
                            </div>
                        </div>
                    </form>
                </>
            }
        </>
    )


}

export default LoungeCommentRegister