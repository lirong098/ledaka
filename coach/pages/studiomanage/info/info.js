// info.js
var studio_id = 0;
var app = getApp()
var publicurl = app.globalData.publicurl
var month = 0
var newmonth = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    studio_id: 0,//工作室ID
    studio_max0: 0,//工作室总上私教课
    studio_max1: 0,//工作室总上团课
    studio_qty: 0,//工作室上课学员
    studio_new_qty: 0,//工作室新增学员
    studio_ord_qty: 0, //工作室续课学员
    coach_data: [],    //教练数据
    month: null,//月份
    int_month: '' //月份
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studio_id = options.id;
    month = 0;
    var that = this
    that.setData({
      studio_id: studio_id
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
    that.studio_report(month, studio_id);
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
  },
  /*上月*/
  bindtopmonth: function () {
    var that = this
    if (month != 0) {
      var hello = month.split("-");
      if (hello['1'] == '01') {
        hello['0'] = hello['0'] - 1
        hello['1'] = 12
        month = hello.join("-")
      } else {
        hello['1'] = hello['1'] - 1
        if (hello['1'] <= 9) {
          hello['1'] = '0' + hello['1']
        }
        month = hello.join("-")
      }
    }
    that.studio_report(month, studio_id);
  },
  /*下月*/
  bindbottommonth: function () {
    var that = this
    if (month != 0) {
      var hello = month.split("-");
      if (hello['1'] == '12') {
        hello['0'] = ++hello['0']
        hello['1'] = '01'
        month = hello.join("-")
      } else {
        hello['1'] = ++hello['1']
        if (hello['1'] <= 9) {
          hello['1'] = '0' + hello['1']
        }
        month = hello.join("-")
      }
    }
    that.studio_report(month, studio_id);
  },
  /*数据请求*/
  studio_report: function (Fmonth, Fstudio_id) {
    var that = this
    wx.request({
      url: publicurl + 'index/Index/studio_report',
      data: {
        month: Fmonth,
        studio_id: Fstudio_id
      },
      success: function (res) {
        month = res.data.v;
        var hello = month.split("-");
        that.setData({
          studio_max0: res.data.studio_max0,
          studio_max1: res.data.studio_max1,
          studio_qty: res.data.studio_qty,
          studio_new_qty: res.data.studio_new_qty,
          studio_ord_qty: res.data.studio_ord_qty,
          studio_price: res.data.studio_price,
          coach_data: res.data.coach_data,
          int_month: parseInt(hello['1']),
          month: res.data.v
        })
      }
    })
  }
})