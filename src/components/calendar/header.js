import React from 'react';
import moment from 'moment';
import { ArrowDown, ArrowLeft, ArrowRight, Flex, HeaderWrapper, MonthButtonWrapper, MonthYrLockup, StyledNavigation, TextWrapper } from './styles';
import { Button } from '../shared/button';

const Header = ({ setToday, currentDate, navigate }) => {
  const clickNavigationHandler = (direction) => {
    direction === 'forward' ?
      navigate(moment(currentDate)
        .add(1, 'M')) :
      navigate(moment(currentDate)
        .subtract(1, 'M'));
  }
  const mo = currentDate.format('MMMM');
  const yr = currentDate.format('YYYY');

  return (
    <HeaderWrapper>
      <Flex
        alignItems='center'
        flexBasis='33.3%'
        justifyContent='space-between'
      >
        <TextWrapper
          fontSize='24px'
          margin='0 36px 0 0'
        >
          Clonendar
        </TextWrapper>
        <Button onClick={setToday}>Today</Button>
        <div>
          <StyledNavigation margin='0 0 0 24px' type='button' onClick={() => clickNavigationHandler('back')}>
            <ArrowLeft />
          </StyledNavigation>
          <StyledNavigation margin='0 24px 0 0' type='button' onClick={() => clickNavigationHandler('forward')}>
            <ArrowRight />
          </StyledNavigation>
        </div>
        <MonthYrLockup>
          {mo} {yr}
          <ArrowDown />
        </MonthYrLockup>
      </Flex>
      <MonthButtonWrapper>
        <Button>Month</Button>
      </MonthButtonWrapper>
    </HeaderWrapper>
  );
};

export default Header;
