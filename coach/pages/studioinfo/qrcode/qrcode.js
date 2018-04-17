// qrcode.js
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    platform: "ios"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studio_id = options.studio_id
    this.setData({
      https: app.globalData.imagesurl,
      qrcode: "studioqrcode/studio_" + studio_id + '.png'
    })
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
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          platform: res.platform
        })
      }
    })
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
  previewImage: function (e) {
    var ss = app.globalData.imagesurl + "studioqrcode/studio_" + studio_id + '.png'
    ss = ss.replace("\\", "")
    var sss = []
    sss = sss.concat(ss)
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  }
})