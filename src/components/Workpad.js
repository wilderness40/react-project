import '../styles/Workpad.css';
import { useState } from 'react';
import { WorkpadContents } from '../components';

function Workpad(){
  // 워크 패드 상단 탭 클릭 시 화면 전환
  const [workpadTabState, setWorkpadTabState] = useState('total');
  const handleWorkpadTabState = (e) => {
    if(e.target.tagName === 'SPAN'){
      const tabName = e.target.id;
      setWorkpadTabState(tabName);
    }else if(e.target.tagName === 'U'){
      const tabName = e.target.parentNode.id;
      setWorkpadTabState(tabName);
    }
    
  }

  return (
    <div className='Workpad-container'>
      <div className='Workpad-header'>
        <span className='workpad-header-btn' id='total' onClick={handleWorkpadTabState}><u>전</u>체</span>
        <span className='workpad-header-btn' id='schedule' onClick={handleWorkpadTabState}><u>스</u>케줄</span>
        <span className='workpad-header-btn' id='todo' onClick={handleWorkpadTabState}><u>T</u>odo</span>
      </div>
      <WorkpadContents workpadTabState={workpadTabState}></WorkpadContents>
    </div>
  )
}

export default Workpad;