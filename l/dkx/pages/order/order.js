// pages/order/order.js
var app = getApp()
var trainee_id
var publicurl = app.globalData.publicurl
Page({
  data: {
    currentTab: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    console.log(app.globalData.id)
    var that = this
    wx.request({
      url: publicurl + 'index/Seorder/getseorderinfo',
      data: {
        trainee_id: app.globalData.id,
      },
      success: function (res) {
        // success
        console.log(res.data)
        that.setData({
          array: res.data.seorder,
          exchange: res.data.exchange,
          https: app.globalData.imagesurl,
          trainee_id: app.globalData.id
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})