// pages/student/updatestudent/updatestudent.js
var app = getApp()
var publicurl = app.globalData.publicurl
var ShowModal = require('../../../utils/ShowModal.js');
Page({
  data: {

  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      trainee_picture: options.trainee_picture,
      schedule_id: options.schedule_id,
      trainee_name: options.trainee_name,
      trainee_id: options.trainee_id,
      class_date: options.class_date,
      date: options.date,
      time: options.time.replace("-", ""),
      end_time: options.end_time,
      Ftime: options.time.replace("-", ""),
      Fend_time: options.end_time,
      program_name: options.program_name
    });
  },
  bindDateChange: function (e) {
    var that = this
    that.setData({
      date: e.detail.value,
    })
  },
  bindTimeChange: function (e) {
    var that = this
    var t = e.detail.value
    var s_time = t.split(':')
    s_time['0'] = ++s_time['0']
    var e_time = s_time['0'] + ':' + s_time['1']
    that.setData({
      time: e.detail.value,
      end_time: e_time,
    })
  },
  bindEndTimeChange: function (e) {
    var that = this
    that.setData({
      end_time: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this
    ShowModal.showModal(function(){
      wx.request({
        url: publicurl + 'index/Class_schedule/update_schedule',
        data: {
          schedule_id: that.data.schedule_id,
          class_date: e.detail.value.date,
          time: e.detail.value.time,
          end_time: e.detail.value.end_time,
          trainee_id: that.data.trainee_id,
          coach_id: app.globalData.id,
          Yclass_date: that.data.class_date,//原日期
          Ytime: that.data.Ftime, //原开始时间
          program_name: that.data.program_name //课程名称
        },
        success: function (res) {
          if (res.data.msg == 1) {
            ShowModal.showToast(function () {
              wx.navigateBack({
                delta: 2
              })
            }, res.data.text);
          } else {
            ShowModal.showToast('', res.data.text, 'loading');
          }
        }
      })
    }, '提示','确定要修改预约时间吗？');
  }
})