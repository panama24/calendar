import React from 'react';
import DayContainer from './days';
import DaysOfWeek from './weekdays';
import Header from './header';
import { generateWeeksArray } from './helpers';
import { Grid, Week } from './styles';

const Calendar = ({
  currentDate,
  formSubmissionHandler,
  getToday,
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
  viewingEvent,
}) => (
  <Grid>
    <div>
      <Header
        getToday={getToday}
        currentDate={currentDate}
        navigate={navigate}
      />
      <DaysOfWeek />
        {generateWeeksArray(numberOfDaysInMonth, startIdx).map((week, weekIdx) => (
          <Week key={weekIdx}>
            {week.map((clickableDay, dayIdx) => (
              <DayContainer
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
                viewingEvent={viewingEvent}
              />
            ))}
          </Week>
        ))}
    </div>
  </Grid>
);

export default Calendar;
