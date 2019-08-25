import React from 'react';

import {
  Body,
  Close,
  CloseWrapper,
  PopupContainer,
} from './styles';

const Popup = ({
  children,
  openId,
  hide,
  id,
  isShowing,
}) => isShowing && (openId === id) ?  (
  <PopupContainer>
    <Body>
      <CloseWrapper>
        <Close type="button" onClick={hide}>
          <span>X</span>
        </Close>
      </CloseWrapper>
      {children}
      ID: {id}
      {openId}
    </Body>
  </PopupContainer>
) : null;

export default Popup;
