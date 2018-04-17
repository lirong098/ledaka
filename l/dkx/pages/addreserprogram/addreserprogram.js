// pages/addreserprogram/addreserprogram.js
let showModal = require('../../utils/ShowModal.js');
var app = getApp();
var coach_id;
var publicurl = app.globalData.publicurl;
var Fdate;
var Fstarttime;
var Fendtime;
var schedule_id;
let studio_id = 0;
Page({
  data: {
    array: ['男', '女'],
    tranieeinfo: {},
    lesson: '课程',
    classdate: '上课日期',
    classtime: '开始时间',
    classendtime: '结束时间',
    address: '工作室',
    classman: '上课人数',
    mycrad: '会员卡',
    reserprogram: '预约',
    cancelreser: '取消预约',
    record: '打卡',
    seorder_name: '请点击选择会员卡',
    seorder_id: null,
    coach_id: 0,
    seorder_count: 0, //选择会员卡 是否跳转
    studio:[],
    studio_index:0,
    schedule:{
      sub : 'submit', 
      disadled : false, 
      scrclass : 'containerb', 
      butclass : 'footerb', 
      viewclass : 'usergender'
    }
  },
  onLoad: function (options) {
    var that = this;
    coach_id = options.coach_id;
    that.setData({ coach_id: coach_id });
    Fdate = options.Fdate;
    Fstarttime = options.Fstarttime;
    Fendtime = options.Fendtime;
    schedule_id = options.schedule_id;
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    if (!schedule_id && Fstarttime) {
      var hello = Fstarttime.split(":")
      if (hello['1'] == '30') {
        hello['1'] = '00'
      }
      Fstarttime = hello['0'] + ':' + hello['1']
      //Fstarttime = hello.join(':')
      var hello1 = Fendtime.split(':')
      if (hello1['1'] == '30') {
        hello1['1'] = '00'
        hello1['0'] = ++hello1['0']
        if (hello1['0'] <= 9) {
          hello1['0'] = '0' + hello1['0']
        } else {
          hello1['0'] = hello1['0']
        }
      }
      Fendtime = hello1['0'] + ':' + hello1['1']
      //Fendtime = hello1.join(':')
      var hello2 = Fdate.split(' ')
      that.setData({
        date: hello2['0'],
        time: Fstarttime,
        end_time: Fendtime
      })
    }
    wx.request
      ({
        url: publicurl + 'index/Class_Schedule/dateinfo',
        data: {
          coach_id: coach_id,
          Fdate: Fdate,
          Fstarttime: Fstarttime,
          schedule_id: schedule_id,
          trainee_id: app.globalData.id
        },
        success: function (res) {
          /**/
          console.log(res.data);
          wx.getStorage({
            key: 'card_info',
            success: function (res) {
              if (res.data) {
                var hello = res.data.split(',');
                that.setData({
                  seorder_id: hello['0'],
                  seorder_name: hello['1'],
                })
              }
            }
          })
          that.setData({
            program: res.data.program,
            studio: res.data.studio,
            schedule: res.data.schedule,
            programindex: 0,
            seorder_count: res.data.seorder_count
          });
          studio_id = res.data.studio[that.data.studio_index].id;
          console.log(studio_id);
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
  formSubmit: function (e) {
    if (e.detail.value.seorder_id == null || e.detail.value.seorder_id == '') {
      wx.showModal({
        title: '错误提示',
        content: "请选择会员卡再预约。",
        showCancel: false,
      })
      return;
    };
    if (e.detail.value.program_name !== "") {
      wx.request({
        url: publicurl + 'index/Class_Schedule/add',
        data: {
          coach_id: coach_id,
          program_id: e.detail.value.program_id,
          program_name: e.detail.value.program_name,
          maximum_attendants: e.detail.value.manqty,
          class_date: e.detail.value.date,
          studio_id: e.detail.value.studio_id,
          start_time: e.detail.value.time,
          end_time: e.detail.value.end_time,

          trainee_id: app.globalData.id,
          seorder_id: e.detail.value.seorder_id
        },
        success: function (res) {
          if (res.data.msg == 2) {
            wx.showModal({
              title: '错误提示',
              content: res.data.text,
              showCancel: false,
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '该预约已提交教练，等待教练批准。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1, // 回退前 delta(默认为1) 页面
                  })
                }
              }
            });
          }

        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '课程未选择。'
      })
    }

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      programindex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      userdate: e.detail.value
    });
    Fdate = e.detail.value;
  },
  bindTimeChange: function (e) {
    var that = this
    var t = e.detail.value
    var s_time = t.split(':')
    //console.log(s_time)
    s_time['0'] = ++s_time['0']
    var e_time = s_time['0'] + ':' + s_time['1']
    //  e_time = s_time.join(':')
    that.setData({
      time: e.detail.value,
      end_time: e_time,
    })
    Fstarttime = e.detail.value;
    Fendtime = e_time;
  },
  bindEndTimeChange: function (e) {
    var that = this
    that.setData({
      end_time: e.detail.value
    })
    Fendtime = e.detail.value;
  },
  /*选择会员卡*/
  select_seorder: function () {
    let that = this;
    if (that.data.seorder_count == 0) {
      showModal.showModal(function () {
        that.setData({
          seorder_id: 0,
          seorder_name: "体验课",
        });
      }, '提示', '你没有可用的会员卡，是否预约体验课?');
    } else if (that.data.seorder_count > 0){
      wx.navigateTo({
        url: 'orderlist/orderlist?coach_id='+that.data.coach_id+'&studio_id='+studio_id,
      })
    }
  },
  /*工作室选择*/
  bindStudioChange:function(e){
    console.log(e.detail.value);
    let that = this;
    that.setData({
      studio_index: e.detail.value
    });
    studio_id = that.data.studio[e.detail.value].id;
  }
})