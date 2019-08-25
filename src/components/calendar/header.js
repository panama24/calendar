import React from 'react';
import moment from 'moment';
import { HeaderWrapper, StyledNavigation } from './styles';
import { Button } from '../shared/button';

const Header = ({ getToday, currentDate, navigate }) => {
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
      <StyledNavigation type='button' onClick={() => clickNavigationHandler('back')}>
        {'<'}
      </StyledNavigation>
      <Button onClick={getToday}>Today</Button>
      <div>{mo}</div>
      <div>{yr}</div>
      <Button> Month</Button>
      <StyledNavigation type='button' onClick={() => clickNavigationHandler('forward')}>
        {'>'}
      </StyledNavigation>
    </HeaderWrapper>
  );
};

export default Header;
