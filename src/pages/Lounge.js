import React, { useState,useEffect } from "react";
import { Header , Footer } from "../components"
import "../styles/Lounge.css"
import LoungeAPI from "../services/LoungeAPI";

function Lounge(){
    const [ chat, setChat ] = useState([])
    const [modalPosition, setModalPosition] = useState(null);
    const [passwordMatched, setPasswordMatched] = useState(false);
    const [updateInputValue, setUpdateInputValue] = useState('')

    const chatData = LoungeAPI()

    const registerText = (e) => { // 등록 버튼 누르면 글이 서버에 저장되고 웹페이지에서 보여줍니다
        const id = document.querySelector("#nickname").value;
        const password = document.querySelector("#password").value;
        const text = document.querySelector("#text").value;

        fetch('http://127.0.0.1:5300/lounge', { // db에 저장
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: id,
                password: password,
                text: text
            }) 
        })
       
        fetch('http://127.0.0.1:5300/lounge', { // db에서 가져오기
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => setChat(data))
    }
    const HandleModalEdit = (e) => {

        const { target } = e
        const rect = target.getBoundingClientRect()
        setModalPosition({ 
            top: rect.top+rect.height, 
            left: rect.left, 
        })
    }

    const checkPassswordAndDelete = (e) => {
        console.log(e.target)
        console.dir(e.target.parentNode.parentNode.parentNode.parentNode)
        const id = document.querySelector("#nickname").value;
        const editPassword = document.querySelector(".editPassword").value;
        const text = document.querySelector("#text").value;
        
        //            fetch('http://127.0.0.1:5300/lounge/edit', { // db의 비밀번호와 입력한 비밀번호가 일치하는지 확인하기 위해 서버에 요청
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         nickname: id,
        //         password: editPassword,
        //         text: text
        //     }) 
        // })
        // .then(res => {
        //     if(res.status === 200){
        //         setPasswordMatched(true)
        //         setModalPosition(null)
        //         return res.json()
        //     }
        //     else{
        //         setPasswordMatched(false)
        //         return res.json()
        //     }
        // })
        // .catch(error => {
        //     console.log(error)
        // })
        fetch('http://127.0.0.1:5300/lounge/delete', { // db의 비밀번호와 입력한 비밀번호가 일치하는지 확인하기 위해 서버에 요청
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nickname: id,
            password: editPassword,
            text: text
        }) 
    })

    
    }
    const editText = (e) => {
        checkPassswordAndDelete(e)

        fetch('http://127.0.0.1:5300/lounge', { // db에서 가져오기
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => setChat(data))
    }


    useEffect(() => {
        fetch('http://127.0.0.1:5300/lounge', { // db에서 가져오기
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => setChat(data))
    
    },[])


    const comfirmEditText = (e, index) => {
        const editedText = document.querySelectorAll(".editText")[index].value;
        setUpdateInputValue(editedText)
    }


    return(
        <>
            <Header></Header>  
                <div className="loung__body" >
                    <div className="lounge__textOutput">
                        <div className="lounge__textOutput__title">
                            <h3>Small Talk Lounge</h3>
                            <hr/>
                        </div>
                        
                            {chat.map((chat,index)=> {
                                return (
                            <div key={index}>
                            <div className="lounge__textOutput__text" >
                                <div className="nickname">
                                <span><img src='images/loungeuser.png' alt='userProfile' />{chat.nickname}</span>
                                </div>
                            <div className="text__function" >
                                {passwordMatched && !modalPosition ? 
                                    <>  
                                        <div className="editInputDiv">
                                            <input type="text" className="editText" defaultValue={chat.text}/>
                                        </div>

                                        <div className="text__function__edit">
                                            <span className="confirm" onClick={(e)=>comfirmEditText(e, index)}>확인</span>
                                        </div>
                                         <div className="text__function__cancle"><span className="delete">취소</span></div>
                                    </>
                                :  
                                <>
                                 <p>{chat.text}</p>
                                    <div className="text__function__edit">
                                        <span className="edit" onClick={(e)=>HandleModalEdit(e)}>수정</span>
                                    </div>
                                    <div className="text__function__delete"><span className="delete" onClick={(e)=>HandleModalEdit(e)}>삭제</span></div>
                                    <div className="text__function__comment"><span className="comment">댓글</span></div>
                                </>
                                }
                             </div>
                             </div>
                             </div>
                             
                             )
                            })}      
                            {/* 모달 */}
                                     {modalPosition && (
                                    <div className={`checkPasswordModal` } style={{
                                        top: modalPosition.top+window.scrollY,
                                        left: modalPosition.left+window.scrollX,
                                    }}>
                                        <h5>비밀번호 확인</h5>
                                        <div className="passwordCheck">
                                            <input type='password' className='editPassword'/>
                                            <button type="button" onClick={(e)=>editText(e)}>확인</button>
                                        </div>
                                    </div>
                            )}             
                    </div> 
                    <div className="lounge__input">
                       <div className="lounge__input__nameAndPassword"> 
                         <label htmlFor='nickname'>닉네임</label>
                            <input type='text' id='nickname'></input>
                         <label htmlFor='password'>비밀번호</label>    
                            <input type='password' id='password'></input>
                        </div>

                        <div className="lounge__input__text__register">
                            <label htmlFor="text">내용</label>
                            <input type="text" placeholder="글을 입력하세요" id="text"></input>
                            <button type="button" onClick={registerText}>등록</button>
                        </div>
                    </div>
                </div>
            <Footer></Footer>
         </>
    )
}

export default Lounge