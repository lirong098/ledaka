// pages/studio/studio.js
var app = getApp()
var publicurl = app.globalData.publicurl
var ary = null
Page({
  data: {
    userInfo: {},
    array: {},
    picture: null,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.request({
      url: publicurl + 'index/studio/search?coach_id=' + app.globalData.id,
      success: function (res) {
        // that.globalData.id = res.data
        ary = res.data
        console.log(ary)
        that.setData({
          https: app.globalData.imagesurl,
          array: res.data
        })
      },
    })
    that.setData({
      picture: app.globalData.coach_picture
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // onShareAppMessage: function () {
  //   return {
  //     title: '我的工作室',
  //     path: '/pages/studio/studio?id=123'
  //   }
  // },
  addstudio: function () {
    console.log(ary)
    // if (ary.length > 0) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '目前每位教练只能加入一家工作室，后续版本会开放多个工作室的功能。',
    //     showCancel: false
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '../addstudio/addstudio'
    //   })
    // }
    wx.navigateTo({
      url: '../addstudio/addstudio'
    })
  },
  editstudio: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/studiomanage/info/info?id=' + id
    })
  }

})