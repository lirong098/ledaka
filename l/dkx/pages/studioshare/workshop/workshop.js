// workshop.js
var GetuserInfo = require('../../../utils/GetuserInfo.js')
var app = getApp()
var publicurl = app.globalData.publicurl
var studio_id
var trainee_id
var isfrom
var isclick = false
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
    studio_id = options.studio_id
    trainee_id = options.trainee_id
    // studio_id = 1005
    // trainee_id = 1124

    isfrom = options.isfrom
    if (!isfrom) {
      isfrom = ""
    }

    var id = wx.getStorageSync('id')

    // 没有缓存就获取授权
    if (!id) {
      GetuserInfo.login(app.globalData.publicurl);
    }

    var that = this
    wx.request({
      url: publicurl + 'index/Studio/getStudioName',
      data: {
        studio_id: studio_id
      },
      success: function (res) {
        // success
        console.log(res.data)
        that.setData({
          studioname: res.data.name
        })
      },
      fail: function (res) {
        // fail
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
    var id = wx.getStorageSync('id')
    var that = this
    if (id) {
      wx.request({
        url: publicurl + 'index/Trainee/fetchdata',
        data: {
          trainee_id: id
        },
        success: function (res) {
          // success
          console.log(res.data)
          that.setData({
            username: res.data.trainee_nickname,
            phone: res.data.phone,
          })
        },
        fail: function (res) {
          // fail
        }
      })
    }
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

  formSubmit: function (e) {
    if (e.detail.value.name == null || e.detail.value.name == "" || e.detail.value.name == undefined) {
      wx.showModal({
        title: '提示',
        content: '姓名不能为空。',
        showCancel: false
      })
      return;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(e.detail.value.phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入有效的手机号码！',
        showCancel: false
      })
      return;
    }

    var id = wx.getStorageSync('id');
    if (!isclick) {
      isclick = true;
      wx.request({
        url: publicurl + 'index/Studio/setShareTraineeInfo',
        data: {
          studio_id: studio_id,
          from_id: trainee_id,
          trainee_id: id,
          isfrom: isfrom,
          name: e.detail.value.name,
          phone: e.detail.value.phone
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success: function () {
                // wx.switchTab({
                //   url: '/pages/index/index'
                // })
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            })
          }
          setTimeout(function () {
            isclick = false
          }, 1500)
        },
        fail: function (res) {
          setTimeout(function () {
            isclick = false
          }, 1500)
        }
      })
    }

  }

})