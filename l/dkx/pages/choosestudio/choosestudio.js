// choosestudio.js
var app = getApp()
var publicurl = app.globalData.publicurl
var coach_id
var trainee_id
var studio_id
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studio_id = 0
    coach_id = options.coach_id
    trainee_id = options.trainee_id
    // coach_id = 1050
    // trainee_id = 1124
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
      url: publicurl + 'index/Coach/get_coach_studio_list',
      data: {
        coach_id: coach_id
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          array: res.data,
          https: app.globalData.imagesurl
        })
        wx.showModal({
          title: '提示',
          content: '该教练有多个工作室，请选择要加入的工作室。',
          showCancel: false
        })
      },
      fail: function () {
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
  // onShareAppMessage: function () {
  // }
  radioChange: function (e) {
    studio_id = e.detail.value
  },
  sure: function () {
    if (studio_id == 0) {
      wx.showModal({
        title: '提前',
        content: '请选择要加入的工作室。',
        showCancel: false
      })
      return;
    }
    wx.request({
      url: publicurl + 'index/Coach/addcoachwithstudio',
      data: {
        coach_id: coach_id,
        trainee_id: trainee_id,
        studio_id: studio_id
      },
      success: function (res) {
        // success
        wx.showModal({
          title: '提示',
          content: res.data.text,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          }
        })
      },
      fail: function () {
        // fail
      }
    })
  }
})