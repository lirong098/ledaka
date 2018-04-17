// pages/mycoachinfo/mycoachinfo.js
var GetuserInfo = require('../../utils/GetuserInfo.js')
var app = getApp()
var publicurl = app.globalData.publicurl
var imagesurl = app.globalData.imagesurl
var coach_id
var trainee_id
var list
var notifi_id
var name
var onShare = 0
var phone
var files = []
var isfrom
var studiocount = 0
Page({
  data: {
    files: [],
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    coach_id = options.coach_id
    notifi_id = options.notifi_id
    isfrom = options.isfrom
    var onShareAppMessage = options.onShareAppMessage
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight - 300 / 750 * res.windowWidth,
          isfrom: isfrom,
          onShareAppMessage: onShareAppMessage
        });
      }
    });

    // 新用户
    if (app.globalData.id == null || app.globalData.id == '') {
      GetuserInfo.login(app.globalData.publicurl);
    }

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this

    if (app.globalData.id == null || app.globalData.id == undefined) {
      app.globalData.id = wx.getStorageSync("id");
    }

    wx.request({
      url: publicurl + 'index/Coach/coachinfo',
      data: {
        coach_id: coach_id,
        trainee_id: app.globalData.id,
        notifi_id: notifi_id,
      },
      success: function (res) {
        // console.log(res.data.Fifbutton)
        list = res.data.url
        name = res.data.name
        phone = res.data.info.phone
        files = res.data.url
        studiocount = res.data.studiocount
        that.setData({
          info: res.data.info,
          files: res.data.url,
          https: app.globalData.imagesurl,
          coach_id: coach_id,
          Fifbutton: res.data.Fifbutton
        })
      },
      fail: function () {
      }
    })

    // 教练课程
    wx.request({
      url: publicurl + 'index/Program/search',
      data: {
        coach_id: coach_id
      },
      success: function (res) {
        // success
        that.setData({
          list: res.data
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
  bindtext: function () {
    var that = this
    that.setData({
      trainee_comments: ''
    })
  },
  previewImage: function (e) {
    var ss = e.currentTarget.id
    var sss = []
    // sss = sss.concat(ss)
    for (var i = 0; i < files.length; i++) {
      sss.push(app.globalData.imagesurl + files[i]);
    }
    wx.previewImage({
      current: ss, // 当前显示图片的http链接
      urls: sss // 需要预览的图片http链接列表
    })
  },
  onShareAppMessage: function () {
    onShare = 1;
    if (isfrom == 'coach') {
      return {
        title: "教练" + this.data.info.coach_name + '邀请你使用微信预约课程',
        path: '/pages/mycoachinfo/mycoachinfo?coach_id=' + coach_id + '&onShareAppMessage=8088',
        success: function (res) {
          // 分享成功
        },
        fail: function (res) {
          // 分享失败
        }
      }
    } else {
      return {
        title: '乐打卡',
        path: '/pages/index/index',
        success: function (res) {
          // 分享成功
        },
        fail: function (res) {
          // 分享失败
        }
      }
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
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
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
  addcoach: function () {
    var that = this
    trainee_id = app.globalData.id
    if (app.globalData.id == null || app.globalData.id == '') {
      app.globalData.id = wx.getStorageSync('id')
      trainee_id = app.globalData.id
    }

    wx.request({
      url: publicurl + 'index/Coach/addcoach',
      data: {
        coach_id: coach_id,
        trainee_id: trainee_id
      },
      success: function (res) {
        // success
        wx.showModal({
          title: '提示',
          content: res.data.text,
          showCancel: false,
          success: function (res) {
            wx.switchTab({
              url: '/pages/index/index'
            })
            // if (res.confirm) {
            //   that.onShow();
            // }
          }
        })
      },
      fail: function () {
        // fail
      }
    })
  },
  bindssss: function () {
    if (onShare == 0) {
      wx.showModal({
        title: '提示',
        content: "请点击右上角的三个点，选择“转发”发送给朋友。",
        showCancel: false
      })
    }
  },
  addcoachandstudio: function () {
    trainee_id = app.globalData.id
    if (app.globalData.id == null || app.globalData.id == '') {
      app.globalData.id = wx.getStorageSync('id')
      trainee_id = app.globalData.id
    }
    // 跳转选择工作室页面
    if (studiocount > 0) {
      wx.navigateTo({
        url: '/pages/choosestudio/choosestudio?trainee_id=' + trainee_id + "&coach_id=" + coach_id 
      })
    } else {
      wx.request({
        url: publicurl + 'index/Coach/addcoachandstudio',
        data: {
          coach_id: coach_id,
          trainee_id: trainee_id
        },
        success: function (res) {
          // success
          wx.showModal({
            title: '提示',
            content: res.data.text,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }
            }
          })
        },
        fail: function () {
          // fail
        }
      })
    }


  }
})