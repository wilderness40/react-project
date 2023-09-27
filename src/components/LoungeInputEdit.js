import React from "react";

function LoungeInputEdit({chat, index, passwordMatched, modalPosition, HandleModalEdit, comfirmEditText, dbCode}){

    console.log(dbCode)
    return (
        <>
          {passwordMatched && !modalPosition && dbCode == chat._id? 
                                    <>  
                                        <div className="editInputDiv" >
                                            <input type="text" className="editText" defaultValue={chat.text} />
                                        </div>

                                        <div className="text__function__edit">
                                            <span className="confirm" onClick={(e)=>comfirmEditText(e, index)}>확인</span>
                                        </div>
                                         <div className="text__function__cancle" ><span className="delete" onClick={(e)=>comfirmEditText(e, index)}>취소</span></div>
                                    </>
                                :  
                                <>
                                 <p>{chat.text}</p>
                                    <div className="text__function__edit">
                                        <span className="edit" onClick={(e, index)=>HandleModalEdit(e, index)} >수정</span>
                                    </div>
                                    <div className="text__function__delete"><span className="delete" onClick={(e, index)=>HandleModalEdit(e ,index)} >삭제</span></div>
                                    <div className="text__function__comment"><span className="comment">댓글</span></div>
                                </>
                                }
        
        </>
    )
}


export default  LoungeInputEdit