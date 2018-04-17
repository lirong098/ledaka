// multiple.js
var app = getApp()
var publicurl = app.globalData.publicurl
var multiple = [];
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var coach_id = wx.getStorageSync('id');
    wx.request({
      url: publicurl + 'index/Studio/getStudioMultiple',
      data: {
        coach_id: coach_id
      },
      success: function (res) {
        // success
        console.log(res.data);
        // managers = [];
        // for (var item in res.data.coachinfo) {
        //   if (res.data.coachinfo[item].checked) {
        //     managers.push(res.data.coachinfo[item].id);
        //   }
        // }

        that.setData({
          https: app.globalData.imagesurl,
          studioinfo: res.data.studios
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
  checkboxChange: function (e) {
    // console.log(e.detail.value);
    multiple = e.detail.value;
  },
  clicksave: function (e) {
    console.log(multiple)
    var that = this;
    wx.request({
      url: publicurl + 'index/Studio/editStudioMultiple',
      data: {
        coach_id: app.globalData.id,
        multiple: multiple
      },
      success: function (res) {
        // success
        console.log(res.data);
        if (res.data.code == 1) {
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
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail: function () {
        // fail
      }
    })
  }

})