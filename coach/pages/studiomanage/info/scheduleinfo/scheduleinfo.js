// pages/studiomanage/info/scheduleinfo/scheduleinfo.js
let app = getApp();
let publicurl = app.globalData.publicurl;
let option = [];
let page = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    schedule_0: [],
    schedule_1: [],
    length_0: 0,
    length_1: 0,
    ShowPage: true,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    option = options;
    page = 1;
    that.scheduleinfo(page, function (list) {
      that.setData({
        schedule_0: list.data.schedule_0,
        schedule_1: list.data.schedule_1
      });
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
    let that = this;
    that.setData({
      length_0: option.count0,
      length_1: option.count1
    });
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
   * 导航事件
   */
  bindTraNavLeft: function () {
    let that = this;
    that.setData({
      ShowPage: true
    });
  },
  bindTraNavRight: function () {
    let that = this;
    that.setData({
      ShowPage: false
    });
  },
  /*滑动加载*/
  loadMore: function () {
    let that = this;
    if (!that.data.hasMore) return;
    that.setData({
      hasMore: false
    });
    let hasMore = false;
    ++page;
    that.scheduleinfo(page, function (list) {
      if (list.data.schedule_0 && list.data.schedule_0.length > 0) {
        that.data.schedule_0.push.apply(that.data.schedule_0, list.data.schedule_0);
        if (list.data.schedule_0.length == 10) {
          hasMore = true;
        }
      }
      if (list.data.schedule_1 && list.data.schedule_1.length > 0) {
        that.data.schedule_1.push.apply(that.data.schedule_1, list.data.schedule_1);
        if (list.data.schedule_1.length == 10) {
          hasMore = true;
        }
      }
      that.setData({
        schedule_0: that.data.schedule_0,
        schedule_1: that.data.schedule_1,
        hasMore: hasMore
      })
    });
  },
  /*网络加载*/
  scheduleinfo: function (pages, fun) { //后台默认一次取10
    let that = this;
    wx.request({
      url: publicurl + 'index/Index/scheduleinfo',
      data: {
        options: option,
        page: pages
      },
      success: function (res) {
        typeof fun == "function" && fun(res);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})