import React, { useState,useEffect } from "react";
import { Header , Footer } from "../components"
import "../styles/Lounge.css"
import LoungeAPI from "../services/LoungeAPI";

function Lounge(){
    const [ chat, setChat ] = useState([])
    const chatData = LoungeAPI()
    // 디버깅용
    console.log(chatData)
    if(chatData.length !== 0)
{
    console.log(chatData[0].nickname, chatData[0].text, chatData[0].password)
}

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

    const editText = (e) => {
        // p의 innerText 바꾸거나 & 수정 state 만들어서 수정할 때만 수정 state가 true가 되게 하거나
        const id = document.querySelector("#nickname").value;
        const password = document.querySelector("#password").value;
        const text = document.querySelector("#text").value;

        fetch('http://127.0.0.1:5300/lounge', { // db에 저장
            method: 'PUT',
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


    return(
        <>
            <Header></Header>  
                <div className="loung__body">
                    <div className="lounge__textOutput">
                        <div className="lounge__textOutput__title">
                            <h3>Small Talk Lounge</h3>
                            <hr/>
                        </div>
                     
                            {chat.map((chat,index)=> {
                                return (
                                <>
                                <div className="lounge__textOutput__text">
                                <div className="nickname">
                                <span key={index}><img src='images/loungeuser.png'/>{chat.nickname}</span>
                                </div>
                            <div className="text__function">
                                 <p>{chat.text}</p>
                                 <div className="text__function__edit"><span className="edit" onClick={editText}>수정</span></div>
                                 <div className="text__function__delete"><span className="delete" >삭제</span></div>
                                 <div className="text__function__comment"><span className="comment" >댓글</span></div>
                             </div>
                             </div>
                             </>
                             )
                            })}                            
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