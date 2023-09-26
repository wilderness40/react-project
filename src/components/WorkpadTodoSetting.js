import { useEffect } from "react";

function WorkpadTodoSetting({ todoSettingMode, showingTodoList, getTodoToDB, setTodoSettingMode, modifyTodoTitle, setModifyTodoTitle }){
  const { loc , _id } = todoSettingMode
  const handleTodoSetting = (e) => {
    if(e.target.tagName === 'BUTTON'){
      switch(e.target.textContent){
        case '완료':
          fetch(`http://127.0.0.1:4000/api/todo/done/${_id}`,{
            method : 'PUT',
          })
          .catch(e => console.log(e))
          .then(() => {
            getTodoToDB();
            setTodoSettingMode({ mode : false });
          });
          break;
        case '수정':
          if(!todoSettingMode.modify){
            setModifyTodoTitle(document.getElementById(_id)?.firstChild.innerText)
            setTodoSettingMode({ ...todoSettingMode, modify : true });
          }else{
            if(modifyTodoTitle){
              fetch(`http://127.0.0.1:4000/api/todo/${_id}`,{
              method : 'PUT',
              headers : {
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify({
                title : modifyTodoTitle
              })
            })
            .catch(e => console.log(e))
            .then(() =>{
              document.querySelectorAll('.WorkpadTodo-list-card').forEach(card => card.classList.remove('move-todo-card'));
              getTodoToDB();
              setTodoSettingMode({ mode : false });
            })
            }
          }
          break;
        case '삭제':
          fetch(`http://127.0.0.1:4000/api/todo/${_id}`,{
            method : 'DELETE',
          })
          .catch(e => console.log(e))
          .then(() => {
            getTodoToDB();
            setTodoSettingMode({ mode : false });
          });
          break;
        default:
          return;
      }
    }
  }

  useEffect(() => {
    if(document.getElementById(_id)?.firstChild.tagName === 'INPUT'){
      document.getElementById(_id)?.firstChild.focus();
    }
  },[todoSettingMode.modify])

  const style = {
    top : loc.y,
    left : loc.x
  }
  return (
    <div className='WorkpadTodo-todo-card-set' style={style} onClick={handleTodoSetting}>
      {/* todo 카드 세팅 탭 */}
      <button>{showingTodoList !== 'select-done'? '완료' : '완취'}</button>
      <button>수정</button>
      <button>삭제</button>
    </div>
  )
}

export default WorkpadTodoSetting;