import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import '../styles/LoginModal.css';

function LoginModal(){
  const [ cookies, setCookie ] = useCookies(['id'])
  const [user, setUser] = useState({ email : '', password : ''})
  
  const handleLogin = async (event) => {
    event.preventDefault();

    await fetch('http://127.0.0.1:5300/user/login', {
      userId: user.email,
      password: user.password
    })
    .then((res) => {
      setCookie('id', res.data.token, { 
        path: '/', 
        expires : '1d', 
    })
    console.log(user)

    })
  }
  const onChange = async (event) => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name] : value
    })

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
          <label><span><u>U</u>ser email:</span><input type='text' name='id' onChange={onChange}/></label>
          <label><span><u>P</u>assword:</span><input type='password' name='password' onChange={onChange}/></label>
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