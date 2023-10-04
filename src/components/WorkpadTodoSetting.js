import { useEffect } from "react";

function WorkpadTodoSetting({ todoSettingMode, showingTodoList, getTodoToDB, setTodoSettingMode, modifyTodoTitle, setModifyTodoTitle }){
  const { loc , _id } = todoSettingMode;
  // 투두 클릭 시 나오는 설정 탭 기능 함수
  const handleTodoSetting = (e) => {
    if(e.target.tagName === 'BUTTON'){
      switch(e.target.textContent){
        case '일끝':
          fetch(`http://127.0.0.1:4000/api/todo/done/${_id}`,{
            method : 'PUT',
          })
          .catch(e => console.log(e))
          .then(() => {
            getTodoToDB();
            setTodoSettingMode({ mode : false });
          });
          break;
        case '다시':
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
            setModifyTodoTitle(document.getElementById(_id)?.firstChild.innerText)
            setTodoSettingMode({ ...todoSettingMode, modify : true });
          break;
        case '적용':
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
              // document.querySelectorAll('.WorkpadTodo-list-card').forEach(card => card.classList.remove('move-todo-card'));
              getTodoToDB();
              setTodoSettingMode({ ...todoSettingMode, modify : false });
            })
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

  const style = {
    top : loc.y,
    left : loc.x
  }
  return (
    <div className='WorkpadTodo-todo-card-set' style={style} onClick={handleTodoSetting}>
      {/* todo 카드 세팅 탭 */}
      <button>{showingTodoList !== 'select-done'? '일끝' : '다시'}</button>
      <button>{!todoSettingMode.modify? '수정' : '적용'}</button>
      <button>삭제</button>
    </div>
  )
}

export default WorkpadTodoSetting;