function getPreviousSunday(date = new Date()) {
  const previousMonday = new Date();

  previousMonday.setDate(date.getDate() - date.getDay());

  previousMonday.setHours(0, 0, 0, 0);

  return previousMonday;
}

module.exports = getPreviousSunday