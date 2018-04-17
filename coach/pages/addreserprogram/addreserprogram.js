// pages/addreserprogram/addreserprogram.js
var ShowModal = require('../../utils/ShowModal.js');
var app = getApp();
var coach_id;
var publicurl = app.globalData.publicurl;
var Fdate;
var Fstarttime;
var Fendtime;
var schedule_id;
var maximum_attendants;
var programindex = 1;
let studio_id =0;
Page({
  data: {
    array: ['男', '女'],
    manqty: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    tranieeinfo: {},
    lesson: '课程',
    classdate: '上课日期',
    classtime: '开始时间',
    classendtime: '结束时间',
    address: '工作室',
    classman: '上课人数',
    mycrad: '会员卡',
    reserprogram: '保存',
    cancelreser: '取消预约',
    record: '打卡',
    navl: "navl",
    navr: "navr",
    qtyshow: true,
    traineeshow: false,
    groupclass: 2,
    trainee_id: null,
    trainee_name: "请点击此处选择学员",
    seorder_name:"请点击此处选择学员的会员卡",
    seorder_id:null,
    seorder_count:0 ,//是否预约体验课
    schedule:{
      'sub':'submit',
      'disadled' : false, 
      'scrclass': 'containerb', 
      'butclass' : 'footerb', 
      'viewclass' : 'usergender'
    },
    studio:[],
    studio_index:0
  },
  onLoad: function (options) {
    coach_id = options.coach_id;
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
      var hello1 = Fendtime.split(':')
      if (hello1['1'] == '30') {
        hello1['1'] = '00'
        hello1['0'] = ++hello1['0']
        if (parseInt(hello1['0']) <= 9) {
          hello1['0'] = "0" + hello1['0']
        }
      }
      Fendtime = hello1['0'] + ':' + hello1['1']
      var hello2 = Fdate.split(' ')
      //console.log(hello2)
      that.setData({
        date: hello2['0'],
        time: Fstarttime,
        end_time: Fendtime,
        maximum_attendants: 4
      })
    }
    /*教练选择的学员信息*/
    wx.getStorage({
      key: 'trainee_info',
      complete: function (res) {
        if (res.data) {
          var hello = res.data.split(',');
          that.setData({
            trainee_id: hello['0'],
            trainee_name: hello['1'],
            seorder_id:null,
            seorder_name: "请点击此处选择学员的会员卡"
          })
        }
        that.dateinfo(that.data.trainee_id);
      }
    })
     
     /*教练选择的学员的会员卡信息*/
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
    var addshow = wx.getStorageSync('addshow');
    if (addshow == 1) {
      that.bindnavright();
    }
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
    wx.removeStorage({
      key: 'trainee_info',
    })
    wx.removeStorage({
      key: 'card_info',
    })
  },
  formSubmit: function (e) {
    var that = this
    if (e.detail.value.program_name === "") {
      ShowModal.showModal(function(){return;}, '错误提示', '课程未选择', false,false);
    } else {
      var hello = e.detail.value.date.split('-');
      if (hello.length == 1) {
        var hello = e.detail.value.date.split('/');
      }
      if (that.data.groupclass == 2) {
        var text = '请确认是否安排' + parseInt(hello['1']) + '月' + parseInt(hello['2']) + '日' + e.detail.value.time + '的' + e.detail.value.program_name + '。';
      } else {
        if (that.data.trainee_id == null || that.data.trainee_id == '') {
          ShowModal.showModal('', '错误提示', '学员名为空，请选择学员。', false, false);
          return;
        }
        console.log(that.data.seorder_id);
        if (that.data.seorder_id === null || that.data.seorder_id === '') {
          ShowModal.showModal('', '错误提示', '请选择此学员的会员卡。', false, false);
          return;
        }
        var text = '你代' + that.data.trainee_name + '预约' + parseInt(hello['1']) + '月' + parseInt(hello['2']) + '日' + e.detail.value.time + '的' + e.detail.value.program_name + '，请确认。';
      }
      ShowModal.showModal(function(){
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
            groupclass: that.data.groupclass,
            trainee_id: that.data.trainee_id,
            seorder_id: that.data.seorder_id
          },
          success: function (res) {
            if (res.data.msg == 2) {
              ShowModal.showModal('', '错误提示', res.data.text, false, false);
            } else {
              if (res.data == 1) {
                ShowModal.showModal(function () {
                  wx.navigateBack({
                    delta: 1, // 回退前 delta(默认为1) 页面
                  })
                }, '提示', '排课信息已成功保存。', false, false);
              }
            }
          },
          fail: function (res) {
            // fail
            ShowModal.showToast('', title = '网络异常', icon = 'loading');
          },
        })
      }, '操作确认', text);
    }
  },
  bindPickerChange: function (e) {
    programindex = e.detail.value
    this.setData({
      programindex: e.detail.value
    })
  },
  bindManqtyChange: function (e) {
    this.setData({
      maximum_attendants: e.detail.value
    })
  },
  bindDateChange: function (e) {
    Fdate = e.detail.value;
    this.setData({
      date: e.detail.value,
      userdate: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    var that = this
    var t = e.detail.value
    var s_time = t.split(':')
    //console.log(s_time)
    s_time['0'] = ++s_time['0']
    var e_time = s_time['0'] + ':' + s_time['1']
    //  e_time = s_time.join(':')
    Fstarttime = e.detail.value;
    Fendtime = e_time;
    that.setData({
      time: e.detail.value,
      end_time: e_time,
    })
  },
  bindEndTimeChange: function (e) {
    Fendtime = e.detail.value;
    this.setData({
      end_time: e.detail.value
    })
  },
  bindnavleft: function () {
    var that = this;
    programindex = 1;
    that.setData({
      navl: "navl",
      navr: "navr",
      qtyshow: true,
      traineeshow: false,
      groupclass: 2,
      programindex: 1
    })
    wx.setStorageSync('addshow', 0);
    that.dateinfo(null);
  },
  bindnavright: function () {
    var that = this;
    programindex = 0;
    that.setData({
      navl: "navr",
      navr: "navl",
      qtyshow: false,
      traineeshow: true,
      groupclass: 1,
      programindex:0
    })
    wx.setStorageSync('addshow', 1);
    that.dateinfo(that.data.trainee_id);
  },
  /*查询学员会员卡*/
  bindorderlist:function(){
    var that = this
    if(that.data.trainee_id == null || that.data.trainee_id == ''){
      ShowModal.showModal('', '提示', '请先选择约课的学员。', false,false);
      return;
    }
    if (that.data.seorder_count == 0) {
      ShowModal.showModal(function () {
        that.setData({
          seorder_id: 0,
          seorder_name: "体验课",
        });
      }, '提示', '此学员没有可用的会员卡，是否代约体验课？');
    } else if (that.data.seorder_count > 0) {
      wx.navigateTo({
        url: 'orderlist/orderlist?trainee_id=' + that.data.trainee_id+'&studio_id='+studio_id,
      })
    }
  },
  /*选择工作室*/
  bindStudioChange:function(e){
    let that = this;
    if (e.detail.value == that.data.studio_index) return;
    that.setData({
      studio_index: e.detail.value
    });
    console.log(that.data.studio[e.detail.value].id);
    /*根据工作室 学员 查询 学员可以使用的会员卡  连锁店的卡也可以*/
    if (that.data.trainee_id == "" || that.data.trainee_id == null) return;
    studio_id = that.data.studio[e.detail.value].id;
    wx.request
      ({
        url: publicurl + 'index/Class_Schedule/studio_trainee_seorder',
        data: {
          studio_id: studio_id,
          trainee_id: that.data.trainee_id
        },
        success: function (res) {
          that.setData({
            seorder_count: res.data
          })
        }
      })
  },
  dateinfo:function(tra){
    console.log("sdsadsadsadfsadf");
    let that = this;
    wx.request
      ({
        url: publicurl + 'index/Class_Schedule/dateinfo',
        data: {
          coach_id: coach_id,
          trainee_id: tra
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            program: res.data.program,
            studio: res.data.studio,
            programindex: programindex,
            seorder_count: res.data.seorder_count
          })
          studio_id = res.data.studio['0'].id;
        }
      })
  }
})