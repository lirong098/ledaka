// points.js
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id = 0;
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var maxRight = 180;
var key = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studio_id = options.studio_id;
    this.setData({
      studio_id: studio_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowWidth)
        var px = res.windowWidth * 100 / 750;
        that.setData({
          boxheight: (res.windowHeight - px) + "px"
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: publicurl + 'index/Studio/setPointsRule',
      data: {
        studio_id: studio_id
      },
      success: function (res) {
        // success
        console.log(res.data);
        res.data.info.check = res.data.info.check == 0 ? '' : res.data.info.check
        res.data.info.edit = res.data.info.edit == 0 ? '' : res.data.info.edit
        res.data.info.count = res.data.info.count == 0 ? '' : res.data.info.count
        res.data.info.award = res.data.info.award == 0 ? '' : res.data.info.award
        res.data.info.new = res.data.info.new == 0 ? '' : res.data.info.new
        res.data.info.again = res.data.info.again == 0 ? '' : res.data.info.again
        res.data.info.reference = res.data.info.reference == 0 ? '' : res.data.info.reference
        that.setData({
          info: res.data.info,
          exchange: res.data.exchange
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
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  formSubmit: function (e) {
    console.log(e.detail.value);
    var that = this;
    wx.request({
      url: publicurl + 'index/Studio/savePointsRule',
      data: {
        studio_id: studio_id,
        coach_id: app.globalData.id,
        data: e.detail.value
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
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      },
      fail: function () {
        // fail
      }
    })
  },
  clickadd: function () {
    wx.navigateTo({
      url: '/pages/studiomanage/setting/points/addexchange/addexchange?studio_id=' + studio_id
    })
  },
  drawStart: function (e) {
    // console.log("drawStart");
    var touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    var exchange = this.data.exchange;
    for (var i in exchange) {
      var data = exchange[i];
      data.startRight = data.right;
    }
    key = true;
  },
  drawEnd: function (e) {
    // console.log("drawEnd");
    var exchange = this.data.exchange;
    for (var i in exchange) {
      var data = exchange[i];
      if (!data.right) {
        data.right = 0;
      }
      if (data.right <= 180 / 2) {
        data.right = 0;
      } else {
        data.right = maxRight;
      }
    }
    this.setData({
      exchange: exchange
    });
  },
  drawMove: function (e) {
    // console.log("drawMove");
    var self = this;
    var dataId = e.currentTarget.id;
    // console.log("id is = " + dataId)
    var exchange = this.data.exchange;
    if (key) {
      var touch = e.touches[0];
      endX = touch.clientX;
      endY = touch.clientY;
      // console.log("startX=" + startX + " endX=" + endX);
      if (endX - startX == 0)
        return;
      var res = exchange;
      //从右往左  

      if ((endX - startX) < 0) {
        for (var k in res) {
          var data = res[k];
          if (res[k].id == dataId) {
            var startRight = res[k].startRight;
            var change = startX - endX;
            startRight += change;
            if (startRight > maxRight)
              startRight = maxRight;
            res[k].right = startRight;
          }
        }
      } else {//从左往右  
        for (var k in res) {
          var data = res[k];
          if (res[k].id == dataId) {
            var startRight = res[k].startRight;
            var change = endX - startX;
            startRight -= change;
            if (startRight < 0)
              startRight = 0;
            res[k].right = startRight;
          }
        }
      }
      self.setData({
        exchange: exchange
      });

    }
  },
  delItem: function (e) {
    var rule_id = e.currentTarget.dataset.id;
    var that = this;
    console.log('id is ' + rule_id);
    console.log('sid is ' + studio_id);
    wx.request({
      url: publicurl + 'index/Studio/ruleDelete',
      data: {
        studio_id: studio_id,
        coach_id: app.globalData.id,
        rule_id: rule_id
      },
      success: function (res) {
        // success
        console.log(res.data);
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function (res) {
            that.onShow();
          }
        })
      },
      fail: function () {
        // fail
      }
    })
  }
})