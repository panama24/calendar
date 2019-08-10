import React, { useEffect, useState } from 'react';
import moment from 'moment';

import {
  AppContainer,
  Cell,
  Day,
  Grid,
  WeekdayHeader,
  Header,
  Week,
  Weekday,
} from './styles';

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Navigation = ({ icon, onClick }) => (
  <button onClick={onClick}>
    {icon}
  </button>
);

const DaysOfWeek = () => (
  <WeekdayHeader>
    {DAYS_OF_WEEK.map((day, i) => <Weekday key={i}>{day}</Weekday>)}
  </WeekdayHeader>
);


const Weeks = ({ numberOfDaysInMonth, startIdx }) => {
  const maxCellCount = (startIdx >= 5 && numberOfDaysInMonth === 31) ? 42 : 35;
  const remainingCellCount = maxCellCount - (startIdx + numberOfDaysInMonth);
  const numberOfWeeks = maxCellCount / 7;

  const firstWeekEmptyCells = [...Array(startIdx)].fill('hello');
  const firstWeekDays = [...Array(7 - startIdx)].map((_, i) => i + 1);
  const firstWeek = firstWeekEmptyCells.concat(firstWeekDays);

  const getNextStartIdx = previousWeek => previousWeek[previousWeek.length - 1];

  const generateRemainingWeeks = (startIdx) => {
    const numberOfRemainingWeeks = numberOfWeeks - 1;
    let nextIdx = startIdx;
    let weeks = [];

    for (var i = 1; i <= numberOfRemainingWeeks; i++) {
      let week = [];

      for (var j = 1; j <= 7; j++) {
        if (nextIdx + j > numberOfDaysInMonth) {
          week.push('hello');
        } else {
          week.push(nextIdx + j);
        }
      }

      weeks.push(week);
      nextIdx += 7
    };

    return weeks;
  };

  const nextIdxAfterFirstWeek = getNextStartIdx(firstWeek);
  const remainingWeeks = generateRemainingWeeks(nextIdxAfterFirstWeek);
  const weeksArray = [firstWeek].concat(remainingWeeks);

  return (
    <div>
      {weeksArray.map((week, weekIdx) => (
        <Week key={weekIdx}>
          {week.map((day, dayIdx) => (
            <Day key={dayIdx}>{day}</Day>
          ))}
        </Week>
      ))}
    </div>
  );
};

const Calendar = ({
  date,
  handleNavigationClick,
  numberOfDaysInMonth,
  numberOfEmptyCells,
  startIdx,
}) => (
  <Grid>
    <div>
      <Header>
        <Navigation
          icon={'<'}
          onClick={() => handleNavigationClick('back')}
        />
        <div>{date.format('MMMM')}</div>
        <div>{date.format('YYYY')}</div>
        <Navigation
          icon={'>'}
          onClick={() => handleNavigationClick('forward')}
        />
      </Header>
      <DaysOfWeek />
      <Weeks
        numberOfDaysInMonth={numberOfDaysInMonth}
        startIdx={startIdx}
      />
    </div>
  </Grid>
);

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
