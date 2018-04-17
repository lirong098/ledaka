// pages/addprogram/addprogram.js
var app = getApp()
var publicurl = app.globalData.publicurl
var program_id
var files = []
var images = ""
var images_length = 0
Page({
  data: {
    source: "",
    files: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    program_id = options.program_id
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    if (program_id > 0) {
      var that = this
      wx.request({
        url: publicurl + 'index/Program/selectname',
        data: {
          program_id: program_id
        },
        success: function (res) {
          // success
          // console.log(res.data)
          images = res.data.images;
          if (images != "" && images != null) {
            files = images.split(";")
          }
          images_length = files.length;
          that.setData({
            https: app.globalData.imagesurl,
            program: res.data,
            source: res.data.logo,
            files: files
          })
        },
        fail: function (res) {
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
  previewImage: function (e) {
    // console.log()
    var ss = e.currentTarget.id
    ss = ss.replace("\\", "")
    var sss = []
    console.log(ss)
    sss = sss.concat(ss)
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  }





})