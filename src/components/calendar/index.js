import React from 'react';
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

const DayNumber = ({ day, today }) => day && (
  <NumberWrapper>
    <Number today={today}>
      {day}
    </Number>
  </NumberWrapper>
);

const Events = ({ events, isShowing, toggle }) => !!events.length &&
  events.map(({
    description,
    endDate,
    endTime,
    startDate,
    startTime,
    title
  }) => {
    const copy = !!title ? `${title}: ${description}` : '(No title)';
    const eventClickHandler = e => {
      e.stopPropagation();
      toggle();
    };

    // can I refactor to use same popover?
    // set what type of popover and an id or something?
    return (
      <>
        <Event key={`event-${title}`} onClick={e => eventClickHandler(e)}>
          {copy}
        </Event>
        <Popup key={`popup-${title}`} isShowing={isShowing} hide={toggle}>
          {title}
          {`${startDate}-${endDate}`}
          {`${startTime}-${endTime}`}
          {description}
        </Popup>
      </>
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
  popupId,
  setId,
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
        <DayNumber day={day} today={today} />
        <Events
          events={events}
          isShowing={isShowing}
          toggle={toggle}
        />
      </Day>
      <Popup isShowing={isShowing && popupId === day} hide={toggle}>
        <Form
          formSubmissionHandler={formSubmissionHandler}
          selectedDay={selectedDay}
        />
      </Popup>
    </>
  );
};

const Weeks = ({
  clickScheduleEventHandler,
  day,
  date,
  formSubmissionHandler,
  isShowing,
  numberOfDaysInMonth,
  popupId,
  selectedDay,
  scheduledEvents,
  setId,
  startIdx,
  toggle,
}) => {
  return (
    <div>
      {generateWeeksArray(numberOfDaysInMonth, startIdx).map((week, weekIdx) => (
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
              popupId={popupId}
              setId={setId}
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
  popupId,
  setId,
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
        popupId={popupId}
        setId={setId}
      />
    </div>
  </Grid>
);

export default Calendar;
