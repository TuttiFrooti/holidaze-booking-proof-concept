import moment from 'moment';

export default function getNights(date) {
  console.log(date)
  const fromDate = moment(date[0]);
  const toDate = moment(date[1]);
  return toDate.diff(fromDate, 'days');
}