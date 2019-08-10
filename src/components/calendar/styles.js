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

const Day = styled.div`
  padding: 6px;
  border: 1px solid ${GREY};
  background: ${({ today }) => today && "palevioletred"};
`;

const Grid = styled.div`
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

const StyledNavigation = styled.button`
  padding: 6px;
  border: none;
  color: #A9A9A9;
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
  StyledNavigation,
  Week,
  Weekday,
  WeekdayHeader,
};

