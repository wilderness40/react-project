import '../styles/Register.css';

function Register(){
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
          <label><span>emali : </span><input type='text'/></label>
          <label><span>password : </span><input type='password' /></label>
          <label><span>password 확인 : </span><input type='password' /></label>
          <label><span>관심 키워드 : </span><input type='text' maxLength='15'/></label>
          <label><span>직장 주소 : </span><input type='text' /></label>
          <button>가입하기</button>
        </form>
      </div>
    </div>
  )
}

export default Register;