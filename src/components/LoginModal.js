import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PasswordSearchComponent from "../components/PasswordSearchComponent"
import { useCookies } from 'react-cookie';
import '../styles/LoginModal.css';

function LoginModal({loginModalStateChange}){
  const [ cookies, setCookie ] = useCookies(['id'])
  const [user, setUser] = useState({ email : '', password : ''})
  const [passwordState, setPasswordState] = useState(false)

  const onChange = async (event) => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name] : value
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    await fetch('http://127.0.0.1:5300/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body : JSON.stringify({
        userId: user.email,
        password: user.password

      })

    })
    .then(res => res.json())
    .then((res) => {
      console.log(res)
      setCookie('id', res.token, { 
        path: '/'    })

    })
  }
  console.log(user.email, user.password)

    const passwordSearch = (event) => {
      event.preventDefault(); // 임시로 막아둠
    }
  
  const navigate = useNavigate();
  const moveToRegisterPage = () => {
    navigate('/register');
  }

  // 비밀번호 찾기
  const [searchPassword, setSearchPassword] = useState(false);

  const handleSearchPasswordToggle = () => {
    setSearchPassword(!searchPassword);
  }

  const handleSearchPassword = (event) => {
    event.preventDefault();
    console.log('비밀번호 찾기 중');
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
              <label><span><u>U</u>ser email:</span><input type='text' name='email' onChange={onChange}/></label>
              <label><span><u>P</u>assword:</span><input type='password' name='password' onChange={onChange} /></label>
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