import { useState } from 'react';

function WorkpadTodo(){
  const [newTodo, setNewTodo] = useState({
    title : '',
    deadline : null,
  })

  const handleCheck = (e) => {
    // e.preventDefault();
    // const checkboxs = document.querySelectorAll('.checkbox');
    // for(let checkbox of checkboxs){
    //   if(e.target !== checkbox){
    //     checkbox.chcked = false;
    //   }
    // }
    // setNewTodo({ ...newTodo, primary : false, routine : false })
    // const 
    const name = e.target.name;
    const { title, deadline } = newTodo;
    setNewTodo({ title, deadline, [name] : true});
  }

  const selectDeadline = (e) => {
    setNewTodo({ ...newTodo, deadline : e.target.value });
  }

  const handleRegisterTodo = (e) => {
    e.preventDefault();
    if(e.target.form[0].value.trim()){
      fetch('http://127.0.0.1:4000/api/todo',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          title : e.target.form[0].value,
          deadline : new Date(new Date().getTime() + (86400000 * newTodo.deadline)),
          primary : newTodo.primary,
          routine : newTodo.routine
        })
      })
    }
  }
  
  return (
    <div className="WorkpadTodo-container">
      <div className="WorkpadTodo-register-container">
        <form>
          <input type='text' placeholder="잊지말고 해야 할 일을 적어보세요!"/>
          <select onChange={selectDeadline}>
            <option value={false}>없음</option>
            <option value={1}>1일</option>
            <option value={2}>2일</option>
            <option value={3}>3일</option>
            <option value={4}>4일</option>
            <option value={5}>5일</option>
            <option value={6}>6일</option>
            <option value={7}>7일</option>
          </select>
          <label htmlFor="todo-primary">중요</label><input type='checkbox' name="primary" className="checkbox" id='todo-primary' checked={newTodo.primary? true : false} onChange={handleCheck}/>
          <label htmlFor="todo-routine">매일 루틴</label><input type='checkbox' name="routine" className="checkbox" id='todo-routine' checked={newTodo.routine? true : false} onChange={handleCheck}/>
          <button type='submit' onClick={handleRegisterTodo}>할 일 등록</button>
        </form>
      </div>
    </div>
  )
}

export default WorkpadTodo;