import React, { useState } from 'react';
import moment from 'moment';
import { generateWeeksArray } from './helpers';
import Popup from '../popup';
import Form from '../form';
import {
  Day,
  Grid,
  Event,
  HeaderWrapper,
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

const Header = ({ clickNavigationHandler, clickTodayHandler, date }) => (
  <HeaderWrapper>
    <Navigation icon={'<'} onClick={() => clickNavigationHandler('back')} />
    <Button onClick={() => clickTodayHandler()}>Today</Button>
    <div>{date.format('MMMM')}</div>
    <div>{date.format('YYYY')}</div>
    <Button>Month</Button>
    <Navigation icon={'>'} onClick={() => clickNavigationHandler('forward')} />
  </HeaderWrapper>
);

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
  events.map(({ description, title }) => {
    const copy = `${title}: ${description}`;
    return (
      <Event key={title}>
        {!!title ? copy : '(No title)'}
      </Event>
    )}
  );


const noop = () => ({});
const DayContainer = ({
  clickScheduleEventHandler,
  day,
  date,
  scheduledEvents,
  selectedDay,
  formSubmissionHandler,
  isShowing,
  toggle,
}) => {
  const today = date.date() === day && moment().isSame(date, 'month');
  const year = date.year();
  const month = date.month();
  const formatMonth = String(month).length > 1 ? month : `0${month}`;
  const formatDay = String(day).length > 1 ? day : `0${day}`;

  const dateStr = `${year}-${formatMonth}-${formatDay}`;
  const formatDate = moment(dateStr, 'YYYY-MM-DD').add(1, 'month')

  const events = getDailyEvents(scheduledEvents, formatDate);

  return (
    <>
      <Day onClick={() => { day ?  clickScheduleEventHandler(day) : noop()}}>
        {renderNumber(day, today)}
        {renderEvents(events)}
      </Day>
      <Popup isShowing={isShowing} hide={toggle}>
        <Form
          formSubmissionHandler={formSubmissionHandler}
          selectedDay={selectedDay}
        />
      </Popup>
    </>
  );
};

const Weeks = ({
  date,
  clickScheduleEventHandler,
  numberOfDaysInMonth,
  scheduledEvents,
  startIdx,
  formSubmissionHandler,
  selectedDay,
  isShowing,
  toggle,
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
              formSubmissionHandler={formSubmissionHandler}
              selectedDay={selectedDay}
              isShowing={isShowing}
              toggle={toggle}
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
  scheduledEvents,
  startIdx,
  formSubmissionHandler,
  selectedDay,
  isShowing,
  toggle,
}) => (
  <Grid>
    <div>
      <Header
        clickNavigationHandler={clickNavigationHandler}
        clickTodayHandler={clickTodayHandler}
        date={date}
      />
      <DaysOfWeek />
      <Weeks
        clickScheduleEventHandler={clickScheduleEventHandler}
        date={date}
        numberOfDaysInMonth={numberOfDaysInMonth}
        scheduledEvents={scheduledEvents}
        startIdx={startIdx}
        formSubmissionHandler={formSubmissionHandler}
        selectedDay={selectedDay}
        isShowing={isShowing}
        toggle={toggle}
      />
    </div>
  </Grid>
);

export default Calendar;
