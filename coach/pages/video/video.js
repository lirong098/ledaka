// video.js
var id = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "http://helpvideo-1253342623.cossh.myqcloud.com/Coach_Init_1.mp4"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
    var title
    switch (id) {
      case '1': {
        title = "1. 教练初始化设置"
        break;
      }
      case '2': {
        title = "2. 添加学员"
        break;
      }
      case '3': {
        title = "3. 教练排课"
        break;
      }
      case '4': {
        title = "4. 学员管理和互动"
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
      case '1': {
        this.setData({
          src: "http://helpvideo-1253342623.cossh.myqcloud.com/Coach_Init_1.mp4"
        })

        break;
      }
      case '2': {
        this.setData({
          src: "http://helpvideo-1253342623.cossh.myqcloud.com/Coach_AddTrainee_2.mp4"
        })
        break;
      }
      case '3': {
        this.setData({
          src: "http://helpvideo-1253342623.cossh.myqcloud.com/Coach_Class_3.mp4"
        })
        break;
      }
      case '4': {
        this.setData({
          src: "http://helpvideo-1253342623.cossh.myqcloud.com/Coach_TraineeManagement_4.mp4"
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