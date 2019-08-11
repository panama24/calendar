import React from 'react';
import ReactDOM from 'react-dom';

import {
  Body,
  Close,
  CloseWrapper,
  ModalContainer,
} from './styles';

const Modal = ({ children, hide, isShowing }) => isShowing ? ReactDOM.createPortal(
  <ModalContainer>
    <Body>
      <CloseWrapper>
        <Close type="button" onClick={hide}>
          <span>X</span>
        </Close>
      </CloseWrapper>
      {children}
    </Body>
  </ModalContainer>, document.body
) : null;

export default Modal;
