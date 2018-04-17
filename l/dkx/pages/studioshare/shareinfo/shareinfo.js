// shareinfo.js
var GetuserInfo = require('../../../utils/GetuserInfo.js')
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id
var studioname
var name
var isfrom
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
    console.log(options)
    studio_id = options.id
    isfrom = options.isfrom
    this.setData({
      isfrom: isfrom
    })

    var trainee_id = wx.getStorageSync('id')

    // 没有缓存就获取授权
    if (!trainee_id) {
      GetuserInfo.login(app.globalData.publicurl);
    }
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
    var trainee_id = wx.getStorageSync('id')

    wx.request({
      url: publicurl + 'index/Studio/getActivity',
      data: {
        studio_id: studio_id,
        trainee_id: trainee_id
      },
      success: function (res) {
        // success
        console.log(res.data)
        name = res.data.name
        studioname = res.data.studioname
        that.setData({
          https: app.globalData.imagesurl,
          info: res.data.info,
          source: res.data.info.logo,
          studioname: res.data.studioname
        })
      },
      fail: function (res) {
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
  onShareAppMessage: function () {
    var that = this
    var trainee_id = wx.getStorageSync('id');

    // if (isfrom == 'coach') {
    return {
      title: studioname + '的优惠活动',
      path: '/pages/studioshare/shareinfo/shareinfo?id=' + studio_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
    // } else {
    //   return {
    //     title: name + '邀请你一起锻炼',
    //     path: '/pages/studioshare/sharepage/sharepage?studio_id=' + studio_id + "&trainee_id=" + trainee_id + '&wish=' + wish,
    //     success: function (res) {
    //       // 转发成功
    //       wx.request({
    //         url: publicurl + 'index/Studio/onShareAppMessage',
    //         data: {
    //           studio_id: studio_id,
    //           trainee_id: trainee_id
    //         },
    //         success: function (res) {
    //           // success
    //           console.log(res.data)
    //         },
    //         fail: function (res) {
    //           // fail
    //         }
    //       })
    //     },
    //     fail: function (res) {
    //       // 转发失败
    //     }
    //   }
    // }
  },
  bindblur: function (e) {
    // wish = e.detail.value
  },
  clicksure: function (e) {
    var trainee_id = wx.getStorageSync('id');

    wx.navigateTo({
      url: '/pages/studioshare/sharepage/sharepage?studio_id=' + studio_id + "&trainee_id=" + trainee_id + '&ishare=1'
    })
  }

})