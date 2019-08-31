import React from 'react';

import {
  Body,
  Close,
  CloseWrapper,
  PopupContainer,
} from './styles';

const POPUP_WIDTH = 400;
const TOP_OFFSET = 36;

const Popup = ({
  children,
  clientRect,
  openId,
  hide,
  id,
  isShowing,
}) => {
  const { left, top, width} = clientRect;
  const calculatedLeft = (Math.floor(left - (width + (POPUP_WIDTH / 2))));
  const calculatedTop = Math.floor(top + TOP_OFFSET);

  return isShowing && (openId === id) ?  (
    <PopupContainer left={calculatedLeft} top={calculatedTop}>
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
};

export default Popup;
