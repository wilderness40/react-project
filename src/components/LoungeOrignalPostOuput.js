import React from "react";
import { SnsTimeFormat, LoungeInputEdit } from './index.js';

function LoungeOrignalPostOuput({ passwordMatched, HandleModalEdit, confirmEditText, modalPosition, clickData, onChange, updateInputValue, chat, dbCode, handleComment, depth, comment, index }) {

    return (
        <div>
            <div className="lounge__textOutput__text" >
                <div className="nickname">
                    <span><img src='images/loungeuser.png' alt='userProfile' />{chat.nickname} </span> <SnsTimeFormat chatTime={chat.date} /> <span className='paragraph-id'>{chat._id}</span><span className="depth">0</span>
                </div>
                <div className="text__function" >
                    <LoungeInputEdit // 수정버튼 누르고 패스워드 일치시 input창이 나오도록 설정
                        passwordMatched={passwordMatched}
                        HandleModalEdit={(e, index) => HandleModalEdit(e, index)}
                        confirmEditText={(e) => confirmEditText(e, index)}
                        modalPosition={modalPosition}
                        clickData={clickData}
                        onChange={onChange}
                        updateInputValue={updateInputValue}
                        chat={chat}
                        dbCode={dbCode}
                        handleComment={handleComment}
                        depth={depth}
                        chatComment={comment}
                    />
                </div>
            </div>
        </div>
    )
}

export default LoungeOrignalPostOuput;