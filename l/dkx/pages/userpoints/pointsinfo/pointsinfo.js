// pointsinfo.js
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id = 0
var trainee_id = 0
var hasrule = false;
var hasexchange = false;
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
    studio_id = options.id
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowWidth)
        var px = res.windowWidth * 100 / 750;
        that.setData({
          boxheight: (res.windowHeight - px) + "px"
        });
      }
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

    trainee_id = app.globalData.id
    if (trainee_id == null) {
      app.globalData.id = wx.getStorageSync('id')
      trainee_id = app.globalData.id
    }

    wx.request({
      url: publicurl + 'index/Studio/getStudioPoints',
      data: {
        studio_id: studio_id,
        trainee_id: trainee_id
      },
      success: function (res) {
        // success
        // console.log(res.data)
        hasrule = res.data.hasrule;
        hasexchange = res.data.hasexchange;
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
  clickRule: function (e) {
    if (hasrule) {
      wx.navigateTo({
        url: '../rule/rule?id=' + studio_id
      })
    } else {
      wx.showModal({
        title: '提示',
        content: "该工作室尚未设置积分获得规则。",
        showCancel: false
      })
    }
  },
  clickExchange: function (e) {
    if (hasexchange) {
      wx.navigateTo({
        url: '../exchange/exchange?id=' + studio_id
      })
    } else {
      wx.showModal({
        title: '提示',
        content: "该工作室尚未设置积分兑换。",
        showCancel: false
      })
    }
  }
})