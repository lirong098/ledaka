// exchange.js
var app = getApp();
var publicurl = app.globalData.publicurl;
var studio_id = 0;
var points = 0;
var list = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studio_id = options.id;
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
    if (studio_id == undefined || studio_id == 0) {
      return;
    }
    var that = this
    wx.request({
      url: publicurl + 'index/Studio/getExchangeList',
      data: {
        studio_id: studio_id,
        trainee_id: app.globalData.id
      },
      success: function (res) {
        // success
        console.log(res.data);
        result = {};
        if (res.data.code == -1) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
        list = res.data.rule;
        points = res.data.points;
        that.setData({
          rule: res.data.rule,
          desc: res.data.desc,
          points: res.data.points
        })
      },
      fail: function () {
        // fail
      }
    })
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  // }
  clickExchange: function (e) {
    var result = {};
    var id = e.currentTarget.dataset.eid;
    result[id] = 1;
    // console.log(result);
    // console.log(list);

    var str = '本次将兑换：';
    var tmpPoints = points;
    for (var key in result) {
      var count = result[key];
      for (var tmp in list) {
        if (list[tmp]['id'] == key) {
          if (list[tmp]['points'] * count > tmpPoints) {
            wx.showModal({
              title: '提示',
              content: '积分不足，无法兑换。',
              showCancel: false
            })
            return;
          } else {
            str = str + list[tmp]['rule_name'] + '，将消耗' + list[tmp]['points'] + "积分，是否确认兑换？";
            tmpPoints = tmpPoints - list[tmp]['points'] * count;
          }
        }
      }
    }

    var that = this;
    wx.showModal({
      title: '确认',
      content: str,
      success: function (res) {
        if (res.confirm) {
          // 网络请求
          wx.request({
            url: publicurl + 'index/Studio/exchange',
            data: {
              studio_id: studio_id,
              trainee_id: app.globalData.id,
              data: result
            },
            success: function (res) {
              // success
              console.log(res.data);
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {

                  }
                }
              })
              that.onShow();
            },
            fail: function () {
              // fail
            }
          })
        }
      }
    })

  }

})