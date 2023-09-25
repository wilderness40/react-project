import React, { useState,useEffect,useRef } from "react";
import { Header , Footer, LoungeInputEdit, LoungeModal, LoungeRegisterInput } from "../components"
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
    const [dbCode, setDbCode] = useState('')
    const [modalStyle, setModalStyle] = useState(false)
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
        getChatData()        
        const clickModalOutside = (e) => { // 모달창 밖을 클릭하면 모달창이 닫힙니다
            if(modalPosition && 
                e.target.className !== "edit" && e.target.className !== "delete" 
                && e.target.className !== "comment" && e.target.className !== "confirm" 
                && e.target.className !== "text_function" 
                && e.target.className !== "passwordCheck"
                && e.target.className !== 'editPassword') {
                setModalPosition(null)
                setUpdateInputValue('')
            }
        }
        document.addEventListener('click', clickModalOutside)
        return () => {  // clean up
            document.removeEventListener('click', clickModalOutside)
        }
    }, [modalPosition]) // modalPosition이 바뀔때마다 useEffect가 실행됩니다

    
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

        // 입력창 초기화
        document.querySelector("#nickname").value = "";
        document.querySelector("#password").value = "";
        document.querySelector("#text").value = "";
    }


    // 모달창 띄우기
    const HandleModalEdit = async (e, index) => {        
        const pInnerText = e.target.parentNode.parentNode.firstChild.innerText
        const mongoDbId = e.target.parentNode.parentNode.parentNode.firstChild.children[1].innerText

        setModalStyle(false)
        setDbCode(mongoDbId)
        setClickData(e.target)
        const rect = e.target.getBoundingClientRect();
        
          setModalPosition({ 
            top : rect.top + rect.height, 
            left : rect.left, 
          }); 
    } 


    // 모달창에서 비밀번호 일치했을경우 -> 수정, 삭제하기
      const editModalText = (e ,index) => {
        const editPassword = document.querySelector("#editPassword").value
        const text = clickData.parentNode.parentNode.firstChild.innerText
        const id = clickData.parentNode.parentNode.previousSibling.innerText

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
                    setModalStyle(true)
                    setModalPosition(modalPosition)
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
                setModalStyle(true)
                setModalPosition(modalPosition)
                console.log('삭제실패')
            }}
            )
           } catch (error) {
             console.log(error);
           }
        
}

if(clickData.innerText === "댓글"){
    <LoungeRegisterInput registerText={registerText} />
} 
      }

      // 모달창에서 비밀번호 일치 후 수정확정하거나 취소하기
    const comfirmEditText = (e, index) => {
        const editedText = document.querySelector(".editText").value
        console.log(e.target, index, editedText)
        // console.log(e.target, index, editedText)
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
                            <div key={index}>
                            <div className="lounge__textOutput__text" >
                                <div className="nickname">
                                <span><img src='images/loungeuser.png' alt='userProfile' />{chat.nickname} </span> <span className='paragraph-id'>{chat._id}</span>
                                </div>
                            <div className="text__function" >
                                <LoungeInputEdit
                                passwordMatched={passwordMatched}
                                HandleModalEdit={(e, index)=>HandleModalEdit(e, index)}
                                comfirmEditText={(e)=>comfirmEditText(e, index)}
                                modalPosition={modalPosition}
                                clickData={clickData}
                                onChange={onChange}
                                updateInputValue={updateInputValue}
                                chat={chat}
                                dbCode={dbCode}
                                />
                             </div>
                             </div>
                             </div>
                             
                             )
                            })}      
                            {/* 모달 */}
                            <LoungeModal
                            modalPosition={modalPosition}
                            updateInputValue={updateInputValue}
                            editModalText={editModalText}
                            onChange={onChange}
                            modalStyle={modalStyle}
                            />

                    </div> 
                            <LoungeRegisterInput
                                registerText={registerText}
                            />
                </div>
            <Footer></Footer>
         </>
    )
}

export default Lounge