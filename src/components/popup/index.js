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
  dayIdx: colIdx,
  hide,
  id,
  isShowing,
  openId,
}) => {
  const { left, right, top, width} = clientRect;
  const calculatedLeft = (colIdx === 0 || colIdx === 1) ?
    Math.ceil(right) :
    // left begins at 1, so alignment is off
    (Math.ceil((left - 1) - (width + (POPUP_WIDTH / 2))));

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
