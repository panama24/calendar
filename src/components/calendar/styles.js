import styled from 'styled-components';
import { DARK_GREY, GREY, HOVER_GREY, PRIMARY_BLUE, WHITE } from '../../constants/colors';

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
  border-radius: 2px;
  height: 18px;
  width: 96%;
  padding-left: 4px;
  cursor: pointer;
  text-overflow: clip;
  overflow: hidden;
  margin-bottom: 2px;
  box-shadow: ${({ boxShadow }) => boxShadow};
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};

  &:hover {
    background: ${({ hoverBgColor }) => hoverBgColor};
    color: ${({ hoverColor }) => hoverColor};
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-basis: ${({ flexBasis }) => flexBasis};
`;

const MonthButtonWrapper = styled.div`
  display: flex;
  flex-basis: 66.6%;
  justify-content: flex-end;
`;

const MonthYrLockup = styled.div`
  display: flex;
  align-items: center;
  width: 190px;
  border-radius: 3px;
  padding: 0 8px;

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${HOVER_GREY};
    border-radius: 3px;
    padding: 0 8px;
    cursor: pointer;
  }
`;

const Grid = styled.div`
  color: ${DARK_GREY};
  display: grid;
  background: white;
  border: 1px solid ${GREY};
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  color: ${DARK_GREY};
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
  background: ${({ today }) => today ? PRIMARY_BLUE : WHITE};
  color: ${({ today }) => today ?  WHITE : DARK_GREY};

  &:hover {
    background: ${({ today }) => today ? PRIMARY_BLUE : HOVER_GREY};
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
  margin: ${({ margin }) => margin && margin};

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

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: 8px 0;
  border-top: 1px solid ${GREY};
  border-botton: 1px solid ${GREY};
  color: ${DARK_GREY};
  font-size: 11px;
  font-weight: 500;
  line-height: 20px;
`;

const TooltipWrapper = styled.div`
  position: absolute;
  left: 24px;
  top: 24px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.42857143;
  text-align: left;
  text-align: start;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 12px;
  display: inline-block;
  background: ${WHITE};
  border-radius: 5px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  z-index: 2;
  width: 416px;
  padding: 12px;
`;

const Action = styled.span`
  margin-left: 6px;
  cursor: pointer;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ViewEventBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -18px;
  width: 90%;
`;

const EventIcon = styled.span`
  height: ${({ size }) => size ? size : '10px'};
  width: ${({ size }) => size ? size : '10px'};
  background-color: ${({ color }) => color};
  border-radius: ${({ radius }) => radius ? radius : '50%'};
  display: inline-block;
  margin: ${({ margin }) => margin && margin};
`

const EventLockup = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 8px;
`;

const TextWrapper = styled.span`
  margin: ${({ margin }) => margin ? margin : '0'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '12px'};
`;

const IconWrapper = styled.div`
`;

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid ${DARK_GREY};
  margin-left: 12px;
`;

const ArrowLeft = styled.div`
  border: solid ${DARK_GREY};
  border-width: 0 2px 2px 0;
  transform: rotate(135deg);
  padding: 3px;
`;

const ArrowRight = styled.div`
  border: solid ${DARK_GREY};
  border-width: 0 2px 2px 0;
  transform: rotate(-45deg);
  padding: 3px;
`;

const Spacer = styled.div`
  margin: ${({ margin }) => margin ? margin : '0'};
`;

const Line = styled.div`
  width: ${({ width }) => width ? width : '12px'};
  height: ${({ height }) => height ? height : '2px'};
  background: ${DARK_GREY};
  margin: 4px 0;
`;

export {
  Action,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Day,
  Event,
  EventIcon,
  EventLockup,
  Flex,
  Grid,
  HeaderWrapper,
  IconWrapper,
  Line,
  MonthButtonWrapper,
  MonthYrLockup,
  Number,
  NumberWrapper,
  Spacer,
  StyledNavigation,
  TextWrapper,
  Toolbar,
  TooltipWrapper,
  ViewEventBody,
  Week,
  Weekday,
  Weekdays,
};

