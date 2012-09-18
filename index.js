var intervals = {
  WEEK: 604800000,
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000,
  SECOND: 1000
}

var milliseconds = {};

milliseconds.ms = function(str) {
  var date = parseDate(str);
  var ms = 0;
  for (type in date) {
    if (type == 's') ms += date[type] * intervals.SECOND;
    if (type == 'm') ms += date[type] * intervals.MINUTE;
    if (type == 'h') ms += date[type] * intervals.HOUR;
    if (type == 'd') ms += date[type] * intervals.DAY;
    if (type == 'w') ms += date[type] * intervals.WEEK;
  }
  return ms;
}

milliseconds.str = function(ms) {
  var output = [];
  var buf;
  var formatted;
  for (i in intervals) {
    if (ms>=intervals[i] || intervals[i]<=start) {
      buf = Math.floor(ms/intervals[i]);
      formatted = buf+i.substr(0,1).toLowerCase();
      if (ms < intervals[i] && start-ms < intervals[i]) {
        formatted = '<span>'+formatted+'</span>';
      }
      output.push(formatted);
      ms -= buf*intervals[i];
    }
  }
  return output.join('&nbsp;');
}

function parseDate(str) {
  var str = str.replace(/ /g, '');
  
  if (str.search('in') > -1) return parseRelative(str);
  if (str.search(':') > -1) throw 'Absolute date parsing not yet implemented';
  return parseRelative(str);
}

function parseRelative(str) {
  var str = str
    .replace(/in/, '')
    .replace(/weeks|week|wochen|wochen/, 'w')
    .replace(/days|day|tage|tag/, 'd')
    .replace(/hours|hour|stunden|stunde/, 'h')
    .replace(/minutes|minute|mins|min|minuten/, 'm')
    .replace(/seconds|seconds|secs|sec|sekunden|sekunde/, 's')

  var duration = 0;
  var date = {};
  var numBuffer = [];
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) < 97) {
      numBuffer.push(str[i]);
    } else {
      date[str[i]] = parseInt(numBuffer.join(''), 10);
      numBuffer = [];
    };
  }
  return date;
}

module.exports = milliseconds;