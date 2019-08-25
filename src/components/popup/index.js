import React from 'react';
import ReactDOM from 'react-dom';

import {
  Body,
  Close,
  CloseWrapper,
  PopupContainer,
} from './styles';

const Popup = ({ children, hide, isShowing }) => isShowing ? ReactDOM.createPortal(
  <PopupContainer>
    <Body>
      <CloseWrapper>
        <Close type="button" onClick={hide}>
          <span>X</span>
        </Close>
      </CloseWrapper>
      {children}
    </Body>
  </PopupContainer>, document.body
) : null;

export default Popup;
