// pages/punchlist/punchlist.js
var app = getApp()
var publicurl = app.globalData.publicurl
var yearweek
var yearweek1
var topweek
var bottomweek
var moderndate
//var myDate = new Date()
//var moderndate = myDate.toLocaleDateString()
//var moderndate1 = moderndate.replace("年", "/")
//var moderndate2 = moderndate1.replace("月", "/")
//moderndate = moderndate2.replace("日", "")
var newdate
var currentdate = null
var page = 1
Page({
  data: {
    hasMore: true
  },
  onLoad: function (options) {
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    currentdate = null;
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    var qty = page * 10
    wx.request({
      url: publicurl + 'index/Index/moderndate',
      success: function (res) {
        moderndate = res.data;
        newdate = moderndate;
        if (currentdate != null) {
          moderndate = currentdate
        }
        console.log(moderndate);
        that.weekrecord(moderndate, page, qty, function (list) {
          if (list.data.msg == 2) {
            bottomweek = list.data.bottomweek,
              topweek = list.data.topweek
            that.setData({
              recordlist: list.data.data,
              weekend: list.data.weekend,
              url: app.globalData.imagesurl,
              status: 1
            })
          }
        });
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindtopweek: function () {
    var that = this
    page = 1
    that.weekrecord(topweek, page, 10, function (list) {
      bottomweek = list.data.bottomweek
      topweek = list.data.topweek
      ++page
      if (list.data.msg == 2) {
        that.setData({
          recordlist: list.data.data,
          weekend: list.data.weekend,
        })
      }
    });
  },
  bindbottomweek: function () {
    var that = this
    page = 1
    that.weekrecord(bottomweek, page, 10, function (list) {
      if (list.data.msg == 2) {
        ++page
        bottomweek = list.data.bottomweek
        topweek = list.data.topweek
        that.setData({
          recordlist: list.data.data,
          weekend: list.data.weekend
        })
      }
    });
  },
  //加载更多
  loadMore: function (e) {
    var that = this;
    if (!that.data.hasMore) return;
    console.log(page)
    that.weekrecord(currentdate, page, 10, function (list) {
      if (list.data.msg == 2) {
        bottomweek = list.data.bottomweek,
          topweek = list.data.topweek
        if (list.data.data && list.data.data.length > 0) {
          ++page
          that.data.recordlist.push.apply(that.data.recordlist, list.data.data);
        }
        if (list.data.data.length < 10) {
          that.setData({
            hasMore: false
          })
        }
        that.setData({
          recordlist: that.data.recordlist,
          weekend: list.data.weekend
        })
      }
    });
  },
  weekrecord: function (modern, page, qty, fun) {
    var that = this
    console.log(currentdate)
    wx.request({
      url: publicurl + 'index/Mysuccess/weekrecord',
      data: {
        coach_id: app.globalData.id,
        moderndate: modern,
        page: page,
        qty: qty
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        currentdate = modern
        fun(res);
      },
      fail: function (res) {
        wx.showToast({
          title: '网络异常',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  }
})