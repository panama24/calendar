import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AppContainer } from './styles';
import Calendar from './components/calendar';
import usePopup from './components/popup/usePopup';
import { getNumberOfDaysInMonth } from './helpers';

function App() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [firstDayOfMonth, setFirstDayOfMonth] = useState('');
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState('');
  const [scheduledEvents, setScheduledEvents] = useState([]);

  useEffect(() => {
    const firstDay = getFirstDay(currentDate);
    const numberOfDaysInMonth = getNumberOfDaysInMonth(firstDay);
    setFirstDayOfMonth(firstDay);
    setNumberOfDaysInMonth(numberOfDaysInMonth);
  }, []);

  const getFirstDay = date => moment(date)
    .startOf('month')
    .format('YYYY-MM-DD hh:mm');

  const navigateByMonth = month => {
    setCurrentDate(month);
    setFirstDayOfMonth(getFirstDay(month));
    setNumberOfDaysInMonth(getNumberOfDaysInMonth(month));
  };

  const clickNavigationHandler = (direction) => {
    direction === 'forward' ?
      navigateByMonth(moment(currentDate).add(1, 'M')) :
      navigateByMonth(moment(currentDate).subtract(1, 'M'));
  }

  const startIdx = moment(currentDate)
    .startOf('month')
    .day();

  const { isShowing, popupId, setId, toggle } = usePopup();
  const clickScheduleEventHandler = n => {
    const currentDateStr = moment(currentDate).format('YYYY-MM-DD');
    const partialDate = currentDateStr.split('-').slice(0, 2).join('-');
    const formattedNumber = ("0" + n).slice(-2);
    const dateStr = `${partialDate}-${formattedNumber}`;

    setId(n);
    setSelectedDay(dateStr);
    toggle();
  };

  const clickTodayHandler = () => setCurrentDate(moment());

  const formSubmissionHandler = values => {
    setScheduledEvents([ ...scheduledEvents, { ...values }]);
    toggle();
  };

  return (
    <AppContainer>
      <Calendar
        clickNavigationHandler={clickNavigationHandler}
        clickScheduleEventHandler={clickScheduleEventHandler}
        clickTodayHandler={clickTodayHandler}
        date={currentDate}
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
