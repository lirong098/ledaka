// pages/student/student.js
var app = getApp();
var publicurl = app.globalData.publicurl;
var schedule_id;
var coach_id;
var trainee_id;
var notifi_id;
let ShowModal = require('../../utils/ShowModal.js');
Page({
  data: {
    record: '打卡',
    hidden: true,
    is_showUCB: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    schedule_id = options.schedule_id
    coach_id = options.coach_id
    trainee_id = options.trainee_id
    notifi_id = options.notifi_id
    console.log(schedule_id)
    var that = this
    that.setData({
      cancelreser: options.cancelreser,
      bind: options.bind,
      nocancelreser: options.nocancelreser,
      nobind: options.nobind,
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    wx.request
      ({
        url: publicurl + 'index/Class_Schedule/lessoninfo',
        data: {
          coach_id: coach_id,
          schedule_id: schedule_id,
          notifi_id: notifi_id
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            schedule: res.data.schedule,
            trainee: res.data.trainee,
            Fifstatus: res.data.Fifstatus,
            isfull: res.data.isfull
          });
          if (res.data.Fifstatus_coach > 0) {
            trainee_id = res.data.Fifstatus_coach
            notifi_id = res.data.notifica_id
            that.setData({
              nocancelreser: "改预约时间",
              cancelreser: "同意",
              Fifstatus: 1,
              nobind: "bindnoverify",
              bind: "bindverify"
            })
          };
          if (res.data.schedule.coach_id != app.globalData.id) {
            that.setData({
              is_showUCB: false
            });
          }
          if (res.data.schedule['maximum_attendants'] <= 1) {
            that.setData({
              is_showUCB: false
            });
          }
        }
      })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindcancel: function () {
    wx.showModal({
      title: '操作确认',
      content: '您确定要取消该课程吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: publicurl + 'index/Class_Schedule/coachupdaterecord',
            data: {
              schedule_id: schedule_id,
              coach_id: app.globalData.id,
            },
            success: function (res) {
              if (res.data.msg === 1) {
                wx.showModal({
                  title: '提示',
                  content: res.data.text,
                  showCancel: false,
                  success: function (res) {
                    wx.navigateBack({
                      delta: 1, // 回退前 delta(默认为1) 页面
                    })
                  }
                })
              } else {
                wx.showModal({
                  title: '错误提示',
                  content: res.data.text,
                  showCancel: false
                })
              }
            },
            fail: function () {
              // fail
            }
          })
        }
      }
    })
  },
  bindverify: function () {
    var that = this;
    that.setData({
      hidden: false
    });
    wx.request({
      url: publicurl + 'index/Class_Schedule/indexupdaterecord',
      data: {
        schedule_id: schedule_id,
        coach_id: app.globalData.id,
        trainee_id: trainee_id,
        notifi_id: notifi_id
      },
      success: function (res) {
        if (res.data.msg === 1) {
          that.setData({
            hidden: true
          });
          wx.showModal({
            title: "提示",
            content: "该课程已被成功预约。",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                })
              }
            }
          });
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.text,
            success: function (res) {
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
              })
            }
          })
        }
      },
      fail: function () {
        // fail
      }
    })
  },
  bindnoverify: function () {
    let that = this;
    wx.navigateTo({
      url: 'updatestudent/updatestudent?schedule_id=' + schedule_id + '&trainee_picture=' + that.data.trainee['0'].trainee_picture + '&trainee_name=' + that.data.trainee['0'].trainee_name + '&trainee_id=' + that.data.trainee['0'].trainee_id + '&class_date=' + that.data.schedule.class_date + '&time=' + that.data.schedule.start_time + '&end_time=' + that.data.schedule.end_time + '&program_name=' + that.data.schedule.program_name + '&date=' + that.data.schedule.date_date,
    });
  },
  share: function () {
    try {
      wx.navigateToMiniProgram({
        // appId: 'wxc335fc380a8f0e0e',
        appId: 'wx68c41ab02c9b0346',
        path: 'pages/student/student?isfrom=coach&coach_id=' + coach_id + "&schedule_id=" + schedule_id,
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
  },
  /*换教练*/
  bindChangeCoach: function () {
    let that = this;
    wx.navigateTo({
      url: 'updateCoach/updateCoach?schedule_id=' + schedule_id + '&class_date=' + that.data.schedule.date_date + '&time=' + that.data.schedule.start_time + '&end_time=' + that.data.schedule.end_time,
    });
  }
})