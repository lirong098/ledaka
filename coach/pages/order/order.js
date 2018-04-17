// pages/order/order.js
var app = getApp()
var trainee_id
var publicurl = app.globalData.publicurl
var isfrom
var studio_id
Page({
  data: {
    currentTab: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    //更新数据
    trainee_id = options.trainee_id
    isfrom = options.from
    studio_id = options.studio_id
    that.setData({
      trainee_id: options.trainee_id
    })
  },
  onReady: function () {
    // 页面渲染完成
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowWidth)
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
    if (isfrom == "studio") {
      console.log(studio_id)
      wx.request({
        url: publicurl + 'index/Seorder/seorderbystudio',
        data: {
          coach_id: app.globalData.id,
          trainee_id: trainee_id,
          studio_id: studio_id
        },
        success: function (res) {
          console.log(res.data)
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
    } else if (isfrom == "coach") {
      wx.request({
        url: publicurl + 'index/Seorder/seorderinfo',
        data: {
          coach_id: app.globalData.id,
          trainee_id: trainee_id
        },
        success: function (res) {
          console.log(res.data)
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
    }
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
  }
})