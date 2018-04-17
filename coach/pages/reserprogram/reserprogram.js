// pages/reserprogram/reserprogram.js
var app = getApp();
var publicurl = app.globalData.publicurl;
// var myDate = new Date()  
let moderndate;
// var moderntime = myDate.toLocaleTimeString()
var studio;
var coach;
Page({
  data: {
    navleft: "周课表",
    navright: "工作室课表",
    add: '＋',
    delBtnWidth: 180,//删除按钮宽度单位（rpx）
    classa: 'nav-text-top',
    classaa: 'nav-text-bottom',
    datetime: ['', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    hidden: false,
    nav_change: 1,
    navmain: "日课表",
    bind_list_name: "bindnowdate",
    nowDate: null, //不会改变
    studio_info: [],
    https: app.globalData.imagesurl
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    //默认日期
    wx.request({
      url: publicurl + 'index/Index/moderndate',
      success: function (res) {
        that.setData({
          nowDate: res.data
        });
      },
    })
    if (!app.globalData.id) {
      app.globalData.id = wx.getStorageSync('id')
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function (options) {
    // 页面显示
    var that = this
    that.setData({
      coach_id: app.globalData.id,
      //hidden:false
    })
    //查询此教练的工作室信息
    studio = wx.getStorageSync('last_studio');
    console.log(studio + 'hc');
    if (!studio) {
      wx.request({
        url: publicurl + 'index/Class_Schedule/selectstudio',
        data: {
          coach_id: app.globalData.id,
        },
        success: function (res) {
          studio = res.data;
          console.log(studio + 'wl');
          that.weekdate();
        }
      })
    } else {
      that.weekdate();
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindnavleft: function () {
    var that = this
    that.setData({
      navlefttext: "navlefttext",
      navrighttext: "navrighttext",
      navmaintext: "navrighttext",
      navlr: "navlr",
      navlrs: "navlrs",
      navlrm: "navlrs",
      hidden: false,
      nav_change: 1,
    });
    that.lap(moderndate);
    wx.request({
      url: publicurl + 'index/Class_Schedule/coachselectschedule',
      data: {
        coach_id: app.globalData.id,
        moderndate: moderndate
      },
      success: function (res) {
        // console.log('a')
        res.data.arrayinfo['2']['0'].borderstyle = "border:none;";
        res.data.arrayinfo['3']['0'].borderstyle = "border:none;";
        res.data.arrayinfo['4']['0'].borderstyle = "border:none;";
        res.data.arrayinfo['5']['0'].borderstyle = "border:none;";
        res.data.arrayinfo['6']['0'].borderstyle = "border:none;";
        res.data.arrayinfo['7']['0'].borderstyle = "border:none;";
        res.data.arrayinfo['8']['0'].borderstyle = "border:none;";
        that.setData({
          arrayobj: res.data.arrayinfo,
          hidden: true
        })
      }
    })
    wx.setStorage({
      key: "navstatus",
      data: '1'
    })
  },
  bindnavright: function () {
    var that = this
    if (studio) {
      that.setData({
        navlefttext: "navrighttext",
        navrighttext: "navlefttext",
        navmaintext: "navrighttext",
        navlrs: "navlr",
        navlr: "navlrs",
        navlrm: "navlrs",
        array: studio,
        coachtext: "工作室选择",
        hidden: false,
        nav_change: 2,
        bind_list_name: "bindstudio"
      });
      that.lap(moderndate);
      that.coachstudioschedule(studio, moderndate, app.globalData.id);

      wx.setStorage({
        key: "navstatus",
        data: '2'
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '该教练没有参加工作室'
      })
    }
  },
  /*日课表*/
  bindnavmain: function () {
    let that = this;
    that.setData({
      navlefttext: "navrighttext",
      navrighttext: "navrighttext",
      navmaintext: "navlefttext",
      navlrs: "navlrs",
      navlr: "navlrs",
      navlrm: "navlr",
      // array: studio,
      hidden: false,
      nav_change: 0,
      bind_list_name: "bindnowdate"
    })
    that.lap(moderndate);
    that.coachschedule(moderndate, app.globalData.id);
    wx.setStorage({
      key: "navstatus",
      data: '0'
    })
  },
  /*日课表 点击某一天执行的事件*/
  bindnowdate: function (e) {
    let that = this
    if (e.currentTarget.dataset.index != '') {
      let index = e.currentTarget.dataset.index
      that.update_lap(index);
      that.coachschedule(that.data.lap[index].date, app.globalData.id);
    }
  },
  /*工作室课表 点击某一天执行的事件*/
  bindstudio: function (e) {
    let that = this
    if (e.currentTarget.dataset.index != '') {
      let index = e.currentTarget.dataset.index
      that.update_lap(index);
      that.coachstudioschedule(studio, that.data.lap[index].date, app.globalData.id);
    }
  },
  /*修改日历样式*/
  update_lap: function (key) {
    let that = this;
    for (let x in that.data.lap) {
      that.data.lap[x].styleclass = "";
      that.data.lap[x].show_current = false;
      if (x == key) {
        that.data.lap[key].styleclass = "nav-text-top";
        that.data.lap[key].show_current = true;
      }
    }
    that.setData({ lap: that.data.lap });
    wx.setStorage({
      key: "weekdate",
      data: that.data.lap[key].date
    })
  },
  touchS: function (e) {
    // //console.log(e.changedTouches[0].pageX + ','+e.changedTouches[0].pageX)
    var that = this
    //console.log(e.touches[0].clientY)
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
    // console.log(e)
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
  /*网络请求 工作室某天的课程*/
  coachstudioschedule: function (stu, date, coa) {
    let that = this;
    wx.request({
      url: publicurl + 'index/Class_Schedule/coachstudioschedule',
      data: {
        studio_id: stu,
        moderndate: date,
        coach_id: coa
      },
      success: function (res) {
        that.setData({
          arrayobj: res.data.arrayinfo,
          studio_info: res.data.studio_info,
          hidden: true
        })
      }
    })
  },
  /*网络请求 日课程某天的课程*/
  coachschedule: function (date, coa) {
    let that = this;
    wx.request({
      url: publicurl + 'index/Class_Schedule/coachschedule',
      data: {
        moderndate: date,
        coach_id: coa
      },
      success: function (res) {
        that.setData({
          arrayobj: res.data.arrayinfo,
          hidden: true
        })
      }
    })
  },
  /*网络请求 周信息*/
  lap: function (now_date) {
    let that = this;
    wx.request({
      url: publicurl + 'index/Class_Schedule/lap',
      data: {
        moderndate: now_date
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          lap: res.data
        })
      }
    })
  },
  //获取缓存中的日期，首次加载取当前日期
  weekdate: function () {
    let that = this;
    wx.getStorage({
      key: 'weekdate',
      complete: function (res) {
        moderndate = res.data;
        var moderndate1 = moderndate.replace("年", "/");
        var moderndate2 = moderndate1.replace("月", "/");
        moderndate = moderndate2.replace("日", "");
        var a = moderndate.split("/");//拆分字符串
        if (a.length > 2) {
          var b = a[1]
          var m = a[1].substr(-20, 1)//截取字符串
          if (m == '0') {
            b = a[1].substr(1, 1)
          }
          that.setData({
            month: b + '月',
          });
        };
        wx.getStorage({
          key: 'navstatus',//1:周课表，2：工作室团课表
          success: function (res) {
            if (res.data == '1') {
              that.bindnavleft();
            } else if (res.data == '2') {
              that.bindnavright();
            } else if (res.data == '0') {
              that.bindnavmain();
            }
          }
        })
      }
    })
  }
})