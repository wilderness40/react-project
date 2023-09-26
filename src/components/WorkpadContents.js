import React, { useState, useEffect } from "react";
import { WorkpadTotal, WorkpadSchedule, WorkpadTodo } from './'

function WorkpadContents({ workpadTabState }){
  // 달력에 표시될 스케줄 리스트 state
  const [scheduleList, setScheduleList] = useState([]);
  
  const getScheduleToDB = () => {
    fetch('http://127.0.0.1:4000/api/schedule', {
      method: 'GET'
    })
      .catch(e => console.log(e))
      .then(res => res.json())
      .then(res => {
        // res.map(res => {
        //   return {...res, start : new Date(res.start), end : new Date(res.end)}
        // })
        console.log(res.scheduleList)
        setScheduleList(res.scheduleList)
      })
  }

  const [todoList, setTodoList] = useState([]);

  const getTodoToDB = () => {
    fetch('http://127.0.0.1:4000/api/todo', {
      method : 'GET'
    })
    .catch(e => console.log(e))
    .then(res => res.json())
    .then(res => {
      setTodoList({ todos : res.todos, doneTodos : res.doneTodos })
    })
  }

  useEffect(() => {
    getScheduleToDB();
    getTodoToDB();
  }, []);

  switch(workpadTabState){
    case 'total':
      return (
        <WorkpadTotal scheduleList={scheduleList} todoList={todoList}></WorkpadTotal>
      )
    case 'schedule':
      return (
        <WorkpadSchedule scheduleList={scheduleList} getScheduleToDB={getScheduleToDB}></WorkpadSchedule>
      )
    case 'todo':
      return (
        <WorkpadTodo todoList={todoList.todos} doneTodos={todoList.doneTodos} getTodoToDB={getTodoToDB}></WorkpadTodo>
      )
    default:
      return
  }
}

export default WorkpadContents;