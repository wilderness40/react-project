import React from "react";
import { SnsTimeFormat } from "../components"
import "../styles/LoungeCommentOutput.css"

function LoungeCommentOutput({comment,dbCode, HandleModalEdit}){
    console.log(comment)
    return(
        <>
            {comment !== null ? comment.map((chat, index)=>{
                <div className="comment__output">
                <div className="nickname">
                    <span><img src='images/loungeuser.png' alt='userProfile' />{chat.nickname} </span> <SnsTimeFormat chatTime={chat.date}/> <span className='paragraph-id'>{chat._id}</span>
                </div>
                <div className="text__output">
                    <p>{chat.text}</p>
                    <div className="edit__box">
                        <div className="text__function__edit"><span className="edit" onClick={(e, index)=>HandleModalEdit(e, index)} >수정</span></div>
                        <div className="text__function__delete"><span className="delete" onClick={(e, index)=>HandleModalEdit(e ,index)} >삭제</span></div>
                    </div>  
                </div>    
            </div>
            }): null}

        </>
    )
}

export default LoungeCommentOutput