// pages/order/order.js
var app = getApp()
var publicurl = app.globalData.publicurl
Page({
  data: {
    currentTab: 0,
    array:[], //会员卡
    exchange:[],//优惠卡
    https: app.globalData.imagesurl,//服务器图片地址
    trainee_id: app.globalData.id, //学员id
    coach_id:0, //教练id
    studio_id:0
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      coach_id:options.coach_id,
      studio_id:options.studio_id
    })
  },
  onReady: function () {
  },
  onShow: function () {
    var that = this
    wx.request({
      url: publicurl + 'index/Seorder/seorderinfo',
      data: {
        trainee_id: app.globalData.id,
        coach_id:that.data.coach_id,
        studio_id:that.data.studio_id
      },
      success: function (res) {
        console.log(res.data.seorder);
        that.setData({
          array: res.data.seorder,
          exchange: res.data.exchange
        })
      },
    })
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
  /**/
  radioChange:function(e){
    wx.setStorage({
      key: "card_info",
      data: e.detail.value
    })
    wx.navigateBack({
      delta: 1
    })
  }
})