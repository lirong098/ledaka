// addexchange.js
var app = getApp();
var publicurl = app.globalData.publicurl;
var studio_id = 0;
var rule_id = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ['私教', '团课', '其他'],
    btnname: "保存"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    studio_id = options.studio_id;
    if (options.rule_id) {
      rule_id = options.rule_id;
    } else {
      rule_id = 0;
      this.setData({
        btnname: "保存"
      })
      wx.setNavigationBarTitle({ title: '新增项目' });
    }

    var that = this;
    if (rule_id != 0) {
      wx.request({
        url: publicurl + 'index/Studio/getExchangeRuleById',
        data: {
          studio_id: studio_id,
          coach_id: app.globalData.id,
          rule_id: rule_id
        },
        success: function (res) {
          // success
          console.log(res.data);
          if (res.data.code == 1) {
            that.setData({
              index: res.data.index,
              rulename: res.data.rulename,
              points: res.data.points,
              btnname: "修改项目"
            })
            wx.setNavigationBarTitle({ title: '修改项目' });
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
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    if (e.detail.value.name == "" || e.detail.value.points == 0) {
      wx.showModal({
        title: '提示',
        content: "参数错误，请填写正确的数据",
        showCancel: false
      })
    }

    var that = this;
    wx.request({
      url: publicurl + 'index/Studio/addExchangeRule',
      data: {
        studio_id: studio_id,
        coach_id: app.globalData.id,
        data: e.detail.value,
        rule_id: rule_id
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