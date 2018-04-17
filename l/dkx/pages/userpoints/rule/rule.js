// rule.js
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id = 0
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
    studio_id = options.id
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
      url: publicurl + 'index/Studio/getRule',
      data: {
        studio_id: studio_id
      },
      success: function (res) {
        // success
        console.log(res.data)
        let tmp = res.data.rule;
        let info = {};
        for (var value in tmp) {
          switch (tmp[value]['rule_type']) {
            case 'count': {
              info['count'] = tmp[value]['points'];
              break;
            }
            case 'check': {
              info['check'] = tmp[value]['points'];
              break;
            }
            case 'edit': {
              info['edit'] = tmp[value]['points'];
              break;
            }
            case 'award': {
              info['award'] = tmp[value]['points'];
              break;
            }
            case 'new': {
              info['new'] = tmp[value]['points'];
              break;
            }
            case 'again': {
              info['again'] = tmp[value]['points'];
              break;
            }
            case 'reference': {
              info['reference'] = tmp[value]['points'];
              break;
            }
          }
        }

        that.setData({
          info: info
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
})