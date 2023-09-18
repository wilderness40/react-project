import React from "react";
import { WorkpadTotal, WorkpadSchedule, WorkpadTodo } from './'

function WorkpadContents({ workpadTabState }){
  if(workpadTabState === 'total'){
    return (
      <WorkpadTotal></WorkpadTotal>
    )
  }else if(workpadTabState === 'schedule'){
    return (
      <WorkpadSchedule></WorkpadSchedule>
    )
  }else if(workpadTabState === 'todo'){
    return (
      <WorkpadTodo></WorkpadTodo>
    )
  }
 
}

export default WorkpadContents;