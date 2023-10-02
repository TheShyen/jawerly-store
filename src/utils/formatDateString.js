export default function formatDateString(dateString) {
  let dateObject = new Date(dateString);
  function addLeadingZero(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  return addLeadingZero(dateObject.getDate()) + '.' +
    addLeadingZero(dateObject.getMonth() + 1) + '.' +
    dateObject.getFullYear() + ', ' +
    addLeadingZero(dateObject.getHours()) + ':' +
    addLeadingZero(dateObject.getMinutes());
}