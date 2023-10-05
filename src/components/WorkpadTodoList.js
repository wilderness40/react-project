import React, { useEffect, useRef } from 'react';
import WorkpadTodoSetting from './WorkpadTodoSetting';

function WorkpadTodoList({ children, todos, todoType, todoSettingMode, changeModifyTodo, setModifyTodoTitle, modifyTodoTitle, setTodoSettingMode, showingTodoList, getTodoToDB }){
  // let deadlineStyle = [];
  // 기한 투두 관련 데이터 가공
  if(todoType === 'deadline'){
    const deadlineStyle = todos.map(todo => {
      if(todo.rest < 1){
        return { ...todo, todostyle : 'deadline-today', dDay : 'D-day'};
      }else if(todo.rest < 3){
        return { ...todo, todostyle : 'deadline-almost', dDay : `D-${todo.rest}`};
      }else if(todo.rest < 5){
        return { ...todo, todostyle : 'deadline-fivedays', dDay : `D-${todo.rest}`};
      }else if(todo.rest < 8){
        return { ...todo, todostyle : 'deadline-sevendays', dDay : `D-${todo.rest}`};
      }else if(todo.rest < 200){
        return { ...todo, todostyle : 'deadline-pass', dDay : `D+${(todo.rest/10)}`};
      }
    })
    todos = deadlineStyle;
  }
  // 투두 수정 인풋 창 열리면 포커스
  const modifyInput = useRef();

  useEffect(() => {
    if(modifyInput.current){
      modifyInput.current.focus();
      setModifyTodoTitle(modifyInput.current.defaultValue);
    }
  },[todoSettingMode?.modify])
  
  return(
    <>
      <h3>{children}</h3>
      <div className='WorkpadTodo-list'>
        
        {todos && todos.map(todo => {
          return (
            <React.Fragment key={todo._id}>
              {/* {todoSettingMode?.mode && todo._id === todoSettingMode._id && <span style={{ width: '172px', margin: '0', height:'20px'}}></span>} */}
              <div id={todo._id} className={`WorkpadTodo-list-card ${todoType} ${todo.todostyle? todo.todostyle : ''} ${todoSettingMode?.mode && todo._id === todoSettingMode._id && 'move-todo-card'}`}>
                {/* 수정 할 투두와 안할 투두 렌더링 */}
                {!todoSettingMode?.modify && <p>{todo.typeImg}{todo.title}{todo.dDay ? ` (${todo.dDay})` : null}</p>}
                {todoSettingMode?.modify && (todo._id === todoSettingMode._id ?
                  <input ref={modifyInput} type='text' defaultValue={todo.title} onChange={changeModifyTodo}/> : <p>{todo.typeImg}{todo.title}{todo.dDay ? ` (${todo.dDay})` : null}</p>)}
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}

export default WorkpadTodoList;