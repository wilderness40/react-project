import '../styles/Register.css';
import { useState } from 'react';

function Register(){
  // 회원가입 할 유저의 정보 스테이트
  const [inputRegisterData, setInputRegisterData] = useState({
    userId : '',
    userEmail : 'gmail.com',
    userPassword : '',
    CheckingUserPassword : '',
    userKeyword : '',
    userAddress : ''
  });

  const [errorInputData, setErrorInputData] = useState({
    err : null,
    message : ''
  });

  const changeRegisterData = (event) => {
    const { name } = event.target;
    setErrorInputData({ err : null , message : ''});
    setInputRegisterData({ ...inputRegisterData, [name] : event.target.value });
  }

  const handleRegister = (event) => {
    event.preventDefault();
    if(inputRegisterData.userPassword && inputRegisterData.CheckingUserPassword && inputRegisterData.userPassword !== inputRegisterData.CheckingUserPassword ){
      setErrorInputData({ err : 'passwordMatching', message : '비밀번호가 다릅니다.'});
      return ;
    }

    if(inputRegisterData.userId
       && inputRegisterData.userPassword
       && inputRegisterData.CheckingUserPassword
       && inputRegisterData.userKeyword
       && inputRegisterData.userAddress
       && inputRegisterData.userPassword === inputRegisterData.CheckingUserPassword){
        console.log('가입직전')
        fetch('http://127.0.0.1:5300/user/register', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            userId : inputRegisterData.userId,
            password : inputRegisterData.userPassword,
            keyword : inputRegisterData.userKeyword,
            address : inputRegisterData.userAddress
          })
        })
        .catch(e => console.log(e))
        .then((res) => {
          console.log(res, '가입?')
          if(res.ok){
            setInputRegisterData({
              userId : '',
              userPassword : '',
              CheckingUserPassword : '',
              userKeyword : '',
              userAddress : ''
            })
          }
        })
      }
  }
  console.log(inputRegisterData)
  return (
    <div className="Register-container">
      <div className="Register-header">
        <h5>회원가입</h5>
        <div className='Register-button-container'>
          <button>X</button>
        </div>
      </div>
      <div className='Register-form-container'>
        <form>
          <label><span>emali : </span><input type='text' name='userId' onChange={changeRegisterData} value={inputRegisterData.userId}/>
          <select onChange={(e) => {setInputRegisterData({...inputRegisterData, userEmail : e.target.value})}}>
            <option value='gmail.com'>gmail.com</option>
            <option value='naver.com'>naver.com</option>
            <option value='daum.net'>daum.net</option>
          </select>
          </label>
          <label><span>password : </span><input type='password' name='userPassword' onChange={changeRegisterData} value={inputRegisterData.userPassword}/></label>
          <label><span>password 확인 : </span><input type='password' name='CheckingUserPassword' onChange={changeRegisterData} value={inputRegisterData.CheckingUserPassword}/></label>
          {errorInputData.err === 'passwordMatching' && <span style={{color:'red'}}>{errorInputData.message}</span>}
          <label><span>관심 키워드 : </span><input type='text' maxLength='15' name='userKeyword' onChange={changeRegisterData} value={inputRegisterData.userKeyword}/></label>
          <label><span>직장 주소 : </span><input type='text' name='userAddress' onChange={changeRegisterData} value={inputRegisterData.userAddress}/></label>
          <button onClick={handleRegister}>가입하기</button>
        </form>
      </div>
    </div>
  )
}

export default Register;