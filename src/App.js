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

  const handleDayClick = n => {
    const currentDateStr = moment(currentDate).format('YYYY-MM-DD');
    const partialDate = currentDateStr.split('-').slice(0, 2).join('-');
    const formattedNumber = ("0" + n).slice(-2);
    const dateStr = `${partialDate}-${formattedNumber}`;

    return dateStr;
  };

  return (
    <AppContainer>
      <Calendar
        handleDayClick={handleDayClick}
        date={currentDate}
        handleNavigationClick={handleNavigationClick}
        startIdx={startIdx}
        numberOfDaysInMonth={numberOfDaysInMonth}
      />
    </AppContainer>
  );
}

export default App;
