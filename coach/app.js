//app.js
App({
  onLaunch: function () {
    var that = this
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  onShow: function () {
    var that = this
  },
  globalData: {
    userInfo: null,
    id: null,
    publicurl: 'https://www.daka.com:8088/images/',
    imagesurl: "https://www.daka.com:8088/images/",
  }
})