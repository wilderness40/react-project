import '../styles/WorkpadSchedule.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect, useMemo } from 'react';



function WorkpadSchedule(){
  // 달력에 표시될 스케줄 리스트 state
  const [scheduleList, setScheduleList] = useState([])

  const getScheduleToDB = () => {
    fetch('http://127.0.0.1:4000/api/schedule',{
        method : 'GET'
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

  useEffect(() => {
    getScheduleToDB();
  },[])

  // 등록할 시작날짜와 종료날짜 state에 저장
  const [selectedDate, setSelectedDate] = useState({
    start :`${new Date().getFullYear()}-${new Date().getMonth()+1 < 10?'0'+(new Date().getMonth()+1): new Date().getMonth()+1}-${new Date().getDate()}`,
    end : `${new Date().getFullYear()}-${new Date().getMonth()+1 < 10?'0'+(new Date().getMonth()+1): new Date().getMonth()+1}-${new Date().getDate()}`
  });
  // 시작날짜를 변경할지 종료날짜를 변경할지 여부
  const [dateSelectMode, setDateSelectMode] = useState(true);

  const registerSchedule = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:4000/api/schedule',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        start : new Date(e.target.form[0].value),
        end : new Date(e.target.form[1].value),
        title : e.target.form[2].value,
        description : e.target.form[3].value,
      })
    })
    .then(() => {
      e.target.form[2].value = '';
      e.target.form[3].value = '';
      getScheduleToDB();
    })
  }

  const handleDateClick = (arg) => {
    const date = arg.dateStr;
    if(dateSelectMode){
      // 끝 날짜 보다 시작날짜가 늦지 않게 설정
      if(selectedDate.end >= date){
        setSelectedDate({...selectedDate, start : date});
      }
    }else{
      // 시작 날짜 보다 끝날짜가 빠르지 않게 설정
      if(selectedDate.start <= date){
        setSelectedDate({...selectedDate, end : date});
      }
    }
  }
  // 시작 날짜와 종료 날짜 선택 플래그
  const ChangeDateSelectMode = (e) => {
    if(e.target.id === 'selectDate-start'){
      setDateSelectMode(true);
    }else if(e.target.id === 'selectDate-end'){
      setDateSelectMode(false);
    }
  }

  return(
    <div className='WorkpadSchedule-container'>
      {/* 달력 부분 */}
      <div className='WorkpadSchedule-calendar'>
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={scheduleList}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        />
      </div>
      {/* 스케줄 등록 부분 */}
      <div className="WorkpadSchedule-input-container">
        <form>

          <label htmlFor='selectDate-start'>시작날짜: </label><input name="selectDate-start" id='selectDate-start' value={selectedDate.start} readOnly onClick={ChangeDateSelectMode}/>
          <label htmlFor='selectDate-end'>종료날짜: </label><input name="selectDate-end" id='selectDate-end' value={selectedDate.end} readOnly onClick={ChangeDateSelectMode}/>
          <label htmlFor='schedule-title'>title:</label><input name="schedule-title" id='schedule-title'/>
          <label htmlFor='schedule-description'>description:</label><input type='textarea' name="schedule-description" id='schedule-description'/>
          <button onClick={registerSchedule}>스케줄 등록</button>
        </form>
      </div>
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      {/* <b>{eventInfo.timeText}</b> */}
      <i>{eventInfo.event.title}</i>
      {/* <i>asd</i> */}
    </>
  )
}


export default WorkpadSchedule;