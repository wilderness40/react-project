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
        console.log(res.scheduleList)
        setScheduleList(res.scheduleList)
      })
  }

  const [todoList, setTodoList] = useState({ todos : [], doneTodos : [] });

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

  const today_midnight_getTime = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).getTime();

  const deadlineTodos = todoList.todos?.filter(todo => todo.deadline).map(todo => {
    const restTime = Math.floor((new Date(todo.deadline).getTime() - today_midnight_getTime) / 86400000);
    console.log(restTime)
    // 기간이 지난 todo는 맨 밑 정렬
    return { ...todo, rest : restTime < 0 ? restTime*(-10) : restTime };
  }).sort((a, b) => a.rest - b.rest);

  switch(workpadTabState){
    case 'total':
      return (
        <WorkpadTotal scheduleList={scheduleList} todoList={todoList.todos} doneTodos={todoList.doneTodos} deadlineTodos={deadlineTodos}></WorkpadTotal>
      )
    case 'schedule':
      return (
        <WorkpadSchedule scheduleList={scheduleList} getScheduleToDB={getScheduleToDB}></WorkpadSchedule>
      )
    case 'todo':
      return (
        <WorkpadTodo todoList={todoList.todos} doneTodos={todoList.doneTodos} getTodoToDB={getTodoToDB} deadlineTodos={deadlineTodos}></WorkpadTodo>
      )
    default:
      return
  }
}

export default WorkpadContents;