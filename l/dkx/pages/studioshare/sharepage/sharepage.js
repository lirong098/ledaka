// sharepage.js
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id
var trainee_id
var ishare
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
    studio_id = options.studio_id
    trainee_id = options.trainee_id
    ishare = options.ishare
    // studio_id = 1005
    // trainee_id = 1124
    this.setData({
      ishare: ishare,
      trainee_id: trainee_id
    })

    wx.request({
      url: publicurl + 'index/Studio/setActivityOnSharePv',
      data: {
        studio_id: studio_id,
        trainee_id: trainee_id
      },
      success: function (res) {
        // success
        console.log(res.data)
      },
      fail: function (res) {
        // fail
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
    wx.request({
      url: publicurl + 'index/Studio/getActivityOnShare',
      data: {
        studio_id: studio_id,
        trainee_id: trainee_id
      },
      success: function (res) {
        // success
        console.log(res.data)
        that.setData({
          https: app.globalData.imagesurl,
          trainee: res.data.trainee,
          studio: res.data.studio,
          studio_id: studio_id,
          wish: res.data.wish,
          src: 'http://studio-1253342623.cossh.myqcloud.com/' + res.data.studio.video
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
    var that = this;
    return {
      title: that.data.trainee.trainee_name + '邀请你一起锻炼',
      path: '/pages/studioshare/sharepage/sharepage?studio_id=' + studio_id + "&trainee_id=" + trainee_id,
      success: function (res) {
        // 转发成功
        wx.request({
          url: publicurl + 'index/Studio/onShareAppMessage',
          data: {
            studio_id: studio_id,
            trainee_id: trainee_id
          },
          success: function (res) {
            // success
          },
          fail: function (res) {
            // fail
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  joinclass: function () {
    wx.reLaunch({
      url: '/pages/studioshare/workshop/workshop?studio_id=' + studio_id + "&trainee_id=" + trainee_id
    })
  }

})