function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTimeOnlyDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

function formatTimeOnlyTime(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':')
}

//pick中取到的detail.value格式为“hh:mm”
function formatTimeStrOnlyTime(hourMinute) {
  var hour = hourMinute.split(':')[0]
  var minute = hourMinute.split(':')[1]
  var second = '00'

  return [hour, minute, second].map(formatNumber).join(':')
}

function string2Timestamp(date, time) {
  var stringTime = date + " " + time;
  return new Date(stringTime).getTime();
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTimeOnlyDate: formatTimeOnlyDate,
  formatTimeOnlyTime: formatTimeOnlyTime,
  formatTimeStrOnlyTime: formatTimeStrOnlyTime,
  string2Timestamp: string2Timestamp
}
