import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './App.css';
import styled from 'styled-components';

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Day = ({ children }) => (
  <Cell>
    {children}
  </Cell>
);

const Navigation = ({ icon, onClick }) => (
  <button onClick={onClick}>
    {icon}
  </button>
);

const Header = ({ date, handleNavigationClick }) => (
  <HeaderContainer>
    <Navigation icon={'<'} onClick={() => handleNavigationClick('back')} />
    <div>{date.format('MMMM')}</div>
    <div>{date.format('YYYY')}</div>
    <Navigation icon={'>'} onClick={() => handleNavigationClick('forward')} />
  </HeaderContainer>
);

const DaysOfWeek = () => DAYS_OF_WEEK.map((day, i) => <Day key={i}>{day}</Day>);
const EmptyCells = ({ count }) => [...Array(count)].map((_, i) => <Cell key={i} />);
const Days = ({ count }) => [...Array(count)].map((_, i) => <Day key={i}>{i + 1}</Day>);

const Cells = ({ numberOfDaysInMonth, startIdx }) => {
  const maxCellCount = (startIdx >= 5 && numberOfDaysInMonth === 31) ? 42 : 35;
  const remainingCellCount = maxCellCount - (startIdx + numberOfDaysInMonth);
  return (
    <>
      <EmptyCells count={startIdx} />
      <Days count={numberOfDaysInMonth} />
      {remainingCellCount > 0 && <EmptyCells count={remainingCellCount} />}
    </>
  );
};

const Calendar = ({
  date,
  handleNavigationClick,
  numberOfDaysInMonth,
  numberOfEmptyCells,
  startIdx,
}) => (
  <Grid>
    <Header
      date={date}
      handleNavigationClick={handleNavigationClick}
    />
    <DaysOfWeek />
    <Cells
      numberOfDaysInMonth={numberOfDaysInMonth}
      startIdx={startIdx}
    />
  </Grid>
);

function App() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [firstDayOfMonth, setFirstDayOfMonth] = useState('');
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(0);

  useEffect(() => {
    const firstDay = getFirstDay(currentDate);
    setFirstDayOfMonth(firstDay);

    const numberOfDaysInMonth = getNumberOfDaysInMonth(firstDay);
    setNumberOfDaysInMonth(numberOfDaysInMonth);
  }, []);

  const getFirstDay = date => moment(date)
    .startOf('month')
    .format('YYYY-MM-DD hh:mm');

  const getNumberOfDaysInMonth = firstDay => moment(firstDay).daysInMonth();

  const handleNavigationClick = (direction) => {
    if (direction === 'forward') {
      const nextDate = moment(currentDate).add(1, 'M');
      setCurrentDate(nextDate);
      setFirstDayOfMonth(getFirstDay(nextDate));
      setNumberOfDaysInMonth(getNumberOfDaysInMonth(nextDate));
    } else {
      const nextDate = moment(currentDate).subtract(1, 'M');
      setCurrentDate(nextDate);
      setFirstDayOfMonth(getFirstDay(nextDate));
      setNumberOfDaysInMonth(getNumberOfDaysInMonth(nextDate));
    }
  }

  const startIdx = moment(currentDate)
    .startOf('month')
    .day();

  return (
    <Container>
      <Calendar
        date={currentDate}
        handleNavigationClick={handleNavigationClick}
        startIdx={startIdx}
        numberOfDaysInMonth={numberOfDaysInMonth}
      />
    </Container>
  );
}

export default App;

const Container = styled.div`
  padding: 36px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  border: 1px solid red;
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-start: 1;
  grid-column-end: 8;
  justify-content: space-between;
  align-items: center;
  margin: 0 12px;
`;

const Cell = styled.div`
  padding: 24px;
  border: 1px solid;
  background: white;
  text-align: left;
`;
