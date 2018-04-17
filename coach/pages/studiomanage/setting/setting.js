// setting.js
var studio_id = 0;
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
    studio_id = options.id;
    this.setData({
      studio_id: studio_id
    });
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
  swichNav: function (e) {
    var current = e.currentTarget.dataset.current;
    var url = "";
    if (current == 0) {
      url = "/pages/studiomanage/info/info"
    } else if (current == 1) {
      url = "/pages/studiomanage/member/member"
    } else if (current == 2) {
      url = "/pages/studiomanage/setting/setting"
    } else if (current == 3) {
      url = "/pages/studiomanage/bus/bus"
    }
    wx.redirectTo({
      url: url + "?id=" + studio_id
    })
  }
})