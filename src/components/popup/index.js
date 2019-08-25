import React from 'react';

import {
  Body,
  Close,
  CloseWrapper,
  PopupContainer,
} from './styles';

const Popup = ({ children, hide, id, isShowing }) => isShowing ? (
  <PopupContainer>
    <Body>
      <CloseWrapper>
        <Close type="button" onClick={hide}>
          <span>X</span>
        </Close>
      </CloseWrapper>
      {children}
    </Body>
  </PopupContainer>
) : null;

export default Popup;
