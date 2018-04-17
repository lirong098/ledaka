// pages/coachtraineetext/coachtraineetext.js
var app = getApp();
var publicurl = app.globalData.publicurl;
var trainee_id;
var text = '';
var isclick = false
Page({
  data: {
    Ftype: null,
    placeholdertext: '',
    text: '',

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var placeholdertext = '';
    trainee_id = options.trainee_id
    text = options.text;
    that.setData({
      Ftype: options.type,
      placeholdertext: placeholdertext,
    })
  },
  onReady: function () {
    // 页面渲染完成
    var that = this
    that.setData({
      text: text
    })
  },
  onShow: function () {
    // 页面显示
    var that = this
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  formSubmit: function (e) {
    var that = this
    if (that.data.text != e.detail.value.trainee_text) {
      if (!isclick) {
        isclick = true;
        wx.request({
          url: publicurl + 'index/Coach_Trainee_Images/updateremark',
          data: {
            Ftype: that.data.Ftype,
            text: e.detail.value.trainee_text,
            trainee_id: trainee_id,
            coach_id: app.globalData.id
          },
          success: function (res) {
            if (res.data > 0) {
              that.failshow('保存成功', 'success');
              wx.navigateBack({
                delta: 1
              })
            }
            setTimeout(function () {
              isclick = false
            }, 1500)
          },
          fail: function () {
            that.failshow('网络异常', 'loading');
            setTimeout(function () {
              isclick = false
            }, 1500)
          }
        })
      }
    }
    console.log(e.detail.value.trainee_text);
  },
  /*网络异常*/
  failshow: function (toast, msg) {
    wx.showToast({
      title: toast,
      icon: msg,
      duration: 2000
    })
  }
})