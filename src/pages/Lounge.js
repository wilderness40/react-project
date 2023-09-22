import React, { useState,useEffect,useRef } from "react";
import { Header , Footer } from "../components"
import "../styles/Lounge.css"
import LoungeAPI from "../services/LoungeAPI";

function Lounge(){
    const [ chat, setChat ] = useState([])
    const [modalIndex, setModalIndex] = useState(null);
    const [passwordMatched, setPasswordMatched] = useState(false);

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
    const HandleCheckPasswordModal = (index) => {
        console.log(index)
        setModalIndex((prevIndex) => (prevIndex === index ? null : index));
    }
    const editText = (e, index) => {
        // p의 innerText 바꾸거나 & 수정 state 만들어서 수정할 때만 수정 state가 true가 되게 하거나
        const id = document.querySelector("#nickname").value;
        const editPassword = document.querySelectorAll(".editPassword")[index].value;
        const text = document.querySelector("#text").value;
        
        console.log(editPassword)
        console.dir(e.target.parentElement.parentElement.parentElement.previousSibling) // p태그
        console.dir(e.target.parentElement.parentElement.parentElement.parentElement) // p태그의 부모 div className="text__function__edit"

        fetch('http://127.0.0.1:5300/lounge/edit', { // db에 저장
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: id,
                password: editPassword,
                text: text
            }) 
        })
        .then(res => {const { matched } = res.data 
        setPasswordMatched(matched)
        } )
        .catch(error => {
            console.log(error)
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
                <div className="loung__body" >
                    <div className="lounge__textOutput">
                        <div className="lounge__textOutput__title">
                            <h3>Small Talk Lounge</h3>
                            <hr/>
                        </div>
                        
                            {chat.map((chat,index)=> {
                                return (
                            <div  key={index}>
                            <div className="lounge__textOutput__text" >
                                <div className="nickname">
                                <span><img src='images/loungeuser.png' alt='userProfile' />{chat.nickname}</span>
                                </div>
                            <div className="text__function" >
                                 <p>{chat.text}</p>
                                 <div className="text__function__edit">
                                    <span className="edit" onClick={()=>HandleCheckPasswordModal(index)}>수정</span>
                                    <div className={`checkPasswordModal ${ modalIndex === index ? 'Modalshow' : ''}`} >
                                        <h5>비밀번호 확인</h5>
                                        <div className="passwordCheck">
                                            <input type='password' className='editPassword'/>
                                            <button type="button" onClick={(e)=>editText(e, index)}>확인</button>
                                        </div>
                                    </div>
                                 </div>
                                 <div className="text__function__delete"><span className="delete">삭제</span></div>
                                 <div className="text__function__comment"><span className="comment">댓글</span></div>
                             </div>
                             </div>
                             </div>
                             
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