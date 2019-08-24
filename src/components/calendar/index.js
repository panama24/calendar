import React, { useState } from 'react';
import moment from 'moment';
import { generateWeeksArray } from './helpers';
import {
  Day,
  Grid,
  Event,
  HeaderWrapper,
  Number,
  NumberWrapper,
  StyledNavigation,
  TooltipWrapper,
  Week,
  Weekday,
  WeekdayHeader,
} from './styles';

import Form from '../form';
import { Button } from '../shared/button';

import { getDailyEvents } from '../../helpers';

const WEEKDAY_SHORTNAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Events = events => !!events.length &&
  events.map(({ description, title }) => {
    const copy = `${title}: ${description}`;
    return (
      <Event key={title}>
        {!!title ? copy : '(No title)'}
      </Event>
    )}
  );

const Tooltip = ({ id, isOpen }) => id && (isOpen === id) && (
  <TooltipWrapper>
    <Form />
  </TooltipWrapper>
);

const noop = () => ({});

const Calendar = ({
  clickNavigationHandler,
  clickScheduleEventHandler,
  clickTodayHandler,
  date,
  numberOfDaysInMonth,
  scheduledEvents,
  startIdx,
}) => {
  const [clickedOn, setClickedOn] = useState(null);

  const getToday = day => date.date() === day && moment().isSame(date, 'month');
  const getEvents = day => {
    const year = date.year();
    const month = date.month();
    const formatMonth = String(month).length > 1 ? month : `0${month}`;
    const formatDay = String(day).length > 1 ? day : `0${day}`;

    const dateStr = `${year}-${formatMonth}-${formatDay}`;
    const formatDate = moment(dateStr, 'YYYY-MM-DD').add(1, 'month')

    return getDailyEvents(scheduledEvents, formatDate);
  };

  const handleSchedulingClick = day => {
    setClickedOn(day);
  };

  return (
    <Grid>
      <div>
        <HeaderWrapper>
          <StyledNavigation
            type='button'
            onClick={() => clickNavigationHandler('back')}>
            {'<'}
          </StyledNavigation>
          <Button onClick={() => clickTodayHandler()}>Today</Button>
          <div>{date.format('MMMM')}</div>
          <div>{date.format('YYYY')}</div>
          <Button>Month</Button>
          <StyledNavigation
            type='button'
            onClick={() => clickNavigationHandler('forward')}>
            {'>'}
          </StyledNavigation>
        </HeaderWrapper>
        <WeekdayHeader>
          {WEEKDAY_SHORTNAMES.map((day, i) => (
            <Weekday key={i}>{day}</Weekday>
          ))}
        </WeekdayHeader>
        {generateWeeksArray(numberOfDaysInMonth, startIdx).map((week, weekIdx) => (
          <Week key={weekIdx}>
            {week.map((day, dayIdx) => (
              <Day key={dayIdx} onClick={() => { day ?  handleSchedulingClick(day) : noop()}}>
                {day && (
                  <NumberWrapper>
                    <Number today={getToday(day)}>
                      {day}
                    </Number>
                  </NumberWrapper>
                )}
                <Events events={getEvents(day)} />
                <Tooltip
                  id={day}
                  isOpen={clickedOn}
                />
              </Day>
            ))}
          </Week>
        ))}
      </div>
    </Grid>
  );
};

export default Calendar;
