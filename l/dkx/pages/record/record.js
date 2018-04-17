// pages/recordtext/recordtext.js
var app = getApp()
var publicurl = app.globalData.publicurl
var record_id
var list
Page({
  data: {
    files: [],
    save: '写训练日记',
    recordinfo: [],
    showToast:false,
    addfiles:[],
    style:'',
    studiolist:0 //学员版 从首页或者工作室进来看打卡详情 把按钮隐藏 不能修该
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    record_id = options.record_id;
    var studiolist =0
    studiolist = options.studiolist;
    if (studiolist ==1){
      that.setData({
        style:"margin:0"
      });
    }
    that.setData({
      record_id: record_id,
      url: app.globalData.imagesurl,
      studiolist: studiolist
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.request({
      url: publicurl + 'index/Class_Record/recordtext',
      data: {
        record_id: record_id,
        trainee_id: app.globalData.id
      },
      success: function (res) {
        // success
        that.setData({
          files: res.data.url,
          recordinfo: res.data
        })
        list = res.data.url
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
  previewImage: function (e) {
    var that = this
    var ss = e.currentTarget.id;
    var sss = that.data.files;
    for (var x in sss){
      sss[x] = that.data.url + sss[x];
    }
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  }
})