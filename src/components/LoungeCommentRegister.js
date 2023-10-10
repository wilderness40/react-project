import React, {useEffect} from "react";
import "../styles/LoungeCommentRegister.css"

function LoungeCommentRegister({commentRegister, dbCode, chat}){
   
    const registerComment = () => { // 등록 버튼을 누르면 글이 등록됩니다
    }

    useEffect(() => { // 엔터키 누르면 글이 등록됩니다
        const lounge__input = document.querySelector(".lounge__input")
        const handleKeydown = (e) => {
            if(e.key === 'Enter'){
                registerComment()
            }
        }
            lounge__input.addEventListener('keydown',handleKeydown)
        return(() => {
            lounge__input.removeEventListener('keydown', handleKeydown)
        })
    }, [])

    return (
        <>
            { commentRegister && dbCode === chat._id ?
                <div className="comment__input" >
                        <div className="comment__input__nameAndPassword"> 
                            <label htmlFor='comment__nickname'>닉네임</label>
                                <input type='text' id='comment__nickname' placeholder="닉네임 설정"></input> 
                            <label htmlFor='comment__password'>비밀번호</label>    
                                <input type='password' id='comment__password' placeholder="비밀번호 입력"></input>
                            </div>

                            <div className="comment__input__text__register">
                                <label htmlFor="comment__text">내용</label>
                                <input type="text" placeholder="글을 입력하세요" id="comment__text"></input>
                                <button type="button" onClick={registerComment}>등록</button>
                            </div>
                        </div>
            
        : null}
        </>
    )
        
    
}

export default LoungeCommentRegister