export const normalizePos = ({ barSize, indicatorSize, positionInPx }) => {
  let checkPos = positionInPx;
  if (checkPos < 0) {
    checkPos = 0;
  }
  if (checkPos + indicatorSize > barSize) {
    checkPos = barSize - indicatorSize;
  }
  return checkPos / (barSize - indicatorSize);
};

export const getPositionInPx = delta => ({
  barSize,
  indicatorSize,
  position,
}) => cbFn => {
  if ((delta > 0 && position < 1) || (delta < 0) & (position > 0)) {
    const positionInPx = position * (barSize - indicatorSize) + delta;
    cbFn(positionInPx);
  }
};

export const wheelScrollEventHandler = delta => ({
  barSize,
  indicatorSize,
  position,
}) => cbFn => {
  return getPositionInPx(delta)({
    barSize,
    indicatorSize,
    position,
  })(positionInPx =>
    cbFn(normalizePos({ barSize, indicatorSize, positionInPx }))
  );
};
