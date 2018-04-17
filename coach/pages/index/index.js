//index.js
//var Show = require('../../utils/ShowModal.js')
//获取应用实例
var wxRequest = require('../../utils/wxRequest.js')
var AppUtil = require('../../utils/AppUtil');
var app = getApp()
var publicurl = app.globalData.publicurl
var myDate = new Date()
var moderndate = myDate.toLocaleDateString()
var list
var page = 1
var coach_id
var picture
var status = 0
var onShareAppMessage
var studio_id
var options = null;
var isfrist = true
var isset = false
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    data1: '',
    textclass: '本周上课',
    texturl: '详细﹥',
    textclassright: '本月上课',
    textnext: '人次',
    notice: '通知',
    newdate: '的',
    id: '1',
    picture: '',
    delBtnWidth: 180, //删除按钮宽度单位（rpx）
    hidden: false,
    size: 20,
    hasMore: true,
    hasRefesh: false,
    scrolly: true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../student/student?id=1&id2=dujsh'
    })
  },
  onLoad: function (optionsNow) {
    var that = this
    var result = {};
    options = optionsNow ? optionsNow : {};
    options.page = page;
    options.status = status;

    //默认日期
    wx.request({
      url: publicurl + 'index/Index/moderndate',
      success: function (res) {
        wx.setStorage({
          key: "weekdate",
          data: res.data
        });
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '网络连接错误，是否重新加载信息？',
          success: function (res) {
            if (res.confirm) {
              that.onLoad(options)
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
              })
            }
          }
        })
      }
    })

    //默认教练排课表
    wx.setStorage({
      key: "navstatus",
      data: '0'
    })

    that.initEleWidth();

    that.promiseLogin(that)

  },
  onShow: function () {
    var that = this
    var id = wx.getStorageSync('id')
    //console.log(id)

    if (id) {
      options.coach_id = id;
      options.page = 1
      page = 1
      that.coachnoti(options.coach_id, options.page)
    } else if (!id && !isfrist && !isset) {
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

    // wx.request({
    //   url: publicurl + 'index/Notification/coachnoti',
    //   data: {
    //     //教练查询 1 学员查询为2
    //     coach_id: options.coach_id,
    //     notification_into: '1',
    //     page: options.page,
    //     onShareAppMessage: options.onShareAppMessage,
    //     studio_id: options.studio_id
    //   },
    //   success: function (res) {
    //     ////console.log(res.data.notification)
    //     options.list = res.data.notification
    //     options.status = 2
    //     that.setData({
    //       notification: res.data.notification,
    //       username: res.data.name,
    //       hidden: true,
    //       txt: res.data.yearweek,
    //       picture: res.data.picture,
    //       coach_id: options.coach_id,
    //       notifi_count: res.data.count
    //     })
    //   },
    //   fail: function () {
    //     wx.showModal({
    //       title: '错误提示',
    //       content: '网络连接错误，是否重新加载信息？',
    //       success: function (res) {
    //         if (res.confirm) {
    //           that.onLoad(options)
    //         } else if (res.cancel) {
    //           wx.navigateBack({
    //             delta: 1, // 回退前 delta(默认为1) 页面
    //           })
    //         }
    //       }
    //     })
    //   },
    // })
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
    //console.log(e)

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
        txtStyle = "left:0px";
      } else {
        if (disX > 40) { //移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "px";
          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "px";
          }
        }
      }
      //获取手指触摸的是哪一项
      //console.log(that.data.notification)
      var list = that.data.notification;
      var index = e.currentTarget.dataset.index;
      //console.log(list)
      //console.log(index)
      if (list[index]) {
        list[index]['txtStyle'] = txtStyle;
      }
      options.list = list;

      var moveY = e.touches[0].clientY;
      var disY = that.data.startY - moveY;
      if (disY > 100) {
        txtStyle = "left:0px";
        return
      }

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
      var list = that.data.notification;

      var moveY = e.changedTouches[0].clientY;
      var disY = that.data.startY - moveY;
      if (disY > 100) {
        var txtStyle = "left:0px";
        if (list[index]) {
          list[index]['txtStyle'] = txtStyle;
        }
        options.list = list;
        //更新列表的状态
        that.setData({
          notification: list
        });
        return
      }

      if (disX > delBtnWidth / 2) {
        var txtStyle = "left:-" + delBtnWidth + "px";
        if (list[index]) {
          list[index]['txtStyle'] = txtStyle;
        }
        options.list = list;
        //更新列表的状态
        that.setData({
          notification: list
        });
      } else {
        var txtStyle = "left:0px";
        if (list[index]) {
          list[index]['txtStyle'] = txtStyle;
        }
        options.list = list;
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
      // //console.log(scale);
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
    var list = options.list;
    wx.request({
      url: publicurl + 'index/Notification/updatestatus',
      data: {
        notifi_id: list[index]['id']
      },
      success: function (res) {
        //移除列表中下标为index的项
        list.splice(index, 1);
        options.list = list;
        //更新列表的状态
        that.setData({
          notification: list
        });
        //console.log(that.data.notification)
      },
      fail: function () {
        wx.showModal({
          title: '错误提示',
          content: '网络连接错误，是否重新加载信息？',
          success: function (res) {
            if (res.confirm) {
              that.onLoad(options)
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
              })
            }
          }
        })
      }
    })
  },
  //加载更多
  loadMore: function (e) {
    var that = this;
    if (!that.data.hasMore) return
    // console.log("loadMore");
    that.setData({
      hasMore: false
    });
    options.page = options.page + 1;
    //console.log("loadMore==, page="+options.page);
    AppUtil.request(that, AppUtil.baseUrl + 'index/Notification/coachnoti', {
      //教练查询 1 学员查询为2
      coach_id: app.globalData.id,
      notification_into: '1',
      page: options.page
    }, options, function (res) {
      var hasMore = false;
      //console.log(res.data.notification,  res.data.notification.length);
      if (res.data.notification && res.data.notification.length > 0) {
        that.data.notification.push.apply(that.data.notification, res.data.notification);
        //console.log("loadMore222==, that.data.notification="+that.data.notification.length+"\n"+that.data.notification);
        if (res.data.notification.length == 10) {
          hasMore = true;
        }
      }
      //console.log(that.data.notification)
      that.setData({
        notification: that.data.notification,
        hidden: true,
        hasMore: hasMore
      })
    }, true, null);
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
        coach_id: app.globalData.id,
        notification_into: '1',
        page: 1
      },
      success: function (res) {
        //console.log(res.data.notification)
        options.list = res.data.notification
        options.page = 1
        that.setData({
          notification: res.data.notification,
          hidden: true,
          hasRefesh: false
        })
      },
      fail: function () {
        wx.showModal({
          title: '错误提示',
          content: '网络连接错误，是否重新加载信息？',
          success: function (res) {
            if (res.confirm) {
              that.onLoad(options)
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
              })
            }
          }
        })
      },
    })
  },
  onPullDownRefresh: function () {
    //console.log("onPullDownRefresh");
    this.loadMore();
    wx.stopPullDownRefresh(
      //console.log('request')
    )
  },
  onReachBottom: function () {
    //console.log("onReachBottom");
    this.loadMore();
  },
  onShareAppMessage: function () {
    return {
      title: '乐打卡（教练版）',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  coachnoti: function (coach_id, page) {
    var that = this
    console.log(coach_id)
    wx.request({
      url: publicurl + 'index/Notification/coachnoti',
      data: {
        //教练查询 1 学员查询为2
        coach_id: coach_id,
        notification_into: '1',
        page: page,
        onShareAppMessage: options.onShareAppMessage,
        studio_id: options.studio_id
      },
      success: function (res) {
        options.list = res.data.notification;
        list = res.data.notification
        options.status = 2;
        status = 2
        that.setData({
          notification: res.data.notification,
          username: res.data.name,
          hidden: true,
          txt: res.data.yearweek,
          picture: res.data.picture,
          coach_id: coach_id,
          notifi_count: res.data.count
        })
        that.setData({
          hasMore: true
        })
      },
      fail: function () {
        wx.showModal({
          title: '错误提示',
          content: '网络连接错误，是否重新加载信息？',
          success: function (res) {
            if (res.confirm) {
              that.onLoad(options)
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
              })
            }
          }
        })
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
      console.log("21111code");
      var url = publicurl + 'index/Login/index?code=' + code
      var data = { msg: 1 }
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
          msg: 1
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
          coach_id = tid
          that.coachnoti(coach_id, 1);
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
        console.log(res)
        //缓存id
        wx.setStorageSync('id', res.data.array.id)
        //缓存openid
        wx.setStorageSync('openid', res.data.array.openid)
        app.globalData.id = res.data.array.id
        coach_id = res.data.array.id
        that.coachnoti(coach_id, 1);
      })
  }
})