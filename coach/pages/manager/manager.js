// pages/manager/manager.js
//获取应用实例
var traineelist = require('../../utils/traineelist/traineelist.js');
var app = getApp();
var publicurl = app.globalData.publicurl;
var array;
Page({
  data: {
    grouparray:[],
    show:true,
    inputShowed: false,//搜索
    inputVal: "",//搜索
    inputshow: true, //搜索
    ShowNav:true
  },
  onShow: function () {
    // 页面显示
    var that = this
    traineelist.request(publicurl, app.globalData.id, function (list) {
      array = list.data;
      that.up_data(array);
    });
  },
  bindiconchange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    traineelist.iconchange(array, index, that.up_data);
  },
  bindmaxchange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    traineelist.maxchange(array, index,that.up_data);
  },
  //更新页面数据
  up_data: function (obj) {
    var that = this
    that.setData({
      grouparray: obj
    })
    console.log(that.data.grouparray)
  },
  //搜索
  showInput: function () {
    this.setData({
      inputShowed: true,
      ShowNav: false
    });

  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      inputshow: true,
      ShowNav: true
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var that = this
    if (e.detail.value == '' || e.detail.value == null) return;
    wx.request({
      url: publicurl + 'index/Coach_Trainee/select_trainee_name',
      data: {
        trainee_name: e.detail.value,
        coach_id: app.globalData.id
      },
      success: function (res) {
        that.setData({
          inputshow: false,
          trainee_array: res.data
        })
        console.log(res.data);
      }
    })
    that.setData({
      inputVal: e.detail.value,
    });
  },
  addtrainee: function () {
    try {
      wx.navigateToMiniProgram({
        // appId: 'wxc335fc380a8f0e0e',
        appId: 'wx68c41ab02c9b0346',
        path: 'pages/mycoachinfo/mycoachinfo?isfrom=coach&coach_id=' + app.globalData.id,
        extraData: {
        },
        //envVersion: 'develop',
        envVersion: 'release',
        success(res) {
          // 打开成功
        },
        fail(res) {
          wx.showModal({
            title: '提示',
            content: '你的微信版本过低，请升级到最新微信版本后重试。',
            showCancel: false
          })
        }
      })
    } catch (e) {
      wx.showModal({
        title: '提示',
        content: '你的微信版本过低，请升级到最新微信版本后重试。',
        showCancel: false
      })
    }
  }
})