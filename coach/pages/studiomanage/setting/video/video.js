// video.js
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studio_id = options.studio_id
    var that = this

    // studio_id = 1005
    wx.request({
      url: publicurl + 'index/Studio/getStudioVideo',
      data: {
        studio_id: studio_id
      },
      success: function (res) {
        // success
        console.log(res.data)
        that.setData({
          src: 'http://studio-1253342623.cossh.myqcloud.com/' + res.data.video
        })
      },
      fail: function () {
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
  upload: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          hidden: false
        })
        var tempFilePath = res.tempFilePath

        wx.uploadFile({
          url: publicurl + 'index/uploadfile/uploadvideo', //仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: 'file',
          formData: {
            'studio_id': studio_id
          },
          success: function (res) {
            console.log(res.data)
            var data = res.data
            that.setData({
              src: tempFilePath,
              hidden: true
              // src: app.globalData.imagesurl + 'video/' + data
            })
          }
        })
      }
    })
  }
})