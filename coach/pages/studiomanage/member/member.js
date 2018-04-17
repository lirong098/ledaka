// member.js
var studio_id = 0;
var app = getApp()
var publicurl = app.globalData.publicurl
Page({
  data: {
    array: [],
    nav: [],
    msg: 0, //默认的请求参数
    page: 1, //默认请求参数
    qty: 10,//默认请求参数
    hasMore: true
  },
  onLoad: function (options) {
    var that = this
    studio_id = options.id;
    that.setData({
      studio_id: studio_id
    });
    wx.request({
      url: publicurl + 'index/Index/studio_member_qty',
      data: {
        studio_id: studio_id
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          nav: res.data
        });
        that.studio_member(that.data.msg, that.data.page, that.data.qty, function (list) {
          that.setData({
            array: list.data.trainee
          })
        });
      }
    })
  },
  onShow: function () {
    var that = this
  },
  swichNav: function (e) {
    var current = e.currentTarget.dataset.current;
    var url = "";
    if (current == 0) {
      url = "/pages/studiomanage/info/info"
    } else if (current == 1) {
      url = "/pages/studiomanage/member/member"
    } else if (current == 2) {
      url = "/pages/studiomanage/setting/setting"
    } else if (current == 3) {
      url = "/pages/studiomanage/bus/bus"
    }
    wx.redirectTo({
      url: url + "?id=" + studio_id
    })
  },
  /*点击导航触发事件*/
  bindnavchange: function (e) {
    var that = this;
    if (that.data.msg == e.currentTarget.dataset.index) return;
    for (var x in that.data.nav) {
      that.data.nav[x].bottom = "";
      if (x == e.currentTarget.dataset.index) {
        that.data.nav[x].bottom = "background-color: #4bc1d2;";
      }
    }
    that.setData({
      nav: that.data.nav,
      msg: e.currentTarget.dataset.index,
      page: 1,
      qty: 10,
      hasMore: true
    })
    that.studio_member(that.data.msg, that.data.page, that.data.qty, function (list) {
      that.setData({
        array: list.data.trainee
      })
    });
  },
  /*网络请求*/
  studio_member: function (msg = 0, page = 1, qty = 10, fun) {
    var that = this
    wx.request({
      url: publicurl + 'index/Index/studio_member',
      data: {
        studio_id: studio_id,
        msg: msg,
        page: page,
        qty: qty
      },
      success: function (res) {
        // console.log(res)
        typeof fun == "function" && fun(res);
      }
    })
  },
  /*滑动加载*/
  loadMore: function (e) {
    var that = this;
    if (!that.data.hasMore) return;
    var page = that.data.page
    ++page
    that.setData({
      page: page,
      qty: 10
    })
    that.studio_member(that.data.msg, that.data.page, that.data.qty, function (list) {
      if (list.data.trainee) {
        that.data.array = Object.assign(that.data.array, list.data.trainee);
      }
      if (list.data.trainee.length < 10) {
        that.setData({
          hasMore: false
        })
      }
      that.setData({
        array: that.data.array,
      })
    });
  }
})