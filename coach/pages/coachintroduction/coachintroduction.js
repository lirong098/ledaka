// pages/coachintroduction/coachintroduction.js
var app = getApp()
var publicurl = app.globalData.publicurl
var coach_id
var text
var coach_introduction
Page({
  data: {
    coach_introduction: "",
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    coach_id = options.coach_id
    coach_introduction = options.coach_introduction
  },
  onReady: function () {
    // 页面渲染完成
    var that = this
    that.setData({
      coach_introduction: coach_introduction
    })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  formSubmit: function (e) {
    if (text != e.detail.value.name) {
      wx.request({
        url: publicurl + 'index/Coach/updateintroduction',
        data: {
          name: e.detail.value.name,
          coach_id: app.globalData.id
        },
        success: function (res) {
          // success
          if (res.data == 1) {
            wx.showModal({
              title: '提示',
              content: '保存成功。',
              showCancel: false,
              success: function (res) {
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                })
              }
            })
          } else {
            wx.showToast({
              title: '保存失败',
              icon: 'loading',
              duration: 1000
            })
          }
        },
      })
    }
  },
})