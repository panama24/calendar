const generateWeeksArray = (numberOfDaysInMonth, startIdx) => {
  const maxCellCount = (startIdx >= 5 && numberOfDaysInMonth === 31) ? 42 : 35;
  const numberOfWeeks = maxCellCount / 7;

  const firstWeekEmptyCells = [...Array(startIdx)].fill('');
  const firstWeekDays = [...Array(7 - startIdx)].map((_, i) => i + 1);
  const firstWeek = firstWeekEmptyCells.concat(firstWeekDays);

  const getNextStartIdx = previousWeek => previousWeek[previousWeek.length - 1];

  const generateRemainingWeeks = (startIdx) => {
    const numberOfRemainingWeeks = numberOfWeeks - 1;
    let nextIdx = startIdx;
    let weeks = [];

    for (var i = 1; i <= numberOfRemainingWeeks; i++) {
      let week = [];

      for (var j = 1; j <= 7; j++) {
        if (nextIdx + j > numberOfDaysInMonth) {
          week.push('');
        } else {
          week.push(nextIdx + j);
        }
      }

      weeks.push(week);
      nextIdx += 7
    };

    return weeks;
  };

  const nextIdxAfterFirstWeek = getNextStartIdx(firstWeek);
  const remainingWeeks = generateRemainingWeeks(nextIdxAfterFirstWeek);
  const weeksArray = [firstWeek].concat(remainingWeeks);

  return weeksArray;
};

export { generateWeeksArray };

