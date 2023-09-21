import '../styles/WorkpadTotal.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function WorkpadTotal(){

  return (
    <div className='WorkpadTotal-container'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          // events={events}
          eventContent={renderEventContent}
          />
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