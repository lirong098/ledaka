// pages/recordtraineess/recordtraineess.js
var app = getApp()
var publicurl = app.globalData.publicurl
var trainee_id
Page({
  data: {
    target:'',
    situation:'',
    preferences:'',
    other:''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    trainee_id = options.trainee_id
    that.setData({
      trainee_id: trainee_id,
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示 
    var that = this
    wx.request({
      url: publicurl + 'index/Coach_Trainee_Images/selectremark',
      data: {
        trainee_id: trainee_id,
        coach_id: app.globalData.id
      },
      success: function (res) {
       console.log(res.data)
       that.setData({
         target: res.data.target,
         situation: res.data.situation,
         preferences: res.data.preferences,
         other: res.data.other
       })
      },
      fail: function () {
        // fail
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})