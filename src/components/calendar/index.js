import React from 'react';
import moment from 'moment';
import { generateWeeksArray } from './helpers';
import {
  Day,
  Grid,
  Event,
  Header,
  Number,
  NumberWrapper,
  StyledNavigation,
  Week,
  Weekday,
  WeekdayHeader,
} from './styles';

import { Button } from '../shared/button';

import { getDailyEvents } from '../../helpers';

const WEEKDAY_SHORTNAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Navigation = ({ icon, onClick }) => (
  <StyledNavigation type='button' onClick={onClick}>
    {icon}
  </StyledNavigation>
);


const DaysOfWeek = () => (
  <WeekdayHeader>
    {WEEKDAY_SHORTNAMES.map((day, i) => (
      <Weekday key={i}>{day}</Weekday>
    ))}
  </WeekdayHeader>
);

const renderNumber = (day, today) => day && (
  <NumberWrapper>
    <Number today={today}>
      {day}
    </Number>
  </NumberWrapper>
);

const renderEvents = events => !!events.length &&
  events.map(({ description, title }) => (
    <Event key={title}>
      {title}: {description}
    </Event>
  ));


const noop = () => ({});
const DayContainer = ({ clickScheduleEventHandler, day, date, scheduledEvents }) => {
  const today = date.date() === day && moment().isSame(date, 'month');
  const year = date.year();
  const month = date.month();
  const formatMonth = String(month).length > 1 ? month : `0${month}`;
  const formatDay = String(day).length > 1 ? day : `0${day}`;

  const dateStr = `${year}-${formatMonth}-${formatDay}`;
  const formatDate = moment(dateStr, 'YYYY-MM-DD').add(1, 'month')

  const events = getDailyEvents(scheduledEvents, formatDate);

  return (
    <Day onClick={() => { day ?  clickScheduleEventHandler(day) : noop()}}>
      {renderNumber(day, today)}
      {renderEvents(events)}
    </Day>
  );
};

const Weeks = ({
  date,
  clickScheduleEventHandler,
  numberOfDaysInMonth,
  scheduledEvents,
  startIdx,
}) => {
  const weeksArray = generateWeeksArray(numberOfDaysInMonth, startIdx)

  return (
    <div>
      {weeksArray.map((week, weekIdx) => (
        <Week key={weekIdx}>
          {week.map((day, dayIdx) => (
            <DayContainer
              clickScheduleEventHandler={clickScheduleEventHandler}
              day={day}
              date={date}
              key={dayIdx}
              scheduledEvents={scheduledEvents}
            />
          ))}
        </Week>
      ))}
    </div>
  );
};

const Calendar = ({
  clickNavigationHandler,
  clickScheduleEventHandler,
  clickTodayHandler,
  date,
  numberOfDaysInMonth,
  numberOfEmptyCells,
  scheduledEvents,
  startIdx,
}) => (
  <Grid>
    <div>
      <Header>
        <Navigation icon={'<'} onClick={() => clickNavigationHandler('back')} />
        <Button onClick={() => clickTodayHandler()}>Today</Button>
        <div>{date.format('MMMM')}</div>
        <div>{date.format('YYYY')}</div>
        <Button>Month</Button>
        <Navigation icon={'>'} onClick={() => clickNavigationHandler('forward')} />
      </Header>
      <DaysOfWeek />
      <Weeks
        clickScheduleEventHandler={clickScheduleEventHandler}
        date={date}
        numberOfDaysInMonth={numberOfDaysInMonth}
        scheduledEvents={scheduledEvents}
        startIdx={startIdx}
      />
    </div>
  </Grid>
);

export default Calendar;
