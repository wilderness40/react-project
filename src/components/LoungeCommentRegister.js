import React, { useState, useEffect, useRef } from "react";
import "../styles/LoungeCommentRegister.css"
import LoungeCommentOutput from "./LoungeCommentOutput";


function LoungeCommentRegister({ comment, getCommentData, toggleComment, commentCode, dbCode, chat, HandleModalEdit, passwordMatched, modalPosition, confirmEditText, depth, arrayCode }) {
    const getCode = useRef(null)
    const [ dbId, setDbId ] =useState(null)
    
    const [ inputId, setInputId ] = useState(null)
    const [ inputPassword, setInputPassword ] = useState(null)
    const [ inputText, setInputText ] = useState(null)

    useEffect(() => {
        getCommentData()
    }, [])

    // useEffect(() => {
    //     const ids = document.querySelectorAll("#comment__nickname")
    //     ids?.forEach((id) => setInputId(id.value))

    //     const passwords = document.querySelectorAll("#comment__password").value;
    //     passwords?.forEach((password) => setInputPassword(password.value))

    //     const texts = document.querySelectorAll("#comment__text").value;
    //     texts?.forEach((text) => setInputText(text.value))

    //     console.log(inputId, inputPassword, inputText)
    // }, [])

    const registerComment = (dbId) => { // 등록 버튼을 누르면 글이 등록됩니다
        // 댓글창이 여러개 열리면서 id, password, text가 여러개 생겨서 처리를 다시해야한다, 배열활용?
        const id = document.querySelector("#comment__nickname").value;   
        const password = document.querySelector("#comment__password").value;
        const text = document.querySelector("#comment__text").value;
        console.log(id, password, text)
        // getCode.current.focus()
        // console.log(getCode.current.focus())
        
        fetch('http://127.0.0.1:5300/loungeComment', { // db에 저장
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: id,
                password: password,
                text: text,
                parent: dbId, // 여기를 수정해야한다
            })
        })
        getCommentData() // db에서 데이터 가져오기


        // 입력창 초기화
        document.querySelector("#comment__nickname").value = "";
        document.querySelector("#comment__password").value = "";
        document.querySelector("#comment__text").value = "";
    }

    useEffect(() => { // 엔터키 누르면 글이 등록됩니다
        const handleKeydown = (e) => {
            // console.log(e.target.parentNode.querySelector('.dbCode')?.innerText)
            const inputCode = e.target.parentNode.querySelector('.dbCode')?.innerText
            setDbId(inputCode)
            console.log(dbId)
            if (e.key === 'Enter') {
                registerComment(dbId)
                getCommentData()
            }
        }
        // const comment__input = document.querySelector(".comment__input")
        const comment_inputs = document.querySelectorAll('.comment__input')
        comment_inputs.forEach((comment_input) => {
            if (comment_input !== null && chat._id === dbCode) {
                comment_input.addEventListener('keydown', handleKeydown)
                return (() => {
                    comment_input.removeEventListener('keydown', handleKeydown)
                })
            }
        })}, [toggleComment, dbId ]) // toggleComment가 바뀔때마다 실행 (댓글접힌게 열리면 실행된다)
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
                    <div className="comment__input" >
                        <div className="comment__input__nameAndPassword">
                            <form onSubmit={(e) => { e.preventDefault(); return false }}>
                                <label htmlFor='comment__nickname'>닉네임</label>
                                <input type='text' id='comment__nickname' placeholder="닉네임 설정"></input>
                                <label htmlFor='comment__password'>비밀번호</label>
                                <input type='password' id='comment__password' placeholder="비밀번호 입력" autoComplete="on"></input>
                            </form>
                        </div>

                        <div className="comment__input__text__register">
                            <label htmlFor="comment__text">내용</label>
                            <input type="text" placeholder="글을 입력하세요" id="comment__text"></input>
                            <button type="button" onClick={() => { registerComment(dbId); getCommentData(); }}>등록</button>
                            <span className='dbCode' style={{ opacity:0}} ref={getCode}>{chat._id}</span>
                        </div>
                    </div>
                </>
            }
        </>
    )


}

export default LoungeCommentRegister