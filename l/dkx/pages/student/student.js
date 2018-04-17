// pages/student/student.js
var GetuserInfo = require('../../utils/GetuserInfo.js')
var app = getApp()
var publicurl = app.globalData.publicurl
var schedule_id
var coach_id
var notifi_id
var isfrom
Page({
  data: {
    cancelreser: '取消预约',
    record: '签到打卡',
    seorder_id: null,
    seorder_name: null,
    seorder_count: 0,
    onshow_status: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    schedule_id = options.schedule_id
    coach_id = options.coach_id
    notifi_id = options.notifi_id
    isfrom = options.isfrom
    that.setData({
      isfrom: isfrom
    })
    if (!app.globalData.id) {
      app.globalData.id = wx.getStorageSync('id');
    }
    if (!app.globalData.id) {
      GetuserInfo.login(app.globalData.publicurl, null, null, null, that.trainee_lessoninfo);
    }else{
      that.setData({
        onshow_status: true
      });
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    
    var that = this
    if (that.data.onshow_status){
      that.trainee_lessoninfo();
    }
  },
  /*网络请求*/
  trainee_lessoninfo:function(){
    let that = this;
    wx.request
      ({
        url: publicurl + 'index/Class_Schedule/trainee_lessoninfo',
        data: {
          coach_id: coach_id,
          schedule_id: schedule_id,
          trainee_id: app.globalData.id,
          notifi_id: notifi_id
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            schedule: res.data.schedule,
            trainee: res.data.trainee,
            Fif: res.data.Fif,
            Fifstatus: res.data.Fifstatus,
            status: res.data.status,
            reserprogram: res.data.reserprogram,
            bindname: res.data.bindname,
            record: res.data.record,
            bindrecord: res.data.bindrecord,
            seorder_count: res.data.seorder_count,
            onshow_status:true
          })
          wx.getStorage({
            key: 'card_info',
            success: function (res) {
              if (res.data) {
                var hello = res.data.split(',');
                that.setData({
                  seorder_id: hello['0'],
                  seorder_name: hello['1'],
                })
                if (hello['0'] > 0) {
                  that.insertschedule();
                }
              }
            }
          })
        }
      })
  },
  onHide: function () {
    // 页面隐藏
    wx.removeStorage({
      key: 'card_info',
    })
  },
  onUnload: function () {
    // 页面关闭
    wx.removeStorage({
      key: 'card_info',
    })
  },
  bindcancel: function () {
    wx.showModal({
      title: '操作确认',
      content: '您确定要取消该课程？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: publicurl + 'index/Class_Schedule/updaterecord',
            data: {
              schedule_id: schedule_id,
              trainee_id: app.globalData.id,
              msg: '3'
            },
            success: function (res) {
              // success
              wx.showModal({
                title: res.data.title,
                content: res.data.text,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1, // 回退前 delta(默认为1) 页面
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
  },
  bindrecord: function () {
    wx.showModal({
      title: '操作确认',
      content: '确定要签到该课程？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: publicurl + 'index/Class_Schedule/updaterecord',
            data: {
              schedule_id: schedule_id,
              trainee_id: app.globalData.id,
              msg: '2'
            },
            success: function (res) {
              // success
              wx.showModal({
                title: res.data.title,
                content: res.data.text,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../student/student?schedule_id=' + schedule_id + '&coach_id=' + coach_id,
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
  },
  bindreserprogram: function (e) {
    var that = this
    wx.showModal({
      title: '操作确认',
      content: '您是否确定' + e.currentTarget.dataset.id + '该课程?',
      cancelText: '否',
      confirmText: '是',
      success: function (res) {
        if (res.confirm) {
          if (that.data.seorder_count > 0 && that.data.seorder_id === null) {
            wx.navigateTo({
              url: '../addreserprogram/orderlist/orderlist?coach_id=' + coach_id + '&studio_id=' + that.data.schedule.studio_id,
            })
            return;
          } else if (that.data.seorder_count == 0) {
            wx.showModal({
              title: '操作确认',
              content: '你没有可用的会员卡，是否预约体验课?',
              success: function (res) {
                if (res.confirm) {
                  that.setData({
                    seorder_id: 0,
                    seorder_name: "体验课"
                  })
                  that.insertschedule();
                }
              }
            })
          }
        }
      }
    })
  },
  /*预约团课 或者候补*/
  insertschedule: function () {
    var that = this
    wx.request({
      url: publicurl + 'index/Class_Schedule/insertschedule',
      data: {
        schedule_id: schedule_id,
        trainee_id: app.globalData.id,
        coach_id: coach_id,
        seorder_id: that.data.seorder_id
      },
      success: function (res) {
        var record_id = res.data.record_id
        var notifica_id = res.data.notifica_id
        console.log(res.data.text);
        wx.showModal({
          title: res.data.title,
          content: res.data.text,
          showCancel: res.data.botton,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../student/student?schedule_id=' + schedule_id + '&coach_id=' + coach_id,
              })
            } else {
              wx.request({
                url: publicurl + 'index/Class_Schedule/deleteinsertschedule',
                data: {
                  record_id: record_id,
                  notifica_id: notifica_id,
                  trainee_id: app.globalData.id,
                }
              })
            }
          }
        })
      }
    })
  },
  onShareAppMessage: function () {
    if (isfrom == 'coach') {
      return {
        title: "教练" + this.data.schedule.coach_name + '邀请你预约团课',
        path: '/pages/student/student?coach_id=' + coach_id + '&schedule_id=' + schedule_id + '&status=1',
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
  }
})