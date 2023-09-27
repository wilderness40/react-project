import React, { useEffect, useState } from "react";
import "../styles/OptionModal.css"

function OptionModal({ state, modalStateChange}) {
    const [fileName, setFileName] = useState('')
    const [fileURL, setFileURL] = useState('')
    const fileUpload = (e) => {
          const file = e.target.files[0]
          console.log(file)
          if(file) {
              const fileSrc = URL.createObjectURL(file)
              setFileURL(fileSrc)
              console.log(fileSrc)
          }
          setFileName(file.name)
    }
    return (
        <>
            <div className={`modal ${state ? 'open' : 'close'}`}>
                <div className="modal-container">
                    <div className="modal-title">
                        <span>바탕 화면 설정</span>
                        <button className='modalClose-btn' onChange={modalStateChange}>X</button>
                    </div>
                    <div className="modal-body">
                        {fileURL !== '' &&
                        <img src={fileURL} alt="Blob URL Image"/>}
                            <input type='file' name="img" id="upload"
                            onChange={fileUpload}></input>
                        {/* <form action="upload" method="post">
                        </form> */}
                    </div>
                    <div className="modal-footer">
                        <button className="modalSuccess-btn">확인</button>
                        <button className="modalfail-btn" onClick={modalStateChange}>취소</button>
                        <button className="modalApply-btn">적용</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OptionModal