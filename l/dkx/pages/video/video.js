// video.js
var id = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "http://helpvideo-1253342623.cossh.myqcloud.com/Trainee_Init_5.mp4"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
    var title
    switch (id) {
      case '5': {
        title = "1. 学员初始化设置"
        break;
      }
      case '6': {
        title = "2. 学员约课"
        break;
      }
      case '7': {
        title = "3. 学员打卡"
        break;
      }
      default: {
        title = "使用帮助"
      }
    }
    wx.setNavigationBarTitle({
      title: title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    switch (id) {
      case '5': {
        this.setData({
          src: "http://helpvideo-1253342623.cossh.myqcloud.com/Trainee_Init_5.mp4"
        })
        break;
      }
      case '6': {
        this.setData({
          src: "http://helpvideo-1253342623.cossh.myqcloud.com/Trainee_Class_6.mp4"
        })
        break;
      }
      case '7': {
        this.setData({
          src: "http://helpvideo-1253342623.cossh.myqcloud.com/Trainee_Check_7.mp4"
        })
        break;
      }
    }
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