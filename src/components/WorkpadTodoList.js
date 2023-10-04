function WorkpadTodoList({ children, todos, todoType, todoSettingMode, changeModifyTodo }){
  // let deadlineStyle = [];
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
    console.log(todos)
  }
  
  return(
    <>
      <h3>{children}</h3>
      <div className='WorkpadTodo-list'>
        
        {todos && todos.map(todo => {
          return (
            <div key={todo._id} id={todo._id} className={`WorkpadTodo-list-card ${todoType} ${todo.todostyle? todo.todostyle : ''}`}>
              {!todoSettingMode?.modify && <p>{todo.typeImg}{todo.title}<span>{todo.dDay ? ` (${todo.dDay})` : null}</span></p>}
              {todoSettingMode?.modify && (todo._id === todoSettingMode._id ?
                <input type='text' defaultValue={todo.title} onChange={changeModifyTodo}/> : <p>{todo.title}</p>)}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default WorkpadTodoList;