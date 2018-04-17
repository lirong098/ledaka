// pages/studiomanage/info/priceinfo/priceinfo.js
var app = getApp()
var publicurl = app.globalData.publicurl
Page({
  /**
   * 页面的初始数据
   */
  data: {
    studio_id: 0,//工作室ID
    month: null,//月份
    coach_id: 0, //教练ID
    imgurl: app.globalData.imagesurl //url
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      studio_id: options.studio_id,
      coach_id: options.coach_id,
      month: options.month
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
    var that = this;
    wx.request({
      url: publicurl + 'index/Index/priceinfo',
      data: {
        studio_id: that.data.studio_id,
        month: that.data.month,
        coach_id: that.data.coach_id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          seorder:res.data
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
  onShareAppMessage: function () {

  }
})