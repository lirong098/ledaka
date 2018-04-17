// pages/motorgroup/traineerecord/traineerecord.js
var app = getApp()
var publicurl = app.globalData.publicurl
var trainee_id
var page = 1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasMore:true
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
    var qty = page * 10
    wx.request({
      url: publicurl + 'index/Mysuccess/index',
      data: {
        trainee_id: trainee_id,
        page: page,
        qty: qty,
        msg:2
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          recordlist: res.data.recordarray,
          url: app.globalData.imagesurl,
          trainee_info: res.data.trainee_info
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
  onShareAppMessage: function () {
  
  },
  loadMore: function () {
    var that = this
    if (!that.data.hasMore) return
    ++page
    wx.request({
      url: publicurl + 'index/Mysuccess/index',
      data: {
        trainee_id: trainee_id,
        page: page,
        qty: 10,
        msg:2
      },
      success: function (res) {
        if (res.data.recordarray && res.data.recordarray.length > 0) {
          that.data.recordlist.push.apply(that.data.recordlist, res.data.recordarray)
        }
        if (res.data.recordarray.length < 5) {
          that.setData
            ({
              hasMore: false
            })
        }
        that.setData
          ({
            recordlist: that.data.recordlist,
          })
      },
      fail: function () {
      }
    })
  }
})