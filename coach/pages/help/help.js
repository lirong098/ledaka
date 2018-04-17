// help.js
var app = getApp()
var publicurl = app.globalData.publicurl
var order = ['c1', 'c2', 'c3', 'c4']
var notifi_id = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: "",
    url: "https://19622916.ledaka.cn/public/video/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    notifi_id = options.notifi_id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(notifi_id)
    if (notifi_id) {
      wx.request({
        url: publicurl + 'index/Notification/isread',
        data: {
          notifi_id: notifi_id
        },
        success: function (res) {
          // console.log(res)
        },
        fail: function (res) {

        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
  navigateTo: function (e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/video/video?id=' + id
    })
  },
  bindtapTo1: function () {
    this.setData({
      toView: order[0]
    })
  },
  bindtapTo2: function () {
    this.setData({
      toView: order[1]
    })
  },
  bindtapTo3: function () {
    this.setData({
      toView: order[2]
    })
  },
  bindtapTo4: function () {
    this.setData({
      toView: order[3]
    })
  }
})