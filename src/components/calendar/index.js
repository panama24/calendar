import React from 'react';
import moment from 'moment';
import { generateWeeksArray } from './helpers';
import {
  Day,
  Grid,
  Header,
  Number,
  StyledNavigation,
  Week,
  Weekday,
  WeekdayHeader,
} from './styles';
import { Button } from '../shared/button';

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
            <Day key={dayIdx} onClick={() => {day ? handleDayClick(day) : console.log('can I do this?')}}>
              {day && <Number today={date.date() === day && moment().isSame(date, 'month')}>{day}</Number>}
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
        <Navigation icon={'<'} onClick={() => handleNavigationClick('back')} />
        <Button>Today</Button>
        <div>{date.format('MMMM')}</div>
        <div>{date.format('YYYY')}</div>
        <Button>Month</Button>
        <Navigation icon={'>'} onClick={() => handleNavigationClick('forward')} />
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
