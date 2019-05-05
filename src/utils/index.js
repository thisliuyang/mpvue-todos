function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
// 获取本周 默认第一项为今天 依次往后
export function getWeek (index = 0) {
  const now = new Date()
  const weekData = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const dayLenght = now.getDay() + index
  let len = dayLenght >= weekData.length ? dayLenght % weekData.length : dayLenght
  let week = weekData[len]
  return week
}

/**
* 抓取远端API的结构
* @param  {String} api    api 根地址
* @param  {String} path   请求路径
* @param  {Objece} params 参数
* @return {Promise}       包含抓取任务的Promise
*/
export const fetch = function (url, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}
