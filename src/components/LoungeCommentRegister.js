import React, { useState, useEffect } from "react";
import "../styles/LoungeCommentRegister.css"
import LoungeCommentOutput from "./LoungeCommentOutput";

function LoungeCommentRegister({ comment, getCommentData, toggleComment, dbCode, chat, HandleModalEdit }) {

    useEffect(() => {
        getCommentData()

    }, [])
    const registerComment = (e) => { // 등록 버튼을 누르면 글이 등록됩니다
        const id = document.querySelector("#comment__nickname").value;
        const password = document.querySelector("#comment__password").value;
        const text = document.querySelector("#comment__text").value;

        fetch('http://127.0.0.1:5300/loungeComment', { // db에 저장
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: id,
                password: password,
                text: text,
                parent: dbCode,
            })
        })
        getCommentData() // db에서 데이터 가져오기


        // 입력창 초기화
        document.querySelector("#comment__nickname").value = "";
        document.querySelector("#comment__password").value = "";
        document.querySelector("#comment__text").value = "";
    }

    useEffect(() => { // 엔터키 누르면 글이 등록됩니다, 아직 동작 안함 e.key가 안먹힘
        const handleKeydown = (e) => {
            console.log(e.target)
            console.log(e.key)
            if (e.key === 'Enter') {
                registerComment()
            }
        }
        const comment__input = document.querySelector(".comment__input")
        // console.log(comment__input)
        if (comment__input !== null && chat._id === dbCode) {

            comment__input.addEventListener('keydown', handleKeydown)
            return (() => {
                comment__input.removeEventListener('keydown', handleKeydown)
            })
        }
    }, [])

    return (
        <>
            {toggleComment && dbCode === chat._id ?
                <>
                    <LoungeCommentOutput
                        comment={comment}
                        dbCode={dbCode}
                        toggleComment={toggleComment}
                        HandleModalEdit={HandleModalEdit}
                    />
                    <div className="comment__input" >
                        <div className="comment__input__nameAndPassword">
                            <form onSubmit={() => { return false }}>
                                <label htmlFor='comment__nickname'>닉네임</label>
                                <input type='text' id='comment__nickname' placeholder="닉네임 설정"></input>
                                <label htmlFor='comment__password'>비밀번호</label>
                                <input type='password' id='comment__password' placeholder="비밀번호 입력" autoComplete="on"></input>
                            </form>
                        </div>

                        <div className="comment__input__text__register">
                            <label htmlFor="comment__text">내용</label>
                            <input type="text" placeholder="글을 입력하세요" id="comment__text"></input>
                            <button type="button" onClick={registerComment}>등록</button>
                        </div>
                    </div>
                </>

                : null}
        </>
    )


}

export default LoungeCommentRegister