import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import '../styles/LoginModal.css';

function LoginModal(){
  // 유저 로그인 정보 스테이트
  const [inputLoginData, setInpudLoginData] = useState({
    userId : '',
    userPassword : ''
  })

  const changeLoginData = (event) => {
    const { name } = event.target;
    setInpudLoginData({ ...inputLoginData, [name] : event.target.value });
  }
  // 유저 로그인 정보 전송
  const handleLogin = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:5300/user/login', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON({
        userId : inputLoginData.userId,
        password : inputLoginData.userPassword
      })
    })
    .catch(e => console.log(e))
    .then((res) => {
      if(res.ok){
        setInpudLoginData({
          userId : '',
          userPassword : ''
        })
      }
    })
  }

  // 회원가입 클릭 시 회원가입 페이지로 이동 
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
          <label><span><u>U</u>ser email:</span><input type='text' onChange={changeLoginData} name='userId'/></label>
          <label><span><u>P</u>assword:</span><input type='password' onChange={changeLoginData} name='userPassword'/></label>
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