// recommend.js
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id;
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
    studio_id = options.studio_id;
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
    var that = this
    wx.request({
      url: publicurl + 'index/Studio/getActivity',
      data: {
        studio_id: studio_id
      },
      success: function (res) {
        // success
        console.log(res.data)
        that.setData({
          https: app.globalData.imagesurl,
          info: res.data.info,
          source: res.data.info.logo
        })
      },
      fail: function (res) {
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
  btnClickShare: function () {
    wx.navigateToMiniProgram({
      // appId: 'wxc335fc380a8f0e0e',
      appId: 'wx68c41ab02c9b0346',
      path: 'pages/studioshare/shareinfo/shareinfo?isfrom=coach&id=' + studio_id,
      extraData: {
      },
      //envVersion: 'develop',
      envVersion: 'release',
      success(res) {
        // 打开成功
      },
      fail(res) {
        wx.showModal({
          title: '提示',
          content: '由于版本过低，暂时无法打开学员并转发。',
        })
      }
    })
  },
  btnClickEdit: function () {
    wx.navigateTo({
      url: '/pages/studiomanage/setting/recommend/edit/edit?studio_id=' + studio_id
    })
  }


})