import React from 'react';
import { generateWeeksArray } from '../../helpers';
import {
  Day,
  Grid,
  Header,
  StyledNavigation,
  Week,
  Weekday,
  WeekdayHeader,
} from './styles';

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Navigation = ({ icon, onClick }) => (
  <StyledNavigation type='button' onClick={onClick}>
    {icon}
  </StyledNavigation>
);


const DaysOfWeek = () => (
  <WeekdayHeader>
    {DAYS_OF_WEEK.map((day, i) => <Weekday key={i}>{day}</Weekday>)}
  </WeekdayHeader>
);


const Weeks = ({ numberOfDaysInMonth, startIdx }) => {
  const weeksArray = generateWeeksArray(numberOfDaysInMonth, startIdx)

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
}) => {
  return (
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
};

export default Calendar;
