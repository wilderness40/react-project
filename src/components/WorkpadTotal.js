import '../styles/WorkpadTotal.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function WorkpadTotal({ scheduleList }){

  return (
    <div className='WorkpadTotal-container'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          events={scheduleList}
          eventContent={renderEventContent}
          />
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <div style={{textAlign:'center'}}>
      {/* <b>{eventInfo.timeText}</b> */}
      <i >{eventInfo.event.title}</i>
    </div>
  )
}

export default WorkpadTotal;