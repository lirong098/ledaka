// userpoints.js
var app = getApp()
var publicurl = app.globalData.publicurl
var list
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.request({
      //将获取的用户的openID 存入数据库 并返回此用户内码。
      url: publicurl + 'index/Trainee/studioPoints?trainee_id=' + app.globalData.id,
      success: function (res) {
        list = res.data
        // console.log(list)
        that.setData({
          https: app.globalData.imagesurl,
          array: res.data
        })
      },
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
  // onPullDownRefresh: function () {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})