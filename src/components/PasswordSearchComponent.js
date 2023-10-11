import { useState } from "react";

function PasswordSearchComponent({passwordSearch}) {
    return (
        <>
            <form>
                <div className= "PasswordSearch-input-container">
                    <label><span><u>U</u>ser email:</span><input type='text'/></label>
                </div>
                <div className="PasswordSearch-search-btn-container"><button type='submit' onClick={passwordSearch}>찾기</button></div>
            </form>
            {/* <div className="LoginModal-footer">
                <button>비밀번호 찾기</button>
            </div> */}
        </>
    )
}

export default PasswordSearchComponent