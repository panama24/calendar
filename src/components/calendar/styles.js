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
  position: relative;
  display: flex;
  flex-direction: column
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${GREY};
`;

const Event = styled.span`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  color: #F3BF16;
  border: 1px solid #F3BF16;
  border-radius: 2px;
  height: 18px;
  width: 96%;
  padding-left: 4px;
`;

const Grid = styled.div`
  color: ${DARK_GREY};
  display: grid;
  background: white;
  border: 1px solid ${GREY};
`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-start: 1;
  grid-column-end: 8;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  color: #3c4043;
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 28px;
  white-space: nowrap;
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
  border-radius: 30px;
  background: ${({ today }) => today ? 'dodgerBlue' : 'white'};
  color: ${({ today }) => today ? "white" : DARK_GREY};

  &:hover {
    background: ${({ today }) => today ? 'dodgerBlue' : '#eee'};
  }
`;

const NumberWrapper = styled.div`
  height: 28px;
`;

const StyledNavigation = styled.button`
  padding: 6px;
  border: none;
  color: ${DARK_GREY};
  cursor: pointer;
  font-size: 24px;

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
  padding: 8px 0;
  border-top: 1px solid ${GREY};
  border-botton: 1px solid ${GREY};
  color: #70757a;
  font-size: 11px;
  font-weight: 500;
  line-height: 20px;
`;

export {
  Day,
  Event,
  Grid,
  HeaderWrapper,
  Number,
  NumberWrapper,
  StyledNavigation,
  Week,
  Weekday,
  WeekdayHeader,
};

