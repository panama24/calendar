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
    const dateStr = moment(date).format('YYYY-MM-DD');
    setId(uniquePopupId);
    setSelectedDay(dateStr);
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
    setScheduledEvents([ ...scheduledEvents, { ...values }]);
    toggle();
  };

  const deleteEvent = eventId => {
    // get by id
    console.log(eventId);
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
