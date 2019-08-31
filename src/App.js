import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AppContainer } from './styles';
import Calendar from './components/calendar';
import usePopup from './components/popup/usePopup';
import { getNumberOfDaysInMonth } from './helpers';

function App() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState('');
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const [toggleEventAction, setToggleEventAction] = useState({});

  useEffect(() => {
    const firstDay = moment(currentDate)
      .startOf('month')
      .format('YYYY-MM-DD hh:mm');
    const daysInMonth = getNumberOfDaysInMonth(firstDay);
    setNumberOfDaysInMonth(daysInMonth);
  }, []);

  const navigate = month => {
    setCurrentDate(month);
    setNumberOfDaysInMonth(getNumberOfDaysInMonth(month));
  };

  const startIdx = moment(currentDate)
    .startOf('month')
    .day();

  const { isShowing, popupId, setId, toggle } = usePopup();

  const schedulingEvent = (date, uniquePopupId) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    setId(uniquePopupId);
    setSelectedDay(dateStr);
    toggle();
  };

  const viewingEvent = uniquePopupId => {
    setId(uniquePopupId);
    toggle();
  };

  const getToday = () => setCurrentDate(moment());

  const togglingEventAction = (actionObj) => setToggleEventAction({ ...Object.assign(toggleEventAction, {...actionObj}) });

  const formSubmissionHandler = values => {
    setScheduledEvents([ ...scheduledEvents, { ...values }]);
    toggle();
  };

  return (
    <AppContainer>
      <Calendar
        currentDate={currentDate}
        formSubmissionHandler={formSubmissionHandler}
        getToday={getToday}
        isShowing={isShowing}
        navigate={navigate}
        numberOfDaysInMonth={numberOfDaysInMonth}
        popupId={popupId}
        schedulingEvent={schedulingEvent}
        scheduledEvents={scheduledEvents}
        selectedDay={selectedDay}
        setId={setId}
        startIdx={startIdx}
        toggle={toggle}
        toggleEventAction={toggleEventAction}
        togglingEventAction={togglingEventAction}
        viewingEvent={viewingEvent}
      />
    </AppContainer>
  );
}

export default App;
