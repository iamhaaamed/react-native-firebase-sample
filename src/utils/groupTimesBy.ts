import dayjs from 'dayjs';

const groupTimesBy = (
  array: any[],
  unit = 'day',
  timeParamName = 'createdAt',
) => {
  const toReturn = {};

  for (const listItem of array) {
    const paramName = dayjs(listItem[timeParamName])
      .startOf(unit)
      .format('DD/MM');
    if (toReturn[paramName] == null) {
      toReturn[paramName] = [];
    }
    toReturn[paramName].push(listItem);
  }

  return toReturn;
};

export default groupTimesBy;
