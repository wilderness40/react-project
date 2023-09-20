import '../styles/WorkpadTotal.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function WorkpadTotal(){

  return (
    <div className='WorkpadTotal-container'>
      <div className='WorkpadTotal-schedule-container'>
        <div className='WorkpadTotal-schedule'>
          <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          // events={}
          eventContent={renderEventContent}
          />
        </div>
        <div className='WorkpadTotal-schedule-list'>
          <h3>스케줄 리스트</h3>
          <ul>
            <li>부산 출장</li>
            <li>워크샵</li>
            <li>연차</li>
            <li>부장님 생일</li>
          </ul>
        </div>
      </div>
      <div className='WorkpadTotal-Todo-container'>
        <h2>할 일 목록</h2>
        <ul>
          <li>보고서 작성</li>
          <li>비품 확인</li>
          <li>자료 조사</li>
        </ul>
      </div>
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      <i>asd</i>
    </>
  )
}

export default WorkpadTotal;