// pages/mycoach/mycoach.js
var app = getApp()
var publicurl = app.globalData.publicurl
var msg
var coach_id
var id
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    msg = options.msg
    console.log(options)
    coach_id = options.coach_id
    id = options.id
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.request
      ({
        url: publicurl + 'index/Coach_Trainee/traineeofcoach',
        data: {
          trainee_id: app.globalData.id,
          msg: msg,
          coach_id: coach_id,
          id: id
        },
        success: function (res) {
          that.setData({
            array: res.data
          })
        },
      })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  radioChange: function (e) {
    //console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (msg == '1') {
      var coach_id = e.detail.value
      wx.request({
        url: publicurl + 'index/Coach_Trainee/updatelastcoach',
        data: {
          coach_id: coach_id,
          trainee_id: app.globalData.id
        },
        success: function (res) {
          // success
          wx.switchTab({
            url: '../reserprogram/reserprogram',
          })
        },
        fail: function () {
          // fail
        }
      })
    }
    if (msg == '2') {
      wx.setStorage({
        key: "laststudio",
        data: e.detail.value
      })
      wx.switchTab({
        url: '../reserprogram/reserprogram',
      })
    }
  }
})