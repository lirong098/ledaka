// pages/addreserprogram/orderlist/orderlist.js
var app = getApp();
var trainee_id;
var publicurl = app.globalData.publicurl;
let studio_id = 0;
Page({
  data: {
    currentTab: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    //更新数据
    trainee_id = options.trainee_id;
    studio_id = options.studio_id;
    that.setData({
      trainee_id: options.trainee_id
    });
  },
  onReady: function () {
    // 页面渲染完成
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var px = res.windowWidth * 100 / 750;
        that.setData({
          boxheight: (res.windowHeight - px) + "px"
        });
      }
    })
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.request({
      url: publicurl + 'index/Seorder/seorderinfo',
      data: {
        coach_id: app.globalData.id,
        trainee_id: trainee_id,
        studio_id: studio_id
      },
      success: function (res) {
        that.setData({
          array: res.data.seorder,
          exchange: res.data.exchange,
          https: app.globalData.imagesurl
        })
      },
      fail: function () {
        // fail
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /*选择会员卡 执行的事件*/
  radioChange: function (e) {
    wx.setStorage({
      key: "card_info",
      data: e.detail.value
    })
    wx.navigateBack({
      delta: 1
    })
  }
})