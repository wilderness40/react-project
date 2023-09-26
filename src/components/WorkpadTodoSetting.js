function WorkpadTodoSetting({ loc }){
  const style = {
    top : loc.y,
    left : loc.x
  }
  return (
    <div className='WorkpadTodo-todo-card-set' style={style}>
      {/* todo 카드 세팅 탭 */}
      <button>완료</button>
      <button>수정</button>
      <button>삭제</button>
    </div>
  )
}

export default WorkpadTodoSetting;