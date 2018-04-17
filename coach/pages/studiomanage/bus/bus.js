// pages/studiomanage/bus/bus.js
var studio_id = 0;
var app = getApp();
var publicurl = app.globalData.publicurl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nav: [
      {
        name: "销售机会",
        qty: 0,
        classname: "blue",
        bottom: "background-color: #4bc1d2;"
      },
      {
        name: "转介绍统计",
        qty: 0,
        classname: "",
        bottom: ""
      }
    ],
    msg: 0,                       //0 销售机会 1 转介绍统计
    showpage: true,      //true 销售机会 false 转介绍统计
    share_array: [],        //销售机会数据
    page: 1,                   //分页加载
    qty: 10,                   //每页10条数据
    hasMore: true,     //true 滑动加载执行 false 滑动加载不执行
    studio_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studio_id = options.id;
    let that = this;
    that.setData({
      studio_id: studio_id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.setData({
      page: 1,
      qty: 10,
    });
    that.studio_member(3, that.data.page, that.data.qty, function (list) {
      console.log(list.data.trainee.length);
      that.data.nav['0'].qty = list.data.trainee.length;
      that.setData({
        share_array: list.data.trainee,
        nav: that.data.nav
      })
    });
    that.studio_bus(that.data.page, that.data.qty, function (list) {
      console.log(list.data);
      that.data.nav['1'].qty = list.data.studio_array.share_count;
      that.setData({
        studio_array: list.data.studio_array,
        share_trainee: list.data.share_trainee,
        nav: that.data.nav
      });
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
      that.data.nav[x].classname = "";
      if (x == e.currentTarget.dataset.index) {
        that.data.nav[x].bottom = "background-color: #4bc1d2;";
        that.data.nav[x].classname = "blue";
      }
    }
    let showpage = true;
    if (e.currentTarget.dataset.index == 0) {
      showpage = true;
    } else if (e.currentTarget.dataset.index == 1) {
      showpage = false;
    }
    that.setData({
      nav: that.data.nav,
      msg: e.currentTarget.dataset.index,
      page: 1,
      qty: 10,
      hasMore: true,
      showpage: showpage
    })
  },
  /*网络请求 销售机会（未买课的学员）*/
  studio_member: function (msg = 3, page = 1, qty = 10, fun) {
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
        typeof fun == "function" && fun(res);
      }
    })
  },
  /*网络请求转介绍统计*/
  studio_bus: function (page = 1, qty = 10, fun) {
    var that = this
    wx.request({
      url: publicurl + 'index/Index/studio_bus',
      data: {
        studio_id: studio_id,
      },
      success: function (res) {
        typeof fun == "function" && fun(res);
      }
    })
  },
  /*滑动加载*/
  loadMore: function (e) {
    let that = this;
    if (!that.data.hasMore) return;
    let page = that.data.page;
    ++page;
    that.setData({
      page: page,
      qty: 10
    });
    if (that.data.msg == 0) { //销售机会
      that.studio_member(3, that.data.page, that.data.qty, function (list) {
        console.log(list.data)
        if (list.data.trainee && list.data.trainee.length > 0) {
          that.data.share_array.push.apply(that.data.share_array, list.data.trainee);
        }
        if (list.data.trainee.length < 10) {
          that.setData({
            hasMore: false
          })
        }
        that.setData({
          array: that.data.share_array,
        })
      });
    }
  }
})