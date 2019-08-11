import styled from 'styled-components';

const size = {
  small: '320px',
  medium: '768px',
  large: '1024px'
};

const device = {
  small: `(min-width: ${size.small})`,
  medium: `(min-width: ${size.medium})`,
  large: `(min-width: ${size.large})`,
};

const GREY = '#E8E8E8';
const DARK_GREY = '#696969';

const Day = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid ${GREY};
`;

const Grid = styled.div`
  color: ${DARK_GREY};
  display: grid;
  background: white;
  border: 1px solid ${GREY};
`;

const Header = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-start: 1;
  grid-column-end: 8;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  font-weight: bold;
  font-size: 24px;
`;

const Number = styled.span`
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  margin-top: 4px;
  display: block;
  height: 24px;
  width: 24px;
  line-height: 24px;
  border-radius: 30px; /* or 50% */
  background-color: #eee;
  background: ${({ today }) => today && "dodgerBlue"};
  color: ${({ today }) => today ? "white" : DARK_GREY};
`;

const StyledNavigation = styled.button`
  padding: 6px;
  border: none;
  color: ${DARK_GREY};
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;

  &:focus {
    outline: none;
  }
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-flow: dense;
  height: 80px;

  @media ${device.medium} {
    height: 160px;
  }

  @media ${device.large} {
    height: 180px;
  }
`;

const Weekday = styled.div`
  padding: 5px;
`;

const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  padding: 8px 0;
  border-top: 1px solid ${GREY};
  border-botton: 1px solid ${GREY};
`;

export {
  Day,
  Grid,
  Header,
  Number,
  StyledNavigation,
  Week,
  Weekday,
  WeekdayHeader,
};

