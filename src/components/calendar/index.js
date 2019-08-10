import React from 'react';
import { generateWeeksArray } from './helpers';
import {
  Day,
  Grid,
  Header,
  StyledNavigation,
  Week,
  Weekday,
  WeekdayHeader,
} from './styles';

const WEEKDAY_SHORTNAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Navigation = ({ icon, onClick }) => (
  <StyledNavigation type='button' onClick={onClick}>
    {icon}
  </StyledNavigation>
);


const DaysOfWeek = () => (
  <WeekdayHeader>
    {WEEKDAY_SHORTNAMES.map((day, i) => <Weekday key={i}>{day}</Weekday>)}
  </WeekdayHeader>
);


const Weeks = ({ date, handleDayClick, numberOfDaysInMonth, startIdx }) => {
  const weeksArray = generateWeeksArray(numberOfDaysInMonth, startIdx)

  return (
    <div>
      {weeksArray.map((week, weekIdx) => (
        <Week key={weekIdx}>
          {week.map((day, dayIdx) => (
            <Day
            key={dayIdx}
            today={date.date() === day}
            onClick={() => handleDayClick(day)}
            onMouseDown={() => console.log('same as clicked?')}
          >
            {day}
            </Day>
          ))}
        </Week>
      ))}
    </div>
  );
};

const Calendar = ({
  handleDayClick,
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
        handleDayClick={handleDayClick}
        date={date}
        numberOfDaysInMonth={numberOfDaysInMonth}
        startIdx={startIdx}
      />
    </div>
  </Grid>
);

export default Calendar;
