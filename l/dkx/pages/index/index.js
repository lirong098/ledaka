//index.js
//获取应用实例
var app = getApp()
var wxRequest = require('../../utils/wxRequest.js')
var GetuserInfo = require('../../utils/GetuserInfo.js')
var publicurl = app.globalData.publicurl
var myDate = new Date()
var moderndate = myDate.toLocaleDateString()
var page = 1
var list
var trainee_id
var picture
var status
var id
var onShareAppMessage
var coach_id
var options
var isfrist = true
var isset = false
Page({
  data: {
    userInfo: {},
    data1: '',
    textclass: '本月上课',
    textnext: '次',
    notice: '通知',
    newdate: '的',
    id: '1',
    delBtnWidth: 180, //删除按钮宽度单位（rpx）
    hidden: false,
    size: 20,
    hasMore: true,
    hasRefesh: false,
    scrolly: true
  },
  onLoad: function (options) {
    //分享页传参
    options = options
    onShareAppMessage = options.onShareAppMessage
    coach_id = options.coach_id
    var that = this
    //默认日期
    wx.request({
      url: publicurl + 'index/Index/moderndate',
      success: function (res) {
        wx.setStorage({
          key: "weekdate",
          data: res.data
        })
      },
      fail: function () {
        GetuserInfo.showModal(options, that.onLoad);
      }
    })

    //默认教练排课表
    wx.setStorage({
      key: "navstatus",
      data: '0'
    })

    // wx.removeStorageSync("openid")
    // GetuserInfo.getuserInfo(publicurl, that.coachnoti, options, that.onLoad);
    // trainee_id = wx.getStorageSync('id');

    this.promiseLogin(that)

    wx.removeStorage({
      key: 'card_info',
    })
  },
  onShow: function () {
    var that = this
    trainee_id = wx.getStorageSync('id');
    // if (trainee_id && status == 2) {
    if (trainee_id) {
      app.globalData.id = trainee_id
      page = 1
      that.coachnoti(trainee_id, page);
    } else if (!trainee_id && !isfrist && !isset) {
      wx.openSetting({
        success: function (data) {
          if (data) {
            if (data.authSetting["scope.userInfo"] == true) {
              isset = true
              that.promiseLogin(that)
            }
          }
        },
        fail: function () {
          console.log("设置失败。");
        }
      })
    }
    if (isset) {
      that.promiseLogin(that)
    }
    isfrist = false
  },
  touchS: function (e) {
    var that = this
    if (e.touches.length == 1) {
      that.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY
      });
    }
  },
  touchM: function (e) {
    var that = this
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = that.data.startX - moveX;
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";

      if (disX > 20) {
        that.setData({
          scrolly: false
        });
      }

      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else
        if (disX > 10) { //移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "rpx";
          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "rpx";
          }
        }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      // console.log(list)
      // console.log(index)
      list[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      that.setData({
        notification: list
      });
    }
  },
  touchE: function (e) {
    var that = this
    that.setData({
      scrolly: true
    });
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      // var txtStyle = disX > delBtnWidth/2 ? "left:-"+delBtnWidth+"px":"left:0px";
      //获取列表中要删除项的下标
      var index = e.currentTarget.dataset.index;
      if (disX > delBtnWidth / 2) {
        var txtStyle = "left:-" + delBtnWidth + "rpx";
        list[index]['txtStyle'] = txtStyle;
        //更新列表的状态
        that.setData({
          notification: list
        });
      } else {
        var txtStyle = "left:0rpx";
        list[index]['txtStyle'] = txtStyle;
        //更新列表的状态
        that.setData({
          notification: list
        });
      }
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  delItem: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    //console.log(index)
    wx.request({
      url: publicurl + 'index/Notification/updatestatus',
      data: {
        notifi_id: list[index]['id']
      },
      success: function (res) {
        //移除列表中下标为index的项
        list.splice(index, 1);
        //更新列表的状态
        that.setData({
          notification: list
        });
      },
      fail: function () {
        GetuserInfo.showModal(options, that.onLoad)
      }
    })
  },
  //加载更多
  loadMore: function (e) {
    var that = this;
    //console.log(that.data.hasMore)
    if (!that.data.hasMore) return;
    that.setData({
      hasMore: false,
    });
    wx.request({
      url: publicurl + 'index/Notification/coachnoti',
      data: {
        //教练查询 1 学员查询为2
        trainee_id: app.globalData.id,
        notification_into: '2',
        page: ++page
      },
      success: function (res) {
        console.log(res.data.notification);
        if (res.data.notification && res.data.notification.length > 0) {
          that.data.notification.push.apply(that.data.notification, res.data.notification);
          if (res.data.notification.length == 10) {
            that.setData({
              hasMore: true,
            });
          }
        }
        list = that.data.notification
        that.setData({
          notification: that.data.notification,
          // hidden: true,
        })
        console.log(that.data.notification);
      },
      fail: function () {
        GetuserInfo.showModal(options, that.onLoad)
      },
    })
  },
  //刷新处理
  refesh: function (e) {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: publicurl + 'index/Notification/coachnoti',
      data: {
        //教练查询 1 学员查询为2
        trainee_id: trainee_id,
        notification_into: '2',
        page: 1
      },
      success: function (res) {
        //console.log(res.data.notification)
        list = res.data.notification
        page = 1
        that.setData({
          notification: res.data.notification,
          hidden: true,
          hasRefesh: false
        })
      },
      fail: function () {
        GetuserInfo.showModal(options, that.onLoad)
      },
    })
  },
  onShareAppMessage: function () {
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
  },
  onPullDownRefresh: function () { },
  coachnoti: function (trainee_id, page, options, onLoad) {
    var that = this
    console.log(trainee_id)
    wx.request({
      url: publicurl + 'index/Notification/coachnoti',
      data: {
        //教练查询 1 学员查询为2
        trainee_id: trainee_id,
        notification_into: '2',
        latestlesson: 1,
        page: page,
        onShareAppMessage: onShareAppMessage,
        coach_id: coach_id
      },
      success: function (res) {
        list = res.data.notification
        status = 2
        that.setData({
          notification: res.data.notification,
          username: res.data.name,
          motto: res.data.yearweek,
          picture: res.data.picture,
          hidden: true,
          notifi_count: res.data.count
        })
        that.setData({
          hasMore: true
        })
      },
      fail: function () {
        GetuserInfo.showModal(options, onLoad)
      },
    })
  },
  promiseLogin: function (that) {
    var openid
    var unionid
    var session_key
    var wxLogin = wxRequest.wxLogin()
    wxLogin().then(res => {
      var code = res.code
      // console.log(code)
      var url = publicurl + 'index/Login/index?code=' + code
      var data = { msg: 2 }
      return wxRequest.getRequest(url, data)
    }).then(res => {
      // console.log(res)
      openid = res.data.openid
      unionid = res.data.unionid
      session_key = res.data.session_key
      var wxGetUserInfo = wxRequest.wxGetUserInfo()
      return wxGetUserInfo()
    }).then(
      res => {
        // console.log(res)
        var url = publicurl + 'index/Login/login'
        var data = {
          openid: openid,
          unionid: unionid,
          session_key: session_key,
          rawData: res.rawData,
          signature: res.signature,
          iv: res.iv,
          encryptedData: res.encryptedData,
          msg: 2
        }
        return wxRequest.getRequest(url, data)
      },
      err => {
        // console.log(err)
        var tid = wx.getStorageSync('id');
        var topenid = wx.getStorageSync('openid');
        if (tid && topenid) {
          app.globalData.id = tid
          app.globalData.openid = topenid
          trainee_id = tid
          page = 1
          that.coachnoti(trainee_id, 1);
        } else {
          wx.openSetting({
            success: function (data) {
              if (data) {
                if (data.authSetting["scope.userInfo"] == true) {
                  that.promiseLogin(that)
                }
              }
            },
            fail: function () {
              console.log("设置失败。");
            }
          })
        }
      }
      ).then(res => {
        // console.log(res)
        //缓存id
        wx.setStorageSync('id', res.data.array.id)
        //缓存openid
        wx.setStorageSync('openid', res.data.array.openid)
        app.globalData.id = res.data.array.id
        app.globalData.openid = res.data.array.openid
        trainee_id = res.data.array.id
        page = 1
        that.coachnoti(trainee_id, 1);
      })
  },
  gotoColumn: function (e) {
    wx.switchTab({
      url: '/pages/column/column'
    })
  }
})