import React, { useEffect, useState } from 'react';
import moment from 'moment';
import assign from 'lodash/assign';
import keys from 'lodash/keys';
import { AppContainer } from './styles';
import Calendar from './components/calendar';
import usePopup from './components/popup/usePopup';
import { getNumberOfDaysInMonth } from './helpers';

function App() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState('');
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const [eventAction, setEventAction] = useState({ type: 'event' });

  useEffect(() => {
    fetch('http://localhost:3001/events')
      .then(res => res.json())
      .then(data => setScheduledEvents(data))
      .catch(err => console.log(err));

    const firstDay = moment(currentDate)
      .startOf('month')
      .format('YYYY-MM-DD hh:mm');
    const daysInMonth = getNumberOfDaysInMonth(firstDay);
    setNumberOfDaysInMonth(daysInMonth);
  }, []);

  const navigate = month => {
    setCurrentDate(month);
    setNumberOfDaysInMonth(getNumberOfDaysInMonth(month));
  };

  const startIdx = moment(currentDate)
    .startOf('month')
    .day();

  const { isShowing, popupId, setId, toggle } = usePopup();

  const schedulingEvent = (date, uniquePopupId) => {
    setId(uniquePopupId);
    setSelectedDay(date);
    toggle();
  };

  const viewingEvent = uniquePopupId => {
    setId(uniquePopupId);
    toggle();
  };

  const setToday = () => setCurrentDate(moment());

  const togglingEventAction = (actionObj) => setEventAction({ ...assign(eventAction, {...actionObj}) });

  const clearFormValues = () => {
    const newObj = keys(eventAction).forEach(i => { eventAction[i] = '' });
    // set to 'event' so scheduling new events UI defaults to 'event'
    setEventAction({ ...newObj, type: 'event' });
  }

  const formSubmissionHandler = values => {
    const { description, endDate, endTime, startDate, startTime, title } = values;
    const endDateTime = moment(`${endDate} ${endTime}`, 'MMM DD, YYYY HH:mm').format('YYYY/MM/DD HH:mm:ss');
    const startDateTime = moment(`${startDate} ${startTime}`, 'MMM DD, YYYY').format('YYYY/MM/DD HH:mm:ss');
    // const eventDaySpan = Math.abs(moment(startDate, 'MMM DD, YYYY').diff(moment(endDate, 'MMM DD, YYYY'), 'days')) + 1;

    // console.log(startDate, endDate);
    // const eventArr = Array.from(Array(eventDaySpan)).map((e, i) => {
      // // console.log(moment(startDate).add(i, 'days').format('YYYY/MM/DD HH:mm:ss'));
      // const endDateTime = moment(endDate)
        // .add(i, 'days')
        // .format('YYYY/MM/DD HH:mm:ss');
      // const startDateTime = moment(startDate)
        // .add(i, 'days')
        // .format('YYYY/MM/DD HH:mm:ss');
      // return {
        // description,
        // endDateTime,
        // startDateTime,
        // title,
        // type: eventAction.type,
      // }
    // })
    // console.log(eventArr);

    fetch('http://localhost:3001/events', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        endDateTime,
        startDateTime,
        title,
        type: eventAction.type,
      }),
    })
      .then(res => res.json())
      .then(newEvent => {
        setScheduledEvents([...scheduledEvents, newEvent[0]]) })
      .catch(err => console.log(err));

    toggle();
  };

  const deleteEvent = eventId => {
    fetch('http://localhost:3001/events', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: eventId }),
    })
      .then(res => res.json())
      .then(newEvent => {
        toggle();
        setScheduledEvents(scheduledEvents.filter(e => e.id !== eventId))
      })
      .catch(err => console.log(err));

  };

  return (
    <AppContainer>
      <Calendar
        clearFormValues={clearFormValues}
        currentDate={currentDate}
        deleteEvent={deleteEvent}
        eventAction={eventAction}
        formSubmissionHandler={formSubmissionHandler}
        isShowing={isShowing}
        navigate={navigate}
        numberOfDaysInMonth={numberOfDaysInMonth}
        popupId={popupId}
        schedulingEvent={schedulingEvent}
        scheduledEvents={scheduledEvents}
        selectedDay={selectedDay}
        setId={setId}
        setToday={setToday}
        startIdx={startIdx}
        toggle={toggle}
        togglingEventAction={togglingEventAction}
        viewingEvent={viewingEvent}
      />
    </AppContainer>
  );
}

export default App;
