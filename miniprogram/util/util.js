function getDateDiff(dateStr) {
  var publishTime = dateStr / 1000,
    d_seconds,
    d_minutes,
    d_hours,
    d_days,
    timeNow = parseInt(new Date().getTime() / 1000),
    d,

    date = new Date(publishTime * 1000),
    Y = date.getFullYear(),
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  //小于10的在前面补0
  if (M < 10) {
    M = '0' + M;
  }
  if (D < 10) {
    D = '0' + D;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }

  d = timeNow - publishTime;
  d_days = parseInt(d / 86400);
  d_hours = parseInt(d / 3600);
  d_minutes = parseInt(d / 60);
  d_seconds = parseInt(d);

  if (d_days > 0 && d_days < 3) {
    return d_days + '天前';
  } else if (d_days <= 0 && d_hours > 0) {
    return d_hours + '小时前';
  } else if (d_hours <= 0 && d_minutes > 0) {
    return d_minutes + '分钟前';
  } else if (d_seconds < 60) {
    if (d_seconds <= 0) {
      return '刚刚';
    } else {
      return d_seconds + '秒前';
    }
  } else if (d_days >= 3 && d_days < 30) {
    return M + '-' + D + ' ' + H + ':' + m;
  } else if (d_days >= 30) {
    return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
  }
}　
function moneyFormatter(val) {
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  var str = (val / 100).toFixed(2) + '';
  var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
  var dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
  var ret = intSum + dot;
  return ret;
}

function formatPrice(price){
  return parseFloat(Math.round(price * 100) / 100).toFixed(2)
}
function getUserInfo() {
  return new Promise((resolve, reject) => {
    this.isAuthenticated().then(() => {
      wx.getUserInfo({
        success(res) {
          const userInfo = res.userInfo
          resolve(userInfo)
        }
      })
    }).catch(() => {
      reject()
    });
  })
}
function isAuthenticated() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] === true) {
          resolve()
        } else {
          reject()
        }
      }
    })
  })
}

function formatTime(time, reg) {
  const date = typeof time === 'string' || typeof time === 'number' ? new Date(time) : time;
  const map = {};
  map.yyyy = date.getFullYear();
  map.yy = ('' + map.yyyy).substr(2);
  map.M = date.getMonth() + 1
  map.MM = (map.M < 10 ? '0' : '') + map.M;
  map.d = date.getDate();
  map.dd = (map.d < 10 ? '0' : '') + map.d;
  map.H = date.getHours();
  map.HH = (map.H < 10 ? '0' : '') + map.H;
  map.m = date.getMinutes();
  map.mm = (map.m < 10 ? '0' : '') + map.m;
  map.s = date.getSeconds();
  map.ss = (map.s < 10 ? '0' : '') + map.s;

  return reg.replace(/\byyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s\b/g, $1 => {
    return map[$1];
  });
}

function getId() {
  return Math.floor((1 + Math.random()) * 0x100000000).toString(16).slice(1)
}

module.exports = {
  getDateDiff,
  moneyFormatter,
  formatPrice,
  getUserInfo,
  isAuthenticated,
  formatTime,
  getId
}