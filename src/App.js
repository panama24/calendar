import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AppContainer } from './styles';
import Calendar from './components/calendar';
import usePopup from './components/popup/usePopup';
import { getNumberOfDaysInMonth } from './helpers';

function App() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState('');
  const [scheduledEvents, setScheduledEvents] = useState([]);

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

  const getToday = () => setCurrentDate(moment());

  const formSubmissionHandler = values => {
    setScheduledEvents([ ...scheduledEvents, { ...values }]);
    toggle();
  };

  return (
    <AppContainer>
      <Calendar
        schedulingEvent={schedulingEvent}
        getToday={getToday}
        currentDate={currentDate}
        navigate={navigate}
        numberOfDaysInMonth={numberOfDaysInMonth}
        scheduledEvents={scheduledEvents}
        startIdx={startIdx}
        formSubmissionHandler={formSubmissionHandler}
        selectedDay={selectedDay}
        isShowing={isShowing}
        popupId={popupId}
        setId={setId}
        toggle={toggle}
      />
    </AppContainer>
  );
}

export default App;
