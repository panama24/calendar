import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AppContainer } from './styles';
import Calendar from './components/calendar';

function App() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [firstDayOfMonth, setFirstDayOfMonth] = useState('');
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(0);

  useEffect(() => {
    const firstDay = getFirstDay(currentDate);
    setFirstDayOfMonth(firstDay);

    const numberOfDaysInMonth = getNumberOfDaysInMonth(firstDay);
    setNumberOfDaysInMonth(numberOfDaysInMonth);
  }, []);

  const getFirstDay = date => moment(date)
    .startOf('month')
    .format('YYYY-MM-DD hh:mm');

  const getNumberOfDaysInMonth = firstDay => moment(firstDay).daysInMonth();

  const handleNavigationClick = (direction) => {
    if (direction === 'forward') {
      const nextDate = moment(currentDate).add(1, 'M');
      setCurrentDate(nextDate);
      setFirstDayOfMonth(getFirstDay(nextDate));
      setNumberOfDaysInMonth(getNumberOfDaysInMonth(nextDate));
    } else {
      const nextDate = moment(currentDate).subtract(1, 'M');
      setCurrentDate(nextDate);
      setFirstDayOfMonth(getFirstDay(nextDate));
      setNumberOfDaysInMonth(getNumberOfDaysInMonth(nextDate));
    }
  }

  const startIdx = moment(currentDate)
    .startOf('month')
    .day();

  return (
    <AppContainer>
      <Calendar
        date={currentDate}
        handleNavigationClick={handleNavigationClick}
        startIdx={startIdx}
        numberOfDaysInMonth={numberOfDaysInMonth}
      />
    </AppContainer>
  );
}

export default App;
