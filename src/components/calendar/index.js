import React from 'react';
import DayContainer from './days';
import DaysOfWeek from './weekdays';
import Header from './header';
import { generateWeeksArray } from './helpers';
import { Grid, Week } from './styles';

const Calendar = ({
  clearFormValues,
  currentDate,
  formSubmissionHandler,
  setToday,
  isShowing,
  navigate,
  numberOfDaysInMonth,
  popupId,
  schedulingEvent,
  scheduledEvents,
  selectedDay,
  setId,
  startIdx,
  toggle,
  eventAction,
  togglingEventAction,
  viewingEvent,
}) => (
  <Grid>
    <div>
      <Header
        setToday={setToday}
        currentDate={currentDate}
        navigate={navigate}
      />
      <DaysOfWeek />
        {generateWeeksArray(numberOfDaysInMonth, startIdx).map((week, weekIdx) => (
          <Week key={weekIdx}>
            {week.map((clickableDay, dayIdx) => (
              <DayContainer
                clearFormValues={clearFormValues}
                clickableDay={clickableDay}
                currentDate={currentDate}
                formSubmissionHandler={formSubmissionHandler}
                dayIdx={dayIdx}
                isShowing={isShowing}
                key={dayIdx}
                popupId={popupId}
                scheduledEvents={scheduledEvents}
                schedulingEvent={schedulingEvent}
                selectedDay={selectedDay}
                setId={setId}
                toggle={toggle}
                eventAction={eventAction}
                togglingEventAction={togglingEventAction}
                viewingEvent={viewingEvent}
              />
            ))}
          </Week>
        ))}
    </div>
  </Grid>
);

export default Calendar;
