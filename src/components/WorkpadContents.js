import React from "react";
import { WorkpadTotal, WorkpadSchedule, WorkpadTodo } from './'

function WorkpadContents({ workpadTabState }){
  switch(workpadTabState){
    case 'total':
      return (
        <WorkpadTotal></WorkpadTotal>
      )
    case 'schedule':
      return (
        <WorkpadSchedule></WorkpadSchedule>
      )
    case 'todo':
      return (
        <WorkpadTodo></WorkpadTodo>
      )
    default:
      return
  }
}

export default WorkpadContents;