export const calculatePosition = ({
  clientRect,
  colIdx,
  popupWidth,
  topOffset,
}) => {
  const {
    left: clientRectLeft,
    right: clientRectRight,
    top: clientRectTop,
    width: parentWidth,
  } = clientRect;

  const calculateLeft = (colIdx === 0 || colIdx === 1) ?
    Math.ceil(clientRectRight) :
    // left begins at 1, so alignment is off
    (Math.ceil((clientRectLeft - 1) - (parentWidth + (popupWidth / 2))));

  const calculateTop = Math.floor(clientRectTop + topOffset);

  return {
    left: calculateLeft,
    top: calculateTop,
  }
};
