import { useState } from 'react';
import '../styles/WorkpadTodo.css';
import WorkpadTodoSetting from './WorkpadTodoSetting';
import WorkpadTodoList from './WorkpadTodoList';

function WorkpadTodo({ todoList, doneTodos, getTodoToDB }){
  const [newTodo, setNewTodo] = useState({
    title : '',
  })

  const handleCheck = (e) => {
    const name = e.target.name;
    const { title } = newTodo;
    setNewTodo({ title, [name] : name? !newTodo[name] : true });
  }

  const selectDeadline = (e) => {
    setNewTodo({ ...newTodo, deadline : newTodo?.isDeadline ? e.target.value : null });
  }
  // 오늘의 자정 시간을 저장(기한 todo에서 시간을 제외하기 위함)
  const today_midnight_getTime = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).getTime();

  const registerTodo = (e) => {
    e.preventDefault();
    if(e.target.form[0].value.trim()){
      fetch('http://127.0.0.1:4000/api/todo',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          title : e.target.form[0].value,
          deadline : newTodo.deadline ? today_midnight_getTime + (86400000 * newTodo.deadline) : null,
          primary : newTodo.primary,
          routine : newTodo.routine
        })
      })
      .catch(e => console.log(e))
      .then(() => {
        getTodoToDB();
        e.target.form[0].value = ''
      })
    }
  }
  // 데드라인 Todo 정렬
  const deadlineTodos = todoList.filter(todo => todo.deadline).map(todo => {
    const restTime = Math.floor((new Date(todo.deadline).getTime() - today_midnight_getTime) / 86400000);
    // 기간이 지난 todo는 맨 밑 정렬
    return { ...todo, rest : restTime < 0 ? 100 : restTime };
  }).sort((a, b) => a.rest - b.rest);

  const [todoSettingMode, setTodoSettingMode] = useState({ mode : false, loc : { x : 0, y : 0 }, _id : null, modify : false });
   // todo 클릭시 설정
  const handleClickTodoCard = (e) => {
    if(e.target.parentNode.className.includes('WorkpadTodo-list-card')){
      document.querySelectorAll('.WorkpadTodo-list-card').forEach(card => card.classList.remove('move-todo-card'));
      e.target.parentNode.classList.add('move-todo-card');
      const _id = e.target.parentNode.id;
      const { x, y } = e.target.parentNode.getBoundingClientRect();
      if(_id !== todoSettingMode._id){
        setTodoSettingMode({ mode : true , loc : { x , y }, _id })
      }
    }
  }

  const [modifyTodoTitle, setModifyTodoTitle] = useState('')
  const changeModifyTodo = (e) => {
    setModifyTodoTitle(e.target.value);
  }
  // 보여줄 투두 리스트 변경
  const [showingTodoList, setShowingTodoList] = useState('select-primary');

  const selectShowingTodoList = (e) => {
    switch(e.target.id){
      case 'select-primary':
        setShowingTodoList('select-primary');
        break;
      case 'select-routine':
        setShowingTodoList('select-routine');
        break;
      case 'select-deadline':
        setShowingTodoList('select-deadline');
        break;
      case 'select-done':
        setShowingTodoList('select-done');
        break;
      case 'select-noDone':
        setShowingTodoList('select-noDone');
        break;
      default:
        return;
    }
    document.querySelectorAll('.WorkpadTodo-list-card').forEach(card => card.classList.remove('move-todo-card'));
    setTodoSettingMode({ mode : false });
  }

  return (
    <div className="WorkpadTodo-container">
      {/* Todo 등록 부분 */}
      <div className="WorkpadTodo-register-container">
        <form>
          <input type='text' placeholder="잊지말고 해야 할 일을 적어보세요!" maxLength='50'/>
          <label htmlFor="todo-primary">중요</label><input type='checkbox' name="primary" className="checkbox" id='todo-primary' checked={newTodo.primary? true : false} onChange={handleCheck}/>
          <label htmlFor="todo-routine">매일 루틴</label><input type='checkbox' name="routine" className="checkbox" id='todo-routine' checked={newTodo.routine? true : false} onChange={handleCheck}/>
          <label htmlFor="todo-deadline">기한(최대7일)</label><input type='checkbox' name="isDeadline" className="checkbox" id='todo-deadline' checked={newTodo.isDeadline? true : false} onChange={handleCheck}/>
          {newTodo.isDeadline && <select onChange={selectDeadline}>
            <option value={false}>없음</option>
            <option value={1}>1일</option>
            <option value={2}>2일</option>
            <option value={3}>3일</option>
            <option value={4}>4일</option>
            <option value={5}>5일</option>
            <option value={6}>6일</option>
            <option value={7}>7일</option>
          </select>}
          <button type='submit' onClick={registerTodo}>할 일 등록</button>
        </form>
      </div>
      {/* Todo 리스트 */}
      <div className='WorkpadTodo-todolist-wrap'>
        <div className='WorkpadTodo-select-list' onClick={selectShowingTodoList}>
          <h2>Todo 리스트 선택</h2>
          <div className='primary' id='select-primary'>중요 TODO{` (${todoList.filter(todo => todo.primary).length})`}</div>
          <div className='routine' id='select-routine'>루틴 TODO{` (${todoList.filter(todo => todo.routine).length})`}</div>
          <div className='' id='select-deadline'>기한 TODO{` (${deadlineTodos.length})`}</div>
          <div className='noDone' id='select-noDone'>아직 해야 할 TODO{` (${todoList.filter(todo => !todo.isDone).length})`}</div>
          <div className='done' id='select-done'>완료된 TODO{` (${doneTodos.length})`}</div>
        </div>
        <div className="WorkpadTodo-list-container" onClick={handleClickTodoCard}>
          {showingTodoList === 'select-primary' && 
          <WorkpadTodoList 
            todos={todoList.filter(todo => todo.primary)} 
            todoType='primary' todoSettingMode={todoSettingMode} 
            changeModifyTodo={changeModifyTodo}>
              중요 TODO</WorkpadTodoList>}
          
          {showingTodoList === 'select-routine' && 
          <WorkpadTodoList todos={todoList.filter(todo => todo.routine)} 
            todoType='routine' 
            todoSettingMode={todoSettingMode} 
            changeModifyTodo={changeModifyTodo}>
              루틴 TODO</WorkpadTodoList>}
          
          {showingTodoList === 'select-deadline' && 
          <WorkpadTodoList todos={deadlineTodos} 
            todoType='deadline' 
            todoSettingMode={todoSettingMode} 
            changeModifyTodo={changeModifyTodo}>
              기한 TODO</WorkpadTodoList>}
          
          {showingTodoList === 'select-noDone' && 
          <WorkpadTodoList todos={todoList.filter(todo => !todo.isDone)} 
            todoType='noDone' 
            todoSettingMode={todoSettingMode} 
            changeModifyTodo={changeModifyTodo}>
              아직 해야 할 TODO</WorkpadTodoList>}
          
          {showingTodoList === 'select-done' && 
          <WorkpadTodoList todos={doneTodos} 
            todoType='done' 
            todoSettingMode={todoSettingMode} 
            changeModifyTodo={changeModifyTodo}>
              완료된 TODO</WorkpadTodoList>}
        </div>
      </div>
      
      {todoSettingMode.mode && <WorkpadTodoSetting 
        todoSettingMode={todoSettingMode} 
        showingTodoList={showingTodoList} 
        getTodoToDB={getTodoToDB} 
        setTodoSettingMode={setTodoSettingMode} 
        modifyTodoTitle={modifyTodoTitle} 
        setModifyTodoTitle={setModifyTodoTitle}/>}
    </div>
  )
}

export default WorkpadTodo;