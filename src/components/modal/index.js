import React from 'react';
import ReactDOM from 'react-dom';

import {
  Body,
  Close,
  CloseWrapper,
  Form,
  ModalContainer,
} from './styles';

const Modal = ({ content, hide, isShowing }) => isShowing ? ReactDOM.createPortal(
  <ModalContainer>
    <Body>
      <CloseWrapper>
        <Close type="button" onClick={hide}>
          <span>X</span>
        </Close>
      </CloseWrapper>
      <Form>
        {content}
      </Form>
    </Body>
  </ModalContainer>
  , document.body
) : null;

export default Modal;
