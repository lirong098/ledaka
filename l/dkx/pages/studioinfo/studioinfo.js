// pages/studioinfo/studioinfo.js
var GetuserInfo = require('../../utils/GetuserInfo.js');
let studio_notice = require('../../utils/studio_notice/studio_notice.js');
var app = getApp();
var publicurl = app.globalData.publicurl;
var studio_id;
var trainee_id;
var notifi_id;
var name = "";
var studio_name = "";
var phone = "";
var images = '';
var files = [];
var thatOptions;
var optionsType = "";
let page = 1;
let qty = 10;
var ishare;
var fromid;
var isfrom;
Page({
  data: {
    currentTab: 0,
    ismystudio: 0,
    recordlist: [], //学员打卡数据
    url: app.globalData.imagesurl,
    background_color: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    thatOptions = options
    studio_id = options.id
    notifi_id = options.notifi_id
    if (!notifi_id) {
      notifi_id = 0;
    }
    if (options.onShareAppMessage != undefined) {
      optionsType = options.onShareAppMessage
    } else {
      optionsType = ""
    }
    ishare = options.ishare;
    fromid = options.fromid;
    isfrom = options.isfrom;

    if (isfrom == "qrcode") {
      fromid = 0
    }

    this.setData({
      ishare: ishare
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this

    trainee_id = app.globalData.id
    if (trainee_id == null) {
      app.globalData.id = wx.getStorageSync('id')
      trainee_id = app.globalData.id
    }

    wx.request({
      url: publicurl + 'index/Studio/getInfoByTrainee',
      data: {
        studio_id: studio_id,
        trainee_id: trainee_id,
        notifi_id: notifi_id
      },
      success: function (res) {
        // success
        console.log(res.data)
        files = [];
        images = res.data.studioinfo.images;
        if (images != "" && images != null) {
          files = images.split(";")
        }
        phone = res.data.studioinfo.phone
        name = res.data.name
        studio_name = res.data.studioinfo.studio_name
        that.setData({
          https: app.globalData.imagesurl,
          studioinfo: res.data.studioinfo,
          count: res.data.count,
          coachinfo: res.data.coachinfo,
          files: files,
          ismystudio: res.data.ismystudio,
          studio_id: studio_id
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
  onShareAppMessage: function () {
    return {
      title: name + '邀请你加入工作室',
      path: '/pages/studioinfo/studioinfo?id=' + studio_id + '&onShareAppMessage=studioinfo',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  calling: function () {
    if (phone != "") {
      wx.makePhoneCall({
        phoneNumber: phone,
        success: function () {
          // console.log("拨打电话成功！")
        },
        fail: function () {
          // console.log("拨打电话失败！")
        }
      })
    }
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    let that = this;
    console.log(e.currentTarget.dataset.current);
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current,
        background_color: ""
      })
      if (e.currentTarget.dataset.current == 2) {
        studio_notice.studio_notice(publicurl, studio_id, page, qty, function (list) {
          console.log('222');
          console.log(list.data);
          that.setData({
            recordlist: list.data,
            background_color: "background-color:#ebeff3;"
          });
        });
      }

    }
  },
  previewImage: function (e) {
    var ss = e.currentTarget.id
    ss = ss.replace("\\", "")
    var sss = []
    for (var i = 0; i < files.length; i++) {
      var tmp = files[i];
      tmp = app.globalData.imagesurl + tmp.replace("\\", "")
      sss.push(tmp)
    }
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  },
  bindonShare: function () {
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter()
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试，或请点击右上角的三个点，选择“转发”发送给朋友。'
      })
    }
  },
  joinstudio: function () {
    var that = this;
    // 新用户
    var result = {}
    if (app.globalData.id == null) {
      GetuserInfo.login(app.globalData.publicurl);
    }

    wx.request({
      url: publicurl + 'index/Studio/joinStudioByTrainee',
      data: {
        studio_id: studio_id,
        trainee_id: trainee_id
      },
      success: function (res) {
        // success
        // console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            ismystudio: 1
          })
          wx.showModal({
            title: '提示',
            content: "你已成功添加“" + studio_name + "” 工作室，请进入“我”->“工作室”中查看。",
            showCancel: false,
            success: function (res) {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg
          })
        }
      },
      fail: function () {
        // fail
      }
    })


  },
  joinclass: function () {
    wx.reLaunch({
      url: '/pages/studioshare/workshop/workshop?studio_id=' + studio_id + "&trainee_id=" + fromid + "&isfrom=" + isfrom
    })
  }


})