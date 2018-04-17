// pages/reserprogram/reserprogram.js
var app = getApp();
var publicurl = app.globalData.publicurl;
var coach_id;
var moderndate;
var studio;
var coach;
var isclick = false
Page({
  data: {
    navleft: "教练课表",
    navright: "工作室团课表",
    navmain: "我本周课程",
    add: '＋',
    classa: 'nav-text-top',
    classaa: 'nav-text-bottom',
    datetime: ['', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    hidden: false,
    imgurl: app.globalData.imagesurl,
    show_page: false,
    now_date: 0,//默认当前日期
    top_now_date: '',//上周日期
    bottom_now_date: '', //下周日期
    weekend: '', //周详情
    array_info: [] //我本周课程数据
  },
  onLoad: function (options) {
    /*获取当前日期*/
    if (!app.globalData.id) {
      app.globalData.id = wx.getStorageSync('id');
    }
  },
  onShow: function (options) {
    // 页面显示
    var that = this
    //获取缓存中的日期，首次加载取当前日期
    wx.getStorage({
      key: 'weekdate',
      success: function (res) {
        moderndate = res.data
        var moderndate1 = moderndate.replace("年", "/")
        var moderndate2 = moderndate1.replace("月", "/")
        moderndate = moderndate2.replace("日", "")
        var a = moderndate.split("/");//拆分字符串
        if (a.length > 2) {
          var b = a[1]
          var m = a[1].substr(-20, 1)//截取字符串
          if (m == '0') {
            b = a[1].substr(1, 1)
          }
          that.setData({
            month: b + '月',
          })
        }
      }
    });
    wx.getStorage({
      key: 'navstatus',//1:教练排课表，2：工作室排课表
      success: function (res) {
        if (res.data == '1') {
          that.bindnavleft();
        } else if (res.data == '2') {
          that.bindnavright();
        } else if (res.data == '0') {
          that.bindnavmain();
        }
      }
    });
  },
  /*教练课表*/
  bindnavleft: function () {
    let that = this
    that.setData({
      coachtext: "教练选择",
      navlefttext: "navlefttext",
      navrighttext: "navrighttext",
      navmaintext: "navrighttext",
      navl: "navl",
      navr: "navr",
      navm: "navr",
      hidden: false,
      show_page: true
    });
    that.lastcoach(function (list) {
      if (list.data.msg == '1') {
        studio = list.data.studio
        studio['picture'] = '/images/back2.png'
        coach = list.data.coach
        coach_id = list.data.coach.id
        that.setData({
          array: list.data.coach,
          coach_id: list.data.coach.id
        })
        that.lap(moderndate);
        that.selectschedule(coach_id, moderndate, app.globalData.id);
      }
    });
    wx.setStorage({
      key: "navstatus",
      data: '1'
    });
  },
  /*工作室团课表*/
  bindnavright: function () {
    let that = this;
    that.setData({
      navlefttext: "navrighttext",
      navrighttext: "navlefttext",
      navmaintext: "navrighttext",
      navm: "navr",
      navl: "navr",
      navr: "navl",
      coachtext: "工作室选择",
      hidden: false,
      show_page: true
    });
    that.lastcoach(function (list) {
      coach = list.data.coach;
      coach_id = list.data.coach.id;
      studio = list.data.studio;
      that.setData({
        coach_id: list.data.coach.id
      });
      that.lap(moderndate);
      wx.getStorage({
        key: 'laststudio',//用户选择的工作室id 
        complete: function (res) {
          if (res.data) {
            studio['id'] = res.data
          }
          that.studioschedule(studio['id'], moderndate, function () {
            that.setData({
              coach_id: coach_id
            })
          });
        }
      });
    });
    wx.setStorage({
      key: "navstatus",
      data: '2'
    });
  },
  /*我本周课程*/
  bindnavmain: function () {
    let that = this;
    that.setData({
      navlefttext: "navrighttext",
      navrighttext: "navrighttext",
      navmaintext: "navlefttext",
      navl: "navr",
      navr: "navr",
      navm: "navl",
      hidden: false,
      show_page: false
    });
    that.trainee_schedule(that.data.now_date);
    wx.setStorage({
      key: "navstatus",
      data: '0'
    });
  },
  title: function () {
    wx.showModal({
      title: '提示',
      content: '工作室排课表只能预约团课，如需预约私教课程，请进入教练排课表。',
      showCancel: false
    })
  },
  touchS: function (e) {
    //  console.log(e)
    var that = this
    if (e.touches.length == 1) {
      that.setData({
        //设置触摸起始点水平方向位置
        // startX:e.touches[0].clientX,
        startY: e.touches[0].clientY
      });
    }
  },
  touchM: function (e) {
    var that = this
    // console.log(e)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      // var moveX = e.touches[0].clientX;
      var moveY = e.touches[0].clientY;
      //手指起始点位置与移动期间的差值
      // var disX = that.data.startX - moveX;
      var disY = that.data.startY - moveY;
      var txtStyle = "";
      // var textStyle  ="";
      if (disY == 0 || disY < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "";
        // textStyle ="";
      } else {
        if (disY > 200) {//移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "position:fixed;top:0rpx;";
          // textStyle ="margin-left:90rpx;";
        }
      }
      that.setData({
        txtStyle: txtStyle,
        //textStyle :textStyle
      })
    }
  },
  touchE: function (e) {
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      //var endX = e.changedTouches[0].clientX;
      var endY = e.changedTouches[0].clientY;
      //触摸开始与结束，手指移动的距离
      //var disX = that.data.startX - endX;
      var disY = that.data.startY - endY;
      var txtStyle = "";
      //    var textStyle  ="";
      if (disY == 0 || disY < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "";
        //textStyle ="";
      } else {
        if (disY > 0) {//移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "position:fixed;top:0rpx;";
          //textStyle ="margin-left:90rpx;";
        }
      }
      that.setData({
        txtStyle: txtStyle,
        //textStyle :textStyle
      })
    }
  },
  bindaddcoach: function () {
    wx.showModal({
      title: '提示',
      content: "你还没有添加教练，请联系你的教练把个人主页转发给你。",
      showCancel: false
    })
  },
  /*网络请求 lap*/
  lap: function (date) {
    let that = this;
    wx.request({
      url: publicurl + 'index/Class_Schedule/lap',
      data: {
        moderndate: date
      },
      success: function (res) {
        that.setData({
          lap: res.data
        });
      },
    })
  },
  /*网络请求  selectschedule 教练周排课表*/
  selectschedule: function (coa, date, tra) {
    let that = this;
    wx.request({
      url: publicurl + 'index/Class_Schedule/selectschedule',
      data: {
        coach_id: coa,
        moderndate: date,
        trainee_id: tra
      },
      success: function (res) {
        that.setData({
          arrayobj: res.data.arrayinfo,
          hidden: true,
        })
      }
    });
  },
  /*网络请求 studioschedule*/
  studioschedule: function (stu, date, fun) {
    let that = this;
    wx.request({
      url: publicurl + 'index/Class_Schedule/studioschedule',
      data: {
        studio_id: stu,
        moderndate: date,
        trainee_id: app.globalData.id
      },
      success: function (res) {
        that.setData({
          arrayobj: res.data.arrayinfo,
          hidden: true,
        });
        if (res.data.studio != 0) {
          studio = res.data.studio
          if (studio['logo'] == null || studio['logo'] == '') {
            studio['logo'] = '/images/back2.png';
          };
          studio['picture'] = studio['logo'];
          that.setData({
            array: studio,
          });
          typeof fun == "function" && fun();
        }
      }
    })
  },
  /*网络请求 lastcoach*/
  lastcoach: function (fun) {
    wx.request
      ({
        //查询默认选择的教练
        url: publicurl + 'index/Coach_Trainee/lastcoach',
        data: {
          trainee_id: app.globalData.id
        },
        success: function (res) {
          typeof fun == "function" && fun(res);
        },
      })
  },
  /*网络请求*/
  trainee_schedule: function (nowdate) {
    let that = this;
    wx.request({
      url: publicurl + 'index/Mysuccess/trainee_schedule',
      data: {
        trainee_id: app.globalData.id,
        nowdate: nowdate
      },
      success: function (res) {
        // console.log(res.data.data);
        that.setData({
          now_date: res.data.nowdate,
          top_now_date: res.data.topweek,
          bottom_now_date: res.data.bottomweek,
          weekend: res.data.weekend,
          array_info: res.data.data,
          hidden: true,
        });
      }
    })
  },
  bindtopweek: function () {
    let that = this;
    that.setData({
      hidden: false
    });
    that.trainee_schedule(that.data.top_now_date);
  },
  bindbottomweek: function () {
    let that = this;
    that.setData({
      hidden: false
    });
    that.trainee_schedule(that.data.bottom_now_date);
  },
})