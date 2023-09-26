function WorkpadTodoList({ children, todos, todoType }){
  let deadlineStyle = [];
  if(todoType === 'deadline'){
    deadlineStyle = todos.map(todo => {
      console.log(todo.rest)
      if(todo.rest < 0){
        console.log('sada')
        return { ...todo, todostyle : 'deadline-pass'};
      }else if(todo.rest < 1){
        console.log('sada')
        return { ...todo, todostyle : 'deadline-today'};
      }else if(todo.rest < 3){
        return { ...todo, todostyle : 'deadline-almost'};
      }else if(todo.rest < 5){
        return { ...todo, todostyle : 'deadline-fivedays'};
      }else if(todo.rest < 8){
        return { ...todo, todostyle : 'deadline-sevendays'};
      }
    })
    console.log(deadlineStyle)
  }
  
  return(
    <div className='WorkpadTodo-list'>
      <h3>{children}</h3>
      {todos && todoType !== 'deadline'? todos.map(todo => {
        return (
          <div key={todo._id} id={todo._id} className={`WorkpadTodo-list-card ${todoType}`}>
            <p>{todo.title}</p>
          </div>
        )
      })
    :
    deadlineStyle.map(todo => {
      return (
        <div key={todo._id} id={todo._id} className={`WorkpadTodo-list-card ${todoType} ${todo.todostyle}`}>
          <p>{todo.title}</p>
        </div>
      )
    })}
    </div>
  )
}

export default WorkpadTodoList;