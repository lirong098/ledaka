// pages/motorgroup/motorgroup.js
var app = getApp()
var publicurl = app.globalData.publicurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      {
        name:"运动群",
        mar:"管理员",
        qty:"8人"
      },
      {
        name: "公司姐妹团",
        mar: "",
        qty: "8人"
      }
    ]    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    wx.request
      ({
        url: publicurl + 'index/Motorgroup/index?trainee_id=' + app.globalData.id,
        success: function (res) {
          that.setData({
            array: res.data
          })
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
  onShareAppMessage: function () {
  
  },
  addprogram: function () {
   
    var that = this
    wx.navigateTo({
      url: '../motorgroup/addmotorgroup/addmotorgroup'
    })
  }
})