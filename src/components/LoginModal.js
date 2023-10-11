import { useNavigate } from "react-router-dom";
import '../styles/LoginModal.css';

function LoginModal(){
  const handleLogin = (event) => {
    event.preventDefault();
    // fetch()
  }

  const navigate = useNavigate();
  const moveToRegisterPage = () => {
    navigate('/register');
  }

  return (
    <div className='LoginModal-container'>
      <div className="modal-title">
        <span>로그인</span>
        <button className='modalClose-btn' >X</button>
      </div>
      <form>
        <div className="LoginModal-input-container">
          <label><span><u>U</u>ser email:</span><input type='text'/></label>
          <label><span><u>P</u>assword:</span><input type='password'/></label>
        </div>
        <div className="LoginModal-login-btn-container"><button type='submit' onClick={handleLogin}>로그인</button></div>
      </form>
      <div className="LoginModal-footer">
        <button>비밀번호 찾기</button>
        <button onClick={moveToRegisterPage}>회원가입</button>
      </div>
    </div>
  )
}

export default LoginModal;