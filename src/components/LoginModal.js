import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/LoginModal.css';
import PasswordSearchComponent from "../components/PasswordSearchComponent"
function LoginModal({loginModalStateChange}){
  const [passwordState, setPasswordState] = useState(false)
  const handleLogin = (event) => {
    event.preventDefault();
    // fetch()
  }
  const passwordSearch = (event) => {
    event.preventDefault(); // 임시로 막아둠
  }
  const navigate = useNavigate();
  const moveToRegisterPage = () => {
    navigate('/register');
  }
  const passwordSearchChange = () => {
    setPasswordState(true)
  }
  return (
    <div className='LoginModal-container'>
      <div className="modal-title">
        <span>로그인</span>
        <button className='modalClose-btn' onClick={loginModalStateChange}>X</button>
      </div>
      {!passwordState? 
        <>
          <form>
            <div className="LoginModal-input-container">
              <label><span><u>U</u>ser email:</span><input type='text'/></label>
              <label><span><u>P</u>assword:</span><input type='password'/></label>
            </div>
            <div className="LoginModal-login-btn-container"><button type='submit' onClick={handleLogin}>로그인</button></div>
          </form>
          <div className="LoginModal-footer">
            <button onClick={passwordSearchChange}>비밀번호 찾기</button>
            <button onClick={moveToRegisterPage}>회원가입</button>
          </div>
        </> : 
        <PasswordSearchComponent passwordSearch={passwordSearch}></PasswordSearchComponent>
        }
    </div>
  )
}

export default LoginModal;