import React, { useState,useEffect } from "react";
import { Header , Footer, LoungeInputEdit } from "../components"
import "../styles/Lounge.css"
import LoungeAPI from "../services/LoungeAPI";


function Lounge(){
    const [chat, setChat] = useState([])
    const [modalPosition, setModalPosition] = useState(null);
    const [clickData, setClickData] = useState(null);
    const [passwordText, setPasswordText] = useState(null)
    const [userNickname, setUserNickname] = useState(null)
    const [passwordMatched, setPasswordMatched] = useState(false);
    const [updateInputValue, setUpdateInputValue] = useState('')

    const chatData = LoungeAPI()
    
    // DB데이터 가져오기
    const getChatData = async () => {
        await fetch('http://127.0.0.1:5300/lounge', { 
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => setChat(data))
    }

    useEffect(() => {
        // const body = document.querySelector('body')
        // body.addEventListener('click', (e) => {
        // console.log(e.target)

        //     const modal = document.querySelector('.checkPasswordModal')
        //     const inputWindow = document.querySelector('.editPassword')
        //     const H5 = document.querySelector('.checkPasswordModal h5')

        //     const editSpan =document.querySelector('.edit') // 첫번째 댓글 수정버튼
        //     const deleteSpan = document.querySelector('.delete') // 첫번째 댓글 삭제버튼
        //     const commentSpan = document.querySelector('.comment') // 첫번째 댓글 댓글달기버튼

        //     if(e.target !== modal && e.target !== editSpan && e.target !== deleteSpan && e.target !== commentSpan && e.target !== inputWindow && e.target !== H5){
        //         setModalPosition(null)
        //     }
        // })
        getChatData()

        // return () =>{ 
        //     body.removeEventListener('click', (e) => {})
        // }
        
    }, [])

    
    // 글 등록하기
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
        getChatData() // db에서 데이터 가져오기
    }


    // 모달창 띄우기
    const HandleModalEdit = async (e, index) => {
        setClickData(e.target)
        const rect = e.target.getBoundingClientRect();
        
        // if(e.target.innerText === "수정" || e.target.innerText === "삭제"){
          setModalPosition({ 
            top : rect.top + rect.height, 
            left : rect.left, 
          }); 
        // }else{
        //     setModalPosition(null)
        // }
    } 


    // 모달창에서 비밀번호 일치했을경우 -> 수정, 삭제하기
      const editModalText = (e) => {
        // console.log(clickData.parentNode.parentNode.firstChild.innerText)
        const editPassword = document.querySelector("#editPassword").value
        const text = clickData.parentNode.parentNode.firstChild.innerText
        const id = clickData.parentNode.parentNode.previousSibling.innerText
        // console.log(clickData.innerText)
        if(clickData.innerText === "수정"){
          try {
             fetch('http://127.0.0.1:5300/lounge/edit', { 
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                nickname: id,
                password : editPassword,
                text: text
              }) 
            })   
            .then(res => 
                {
                    console.log(res.status)
                    if (res.status === 200 && editPassword !== "") {
                    setPasswordMatched(true);
                    setModalPosition(null)
                    setPasswordText(editPassword)
                    setUserNickname(id)
                  } else {
                    setPasswordMatched(false);
                  }
                }
            )
          } catch (error) {
            console.log(error);
          }
}

    if(clickData.innerText === "삭제"){ 
      
           try {
              fetch('http://127.0.0.1:5300/lounge/delete', { 
               method:'delete',
               headers:{
                 'Content-Type':'application/json'
               },
               body : JSON.stringify({
                 nickname:id,
                 password : editPassword,
                 text:text
                }) 
             })
             .then(res => {if(res.status === 200){
             getChatData()
             setModalPosition(null)
            }else{
                console.log('삭제실패')
            }}
            )
           } catch (error) {
             console.log(error);
           }
        
}
      }

      // 모달창에서 비밀번호 일치 후 수정확정하거나 취소하기
    const comfirmEditText = (e, index) => {
  
        const editedText = document.querySelectorAll(".editText")[index].value
        console.log(e.target, index, editedText)
        setUpdateInputValue(editedText)
    if(e.target.innerText === "확인"){
        fetch('http://127.0.0.1:5300/lounge/edit', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: userNickname,
                password : passwordText,
                text: editedText
        })
    })
    .then(res => res.json()) // 서버에서 응답한 데이터를 json형태로 변환
    .then(data => { // json형태로 변환된 데이터를 data라는 이름의 매개변수로 받아옴
        const updatedChat = [...chat] // 배열을 복사
        updatedChat[index].text = editedText // 수정된 데이터를 배열에 저장
        setChat(updatedChat) // 수정된 데이터를 화면에 보여주기 위해 상태값을 업데이트
        setUpdateInputValue('') // 수정된 데이터를 화면에 보여주고 나면 input창을 비워줌
    })
    setPasswordMatched(false) 
    getChatData()
    }
    if(e.target.innerText === "취소"){
        setPasswordMatched(false) 
        setUpdateInputValue('') // 수정된 데이터를 화면에 보여주고 나면 input창을 비워줌
    }
}

   
    const onChange = (e) => {
        setUpdateInputValue(e.target.value)
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
                
                        
                            {chat.length !==0 && chat.map((chat,index)=> {
                                return (
                            <div key={chat._id}>
                            <div className="lounge__textOutput__text" >
                                <div className="nickname">
                                <span><img src='images/loungeuser.png' alt='userProfile' />{chat.nickname}</span>
                                </div>
                            <div className="text__function" >
                                <LoungeInputEdit
                                
                                passwordMatched={passwordMatched}
                                HandleModalEdit={(e, index)=>HandleModalEdit(e, index)}
                                comfirmEditText={(e)=>comfirmEditText(e, index)}
                                index={index}
                                modalPosition={modalPosition}
                                clickData={clickData}
                                onChange={onChange}
                                updateInputValue={updateInputValue}
                                chat={chat}
                                />
                             </div>
                             </div>
                             </div>
                             
                             )
                            })}      
                            {/* 모달 */}
                                     {modalPosition ? (
                                        <div className={`checkPasswordModal`} 
                                        style={{
                                                top: modalPosition.top + window.scrollY,
                                                left: modalPosition.left + window.scrollX,
                                            }} >
                                               <h5>비밀번호 확인</h5>
                                                <div className="passwordCheck">
                                                    <input type='password' className='editPassword' id='editPassword' onChange={onChange} value={updateInputValue}/>
                                                    <button type="button" className="submit" onClick={(e)=>editModalText(e)}>확인</button>
                                                </div>
                                          </div>
                                     ) : null}                 
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