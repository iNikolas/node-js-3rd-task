const CATEGORIES = require("./../repositories/constants");

function calculateStatistic(tableValues, archivedValues) {
  const statisticValues = {};
  CATEGORIES.forEach((category) => {
    let mainCounter = 0;
    let archiveCounter = 0;
    tableValues.forEach((value) => {
      if (value.category === category) mainCounter++;
    });
    archivedValues.forEach((value) => {
      if (value.category === category) archiveCounter++;
    });
    if (mainCounter | archiveCounter)
      statisticValues[category] = { mainCounter, archiveCounter };
  });
  return statisticValues;
}

module.exports = calculateStatistic;
