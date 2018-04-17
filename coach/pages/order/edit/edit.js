// edit.js
var app = getApp();
var publicurl = app.globalData.publicurl;
var seorder_id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdate: '开始日期',
    enddate: '有效期截止',
    goods_number: '课程数',
    goods_use: '已使用课程'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    seorder_id = options.id
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
      url: publicurl + 'index/Seorder/coachdata',
      data: {
        coach_id: app.globalData.id,
        seorder_id: seorder_id
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.msg === 1) {
          that.setData({
            card_array: res.data.card,
            program_array: res.data.program,
            studio_array: res.data.studio,
            studioindex: '0',
            good_use: 0
          })
        } else {
          if (res.data.msg === 2) {
            that.setData({
              stardate: res.data.seorder['0'].start_date,
              endate: res.data.seorder['0'].expiration_date,
              good_number: res.data.seorder['0'].goods_number,
              good_use: res.data.seorder['0'].goods_use,
              seorder_id: res.data.seorder['0'].id
            })
          }
        }
      },
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
  bindstartChange: function (e) {
    this.setData({
      stardate: e.detail.value,
    })
  },
  bindendChange: function (e) {
    this.setData({
      endate: e.detail.value,
    })
  },
  formSubmit: function (e) {
    if (e.detail.value.goods_use == "") {
      e.detail.value.goods_use = 0
    }
    var start_date = e.detail.value.startdate
    var expiration_date = e.detail.value.enddate
    if (start_date === "" || expiration_date === "") {
      wx.showModal({
        title: '错误提示',
        content: '填写信息不全',
      })
    } else if (parseInt(e.detail.value.goods_number) >= parseInt(e.detail.value.goods_use)) {
      wx.request({
        url: publicurl + 'index/Seorder/edit',
        data: {
          seorder_id: e.detail.value.seorder_id,
          goods_number: e.detail.value.goods_number,
          goods_use: e.detail.value.goods_use,
          start_date: start_date,
          expiration_date: expiration_date
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data == 1) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 5000
            })
            wx.navigateBack({
              delta: 1,
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '课程数量不能小于已使用课程数量。',
        showCancel: false
      })
    }
  }
})