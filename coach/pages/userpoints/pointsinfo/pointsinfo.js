// pointsinfo.js
var app = getApp()
var publicurl = app.globalData.publicurl
var coach_id = 0
var trainee_id = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    trainee_id = options.trainee_id
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

    coach_id = app.globalData.id
    if (coach_id == null) {
      app.globalData.id = wx.getStorageSync('id')
      coach_id = app.globalData.id
    }

    wx.request({
      url: publicurl + 'index/Studio/getPointsByCoach',
      data: {
        coach_id: coach_id,
        trainee_id: trainee_id
      },
      success: function (res) {
        // success
        // console.log(res.data)
        that.setData({
          https: app.globalData.imagesurl,
          studioinfo: res.data.studioinfo,
          points: res.data.points,
          get_points: "+ " + res.data.getTotal,
          cost_points: "- " + res.data.costTotal,
          getlist: res.data.getlist,
          costlist: res.data.costlist
        })
      },
      fail: function () {
        // fail
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

  previewImage: function (e) {
    var ss = e.currentTarget.dataset.url
    ss = ss.replace("\\", "")
    var sss = []
    sss.push(ss)
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  use: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: publicurl + 'index/Studio/useExchange',
      data: {
        coach_id: coach_id,
        trainee_id: trainee_id,
        log_id: id
      },
      success: function (res) {
        // success
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1,
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